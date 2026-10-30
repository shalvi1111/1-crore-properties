import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Edit3, MapPin, Building, Globe, CheckCircle2, 
  FileText, Download, Phone, Calendar, Heart, Share2, Users, 
  TrendingUp, Headphones, AlertCircle, Eye, ChevronDown, Check,
  Mail, MessageSquare, Bell, LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function NriDetails() {
  const { user, showToast } = useApp();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('details');

  const [toggles, setToggles] = useState({
    recommendations: true,
    alerts: true,
    updates: true,
    events: true
  });

  const toggleSwitch = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    showToast(`Preferences updated`);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', display: 'flex' }}>
      {/* 1. Left Sidebar */}
      <aside style={{ 
        width: '280px', 
        minWidth: '280px',
        background: '#FFFFFF', 
        borderRight: '1px solid #E2E8F0',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Top Purple Card */}
        <div style={{ 
          background: 'linear-gradient(135deg, #4338CA 0%, #312E81 100%)', 
          borderRadius: '12px', 
          padding: '16px', 
          color: '#FFFFFF' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={13} color="#FFF" />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800 }}>NRI Terminal</div>
              <div style={{ fontSize: '10px', color: '#C7D2FE' }}>Property. Anywhere. Anytime.</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#EEF2FF', color: '#4338CA', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              RS
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>Rohit Sharma</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', color: '#C7D2FE' }}>NRI User</span>
                <span style={{ fontSize: '9px', background: '#ECFDF5', color: '#059669', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>✓ Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', path: '/nri/dashboard' },
            { id: 'details', label: 'NRI Details', path: '/nri/details' },
            { id: 'shortlist', label: 'My Shortlisted Properties', count: '12', path: '/nri/shortlisted' },
            { id: 'visits', label: 'Site Visit Bookings', count: '3', path: '/nri/dashboard' },
            { id: 'enquiries', label: 'Enquiries', count: '8', path: '/nri/dashboard' },
            { id: 'offers', label: 'Bargain Offers', count: '2', path: '/nri/dashboard' },
            { id: 'docs', label: 'Documents', count: '5', path: '/nri/documents' },
            { id: 'refer', label: 'Refer & Earn', path: '/nri/dashboard' },
            { id: 'alerts', label: 'Price Alerts', path: '/nri/dashboard' },
            { id: 'searches', label: 'Saved Searches', path: '/nri/dashboard' },
            { id: 'transactions', label: 'Transaction History', path: '/nri/dashboard' },
            { id: 'profile', label: 'Profile & Security', path: '/nri/details' },
            { id: 'notifications', label: 'Notification Settings', path: '/nri/details' },
            { id: 'support', label: 'Support', path: '/nri/services' }
          ].map(link => {
            const isActive = activeNav === link.id;
            return (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => setActiveNav(link.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  background: isActive ? '#F5F3FF' : 'transparent',
                  borderLeft: isActive ? '3px solid #7C3AED' : '3px solid transparent',
                  color: isActive ? '#6D28D9' : '#475569',
                  fontSize: '12px',
                  fontWeight: isActive ? 700 : 500,
                  textDecoration: 'none'
                }}
              >
                <span>{link.label}</span>
                {link.count && (
                  <span style={{ fontSize: '10px', background: isActive ? '#EDE9FE' : '#F1F5F9', color: isActive ? '#6D28D9' : '#64748B', padding: '1px 6px', borderRadius: '10px', fontWeight: 600 }}>
                    {link.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Need Help Box */}
        <div style={{ marginTop: 'auto', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#071A33', marginBottom: '2px' }}>Need Help?</div>
          <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '10px' }}>Our NRI support team is available 10 AM – 7 PM IST</div>
          <button onClick={() => showToast("Opening priority support desk")} style={{ width: '100%', padding: '6px 0', border: '1px solid #7C3AED', background: '#FFF', color: '#7C3AED', borderRadius: '4px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
            Contact Support
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main style={{ flex: 1, padding: '24px 32px 60px 32px', maxWidth: '1100px' }}>
        {/* Welcome Banner */}
        <div style={{ 
          background: '#FFFFFF', 
          borderRadius: '12px', 
          border: '1px solid #E2E8F0', 
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#071A33', margin: '0 0 4px 0' }}>
              Welcome back, Rohit Sharma! 👋
            </h1>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
              Manage your NRI profile, documents and preferences.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#7C3AED' }}>12</div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>Shortlisted Properties</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#D97706' }}>3</div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>Upcoming Site Visits</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#DC2626' }}>8</div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>Active Enquiries</div>
            </div>
          </div>
        </div>

        {/* Section Header: NRI Details */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#071A33', margin: 0 }}>NRI Details</h2>
            <span style={{ fontSize: '11px', background: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
              ✓ Verified
            </span>
          </div>

          <button 
            onClick={() => showToast("Profile editor opened")}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              border: '1px solid #7C3AED',
              borderRadius: '6px',
              background: '#FFFFFF',
              color: '#7C3AED',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Edit3 size={13} />
            <span>Edit Details</span>
          </button>
        </div>

        {/* Personal Information Card */}
        <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '20px', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 16px 0' }}>
            Personal Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', fontSize: '12px' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '2px' }}>Full Name</div>
              <div style={{ fontWeight: 600, color: '#071A33' }}>Rohit Sharma</div>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '2px' }}>Date of Birth</div>
              <div style={{ fontWeight: 600, color: '#071A33' }}>15 Aug 1986</div>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '2px' }}>Email Address</div>
              <div style={{ fontWeight: 600, color: '#071A33' }}>rohit.sharma@email.com <span style={{ color: '#059669', fontSize: '10px' }}>✓ Verified</span></div>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '2px' }}>Mobile Number</div>
              <div style={{ fontWeight: 600, color: '#071A33' }}>+91 98765 43210 <span style={{ color: '#059669', fontSize: '10px' }}>✓ Verified</span></div>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '2px' }}>Nationality</div>
              <div style={{ fontWeight: 600, color: '#071A33' }}>Indian</div>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '2px' }}>Gender</div>
              <div style={{ fontWeight: 600, color: '#071A33' }}>Male</div>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '2px' }}>Country of Residence</div>
              <div style={{ fontWeight: 600, color: '#071A33' }}>United States of America</div>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '2px' }}>City</div>
              <div style={{ fontWeight: 600, color: '#071A33' }}>New York</div>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '2px' }}>Time Zone</div>
              <div style={{ fontWeight: 600, color: '#071A33' }}>(GMT-05:00) Eastern Time</div>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '2px' }}>Marital Status</div>
              <div style={{ fontWeight: 600, color: '#071A33' }}>Married</div>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '2px' }}>PAN (Optional)</div>
              <div style={{ fontWeight: 600, color: '#071A33' }}>ABCDE1234F</div>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '2px' }}>Aadhaar (Optional)</div>
              <div style={{ fontWeight: 600, color: '#071A33' }}>XXXX XXXX 1234</div>
            </div>
          </div>
        </div>

        {/* NRI Specific Information & Address / Tax Residency */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '18px' }}>
          {/* NRI Specific Info */}
          <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 16px 0' }}>
              NRI Specific Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '12px' }}>
              <div>
                <div style={{ color: '#94A3B8', fontSize: '11px' }}>Visa / Residency Status</div>
                <div style={{ fontWeight: 600, color: '#071A33' }}>H1B Visa</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: '11px' }}>Date of Issue</div>
                <div style={{ fontWeight: 600, color: '#071A33' }}>12 Jan 2022</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: '11px' }}>Valid Till</div>
                <div style={{ fontWeight: 600, color: '#071A33' }}>11 Jan 2027</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: '11px' }}>Passport Number</div>
                <div style={{ fontWeight: 600, color: '#071A33' }}>P1234567</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: '11px' }}>Occupation</div>
                <div style={{ fontWeight: 600, color: '#071A33' }}>Software Engineer</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: '11px' }}>Company Name</div>
                <div style={{ fontWeight: 600, color: '#071A33' }}>Google LLC</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: '11px' }}>Annual Income (INR)</div>
                <div style={{ fontWeight: 600, color: '#071A33' }}>₹ 45,00,000</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: '11px' }}>Source of Funds</div>
                <div style={{ fontWeight: 600, color: '#071A33' }}>Salary / NRE Account</div>
              </div>
            </div>
          </div>

          {/* Right: Residential Address & Tax Residency */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <MapPin size={16} color="#7C3AED" />
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', margin: 0 }}>Residential Address</h4>
              </div>
              <p style={{ fontSize: '12px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                420 Lexington Avenue, Apt 12B<br />
                New York, NY 10017<br />
                United States of America
              </p>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <FileText size={16} color="#7C3AED" />
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', margin: 0 }}>Tax Residency</h4>
              </div>
              <div style={{ fontSize: '12px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>Country of Tax Residency: <strong style={{ color: '#071A33' }}>United States of America</strong></div>
                <div>TIN / SSN: <strong style={{ color: '#071A33' }}>XXX-XX-1234</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '20px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: 0 }}>Documents</h3>
            <Link to="/nri/documents" style={{ fontSize: '12px', color: '#7C3AED', fontWeight: 600, textDecoration: 'none' }}>
              View All
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { title: 'Passport', file: 'passport_rohit.pdf', date: '15 May 2024' },
              { title: 'Visa / OCI / PIO', file: 'h1b_visa.pdf', date: '15 May 2024' },
              { title: 'Address Proof', file: 'address_proof.pdf', date: '15 May 2024' },
              { title: 'PAN Card', file: 'pan_card.pdf', date: '15 May 2024' }
            ].map((d, i) => (
              <div key={i} style={{ background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#071A33' }}>{d.title}</span>
                  <span style={{ fontSize: '9px', background: '#ECFDF5', color: '#059669', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>Verified</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>{d.file}</div>
                <div style={{ fontSize: '10px', color: '#94A3B8', marginBottom: '8px' }}>Uploaded on {d.date}</div>
                <span onClick={() => showToast(`Downloading ${d.file}`)} style={{ fontSize: '11px', color: '#7C3AED', fontWeight: 600, cursor: 'pointer' }}>
                  View / Download
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences & Communication Preferences */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '20px' }}>
          {/* Preferences */}
          <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 16px 0' }}>Preferences</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Preferred Communication</span>
                <strong style={{ color: '#071A33' }}>Email & WhatsApp</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Preferred Property Types</span>
                <strong style={{ color: '#071A33' }}>Apartment, Villa, Commercial</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Preferred Locations</span>
                <strong style={{ color: '#071A33' }}>Bangalore, Hyderabad, Pune</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Budget Range</span>
                <strong style={{ color: '#071A33' }}>₹ 1 Cr – ₹ 5 Cr</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Investment Purpose</span>
                <strong style={{ color: '#071A33' }}>Long Term Investment</strong>
              </div>
            </div>

            <button 
              onClick={() => showToast("Preferences modal opened")}
              style={{
                width: '100%',
                padding: '8px 0',
                border: '1px solid #7C3AED',
                borderRadius: '6px',
                background: '#FFFFFF',
                color: '#7C3AED',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Edit Preferences
            </button>
          </div>

          {/* Communication Preferences Toggles */}
          <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 16px 0' }}>Communication Preferences</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px' }}>
              {[
                { key: 'recommendations', title: 'Property Recommendations', desc: 'Receive handpicked properties on email/WhatsApp' },
                { key: 'alerts', title: 'Price Alerts', desc: 'Get notified about price changes' },
                { key: 'updates', title: 'Market Updates', desc: 'Receive market insights and reports' },
                { key: 'events', title: 'Events & Webinars', desc: 'Invitations to exclusive NRI events' }
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#071A33' }}>{item.title}</div>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>{item.desc}</div>
                  </div>
                  <button
                    onClick={() => toggleSwitch(item.key)}
                    style={{
                      width: '36px',
                      height: '20px',
                      borderRadius: '10px',
                      background: toggles[item.key] ? '#7C3AED' : '#CBD5E1',
                      border: 'none',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      position: 'absolute',
                      top: '2px',
                      left: toggles[item.key] ? '18px' : '2px',
                      transition: 'left 0.2s'
                    }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 12px 0' }}>Quick Actions</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
            {[
              { title: 'Shortlist Property', desc: 'Save your favorites', link: '/nri/shortlisted' },
              { title: 'Book Site Visit', desc: 'Schedule a visit', link: '/nri/dashboard' },
              { title: 'Refer & Earn', desc: 'Invite your friends', link: '/nri/dashboard' },
              { title: 'Download Brochure', desc: 'Get property details', link: '/properties' },
              { title: 'Talk to Expert', desc: 'Speak with our team', link: '/nri/services' }
            ].map((qa, i) => (
              <Link 
                key={i} 
                to={qa.link}
                style={{
                  background: '#FFFFFF',
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#071A33' }}>{qa.title}</div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>{qa.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Security Banner */}
        <div style={{ 
          background: '#FFFFFF', 
          borderRadius: '10px', 
          border: '1px solid #E2E8F0', 
          padding: '14px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#7C3AED" />
            <div>
              <strong style={{ color: '#071A33' }}>Your Data is Always Safe</strong>
              <div style={{ fontSize: '11px', color: '#64748B' }}>We use industry-standard encryption to protect your personal information.</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '11px', color: '#64748B' }}>
            <span>🔒 256-bit Encryption</span>
            <span>🛡 GDPR Compliant</span>
            <span>✓ ISO 27001 Certified</span>
          </div>
        </div>
      </main>
    </div>
  );
}
