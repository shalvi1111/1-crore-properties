import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  Scale,
  Crown,
  ChevronDown,
  User,
  LogOut,
  Building,
  ShieldCheck,
  Globe,
  Menu,
  X,
  Plus,
} from 'lucide-react';

const Navbar = () => {
  const {
    wishlist,
    compareList,
    user,
    currentUserRole,
    setCurrentUserRole,
    showToast,
    selectedCurrency,
    setSelectedCurrency,
  } = useApp();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (role, path) => {
    setCurrentUserRole(role);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    showToast(`Switched view to ${role.toUpperCase()} portal`);
    navigate(path);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menus after route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname, location.search]);

  const navLinks = [
    {
      label: 'Buy',
      path: '/properties',
    },
    {
      label: 'Explore',
      path: '/properties?cat=apartments',
    },
    {
      label: 'NRI Terminal',
      path: '/nri/dashboard',
      special: true,
    },
    {
      label: 'Seller Hub',
      path: '/buyer/property-dashboard',
    },
    {
      label: 'Admin',
      path: '/admin/dashboard',
    },
  ];

  const isActive = (path) => {
    if (path === '/properties') {
      return location.pathname === '/properties' &&
        !location.search.includes('cat=');
    }

    return location.pathname === path;
  };

  const userName = user?.name || 'Guest User';
  const userEmail = user?.email || 'Welcome';
  const userAvatar =
    user?.avatar ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';

  const userRoleLabel =
    currentUserRole === 'nri'
      ? 'NRI Investor'
      : currentUserRole === 'buyer'
        ? 'Buyer'
        : currentUserRole === 'builder'
          ? 'Builder'
          : 'Admin';

  return (
    <header className="site-navbar">
      <div className="navbar-container">

        {/* Brand */}
        <div className="navbar-brand-section">
          <Link to="/" className="navbar-logo">
            <img
              src="/assets/logo/00 1Crore Property Logo 2.png"
              alt="1 Crore Properties"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/assets/logo/logo-dark.png';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-links">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`navbar-link ${
                  isActive(item.path) ? 'active' : ''
                } ${item.special ? 'navbar-link-special' : ''}`}
              >
                {item.special && (
                  <span className="navbar-live-dot" />
                )}

                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Right Actions */}
        <div className="navbar-actions">

          {/* Currency Selector */}
          <div className="navbar-currency">
            <span className="currency-icon">💱</span>

            <select
              value={selectedCurrency}
              onChange={(e) => {
                setSelectedCurrency(e.target.value);
                showToast(
                  `Converted all prices to ${e.target.value}`
                );
              }}
              aria-label="Select currency"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="AED">AED (AED)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          {/* Wishlist */}
          <Link to="/nri/shortlisted" className="navbar-action-link">
            <Heart size={16} className="wishlist-icon" />
            <span>Wishlist</span>
            <span className="navbar-count">{wishlist.length}</span>
          </Link>

          {/* Compare */}
          <Link to="/compare" className="navbar-action-link">
            <Scale size={16} className="compare-icon" />
            <span>Compare</span>
            <span className="navbar-count">{compareList.length}</span>
          </Link>

          {/* Exclusive Search */}
          <button
            className="exclusive-search-btn"
            onClick={() =>
              showToast('Exclusive Search activated! ₹1 per verified query.')
            }
          >
            <Crown size={16} />
            <span>Exclusive Search</span>
            <span className="exclusive-search-price">
              ₹1 / search
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="navbar-profile-wrapper" ref={dropdownRef}>
            <button
              type="button"
              className={`navbar-profile ${
                dropdownOpen ? 'profile-active' : ''
              }`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-label="Open profile menu"
            >
              <img
                src={userAvatar}
                alt={userName}
                className="navbar-avatar"
              />

              <span className="navbar-profile-info">
                <span className="navbar-profile-name">
                  {userName}
                </span>

                <span className="navbar-profile-role">
                  {userRoleLabel}
                </span>
              </span>

              <ChevronDown
                size={15}
                className={`profile-chevron ${
                  dropdownOpen ? 'rotate' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="profile-dropdown">

                <div className="profile-dropdown-header">
                  <img src={userAvatar} alt={userName} />

                  <div>
                    <p className="profile-dropdown-name">
                      {userName}
                    </p>
                    <p className="profile-dropdown-email">
                      {userEmail}
                    </p>
                  </div>
                </div>

                <div className="profile-dropdown-label">
                  SWITCH PORTAL VIEW
                </div>

                <button
                  className="profile-menu-item"
                  onClick={() =>
                    handleRoleChange('nri', '/nri/dashboard')
                  }
                >
                  <Globe size={17} />
                  <span>NRI Terminal</span>
                </button>

                <button
                  className="profile-menu-item"
                  onClick={() =>
                    handleRoleChange('buyer', '/buyer/dashboard')
                  }
                >
                  <User size={17} />
                  <span>Buyer Experience</span>
                </button>

                <button
                  className="profile-menu-item"
                  onClick={() =>
                    handleRoleChange(
                      'builder',
                      '/buyer/property-dashboard'
                    )
                  }
                >
                  <Building size={17} />
                  <span>Builder Property Hub</span>
                </button>

                <button
                  className="profile-menu-item"
                  onClick={() =>
                    handleRoleChange('admin', '/admin/dashboard')
                  }
                >
                  <ShieldCheck size={17} />
                  <span>Admin Dashboard</span>
                </button>

                <div className="profile-dropdown-divider" />

                <Link
                  to="/login"
                  className="profile-logout"
                  onClick={() => setDropdownOpen(false)}
                >
                  <LogOut size={17} />
                  <span>Switch Account / Logout</span>
                </Link>
              </div>
            )}
          </div>

          {/* List Property */}
          <Link
            to="/buyer/add-property"
            className="navbar-list-property"
          >
            <Plus size={16} />
            <span>List Property</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-navbar-menu">

          <nav className="mobile-nav-links">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`mobile-nav-link ${
                  isActive(item.path) ? 'active' : ''
                }`}
              >
                {item.label}
                {item.special && (
                  <span className="mobile-nav-badge">LIVE</span>
                )}
              </Link>
            ))}
          </nav>

          <div className="mobile-nav-divider" />

          {/* Mobile Currency */}
          <div className="mobile-currency-wrapper">
            <span>Display Currency</span>

            <select
              value={selectedCurrency}
              onChange={(e) => {
                setSelectedCurrency(e.target.value);
                showToast(
                  `Converted all prices to ${e.target.value}`
                );
              }}
              aria-label="Select currency"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="AED">AED (AED)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          {/* Mobile Actions */}
          <div className="mobile-nav-actions">
            <Link
              to="/nri/shortlisted"
              className="mobile-nav-action"
            >
              <Heart size={17} />
              Wishlist ({wishlist.length})
            </Link>

            <Link
              to="/compare"
              className="mobile-nav-action"
            >
              <Scale size={17} />
              Compare ({compareList.length})
            </Link>

            <button
              className="mobile-exclusive-btn"
              onClick={() => {
                showToast(
                  'Exclusive Search activated! ₹1 per verified query.'
                );
                setMobileMenuOpen(false);
              }}
            >
              <Crown size={17} />
              Exclusive Search — ₹1 / search
            </button>
          </div>

          {/* Mobile Profile */}
          <div className="mobile-profile-section">
            <div className="mobile-profile-info">
              <img src={userAvatar} alt={userName} />

              <div>
                <strong>{userName}</strong>
                <span>{userRoleLabel}</span>
              </div>
            </div>

            <div className="mobile-profile-portals">
              <button
                onClick={() =>
                  handleRoleChange('nri', '/nri/dashboard')
                }
              >
                <Globe size={16} />
                NRI Portal
              </button>

              <button
                onClick={() =>
                  handleRoleChange('buyer', '/buyer/dashboard')
                }
              >
                <User size={16} />
                Buyer Portal
              </button>

              <button
                onClick={() =>
                  handleRoleChange(
                    'builder',
                    '/buyer/property-dashboard'
                  )
                }
              >
                <Building size={16} />
                Builder Portal
              </button>

              <button
                onClick={() =>
                  handleRoleChange('admin', '/admin/dashboard')
                }
              >
                <ShieldCheck size={16} />
                Admin Portal
              </button>
            </div>

            <Link
              to="/login"
              className="mobile-logout"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogOut size={16} />
              Switch Account / Logout
            </Link>
          </div>

          <Link
            to="/buyer/add-property"
            className="mobile-list-property"
          >
            <Plus size={18} />
            List Your Property
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;