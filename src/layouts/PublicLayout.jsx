import { Outlet, useLocation } from 'react-router-dom';
import { useNavigation } from '../context/NavigationContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PublicLayout() {
  const location = useLocation();
  const { handleNavigate } = useNavigation();

  const getCurrentPage = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/login') return 'login';
    if (location.pathname === '/forgot-password') return 'forgot-password';
    if (location.pathname === '/intake') return 'intake';
    return 'home';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage={getCurrentPage()} onNavigate={handleNavigate} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
