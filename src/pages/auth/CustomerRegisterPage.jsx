import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Home, 
  Trees, 
  Building, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  UploadCloud, 
  Sun, 
  Compass, 
  Check, 
  ChevronDown,
  Trash2,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CustomerRegisterPage = () => {
  const { setCurrentUserRole, showToast } = useApp();
  const navigate = useNavigate();

  // Active Category: 'apartment', 'villa', 'open-plot'
  const [activeCategory, setActiveCategory] = useState('apartment');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Identity file uploads
  const panRef = useRef(null);
  const aadhaarFrontRef = useRef(null);
  const aadhaarBackRef = useRef(null);
  const [panDoc, setPanDoc] = useState('');
  const [aadhaarFrontDoc, setAadhaarFrontDoc] = useState('');
  const [aadhaarBackDoc, setAadhaarBackDoc] = useState('');

  // Language selector state
  const [selectedLang, setSelectedLang] = useState('English');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Common Form States
  const [fullName, setFullName] = useState('Saurav Kumar');
  const [mobile, setMobile] = useState('9876543210');
  const [email, setEmail] = useState('saurav.k@email.com');
  const [dob, setDob] = useState('1992-08-15');
  const [gender, setGender] = useState('Male');
  const [nationality, setNationality] = useState('Indian');

  const [addressLine1, setAddressLine1] = useState('Flat 402, Royal Palms');
  const [addressLine2, setAddressLine2] = useState('Indiranagar');
  const [city, setCity] = useState('Bangalore');
  const [pincode, setPincode] = useState('560038');
  const [state, setState] = useState('Karnataka');
  const [sameAddress, setSameAddress] = useState(true);

  // Apartment Specific
  const [aptType, setAptType] = useState('Apartment');
  const [facing, setFacing] = useState('East');
  const [budget, setBudget] = useState('₹1 Cr - ₹1.5 Cr');
  const [bhk, setBhk] = useState('3 BHK');
  const [propertyPurpose, setPropertyPurpose] = useState('Self Use');
  const [selectedAmenities, setSelectedAmenities] = useState(['Parking', 'Lift', '24x7 Security', 'Power Backup']);
  const [preferredLocation, setPreferredLocation] = useState('Whitefield, Sarjapur, Marathahalli');
  const [availability, setAvailability] = useState('Ready to Move');
  const [customNotes, setCustomNotes] = useState('Spacious 3BHK apartment in a gated society with good connectivity.');

  // Villa Specific
  const [villaType, setVillaType] = useState('Independent Villa');
  const [villaSizeFrom, setVillaSizeFrom] = useState('2400');
  const [villaSizeTo, setVillaSizeTo] = useState('3500');
  const [possessionTimeline, setPossessionTimeline] = useState('Within 6 Months');

  // Open Plot Specific
  const [plotType, setPlotType] = useState('Open Plot / Land');
  const [plotAreaUnit, setPlotAreaUnit] = useState('Sq.ft');
  const [plotArea, setPlotArea] = useState('2400');
  const [plotShape, setPlotShape] = useState('Rectangle');
  const [roadWidth, setRoadWidth] = useState('40 Feet');
  const [approvals, setApprovals] = useState('HMDA / BDA Approved');
  const [landmarks, setLandmarks] = useState('Near Highway');

  // Password & Agreement
  const [password, setPassword] = useState('Secret@123');
  const [confirmPassword, setConfirmPassword] = useState('Secret@123');
  const [agreed, setAgreed] = useState(true);

  const isGreenTheme = activeCategory === 'villa' || activeCategory === 'open-plot';

  const toggleAmenity = (name) => {
    setSelectedAmenities(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!fullName || !email || !mobile) {
      showToast("Please fill in all mandatory personal details.", "warning");
      return;
    }
    if (!agreed) {
      showToast("Please agree to the Terms & Conditions.", "warning");
      return;
    }

    confetti({ particleCount: 90, spread: 60, origin: { y: 0.7 } });
    setCurrentUserRole('buyer');
    showToast(`Account created successfully for ${activeCategory.toUpperCase()} search!`);
    navigate('/buyer/dashboard');
  };

  return (
    <div className={`auth-wrapper ${activeCategory === 'villa' ? 'villa-theme' : activeCategory === 'open-plot' ? 'plot-theme' : ''}`} style={{ paddingBottom: '3rem' }}>
      
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
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>Secure & Trusted</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Your data is 100% safe</div>
            </div>
          </div>
          <div className="lang-selector">
            <span>English</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </header>

      {/* Main Registration Card Container */}
      <main className="container" style={{ maxWidth: '1000px', margin: '1rem auto 2rem', zIndex: 5 }}>
        <div className="auth-card" style={{ padding: '2.5rem 3rem' }}>
          
          {/* Header Title */}
          <div className="flex items-center gap-4" style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '50%', 
              background: isGreenTheme ? '#DCFCE7' : '#FEF3C7', 
              color: isGreenTheme ? '#15803D' : '#C58A2A', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0 
            }}>
              <User className="w-7 h-7" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A' }}>
                Customer Registration
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                Create your account and tell us what you are looking for. We will help you find the perfect property.
              </p>
            </div>
          </div>

          {/* Category Tabs Switcher (Top of Form) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '0.5rem', 
            background: '#F8FAFC', 
            border: '1px solid #E2E8F0', 
            borderRadius: '12px', 
            padding: '0.35rem', 
            marginBottom: '2rem' 
          }}>
            <button
              type="button"
              onClick={() => setActiveCategory('open-plot')}
              style={{
                padding: '0.75rem 0.5rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: activeCategory === 'open-plot' ? '#fff' : 'transparent',
                color: activeCategory === 'open-plot' ? '#15803D' : '#64748B',
                boxShadow: activeCategory === 'open-plot' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                borderBottom: activeCategory === 'open-plot' ? '2.5px solid #16A34A' : 'none'
              }}
            >
              <Trees className="w-4 h-4" />
              <span>Open Plot / Land</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('villa')}
              style={{
                padding: '0.75rem 0.5rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: activeCategory === 'villa' ? '#fff' : 'transparent',
                color: activeCategory === 'villa' ? '#15803D' : '#64748B',
                boxShadow: activeCategory === 'villa' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                borderBottom: activeCategory === 'villa' ? '2.5px solid #16A34A' : 'none'
              }}
            >
              <Home className="w-4 h-4" />
              <span>Villa</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('apartment')}
              style={{
                padding: '0.75rem 0.5rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: activeCategory === 'apartment' ? '#fff' : 'transparent',
                color: activeCategory === 'apartment' ? '#C58A2A' : '#64748B',
                boxShadow: activeCategory === 'apartment' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                borderBottom: activeCategory === 'apartment' ? '2.5px solid #C58A2A' : 'none'
              }}
            >
              <Building2 className="w-4 h-4" />
              <span>Apartment / Flat</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('villa')}
              style={{
                padding: '0.75rem 0.5rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'transparent',
                color: '#64748B'
              }}
            >
              <Building className="w-4 h-4" />
              <span>Independent House</span>
            </button>
          </div>

          <form onSubmit={handleRegister}>
            
            {/* 1. PERSONAL INFORMATION */}
            <div style={{ marginBottom: '2rem' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                <User className="w-5 h-5 text-amber-600" style={{ color: isGreenTheme ? '#15803D' : '#C58A2A' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>1. Personal Information</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Full Name *</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" style={{ marginTop: '0.25rem' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Mobile Number *</label>
                  <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter 10-digit mobile number" style={{ marginTop: '0.25rem' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Email Address *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" style={{ marginTop: '0.25rem' }} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Date of Birth *</label>
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={{ marginTop: '0.25rem' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Gender *</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ marginTop: '0.25rem' }}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Nationality *</label>
                  <select value={nationality} onChange={(e) => setNationality(e.target.value)} style={{ marginTop: '0.25rem' }}>
                    <option>Indian</option>
                    <option>Non-Resident Indian (NRI)</option>
                    <option>OCI / PIO</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. ADDRESS INFORMATION */}
            <div style={{ marginBottom: '2rem' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                <MapPin className="w-5 h-5 text-amber-600" style={{ color: isGreenTheme ? '#15803D' : '#C58A2A' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>2. Address Information</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Address Line 1 *</label>
                  <input type="text" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} placeholder="House / Flat No., Building Name" style={{ marginTop: '0.25rem' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Address Line 2 (Optional)</label>
                  <input type="text" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} placeholder="Area, Street, Sector, Landmark" style={{ marginTop: '0.25rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>City *</label>
                  <select value={city} onChange={(e) => setCity(e.target.value)} style={{ marginTop: '0.25rem' }}>
                    <option>Bangalore</option>
                    <option>Hyderabad</option>
                    <option>Mumbai</option>
                    <option>Pune</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Pincode *</label>
                  <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter 6-digit pincode" style={{ marginTop: '0.25rem' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>State *</label>
                  <select value={state} onChange={(e) => setState(e.target.value)} style={{ marginTop: '0.25rem' }}>
                    <option>Karnataka</option>
                    <option>Telangana</option>
                    <option>Maharashtra</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Country *</label>
                  <select style={{ marginTop: '0.25rem' }}>
                    <option>India</option>
                  </select>
                </div>
              </div>

              <label className="checkbox-label" style={{ fontSize: '0.85rem' }}>
                <input type="checkbox" checked={sameAddress} onChange={(e) => setSameAddress(e.target.checked)} />
                <span>Same as Above (Permanent Address)</span>
              </label>
            </div>

            {/* 3. DYNAMIC PROPERTY REQUIREMENTS SECTION */}
            
            {/* VARIANT A: APARTMENT (Screenshot 1.3 Apartment) */}
            {activeCategory === 'apartment' && (
              <div style={{ marginBottom: '2rem' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                  <Building2 className="w-5 h-5 text-amber-600" />
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>3. Property Requirements</h3>
                </div>

                {/* Property Type Radio Cards with Photos */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.65rem' }}>Property Type *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {[
                      { name: "Apartment", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80" },
                      { name: "Villa / House", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80" },
                      { name: "Plot / Land", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80" }
                    ].map(item => (
                      <div 
                        key={item.name}
                        onClick={() => setAptType(item.name)}
                        style={{ 
                          border: aptType === item.name ? '2px solid #C58A2A' : '1px solid #E2E8F0',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          background: '#fff'
                        }}
                      >
                        <div style={{ height: '100px', overflow: 'hidden' }}>
                          <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem' }}>
                          <span className={`radio-indicator ${aptType === item.name ? 'checked' : ''}`}></span>
                          <span>{item.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pictorial Facing (East, West, North, South) */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.65rem' }}>
                    Preference for Facing (Pictorial) *
                  </label>
                  <div className="pictorial-grid">
                    {[
                      { name: 'East', icon: <Sun className="w-7 h-7 text-amber-500" /> },
                      { name: 'West', icon: <Sun className="w-7 h-7 text-orange-500" /> },
                      { name: 'North', icon: <Compass className="w-7 h-7 text-sky-600" /> },
                      { name: 'South', icon: <Trees className="w-7 h-7 text-emerald-600" /> }
                    ].map(f => (
                      <div 
                        key={f.name}
                        onClick={() => setFacing(f.name)}
                        className={`pictorial-card ${facing === f.name ? 'active' : ''}`}
                      >
                        <div className="pictorial-art">{f.icon}</div>
                        <div className="flex items-center gap-1.5" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                          <span className={`radio-indicator ${facing === f.name ? 'checked' : ''}`}></span>
                          <span>{f.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Budget Range *</label>
                    <select value={budget} onChange={(e) => setBudget(e.target.value)} style={{ marginTop: '0.25rem' }}>
                      <option>₹1 Cr - ₹1.25 Cr</option>
                      <option>₹1.25 Cr - ₹1.5 Cr</option>
                      <option>₹1.5 Cr - ₹1.75 Cr</option>
                      <option>₹1.75 Cr - ₹1.99 Cr</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>BHK Preference *</label>
                    <select value={bhk} onChange={(e) => setBhk(e.target.value)} style={{ marginTop: '0.25rem' }}>
                      <option>2 BHK</option>
                      <option>3 BHK</option>
                      <option>4 BHK</option>
                      <option>5+ BHK</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Property Purpose *</label>
                    <select value={propertyPurpose} onChange={(e) => setPropertyPurpose(e.target.value)} style={{ marginTop: '0.25rem' }}>
                      <option>Self Use / Primary Home</option>
                      <option>Investment / Rental Income</option>
                      <option>Holiday Home</option>
                    </select>
                  </div>
                </div>

                {/* Amenities */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.5rem' }}>
                    Must Have Amenities (Optional)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                    {['Parking', 'Lift', '24x7 Security', 'Power Backup', 'Gym', 'Swimming Pool', 'Garden', 'Club House'].map(am => (
                      <label key={am} className="checkbox-label" style={{ fontSize: '0.8rem' }}>
                        <input 
                          type="checkbox" 
                          checked={selectedAmenities.includes(am)} 
                          onChange={() => toggleAmenity(am)} 
                        />
                        <span>{am}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Preferred Location</label>
                    <input type="text" value={preferredLocation} onChange={(e) => setPreferredLocation(e.target.value)} placeholder="Enter preferred locations" style={{ marginTop: '0.25rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Availability</label>
                    <select value={availability} onChange={(e) => setAvailability(e.target.value)} style={{ marginTop: '0.25rem' }}>
                      <option>Ready to Move</option>
                      <option>Under Construction (1-2 yrs)</option>
                      <option>New Launch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Tell us more about your ideal property *</label>
                  <textarea rows="3" value={customNotes} onChange={(e) => setCustomNotes(e.target.value)} placeholder="E.g. Spacious 3BHK apartment in a gated society with good connectivity and modern amenities." style={{ marginTop: '0.25rem' }}></textarea>
                </div>
              </div>
            )}

            {/* VARIANT B: VILLA (Screenshot 1.3 Villa) */}
            {activeCategory === 'villa' && (
              <div style={{ marginBottom: '2rem' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                  <Home className="w-5 h-5 text-emerald-600" />
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>3. Villa Requirements</h3>
                </div>

                {/* 5 Villa Type Cards */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.65rem' }}>Villa Type *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
                    {['Independent Villa', 'Row Villa', 'Luxury Villa', 'Gated Community Villa', 'Farm Villa'].map(vt => (
                      <div 
                        key={vt}
                        onClick={() => setVillaType(vt)}
                        style={{
                          border: villaType === vt ? '2px solid #16A34A' : '1px solid #E2E8F0',
                          borderRadius: '10px',
                          padding: '0.85rem 0.5rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: villaType === vt ? '#F0FDF4' : '#fff'
                        }}
                      >
                        <Home className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>{vt}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Budget Range *</label>
                    <select value={budget} onChange={(e) => setBudget(e.target.value)} style={{ marginTop: '0.25rem' }}>
                      <option>₹1.25 Cr - ₹1.50 Cr</option>
                      <option>₹1.50 Cr - ₹1.75 Cr</option>
                      <option>₹1.75 Cr - ₹1.99 Cr</option>
                    </select>
                    <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Maximum budget: ₹1.99 Cr</span>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>BHK Preference *</label>
                    <select value={bhk} onChange={(e) => setBhk(e.target.value)} style={{ marginTop: '0.25rem' }}>
                      <option>3 BHK</option>
                      <option>4 BHK</option>
                      <option>5+ BHK</option>
                    </select>
                    <span style={{ fontSize: '0.7rem', color: '#64748B' }}>e.g., 3 BHK, 4 BHK, 5+ BHK</span>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Villa Size (Built-up Area)</label>
                    <div className="flex items-center gap-2" style={{ marginTop: '0.25rem' }}>
                      <select style={{ width: '85px' }}><option>Sq.Ft.</option><option>Sq.Yd.</option></select>
                      <input type="number" value={villaSizeFrom} onChange={(e) => setVillaSizeFrom(e.target.value)} placeholder="From" />
                      <span>–</span>
                      <input type="number" value={villaSizeTo} onChange={(e) => setVillaSizeTo(e.target.value)} placeholder="To" />
                    </div>
                  </div>
                </div>

                {/* Amenities Pills */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.65rem' }}>
                    Amenities Preference (Select multiple)
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {[
                      'Garden / Lawn', 'Private Parking', 'Swimming Pool', 'Club House',
                      'Gym', 'Security', 'Children Play Area', 'Power Backup',
                      'Gated Community', '24x7 Water Supply', 'Pet Friendly', 'Smart Home', 'Servant Room'
                    ].map(am => {
                      const selected = selectedAmenities.includes(am);
                      return (
                        <button
                          key={am}
                          type="button"
                          onClick={() => toggleAmenity(am)}
                          style={{
                            padding: '0.45rem 0.85rem',
                            borderRadius: '9999px',
                            border: selected ? '1.5px solid #16A34A' : '1px solid #E2E8F0',
                            background: selected ? '#DCFCE7' : '#fff',
                            color: selected ? '#15803D' : '#334155',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
                        >
                          {selected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                          <span>{am}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Purpose of Purchase *</label>
                    <select value={propertyPurpose} onChange={(e) => setPropertyPurpose(e.target.value)} style={{ marginTop: '0.25rem' }}>
                      <option>Self Living / End Use</option>
                      <option>Long-term Investment</option>
                      <option>Weekend Retreat</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Possession Timeline</label>
                    <select value={possessionTimeline} onChange={(e) => setPossessionTimeline(e.target.value)} style={{ marginTop: '0.25rem' }}>
                      <option>Immediate / Ready to Move</option>
                      <option>Within 6 Months</option>
                      <option>Within 1 Year</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* VARIANT C: OPEN PLOTS (Screenshot 1.3 Open Plots) */}
            {activeCategory === 'open-plot' && (
              <div style={{ marginBottom: '2rem' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                  <Trees className="w-5 h-5 text-emerald-600" />
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>3. Open Plot Requirements</h3>
                </div>

                {/* 5 Plot Type Cards */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.65rem' }}>Plot Type *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
                    {['Open Plot / Land', 'Residential Plot', 'Commercial Plot', 'Farm Land / Agriculture', 'Industrial Plot'].map(pt => (
                      <div 
                        key={pt}
                        onClick={() => setPlotType(pt)}
                        style={{
                          border: plotType === pt ? '2px solid #16A34A' : '1px solid #E2E8F0',
                          borderRadius: '10px',
                          padding: '0.85rem 0.5rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: plotType === pt ? '#F0FDF4' : '#fff'
                        }}
                      >
                        <Trees className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>{pt}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Plot Area (in Sq.ft / Sq.yd / Acre) *</label>
                    <div className="flex items-center gap-2" style={{ marginTop: '0.25rem' }}>
                      <select value={plotAreaUnit} onChange={(e) => setPlotAreaUnit(e.target.value)} style={{ width: '100px' }}>
                        <option>Sq.ft</option>
                        <option>Sq.yd</option>
                        <option>Acre</option>
                      </select>
                      <input type="text" value={plotArea} onChange={(e) => setPlotArea(e.target.value)} placeholder="Enter area" />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Budget Range *</label>
                    <select value={budget} onChange={(e) => setBudget(e.target.value)} style={{ marginTop: '0.25rem' }}>
                      <option>₹50 L - ₹1.00 Cr</option>
                      <option>₹1.00 Cr - ₹1.50 Cr</option>
                      <option>₹1.50 Cr - ₹1.99 Cr</option>
                    </select>
                    <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Maximum budget: ₹1.99 Cr</span>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Preferred Location *</label>
                    <input type="text" value={preferredLocation} onChange={(e) => setPreferredLocation(e.target.value)} placeholder="Enter preferred locations" style={{ marginTop: '0.25rem' }} />
                  </div>
                </div>

                {/* Plot Shape Preference */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.65rem' }}>
                    Plot Shape Preference
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                    {[
                      { name: 'Square', shape: <div style={{ width: '30px', height: '30px', border: '2px solid #16a34a', margin: '0 auto' }}></div> },
                      { name: 'Rectangle', shape: <div style={{ width: '45px', height: '28px', border: '2px solid #16a34a', margin: '0 auto' }}></div> },
                      { name: 'Corner', shape: <div style={{ width: '35px', height: '35px', border: '2px solid #16a34a', borderRight: 'none', borderBottom: 'none', margin: '0 auto' }}></div> },
                      { name: 'Irregular', shape: <div style={{ width: '40px', height: '30px', border: '2px dashed #16a34a', borderRadius: '4px', margin: '0 auto' }}></div> }
                    ].map(s => (
                      <div 
                        key={s.name}
                        onClick={() => setPlotShape(s.name)}
                        style={{
                          border: plotShape === s.name ? '2px solid #16A34A' : '1px solid #E2E8F0',
                          borderRadius: '8px',
                          padding: '1rem 0.5rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: plotShape === s.name ? '#F0FDF4' : '#fff'
                        }}
                      >
                        <div style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {s.shape}
                        </div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', marginTop: '0.5rem' }}>{s.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Road Width</label>
                    <select value={roadWidth} onChange={(e) => setRoadWidth(e.target.value)} style={{ marginTop: '0.25rem' }}>
                      <option>30 Feet</option>
                      <option>40 Feet</option>
                      <option>60 Feet Main Road</option>
                      <option>80+ Feet Commercial</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Approvals Available</label>
                    <select value={approvals} onChange={(e) => setApprovals(e.target.value)} style={{ marginTop: '0.25rem' }}>
                      <option>HMDA / BDA Approved</option>
                      <option>DTCP Approved</option>
                      <option>PMRDA Approved</option>
                      <option>RERA Approved</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Availability</label>
                    <select value={availability} onChange={(e) => setAvailability(e.target.value)} style={{ marginTop: '0.25rem' }}>
                      <option>Immediate Registration</option>
                      <option>Within 30 Days</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 4. IDENTITY INFORMATION (OPTIONAL) */}
            <div style={{ marginBottom: '2rem' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                <ShieldCheck className="w-5 h-5 text-amber-600" style={{ color: isGreenTheme ? '#15803D' : '#C58A2A' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>4. Identity Information (Optional)</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', background: '#f8fafc', textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>PAN Card (Optional)</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '0.5rem' }}>Upload PAN card image</div>
                  <input 
                    type="file" 
                    ref={panRef} 
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setPanDoc(e.target.files[0].name);
                        showToast("PAN card file selected: " + e.target.files[0].name);
                      }
                    }}
                    accept=".pdf,.png,.jpg,.jpeg" 
                    style={{ display: 'none' }} 
                  />
                  <button 
                    type="button" 
                    onClick={() => panRef.current?.click()} 
                    className="btn-outline" 
                    style={{ width: '100%', padding: '0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <UploadCloud className="w-4 h-4 text-slate-500" />
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {panDoc ? panDoc : "Upload Image"}
                    </span>
                  </button>
                  {panDoc && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '11px', color: '#059669' }}>
                      <span>✓ Ready</span>
                      <button type="button" onClick={() => setPanDoc('')} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>Remove</button>
                    </div>
                  )}
                </div>

                <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', background: '#f8fafc', textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Aadhaar Card Front (Optional)</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '0.5rem' }}>Upload front side</div>
                  <input 
                    type="file" 
                    ref={aadhaarFrontRef} 
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setAadhaarFrontDoc(e.target.files[0].name);
                        showToast("Aadhaar front file selected: " + e.target.files[0].name);
                      }
                    }}
                    accept=".pdf,.png,.jpg,.jpeg" 
                    style={{ display: 'none' }} 
                  />
                  <button 
                    type="button" 
                    onClick={() => aadhaarFrontRef.current?.click()} 
                    className="btn-outline" 
                    style={{ width: '100%', padding: '0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <UploadCloud className="w-4 h-4 text-slate-500" />
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {aadhaarFrontDoc ? aadhaarFrontDoc : "Upload Image"}
                    </span>
                  </button>
                  {aadhaarFrontDoc && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '11px', color: '#059669' }}>
                      <span>✓ Ready</span>
                      <button type="button" onClick={() => setAadhaarFrontDoc('')} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>Remove</button>
                    </div>
                  )}
                </div>

                <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', background: '#f8fafc', textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Aadhaar Card Back (Optional)</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '0.5rem' }}>Upload back side</div>
                  <input 
                    type="file" 
                    ref={aadhaarBackRef} 
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setAadhaarBackDoc(e.target.files[0].name);
                        showToast("Aadhaar back file selected: " + e.target.files[0].name);
                      }
                    }}
                    accept=".pdf,.png,.jpg,.jpeg" 
                    style={{ display: 'none' }} 
                  />
                  <button 
                    type="button" 
                    onClick={() => aadhaarBackRef.current?.click()} 
                    className="btn-outline" 
                    style={{ width: '100%', padding: '0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <UploadCloud className="w-4 h-4 text-slate-500" />
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {aadhaarBackDoc ? aadhaarBackDoc : "Upload Image"}
                    </span>
                  </button>
                  {aadhaarBackDoc && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '11px', color: '#059669' }}>
                      <span>✓ Ready</span>
                      <button type="button" onClick={() => setAadhaarBackDoc('')} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>Remove</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 5. SECURITY */}
            <div style={{ marginBottom: '2rem' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                <Lock className="w-5 h-5 text-amber-600" style={{ color: isGreenTheme ? '#15803D' : '#C58A2A' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>5. Security</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Password *</label>
                  <div className="auth-input-group" style={{ marginTop: '0.25rem' }}>
                    <Lock className="auth-input-icon w-4 h-4" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Create a strong password" 
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

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Confirm Password *</label>
                  <div className="auth-input-group" style={{ marginTop: '0.25rem' }}>
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
              </div>

              <label className="checkbox-label" style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required />
                <span>I agree to the <a href="#terms" style={{ color: isGreenTheme ? '#15803D' : '#C58A2A', fontWeight: 600 }}>Terms & Conditions</a> and <a href="#privacy" style={{ color: isGreenTheme ? '#15803D' : '#C58A2A', fontWeight: 600 }}>Privacy Policy *</a></span>
              </label>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={isGreenTheme ? 'btn-green' : 'btn-gold'}
                style={{ width: '100%', height: '50px', fontSize: '1.05rem', borderRadius: '10px' }}
              >
                <User className="w-5 h-5 mr-1" />
                <span>Create Account</span>
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.9rem', color: '#64748B' }}>
                Already have an account? <Link to="/login" style={{ color: isGreenTheme ? '#15803D' : '#C58A2A', fontWeight: 700 }}>Login</Link>
              </div>
            </div>

          </form>
        </div>
      </main>

    </div>
  );
};

export default CustomerRegisterPage;
