import { createContext, useContext, useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES, SECTIONS, NAV_KEY_TO_ROUTE } from '../routes/config';

const NavigationContext = createContext(null);

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function NavigationProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');

  const handleNavigate = useCallback((dest) => {
    if (!dest) return;

    if (dest === 'book-appointment') {
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
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
