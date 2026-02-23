import '../styles/Services.css';

function Services() {

  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="services-hero-content">
          <h1>Our Services</h1>
          <p>Accessible, reliable, and professional healthcare services for the community</p>
        </div>
      </div>

      <div className="services-content">
        <section className="services-overview">
          <div className="service-category">
            <div className="category-icon hospital-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7h18M8 3v4M16 3v4M3 11h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z"></path>
                <path d="M12 14v4M10 16h4"></path>
              </svg>
            </div>
            <h2>Medical Services</h2>
            <ul className="service-list">
              <li>Adult, Pediatric, Surgical, and OB-GYN consultations</li>
              <li>Pre-natal care and family planning</li>
              <li>Laboratory tests and X-ray services</li>
              <li>Medical certificates</li>
            </ul>
          </div>

          <div className="service-category">
            <div className="category-icon pharmacy-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                <path d="M9 4v16M15 4v16M4 9h16M4 15h16"></path>
              </svg>
            </div>
            <h2>Pharmacy Services</h2>
            <ul className="service-list">
              <li>Generic and branded medications</li>
              <li>Professional pharmaceutical consultation</li>
              <li>Prescription filling and refills</li>
              <li>Quality medications at affordable prices</li>
            </ul>
          </div>

          <div className="service-category">
            <div className="category-icon additional-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h2>Specialized Care</h2>
            <ul className="service-list">
              <li>Tuli services (traditional and cautery methods)</li>
              <li>Hilot/massage therapy</li>
              <li>Vaccination services for all ages</li>
              <li>Comprehensive health and wellness care</li>
            </ul>
          </div>
        </section>

        <section className="pharmacy-section">
          <h2>Pharmacy Services</h2>
          <div className="pharmacy-actions">
            <div className="pharmacy-card">
              <div className="pharmacy-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                  <path d="M9 4v16M15 4v16M4 9h16M4 15h16"></path>
                </svg>
              </div>
              <h3>Request Prescription Refill</h3>
              <p>Easily request refills for your current prescriptions online</p>
              <button className="btn-pharmacy-action">Request Refill</button>
            </div>

            <div className="pharmacy-card">
              <div className="pharmacy-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <h3>Check Medicine Availability</h3>
              <p>Search our inventory to see if your medicine is in stock</p>
              <button className="btn-pharmacy-action">Check Availability</button>
            </div>

            <div className="pharmacy-card">
              <div className="pharmacy-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3>Schedule Pickup</h3>
              <p>Choose a convenient time to pick up your medications</p>
              <button className="btn-pharmacy-action">Schedule Now</button>
            </div>

            <div className="pharmacy-card">
              <div className="pharmacy-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3>Consult Pharmacist</h3>
              <p>Get professional advice from our licensed pharmacists</p>
              <button className="btn-pharmacy-action">Start Consultation</button>
            </div>
          </div>
        </section>

        <section className="departments-section">
          <h2>Our Services</h2>
          <div className="departments-grid">
            <div className="department-card">
              <div className="dept-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                  <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                  <circle cx="20" cy="10" r="2"></circle>
                </svg>
              </div>
              <h3>Adult & Pediatric Consultation</h3>
              <p>Expert care for all ages with specialized consultations</p>
            </div>
            <div className="department-card">
              <div className="dept-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3>OB-GYN Services</h3>
              <p>Pre-natal care, family planning, and women's health</p>
            </div>
            <div className="department-card">
              <div className="dept-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"></path>
                </svg>
              </div>
              <h3>Laboratory & X-ray</h3>
              <p>Comprehensive diagnostic testing and imaging services</p>
            </div>
            <div className="department-card">
              <div className="dept-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                  <path d="M9 4v16M15 4v16M4 9h16M4 15h16"></path>
                </svg>
              </div>
              <h3>Pharmacy Services</h3>
              <p>Generic and branded medications available</p>
            </div>
            <div className="department-card">
              <div className="dept-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Vaccination</h3>
              <p>Immunization services for all age groups</p>
            </div>
            <div className="department-card">
              <div className="dept-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h3>Tuli & Hilot Services</h3>
              <p>Traditional and cautery tuli, massage therapy</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Services;
