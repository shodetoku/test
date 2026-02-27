import { useNavigate } from 'react-router-dom';
import '../assets/styles/Home.css';

function HeroSection({ onNavigate }) {
  const navigate = useNavigate();

  const heroImages = [
    {
      src: 'https://images.pexels.com/photos/11198235/pexels-photo-11198235.jpeg',
      badge: { label: 'Growing Community', sub: 'Your Health, Our Priority' },
    },
    {
      src: 'https://aboutimi.com/wp-content/uploads/2020/04/rad_reading.jpg',
      badge: { stat: '98%', label: 'Successful', sub: 'Diagnosis' },
    },
    {
      src: 'https://images.pexels.com/photos/35528716/pexels-photo-35528716.jpeg',
      badge: { label: 'Quality Care', sub: 'Your Health, Our Priority' },
    },
  ];

  const handleBookAppointment = () => {
    if (onNavigate) onNavigate('book-appointment');
    else navigate('/book-appointment');
  };

  const handleSeeHow = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-hero-section">
      <div className="hero-gradient-bg">
        <div className="hero-text-area">
          <h1 className="hero-heading">
            Your Health, Our Priority
          </h1>
          <p className="hero-subtext">
            We prioritize your health and well-being. Our dedicated team of professionals<br />
            provides exceptional medical care tailored to your needs.
          </p>
          <div className="hero-cta-group">
            <button className="hero-btn-primary" onClick={handleBookAppointment}>
              <span className="hero-btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 14h2M11 14h2M14 14h2M8 17h2M11 17h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              Book Appointment
            </button>
            <button className="hero-btn-outline" onClick={handleSeeHow}>
              See How It Works
              <span className="hero-btn-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className="hero-images-row">
          {heroImages.map((img, i) => (
            <div key={i} className={`hero-img-card ${i === 1 ? 'hero-img-card--center' : ''}`}>
              <img src={img.src} alt={`Clinic scene ${i + 1}`} className="hero-img" />
              {img.badge.stat ? (
                <div className="hero-img-badge hero-img-badge--stat">
                  <div className="badge-ring">
                    <svg viewBox="0 0 44 44" width="44" height="44">
                      <circle cx="22" cy="22" r="18" fill="none" stroke="#e5e7eb" strokeWidth="4"/>
                      <circle cx="22" cy="22" r="18" fill="none" stroke="#015396" strokeWidth="4"
                        strokeDasharray="113" strokeDashoffset="8" strokeLinecap="round"
                        transform="rotate(-90 22 22)"/>
                    </svg>
                    <span className="badge-ring-text">{img.badge.stat}</span>
                  </div>
                  <div className="badge-text-group">
                    <span className="badge-main">{img.badge.label}</span>
                    <span className="badge-sub">{img.badge.sub}</span>
                  </div>
                  <div className="badge-arrow-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="hero-img-badge">
                  <span className="badge-main">{img.badge.label}</span>
                  <span className="badge-sub">{img.badge.sub}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
