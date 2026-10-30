import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Scale, Plus, Bookmark, MoreHorizontal, X, Heart, 
  MapPin, CheckCircle2, TrendingUp, Sparkles, Phone, 
  MessageSquare, ShieldCheck, Award, ArrowRight, Share2, Trash2
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useApp } from '../../context/AppContext';

export default function NriCompare() {
  const { 
    properties: allProperties, 
    compareList, 
    toggleCompare, 
    clearCompare, 
    wishlist, 
    toggleWishlist, 
    openComparePicker, 
    openAiCompareModal, 
    formatPrice, 
    showToast 
  } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('current');

  const comparedProps = allProperties.filter(p => compareList.includes(p.id));
  const properties = (comparedProps.length > 0 ? comparedProps : allProperties.slice(0, 3)).map((p, idx) => ({
    id: p.id,
    title: p.title,
    location: p.location,
    tag: p.tag || 'Verified',
    tagBg: idx === 0 ? '#C58A2A' : idx === 1 ? '#059669' : '#2563EB',
    price: formatPrice(p.price),
    type: p.type || 'Apartment',
    config: p.bhk || '3 BHK',
    area: `${p.area || 1450} sq.ft`,
    pricePerSqft: p.pricePerSqFt || '₹9,980',
    rentalYield: p.rentalYield || '3.5%',
    appreciation: p.appreciation ? `▲ ${p.appreciation}%` : '▲ 14.2%',
    possession: p.possession || 'Ready to Move',
    rera: p.reraApproved ? `✓ ${p.reraId || 'Approved'}` : '✓ RERA Registered',
    airport: p.airport || '16 km',
    metro: p.metro || '1.1 km',
    amenitiesScore: p.amenitiesScore || '4.5/5',
    builderRating: p.builderRating || '4.8 (120)',
    image: p.image
  }));

  const comparisonData = properties.map((p, idx) => ({
    name: p.title,
    value: Math.round(100 / properties.length),
    amount: p.price,
    color: idx === 0 ? '#D97706' : idx === 1 ? '#059669' : '#2563EB'
  }));

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flex: 1 }}>
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
            <Scale size={20} color="#C58A2A" />
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#C58A2A', letterSpacing: '0.3px' }}>
              Compare
            </span>
          </div>

          {/* Categories */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { id: 'comparisons', label: 'My Comparisons', count: '5' },
              { id: 'current', label: 'Current Comparison', count: '3' },
              { id: 'saved', label: 'My Saved Comparisons', count: '' }
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
                  {cat.count && (
                    <span style={{ 
                      fontSize: '11px', 
                      background: isActive ? 'rgba(197, 138, 42, 0.2)' : 'rgba(255,255,255,0.06)',
                      color: isActive ? '#C58A2A' : '#94A3B8',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      {cat.count}
                    </span>
                  )}
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
              <button onClick={openComparePicker} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <Plus size={16} color="#C58A2A" />
                <span>Add Property to Compare</span>
              </button>
              <button onClick={clearCompare} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <Trash2 size={16} color="#C58A2A" />
                <span>Clear Comparison</span>
              </button>
              <button onClick={() => showToast("Comparison matrix saved to your NRI portfolio")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <Bookmark size={16} color="#C58A2A" />
                <span>Save Comparison</span>
              </button>
              <button onClick={() => { if (navigator.clipboard) { navigator.clipboard.writeText(window.location.href); } showToast("Comparison link copied to clipboard"); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <Share2 size={16} color="#C58A2A" />
                <span>Share Comparison</span>
              </button>
            </div>
          </div>

          {/* Compare Smarter with AI Card */}
          <div style={{ 
            marginTop: 'auto',
            background: 'linear-gradient(180deg, rgba(14, 40, 73, 0.7) 0%, rgba(7, 26, 51, 1) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(197, 138, 42, 0.3)',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>Compare Smarter with AI</span>
              <span style={{ fontSize: '9px', fontWeight: 700, background: '#7C3AED', color: '#FFF', padding: '1px 5px', borderRadius: '4px' }}>BETA</span>
            </div>
            <p style={{ fontSize: '11px', color: '#94A3B8', margin: '0 0 12px 0', lineHeight: 1.4 }}>
              Get AI recommendation based on your investment goals
            </p>
            <button onClick={openAiCompareModal} style={{
              width: '100%',
              background: '#C58A2A',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 0',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              Get AI Recommendation
            </button>
          </div>

          {/* Need Help? Request Call Back */}
          <div style={{ padding: '0 8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '2px' }}>Need Help?</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '8px' }}>Our NRI support team is here</div>
            <button onClick={() => showToast("Call back requested")} style={{
              width: '100%',
              background: 'transparent',
              color: '#CBD5E1',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '6px 0',
              borderRadius: '6px',
              fontSize: '11px',
              cursor: 'pointer'
            }}>
              Request a Call Back
            </button>
          </div>
        </aside>

        {/* 2. Center Content Area */}
        <main style={{ flex: 1, padding: '28px 28px 60px 28px', maxWidth: '1020px' }}>
          {/* Top Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#071A33', margin: 0, fontFamily: 'Playfair Display, serif' }}>
                Compare Properties
              </h1>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                Compare up to 4 properties side by side
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={() => showToast("Select a property from shortlist to add")}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: '#FFFFFF',
                  border: '1px solid #C58A2A',
                  color: '#C58A2A',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Plus size={14} />
                <span>Add Property</span>
              </button>

              <button 
                onClick={() => showToast("Comparison matrix saved")}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#475569',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Bookmark size={14} />
                <span>Save Comparison</span>
              </button>

              <button 
                onClick={() => showToast("Options menu")}
                style={{
                  padding: '8px 10px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#64748B',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            {/* Property Cards Header Row: 1 label col + dynamic property cols + 1 add property col */}
            <div style={{ display: 'grid', gridTemplateColumns: `160px repeat(${properties.length}, 1fr) 150px`, borderBottom: '1px solid #E2E8F0', background: '#FAFAFA' }}>
              <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#071A33' }}>Properties</span>
                <span style={{ fontSize: '11px', color: '#64748B' }}>{properties.length} Selected (Max 4)</span>
              </div>

              {properties.map(p => {
                const isFav = wishlist.includes(p.id);
                return (
                  <div key={p.id} style={{ padding: '16px', borderLeft: '1px solid #E2E8F0', position: 'relative' }}>
                    <div style={{ position: 'relative', height: '120px', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px' }}>
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: '6px', left: '6px', background: p.tagBg, color: '#FFF', fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px' }}>
                        {p.tag}
                      </span>
                      <button 
                        type="button"
                        onClick={() => toggleCompare(p.id)}
                        title="Remove from compare"
                        style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFF' }}
                      >
                        <X size={13} />
                      </button>
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 2px 0' }}>{p.title}</h4>
                    <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>{p.location}</div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '6px' }}>{p.config} {p.type}</div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#071A33' }}>{p.price}</div>
                      <button 
                        type="button"
                        onClick={() => toggleWishlist(p.id)}
                        title="Toggle shortlist"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: isFav ? '#EF4444' : '#94A3B8' }}
                      >
                        <Heart size={16} fill={isFav ? '#EF4444' : 'none'} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Add Property Dotted Slot */}
              <div 
                onClick={openComparePicker}
                style={{ 
                  padding: '16px', 
                  borderLeft: '1px solid #E2E8F0', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  textAlign: 'center',
                  background: '#FAFAFA',
                  cursor: 'pointer'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px dashed #C58A2A', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                  <Plus size={18} color="#C58A2A" />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#071A33', marginBottom: '2px' }}>Add Property</div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>Compare up to 4</div>
              </div>
            </div>

            {/* Comparison Rows */}
            <div style={{ background: '#F8FAFC', padding: '10px 16px', fontWeight: 700, fontSize: '12px', color: '#071A33', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Overview
            </div>

            {[
              { label: 'Property Type', key: 'type' },
              { label: 'Configuration', key: 'config' },
              { label: 'Carpet Area', key: 'area' },
              { label: 'Price', key: 'price' },
              { label: 'Price per sq.ft.', key: 'pricePerSqft' },
              { label: 'Est. Rental Yield', key: 'rentalYield' },
              { label: 'Appreciation (5 Yrs)', key: 'appreciation', isGreen: true },
              { label: 'Possession', key: 'possession' },
              { label: 'RERA Status', key: 'rera', isGreen: true },
              { label: 'Distance from Airport', key: 'airport' },
              { label: 'Nearest Metro', key: 'metro' },
              { label: 'Amenities Score', key: 'amenitiesScore' },
              { label: 'Builder Rating', key: 'builderRating' }
            ].map((row, idx) => (
              <div 
                key={idx}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: `160px repeat(${properties.length}, 1fr) 150px`,
                  borderTop: '1px solid #F1F5F9',
                  background: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                  fontSize: '12px',
                  alignItems: 'center'
                }}
              >
                <div style={{ padding: '12px 16px', color: '#64748B', fontWeight: 500 }}>
                  {row.label}
                </div>
                {properties.map(p => (
                  <div 
                    key={p.id} 
                    style={{ 
                      padding: '12px 16px', 
                      borderLeft: '1px solid #F1F5F9',
                      fontWeight: 600,
                      color: row.isGreen ? '#059669' : '#1E293B'
                    }}
                  >
                    {p[row.key]}
                  </div>
                ))}
                <div style={{ borderLeft: '1px solid #F1F5F9' }} />
              </div>
            ))}
          </div>

          {/* AI Recommendation Box */}
          <div style={{ 
            marginTop: '20px', 
            background: '#FFFBEB', 
            border: '1px solid #FDE68A', 
            borderRadius: '10px', 
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ 
                background: '#C58A2A', 
                color: '#FFF', 
                fontWeight: 700, 
                fontSize: '11px', 
                padding: '6px 10px', 
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Sparkles size={14} />
                <span>AI Recommendation</span>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#071A33' }}>
                  Best for You: Luxury Villa Greens
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  Based on your preferences, budget and investment goals, this property offers the best ROI potential.
                </div>
              </div>
            </div>

            <button 
              onClick={() => showToast("Opening AI investment deep dive report")}
              style={{
                padding: '8px 16px',
                background: '#FFFFFF',
                border: '1px solid #C58A2A',
                color: '#C58A2A',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              View AI Analysis
            </button>
          </div>
        </main>

        {/* 3. Right Column: Comparison Summary, Insights, Expert, Hotline */}
        <aside style={{ 
          width: '320px', 
          minWidth: '320px',
          padding: '28px 24px 60px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Comparison Summary Donut Chart */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#071A33', margin: '0 0 16px 0' }}>
              Comparison Summary
            </h3>

            <div style={{ position: 'relative', height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={comparisonData}
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `${val}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#071A33' }}>₹7.40 Cr</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Total Value</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              {comparisonData.map((item, idx) => (
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
              onClick={() => showToast("Downloading Detailed Comparison Report (PDF)...")}
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
                textAlign: 'center'
              }}
            >
              View Detailed Comparison Report
            </button>
          </div>

          {/* Insights at a Glance */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 14px 0' }}>
              Insights at a Glance
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <TrendingUp size={16} color="#059669" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#071A33' }}>Luxury Villa Greens has the highest</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Appreciation potential (16.8%)</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={16} color="#7C3AED" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#071A33' }}>Oceanview Residences offers the best</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>connectivity to Metro & Airport</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Scale size={16} color="#C58A2A" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#071A33' }}>Skyline Heights provides the most</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>affordable entry price</div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => showToast("Insights report generated")}
              style={{
                marginTop: '16px',
                background: 'none',
                border: 'none',
                color: '#2563EB',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: 0
              }}
            >
              <span>View Full Insights Report</span>
              <ArrowRight size={13} />
            </button>
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
                background: 'transparent',
                color: '#C58A2A',
                border: '1px solid #C58A2A',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Request a Call Back
            </button>
          </div>
        </aside>
      </div>

      {/* Bottom Trust Strip */}
      <div style={{ 
        background: '#FFFFFF', 
        borderTop: '1px solid #E2E8F0', 
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {[
          { title: '100% Secure', desc: 'End-to-end Encrypted', icon: ShieldCheck },
          { title: 'RERA Verified', desc: 'All Properties', icon: Award },
          { title: 'No Hidden Charges', desc: 'Transparent Deals', icon: ShieldCheck },
          { title: 'NRI Trusted Platform', desc: '25,000+ Happy NRIs', icon: ShieldCheck },
          { title: 'Dedicated Support', desc: '24x7 for NRIs', icon: Phone }
        ].map((t, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <t.icon size={16} color="#C58A2A" />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#071A33' }}>{t.title}</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
