import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Heart, Calendar, GitCompare, ArrowRight, Eye, 
  MapPin, CheckCircle2, TrendingUp, Sparkles, Clock, AlertCircle, PlusCircle,
  Search, Bell, Bookmark, ShieldCheck, Scale, Bed, Bath, Maximize2, FileText
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useApp } from '../../context/AppContext';

export default function BuyerDashboard() {
  const { user, properties, wishlist, toggleWishlist, compareList, toggleCompare, siteVisits, offers, showToast } = useApp();

  const [selectedCityInsight, setSelectedCityInsight] = useState('Bangalore');

  const shortlistedProps = properties.filter(p => wishlist.includes(p.id));
  const recommendedProps = properties.slice(0, 3);

  const priceTrendData = [
    { month: 'Jan', rate: 7200 },
    { month: 'Feb', rate: 7350 },
    { month: 'Mar', rate: 7500 },
    { month: 'Apr', rate: 7650 },
    { month: 'May', rate: 7800 },
    { month: 'Jun', rate: 7950 },
  ];

  const recentActivities = [
    { text: 'Viewed Skyline Heights 3 BHK', time: '10 mins ago', icon: Eye, color: '#2563EB' },
    { text: 'Added Green Villa to Compare list', time: '2 hours ago', icon: Scale, color: '#7C3AED' },
    { text: 'Downloaded brochure for Commercial Office', time: 'Yesterday', icon: FileText, color: '#059669' },
    { text: 'Requested site visit for Grand Palm Residency', time: '2 days ago', icon: Calendar, color: '#C58A2A' },
  ];

  const savedSearches = [
    { query: '3 BHK in Jubilee Hills < ₹1.5 Cr', city: 'Hyderabad', matches: '14 new' },
    { query: 'Commercial Space in Hitech City', city: 'Hyderabad', matches: '5 new' },
    { query: 'Gated Villa with Private Garden', city: 'Bangalore', matches: '8 new' },
  ];

  return (
    <div className="buyer-dashboard-page" style={{ background: '#F8FAFC', minHeight: '100vh', padding: '32px 0 60px 0' }}>
      <div className="container">
        
        {/* Top Welcome Banner */}
        <div style={{ 
          background: 'linear-gradient(135deg, #071A33 0%, #0F2E59 100%)', 
          borderRadius: '20px', 
          padding: '32px', 
          color: '#FFFFFF', 
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          boxShadow: '0 10px 25px rgba(7, 26, 51, 0.15)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C58A2A', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
              <Sparkles size={16} /> BUYER CONCIERGE PORTAL
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 8px 0', fontFamily: 'Playfair Display, serif' }}>
              Welcome back, {user?.name || 'Rahul Sharma'}
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>
              Tracking prime properties across Hyderabad, Bangalore & Mumbai with AI valuation.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/properties" className="btn btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Explore 1 Cr+ Listings <ArrowRight size={16} />
            </Link>
            <Link 
              to="/buyer/add-property" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                border: '1px solid #C58A2A', 
                background: 'rgba(255,255,255,0.15)', 
                color: '#FFFFFF', 
                padding: '10px 18px', 
                borderRadius: '8px', 
                fontSize: '13px', 
                textDecoration: 'none', 
                fontWeight: 600 
              }}
            >
              <PlusCircle size={16} /> Post Property
            </Link>
          </div>
        </div>

        {/* 4 Stat Cards (Screenshot 2.1) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          {/* Wish Listing */}
          <Link to="/buyer/shortlisted" style={{ textDecoration: 'none', background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Wish Listing</span>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                <Heart size={20} fill="#EF4444" />
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#071A33' }}>12</div>
            <div style={{ fontSize: '12px', color: '#059669', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={14} /> 2 added recently
            </div>
          </Link>

          {/* Compare */}
          <Link to="/compare" style={{ textDecoration: 'none', background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Compare</span>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}>
                <Scale size={20} />
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#071A33' }}>3</div>
            <div style={{ fontSize: '12px', color: '#7C3AED', marginTop: '6px' }}>
              Active in comparison matrix
            </div>
          </Link>

          {/* Saved Searches */}
          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Saved Searches</span>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                <Bookmark size={20} />
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#071A33' }}>5</div>
            <div style={{ fontSize: '12px', color: '#D97706', marginTop: '6px' }}>
              Alerts active on 5 criteria
            </div>
          </div>

          {/* Recent Views */}
          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Recent Views</span>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                <Eye size={20} />
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#071A33' }}>18</div>
            <div style={{ fontSize: '12px', color: '#2563EB', marginTop: '6px' }}>
              Browsed past 14 days
            </div>
          </div>
        </div>

        {/* 2-Column Section: Recommended Properties (with Purple Buttons) + Market Trends Chart */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', marginBottom: '32px' }}>
          
          {/* Left Column: Recommended Properties & Purple Trust Banner */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Recommended Properties Card */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#071A33', margin: 0 }}>
                    Recommended Properties
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                    Curated matches tailored to your preference for verified luxury homes
                  </p>
                </div>
                <Link to="/properties" style={{ color: '#7C3AED', fontWeight: 600, fontSize: '13px', textDecoration: 'none' }}>
                  View All →
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {recommendedProps.map((prop) => {
                  const isCompared = compareList.includes(prop.id);
                  return (
                    <div 
                      key={prop.id} 
                      style={{ 
                        display: 'flex', 
                        gap: '20px', 
                        padding: '16px', 
                        borderRadius: '12px', 
                        border: '1px solid #E2E8F0',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                      }}
                    >
                      <img 
                        src={prop.image} 
                        alt={prop.title} 
                        style={{ width: '130px', height: '95px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span className="badge badge-gold" style={{ fontSize: '10px', padding: '2px 6px' }}>{prop.type}</span>
                          <span style={{ fontSize: '12px', color: '#64748B' }}>{prop.bhk}</span>
                        </div>
                        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#071A33', margin: '0 0 4px 0' }}>
                          {prop.title}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
                          <MapPin size={12} color="#C58A2A" />
                          <span>{prop.location}</span>
                        </div>

                        {/* Specs with icons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#64748B' }}>
                          {prop.beds > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Bed size={13} /> {prop.beds} Beds</span>}
                          {prop.baths > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Bath size={13} /> {prop.baths} Baths</span>}
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Maximize2 size={13} /> {prop.area} sq.ft</span>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', minWidth: '150px' }}>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#C58A2A' }}>
                          {prop.priceStr}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '10px' }}>
                          {prop.pricePerSqFt}
                        </div>

                        {/* Purple CTA Button as in Reference Screenshots */}
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={() => toggleCompare(prop.id)}
                            style={{ 
                              background: isCompared ? '#5B21B6' : '#7C3AED', 
                              color: '#FFFFFF', 
                              padding: '8px 12px', 
                              fontSize: '11px', 
                              borderRadius: '6px',
                              border: 'none',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Scale size={13} />
                            {isCompared ? 'In Compare' : 'Add to Compare'}
                          </button>

                          <Link 
                            to={`/property/${prop.id}`}
                            className="btn btn-outline"
                            style={{ 
                              padding: '7px 12px', 
                              fontSize: '11px', 
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontWeight: 600,
                              borderColor: '#E2E8F0'
                            }}
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Purple Trust Banner (Screenshot 2.1) */}
            <div style={{ 
              background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', 
              borderRadius: '16px', 
              padding: '20px 24px', 
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 15px rgba(124, 58, 237, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={24} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>
                    Every property on 1 Crore Property is verified & listed under ₹1.99 Cr.
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>
                    100% legal title verification, RERA registered documents and physical inspection guaranteed.
                  </div>
                </div>
              </div>

              <Link 
                to="/properties" 
                style={{ 
                  background: '#FFFFFF', 
                  color: '#5B21B6', 
                  padding: '8px 16px', 
                  borderRadius: '8px', 
                  fontSize: '12px', 
                  fontWeight: 700, 
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                Explore All
              </Link>
            </div>

            {/* Explore More Section (3 Categories) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { title: 'Apartments', count: '1,245 Listings', icon: Building2, link: '/properties?cat=apartments' },
                { title: 'Luxury Villas', count: '356 Listings', icon: Building2, link: '/properties?cat=villas' },
                { title: 'Commercial', count: '133 Listings', icon: Building2, link: '/properties?cat=commercial' }
              ].map((c, i) => (
                <Link 
                  key={i} 
                  to={c.link}
                  style={{ 
                    background: '#FFFFFF', 
                    borderRadius: '12px', 
                    padding: '16px', 
                    border: '1px solid #E2E8F0', 
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F1F5F9', color: '#C58A2A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <c.icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#071A33' }}>{c.title}</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>{c.count}</div>
                  </div>
                </Link>
              ))}
            </div>

          </div>

          {/* Right Column: Your Activity, Saved Searches, Market Insights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Your Activity */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#071A33', margin: '0 0 16px 0' }}>
                Your Activity
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {recentActivities.map((act, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#F8FAFC', color: act.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <act.icon size={14} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1E293B' }}>{act.text}</div>
                      <div style={{ color: '#94A3B8', fontSize: '11px', marginTop: '2px' }}>{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Searches */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#071A33', margin: 0 }}>
                  Saved Searches
                </h4>
                <button 
                  type="button" 
                  onClick={() => showToast("Viewing search notification settings")}
                  style={{ background: 'none', border: 'none', color: '#7C3AED', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Manage
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {savedSearches.map((s, i) => (
                  <div key={i} style={{ padding: '12px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#071A33' }}>{s.query}</span>
                      <Bell size={14} color="#7C3AED" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '11px', color: '#64748B' }}>
                      <span>{s.city}</span>
                      <span style={{ color: '#059669', fontWeight: 600 }}>{s.matches}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Insights Line Chart */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#071A33', margin: 0 }}>
                    Market Insights
                  </h4>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>6-month average ₹/sq.ft</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <select 
                    value={selectedCityInsight} 
                    onChange={(e) => setSelectedCityInsight(e.target.value)}
                    style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', color: '#071A33', fontWeight: 600 }}
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </div>
              </div>

              <div style={{ height: '160px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceTrendData}>
                    <defs>
                      <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                    <Tooltip contentStyle={{ background: '#071A33', borderRadius: '8px', color: '#FFF', fontSize: '12px' }} />
                    <Area isAnimationActive={false} type="monotone" dataKey="rate" stroke="#7C3AED" strokeWidth={2} fillOpacity={1} fill="url(#purpleGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F1F5F9', fontSize: '12px' }}>
                <span style={{ color: '#64748B' }}>Trend Growth</span>
                <span style={{ color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUp size={14} /> +6.3% Past 6 Mo
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
