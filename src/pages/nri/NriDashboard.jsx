import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Heart, GitCompare, ShieldCheck, FileText, 
  CreditCard, UserCheck, Phone, MessageSquare, ArrowRight, 
  Sparkles, TrendingUp, CheckCircle2, Clock, Globe, DollarSign,
  Scale, Crown, Headphones, Key, Receipt, Wrench, Shield, AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import { useApp } from '../../context/AppContext';

export default function NriDashboard() {
  const { user, properties, wishlist, toggleWishlist, compareList, toggleCompare, documents, maintenanceRequests, showToast } = useApp();

  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState(null);

  // Currency conversions
  const exchangeRates = {
    INR: { rate: 1, symbol: '₹', val: '5.85 Cr' },
    USD: { rate: 0.012, symbol: '$', val: '702K' },
    AED: { rate: 0.044, symbol: 'AED ', val: '2.57M' },
    GBP: { rate: 0.0095, symbol: '£', val: '555K' }
  };

  const currentVal = exchangeRates[selectedCurrency];

  const handleAiAsk = (e) => {
    e.preventDefault();
    if (!aiQuery) return;
    setAiResponse(`Regarding "${aiQuery}": Under RBI FEMA regulations, NRIs can repatriate sale proceeds of up to USD 1 Million per financial year through their NRE/NRO accounts without prior RBI approval after submitting Form 15CA & 15CB.`);
  };

  const sparklineData = [
    { m: 'Jan', val: 5.2 },
    { m: 'Feb', val: 5.35 },
    { m: 'Mar', val: 5.42 },
    { m: 'Apr', val: 5.6 },
    { m: 'May', val: 5.75 },
    { m: 'Jun', val: 5.85 },
  ];

  const shortlistedSample = properties.slice(0, 4);

  return (
    <div className="nri-dashboard-content" style={{ padding: '24px 0 60px 0', background: '#F8FAFC', minHeight: '100vh' }}>
      <div className="container">
        
        {/* 1. TOP PORTFOLIO BANNER (Screenshot 5.1 Highlight) */}
        <div style={{ 
          background: 'linear-gradient(135deg, #071A33 0%, #0B2548 100%)', 
          borderRadius: '20px', 
          padding: '32px', 
          color: '#FFFFFF', 
          border: '1px solid rgba(197, 138, 42, 0.3)',
          marginBottom: '28px',
          boxShadow: '0 12px 30px rgba(7, 26, 51, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(197,138,42,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ background: 'rgba(197, 138, 42, 0.2)', color: '#E4AC4C', border: '1px solid #C58A2A', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px' }}>
                  NRI TERMINAL
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#60A5FA', background: 'rgba(96, 165, 250, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  <UserCheck size={13} /> NRI Verified: Rahul Sharma
                </span>
              </div>
              <h1 style={{ fontSize: '30px', fontWeight: 700, margin: '0 0 6px 0', fontFamily: 'Playfair Display, serif' }}>
                Portfolio Valuation: {currentVal.symbol}{currentVal.val}
              </h1>
              <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>
                Consolidated real estate holdings across Hyderabad (2) and Bangalore (1).
              </p>
            </div>

            {/* Currency Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
              {['INR', 'USD', 'AED', 'GBP'].map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setSelectedCurrency(curr)}
                  style={{
                    background: selectedCurrency === curr ? '#C58A2A' : 'transparent',
                    color: selectedCurrency === curr ? '#071A33' : '#E2E8F0',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar inside Banner */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>Annual Rental Yield</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#34D399', marginTop: '2px' }}>+4.8% Net</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>Capital Appreciation</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#E4AC4C', marginTop: '2px' }}>+14.2% YoY</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>Tax Saved via DTAA</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>₹28.5 Lakhs</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>Repatriation Status</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#60A5FA', marginTop: '2px' }}>100% Eligible</div>
            </div>
          </div>
        </div>

        {/* 2. 7 KPI STRIP (Screenshot 5.1) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px', marginBottom: '32px' }}>
          {[
            { label: 'My Properties', count: 4, link: '/nri/my-properties', icon: Building2, color: '#2563EB', bg: '#EFF6FF' },
            { label: 'Shortlisted', count: 12, link: '/nri/shortlisted', icon: Heart, color: '#EF4444', bg: '#FEE2E2' },
            { label: 'Compare', count: 3, link: '/nri/compare', icon: GitCompare, color: '#7C3AED', bg: '#F5F3FF' },
            { label: 'Property Mgmt', count: 2, link: '/nri/management', icon: ShieldCheck, color: '#059669', bg: '#ECFDF5' },
            { label: 'Services', count: 3, link: '/nri/services', icon: Sparkles, color: '#D97706', bg: '#FEF3C7' },
            { label: 'Documents', count: 8, link: '/nri/documents', icon: FileText, color: '#4F46E5', bg: '#EEF2FF' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link 
                key={idx}
                to={item.link}
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: '12px', 
                  padding: '16px 10px', 
                  border: '1px solid #E2E8F0',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                  <Icon size={18} />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#071A33' }}>{item.count}</div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginTop: '2px', whiteSpace: 'nowrap' }}>{item.label}</div>
              </Link>
            );
          })}

          {/* 7th Dark Navy Card: Exclusive Search Credits */}
          <div 
            onClick={() => showToast("Exclusive Search balance: 85 credits. ₹1 per search.")}
            style={{ 
              background: '#071A33', 
              borderRadius: '12px', 
              padding: '16px 10px', 
              border: '1px solid #C58A2A',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              color: '#FFFFFF'
            }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(197, 138, 42, 0.2)', color: '#C58A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <Crown size={18} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#C58A2A' }}>85</div>
            <div style={{ fontSize: '10px', color: '#E2E8F0', fontWeight: 600, marginTop: '2px' }}>Search Credits</div>
          </div>
        </div>

        {/* 3. 2-COLUMN MAIN LAYOUT (Center Content + Right Sidebar) */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', marginBottom: '32px' }}>
          
          {/* Left / Center Column: Shortlisted, Comparison Matrix, Stepper, Management */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Shortlisted Properties Strip */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#071A33', margin: 0 }}>
                    Shortlisted Properties (4)
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: '3px 0 0 0' }}>Under ₹1.99 Cr luxury listings saved for evaluation</p>
                </div>
                <Link to="/nri/shortlisted" style={{ fontSize: '12px', color: '#C58A2A', fontWeight: 700, textDecoration: 'none' }}>
                  View All 12 →
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                {shortlistedSample.map(p => (
                  <div key={p.id} style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                    <img src={p.image} alt={p.title} style={{ width: '85px', height: '75px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', margin: '2px 0 6px 0' }}>{p.location}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#C58A2A' }}>{p.priceStr}</span>
                        <a 
                          href="https://wa.me/919876543210" 
                          target="_blank" 
                          rel="noreferrer"
                          style={{ fontSize: '11px', color: '#059669', background: '#ECFDF5', padding: '3px 8px', borderRadius: '4px', textDecoration: 'none', fontWeight: 600 }}
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5-Step Token Payment Tracker (Screenshot 5.1) */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', background: '#ECFDF5', padding: '3px 8px', borderRadius: '4px' }}>
                    ESCROW VERIFIED TRANSACTION
                  </span>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#071A33', margin: '6px 0 0 0' }}>
                    Token Tracker: Skyline Heights Unit 1402 (₹1.55 Cr)
                  </h3>
                </div>
                <Link to="/nri/payments" style={{ fontSize: '13px', color: '#C58A2A', fontWeight: 600, textDecoration: 'none' }}>
                  View Milestones →
                </Link>
              </div>

              {/* 5-step Stepper */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginTop: '20px' }}>
                {[
                  { step: '1', title: 'Token Paid', desc: '₹5,00,000 Verified', done: true },
                  { step: '2', title: 'KYC & NRI Docs', desc: 'Passport & NRE ok', done: true },
                  { step: '3', title: 'Legal Agreement', desc: 'Drafted & Signed', done: true },
                  { step: '4', title: 'Escrow Payment', desc: 'In Progress (30%)', active: true },
                  { step: '5', title: 'Registration', desc: 'Scheduled Nov 2026', done: false }
                ].map((s, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      background: s.done ? '#059669' : s.active ? '#C58A2A' : '#F1F5F9',
                      color: s.done || s.active ? '#FFFFFF' : '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 8px auto',
                      fontWeight: 700,
                      fontSize: '13px'
                    }}>
                      {s.done ? <CheckCircle2 size={18} /> : s.step}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: s.active ? '#C58A2A' : '#071A33' }}>{s.title}</div>
                    <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Property Management Services Cards (Screenshot 5.1 & 5.5) */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#071A33', margin: 0 }}>
                  Property Management Services
                </h3>
                <Link to="/nri/management" style={{ fontSize: '12px', color: '#C58A2A', fontWeight: 700, textDecoration: 'none' }}>
                  Manage Properties →
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                {[
                  { title: 'Tenant Search', desc: 'Verified tenant onboarding & agreements', icon: Key, color: '#2563EB', bg: '#EFF6FF' },
                  { title: 'Rental Collection', desc: 'Direct credit to NRE/NRO account monthly', icon: Receipt, color: '#059669', bg: '#ECFDF5' },
                  { title: 'Inspection Desk', desc: 'Quarterly video walkthrough & audit', icon: Wrench, color: '#D97706', bg: '#FEF3C7' },
                  { title: 'Tax & DTAA', desc: 'Form 13 TDS exemption & advisory', icon: Shield, color: '#7C3AED', bg: '#F5F3FF' },
                ].map((srv, idx) => (
                  <div key={idx} style={{ padding: '16px 12px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: srv.bg, color: srv.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
                      <srv.icon size={20} />
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#071A33' }}>{srv.title}</div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px', lineHeight: 1.4 }}>{srv.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Anita Verma, Dedicated Hotline, AI Assistant, Documents */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Dedicated NRI Advisor Card (Anita Verma) */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#C58A2A', letterSpacing: '0.5px' }}>
                YOUR DEDICATED CONCIERGE
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '14px 0 16px 0' }}>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" 
                  alt="Anita Verma" 
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C58A2A' }}
                />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#071A33', margin: 0 }}>Anita Verma</h4>
                  <div style={{ fontSize: '12px', color: '#C58A2A', fontWeight: 600 }}>Senior NRI Portfolio Advisor</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>DLF Verified Partner • 9 Yrs Exp</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-outline" 
                  style={{ padding: '8px', fontSize: '12px', color: '#059669', borderColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <MessageSquare size={14} /> WhatsApp
                </a>
                <a 
                  href="tel:+919876543210" 
                  className="btn btn-navy" 
                  style={{ padding: '8px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Phone size={14} /> Call Desk
                </a>
              </div>
            </div>

            {/* Dedicated NRI Hotline (Screenshot 5.1) */}
            <div style={{ background: 'linear-gradient(135deg, #071A33 0%, #0F2E59 100%)', borderRadius: '16px', padding: '20px', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Headphones size={20} color="#C58A2A" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#E4AC4C' }}>DEDICATED NRI HOTLINE</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '0.5px' }}>+91 98765 43210</div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
                24x7 support covering US (PST/EST), UAE (GST), UK (GMT) and Singapore (SGT).
              </div>
            </div>

            {/* AI Assistant Mini Concierge Box */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={18} color="#C58A2A" />
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#071A33', margin: 0 }}>
                  NRI FEMA & Tax Intelligence
                </h3>
              </div>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 12px 0' }}>
                Instant answers regarding NRE repatriation, Form 13 TDS exemption, and PoA notarization.
              </p>

              <form onSubmit={handleAiAsk} style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="e.g. Can I repatriate capital gains?"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                />
                <button type="submit" className="btn btn-navy" style={{ padding: '8px 14px', fontSize: '12px' }}>
                  Ask
                </button>
              </form>

              {aiResponse && (
                <div style={{ marginTop: '12px', padding: '12px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '3px solid #C58A2A', fontSize: '12px', lineHeight: 1.5, color: '#334155' }}>
                  {aiResponse}
                </div>
              )}
            </div>

            {/* My Documents Checklist */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#071A33', margin: 0 }}>My Documents (8)</h4>
                <Link to="/nri/documents" style={{ fontSize: '11px', color: '#C58A2A', fontWeight: 700, textDecoration: 'none' }}>View Vault →</Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                {[
                  { name: 'Title Deed (Skyline Heights)', status: 'VERIFIED', ok: true },
                  { name: 'Encumbrance Certificate (30 Yrs)', status: 'VERIFIED', ok: true },
                  { name: 'Power of Attorney (Apostilled)', status: 'PENDING SIGN', ok: false },
                  { name: 'NRE Bank KYC & PAN', status: 'VERIFIED', ok: true }
                ].map((doc, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: '#F8FAFC', borderRadius: '6px' }}>
                    <span style={{ color: '#334155', fontWeight: 500 }}>{doc.name}</span>
                    <span style={{ 
                      fontSize: '10px', 
                      fontWeight: 700, 
                      color: doc.ok ? '#059669' : '#D97706',
                      background: doc.ok ? '#ECFDF5' : '#FEF3C7',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
