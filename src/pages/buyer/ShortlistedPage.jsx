import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Trash2, GitCompare, Calendar, MapPin, 
  Bed, Bath, Maximize2, ShieldCheck, MessageSquare, ArrowRight, Sparkles 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ShortlistedPage() {
  const { properties, wishlist, toggleWishlist, compareList, toggleCompare, bookSiteVisit, showToast } = useApp();

  const shortlistedProps = properties.filter(p => wishlist.includes(p.id));

  // Compute portfolio metrics
  const totalValue = shortlistedProps.reduce((sum, p) => sum + (p.price || 0), 0).toFixed(2);
  const avgSqft = shortlistedProps.length > 0 
    ? Math.round(shortlistedProps.reduce((sum, p) => sum + (p.area || 2000), 0) / shortlistedProps.length)
    : 0;

  return (
    <div className="shortlisted-page" style={{ background: '#F8FAFC', minHeight: '100vh', padding: '32px 0 80px 0' }}>
      <div className="container">
        {/* Header Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EF4444', fontSize: '13px', fontWeight: 600 }}>
              <Heart size={16} fill="#EF4444" /> SAVED LUXURY RESIDENCES
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#071A33', margin: '4px 0 0 0', fontFamily: 'Playfair Display, serif' }}>
              My Shortlist ({shortlistedProps.length} Properties)
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/buyer/compare" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderColor: '#7C3AED', color: '#7C3AED' }}>
              <GitCompare size={16} /> Compare Selected ({compareList.length})
            </Link>
            <Link to="/properties" className="btn btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Explore More Units <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Portfolio Stats Strip */}
        {shortlistedProps.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
            <div style={{ background: '#FFFFFF', padding: '20px 24px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Total Shortlisted Portfolio Value</div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#C58A2A', marginTop: '4px' }}>₹{totalValue} Cr</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '20px 24px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Average Property Area</div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#071A33', marginTop: '4px' }}>{avgSqft} sq.ft</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '20px 24px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Verified RERA Compliance</div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>100% Clear Title</div>
            </div>
          </div>
        )}

        {/* Shortlisted Property Cards */}
        {shortlistedProps.length === 0 ? (
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '60px 20px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FEE2E2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Heart size={32} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#071A33', marginBottom: '8px' }}>Your shortlist is empty</h3>
            <p style={{ color: '#64748B', fontSize: '14px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
              Discover curated luxury properties across Hyderabad, Bangalore, or Mumbai and save them to your shortlist.
            </p>
            <Link to="/properties" className="btn btn-gold" style={{ padding: '12px 28px' }}>
              Discover Luxury Properties
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {shortlistedProps.map((prop) => {
              const isCompared = compareList.includes(prop.id);
              return (
                <div 
                  key={prop.id} 
                  style={{ 
                    background: '#FFFFFF', 
                    borderRadius: '16px', 
                    border: '1px solid #E2E8F0', 
                    overflow: 'hidden', 
                    boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ position: 'relative', height: '220px' }}>
                    <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button 
                      onClick={() => toggleWishlist(prop.id)}
                      style={{ 
                        position: 'absolute', 
                        top: '12px', 
                        right: '12px', 
                        background: '#FFFFFF', 
                        border: 'none', 
                        borderRadius: '50%', 
                        width: '36px', 
                        height: '36px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                      title="Remove from shortlist"
                    >
                      <Trash2 size={16} color="#EF4444" />
                    </button>
                    <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                      <span className="badge badge-gold" style={{ fontSize: '11px', padding: '4px 8px' }}>{prop.type}</span>
                      <span style={{ background: 'rgba(7, 26, 51, 0.85)', color: '#FFF', fontSize: '11px', padding: '4px 8px', borderRadius: '4px' }}>
                        {prop.bhk}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#071A33', margin: 0 }}>
                          <Link to={`/properties/${prop.id}`} style={{ color: '#071A33', textDecoration: 'none' }}>
                            {prop.title}
                          </Link>
                        </h3>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#C58A2A', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                          {prop.priceStr}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
                        <MapPin size={14} color="#C58A2A" />
                        <span>{prop.location}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#475569', padding: '12px 0', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9', marginBottom: '18px' }}>
                        <div><strong style={{ color: '#071A33' }}>{prop.area}</strong> sq.ft</div>
                        <div><strong style={{ color: '#071A33' }}>{prop.facing || 'East'}</strong> Facing</div>
                        <div><strong style={{ color: '#071A33' }}>{prop.possession || 'Ready'}</strong></div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Link 
                        to={`/properties/${prop.id}`} 
                        className="btn btn-navy" 
                        style={{ flex: 1, padding: '10px', fontSize: '13px', textAlign: 'center', textDecoration: 'none' }}
                      >
                        View Details
                      </Link>

                      <button 
                        onClick={() => toggleCompare(prop.id)}
                        className="btn btn-outline"
                        style={{ 
                          padding: '10px 14px', 
                          fontSize: '13px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '6px',
                          borderColor: isCompared ? '#7C3AED' : '#CBD5E1',
                          color: isCompared ? '#7C3AED' : '#475569',
                          background: isCompared ? '#F5F3FF' : '#FFF'
                        }}
                      >
                        <GitCompare size={14} /> {isCompared ? 'Comparing' : 'Compare'}
                      </button>

                      <a 
                        href="https://wa.me/919876543210" 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn btn-outline" 
                        style={{ padding: '10px 14px', fontSize: '13px', color: '#059669', borderColor: '#059669', display: 'flex', alignItems: 'center' }}
                      >
                        <MessageSquare size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
