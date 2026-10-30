import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Globe, 
  ShieldCheck, 
  Lock, 
  Building2, 
  Home, 
  Trees, 
  Briefcase, 
  FileText, 
  Phone, 
  Mail, 
  MessageCircle, 
  UploadCloud, 
  CheckCircle2, 
  Award, 
  Check, 
  Plane,
  Building,
  User,
  Calendar,
  ChevronDown,
  ShieldAlert,
  ArrowRight,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';

const NriRegisterPage = () => {
  const { setCurrentUserRole, showToast } = useApp();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Mode toggle: 'stepper' (Ref 5.1) vs 'express' (Ref 5.0)
  const initialMode = searchParams.get('mode') === 'express' ? 'express' : 'stepper';
  const [mode, setMode] = useState(initialMode);
  const [activeStep, setActiveStep] = useState(1);

  // Form Fields
  const [fullName, setFullName] = useState('Rohit Sharma');
  const [email, setEmail] = useState('rohit.sharma@email.com');
  const [mobile, setMobile] = useState('9876543210');
  const [dob, setDob] = useState('1986-08-15');
  const [gender, setGender] = useState('Male');
  const [nationality, setNationality] = useState('Indian');
  const [maritalStatus, setMaritalStatus] = useState('Married');

  const [countryResidence, setCountryResidence] = useState('United States of America');
  const [nriStatus, setNriStatus] = useState('NRI (Non-Resident Indian)');
  const [visaStatus, setVisaStatus] = useState('H1B Visa');
  const [occupation, setOccupation] = useState('Software Engineer');
  const [company, setCompany] = useState('Google LLC');
  const [annualIncome, setAnnualIncome] = useState('₹40 L - ₹60 L');
  const [pan, setPan] = useState('ABCDE1234F');

  const [passportNum, setPassportNum] = useState('P1234567');
  const [passportExpiry, setPassportExpiry] = useState('2032-10-20');
  const [visaType, setVisaType] = useState('H1B Visa');
  const [visaNum, setVisaNum] = useState('V9876543');
  const [visaExpiry, setVisaExpiry] = useState('2027-01-11');
  const [countryIssue, setCountryIssue] = useState('United States');

  const [overseasAddress, setOverseasAddress] = useState('420 Lexington Avenue, Apt 12B');
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('NY');
  const [zipCode, setZipCode] = useState('10017');

  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState(['Residential', 'Plots / Land']);
  const [encryptionActive, setEncryptionActive] = useState(true);
  const [confirmNri, setConfirmNri] = useState(true);
  const [agreed, setAgreed] = useState(true);

  const togglePropType = (type) => {
    setSelectedPropertyTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!confirmNri) {
      showToast("Please confirm that you are an NRI.", "warning");
      return;
    }
    if (activeStep < 5) {
      setActiveStep(prev => prev + 1);
      showToast(`Saved step ${activeStep}. Proceeding to Step ${activeStep + 1}`);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setCurrentUserRole('nri');
    showToast("NRI Terminal account registered and verified! Welcome aboard.");
    navigate('/nri/dashboard');
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setSearchParams({ mode: newMode });
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <header className="nri-navbar" style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="nri-nav-left" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/">
            <img 
              src="/assets/logo/00 1Crore Property Logo 2.png" 
              alt="1 Crore Properties" 
              className="nri-brand-logo"
              style={{ height: '38px', objectFit: 'contain' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/logo/logo-dark.png";
              }}
            />
          </Link>
          <span className="nri-terminal-badge" style={{ background: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D', padding: '0.2rem 0.65rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
            NRI Terminal
          </span>
        </div>

        {/* Navigation Middle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: '#334155', fontWeight: 600, cursor: 'pointer' }}>
            <span>Buy</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: '#334155', fontWeight: 600, cursor: 'pointer' }}>
            <span>Explore</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
          <Link to="/properties" style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>About Us</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: '#334155', fontWeight: 600, cursor: 'pointer' }}>
            <span>Resources</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Right CTA & Layout Mode Selector */}
        <div className="flex items-center gap-3">
          {/* Mode Switcher Pill */}
          <div style={{ display: 'inline-flex', background: '#F1F5F9', padding: '0.25rem', borderRadius: '8px', border: '1px solid #CBD5E1', marginRight: '0.5rem' }}>
            <button 
              onClick={() => switchMode('stepper')}
              style={{
                padding: '0.3rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                borderRadius: '6px',
                border: 'none',
                background: mode === 'stepper' ? '#C58A2A' : 'transparent',
                color: mode === 'stepper' ? '#fff' : '#64748B',
                cursor: 'pointer'
              }}
            >
              5-Step Stepper (Ref 5.1)
            </button>
            <button 
              onClick={() => switchMode('express')}
              style={{
                padding: '0.3rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                borderRadius: '6px',
                border: 'none',
                background: mode === 'express' ? '#071A33' : 'transparent',
                color: mode === 'express' ? '#fff' : '#64748B',
                cursor: 'pointer'
              }}
            >
              Express Form (Ref 5.0)
            </button>
          </div>

          <Link to="/login" className="btn-outline" style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem', borderColor: '#CBD5E1', borderRadius: '6px', color: '#0F172A', fontWeight: 600 }}>
            Login
          </Link>
          <Link to="/buyer/add-property" className="btn-gold" style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem', background: '#A86E1D', borderRadius: '6px', color: '#fff', fontWeight: 600 }}>
            List Your Property
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MODE 1: 5-STEP GUIDED ONBOARDING (EXACT 5. 1.png REFERENCE)              */}
      {/* ========================================================================= */}
      {mode === 'stepper' && (
        <div style={{ flex: 1, padding: '2.5rem 2rem 4rem' }}>
          <div className="container" style={{ maxWidth: '1440px', margin: '0 auto' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '440px 1fr', gap: '2.5rem', alignItems: 'stretch' }}>
              
              {/* LEFT COLUMN: HERO IMAGE CARD WITH FLIGHT / AIRPORT LOUNGE */}
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                background: '#071A33',
                backgroundImage: 'linear-gradient(180deg, rgba(7, 26, 51, 0.85) 0%, rgba(3, 18, 38, 0.95) 100%), url("https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#fff',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
              }}>
                <div>
                  {/* Brand Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(217, 119, 6, 0.2)', border: '1px solid #D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Globe className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.02em' }}>NRI Terminal</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Property. Anywhere. Anytime.</div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 style={{ fontSize: '1.9rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '1rem', color: '#FFFFFF' }}>
                    Your Trusted Partner For Real Estate In India
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Seamless property search, expert guidance and hassle-free investment for NRIs.
                  </p>

                  {/* 4 Feature Items with Circular Icons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                    <div className="flex items-center gap-3">
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Building2 className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Curated Premium Properties</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Verified listings under ₹1.99 Cr</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <User className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>NRI Dedicated Support</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Personal relationship manager</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Briefcase className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>End-to-End Assistance</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>From search to ownership</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Secure & Transparent</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>100% safe and reliable transactions</div>
                      </div>
                    </div>
                  </div>

                  {/* Benefits for NRIs Card */}
                  <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#FBBF24', marginBottom: '0.75rem' }}>Benefits for NRIs</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>Virtual property tours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>Document verification support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>Legal & tax guidance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>NRI-friendly payment options</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom link */}
                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>
                  Already have an account? <Link to="/login" style={{ color: '#FBBF24', fontWeight: 700, textDecoration: 'none' }}>Login</Link>
                </div>
              </div>

              {/* RIGHT COLUMN: 5-STEP FORM WIZARD */}
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                
                {/* 5-Step Stepper Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
                  {[
                    { num: 1, label: 'Personal Details', icon: <User className="w-4 h-4" /> },
                    { num: 2, label: 'NRI Details', icon: <User className="w-4 h-4" /> },
                    { num: 3, label: 'Contact & Address', icon: <MapPin className="w-4 h-4" /> },
                    { num: 4, label: 'Security', icon: <Lock className="w-4 h-4" /> },
                    { num: 5, label: 'Review', icon: <FileText className="w-4 h-4" /> }
                  ].map((s, idx) => {
                    const isPassed = activeStep > s.num;
                    const isCurrent = activeStep === s.num;
                    return (
                      <div 
                        key={s.num} 
                        onClick={() => setActiveStep(s.num)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', zIndex: 2, flex: 1 }}
                      >
                        <div style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: isCurrent ? '#A86E1D' : isPassed ? '#10B981' : '#F8FAFC',
                          border: isCurrent ? '2px solid #A86E1D' : isPassed ? '2px solid #10B981' : '1px solid #CBD5E1',
                          color: isCurrent || isPassed ? '#fff' : '#94A3B8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '0.5rem',
                          fontWeight: 700,
                          fontSize: '0.85rem'
                        }}>
                          {isPassed ? <Check className="w-4 h-4" /> : s.num}
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: isCurrent ? 800 : 600, color: isCurrent ? '#A86E1D' : '#64748B', textAlign: 'center' }}>
                          {s.label}
                        </div>
                      </div>
                    );
                  })}
                  {/* Progress Line */}
                  <div style={{ position: 'absolute', top: '21px', left: '10%', right: '10%', height: '2px', background: '#E2E8F0', zIndex: 1 }} />
                </div>

                {/* Subtitle */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem' }}>
                  Let's get started! Please fill in your personal details.
                </h3>

                <form onSubmit={handleNextStep}>
                  
                  {/* Grid of Personal Inputs */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>Full Name *</label>
                      <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                        <User className="w-4 h-4 text-slate-400" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                        <input 
                          type="text" 
                          value={fullName} 
                          onChange={(e) => setFullName(e.target.value)} 
                          placeholder="Enter your full name"
                          required 
                          style={{ paddingLeft: '2.5rem', height: '46px', border: '1px solid #CBD5E1', borderRadius: '8px', width: '100%' }} 
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>Date of Birth *</label>
                      <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                        <Calendar className="w-4 h-4 text-slate-400" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                        <input 
                          type="date" 
                          value={dob} 
                          onChange={(e) => setDob(e.target.value)} 
                          required 
                          style={{ paddingLeft: '2.5rem', height: '46px', border: '1px solid #CBD5E1', borderRadius: '8px', width: '100%' }} 
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>Email Address *</label>
                      <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                        <Mail className="w-4 h-4 text-slate-400" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                        <input 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="Enter your email address"
                          required 
                          style={{ paddingLeft: '2.5rem', height: '46px', border: '1px solid #CBD5E1', borderRadius: '8px', width: '100%' }} 
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>Mobile Number *</label>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0 0.75rem', fontSize: '0.85rem', fontWeight: 600 }}>
                          <span>🇮🇳 +91</span>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <input 
                          type="tel" 
                          value={mobile} 
                          onChange={(e) => setMobile(e.target.value)} 
                          placeholder="Enter mobile number"
                          required 
                          style={{ height: '46px', border: '1px solid #CBD5E1', borderRadius: '8px', width: '100%', padding: '0 1rem' }} 
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>Nationality *</label>
                      <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                        <Globe className="w-4 h-4 text-slate-400" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                        <select 
                          value={nationality} 
                          onChange={(e) => setNationality(e.target.value)}
                          style={{ paddingLeft: '2.5rem', height: '46px', border: '1px solid #CBD5E1', borderRadius: '8px', width: '100%' }}
                        >
                          <option>Indian</option>
                          <option>American</option>
                          <option>British</option>
                          <option>Canadian</option>
                          <option>Singaporean</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>Gender *</label>
                      <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                        <User className="w-4 h-4 text-slate-400" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                        <select 
                          value={gender} 
                          onChange={(e) => setGender(e.target.value)}
                          style={{ paddingLeft: '2.5rem', height: '46px', border: '1px solid #CBD5E1', borderRadius: '8px', width: '100%' }}
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section Divider: NRI Information */}
                  <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
                      NRI Information
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>Country of Residence *</label>
                        <select 
                          value={countryResidence} 
                          onChange={(e) => setCountryResidence(e.target.value)}
                          style={{ marginTop: '0.35rem', height: '46px', border: '1px solid #CBD5E1', borderRadius: '8px', width: '100%' }}
                        >
                          <option>United States of America</option>
                          <option>United Arab Emirates</option>
                          <option>United Kingdom</option>
                          <option>Canada</option>
                          <option>Singapore</option>
                          <option>Australia</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>Visa / Residency Status *</label>
                        <select 
                          value={visaStatus} 
                          onChange={(e) => setVisaStatus(e.target.value)}
                          style={{ marginTop: '0.35rem', height: '46px', border: '1px solid #CBD5E1', borderRadius: '8px', width: '100%' }}
                        >
                          <option>H1B Visa</option>
                          <option>Green Card / Permanent Resident</option>
                          <option>L1 / Work Permit</option>
                          <option>Citizen</option>
                          <option>OCI / PIO</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>Occupation *</label>
                        <input 
                          type="text" 
                          value={occupation} 
                          onChange={(e) => setOccupation(e.target.value)}
                          placeholder="Select your occupation"
                          style={{ marginTop: '0.35rem', height: '46px', border: '1px solid #CBD5E1', borderRadius: '8px', width: '100%', padding: '0 1rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>Annual Income (INR) *</label>
                        <select 
                          value={annualIncome} 
                          onChange={(e) => setAnnualIncome(e.target.value)}
                          style={{ marginTop: '0.35rem', height: '46px', border: '1px solid #CBD5E1', borderRadius: '8px', width: '100%' }}
                        >
                          <option>₹25 L - ₹40 L</option>
                          <option>₹40 L - ₹60 L</option>
                          <option>₹60 L - ₹1 Cr</option>
                          <option>₹1 Cr+</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Why We Need This Information Alert Box */}
                  <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" style={{ marginTop: '2px' }} />
                    <div style={{ fontSize: '0.8rem', color: '#92400E', lineHeight: 1.5 }}>
                      <strong style={{ fontWeight: 700, color: '#78350F' }}>Why We Need This Information?</strong><br />
                      This information helps us provide you with a personalized experience, relevant property recommendations and ensure smooth communication.
                    </div>
                  </div>

                  {/* Confirmation Checkbox */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={confirmNri} 
                        onChange={(e) => setConfirmNri(e.target.checked)} 
                        style={{ width: '18px', height: '18px', accentColor: '#A86E1D' }} 
                        required 
                      />
                      <span>I confirm that the above information is correct and I am an NRI.</span>
                    </label>
                  </div>

                  {/* CTA Button */}
                  <button 
                    type="submit" 
                    style={{
                      width: '100%',
                      height: '50px',
                      background: '#A86E1D',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    <span>Save & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: EXPRESS SINGLE-PAGE COMPREHENSIVE FORM (EXACT 5.0 REFERENCE)      */}
      {/* ========================================================================= */}
      {mode === 'express' && (
        <>
          {/* Hero Banner with Airplane Graphic (Matching 5.0) */}
          <div style={{
            background: 'linear-gradient(135deg, #071A33 0%, #031226 65%, #0B2240 100%)',
            color: '#fff',
            padding: '3rem 2rem 3.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Airplane Decorative Overlay */}
            <div style={{ position: 'absolute', right: '8%', top: '15%', opacity: 0.25, pointerEvents: 'none' }}>
              <Plane className="w-56 h-56 text-sky-400 rotate-12" />
            </div>

            <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <div style={{ color: '#C58A2A', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                NRI Terminal
              </div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: '1.2', marginBottom: '0.75rem' }}>
                Secure. Trusted. Exclusive for NRIs.
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: '650px', marginBottom: '2rem' }}>
                A dedicated platform for NRIs to discover premium properties in India with complete transparency and data security.
              </p>

              {/* 4 Trust Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', maxWidth: '1000px' }}>
                <div className="flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.06)', padding: '0.85rem 1.15rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <ShieldCheck className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>100% Secure</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>End-to-end encrypted</div>
                  </div>
                </div>

                <div className="flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.06)', padding: '0.85rem 1.15rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Lock className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Data Privacy</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>Your data, always protected</div>
                  </div>
                </div>

                <div className="flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.06)', padding: '0.85rem 1.15rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Award className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>NRI Verified Platform</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>Built exclusively for NRIs</div>
                  </div>
                </div>

                <div className="flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.06)', padding: '0.85rem 1.15rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Globe className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Dedicated Support</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>NRI Relationship Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Registration Grid (Left Form + Right Sidebar Cards) */}
          <div className="container" style={{ maxWidth: '1440px', margin: '2rem auto 4rem', padding: '0 2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem', alignItems: 'start' }}>
              
              {/* Left Form */}
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
                  Create Your NRI Terminal Account
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Please fill in the details below to get started
                </p>

                <form onSubmit={handleComplete}>
                  
                  {/* 1. PERSONAL INFORMATION */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>1</span>
                      <span>Personal Information</span>
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Full Name (As in Passport) *</label>
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={{ marginTop: '0.25rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Email ID *</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginTop: '0.25rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Mobile Number *</label>
                        <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required style={{ marginTop: '0.25rem' }} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Date of Birth *</label>
                        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required style={{ marginTop: '0.25rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Gender *</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ marginTop: '0.25rem' }}>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Marital Status</label>
                        <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} style={{ marginTop: '0.25rem' }}>
                          <option>Married</option>
                          <option>Single</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 2. NRI DETAILS */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>2</span>
                      <span>NRI Details</span>
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Country of Residence *</label>
                        <select value={countryResidence} onChange={(e) => setCountryResidence(e.target.value)} style={{ marginTop: '0.25rem' }}>
                          <option>United States of America</option>
                          <option>United Arab Emirates (UAE)</option>
                          <option>United Kingdom</option>
                          <option>Canada</option>
                          <option>Singapore</option>
                          <option>Australia</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>NRI Status *</label>
                        <select value={nriStatus} onChange={(e) => setNriStatus(e.target.value)} style={{ marginTop: '0.25rem' }}>
                          <option>NRI (Non-Resident Indian)</option>
                          <option>OCI Card Holder</option>
                          <option>PIO Card Holder</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Occupation *</label>
                        <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} style={{ marginTop: '0.25rem' }} required />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Company / Organization</label>
                        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} style={{ marginTop: '0.25rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Annual Income (INR) *</label>
                        <select value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} style={{ marginTop: '0.25rem' }}>
                          <option>₹25 L - ₹40 L</option>
                          <option>₹40 L - ₹60 L</option>
                          <option>₹60 L - ₹1 Cr</option>
                          <option>₹1 Cr+</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>PAN (Optional)</label>
                        <input type="text" value={pan} onChange={(e) => setPan(e.target.value)} style={{ marginTop: '0.25rem' }} />
                      </div>
                    </div>
                  </div>

                  {/* 3. PASSPORT & VISA DETAILS */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>3</span>
                      <span>Passport & Visa Details</span>
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Passport Number *</label>
                        <input type="text" value={passportNum} onChange={(e) => setPassportNum(e.target.value)} required style={{ marginTop: '0.25rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Passport Expiry Date *</label>
                        <input type="date" value={passportExpiry} onChange={(e) => setPassportExpiry(e.target.value)} required style={{ marginTop: '0.25rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Visa Type *</label>
                        <select value={visaType} onChange={(e) => setVisaType(e.target.value)} style={{ marginTop: '0.25rem' }}>
                          <option>H1B Visa</option>
                          <option>Permanent Resident / Green Card</option>
                          <option>Work Permit / L1</option>
                          <option>Citizen (Foreign Passport)</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Visa Number *</label>
                        <input type="text" value={visaNum} onChange={(e) => setVisaNum(e.target.value)} style={{ marginTop: '0.25rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Visa Expiry Date *</label>
                        <input type="date" value={visaExpiry} onChange={(e) => setVisaExpiry(e.target.value)} style={{ marginTop: '0.25rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Country of Issue *</label>
                        <select value={countryIssue} onChange={(e) => setCountryIssue(e.target.value)} style={{ marginTop: '0.25rem' }}>
                          <option>United States</option>
                          <option>United Arab Emirates</option>
                          <option>United Kingdom</option>
                          <option>Canada</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 4. OVERSEAS ADDRESS */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>4</span>
                      <span>NRI Proof & Address</span>
                    </h3>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Overseas Residential Address *</label>
                      <input type="text" value={overseasAddress} onChange={(e) => setOverseasAddress(e.target.value)} required style={{ marginTop: '0.25rem' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>City *</label>
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required style={{ marginTop: '0.25rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>State / Province *</label>
                        <input type="text" value={state} onChange={(e) => setState(e.target.value)} required style={{ marginTop: '0.25rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Postal / Zip Code *</label>
                        <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required style={{ marginTop: '0.25rem' }} />
                      </div>
                    </div>
                  </div>

                  {/* 5. TYPE OF PROPERTY YOU WANT TO INVEST IN */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>5</span>
                      <span>Type of Property you want to Invest in</span>
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem' }}>
                      {[
                        { name: 'Residential', desc: 'Apartments, Villas', icon: <Building2 className="w-5 h-5 text-amber-600" /> },
                        { name: 'Commercial', desc: 'Offices, Shops', icon: <Briefcase className="w-5 h-5 text-sky-600" /> },
                        { name: 'Plots / Land', desc: 'Residential / Commercial', icon: <Trees className="w-5 h-5 text-emerald-600" /> },
                        { name: 'Independent House', desc: 'Bungalows, Townhouses', icon: <Home className="w-5 h-5 text-purple-600" /> },
                        { name: 'Mixed Use', desc: 'Retail + Residential', icon: <Building className="w-5 h-5 text-amber-700" /> },
                        { name: 'Other', desc: 'Let us know', icon: <FileText className="w-5 h-5 text-slate-600" /> }
                      ].map(pt => {
                        const isSelected = selectedPropertyTypes.includes(pt.name);
                        return (
                          <div 
                            key={pt.name}
                            onClick={() => togglePropType(pt.name)}
                            style={{
                              border: isSelected ? '2px solid #C58A2A' : '1px solid #E2E8F0',
                              borderRadius: '10px',
                              padding: '0.85rem 0.5rem',
                              textAlign: 'center',
                              cursor: 'pointer',
                              background: isSelected ? '#FEF3C7' : '#fff',
                              transition: 'all 0.2s'
                            }}
                          >
                            <div style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {pt.icon}
                            </div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', marginTop: '0.35rem' }}>{pt.name}</div>
                            <div style={{ fontSize: '0.68rem', color: '#64748B' }}>{pt.desc}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 6. SECURITY & CONSENT */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>6</span>
                      <span>Security & Consent</span>
                    </h3>

                    {/* Encryption Switch Box */}
                    <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <div className="flex items-center gap-3">
                        <Lock className="w-6 h-6 text-amber-600" />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>
                            End-to-End Encryption & Data Security Activation <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '0.65rem', padding: '0.15rem 0.45rem', borderRadius: '4px', marginLeft: '0.5rem', fontWeight: 700 }}>Recommended</span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            Activate enterprise-grade encryption to secure your personal data, documents and communications.
                          </div>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={encryptionActive} 
                        onChange={(e) => setEncryptionActive(e.target.checked)} 
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
                      <label className="checkbox-label">
                        <input type="checkbox" checked={confirmNri} onChange={(e) => setConfirmNri(e.target.checked)} required />
                        <span>I confirm that I am an NRI and the above information is true and correct.</span>
                      </label>
                      <label className="checkbox-label">
                        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required />
                        <span>I agree to the <a href="#terms" style={{ color: '#C58A2A', fontWeight: 600 }}>Terms & Conditions</a>, <a href="#privacy" style={{ color: '#C58A2A', fontWeight: 600 }}>Privacy Policy</a> and <a href="#nri" style={{ color: '#C58A2A', fontWeight: 600 }}>NRI Data Protection Policy</a>.</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button 
                    type="submit" 
                    className="btn-gold" 
                    style={{ width: '100%', height: '52px', fontSize: '1.05rem', borderRadius: '10px' }}
                  >
                    <Lock className="w-5 h-5 mr-1" />
                    <span>Create NRI Terminal Account</span>
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#64748B' }}>
                    Your information is 100% secure and will never be shared with third parties.
                  </div>
                </form>
              </div>

              {/* Right Sidebar Informational Panels */}
              <div>
                {/* Padlock Security Box */}
                <div style={{ background: '#0B2240', color: '#fff', borderRadius: '20px', padding: '1.75rem', textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', border: '2px solid #C58A2A' }}>
                    <Lock className="w-7 h-7 text-amber-500" />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    Your Data is 100% Secure
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                    We use bank-grade 256-bit encryption to protect your data.
                  </p>

                  <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>End-to-end encrypted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Secure document storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Strict access control</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>No data sharing with third parties</span>
                    </div>
                  </div>
                </div>

                {/* Need Help Box */}
                <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.5rem' }}>
                  <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A', marginBottom: '0.25rem' }}>
                    Need Help?
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1rem' }}>
                    Our NRI Support Team is here for you
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem', background: '#F8FAFC', borderRadius: '8px', color: '#0F172A', fontSize: '0.85rem', fontWeight: 600 }}>
                      <Phone className="w-4 h-4 text-amber-600" />
                      <div>
                        <div>+91 98765 43210</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 400 }}>10 AM – 7 PM IST</div>
                      </div>
                    </a>

                    <button 
                      onClick={() => showToast("Opening priority NRI WhatsApp desk: +91 98765 43210")}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#25D366', color: '#fff', padding: '0.75rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem' }}
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Chat on WhatsApp</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </>
      )}

      {/* Trust Ribbon (Present in both 5.0 and 5.1) */}
      <div style={{ background: '#fff', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '1.25rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A' }}>Your Data is Always Safe</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>We use industry-standard encryption to protect your personal information.</div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2" style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2" style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2" style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
              <Award className="w-4 h-4 text-purple-600" />
              <span>ISO 27001 Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Footer */}
      <footer style={{ background: '#071A33', color: '#fff', padding: '3.5rem 2rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', gap: '3rem', marginBottom: '3rem' }}>
            <div>
              <img 
                src="/assets/logo/00 1Crore Property Logo 1.png" 
                alt="1 Crore Properties" 
                style={{ height: '42px', marginBottom: '1.25rem' }} 
              />
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '320px' }}>
                Premium properties from ₹1 Cr – ₹1.99 Cr. Where luxury meets innovation.
              </p>
            </div>

            <div>
              <h5 style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '1.25rem', color: '#F8FAFC' }}>Company</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                <Link to="/properties">About Us</Link>
                <Link to="/properties">Careers</Link>
                <Link to="/properties">Blog</Link>
                <Link to="/properties">Contact Us</Link>
              </div>
            </div>

            <div>
              <h5 style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '1.25rem', color: '#F8FAFC' }}>Resources</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                <Link to="/properties">Guides</Link>
                <Link to="/properties">Market Insights</Link>
                <Link to="/properties">FAQs</Link>
                <Link to="/properties">Privacy Policy</Link>
              </div>
            </div>

            <div>
              <h5 style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '1.25rem', color: '#F8FAFC' }}>For NRIs</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                <Link to="/nri/services">NRI Services</Link>
                <Link to="/nri/documents">Legal & Tax Guide</Link>
                <Link to="/nri/payments">Payment Options</Link>
                <Link to="/nri/agent">NRI Support</Link>
              </div>
            </div>

            <div>
              <h5 style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '1.25rem', color: '#F8FAFC' }}>Contact Us</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>info@1croreproperties.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Hyderabad, India</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
            <div>© 2025 1 Crore Properties. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <a href="#terms">Terms & Conditions</a>
              <a href="#privacy">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default NriRegisterPage;
