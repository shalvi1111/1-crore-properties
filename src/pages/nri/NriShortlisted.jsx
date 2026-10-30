import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Star, SlidersHorizontal, ChevronDown, Grid, List, MapPin, 
  Heart, Download, Calendar, ArrowRight, ShieldCheck, Phone,
  TrendingUp, Rocket, MoreHorizontal, MessageSquare, ExternalLink
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useApp } from '../../context/AppContext';

export default function NriShortlisted() {
  const { 
    properties: allProperties, 
    wishlist, 
    toggleWishlist, 
    openVisitModal, 
    downloadBrochure, 
    formatPrice, 
    showToast 
  } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('list');

  const shortlistedProps = allProperties.filter(p => wishlist.includes(p.id));
  const properties = (shortlistedProps.length > 0 ? shortlistedProps : allProperties.slice(0, 4)).map((p, idx) => ({
    id: p.id,
    title: p.title,
    location: p.location,
    badge: p.tag || 'Premium',
    badgeBg: idx % 2 === 0 ? '#C58A2A' : '#059669',
    photos: '24 Photos',
    type: p.bhk ? `${p.bhk} ${p.type}` : p.type,
    size: `${p.area || 1450} sq.ft`,
    floor: p.floor || '12th Floor',
    possession: p.possession || 'Ready to Move',
    price: formatPrice(p.price),
    priceMetric: formatPrice(p.price),
    rentalYield: p.rentalYield || '3.5%',
    appreciation: p.appreciation ? `+ ${p.appreciation}%` : '+ 14.2%',
    addedOn: p.addedOn || '12 May 2024',
    image: p.image,
    rawProp: p
  }));

  const shortlistSummaryData = [
    { name: 'Apartments', value: 51.8, amount: formatPrice(22000000), color: '#D97706' },
    { name: 'Villas', value: 36.5, amount: formatPrice(15500000), color: '#059669' },
    { name: 'Plots / Land', value: 11.7, amount: formatPrice(5000000), color: '#2563EB' }
  ];

  const stats = [
    { label: 'Total Shortlisted', count: `${properties.length}`, icon: Star, isHighlight: true },
    { label: 'Total Value', count: formatPrice(properties.reduce((acc, curr) => acc + (curr.rawProp?.rawPrice || 15000000), 0)), icon: TrendingUp },
    { label: 'Avg. Rental Yield', count: '3.6%', icon: TrendingUp },
    { label: 'Avg. Appreciation', count: '14.2%', icon: TrendingUp },
    { label: 'Site Visits Scheduled', count: '04', icon: Calendar }
  ];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', display: 'flex' }}>
      {/* 1. Left Dark Navy Sidebar */}
      <aside style={{ 
        width: '260px', 
        minWidth: '260px',
        background: '#071A33', 
        color: '#FFFFFF', 
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px' }}>
          <Star size={20} color="#C58A2A" />
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#C58A2A', letterSpacing: '0.3px' }}>
            Shortlisted
          </span>
        </div>

        {/* Categories */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { id: 'all', label: 'All Shortlisted', count: '12' },
            { id: 'recent', label: 'Recently Added', count: '03' },
            { id: 'villas', label: 'Villas', count: '04' },
            { id: 'apartments', label: 'Apartments', count: '06' },
            { id: 'plots', label: 'Plots / Land', count: '02' },
            { id: 'commercial', label: 'Commercial', count: '00' }
          ].map(cat => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: isActive ? '#0E2849' : 'transparent',
                  border: isActive ? '1px solid #C58A2A' : '1px solid transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{cat.label}</span>
                <span style={{ 
                  fontSize: '11px', 
                  background: isActive ? 'rgba(197, 138, 42, 0.2)' : 'rgba(255,255,255,0.06)',
                  color: isActive ? '#C58A2A' : '#94A3B8',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '12px', paddingLeft: '8px' }}>
            Quick Actions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/nri/compare" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', textDecoration: 'none' }}>
              <TrendingUp size={16} color="#C58A2A" />
              <span>Compare Properties</span>
            </Link>
            <button onClick={() => showToast("Site visit scheduler opened")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <Calendar size={16} color="#C58A2A" />
              <span>Schedule Site Visit</span>
            </button>
            <button onClick={() => showToast("Loading 3D virtual tour viewer...")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <Rocket size={16} color="#C58A2A" />
              <span>Book Virtual Tour</span>
            </button>
            <button onClick={() => showToast("Price quote requests submitted to builders")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <Star size={16} color="#C58A2A" />
              <span>Request Price & Offers</span>
            </button>
            <Link to="/nri/my-properties" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', textDecoration: 'none' }}>
              <Calendar size={16} color="#C58A2A" />
              <span>Move to My Properties</span>
            </Link>
          </div>
        </div>

        {/* Security Card */}
        <div style={{ 
          marginTop: 'auto',
          background: 'linear-gradient(180deg, rgba(14, 40, 73, 0.7) 0%, rgba(7, 26, 51, 1) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(197, 138, 42, 0.3)',
          padding: '16px',
          textAlign: 'center'
        }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 6px 0' }}>Your Data is 100% Secure</h4>
          <p style={{ fontSize: '11px', color: '#94A3B8', margin: '0 0 12px 0', lineHeight: 1.4 }}>
            End-to-end encrypted bank-grade security
          </p>
          <button onClick={() => showToast("Opening Security Center")} style={{
            width: '100%',
            background: 'transparent',
            color: '#CBD5E1',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '7px 0',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Security Center
          </button>
        </div>
      </aside>

      {/* 2. Center Content Area */}
      <main style={{ flex: 1, padding: '28px 28px 60px 28px', maxWidth: '1020px' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={24} color="#C58A2A" />
              <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#071A33', margin: 0, fontFamily: 'Playfair Display, serif' }}>
                Shortlisted Properties
              </h1>
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0 0' }}>
              12 Properties | Last updated: Today, 11:30 AM
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={() => showToast("Filters opened")}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>

            <button 
              onClick={() => showToast("Sorting options")}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              <span>Sort By</span>
              <ChevronDown size={14} />
            </button>

            <div style={{ display: 'flex', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
              <button 
                onClick={() => setViewMode('grid')}
                style={{ padding: '8px 10px', background: viewMode === 'grid' ? '#C58A2A' : '#FFFFFF', color: viewMode === 'grid' ? '#FFF' : '#64748B', border: 'none', cursor: 'pointer' }}
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                style={{ padding: '8px 10px', background: viewMode === 'list' ? '#C58A2A' : '#FFFFFF', color: viewMode === 'list' ? '#FFF' : '#64748B', border: 'none', cursor: 'pointer' }}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 5 Stat Cards Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)', 
          gap: '12px', 
          marginBottom: '28px' 
        }}>
          {stats.map((s, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '10px',
                padding: '16px 14px',
                border: '1px solid #E2E8F0',
                textAlign: 'left'
              }}
            >
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>
                {s.label}
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: s.isHighlight ? '#C58A2A' : '#071A33' }}>
                {s.count}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Properties List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {properties.map(item => (
            <div
              key={item.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                display: 'grid',
                gridTemplateColumns: '260px 1fr 180px',
                overflow: 'hidden',
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
              }}
            >
              {/* Image Section */}
              <div style={{ position: 'relative', height: '190px' }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: item.badgeBg,
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  {item.badge}
                </span>

                <button 
                  onClick={() => toggleWishlist(item.id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#FFFFFF',
                    border: 'none',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Heart size={14} color="#EF4444" fill="#EF4444" />
                </button>

                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  📷 {item.photos}
                </div>
              </div>

              {/* Middle Specs & Details */}
              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#071A33', margin: '0 0 4px 0' }}>
                    {item.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
                    <MapPin size={13} color="#94A3B8" />
                    <span>{item.location}</span>
                  </div>

                  {/* 4 Attributes */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9', fontSize: '12px' }}>
                    <div>
                      <div style={{ color: '#94A3B8', fontSize: '11px' }}>Type</div>
                      <div style={{ fontWeight: 600, color: '#334155' }}>{item.type}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94A3B8', fontSize: '11px' }}>Size</div>
                      <div style={{ fontWeight: 600, color: '#334155' }}>{item.size}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94A3B8', fontSize: '11px' }}>{item.floor ? 'Floor' : item.facing ? 'Facing' : 'Possession'}</div>
                      <div style={{ fontWeight: 600, color: '#334155' }}>{item.floor || item.facing || item.possession}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94A3B8', fontSize: '11px' }}>{item.furnishing ? 'Furnishing' : 'Possession'}</div>
                      <div style={{ fontWeight: 600, color: '#334155' }}>{item.furnishing || item.possession}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', paddingTop: '8px' }}>
                  <div>
                    <div style={{ color: '#94A3B8', fontSize: '11px' }}>Price</div>
                    <div style={{ fontWeight: 700, color: '#071A33', fontSize: '13px' }}>{item.priceMetric}</div>
                  </div>
                  <div>
                    <div style={{ color: '#94A3B8', fontSize: '11px' }}>Est. Rental Yield</div>
                    <div style={{ fontWeight: 700, color: '#334155', fontSize: '13px' }}>{item.rentalYield}</div>
                  </div>
                  <div>
                    <div style={{ color: '#94A3B8', fontSize: '11px' }}>Appreciation (5 Yrs)</div>
                    <div style={{ fontWeight: 700, color: '#059669', fontSize: '13px' }}>{item.appreciation}</div>
                  </div>
                  <div>
                    <div style={{ color: '#94A3B8', fontSize: '11px' }}>Added On</div>
                    <div style={{ fontWeight: 600, color: '#64748B', fontSize: '12px' }}>{item.addedOn}</div>
                  </div>
                </div>
              </div>

              {/* Right Action Buttons Column */}
              <div style={{ 
                padding: '16px 14px', 
                background: '#FAFAFA', 
                borderLeft: '1px solid #F1F5F9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#C58A2A', marginBottom: '4px', textAlign: 'center' }}>
                  {item.price}
                </div>

                <Link 
                  to={`/property/${item.id}`}
                  style={{
                    padding: '7px 0',
                    border: '1px solid #C58A2A',
                    borderRadius: '6px',
                    background: '#FFFFFF',
                    color: '#C58A2A',
                    fontSize: '12px',
                    fontWeight: 600,
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <ExternalLink size={13} />
                  <span>View Details</span>
                </Link>

                <button 
                  onClick={() => openVisitModal(item.rawProp || item)}
                  style={{
                    padding: '7px 0',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    background: '#FFFFFF',
                    color: '#475569',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Calendar size={13} />
                  <span>Schedule Visit</span>
                </button>

                <button 
                  onClick={() => downloadBrochure(item.rawProp || item)}
                  style={{
                    padding: '7px 0',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    background: '#FFFFFF',
                    color: '#475569',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Download size={13} />
                  <span>Download Brochure</span>
                </button>

                <button 
                  onClick={() => showToast("Options menu")}
                  style={{
                    padding: '4px 0',
                    border: 'none',
                    background: 'transparent',
                    color: '#94A3B8',
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px'
                  }}
                >
                  <span>••• More</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button 
            onClick={() => showToast("All 12 shortlisted properties displayed")}
            style={{
              padding: '10px 24px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              color: '#334155',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Load More Properties ⌵
          </button>
        </div>
      </main>

      {/* 3. Right Column: Shortlist Summary, Insights, Expert, Hotline */}
      <aside style={{ 
        width: '320px', 
        minWidth: '320px',
        padding: '28px 24px 60px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Shortlist Summary Donut Chart */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#071A33', margin: '0 0 16px 0' }}>
            Shortlist Summary
          </h3>

          <div style={{ position: 'relative', height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={shortlistSummaryData}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {shortlistSummaryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => `${val}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Total Value</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#071A33' }}>₹4.25 Cr</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {shortlistSummaryData.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                  <span style={{ color: '#475569' }}>{item.name}</span>
                </div>
                <strong style={{ color: '#071A33' }}>{item.amount} ({item.value}%)</strong>
              </div>
            ))}
          </div>

          <button 
            onClick={() => showToast("Downloading Shortlist Evaluation Report...")}
            style={{
              width: '100%',
              marginTop: '16px',
              padding: '9px 0',
              border: '1px solid #C58A2A',
              borderRadius: '6px',
              background: '#FFFFFF',
              color: '#C58A2A',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>View Shortlist Report</span>
          </button>
        </div>

        {/* Insights for You */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 14px 0' }}>
            Insights for You
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <TrendingUp size={16} color="#059669" />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#071A33' }}>4 properties have high appreciation</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>More than 12% expected in 5 years</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Rocket size={16} color="#7C3AED" />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#071A33' }}>2 new launches in your shortlist</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Book early for best prices</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Calendar size={16} color="#C58A2A" />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#071A33' }}>Schedule site visit</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>You have 2 upcoming visits</div>
              </div>
            </div>
          </div>
        </div>

        {/* Need Expert Guidance? */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)', 
          borderRadius: '12px', 
          padding: '20px', 
          color: '#FFFFFF' 
        }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 14px 0', textAlign: 'center' }}>
            Need Expert Guidance?
          </h4>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" 
              alt="Anita Verma" 
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C58A2A' }} 
            />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>Anita Verma</div>
              <div style={{ fontSize: '11px', color: '#93C5FD' }}>NRI Property Expert</div>
              <div style={{ fontSize: '11px', color: '#FCD34D' }}>★ 4.9 (500+ NRIs)</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => showToast("Opening WhatsApp with Anita Verma")}
              style={{
                flex: 1,
                padding: '9px 0',
                background: '#059669',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <MessageSquare size={13} />
              <span>Chat on WhatsApp</span>
            </button>

            <button 
              onClick={() => showToast("Scheduling video call with Anita")}
              style={{
                flex: 1,
                padding: '9px 0',
                background: 'transparent',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Phone size={13} />
              <span>Schedule a Call</span>
            </button>
          </div>
        </div>

        {/* Dedicated NRI Hotline Card */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', textAlign: 'center' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
            <Phone size={18} color="#C58A2A" />
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#071A33' }}>Dedicated NRI Hotline</div>
          <div style={{ fontSize: '11px', color: '#64748B', margin: '2px 0 8px 0' }}>We are available 24x7 for NRIs</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#071A33', marginBottom: '14px' }}>+91 98765 43210</div>

          <button 
            onClick={() => showToast("Priority NRI callback requested")}
            style={{
              width: '100%',
              padding: '10px 0',
              background: '#C58A2A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Request a Callback
          </button>
        </div>
      </aside>
    </div>
  );
}
