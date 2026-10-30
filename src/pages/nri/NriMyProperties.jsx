import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, Home, MapPin, SlidersHorizontal, Grid, List, 
  MoreVertical, Heart, PlusCircle, Search, Calendar, Video,
  Phone, MessageSquare, FileText, DollarSign, Award, KeyRound,
  Building, Trees, Briefcase, Users, Settings, ShieldCheck,
  ChevronDown, ChevronUp, X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import greenAcresPlotsImage from '../../assets/images/properties/green-acres-plots.jpg';


const CURRENCY_RATES = {
  INR: 1,
  USD: 0.012,
  AED: 0.044,
  GBP: 0.0095
};

const CURRENCY_META = {
  INR: { symbol: '₹', code: 'INR' },
  USD: { symbol: '$', code: 'USD' },
  AED: { symbol: 'AED ', code: 'AED' },
  GBP: { symbol: '£', code: 'GBP' }
};

function parseInrAmount(value) {
  if (typeof value === 'number') return value;
  const normalized = String(value ?? '')
    .replace(/₹|,/g, '')
    .trim()
    .toUpperCase();

  const amount = Number.parseFloat(normalized);
  if (!Number.isFinite(amount)) return 0;
  if (/\bCR\b/.test(normalized)) return amount * 10000000;
  if (/\bL\b/.test(normalized)) return amount * 100000;
  if (/\bK\b/.test(normalized)) return amount * 1000;
  return amount;
}

function formatPortfolioMoney(inrAmount, currency = 'INR') {
  const rate = CURRENCY_RATES[currency] ?? 1;
  const meta = CURRENCY_META[currency] ?? CURRENCY_META.INR;
  const converted = inrAmount * rate;

  if (currency === 'INR') {
    if (converted >= 10000000) {
      return `₹${(converted / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
    }
    if (converted >= 100000) {
      return `₹${(converted / 100000).toFixed(2).replace(/\.00$/, '')} L`;
    }
    return `₹${Math.round(converted).toLocaleString('en-IN')}`;
  }

  if (converted >= 1000000) {
    return `${meta.symbol}${(converted / 1000000).toFixed(2).replace(/\.00$/, '')}M`;
  }
  if (converted >= 1000) {
    return `${meta.symbol}${(converted / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return `${meta.symbol}${converted.toFixed(2)}`;
}

function DonutChart({ data, size = 160, strokeWidth = 22, totalLabel }) {
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const gap = 0.02; // fraction of circumference used as gap between segments

  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulativeFraction = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      {data.map((segment, i) => {
        const fraction = segment.value / total;
        const gapFraction = gap / data.length;
        const dashLen = (fraction - gapFraction) * circumference;
        const dashOffset = -cumulativeFraction * circumference;
        cumulativeFraction += fraction;
        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={segment.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLen} ${circumference - dashLen}`}
            strokeDashoffset={dashOffset + circumference * 0.25} /* start at 12 o'clock */
            strokeLinecap="butt"
          />
        );
      })}
      <text x={cx} y={cy - 7} textAnchor="middle" fontSize="14" fontWeight="800" fill="#071A33">{totalLabel}</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="10" fill="#64748B">Total</text>
    </svg>
  );
}

export default function NriMyProperties() {
  const {
    wishlist,
    toggleWishlist,
    selectedCurrency,
    openVisitModal,
    openTourModal,
    downloadFile
  } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [showAll, setShowAll] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  const investmentData = [
    { name: 'Under Construction', value: 43.6, amount: 25500000, color: '#D97706' },
    { name: 'Ready to Move',      value: 48.7, amount: 28500000, color: '#059669' },
    { name: 'Plots / Land',       value: 7.7,  amount: 7850000, color: '#7C3AED' }
  ];

  const stats = [
    { label: 'Total Properties',   count: '08',       icon: Home,      bg: '#F8FAFC',  catId: 'all' },
    { label: 'Under Construction', count: '03',       icon: Building2, bg: '#FEF3C7',  catId: 'construction' },
    { label: 'Ready to Move',      count: '02',       icon: Home,      bg: '#ECFDF5',  catId: 'ready' },
    { label: 'Rented Out',         count: '02',       icon: DollarSign,bg: '#EFF6FF',  catId: 'rented' },
    { label: 'Plots / Land',       count: '01',       icon: MapPin,    bg: '#F0FDF4',  catId: 'plots' },
    { label: 'Total Investment',   count: formatPortfolioMoney(58500000, selectedCurrency), icon: Award,     bg: '#FFFBEB',  isHighlight: true }
  ];

  const allProperties = [
    {
      id: 'PROP-101', catId: 'construction', publicPropertyId: 'CP10242',
      title: 'Skyline Heights', location: 'Hyderabad, Telangana',
      badge: 'Under Construction', badgeColor: '#D97706',
      photos: '24 Photos', type: '3 BHK Apartment', size: '1,450 sq.ft',
      floor: '12th Floor', possession: 'Dec 2026',
      totalInv: '₹1.45 Cr', amountPaid: '₹10.00 L',
      status: 'Token Paid', statusColor: '#059669', statusBg: '#ECFDF5',
      appreciation: '+ 14.2%',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'PROP-102', catId: 'ready', publicPropertyId: 'CP10243',
      title: 'Luxury Villa Greens', location: 'Bangalore, Karnataka',
      badge: 'Ready to Move', badgeColor: '#059669',
      photos: '18 Photos', type: '4 BHK Villa', size: '2,800 sq.ft',
      possession: 'Ready to Move', furnishing: 'Semi Furnished',
      totalInv: '₹2.85 Cr', amountPaid: '₹50.00 L',
      status: 'Agreement Signed', statusColor: '#2563EB', statusBg: '#EFF6FF',
      rentalYield: '3.8%',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'PROP-103', catId: 'construction', publicPropertyId: 'CP10244',
      title: 'Oceanview Residences', location: 'Mumbai, Maharashtra',
      badge: 'Under Construction', badgeColor: '#D97706',
      photos: '30 Photos', type: '3 BHK Apartment', size: '1,850 sq.ft',
      floor: '18th Floor', possession: 'Jun 2026',
      totalInv: '₹3.10 Cr', amountPaid: '₹15.00 L',
      status: 'Construction in Progress', statusColor: '#059669', statusBg: '#ECFDF5',
      appreciation: '+ 12.5%',
      image: 'https://images.unsplash.com/photo-1787711081322-a37eefcf550a?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'PROP-104', catId: 'plots', publicPropertyId: 'CP10246',
      title: 'Green Acres Plots', location: 'Pune, Maharashtra',
      badge: 'Plots / Land', badgeColor: '#059669',
      photos: '12 Photos', type: 'Residential Plot', size: '2,400 sq.ft',
      facing: 'East', possession: 'Dec 2025',
      totalInv: '₹78.50 L', amountPaid: '₹5.00 L',
      status: 'Documentation', statusColor: '#D97706', statusBg: '#FEF3C7',
      appreciation: '+ 10.1%',
      image: greenAcresPlotsImage
    },
    {
      id: 'PROP-105', catId: 'rented',
      title: 'Prestige Lake Shores', location: 'Hyderabad, Telangana',
      badge: 'Rented Out', badgeColor: '#2563EB',
      photos: '20 Photos', type: '2 BHK Apartment', size: '1,200 sq.ft',
      floor: '5th Floor', possession: 'Ready to Move',
      totalInv: '₹65.00 L', amountPaid: '₹65.00 L',
      status: 'Tenanted', statusColor: '#059669', statusBg: '#ECFDF5',
      rentalYield: '4.2%',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'PROP-106', catId: 'rented',
      title: 'Brigade Cosmopolis', location: 'Bangalore, Karnataka',
      badge: 'Rented Out', badgeColor: '#2563EB',
      photos: '16 Photos', type: '3 BHK Apartment', size: '1,650 sq.ft',
      floor: '8th Floor', possession: 'Ready to Move',
      totalInv: '₹1.20 Cr', amountPaid: '₹1.20 Cr',
      status: 'Tenanted', statusColor: '#059669', statusBg: '#ECFDF5',
      rentalYield: '3.5%',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'PROP-107', catId: 'construction', publicPropertyId: 'CP10241',
      title: 'Premium Sky Tower Apartment', location: 'Hyderabad, Telangana',
      badge: 'Under Construction', badgeColor: '#D97706',
      photos: '22 Photos', type: '3 BHK Apartment', size: '2,250 sq.ft',
      floor: '14th Floor', possession: 'Dec 2026',
      totalInv: '₹1.55 Cr', amountPaid: '₹12.00 L',
      status: 'Token Paid', statusColor: '#059669', statusBg: '#ECFDF5',
      appreciation: '+ 14.2%',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'PROP-108', catId: 'ready', publicPropertyId: 'CP10245',
      title: '2 BHK Apartment Whitefield', location: 'Bangalore, Karnataka',
      badge: 'Ready to Move', badgeColor: '#059669',
      photos: '16 Photos', type: '2 BHK Apartment', size: '1,200 sq.ft',
      floor: '5th Floor', possession: 'Ready to Move',
      totalInv: '₹92.00 L', amountPaid: '₹92.00 L',
      status: 'Agreement Signed', statusColor: '#2563EB', statusBg: '#EFF6FF',
      rentalYield: '3.6%',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Category filter map
  const catMap = {
    all: null,
    construction: 'construction',
    ready: 'ready',
    plots: 'plots',
    commercial: 'commercial',
    rented: 'rented',
    sold: 'sold'
  };

  const filtered = allProperties.filter((property) => {
    const matchesCategory = activeCategory === 'all' || property.catId === catMap[activeCategory];
    const query = filterQuery.trim().toLowerCase();
    const matchesQuery = !query ||
      property.title.toLowerCase().includes(query) ||
      property.location.toLowerCase().includes(query) ||
      property.type.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const visible = showAll ? filtered : filtered.slice(0, 4);
  const hasMore = filtered.length > 4;

  const changeCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setShowAll(false);
    setOpenMenuId(null);
  };

  const portfolioReport = [
    '1 CRORE PROPERTIES — NRI PORTFOLIO SUMMARY',
    `Portfolio valuation: ${formatPortfolioMoney(58500000, selectedCurrency)}`,
    '',
    ...allProperties.map((property) =>
      `${property.title} | ${property.location} | ${formatPortfolioMoney(parseInrAmount(property.totalInv), selectedCurrency)} | ${property.status}`
    )
  ].join('\n');

  return (
    <div className="nri-owned-layout">
      {/* ── 1. LEFT DARK NAVY SIDEBAR ── */}
      <aside className="nri-owned-sidebar">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 6px' }}>
          <Home size={18} color="#C58A2A" />
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#C58A2A', letterSpacing: '0.3px' }}>
            My Properties
          </span>
        </div>

        {/* Categories */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {[
            { id: 'all', label: 'All Properties', count: '08', icon: Home },
            { id: 'construction', label: 'Under Construction', count: '03', icon: Building2 },
            { id: 'ready', label: 'Ready to Move', count: '02', icon: KeyRound },
            { id: 'plots', label: 'Plots & Land', count: '01', icon: Trees },
            { id: 'commercial', label: 'Commercial', count: '00', icon: Briefcase },
            { id: 'rented', label: 'Rented Out', count: '02', icon: DollarSign },
            { id: 'sold', label: 'Sold / Exited', count: '00', icon: Building }
          ].map(cat => {
            const isActive = activeCategory === cat.id;
            const CategoryIcon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => changeCategory(cat.id)}
                aria-pressed={isActive}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '7px',
                  background: isActive ? '#0E2849' : 'transparent',
                  border: isActive ? '1px solid rgba(197,138,42,0.5)' : '1px solid transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <span className="nri-owned-category-label">
                  <CategoryIcon size={15} aria-hidden="true" />
                  {cat.label}
                </span>
                <span className="nri-owned-category-count">{cat.count}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#475569', fontWeight: 700, letterSpacing: '0.7px', marginBottom: '10px', paddingLeft: '6px' }}>
            Quick Actions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <Link to="/buyer/add-property" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', textDecoration: 'none', borderRadius: '6px' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <PlusCircle size={15} color="#C58A2A" />
              <span>Add New Property</span>
            </Link>
            <button type="button" onClick={() => navigate('/properties')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: '6px', width: '100%' }}>
              <Search size={15} color="#C58A2A" />
              <span>Request Property Hunt</span>
            </button>
            <button type="button" onClick={() => openVisitModal(allProperties[0])}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: '6px', width: '100%' }}>
              <Calendar size={15} color="#C58A2A" />
              <span>Schedule Site Visit</span>
            </button>
            <button type="button" onClick={() => openTourModal('Walkthrough Video', allProperties[0])}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: '6px', width: '100%' }}>
              <Video size={15} color="#C58A2A" />
              <span>Book Video Call</span>
            </button>
          </div>
        </div>

        {/* Bottom promo card */}
        <div className="nri-owned-promo" style={{ 
          background: 'linear-gradient(180deg, rgba(14,40,73,0.7) 0%, rgba(7,26,51,1) 100%)',
          borderRadius: '10px',
          border: '1px solid rgba(197,138,42,0.3)',
          padding: '14px',
          textAlign: 'center'
        }}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 5px 0' }}>Invest Confidently</h4>
          <p style={{ fontSize: '11px', color: '#94A3B8', margin: '0 0 10px 0', lineHeight: 1.4 }}>
            We verify every property for NRIs
          </p>
          <Link to="/properties" style={{
            display: 'block',
            background: '#C58A2A',
            color: '#FFFFFF',
            padding: '7px 0',
            borderRadius: '5px',
            fontSize: '12px',
            fontWeight: 600,
            textDecoration: 'none'
          }}>
            Explore Properties
          </Link>
        </div>
      </aside>

      {/* ── 2. CENTER CONTENT ── */}
      <main className="nri-owned-main">
        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h1 className="nri-owned-title">
            My Properties
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              type="button"
              onClick={() => setShowFilters((isOpen) => !isOpen)}
              aria-expanded={showFilters}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '7px 12px',
                background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px',
                fontSize: '12px', color: '#475569', cursor: 'pointer'
              }}
            >
              <SlidersHorizontal size={13} />
              <span>Filters</span>
            </button>
            <div style={{ display: 'flex', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
              <button 
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
                style={{ padding: '7px 9px', background: viewMode === 'grid' ? '#C58A2A' : '#FFFFFF', color: viewMode === 'grid' ? '#FFF' : '#64748B', border: 'none', cursor: 'pointer' }}
              >
                <Grid size={15} />
              </button>
              <button 
                type="button"
                onClick={() => setViewMode('list')}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
                style={{ padding: '7px 9px', background: viewMode === 'list' ? '#C58A2A' : '#FFFFFF', color: viewMode === 'list' ? '#FFF' : '#64748B', border: 'none', cursor: 'pointer' }}
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="nri-owned-filter-panel">
            <label>
              <span>Search portfolio</span>
              <input
                type="search"
                value={filterQuery}
                onChange={(event) => {
                  setFilterQuery(event.target.value);
                  setShowAll(false);
                }}
                placeholder="Property, location or type"
              />
            </label>
            <label>
              <span>Property category</span>
              <select value={activeCategory} onChange={(event) => changeCategory(event.target.value)}>
                <option value="all">All properties</option>
                <option value="construction">Under construction</option>
                <option value="ready">Ready to move</option>
                <option value="rented">Rented out</option>
                <option value="plots">Plots &amp; land</option>
              </select>
            </label>
            <button type="button" onClick={() => {
              setFilterQuery('');
              changeCategory('all');
            }}>
              <X size={14} />
              Clear filters
            </button>
          </div>
        )}

        {/* KPI stat cards */}
        <div className="nri-owned-stats">
          {stats.map((s, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => s.catId && changeCategory(s.catId)}
              disabled={!s.catId}
              aria-pressed={s.catId ? activeCategory === s.catId : undefined}
              className={`nri-owned-stat${s.isHighlight ? ' highlight' : ''}${s.catId && activeCategory === s.catId ? ' active' : ''}`}
            >
              <div className="nri-owned-stat-icon" style={{ background: s.bg }}>
                  <s.icon size={13} color={s.isHighlight ? '#C58A2A' : '#071A33'} />
              </div>
              <div className="nri-owned-stat-copy">
                <span className="nri-owned-stat-label">{s.label}</span>
                <span className="nri-owned-stat-value">{s.count}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Property cards */}
        <div className={`nri-owned-properties ${viewMode}`}>
          {visible.map((item, index) => (
            viewMode === 'list' ? (
              /* ── LIST VIEW ── */
              <div
                key={item.id}
                className="nri-owned-property-card"
              >
                {/* Image */}
                <div className="nri-owned-property-image">
                  <img 
                    src={item.image} alt={item.title} 
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                  <span style={{
                    position: 'absolute', top: '8px', left: '8px',
                    background: item.badgeColor, color: '#FFFFFF',
                    fontSize: '10px', fontWeight: 700, padding: '3px 7px', borderRadius: '4px'
                  }}>
                    {item.badge}
                  </span>
                  <button 
                    type="button"
                    onClick={() => toggleWishlist(item.publicPropertyId)}
                    aria-label={`${wishlist.includes(item.publicPropertyId) ? 'Remove' : 'Add'} ${item.title} ${wishlist.includes(item.publicPropertyId) ? 'from' : 'to'} shortlist`}
                    aria-pressed={wishlist.includes(item.publicPropertyId)}
                    style={{
                      position: 'absolute', top: '8px', right: '8px',
                      background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%',
                      width: '26px', height: '26px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                    }}
                  >
                    <Heart size={12} color="#FFFFFF" fill={wishlist.includes(item.publicPropertyId) ? '#EF4444' : 'none'} />
                  </button>
                  <div style={{
                    position: 'absolute', bottom: '8px', left: '8px',
                    background: 'rgba(0,0,0,0.55)', color: '#FFFFFF',
                    fontSize: '10px', padding: '2px 7px', borderRadius: '3px'
                  }}>
                    📷 {item.photos}
                  </div>
                </div>

                {/* Details */}
                <div className="nri-owned-property-details">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#071A33', margin: '0 0 3px 0' }}>
                          {item.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#64748B' }}>
                          <MapPin size={11} color="#94A3B8" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                      <div className="nri-owned-card-actions">
                        <Link 
                          to={`/property/${item.publicPropertyId}`}
                          style={{
                            padding: '5px 12px',
                            border: '1px solid #C58A2A', borderRadius: '5px',
                            background: '#FFFFFF', color: '#C58A2A',
                            fontSize: '11px', fontWeight: 600, textDecoration: 'none'
                          }}
                        >
                          View Details
                        </Link>
                        <button
                          type="button"
                          aria-label={`More actions for ${item.title}`}
                          aria-expanded={openMenuId === item.id}
                          onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px' }}
                        >
                          <MoreVertical size={14} />
                        </button>
                        {openMenuId === item.id && (
                          <div className="nri-owned-card-menu">
                            <Link to={`/property/${item.publicPropertyId}`} onClick={() => setOpenMenuId(null)}>View property</Link>
                            <button type="button" onClick={() => {
                              openVisitModal(item);
                              setOpenMenuId(null);
                            }}>Schedule a visit</button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Attributes row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid #F1F5F9', fontSize: '11px' }}>
                      <div>
                        <div style={{ color: '#94A3B8', fontSize: '10px', marginBottom: '2px' }}>Type</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{item.type}</div>
                      </div>
                      <div>
                        <div style={{ color: '#94A3B8', fontSize: '10px', marginBottom: '2px' }}>Size</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{item.size}</div>
                      </div>
                      <div>
                        <div style={{ color: '#94A3B8', fontSize: '10px', marginBottom: '2px' }}>{item.floor ? 'Floor' : item.facing ? 'Facing' : 'Possession'}</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{item.floor || item.facing || item.possession}</div>
                      </div>
                      <div>
                        <div style={{ color: '#94A3B8', fontSize: '10px', marginBottom: '2px' }}>{item.furnishing ? 'Furnishing' : 'Possession'}</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{item.furnishing || item.possession}</div>
                      </div>
                    </div>
                  </div>

                  {/* Investment stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', paddingTop: '8px', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: '#94A3B8', fontSize: '10px' }}>Total Investment</div>
                      <div style={{ fontWeight: 700, color: '#071A33', fontSize: '13px' }}>{formatPortfolioMoney(parseInrAmount(item.totalInv), selectedCurrency)}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94A3B8', fontSize: '10px' }}>Amount Paid</div>
                      <div style={{ fontWeight: 700, color: '#071A33', fontSize: '13px' }}>{formatPortfolioMoney(parseInrAmount(item.amountPaid), selectedCurrency)}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94A3B8', fontSize: '10px' }}>Status</div>
                      <span style={{ 
                        fontSize: '10px', fontWeight: 600,
                        color: item.statusColor, background: item.statusBg,
                        padding: '2px 7px', borderRadius: '3px', display: 'inline-block'
                      }}>
                        {item.status}
                      </span>
                    </div>
                    <div>
                      <div style={{ color: '#94A3B8', fontSize: '10px' }}>{item.rentalYield ? 'Rental Yield (Est.)' : 'Appreciation'}</div>
                      <div style={{ fontWeight: 700, color: item.rentalYield ? '#2563EB' : '#059669', fontSize: '13px' }}>
                        {item.rentalYield || item.appreciation}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ── GRID VIEW ── */
              <div
                key={item.id}
                className="nri-owned-grid-card"
              >
                <div style={{ position: 'relative', height: '180px' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute', top: '8px', left: '8px',
                    background: item.badgeColor, color: '#FFF',
                    fontSize: '10px', fontWeight: 700, padding: '3px 7px', borderRadius: '4px'
                  }}>{item.badge}</span>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item.publicPropertyId)}
                    aria-label={`${wishlist.includes(item.publicPropertyId) ? 'Remove' : 'Add'} ${item.title} ${wishlist.includes(item.publicPropertyId) ? 'from' : 'to'} shortlist`}
                    aria-pressed={wishlist.includes(item.publicPropertyId)}
                    style={{
                    position: 'absolute', top: '8px', right: '8px',
                    background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%',
                    width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                  }}><Heart size={12} color="#FFF" fill={wishlist.includes(item.publicPropertyId) ? '#EF4444' : 'none'} /></button>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 3px 0' }}>{item.title}</h3>
                  <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <MapPin size={11} color="#94A3B8" />{item.location}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#475569', marginBottom: '8px' }}>
                    <span>{item.type}</span><span>{item.size}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#94A3B8' }}>Total Investment</div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#071A33' }}>{formatPortfolioMoney(parseInrAmount(item.totalInv), selectedCurrency)}</div>
                    </div>
                    <Link to={`/property/${item.publicPropertyId}`} style={{
                      padding: '5px 10px', border: '1px solid #C58A2A', borderRadius: '5px',
                      background: '#FFF', color: '#C58A2A', fontSize: '11px', fontWeight: 600, textDecoration: 'none'
                    }}>View Details</Link>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#94A3B8' }}>
            <Building2 size={40} color="#CBD5E1" style={{ marginBottom: '12px' }} />
            <p style={{ fontSize: '14px', fontWeight: 600 }}>No properties in this category</p>
          </div>
        )}

        {/* Show More */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '5px' }}>
            <button 
              type="button"
              onClick={() => setShowAll((isShowingAll) => !isShowingAll)}
              className="nri-owned-show-more"
              aria-expanded={showAll}
              style={{
                padding: '9px 22px',
                background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '7px',
                color: '#334155', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
              }}
            >
              {showAll ? 'Show Fewer Properties' : 'Show More Properties'}
              {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        )}
      </main>

      {/* ── 3. RIGHT COLUMN ── */}
      <aside className="nri-owned-summary">
        {/* Investment Summary */}
        <div className="nri-owned-summary-card">
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 14px 0' }}>
            Investment Summary
          </h3>

          {/* SVG-based donut chart — no ResponsiveContainer needed */}
          <div className="nri-owned-investment-body">
            <DonutChart data={investmentData} size={132} strokeWidth={17} totalLabel={formatPortfolioMoney(58500000, selectedCurrency)} />
            <div className="nri-owned-investment-legend">
            {investmentData.map((item, idx) => (
              <div key={item.name} className="nri-owned-investment-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <span>{item.name}</span>
                </div>
                <strong>{formatPortfolioMoney(item.amount, selectedCurrency)} ({item.value}%)</strong>
              </div>
            ))}
            </div>
          </div>

          <button 
            type="button"
            onClick={() => downloadFile('1CroreProperties_NRI_Portfolio.txt', portfolioReport)}
            style={{
              width: '100%', marginTop: '14px', padding: '8px 0',
              border: '1px solid #C58A2A', borderRadius: '6px',
              background: '#FFFFFF', color: '#C58A2A',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
            }}
          >
            <FileText size={13} />
            <span>View Full Portfolio Report</span>
          </button>
        </div>

        {/* Property Management Services */}
        <div className="nri-owned-summary-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', margin: 0 }}>
              Property Management Services
            </h4>
            <Link to="/nri/management" style={{ fontSize: '11px', color: '#2563EB', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              View All
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { label: 'Rent Collection', status: 'Active', icon: DollarSign },
              { label: 'Maintenance', status: '2 Requests', icon: Settings },
              { label: 'Tenant Management', status: '2 Tenants', icon: Users },
              { label: 'Legal & Compliance', status: 'All Compliant', icon: ShieldCheck }
            ].map((srv, idx) => (
              <Link key={srv.label} to="/nri/management" className="nri-owned-service">
                <srv.icon size={15} aria-hidden="true" />
                <span><strong>{srv.label}</strong><small>{srv.status}</small></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Documents Summary */}
        <div className="nri-owned-summary-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', margin: 0 }}>Documents Summary</h4>
            <Link to="/nri/documents" style={{ fontSize: '11px', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>
              View All
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {[
              { label: 'Agreements',          count: '05 Documents' },
              { label: 'Invoices & Receipts', count: '08 Documents' },
              { label: 'Property Documents',  count: '12 Documents' },
              { label: 'Tax Documents',       count: '03 Documents' }
            ].map((doc, idx) => (
              <Link key={doc.label} to="/nri/documents" className="nri-owned-document-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#475569' }}>
                  <FileText size={13} color="#94A3B8" />
                  <span>{doc.label}</span>
                </div>
                <span style={{ fontWeight: 600, color: '#071A33' }}>{doc.count}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Need Help */}
        <div className="nri-owned-summary-card">
          <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', margin: '0 0 3px 0' }}>Need Help?</h4>
          <p style={{ fontSize: '11px', color: '#64748B', margin: '0 0 12px 0' }}>
            Our NRI support team is here for you
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '100%', padding: '8px 0',
                border: '1px solid #E2E8F0', borderRadius: '6px',
                background: '#FFFFFF', color: '#334155',
                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                textDecoration: 'none'
              }}
            >
              <MessageSquare size={13} color="#059669" />
              <span>Chat on WhatsApp</span>
            </a>
            <button 
              type="button"
              onClick={() => openTourModal('Walkthrough Video', allProperties[0])}
              style={{
                width: '100%', padding: '8px 0',
                border: '1px solid #C58A2A', borderRadius: '6px',
                background: '#FFFFFF', color: '#C58A2A',
                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px'
              }}
            >
              <Video size={13} color="#C58A2A" />
              <span>Book a Video Call</span>
            </button>
            <a 
              href="tel:+919876543210"
              style={{
                width: '100%', padding: '8px 0',
                border: '1px solid #E2E8F0', borderRadius: '6px',
                background: '#FFFFFF', color: '#334155',
                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px'
              }}
            >
              <Phone size={13} color="#071A33" />
              <span>Request a Callback</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
