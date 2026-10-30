import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Headphones, 
  Bell, 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  LogOut, 
  User, 
  Building,
  ShieldCheck,
  Globe
} from 'lucide-react';

/* Inline WhatsApp SVG — official brand icon */
const WhatsAppIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const NriHeader = () => {
  const { user, currentUserRole, setCurrentUserRole, showToast, selectedCurrency, setSelectedCurrency } = useApp();
  const [searchVal, setSearchVal] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setProfileOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchVal)}`);
    }
  };

  // Primary path used for navigation; aliases are extra paths that also mark this item as active
  const navLinks = [
    { name: "Dashboard",           path: "/nri/dashboard",           aliases: [] },
    { name: "My Properties",       path: "/nri/my-properties",       aliases: ["/nri/properties"] },
    { name: "Shortlisted",         path: "/nri/shortlisted",         aliases: [] },
    { name: "Compare",             path: "/nri/compare",             aliases: [] },
    { name: "Payments",            path: "/nri/payments",            aliases: [] },
    { name: "Property Management", path: "/nri/management",          aliases: ["/nri/property-management"] },
    { name: "Services",            path: "/nri/services",            aliases: [] },
    { name: "My Agent",            path: "/nri/agent",               aliases: [] },
    { name: "Documents",           path: "/nri/documents",           aliases: [] },
  ];

  return (
    <>
      {/* Top Bar */}
      <header className="nri-navbar">
        <div className="nri-nav-left">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/assets/logo/00 1Crore Property Logo 2.png" 
              alt="1 Crore Properties" 
              className="nri-brand-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/logo/logo-dark.png";
              }}
            />
          </Link>
          <span className="nri-terminal-badge">NRI Terminal</span>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="nri-nav-search">
            <Search className="nri-search-icon w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by City / Project / Builder" 
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <SlidersHorizontal className="nri-search-filter-icon w-4 h-4" onClick={() => navigate('/properties')} />
          </form>
        </div>

        {/* Right Info & Actions */}
        <div className="nri-nav-right">
          {/* Currency Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', borderRadius: '8px', padding: '4px 8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#C58A2A', marginRight: '4px' }}>💱</span>
            <select
              value={selectedCurrency}
              onChange={(e) => {
                setSelectedCurrency(e.target.value);
                showToast(`Converted all portfolio metrics to ${e.target.value}`);
              }}
              aria-label="Select currency"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '12px',
                fontWeight: 700,
                color: '#071A33',
                cursor: 'pointer'
              }}
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="AED">AED (AED)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <div className="nri-hotline">
            <Headphones className="nri-hotline-icon w-5 h-5" />
            <div>
              <div className="nri-hotline-lbl">Dedicated Hotline</div>
              <div className="nri-hotline-num">+91 98765 43210</div>
            </div>
          </div>

          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noreferrer"
            className="nri-whatsapp-btn"
            aria-label="Contact us on WhatsApp"
            title="Contact us on WhatsApp"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
          >
            <WhatsAppIcon size={20} />
          </a>

          {/* Bell Notification */}
          <button 
            onClick={() => showToast("You have 3 unread NRI investment alerts & updates")}
            className="nri-bell-btn"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="nri-bell-badge">3</span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <div 
              className="nri-user-dropdown" 
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" 
                alt="Rahul Sharma" 
                className="nri-avatar-img"
              />
              <div className="nri-user-info">
                <span className="nri-user-name">Rahul Sharma</span>
                <span className="nri-user-role">NRI Investor</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div 
                role="menu" aria-label="User profile options"               className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50"
                style={{ 
                  position: 'absolute', 
                  right: 0, 
                  marginTop: '0.5rem', 
                  width: '260px', 
                  background: '#fff', 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  border: '1px solid #E5E7EB',
                  padding: '0.5rem',
                  zIndex: 999
                }}
              >
                <div className="p-2 border-b border-slate-100 mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <span>Rahul Sharma</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded-full font-bold">VERIFIED</span>
                  </div>
                  <p className="text-[11px] text-slate-500">rohit.sharma@email.com</p>
                </div>

                <Link 
                  to="/nri/details"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4 text-amber-600" />
                  <span>NRI Profile & Verification Details</span>
                </Link>

                <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider mt-1">
                  Switch Portal
                </div>

                <button 
                  onClick={() => {
                    setCurrentUserRole('buyer');
                    setProfileOpen(false);
                    navigate('/buyer/dashboard');
                  }}
                  className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-purple-50 transition-colors"
                >
                  <Globe className="w-4 h-4 text-purple-600" />
                  <span>Buyer Experience</span>
                </button>

                <button 
                  onClick={() => {
                    setCurrentUserRole('builder');
                    setProfileOpen(false);
                    navigate('/buyer/property-dashboard');
                  }}
                  className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Building className="w-4 h-4 text-slate-700" />
                  <span>Builder Property Hub</span>
                </button>

                <button 
                  onClick={() => {
                    setCurrentUserRole('admin');
                    setProfileOpen(false);
                    navigate('/admin/dashboard');
                  }}
                  className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Admin Dashboard</span>
                </button>

                <div className="border-t border-slate-100 my-1"></div>

                <Link 
                  to="/login"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Switch Account / Logout</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Horizontal Subnavigation */}
      <nav className="nri-subnav">
      {navLinks.map((link) => {
          const isActive =
            location.pathname === link.path ||
            link.aliases.includes(location.pathname);
          return (
            <Link 
              key={link.path}
              to={link.path}
              className={`nri-subnav-link ${isActive ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default NriHeader;
