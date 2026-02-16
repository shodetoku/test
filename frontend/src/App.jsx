import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import IntakeForm from './pages/IntakeForm';
import Login from './pages/Login';
import './index.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState('landing'); // landing, intake, login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [intakeFormCompleted, setIntakeFormCompleted] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAppointmentClick = () => {
    setCurrentView('intake');
  };

  const handleFirstTime = () => {
    setShowModal(false);
    setCurrentView('intake');
  };

  const handleReturning = () => {
    setShowModal(false);
    setCurrentView('login');
  };

  const handleIntakeFormComplete = () => {
    // Mark intake form as completed
    setIntakeFormCompleted(true);
    setCurrentView('landing');
    // Show success message
    alert('Intake form submitted successfully! You can now book an appointment.');
  };

  const handleLoginSuccess = () => {
    // Mark user as logged in
    setIsLoggedIn(true);
    setCurrentView('landing');
    // Show success message
    alert('Login successful! You can now book an appointment.');
  };

  const handleLoginNavigation = (page) => {
    if (page === 'home') {
      handleLoginSuccess();
    }
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
  };

  // Show IntakeForm
  if (currentView === 'intake') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar onNavigate={handleBackToHome} onAppointmentClick={handleAppointmentClick} />
        <main className="flex-1">
          <IntakeForm onClose={handleIntakeFormComplete} />
        </main>
        <Footer />
      </div>
    );
  }

  // Show Login
  if (currentView === 'login') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar onNavigate={handleBackToHome} onAppointmentClick={handleAppointmentClick} />
        <main className="flex-1">
          <Login onNavigate={handleLoginNavigation} />
        </main>
        <Footer />
      </div>
    );
  }

  // Show Landing Page
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onNavigate={scrollToSection} onAppointmentClick={handleAppointmentClick} />

      <main className="flex-1">
        <section id="home" className="w-full">
          <Home />
        </section>

        <section id="services" className="w-full">
          <Services />
        </section>

        <section id="contact" className="w-full">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
