import { useNavigation } from '../context/NavigationContext';
import Home from './Home';
import AboutUs from './AboutUs';
import Services from './Services';
import Contact from './Contact';

function LandingPage() {
  const { handleNavigate } = useNavigation();

  return (
    <>
      <section id="home">
        <Home onNavigate={handleNavigate} />
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}

export default LandingPage;
