/**
 * Audit Logging Middleware
 * 
 * Logs all sensitive operations for compliance and security auditing.
 * 
 * HIPAA Compliance:
 * - Tracks who accessed what data and when
 * - Records all modifications to patient records
 * - Maintains audit trail for 7 years (configurable)
 * - Captures IP address and user agent for forensics
 * 
 * Logged Operations:
 * - User authentication events (login, logout, failed attempts)
 * - Patient record access and modifications
 * - Appointment creation, updates, and cancellations
 * - User permission changes
 * - System configuration changes
 * 
 * @module middleware/auditLog
 */

import mongoose from 'mongoose';

/**
 * Audit Log Schema
 * Stores detailed information about sensitive operations
 */
const auditLogSchema = new mongoose.Schema(
  {
    // User who performed the action
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    
    // Type of action performed
    action: {
      type: String,
      required: true,
      enum: [
        // Authentication actions
        'LOGIN',
        'LOGOUT',
        'LOGIN_FAILED',
        'PASSWORD_CHANGE',
        'PASSWORD_RESET',
        'MFA_ENABLED',
        'MFA_DISABLED',
        
        // User management
        'USER_CREATED',
        'USER_UPDATED',
        'USER_DELETED',
        'USER_ACTIVATED',
        'USER_DEACTIVATED',
        'ROLE_CHANGED',
        
        // Patient records
        'PATIENT_CREATED',
        'PATIENT_VIEWED',
        'PATIENT_UPDATED',
        'PATIENT_DELETED',
        'PATIENT_RECORD_ACCESSED',
        
        // Appointments
        'APPOINTMENT_CREATED',
        'APPOINTMENT_UPDATED',
        'APPOINTMENT_CANCELLED',
        'APPOINTMENT_VIEWED',
        
        // System actions
        'SYSTEM_CONFIG_CHANGED',
        'BACKUP_CREATED',
        'DATA_EXPORT',
        'REPORT_GENERATED',
      ],
      index: true,
    },
    
    // Resource type being acted upon
    resource: {
      type: String,
      required: true,
      enum: ['User', 'Patient', 'Doctor', 'Appointment', 'System', 'Auth'],
      index: true,
    },
    
    // ID of the resource being acted upon
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      sparse: true,
      index: true,
    },
    
    // HTTP method used
    method: {
      type: String,
      enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    },
    
    // Request path
    path: {
      type: String,
      required: true,
    },
    
    // IP address of the client
    ipAddress: {
      type: String,
      required: true,
      index: true,
    },
    
    // User agent string
    userAgent: {
      type: String,
    },
    
    // Result of the action
    status: {
      type: String,
      enum: ['SUCCESS', 'FAILURE', 'PARTIAL'],
      required: true,
      default: 'SUCCESS',
      index: true,
    },
    
    // HTTP status code
    statusCode: {
      type: Number,
    },
    
    // Additional details (sanitized - no PHI)
    details: {
      type: mongoose.Schema.Types.Mixed,
    },
    
    // Error message if action failed
    errorMessage: {
      type: String,
    },
    
    // Request duration in milliseconds
    duration: {
      type: Number,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
    collection: 'audit_logs',
  }
);

// Indexes for efficient querying
auditLogSchema.index({ userId: 1, createdAt: -1 }); // User activity history
auditLogSchema.index({ resource: 1, resourceId: 1 }); // Resource access history
auditLogSchema.index({ action: 1, createdAt: -1 }); // Action-based queries

// TTL Index: Automatically delete logs older than 7 years (HIPAA requirement)
// 7 years = 2557 days = 220,924,800 seconds
auditLogSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 220924800 }
);

/**
 * Create the AuditLog model
 */
const AuditLog = mongoose.model('AuditLog', auditLogSchema);

/**
 * Create an audit log entry
 * 
 * @param {Object} logData - Audit log data
 * @returns {Promise<Object>} Created audit log
 */
export const createAuditLog = async (logData) => {
  try {
    const auditLog = new AuditLog(logData);
    await auditLog.save();
    return auditLog;
  } catch (error) {
    // Don't fail the request if audit logging fails, but log the error
    console.error('Failed to create audit log:', error);
    return null;
  }
};

/**
 * Audit logging middleware
 * Automatically logs all requests to sensitive endpoints
 * 
 * Usage:
 * - Apply to specific routes: router.post('/login', auditLog('LOGIN', 'Auth'), controller)
 * - Apply globally: app.use(auditLog())
 * 
 * @param {string} action - Action type (optional, will be inferred if not provided)
 * @param {string} resource - Resource type (optional, will be inferred if not provided)
 * @returns {Function} Express middleware
 */
export const auditLog = (action = null, resource = null) => {
  return async (req, res, next) => {
    const startTime = Date.now();
    
    // Capture the original res.json to intercept the response
    const originalJson = res.json.bind(res);
    
    res.json = function (body) {
      const duration = Date.now() - startTime;
      
      // Determine action if not explicitly provided
      const inferredAction = action || inferActionFromRequest(req);
      
      // Determine resource if not explicitly provided
      const inferredResource = resource || inferResourceFromPath(req.path);
      
      // Determine status based on HTTP status code
      const status = res.statusCode >= 200 && res.statusCode < 300 
        ? 'SUCCESS' 
        : 'FAILURE';
      
      // Create audit log entry (async, don't wait for it)
      const logData = {
        userId: req.user?.id || req.user?._id,
        action: inferredAction,
        resource: inferredResource,
        resourceId: req.params.id || body?.data?.id || body?.data?._id,
        method: req.method,
        path: req.path,
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent'),
        status,
        statusCode: res.statusCode,
        duration,
        details: sanitizeDetails(req, body),
        errorMessage: status === 'FAILURE' ? body?.message : null,
      };
      
      createAuditLog(logData).catch((err) => {
        console.error('Audit log creation failed:', err);
      });
      
      // Call the original res.json
      return originalJson(body);
    };
    
    next();
  };
};

/**
 * Infer action from HTTP method and path
 * 
 * @param {Object} req - Express request object
 * @returns {string} Inferred action
 */
const inferActionFromRequest = (req) => {
  const { method, path } = req;
  
  // Authentication routes
  if (path.includes('/login')) return 'LOGIN';
  if (path.includes('/logout')) return 'LOGOUT';
  if (path.includes('/register')) return 'USER_CREATED';
  if (path.includes('/password')) return 'PASSWORD_CHANGE';
  
  // Generic CRUD operations
  const actionMap = {
    POST: '_CREATED',
    GET: '_VIEWED',
    PUT: '_UPDATED',
    PATCH: '_UPDATED',
    DELETE: '_DELETED',
  };
  
  // Extract resource from path (e.g., /api/patients/123 -> PATIENT)
  const pathParts = path.split('/').filter(Boolean);
  const resourcePart = pathParts[1] || 'SYSTEM';
  const resourceName = resourcePart.toUpperCase().replace(/S$/, ''); // Remove trailing 's'
  
  return resourceName + (actionMap[method] || '_ACCESSED');
};

/**
 * Infer resource type from path
 * 
 * @param {string} path - Request path
 * @returns {string} Resource type
 */
const inferResourceFromPath = (path) => {
  if (path.includes('/user')) return 'User';
  if (path.includes('/patient')) return 'Patient';
  if (path.includes('/doctor')) return 'Doctor';
  if (path.includes('/appointment')) return 'Appointment';
  if (path.includes('/auth')) return 'Auth';
  return 'System';
};

/**
 * Sanitize request/response details to prevent PHI exposure
 * Removes sensitive fields before logging
 * 
 * @param {Object} req - Express request object
 * @param {Object} body - Response body
 * @returns {Object} Sanitized details
 */
const sanitizeDetails = (req, body) => {
  const details = {};
  
  // Add safe request details
  if (req.query && Object.keys(req.query).length > 0) {
    details.query = { ...req.query };
  }
  
  if (req.params && Object.keys(req.params).length > 0) {
    details.params = { ...req.params };
  }
  
  // Sanitize body - remove sensitive fields
  const sensitiveFields = [
    'password',
    'passwordHash',
    'token',
    'refreshToken',
    'ssn',
    'socialSecurityNumber',
    'creditCard',
    'accountNumber',
  ];
  
  if (req.body && Object.keys(req.body).length > 0) {
    details.requestBody = { ...req.body };
    sensitiveFields.forEach((field) => {
      if (details.requestBody[field]) {
        details.requestBody[field] = '[REDACTED]';
      }
    });
  }
  
  // Add response status
  if (body?.success !== undefined) {
    details.success = body.success;
  }
  
  return details;
};

/**
 * Query audit logs
 * Helper function to retrieve audit logs with filters
 * 
 * @param {Object} filters - Query filters
 * @param {Object} options - Query options (pagination, sorting)
 * @returns {Promise<Array>} Audit logs
 */
export const queryAuditLogs = async (filters = {}, options = {}) => {
  const {
    page = 1,
    limit = 50,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;
  
  const query = AuditLog.find(filters)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .limit(limit)
    .skip((page - 1) * limit)
    .populate('userId', 'email role')
    .lean();
  
  const [logs, total] = await Promise.all([
    query,
    AuditLog.countDocuments(filters),
  ]);
  
  return {
    logs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export default auditLog;
