import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHospital,
  faUsers,
  faListCheck,
  faFileCircleCheck,
  faBell,
  faGear,
  faArrowRightFromBracket,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';
import logoPrimary from '../assets/images/logo-primary.png';
import '../assets/styles/Sidebar.css';

const menuItems = [
  { id: 'dashboard', icon: faHospital, path: '/staff-portal', label: 'Dashboard' },
  { id: 'calendar', icon: faCalendar, path: '/staff-portal', label: 'Master Calendar' },
  { id: 'patients', icon: faUsers, path: '/staff-portal', label: 'Patient Directory' },
  { id: 'queue', icon: faListCheck, path: '/staff-portal', label: 'Check-in Queue' },
  { id: 'requests', icon: faFileCircleCheck, path: '/staff-portal', label: 'Requests' },
  { id: 'notifications', icon: faBell, path: '/staff-portal', label: 'Notifications' },
];

function StaffSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/staff-portal') {
      return location.pathname === '/staff-portal';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside className="sidebar expanded">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={logoPrimary} alt="ZCMMF" className="logo-image" />
          <div className="sidebar-logo-text">
            <span className="logo-text">Staff Portal</span>
            <span className="logo-subtitle-sidebarcomp">Clinic Operations</span>
          </div>
        </div>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">
        <button className="sidebar-item">
          <FontAwesomeIcon icon={faGear} className="sidebar-icon" />
          <span className="sidebar-label">Settings</span>
        </button>
        <button className="sidebar-item sidebar-logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="sidebar-icon" />
          <span className="sidebar-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default StaffSidebar;
