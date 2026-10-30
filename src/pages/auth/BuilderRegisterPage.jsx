import React, { useState, useRef } from 'react';
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
  Phone, 
  User, 
  FileText, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  UploadCloud, 
  Trash2, 
  CheckCircle2, 
  MapPin, 
  Search,
  PhoneCall,
  Share2,
  Headphones
} from 'lucide-react';
import confetti from 'canvas-confetti';

const BuilderRegisterPage = () => {
  const { setCurrentUserRole, showToast } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1, 2, 3
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // File input refs
  const incorpInputRef = useRef(null);
  const gstInputRef = useRef(null);
  const panInputRef = useRef(null);
  const aadhaarInputRef = useRef(null);

  // Step 1 Fields
  const [fullName, setFullName] = useState('Rajesh Singhania');
  const [companyName, setCompanyName] = useState('DLF Landmark Developers');
  const [email, setEmail] = useState('rajesh@dlfbuilders.com');
  const [mobile, setMobile] = useState('9876543210');
  const [password, setPassword] = useState('Secret@123');
  const [confirmPassword, setConfirmPassword] = useState('Secret@123');
  const [gst, setGst] = useState('36AAACD1234F1Z5');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Step 2 Fields
  const [buildingName, setBuildingName] = useState('Prestige Tech Park, Block C');
  const [landmark, setLandmark] = useState('Near Marathahalli Bridge');
  const [city, setCity] = useState('Bangalore');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560103');
  const [geoSearch, setGeoSearch] = useState('Bangalore Central Office');
  const [incorpFile, setIncorpFile] = useState('doc_123456.pdf');
  const [gstFile, setGstFile] = useState('gst_654321.pdf');

  // Step 3 Fields
  const [authPerson, setAuthPerson] = useState('Rajesh Singhania');
  const [designation, setDesignation] = useState('Managing Director');
  const [panNumber, setPanNumber] = useState('ABCDE1234F');
  const [aadhaarNumber, setAadhaarNumber] = useState('9876 5432 1098');
  const [panFile, setPanFile] = useState('PAN_Front_Singhania.pdf');
  const [aadhaarFile, setAadhaarFile] = useState('Aadhaar_Front_Singhania.pdf');
  const [declared, setDeclared] = useState(true);

  const handleFileUpload = (e, setter, label) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setter(fileName);
      showToast(`${label} selected: ${fileName}`);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!fullName || !companyName || !email || !mobile) {
        showToast("Please fill in all mandatory fields.", "warning");
        return;
      }
      setStep(2);
      showToast("Account details saved. Please provide company details.");
    } else if (step === 2) {
      if (!buildingName || !city || !pincode) {
        showToast("Please fill in registered office location.", "warning");
        return;
      }
      setStep(3);
      showToast("Company details saved. Final step: Verification.");
    } else if (step === 3) {
      if (!declared) {
        showToast("Please accept the declaration to submit.", "warning");
        return;
      }
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setCurrentUserRole('builder');
      showToast("Builder registration submitted successfully! Under instant review.");
      navigate('/buyer/property-dashboard');
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Header */}
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
        </div>
      </header>

      {/* Main Container */}
      <main className="auth-main">
        <div className="auth-grid" style={{ gridTemplateColumns: step === 1 ? '1fr 1.35fr' : '0.8fr 1.6fr', alignItems: 'start' }}>
          
          {/* Left Hero Content */}
          <div className="auth-hero-content" style={{ marginTop: '1rem' }}>
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

            {/* Trusted Card */}
            <div className="auth-trusted-card">
              <ShieldCheck className="w-9 h-9" style={{ color: '#C58A2A' }} />
              <div>
                <div style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                  TRUSTED BY
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>25,000+</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>Home Seekers</div>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="auth-card" style={{ padding: '2rem 2.25rem' }}>
            
            {/* Header with Title & Stepper */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', width: '52px', height: '52px', borderRadius: '50%', background: '#C58A2A', color: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Building2 className="w-6 h-6" />
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>
                Builder / Developer Registration
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {step === 1 ? 'Create your account to get started' : 'Create your account to list and manage your properties'}
              </p>
            </div>

            {/* 3 Step Stepper (Shown for Steps 2 and 3) */}
            <div className="stepper-container" style={{ marginBottom: '1.75rem' }}>
              <div className={`stepper-step ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}`}>
                <div className="step-circle">
                  {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <span className="step-label">Account Details</span>
              </div>

              <div className={`stepper-step ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}`}>
                <div className="step-circle">
                  {step > 2 ? <Check className="w-4 h-4" /> : '2'}
                </div>
                <span className="step-label">Company Details</span>
              </div>

              <div className={`stepper-step ${step === 3 ? 'active' : ''}`}>
                <div className="step-circle">3</div>
                <span className="step-label">Verification</span>
              </div>
            </div>

            {/* STEP 1: ACCOUNT DETAILS (Screenshot 1.2 Builder 1) */}
            {step === 1 && (
              <form onSubmit={handleNext}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.75rem', alignItems: 'start' }}>
                  {/* Left Side Benefit Panel */}
                  <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '1.25rem', border: '1px solid #E2E8F0' }}>
                    <div style={{ height: '140px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?auto=format&fit=crop&w=600&q=80" 
                        alt="Builders" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A', marginBottom: '0.35rem' }}>
                      Join 1 Crore Property
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1rem', lineHeight: '1.4' }}>
                      List, manage and grow your real estate business with us.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', color: '#334155' }}>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>List unlimited properties</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>Get verified & trusted badge</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>Reach thousands of buyers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>Grow your business faster</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                      <Headphones className="w-5 h-5 text-amber-600" />
                      <div>
                        <strong>Need help?</strong> Contact our support team
                      </div>
                    </div>
                  </div>

                  {/* Right Form Fields */}
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.85rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Full Name *</label>
                        <div className="auth-input-group" style={{ marginTop: '0.35rem' }}>
                          <User className="auth-input-icon w-4 h-4" />
                          <input 
                            type="text" 
                            placeholder="Enter your full name" 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="auth-input-field"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Company / Builder Name *</label>
                        <div className="auth-input-group" style={{ marginTop: '0.35rem' }}>
                          <Building2 className="auth-input-icon w-4 h-4" />
                          <input 
                            type="text" 
                            placeholder="Enter company name" 
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="auth-input-field"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '0.85rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Email Address *</label>
                      <div className="auth-input-group" style={{ marginTop: '0.35rem' }}>
                        <Mail className="auth-input-icon w-4 h-4" />
                        <input 
                          type="email" 
                          placeholder="Enter your email address" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="auth-input-field"
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.85rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Mobile Number *</label>
                        <div className="auth-input-group" style={{ marginTop: '0.35rem' }}>
                          <Phone className="auth-input-icon w-4 h-4" />
                          <input 
                            type="tel" 
                            placeholder="+91 98765 43210" 
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="auth-input-field"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Password *</label>
                        <div className="auth-input-group" style={{ marginTop: '0.35rem' }}>
                          <Lock className="auth-input-icon w-4 h-4" />
                          <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Create password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-input-field"
                            required
                          />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-input-toggle">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '0.85rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Confirm Password *</label>
                      <div className="auth-input-group" style={{ marginTop: '0.35rem' }}>
                        <Lock className="auth-input-icon w-4 h-4" />
                        <input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Confirm your password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="auth-input-field"
                          required
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="auth-input-toggle">
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>GST Number (Optional)</label>
                      <div className="auth-input-group" style={{ marginTop: '0.35rem' }}>
                        <FileText className="auth-input-icon w-4 h-4" />
                        <input 
                          type="text" 
                          placeholder="Enter GST number" 
                          value={gst}
                          onChange={(e) => setGst(e.target.value)}
                          className="auth-input-field"
                        />
                      </div>
                    </div>

                    <label className="checkbox-label" style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                      <input 
                        type="checkbox" 
                        checked={agreedTerms}
                        onChange={(e) => setAgreedTerms(e.target.checked)}
                        required
                      />
                      <span>I agree to the <a href="#terms" style={{ color: '#C58A2A', fontWeight: 600 }}>Terms & Conditions</a> and <a href="#privacy" style={{ color: '#C58A2A', fontWeight: 600 }}>Privacy Policy</a></span>
                    </label>

                    <button type="submit" className="btn-gold" style={{ width: '100%', height: '46px', fontSize: '1rem' }}>
                      Register as Builder
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#64748B' }}>
                      Already have an account? <Link to="/login" style={{ color: '#C58A2A', fontWeight: 700 }}>Login</Link>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* STEP 2: COMPANY DETAILS & GEO LOCATION (Screenshot 1.2 Builder 2) */}
            {step === 2 && (
              <form onSubmit={handleNext}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.2rem' }}>
                    Register Office Geo Location
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Pin your registered office location</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '1.5rem', marginBottom: '2rem' }}>
                  {/* Left Map View */}
                  <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', background: '#f8fafc' }}>
                    <div style={{ padding: '0.65rem 0.85rem', background: '#fff', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Search className="w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        value={geoSearch} 
                        onChange={(e) => setGeoSearch(e.target.value)}
                        placeholder="Search location"
                        style={{ border: 'none', padding: 0, height: 'auto', background: 'transparent' }}
                      />
                    </div>
                    <div style={{ height: '170px', position: 'relative', background: 'radial-gradient(#cbd5e1 1px, transparent 1px), radial-gradient(#cbd5e1 1px, #f1f5f9 1px)', backgroundSize: '20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ textAlign: 'center' }}>
                        <MapPin className="w-9 h-9 text-red-500 fill-red-500 animate-bounce" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F172A', background: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                          Registered Office
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Address Inputs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Building / Office Name *</label>
                      <input 
                        type="text" 
                        value={buildingName} 
                        onChange={(e) => setBuildingName(e.target.value)}
                        placeholder="Enter building / office name"
                        style={{ marginTop: '0.25rem' }}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Landmark (Optional)</label>
                      <input 
                        type="text" 
                        value={landmark} 
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Enter landmark"
                        style={{ marginTop: '0.25rem' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.65rem' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>City *</label>
                        <input 
                          type="text" 
                          value={city} 
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          style={{ marginTop: '0.25rem' }}
                          required
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>State *</label>
                        <select 
                          value={state} 
                          onChange={(e) => setState(e.target.value)}
                          style={{ marginTop: '0.25rem' }}
                        >
                          <option>Karnataka</option>
                          <option>Telangana</option>
                          <option>Maharashtra</option>
                          <option>Delhi</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>Pincode *</label>
                        <input 
                          type="text" 
                          value={pincode} 
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="Pincode"
                          style={{ marginTop: '0.25rem' }}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload MCA Related Documents */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                        Upload MCA Related Documents
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
                        Upload mandatory documents issued by the Ministry of Corporate Affairs.
                      </p>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>All documents must be clear and valid</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    {/* Incorporation Certificate */}
                    <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.15rem', background: '#fff' }}>
                      <div className="flex items-center gap-3" style={{ marginBottom: '0.75rem' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#C58A2A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>Incorporation Certificate *</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Issued by MCA</div>
                        </div>
                      </div>

                      <input 
                        type="file" 
                        ref={incorpInputRef} 
                        onChange={(e) => handleFileUpload(e, setIncorpFile, "Incorporation Certificate")}
                        accept=".pdf,.png,.jpg,.jpeg" 
                        style={{ display: 'none' }} 
                      />
                      <div 
                        onClick={() => incorpInputRef.current?.click()}
                        className="upload-dropzone" 
                        style={{ padding: '1rem', cursor: 'pointer' }}
                      >
                        <UploadCloud className="w-6 h-6 text-slate-400 mx-auto" />
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A', marginTop: '0.25rem' }}>Upload Certificate</div>
                        <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Click to browse files (PDF/IMG, Max 5MB)</div>
                      </div>

                      {incorpFile && (
                        <div className="uploaded-file-row">
                          <div className="flex items-center gap-2">
                            <span className="badge badge-success">Selected</span>
                            <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{incorpFile}</span>
                          </div>
                          <button type="button" onClick={() => setIncorpFile('')} style={{ color: '#94A3B8', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                            <Trash2 className="w-4 h-4 hover:text-red-500" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* GST Registration Certificate */}
                    <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.15rem', background: '#fff' }}>
                      <div className="flex items-center gap-3" style={{ marginBottom: '0.75rem' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#C58A2A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>GST Registration Certificate *</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Issued by GST Department</div>
                        </div>
                      </div>

                      <input 
                        type="file" 
                        ref={gstInputRef} 
                        onChange={(e) => handleFileUpload(e, setGstFile, "GST Certificate")}
                        accept=".pdf,.png,.jpg,.jpeg" 
                        style={{ display: 'none' }} 
                      />
                      <div 
                        onClick={() => gstInputRef.current?.click()}
                        className="upload-dropzone" 
                        style={{ padding: '1rem', cursor: 'pointer' }}
                      >
                        <UploadCloud className="w-6 h-6 text-slate-400 mx-auto" />
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A', marginTop: '0.25rem' }}>Upload Certificate</div>
                        <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Click to browse files (PDF/IMG, Max 5MB)</div>
                      </div>

                      {gstFile && (
                        <div className="uploaded-file-row">
                          <div className="flex items-center gap-2">
                            <span className="badge badge-success">Selected</span>
                            <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{gstFile}</span>
                          </div>
                          <button type="button" onClick={() => setGstFile('')} style={{ color: '#94A3B8', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                            <Trash2 className="w-4 h-4 hover:text-red-500" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Back & Continue Controls */}
                <div className="flex items-center justify-between" style={{ marginTop: '2rem' }}>
                  <button type="button" onClick={() => setStep(1)} className="btn-outline">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button type="submit" className="btn-gold" style={{ padding: '0.75rem 2rem' }}>
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: VERIFICATION (Screenshot 1.2 Builder 3) */}
            {step === 3 && (
              <form onSubmit={handleNext}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', alignItems: 'start' }}>
                  
                  {/* Left Column: Form Details */}
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
                      Verification
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
                      Verify your identity and company details to complete your registration.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Authorized Person Name *</label>
                        <input 
                          type="text" 
                          value={authPerson} 
                          onChange={(e) => setAuthPerson(e.target.value)}
                          placeholder="Enter full name"
                          style={{ marginTop: '0.25rem' }}
                          required
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Designation *</label>
                        <input 
                          type="text" 
                          value={designation} 
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder="Enter designation"
                          style={{ marginTop: '0.25rem' }}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>PAN Number *</label>
                        <input 
                          type="text" 
                          value={panNumber} 
                          onChange={(e) => setPanNumber(e.target.value)}
                          placeholder="Enter PAN number"
                          style={{ marginTop: '0.25rem' }}
                          required
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Aadhaar Number *</label>
                        <input 
                          type="text" 
                          value={aadhaarNumber} 
                          onChange={(e) => setAadhaarNumber(e.target.value)}
                          placeholder="Enter Aadhaar number"
                          style={{ marginTop: '0.25rem' }}
                          required
                        />
                      </div>
                    </div>

                    {/* Upload KYC verification boxes */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.65rem' }}>
                        Upload Verification Documents
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', background: '#f8fafc' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>PAN Card *</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '0.65rem' }}>Upload front side of PAN card</div>
                          <input 
                            type="file" 
                            ref={panInputRef} 
                            onChange={(e) => handleFileUpload(e, setPanFile, "PAN Card")}
                            accept=".pdf,.png,.jpg,.jpeg" 
                            style={{ display: 'none' }} 
                          />
                          <button 
                            type="button" 
                            onClick={() => panInputRef.current?.click()}
                            className="btn-outline" 
                            style={{ width: '100%', padding: '0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                          >
                            <UploadCloud className="w-4 h-4 text-amber-600" />
                            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                              {panFile ? panFile : "Upload File"}
                            </span>
                          </button>
                          {panFile && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '11px', color: '#059669' }}>
                              <span>✓ File ready</span>
                              <button type="button" onClick={() => setPanFile('')} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>Remove</button>
                            </div>
                          )}
                        </div>

                        <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', background: '#f8fafc' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>Aadhaar Card *</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '0.65rem' }}>Upload front side of Aadhaar card</div>
                          <input 
                            type="file" 
                            ref={aadhaarInputRef} 
                            onChange={(e) => handleFileUpload(e, setAadhaarFile, "Aadhaar Card")}
                            accept=".pdf,.png,.jpg,.jpeg" 
                            style={{ display: 'none' }} 
                          />
                          <button 
                            type="button" 
                            onClick={() => aadhaarInputRef.current?.click()}
                            className="btn-outline" 
                            style={{ width: '100%', padding: '0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                          >
                            <UploadCloud className="w-4 h-4 text-amber-600" />
                            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                              {aadhaarFile ? aadhaarFile : "Upload File"}
                            </span>
                          </button>
                          {aadhaarFile && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '11px', color: '#059669' }}>
                              <span>✓ File ready</span>
                              <button type="button" onClick={() => setAadhaarFile('')} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>Remove</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Declaration */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                        Declaration
                      </div>
                      <label className="checkbox-label" style={{ fontSize: '0.8rem', color: '#475569', alignItems: 'flex-start' }}>
                        <input 
                          type="checkbox" 
                          checked={declared}
                          onChange={(e) => setDeclared(e.target.checked)}
                          required
                          style={{ marginTop: '3px' }}
                        />
                        <span>
                          I hereby declare that all the information provided above is true, correct and complete to the best of my knowledge. I understand that any false information may lead to rejection of my registration.
                        </span>
                      </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <button type="button" onClick={() => setStep(2)} className="btn-outline">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button type="submit" className="btn-gold" style={{ padding: '0.75rem 2rem' }}>
                        <span>Submit for Verification</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: What Happens Next & Security */}
                  <div>
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem' }}>
                      <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A', marginBottom: '1.25rem' }}>
                        What happens next?
                      </h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className="flex items-start gap-3">
                          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#FEF3C7', color: '#C58A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>Review in Progress</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: '1.4', marginTop: '0.15rem' }}>
                              Our team will review your submitted details and documents.
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#FEF3C7', color: '#C58A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <PhoneCall className="w-5 h-5" />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>Verification Call</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: '1.4', marginTop: '0.15rem' }}>
                              You may receive a call from our team for verification.
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#FEF3C7', color: '#C58A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Share2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>Approval & Access</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: '1.4', marginTop: '0.15rem' }}>
                              Once approved, you can log in and start listing your properties.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', color: '#92400E' }}>
                      <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <strong>Your information is safe with us.</strong> We use bank-grade encryption to protect your data.
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="auth-footer">
        <Link to="/">
          <img 
            src="/assets/logo/00 1Crore Property Logo 1.png" 
            alt="1 Crore Properties" 
            style={{ height: '30px' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/logo/logo-gold.png";
            }}
          />
        </Link>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
          © 2024 1 Crore Property. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem' }}>
          <a href="#privacy" style={{ color: 'rgba(255,255,255,0.7)' }}>Privacy Policy</a>
          <a href="#terms" style={{ color: 'rgba(255,255,255,0.7)' }}>Terms & Conditions</a>
        </div>
      </footer>
    </div>
  );
};

export default BuilderRegisterPage;
