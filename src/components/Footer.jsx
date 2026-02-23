import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo Section */}
        <div className="footer-section">
          <div className="footer-logo">
            <img 
              src="/1000234544.png" 
              alt="Zeal Community Medical Mission Foundation" 
              className="footer-logo-image" 
            />
            <div className="footer-logo-text">
              <span className="logo-text">ZCMMF</span>
              <span className="logo-subtitle">Zeal Community Medical Mission Foundation</span>
            </div>
          </div>

          <p className="footer-description">
            Your Health, Our Priority. Providing accessible, reliable, and professional healthcare services to the community.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#">Book Appointment</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li>Adult & Pediatric Care</li>
            <li>OB-GYN & Pre-natal</li>
            <li>Laboratory & X-ray</li>
            <li>Pharmacy Services</li>
            <li>Vaccination</li>
            <li>Tuli & Hilot Services</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p>
              <FontAwesomeIcon icon={faLocationDot} className="icon" />
              221 Upper Jasmin St., Payatas, Quezon City, Philippines, 1119
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="icon" />
              0928-668-1869
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="icon" />
              (02) 8711-6932
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              zealcommunitymedical@gmail.com
            </p>
            <p>
              <FontAwesomeIcon icon={faClock} className="icon" />
              Sun - Fri: 8:00 AM - 9:00 PM
            </p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Zeal Community Medical Mission Foundation. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;