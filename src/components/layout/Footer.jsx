
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

// Social Media Icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.2H7.6V13h2.7v8h3.2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
    <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.4L1.8 2h6.4l4.5 6.8L18.9 2zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
  </svg>
);

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', icon: <FacebookIcon />, href: '#facebook' },
    { name: 'Instagram', icon: <InstagramIcon />, href: '#instagram' },
    { name: 'X', icon: <XIcon />, href: '#x' },
    { name: 'YouTube', icon: <YouTubeIcon />, href: '#youtube' },
  ];

  return (
    <footer style={{
      background: '#071A33',
      color: '#FFFFFF',
      paddingTop: '3.5rem',
      paddingBottom: '2rem',
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }}>
      <div className="container" style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <div className="site-footer-grid" style={{
          display: 'grid',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>

          {/* Brand Info */}
          <div>
            <Link to="/" style={{
              display: 'inline-block',
              marginBottom: '1.25rem'
            }}>
              <img
                src="/assets/logo/00 1Crore Property Logo 1.png"
                alt="1 Crore Properties"
                style={{ height: '44px', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/logo/logo-gold.png';
                }}
              />
            </Link>

            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              marginBottom: '1.5rem',
              maxWidth: '320px'
            }}>
              India's most trusted platform for premium properties under ₹1.99 Cr. Where luxury meets innovation.
            </p>

            {/* Social Media Icons */}
            <div style={{
              display: 'flex',
              gap: '0.85rem'
            }}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  title={social.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#C58A2A';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem' }}>Explore</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
              <li><Link to="/properties" style={{ color: 'inherit' }}>Buy Properties</Link></li>
              <li><Link to="/properties?cat=apartments" style={{ color: 'inherit' }}>Premium Apartments</Link></li>
              <li><Link to="/properties?cat=villas" style={{ color: 'inherit' }}>Luxury Villas</Link></li>
              <li><Link to="/nri/dashboard" style={{ color: '#C58A2A', fontWeight: 600 }}>NRI Terminal</Link></li>
              <li><Link to="/properties" style={{ color: 'inherit' }}>Exclusive Search</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
              <li><a href="#about" style={{ color: 'inherit' }}>About Us</a></li>
              <li><a href="#careers" style={{ color: 'inherit' }}>Careers</a></li>
              <li><a href="#partners" style={{ color: 'inherit' }}>Partners</a></li>
              <li><a href="#press" style={{ color: 'inherit' }}>Press & Media</a></li>
              <li><Link to="/login" style={{ color: 'inherit' }}>Portals</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem' }}>Resources</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
              <li><a href="#guides" style={{ color: 'inherit' }}>Buyer Guides</a></li>
              <li><a href="#reports" style={{ color: 'inherit' }}>Market Reports</a></li>
              <li><a href="#nri-faqs" style={{ color: 'inherit' }}>NRI Investment FAQs</a></li>
              <li><a href="#legal" style={{ color: 'inherit' }}>Legal & Tax Guide</a></li>
              <li><a href="#blog" style={{ color: 'inherit' }}>Real Estate Insights</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem' }}>Contact Us</h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.7)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone style={{ width: '16px', height: '16px', color: '#C58A2A' }} />
                <span>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail style={{ width: '16px', height: '16px', color: '#C58A2A' }} />
                <span>info@1croreproperties.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin style={{ width: '16px', height: '16px', color: '#C58A2A', marginTop: '2px', flexShrink: 0 }} />
                <span>4th Floor, Prestige Towers, Jubilee Hills, Hyderabad - 500033</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="site-footer-bottom" style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.6)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            © {new Date().getFullYear()} 1Crore Properties. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#privacy" style={{ color: 'inherit' }}>Privacy Policy</a>
            <a href="#terms" style={{ color: 'inherit' }}>Terms & Conditions</a>
            <a href="#nri-data" style={{ color: 'inherit' }}>NRI Data Protection Policy</a>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#10B981',
            fontWeight: 600
          }}>
            <ShieldCheck style={{ width: '18px', height: '18px' }} />
            <span>Secure & Encrypted - 256-bit SSL Protection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
