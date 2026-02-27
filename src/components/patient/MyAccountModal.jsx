import { useEffect, useMemo, useState } from 'react';
import { getCurrentUser } from '../../services/AuthService';
import '../../assets/styles/MyAccountModal.css';

const TABS = ['personal', 'security', 'notifications'];

function MyAccountModal({ isOpen, onClose }) {
  const user = useMemo(() => getCurrentUser(), []);
  const initialPersonalInfo = useMemo(() => ({
    fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  }), [user]);

  const [activeTab, setActiveTab] = useState('personal');
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [savedPersonalInfo, setSavedPersonalInfo] = useState(initialPersonalInfo);
  const [securityInfo, setSecurityInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notificationSettings, setNotificationSettings] = useState({
    appointmentReminders: true,
    labAlerts: true,
    billingNotifications: true,
    smsNotifications: true
  });

  useEffect(() => {
    if (!isOpen) return undefined;
    setIsEditingPersonal(false);
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const triggerSave = (onSaveComplete) => {
    setIsProcessing(true);
    setSavedMessage('');
    setTimeout(() => {
      setIsProcessing(false);
      setSavedMessage('Saved');
      if (onSaveComplete) {
        onSaveComplete();
      }
      setTimeout(() => setSavedMessage(''), 1800);
    }, 700);
  };

  const handlePersonalSave = () => {
    triggerSave(() => {
      setSavedPersonalInfo(personalInfo);
      setIsEditingPersonal(false);
    });
  };

  const handleCancelPersonalEdit = () => {
    setPersonalInfo(savedPersonalInfo);
    setIsEditingPersonal(false);
  };

  return (
    <div className="account-modal-backdrop" role="dialog" aria-modal="true" aria-label="My Account">
      <div className="account-modal">
        <div className="account-modal-header">
          <h2>My Account</h2>
          <button type="button" className="account-close-btn" aria-label="Close" onClick={onClose}>&times;</button>
        </div>

        <div className="account-tabs" role="tablist" aria-label="My Account Tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              className={`account-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'personal' ? 'Personal Info' : tab === 'security' ? 'Security' : 'Notification Preferences'}
            </button>
          ))}
        </div>

        <div className="account-content">
          {savedMessage && <p className="account-save-state">{savedMessage}</p>}

          {activeTab === 'personal' && (
            <div className="account-panel">
              <div className="account-panel-header">
                <h3>Personal Info</h3>
                {!isEditingPersonal ? (
                  <button type="button" className="account-save-btn" onClick={() => setIsEditingPersonal(true)}>
                    Edit
                  </button>
                ) : (
                  <div className="account-inline-actions">
                    <button type="button" className="account-action-btn" onClick={handleCancelPersonalEdit}>
                      Cancel
                    </button>
                    <button type="button" className="account-save-btn" onClick={handlePersonalSave} disabled={isProcessing}>
                      {isProcessing ? 'Processing...' : 'Save'}
                    </button>
                  </div>
                )}
              </div>

              {isEditingPersonal ? (
                <>
                  <label htmlFor="account-full-name">Full Name</label>
                  <input
                    id="account-full-name"
                    value={personalInfo.fullName}
                    onChange={(event) => setPersonalInfo((current) => ({ ...current, fullName: event.target.value }))}
                  />
                  <label htmlFor="account-email">Email</label>
                  <input
                    id="account-email"
                    value={personalInfo.email}
                    onChange={(event) => setPersonalInfo((current) => ({ ...current, email: event.target.value }))}
                  />
                  <label htmlFor="account-phone">Phone</label>
                  <input
                    id="account-phone"
                    value={personalInfo.phone}
                    onChange={(event) => setPersonalInfo((current) => ({ ...current, phone: event.target.value }))}
                  />
                  <label htmlFor="account-address">Address</label>
                  <textarea
                    id="account-address"
                    value={personalInfo.address}
                    onChange={(event) => setPersonalInfo((current) => ({ ...current, address: event.target.value }))}
                    rows={3}
                  />
                </>
              ) : (
                <dl className="account-details-grid">
                  <div className="account-details-row">
                    <dt>Full Name</dt>
                    <dd>{savedPersonalInfo.fullName || 'Not set'}</dd>
                  </div>
                  <div className="account-details-row">
                    <dt>Email</dt>
                    <dd>{savedPersonalInfo.email || 'Not set'}</dd>
                  </div>
                  <div className="account-details-row">
                    <dt>Phone</dt>
                    <dd>{savedPersonalInfo.phone || 'Not set'}</dd>
                  </div>
                  <div className="account-details-row">
                    <dt>Address</dt>
                    <dd>{savedPersonalInfo.address || 'Not set'}</dd>
                  </div>
                </dl>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="account-panel">
              <label htmlFor="account-current-password">Current Password</label>
              <input
                id="account-current-password"
                type="password"
                value={securityInfo.currentPassword}
                onChange={(event) => setSecurityInfo((current) => ({ ...current, currentPassword: event.target.value }))}
              />
              <label htmlFor="account-new-password">New Password</label>
              <input
                id="account-new-password"
                type="password"
                value={securityInfo.newPassword}
                onChange={(event) => setSecurityInfo((current) => ({ ...current, newPassword: event.target.value }))}
              />
              <label htmlFor="account-confirm-password">Confirm Password</label>
              <input
                id="account-confirm-password"
                type="password"
                value={securityInfo.confirmPassword}
                onChange={(event) => setSecurityInfo((current) => ({ ...current, confirmPassword: event.target.value }))}
              />
              <button type="button" className="account-save-btn" onClick={() => triggerSave()} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Save'}
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="account-panel">
              <label className="toggle-row" htmlFor="account-appointment-reminders">
                <span>Appointment Reminders</span>
                <input
                  id="account-appointment-reminders"
                  type="checkbox"
                  checked={notificationSettings.appointmentReminders}
                  onChange={() => setNotificationSettings((current) => (
                    { ...current, appointmentReminders: !current.appointmentReminders }
                  ))}
                />
              </label>
              <label className="toggle-row" htmlFor="account-lab-alerts">
                <span>Lab Result Alerts</span>
                <input
                  id="account-lab-alerts"
                  type="checkbox"
                  checked={notificationSettings.labAlerts}
                  onChange={() => setNotificationSettings((current) => ({ ...current, labAlerts: !current.labAlerts }))}
                />
              </label>
              <label className="toggle-row" htmlFor="account-billing-notifications">
                <span>Billing Notifications</span>
                <input
                  id="account-billing-notifications"
                  type="checkbox"
                  checked={notificationSettings.billingNotifications}
                  onChange={() => setNotificationSettings((current) => (
                    { ...current, billingNotifications: !current.billingNotifications }
                  ))}
                />
              </label>
              <label className="toggle-row" htmlFor="account-sms-notifications">
                <span>SMS Notifications</span>
                <input
                  id="account-sms-notifications"
                  type="checkbox"
                  checked={notificationSettings.smsNotifications}
                  onChange={() => setNotificationSettings((current) => (
                    { ...current, smsNotifications: !current.smsNotifications }
                  ))}
                />
              </label>
              <button type="button" className="account-save-btn" onClick={() => triggerSave()} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Save'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAccountModal;
