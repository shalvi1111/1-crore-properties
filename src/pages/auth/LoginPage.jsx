import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Users, 
  Globe, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Headphones, 
  BadgeCheck, 
  Phone, 
  ChevronDown 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const LoginPage = () => {
  const { setCurrentUserRole, showToast } = useApp();
  const navigate = useNavigate();

  const [selectedPortal, setSelectedPortal] = useState('buyer'); // 'builder', 'buyer', 'nri'
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedLang, setSelectedLang] = useState('English');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handlePortalSelect = (portal) => {
    setSelectedPortal(portal);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      showToast("Please enter your registered email address.", "warning");
      return;
    }
    if (!password) {
      showToast("Please enter your password.", "warning");
      return;
    }

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });

    if (selectedPortal === 'builder') {
      setCurrentUserRole('builder');
      showToast("Welcome to Builder & Developer Hub!");
      navigate('/buyer/property-dashboard');
    } else if (selectedPortal === 'nri') {
      setCurrentUserRole('nri');
      showToast("Welcome to 1 Crore NRI Terminal!");
      navigate('/nri/dashboard');
    } else {
      setCurrentUserRole('buyer');
      showToast("Welcome to Buyer Portal!");
      navigate('/buyer/dashboard');
    }
  };

  const handleSocialLogin = (provider) => {
    showToast(`Demo mode: ${provider} OAuth sign-in simulated.`);
    confetti({ particleCount: 50, spread: 50 });
    if (selectedPortal === 'nri') {
      setCurrentUserRole('nri');
      navigate('/nri/dashboard');
    } else if (selectedPortal === 'builder') {
      setCurrentUserRole('builder');
      navigate('/buyer/property-dashboard');
    } else {
      setCurrentUserRole('buyer');
      navigate('/buyer/dashboard');
    }
  };

  const getSignUpLink = () => {
    if (selectedPortal === 'builder') return '/register/builder';
    if (selectedPortal === 'nri') return '/register/nri';
    return '/register/customer';
  };

  return (
    <div className="auth-wrapper">
      {/* Top Header */}
      <header className="auth-header">
        <Link to="/">
          <img 
            src="/assets/logo/00 1Crore Property Logo 1.png" 
            alt="1 Crore Properties" 
            className="auth-logo-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/logo/logo-gold.png";
            }}
          />
        </Link>

        <div className="auth-header-badges">
          <div className="secure-badge">
            <ShieldCheck className="w-4 h-4 badge-icon text-amber-500" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>Secure & Trusted</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Your data is 100% safe</div>
            </div>
          </div>

          <div className="relative" style={{ position: 'relative' }}>
            <div 
              className="lang-selector"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <Globe className="w-4 h-4" />
              <span>{selectedLang}</span>
              <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {langDropdownOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                marginTop: '6px',
                background: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                border: '1px solid #E2E8F0',
                padding: '6px',
                minWidth: '150px',
                zIndex: 100
              }}>
                {['English', 'Hindi (हिंदी)', 'Telugu (తెలుగు)', 'Tamil (தமிழ்)', 'Arabic (العربية)'].map(lang => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setSelectedLang(lang.split(' ')[0]);
                      setLangDropdownOpen(false);
                      showToast(`Language switched to ${lang}`);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 12px',
                      fontSize: '12px',
                      border: 'none',
                      background: selectedLang === lang.split(' ')[0] ? '#FEF3C7' : 'transparent',
                      color: selectedLang === lang.split(' ')[0] ? '#B45309' : '#1E293B',
                      fontWeight: selectedLang === lang.split(' ')[0] ? 700 : 500,
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="auth-main">
        <div className="auth-grid">
          {/* Left Hero Content */}
          <div className="auth-hero-content">
            <div className="auth-tagline">WELCOME TO</div>
            <h1 className="auth-hero-title">
              1 CRORE<br />PROPERTY
            </h1>
            <p className="auth-hero-desc">
              Premium properties from ₹1 Cr – ₹1.99 Cr.
              <span>Where luxury meets innovation.</span>
            </p>

            {/* Stat Row */}
            <div className="auth-stats-row">
              <div className="auth-glass-stat">
                <Building2 className="w-8 h-8 stat-icon-gold" />
                <div>
                  <div className="stat-val">10K+</div>
                  <div className="stat-lbl">Premium Properties</div>
                </div>
              </div>

              <div className="auth-glass-stat">
                <Users className="w-8 h-8 stat-icon-gold" />
                <div>
                  <div className="stat-val">25K+</div>
                  <div className="stat-lbl">Happy Customers</div>
                </div>
              </div>
            </div>

            {/* Trusted Box */}
            <div className="auth-trusted-card">
              <ShieldCheck className="w-9 h-9" style={{ color: '#C58A2A' }} />
              <div>
                <div style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                  TRUSTED BY
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                  25,000+
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
                  Home Seekers
                </div>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="auth-card">
            <h2 className="auth-card-title">Login to Your Account</h2>
            <p className="auth-card-subtitle">Choose your portal to continue</p>

            {/* 3 Portal Selection Cards */}
            <div className="portal-cards-grid">
              {/* Builder / Developer */}
              <div 
                className={`portal-card ${selectedPortal === 'builder' ? 'active' : ''}`}
                onClick={() => handlePortalSelect('builder')}
              >
                <div className="portal-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" 
                    alt="Builder / Developer" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                </div>
                <div className="portal-badge-circle">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="portal-card-body">
                  <div className="portal-card-title">Builder / Developer</div>
                  <div className="portal-card-desc">Manage & List Properties</div>
                </div>
              </div>

              {/* Customer / Buyer */}
              <div 
                className={`portal-card ${selectedPortal === 'buyer' ? 'active' : ''}`}
                onClick={() => handlePortalSelect('buyer')}
              >
                <div className="portal-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80" 
                    alt="Customer / Buyer" 
                  />
                </div>
                <div className="portal-badge-circle">
                  <Users className="w-5 h-5" />
                </div>
                <div className="portal-card-body">
                  <div className="portal-card-title">Customer / Buyer</div>
                  <div className="portal-card-desc">Find Your Dream Home</div>
                </div>
              </div>

              {/* NRI Terminal */}
              <div 
                className={`portal-card ${selectedPortal === 'nri' ? 'active' : ''}`}
                onClick={() => handlePortalSelect('nri')}
              >
                <div className="portal-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80" 
                    alt="NRI Terminal" 
                  />
                </div>
                <div className="portal-badge-circle">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="portal-card-body">
                  <div className="portal-card-title">NRI Terminal</div>
                  <div className="portal-card-desc">For NRI Investors</div>
                </div>
              </div>
            </div>

            {/* Social Logins */}
            <div className="auth-divider">
              <span>Or continue with</span>
            </div>

            <div className="social-buttons-grid">
              <button type="button" onClick={() => handleSocialLogin('Google')} className="social-btn">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Google</span>
              </button>

              <button type="button" onClick={() => handleSocialLogin('Microsoft')} className="social-btn">
                <svg className="w-4 h-4" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
                <span>Microsoft</span>
              </button>

              <button type="button" onClick={() => handleSocialLogin('Apple')} className="social-btn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.87-.9.04-2 0.6-2.64 1.35-.57.65-1.07 1.72-0.93 2.76 1.01.08 2.03-.49 2.65-1.24z"/>
                </svg>
                <span>Apple</span>
              </button>

              <button type="button" onClick={() => handleSocialLogin('LinkedIn')} className="social-btn">
                <svg className="w-4 h-4" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                </svg>
                <span>LinkedIn</span>
              </button>
            </div>

            {/* Email Form */}
            <div className="auth-divider">
              <span>or login with email</span>
            </div>

            <form onSubmit={handleLogin}>
              <div className="auth-input-group">
                <Mail className="auth-input-icon w-4 h-4" />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input-field"
                />
              </div>

              <div className="auth-input-group">
                <Lock className="auth-input-icon w-4 h-4" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input-field"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-input-toggle"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="auth-form-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)} 
                  />
                  <span>Remember me</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => setForgotModalOpen(true)} 
                  className="forgot-link"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  Forgot Password?
                </button>
              </div>

              <button type="submit" className="btn-gold auth-submit-btn">
                Login
              </button>

              <div className="auth-switch-text">
                Don't have an account? 
                <Link to={getSignUpLink()}>Sign Up</Link>
              </div>
            </form>

            {/* Bottom Trust Indicators */}
            <div className="auth-trust-strip">
              <div className="trust-item">
                <Headphones className="trust-item-icon w-5 h-5" />
                <div>
                  <div className="trust-item-title">Dedicated Support</div>
                  <div className="trust-item-desc">We are here to help</div>
                </div>
              </div>

              <div className="trust-item">
                <BadgeCheck className="trust-item-icon w-5 h-5" />
                <div>
                  <div className="trust-item-title">Verified Listings</div>
                  <div className="trust-item-desc">100% verified properties</div>
                </div>
              </div>

              <div className="trust-item">
                <ShieldCheck className="trust-item-icon w-5 h-5" />
                <div>
                  <div className="trust-item-title">Secure Transactions</div>
                  <div className="trust-item-desc">Safe & transparent deals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="auth-footer">
        <Link to="/">
          <img 
            src="/assets/logo/00 1Crore Property Logo 1.png" 
            alt="1 Crore Properties" 
            style={{ height: '32px' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/logo/logo-gold.png";
            }}
          />
        </Link>

        <div className="auth-footer-contact">
          <a href="tel:+919876543210" className="contact-link">
            <Phone className="w-4 h-4 text-amber-500" />
            <span>+91 98765 43210</span>
          </a>
          <a href="mailto:info@1croreproperties.com" className="contact-link">
            <Mail className="w-4 h-4 text-amber-500" />
            <span>info@1croreproperties.com</span>
          </a>
          <a href="https://www.1croreproperties.com" className="contact-link">
            <Globe className="w-4 h-4 text-amber-500" />
            <span>www.1croreproperties.com</span>
          </a>
        </div>

        <div className="auth-footer-social">
          <span>Follow Us</span>
          {['f', 'in', 'yt'].map((item) => (
            <a key={item} href={`#${item}`} className="social-icon-btn">
              <span className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs">
                {item.toUpperCase()}
              </span>
            </a>
          ))}
        </div>
      </footer>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(7, 26, 51, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '440px', width: '100%', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ background: '#071A33', padding: '20px 24px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#C58A2A', textTransform: 'uppercase' }}>Account Security</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0', fontFamily: 'Playfair Display, serif' }}>Reset Your Password</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setForgotModalOpen(false)} 
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {forgotSuccess ? (
              <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', fontSize: '24px' }}>
                  ✓
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#071A33', margin: '0 0 6px 0' }}>Instructions Sent!</h4>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                  A secure password reset link has been dispatched to <strong>{forgotEmail}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} style={{ padding: '24px' }}>
                <p style={{ fontSize: '13px', color: '#64748B', marginTop: 0, marginBottom: '16px' }}>
                  Enter your registered email address below. We'll send you a password reset verification link.
                </p>

                <div className="auth-input-group" style={{ marginBottom: '20px' }}>
                  <Mail className="auth-input-icon w-4 h-4" />
                  <input 
                    type="email" 
                    placeholder="Enter your registered email" 
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="auth-input-field"
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="button" 
                    onClick={() => setForgotModalOpen(false)} 
                    className="btn btn-outline" 
                    style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-gold" 
                    style={{ flex: 2, padding: '10px', fontSize: '13px' }}
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
