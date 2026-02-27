import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/AuthService';
import { saveToStorage, getFromStorage } from '../../services/StorageService';
import logoPrimary from '../../assets/images/logo-primary.png';
import '../../assets/styles/Login.css';

function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedEmail = getFromStorage('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const result = login(email, password);

    if (result.success) {
      if (rememberMe) {
        saveToStorage('rememberedEmail', email);
      } else {
        saveToStorage('rememberedEmail', null);
      }
      onNavigate('home');
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left login-left-visual">
          <img
            src="https://uplb.edu.ph/wp-content/uploads/2022/11/UPLB-hosts-medical-mission-for-nearby-communities.jpg"
            alt="Community medical mission"
            className="login-bg-image"
          />
          <div className="login-left-overlay">
            <div className="login-logo">
              <img src={logoPrimary} alt="Zeal Community Medical Mission Foundation" className="login-logo-image" />
              <div className="login-logo-text">
                <span className="logo-text">ZCMMF</span>
                <span className="logo-subtitle-login">Zeal Community Medical Mission Foundation</span>
              </div>
            </div>

            <div className="login-left-copy">
              <h1>Welcome Back!</h1>
              <p className="login-description">
                Access your medical records, manage appointments, and connect with your doctors securely.
              </p>
            </div>

            <div className="login-social-icons">
              <a
                href="https://www.facebook.com/profile.php?id=61558112962732"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="login-social-btn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H8.08V12h2.36V9.8c0-2.34 1.4-3.63 3.54-3.63 1.02 0 2.09.18 2.09.18v2.3H14.9c-1.16 0-1.52.72-1.52 1.46V12h2.59l-.41 2.89h-2.18v6.99A10 10 0 0 0 22 12z" />
                </svg>
              </a>
              <a href="mailto:zealcommunitymedical@gmail.com" aria-label="Gmail" className="login-social-btn">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="2" />
                  <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-container">
            <button type="button" className="btn-back-landing" onClick={() => navigate('/')}>
              <span className="back-arrow">{'\u2190'}</span>
              <span>Back</span>
            </button>
            <h2>Login To Your Account</h2>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  onNavigate('forgot-password');
                }} className="forgot-password">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="btn-login">
                Log in →
              </button>

              <p className="register-link">
                Don't have an account?{' '}
                <a href="#" onClick={() => onNavigate('intake-form')}>
                  Register now
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
