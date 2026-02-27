import { useAppNavigation } from '../context/AppNavigationContext';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';

function LandingPage() {
  const { handleNavigate } = useAppNavigation();

  return (
    <>
      <section id="home">
        <HeroSection onNavigate={handleNavigate} />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="services">
        <ServicesSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </>
  );
}

export default LandingPage;
