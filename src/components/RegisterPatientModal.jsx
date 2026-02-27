import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faCalendar, faPhone, faVenusMars, faClipboardList, faXmark } from '@fortawesome/free-solid-svg-icons';

function RegisterPatientModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    appointmentType: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact Number is required';
    if (!formData.appointmentType) newErrors.appointmentType = 'Appointment Type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSuccess();
      setFormData({
        fullName: '',
        dateOfBirth: '',
        gender: '',
        contactNumber: '',
        appointmentType: ''
      });
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: '',
      dateOfBirth: '',
      gender: '',
      contactNumber: '',
      appointmentType: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="staff-modal-overlay" onClick={handleClose}>
      <div className="staff-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="staff-modal-header-bar">
          <div className="staff-modal-header-content">
            <FontAwesomeIcon icon={faUserPlus} />
            <h2>Register New Patient</h2>
          </div>
          <button className="staff-modal-close" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="staff-modal-body">
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faUserPlus} className="input-icon" />
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faCalendar} className="input-icon" />
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={errors.dateOfBirth ? 'error' : ''}
            />
            {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faVenusMars} className="input-icon" />
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? 'error' : ''}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error-text">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faPhone} className="input-icon" />
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
              className={errors.contactNumber ? 'error' : ''}
            />
            {errors.contactNumber && <span className="error-text">{errors.contactNumber}</span>}
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faClipboardList} className="input-icon" />
              Appointment Type
            </label>
            <select
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleChange}
              className={errors.appointmentType ? 'error' : ''}
            >
              <option value="">Select appointment type</option>
              <option value="new">New Patient</option>
              <option value="follow-up">Follow-up</option>
              <option value="consultation">Consultation</option>
              <option value="checkup">General Check-up</option>
              <option value="lab">Lab Results</option>
            </select>
            {errors.appointmentType && <span className="error-text">{errors.appointmentType}</span>}
          </div>

          <div className="staff-modal-actions">
            <button type="button" className="modal-cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="modal-save-btn">
              Complete Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPatientModal;
