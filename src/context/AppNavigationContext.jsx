import { createContext, useContext, useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES, SECTIONS, NAV_KEY_TO_ROUTE } from '../routes/RoutePaths';

const AppNavigationStateContext = createContext(null);

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function AppNavigationProvider({ children: appContent }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');

  const handleNavigate = useCallback((dest) => {
    if (!dest) return;

    if (dest === 'book-appointment' && location.pathname === ROUTES.HOME) {
      setShowModal(true);
      return;
    }

    if (SECTIONS.includes(dest)) {
      if (location.pathname !== '/') {
        navigate(ROUTES.HOME);
        setTimeout(() => scrollToSection(dest), 100);
      } else {
        scrollToSection(dest);
      }
      return;
    }

    const route = NAV_KEY_TO_ROUTE[dest] ?? `/${dest}`;
    navigate(route);
  }, [location.pathname, navigate]);

  const triggerNotification = useCallback((type) => {
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, []);

  const value = {
    handleNavigate,
    triggerNotification,
    showModal,
    setShowModal,
    showNotification,
    notificationType,
  };

  return (
    <AppNavigationStateContext.Provider value={value}>
      {appContent}
    </AppNavigationStateContext.Provider>
  );
}

export function useAppNavigation() {
  const context = useContext(AppNavigationStateContext);
  if (!context) {
    throw new Error('useAppNavigation must be used within AppNavigationProvider');
  }
  return context;
}
