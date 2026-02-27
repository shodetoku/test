import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppNavigation } from '../context/AppNavigationContext';
import Navbar from './Navbar';
import Footer from './Footer';

function PublicLayout() {
  const location = useLocation();
  const { handleNavigate } = useAppNavigation();
  const isLoginPage = location.pathname === '/login';

  const getCurrentPage = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/login') return 'login';
    if (location.pathname === '/forgot-password') return 'forgot-password';
    if (location.pathname === '/intake') return 'intake';
    return 'home';
  };

  const [activePage, setActivePage] = useState(getCurrentPage());

  useEffect(() => {
    if (location.pathname !== '/') {
      setActivePage(getCurrentPage());
      return;
    }

    const sectionIds = ['home', 'about', 'services', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) {
      setActivePage('home');
      return;
    }
    const updateActiveSection = () => {
      const marker = window.scrollY + 140;
      let current = 'home';

      for (const section of sections) {
        if (section.offsetTop <= marker) {
          current = section.id;
        }
      }

      const pageBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - pageBottom < 24) {
        current = sections[sections.length - 1].id;
      }

      setActivePage(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && <Navbar currentPage={activePage} onNavigate={handleNavigate} />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default PublicLayout;
