import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, MapPin, Bed, Bath, Maximize2, Compass, Calendar, 
  ShieldCheck, Share2, Heart, GitCompare, Phone, MessageSquare, 
  Download, CheckCircle2, ChevronRight, Star, TrendingUp, 
  FileText, User, ArrowRight, Clock, Award, AlertCircle, DollarSign, Send,
  Video, Eye
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useApp } from '../../context/AppContext';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { 
    properties, 
    wishlist, 
    toggleWishlist, 
    compareList, 
    toggleCompare, 
    showToast, 
    bookSiteVisit, 
    submitOffer,
    downloadBrochure,
    openTourModal,
    openVisitModal
  } = useApp();

  // Find property by code, id or slug
  const property = properties.find(p => p.id === id || p.code === id || p.slug === id) || properties[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [offerPrice, setOfferPrice] = useState(property.price);
  const [bargainSuccess, setBargainSuccess] = useState(false);
  const [priceTab, setPriceTab] = useState('history');

  // Form states
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('11:00 AM');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');

  // Loan calculator states
  const [loanTenure, setLoanTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);

  const isWishlisted = wishlist.includes(property.id);
  const isCompared = compareList.includes(property.id);

  // Calculate EMI
  const totalLoanAmount = (property.rawPrice || 15500000) * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanTenure * 12;
  const emi = Math.round(
    (totalLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const images = property.images && property.images.length > 0 ? property.images : [property.image];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out ${property.title} in ${property.location} on 1 Crore Properties`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Property link copied to clipboard!");
    }
  };

  const handleBargainSubmit = (e) => {
    e.preventDefault();
    submitOffer({
      propertyTitle: property.title,
      price: offerPrice
    });
    setBargainSuccess(true);
    setTimeout(() => setBargainSuccess(false), 4000);
  };

  const handleSiteVisitSubmit = (e) => {
    e.preventDefault();
    if (!visitorName || !visitorPhone || !visitDate) {
      showToast("Please fill all site visit details");
      return;
    }
    bookSiteVisit({
      propertyTitle: property.title,
      date: visitDate,
      time: visitTime,
      name: visitorName,
      phone: visitorPhone
    });
    setShowVisitModal(false);
  };

  return (
    <div className="property-detail-page" style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Breadcrumb Bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B' }}>
            <Link to="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <Link to="/properties" style={{ color: '#64748B', textDecoration: 'none' }}>Properties</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#071A33', fontWeight: 600 }}>{property.title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={handleShare}
              className="btn btn-outline"
              style={{ padding: '6px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Share2 size={14} /> Share
            </button>
            <button 
              onClick={() => toggleWishlist(property.id)}
              className="btn btn-outline"
              style={{ 
                padding: '6px 14px', 
                fontSize: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                borderColor: isWishlisted ? '#EF4444' : '#E2E8F0',
                color: isWishlisted ? '#EF4444' : '#334155'
              }}
            >
              <Heart size={14} fill={isWishlisted ? '#EF4444' : 'none'} /> 
              {isWishlisted ? 'Saved' : 'Save'}
            </button>
            <button 
              onClick={() => toggleCompare(property.id)}
              className="btn btn-outline"
              style={{ 
                padding: '6px 14px', 
                fontSize: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                borderColor: isCompared ? '#7C3AED' : '#E2E8F0',
                color: isCompared ? '#7C3AED' : '#334155',
                background: isCompared ? '#F5F3FF' : 'transparent'
              }}
            >
              <GitCompare size={14} /> {isCompared ? 'In Compare' : 'Compare'}
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '24px' }}>
        {/* Title Header */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span className="badge badge-gold" style={{ textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                  {property.tag || 'EXCLUSIVE'}
                </span>
                <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>ID: {property.code}</span>
                {property.reraApproved && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#059669', background: '#ECFDF5', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    <ShieldCheck size={14} /> RERA: {property.reraId}
                  </span>
                )}
              </div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#071A33', margin: '0 0 8px 0', fontFamily: 'Playfair Display, serif' }}>
                {property.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '15px' }}>
                <MapPin size={16} color="#C58A2A" />
                <span>{property.location}</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#C58A2A', fontFamily: 'Playfair Display, serif' }}>
                {property.priceStr}
              </div>
              <div style={{ fontSize: '14px', color: '#64748B', marginTop: '2px' }}>
                {property.pricePerSqFt} • EMI starts at ₹{emi.toLocaleString('en-IN')}/mo
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Hero with Thumbnail Slider */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '32px' }}>
          {/* Main Large Image */}
          <div style={{ position: 'relative', height: '480px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
            <img 
              src={images[activeImageIndex]} 
              alt={property.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.3s ease' }} 
            />
            {property.mediaTags && (
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', gap: '8px' }}>
                {property.mediaTags.map((tag, idx) => (
                  <span key={idx} style={{ background: 'rgba(7, 26, 51, 0.85)', backdropFilter: 'blur(8px)', color: '#FFF', fontSize: '12px', padding: '6px 12px', borderRadius: '20px', fontWeight: 500 }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail Stack */}
          <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gap: '12px', height: '480px' }}>
            {images.slice(0, 4).map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{ 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  cursor: 'pointer',
                  border: activeImageIndex === idx ? '2px solid #C58A2A' : '1px solid #E2E8F0',
                  opacity: activeImageIndex === idx ? 1 : 0.8,
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {idx === 3 && images.length > 4 && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(7, 26, 51, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 700, fontSize: '16px' }}>
                    +{images.length - 4} More
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Media Tour Pills (Screenshot 4.2) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Walkthrough Video', action: 'Play Now', icon: Video, color: '#2563EB', bg: '#EFF6FF', type: 'walkthrough' },
            { label: 'Drone Video', action: 'Watch Now', icon: Eye, color: '#059669', bg: '#ECFDF5', type: 'drone' },
            { label: '360° Virtual Tour', action: 'Explore Now', icon: Compass, color: '#7C3AED', bg: '#F5F3FF', type: '360' },
            { label: "Bird's Eye View", action: 'View Now', icon: Maximize2, color: '#D97706', bg: '#FEF3C7', type: 'drone' },
          ].map((m, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => openTourModal(m.type, property)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <m.icon size={18} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#071A33' }}>{m.label}</div>
                  <div style={{ fontSize: '11px', color: m.color, fontWeight: 600 }}>{m.action} →</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Main 2-Column Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          {/* Left Column: Details, Amenities, Historical Chart, Locality */}
          <div>
            {/* Overview Metric Grid */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#071A33', marginBottom: '20px' }}>Property Overview</h3>
              
              {/* 4 Pastel Overview Cards (Screenshot 4.2) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
                <div style={{ padding: '16px', background: '#EFF6FF', borderRadius: '12px', border: '1px solid #DBEAFE' }}>
                  <div style={{ fontSize: '12px', color: '#1E40AF', fontWeight: 600 }}>Total Floors</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#1E3A8A', marginTop: '4px' }}>{property.totalFloors ? `${property.totalFloors} Floors` : '3 Floors'}</div>
                </div>
                <div style={{ padding: '16px', background: '#F0FDF4', borderRadius: '12px', border: '1px solid #DCFCE7' }}>
                  <div style={{ fontSize: '12px', color: '#166534', fontWeight: 600 }}>Super Built-up Area</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#14532D', marginTop: '4px' }}>{property.area} Sq.ft</div>
                </div>
                <div style={{ padding: '16px', background: '#FAF5FF', borderRadius: '12px', border: '1px solid #F3E8FF' }}>
                  <div style={{ fontSize: '12px', color: '#6B21A8', fontWeight: 600 }}>Bathrooms</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#581C87', marginTop: '4px' }}>{property.baths || 4} Bathrooms</div>
                </div>
                <div style={{ padding: '16px', background: '#FFFBEB', borderRadius: '12px', border: '1px solid #FEF3C7' }}>
                  <div style={{ fontSize: '12px', color: '#92400E', fontWeight: 600 }}>Year Built</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#78350F', marginTop: '4px' }}>2024 (Ready)</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px', background: '#F8FAFC', borderRadius: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                    <Bed size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Bedrooms</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#071A33' }}>{property.bhk || `${property.beds} BHK`}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px', background: '#F8FAFC', borderRadius: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                    <Bath size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Bathrooms</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#071A33' }}>{property.baths || 3} Baths</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px', background: '#F8FAFC', borderRadius: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                    <Maximize2 size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Super Area</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#071A33' }}>{property.area} sq.ft</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px', background: '#F8FAFC', borderRadius: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                    <Compass size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Facing</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#071A33' }}>{property.facing || 'East'}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px', background: '#F8FAFC', borderRadius: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}>
                    <Calendar size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Possession</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#071A33' }}>{property.possession || 'Ready to Move'}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px', background: '#F8FAFC', borderRadius: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E11D48' }}>
                    <Building2 size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Furnishing</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#071A33' }}>{property.furnishing || 'Semi-Furnished'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#071A33', marginBottom: '16px' }}>About this Property</h3>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', marginBottom: '20px' }}>
                {property.description}
              </p>

              {property.highlights && property.highlights.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#071A33', marginBottom: '12px' }}>Key Highlights</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {property.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px' }}>
                        <CheckCircle2 size={16} color="#059669" />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#071A33' }}>{h.label}</div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>{h.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Amenities Grid */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#071A33', marginBottom: '20px' }}>Amenities & Facilities</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {[
                  "Clubhouse & Lounge", "Infinity Swimming Pool", "Equipped Gymnasium", "Landscaped Gardens",
                  "24/7 Power Backup", "High-Speed Elevators", "Children's Play Area", "Multi-Tier Security",
                  "Jogging Track", "Indoor Games Court", "Tennis Court", "Covered Car Parking"
                ].map((amenity, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C58A2A' }} />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Appreciation History Chart & 9-Year Table (Screenshot 4.2) */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#071A33', margin: 0 }}>Micro-Market Valuation & History</h3>
                  <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>Actual recorded registry valuations and forecasted appreciation</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', background: '#ECFDF5', padding: '4px 10px', borderRadius: '6px', fontWeight: 600, fontSize: '13px' }}>
                  <TrendingUp size={16} /> +127% Overall Appreciation
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '16px' }}>
                <button
                  type="button"
                  onClick={() => setPriceTab('history')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    background: priceTab === 'history' ? '#071A33' : '#F1F5F9',
                    color: priceTab === 'history' ? '#FFFFFF' : '#64748B'
                  }}
                >
                  Price History (9 Years)
                </button>
                <button
                  type="button"
                  onClick={() => setPriceTab('future')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    background: priceTab === 'future' ? '#071A33' : '#F1F5F9',
                    color: priceTab === 'future' ? '#FFFFFF' : '#64748B'
                  }}
                >
                  Future Appraisal (5 Years)
                </button>
              </div>

              {priceTab === 'history' ? (
                <>
                  <div style={{ height: '220px', width: '100%', marginBottom: '20px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { year: '2016', rate: 2450 },
                        { year: '2018', rate: 3100 },
                        { year: '2020', rate: 3850 },
                        { year: '2022', rate: 4650 },
                        { year: '2024', rate: 5571 },
                      ]}>
                        <defs>
                          <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C58A2A" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#C58A2A" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="year" stroke="#94A3B8" fontSize={12} tickLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                        <Tooltip 
                          formatter={(val) => [`₹${val}/sq.ft`, 'Avg Registry Rate']}
                          contentStyle={{ background: '#071A33', borderRadius: '8px', color: '#FFF', border: 'none' }}
                        />
                        <Area isAnimationActive={false} type="monotone" dataKey="rate" stroke="#C58A2A" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 9-Year Historical Table */}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                          <th style={{ padding: '10px 14px' }}>Year</th>
                          <th style={{ padding: '10px 14px' }}>Avg Price / sq.ft</th>
                          <th style={{ padding: '10px 14px' }}>Property Valuation</th>
                          <th style={{ padding: '10px 14px' }}>YoY Growth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { year: '2016', rate: '₹2,450', val: '₹85.75 L', growth: 'Baseline' },
                          { year: '2018', rate: '₹3,100', val: '₹1.08 Cr', growth: '+26.5%' },
                          { year: '2020', rate: '₹3,850', val: '₹1.34 Cr', growth: '+24.1%' },
                          { year: '2022', rate: '₹4,650', val: '₹1.62 Cr', growth: '+20.7%' },
                          { year: '2024', rate: '₹5,571', val: '₹1.95 Cr', growth: '+19.8%' },
                        ].map((row, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                            <td style={{ padding: '10px 14px', fontWeight: 700, color: '#071A33' }}>{row.year}</td>
                            <td style={{ padding: '10px 14px', color: '#334155' }}>{row.rate}</td>
                            <td style={{ padding: '10px 14px', fontWeight: 600, color: '#C58A2A' }}>{row.val}</td>
                            <td style={{ padding: '10px 14px', color: row.growth.includes('+') ? '#059669' : '#64748B', fontWeight: 600 }}>{row.growth}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div style={{ overflowX: 'auto', paddingTop: '10px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                        <th style={{ padding: '10px 14px' }}>Projection Year</th>
                        <th style={{ padding: '10px 14px' }}>Projected Rate / sq.ft</th>
                        <th style={{ padding: '10px 14px' }}>Est. Property Valuation</th>
                        <th style={{ padding: '10px 14px' }}>Forecasted ROI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { year: '2025 (Year 1)', rate: '₹6,150', val: '₹2.15 Cr', growth: '+10.4%' },
                        { year: '2026 (Year 2)', rate: '₹6,800', val: '₹2.38 Cr', growth: '+10.5%' },
                        { year: '2027 (Year 3)', rate: '₹7,550', val: '₹2.64 Cr', growth: '+11.0%' },
                        { year: '2028 (Year 4)', rate: '₹8,350', val: '₹2.92 Cr', growth: '+10.6%' },
                        { year: '2029 (Year 5)', rate: '₹9,200', val: '₹3.22 Cr', growth: '+10.2%' },
                      ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '10px 14px', fontWeight: 700, color: '#071A33' }}>{row.year}</td>
                          <td style={{ padding: '10px 14px', color: '#334155' }}>{row.rate}</td>
                          <td style={{ padding: '10px 14px', fontWeight: 600, color: '#059669' }}>{row.val}</td>
                          <td style={{ padding: '10px 14px', color: '#059669', fontWeight: 700 }}>{row.growth}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Builder / Developer Profile */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#071A33', marginBottom: '16px' }}>Developer Profile</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: '#071A33', color: '#C58A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '20px' }}>
                  {property.builder?.name ? property.builder.name.substring(0, 2).toUpperCase() : 'DLF'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#071A33', margin: 0 }}>
                      {property.builder?.name || 'Prestige Group Builders'}
                    </h4>
                    <span style={{ background: '#ECFDF5', color: '#059669', fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      VERIFIED BUILDER
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '10px', fontSize: '13px', color: '#64748B' }}>
                    <div><strong style={{ color: '#071A33' }}>{property.builder?.delivered || 32}</strong> Projects Delivered</div>
                    <div><strong style={{ color: '#071A33' }}>{property.builder?.ongoing || 5}</strong> Ongoing Projects</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={14} fill="#F59E0B" color="#F59E0B" />
                      <strong style={{ color: '#071A33' }}>{property.builder?.rating || 4.8}</strong> / 5.0 Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bargain Box, EMI Calc, Agent Card, CTAs */}
          <div>
            {/* Interactive Bargain Box (Screenshot 4.2 Highlight) */}
            <div style={{ background: 'linear-gradient(135deg, #071A33 0%, #0F2E59 100%)', borderRadius: '16px', padding: '24px', color: '#FFFFFF', marginBottom: '24px', boxShadow: '0 8px 24px rgba(7, 26, 51, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C58A2A', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <DollarSign size={16} /> Exclusive Bargain Box
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '8px 0 12px 0', color: '#FFFFFF', fontFamily: 'Playfair Display, serif' }}>
                Make an Offer to Seller
              </h3>
              <p style={{ fontSize: '13px', color: '#CBD5E1', marginBottom: '18px' }}>
                Have a different valuation in mind? Submit your binding confidential offer directly to the property desk.
              </p>

              {bargainSuccess ? (
                <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                  <CheckCircle2 size={32} color="#10B981" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontWeight: 600, color: '#FFF' }}>Offer Submitted Successfully!</div>
                  <div style={{ fontSize: '12px', color: '#E2E8F0', marginTop: '4px' }}>The developer relationship officer will contact you within 2 hours.</div>
                </div>
              ) : (
                <form onSubmit={handleBargainSubmit}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '6px' }}>
                      Proposed Offer (in Crores)
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', borderRadius: '8px', padding: '0 12px' }}>
                      <span style={{ color: '#071A33', fontWeight: 700 }}>₹</span>
                      <input 
                        type="number" 
                        step="0.01" 
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: 'none', outline: 'none', fontSize: '16px', fontWeight: 700, color: '#071A33' }}
                      />
                      <span style={{ color: '#64748B', fontSize: '13px' }}>Cr</span>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-gold" 
                    style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Send size={16} /> Submit Confidential Offer
                  </button>
                </form>
              )}
            </div>

            {/* Dedicated Relationship Manager Card */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" 
                  alt="Anita Verma" 
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C58A2A' }}
                />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#071A33', margin: 0 }}>Anita Verma</h4>
                  <div style={{ fontSize: '12px', color: '#C58A2A', fontWeight: 600 }}>Senior NRI Portfolio Advisor</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>DLF Verified Partner • 9 Yrs Exp</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-outline" 
                  style={{ padding: '10px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#059669', borderColor: '#059669' }}
                >
                  <MessageSquare size={16} /> WhatsApp
                </a>
                <a 
                  href="tel:+919876543210" 
                  className="btn btn-outline" 
                  style={{ padding: '10px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Phone size={16} /> Call Desk
                </a>
              </div>

              <button 
                onClick={() => openVisitModal(property)}
                className="btn btn-navy" 
                style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Calendar size={16} /> Schedule Site Visit
              </button>
            </div>

            {/* Quick Loan EMI Calculator */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#071A33', marginBottom: '16px' }}>Home Loan EMI Calculator</h3>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', color: '#475569' }}>
                  <span>Down Payment ({downPaymentPercent}%)</span>
                  <strong>₹{((property.rawPrice || 15500000) * downPaymentPercent / 100 / 100000).toFixed(2)} L</strong>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  value={downPaymentPercent} 
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#C58A2A' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', color: '#475569' }}>
                  <span>Loan Tenure ({loanTenure} Years)</span>
                  <strong>{loanTenure * 12} Months</strong>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="30" 
                  value={loanTenure} 
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#C58A2A' }}
                />
              </div>

              <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Estimated Monthly Payment</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#071A33', marginTop: '2px' }}>
                  ₹{emi.toLocaleString('en-IN')} <span style={{ fontSize: '12px', fontWeight: 400 }}>/month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar (Screenshot 4.2 Mobile/Desktop standard) */}
      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        background: '#FFFFFF', 
        borderTop: '1px solid #E2E8F0', 
        padding: '14px 0', 
        boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
        zIndex: 999 
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>Price for {property.bhk || '3 BHK'}</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#C58A2A' }}>{property.priceStr}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => downloadBrochure(property)}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', fontSize: '14px' }}
            >
              <Download size={16} /> Brochure
            </button>
            <button 
              onClick={() => openVisitModal(property)}
              className="btn btn-navy"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', fontSize: '14px' }}
            >
              <Calendar size={16} /> Schedule Visit
            </button>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-gold"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', fontSize: '14px' }}
            >
              <MessageSquare size={16} /> Instant WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Schedule Site Visit Modal */}
      {showVisitModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(7, 26, 51, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '480px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#071A33', margin: 0 }}>Schedule Exclusive Site Visit</h3>
              <button onClick={() => setShowVisitModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8' }}>×</button>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
              Complimentary luxury chauffeur pickup available for verified NRI and premium buyers.
            </p>

            <form onSubmit={handleSiteVisitSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Your Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Rahul Sharma"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Phone / WhatsApp Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+91 98765 43210 or +1..."
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Preferred Date</label>
                  <input 
                    type="date" 
                    required 
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Preferred Slot</label>
                  <select 
                    value={visitTime}
                    onChange={(e) => setVisitTime(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
                  >
                    <option value="10:00 AM">10:00 AM - 11:30 AM</option>
                    <option value="11:30 AM">11:30 AM - 01:00 PM</option>
                    <option value="03:00 PM">03:00 PM - 04:30 PM</option>
                    <option value="05:00 PM">05:00 PM - 06:30 PM</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setShowVisitModal(false)} className="btn btn-outline" style={{ flex: 1, padding: '12px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" style={{ flex: 2, padding: '12px' }}>
                  Confirm Site Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
