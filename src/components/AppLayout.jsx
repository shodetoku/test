import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faMagnifyingGlass,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { logout } from '../services/AuthService';
import logoPrimary from '../assets/images/logo-primary.png';
import MyAccountModal from './patient/MyAccountModal';
import SidebarNavItem from './patient/navigation/SidebarNavItem';
import {
  PATIENT_MOBILE_NAV_ITEMS,
  PATIENT_NAV_ITEMS,
  resolveActivePortalItem
} from './patient/navigation/patientNavigationConfig';
import '../assets/styles/PatientPortalShell.css';

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const shouldOpenAccount = params.get('account') === '1';
    setShowAccountModal(shouldOpenAccount);
  }, [location.search]);

  const activeItem = useMemo(() => {
    return resolveActivePortalItem(location.pathname, PATIENT_NAV_ITEMS);
  }, [location.pathname]);

  const closeAccount = () => {
    setShowAccountModal(false);
    navigate(location.pathname, { replace: true });
  };

  const openAccount = () => setShowAccountModal(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowMobileMenu(false);
  };

  return (
    <div className="portal-shell">
      <aside className="portal-sidebar-desktop">
        <div className="portal-brand">
          <img src={logoPrimary} alt="ZCMMF" />
          <div>
            <h1>ZCMMF</h1>
            <p>Patient Portal</p>
          </div>
        </div>

        <nav className="portal-nav">
          {PATIENT_NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              onClick={handleNavigate}
            />
          ))}
        </nav>

        <div className="portal-sidebar-footer">
          <button type="button" className="portal-nav-item danger" onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="portal-main-shell">
        <header className="portal-header">
          <button
            type="button"
            className="portal-mobile-menu-btn"
            aria-label="Open menu"
            onClick={() => setShowMobileMenu((current) => !current)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="portal-search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="search"
              placeholder="Search: doctor, records, or dates"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>
          <div className="portal-header-actions">
            <button type="button" className="portal-action-btn secondary" onClick={openAccount}>My Account</button>
          </div>
        </header>

        {location.pathname.startsWith('/patient-portal/calendar') && (
          <div className="portal-page-header">
            <h1>Medical Calendar</h1>
            <p>Review upcoming and past appointments on an interactive, searchable schedule.</p>
          </div>
        )}

        {showMobileMenu && (
          <div className="portal-mobile-drawer">
            <nav className="portal-mobile-drawer-nav">
              {PATIENT_NAV_ITEMS.map((item) => (
                <SidebarNavItem
                  key={item.id}
                  item={item}
                  isActive={activeItem === item.id}
                  onClick={handleNavigate}
                />
              ))}
              <button type="button" className="portal-nav-item danger" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        )}

        <main className="portal-main-content">
          <Outlet context={{ searchValue }} />
        </main>
      </div>

      <nav className="portal-mobile-nav" aria-label="Patient navigation">
        {PATIENT_MOBILE_NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`portal-mobile-item ${activeItem === item.id ? 'active' : ''}`}
            aria-current={activeItem === item.id ? 'page' : undefined}
            onClick={() => handleNavigate(item.path)}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <MyAccountModal isOpen={showAccountModal} onClose={closeAccount} />
    </div>
  );
}

export default AppLayout;
