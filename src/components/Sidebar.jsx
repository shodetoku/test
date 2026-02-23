import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHospital,
  faUser,
  faCalendarCheck,
  faClipboard,
  faCreditCard,
  faCalendar,
  faFileLines
} from '@fortawesome/free-regular-svg-icons';
import { faFlask, faGear, faArrowRightFromBracket, faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../utils/auth';
import '../styles/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: faHospital, path: '/dashboard', label: 'Dashboard' },
    { id: 'profile', icon: faUser, path: '/dashboard/profile', label: 'Profile' },
    { id: 'calendar', icon: faCalendar, path: '/dashboard/calendar', label: 'Calendar' },
    { id: 'appointments', icon: faCalendarCheck, path: '/dashboard/appointments', label: 'Appointments' },
    { id: 'records', icon: faClipboard, path: '/dashboard/medical-records', label: 'Records' },
    { id: 'lab-results', icon: faFlask, path: '/dashboard/lab-results', label: 'Lab Results' },
    { id: 'prescriptions', icon: faFileLines, path: '/dashboard/prescriptions', label: 'Prescriptions' },
    { id: 'billing', icon: faCreditCard, path: '/dashboard/billing', label: 'Billing' },
  ];

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--current-sidebar-width',
      isExpanded ? 'var(--sidebar-expanded-width)' : 'var(--sidebar-width)'
    );
  }, [isExpanded]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={toggleSidebar} title={isExpanded ? 'Collapse' : 'Expand'}>
          <FontAwesomeIcon icon={isExpanded ? faChevronLeft : faBars} className="toggle-icon" />
        </button>
        {isExpanded && (
          <div className="sidebar-logo">
            <img src="/1000234544.png" alt="ZCMMF" className="logo-image" />
            <div className="sidebar-logo-text">
              <span className="logo-text">ZCMMF</span>
              <span className="logo-subtitle-sidebarcomp">Zeal Community Medical Mission Foundation</span>
            </div>
          </div>
        )}
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            title={!isExpanded ? item.label : ''}
          >
            <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
            {isExpanded && <span className="sidebar-label">{item.label}</span>}
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">
        <button
          className={`sidebar-item ${isActive('/dashboard/profile-settings') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard/profile-settings')}
          title={!isExpanded ? 'Settings' : ''}
        >
          <FontAwesomeIcon icon={faGear} className="sidebar-icon" />
          {isExpanded && <span className="sidebar-label">Settings</span>}
        </button>
        <button
          className="sidebar-item sidebar-logout"
          onClick={handleLogout}
          title={!isExpanded ? 'Logout' : ''}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="sidebar-icon" />
          {isExpanded && <span className="sidebar-label">Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
