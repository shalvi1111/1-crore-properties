import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Eye, Download, FileText, Calendar, Heart, 
  MapPin, CheckCircle2, MoreVertical, TrendingUp, ChevronDown, 
  ArrowRight, ShieldCheck, Award, Lock, ExternalLink
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, 
  CartesianGrid, PieChart, Pie, Cell 
} from 'recharts';
import { useApp } from '../../context/AppContext';

export default function PropertyDashboard() {
  const { showToast } = useApp();

  // Multi-line chart data matching reference
  const engagementData = [
    { name: '30 Apr', views: 40, downloads: 30, quotes: 12, visits: 5 },
    { name: '7 May',  views: 68, downloads: 48, quotes: 22, visits: 10 },
    { name: '14 May', views: 60, downloads: 38, quotes: 18, visits: 8 },
    { name: '21 May', views: 78, downloads: 55, quotes: 26, visits: 14 },
    { name: '28 May', views: 72, downloads: 42, quotes: 20, visits: 12 },
    { name: 'Jun',    views: 88, downloads: 60, quotes: 30, visits: 18 },
  ];

  // Donut chart audience data matching reference
  const audienceData = [
    { name: 'Bangalore', value: 62, color: '#7C3AED' },
    { name: 'Other Cities', value: 18, color: '#0284C7' },
    { name: 'NRI / Abroad', value: 12, color: '#059669' },
    { name: 'Nearby Localities', value: 8, color: '#EA580C' }
  ];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '24px 32px 60px 32px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* ROW 1: Hero Property Card + 5 Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr repeat(5, 1fr)', gap: '14px' }}>
          {/* Hero Property Card */}
          <div style={{ 
            background: '#FFFFFF', 
            borderRadius: '12px', 
            border: '1px solid #E2E8F0', 
            padding: '12px',
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80" 
              alt="2 BHK Apartment" 
              style={{ width: '100px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} 
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: 0 }}>2 BHK Apartment</h3>
                <span style={{ fontSize: '9px', background: '#ECFDF5', color: '#059669', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>Active</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>Whitefield, Bangalore</div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#071A33' }}>₹68.50 L</span>
                <span style={{ fontSize: '10px', background: '#F1F5F9', color: '#475569', padding: '1px 5px', borderRadius: '3px' }}>Negotiable</span>
              </div>
              <div style={{ fontSize: '10px', color: '#94A3B8' }}>Added on 15 May 2024 • ID: CP10245</div>
            </div>
          </div>

          {/* Metric 1: Total Views */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Total Views</span>
              <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Eye size={14} color="#0284C7" />
              </div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#071A33' }}>1,248</div>
            <div style={{ fontSize: '10px', color: '#94A3B8' }}>All Time</div>
            <div style={{ fontSize: '10px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>▲ 18.6% vs last 30 days</div>
          </div>

          {/* Metric 2: Brochure Downloads */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Brochure Downloads</span>
              <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Download size={14} color="#7C3AED" />
              </div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#071A33' }}>86</div>
            <div style={{ fontSize: '10px', color: '#94A3B8' }}>All Time</div>
            <div style={{ fontSize: '10px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>▲ 21.4% vs last 30 days</div>
          </div>

          {/* Metric 3: Price Quote Requests */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Price Quote Requests</span>
              <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#FDF2F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={14} color="#DB2777" />
              </div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#071A33' }}>24</div>
            <div style={{ fontSize: '10px', color: '#94A3B8' }}>All Time</div>
            <div style={{ fontSize: '10px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>▲ 20.0% vs last 30 days</div>
          </div>

          {/* Metric 4: Site Visit Requests */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Site Visit Requests</span>
              <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={14} color="#2563EB" />
              </div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#071A33' }}>18</div>
            <div style={{ fontSize: '10px', color: '#94A3B8' }}>All Time</div>
            <div style={{ fontSize: '10px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>▲ 28.6% vs last 30 days</div>
          </div>

          {/* Metric 5: Shortlisted */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Shortlisted</span>
              <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={14} color="#EF4444" />
              </div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#071A33' }}>32</div>
            <div style={{ fontSize: '10px', color: '#94A3B8' }}>All Time</div>
            <div style={{ fontSize: '10px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>▲ 14.3% vs last 30 days</div>
          </div>
        </div>

        {/* ROW 2: Engagement Line Chart + Audience Donut + Traffic Progress */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.1fr 1fr', gap: '14px' }}>
          {/* User Engagement Overview */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 4px 0' }}>User Engagement Overview</h4>
                <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#64748B' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7C3AED' }} /> Views</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284C7' }} /> Brochure Downloads</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EA580C' }} /> Price Quote Requests</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }} /> Site Visit Requests</span>
                </div>
              </div>

              <span style={{ fontSize: '11px', color: '#64748B', border: '1px solid #E2E8F0', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
                Last 30 Days ⌵
              </span>
            </div>

            <div style={{ height: '180px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Line isAnimationActive={false} type="monotone" dataKey="views" stroke="#7C3AED" strokeWidth={2} dot={{ r: 3 }} />
                  <Line isAnimationActive={false} type="monotone" dataKey="downloads" stroke="#0284C7" strokeWidth={2} dot={{ r: 3 }} />
                  <Line isAnimationActive={false} type="monotone" dataKey="quotes" stroke="#EA580C" strokeWidth={2} dot={{ r: 3 }} />
                  <Line isAnimationActive={false} type="monotone" dataKey="visits" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Audience Insights */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '18px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 12px 0' }}>Audience Insights</h4>

            <div style={{ position: 'relative', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    isAnimationActive={false}
                    data={audienceData}
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {audienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `${val}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#071A33' }}>1,248</div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>Total Views</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px', marginTop: '10px' }}>
              {audienceData.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                  <span style={{ color: '#475569' }}>{item.name}</span>
                  <strong style={{ color: '#071A33', marginLeft: 'auto' }}>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Top Traffic Sources */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: 0 }}>Top Traffic Sources</h4>
              <span style={{ fontSize: '10px', color: '#94A3B8' }}>Views</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: '1Crore Property Portal', pct: 82, color: '#7C3AED' },
                { label: 'Google Search', pct: 11, color: '#0284C7' },
                { label: 'Direct / Bookmark', pct: 4, color: '#059669' },
                { label: 'Social Media', pct: 3, color: '#EA580C' }
              ].map((src, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                    <span style={{ color: '#475569' }}>{src.label}</span>
                    <strong style={{ color: '#071A33' }}>{src.pct}%</strong>
                  </div>
                  <div style={{ height: '5px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${src.pct}%`, height: '100%', background: src.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3: Who's Engaging With Your Property (4 Cards) */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 12px 0' }}>
            Who's Engaging With Your Property
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {[
              { title: 'Brochure Downloaders', count: '86', sub: 'Users', icon: Download, bg: '#EFF6FF', color: '#0284C7' },
              { title: 'Price Quote Requesters', count: '24', sub: 'Users', icon: FileText, bg: '#FEF3C7', color: '#D97706' },
              { title: 'Site Visit Requesters', count: '18', sub: 'Users', icon: Calendar, bg: '#ECFDF5', color: '#059669' },
              { title: 'Shortlisted By Users', count: '32', sub: 'Users', icon: Heart, bg: '#FDF2F8', color: '#DB2777' }
            ].map((c, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>{c.title}</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#071A33', marginBottom: '4px' }}>{c.count}</div>
                  <span onClick={() => showToast(`Opening list for ${c.title}`)} style={{ fontSize: '11px', color: '#7C3AED', fontWeight: 600, cursor: 'pointer' }}>
                    View List →
                  </span>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <c.icon size={18} color={c.color} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 4: Recent Leads & Activities + Site Visit Management */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
          {/* Recent Leads & Activities Table */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '18px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 14px 0' }}>
              Recent Leads & Activities
            </h4>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B', textAlign: 'left' }}>
                    <th style={{ padding: '8px' }}>Name</th>
                    <th style={{ padding: '8px' }}>Action</th>
                    <th style={{ padding: '8px' }}>Contact</th>
                    <th style={{ padding: '8px' }}>Location</th>
                    <th style={{ padding: '8px' }}>Interest</th>
                    <th style={{ padding: '8px' }}>Action Date</th>
                    <th style={{ padding: '8px' }}>Status</th>
                    <th style={{ padding: '8px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Saurav Kumar', action: 'Brochure Downloaded', email: 'saurav.k@email.com', phone: '+91 98765 43210', loc: 'Bangalore', interest: '2 BHK Apartment', date: '29 May 2024, 11:30 AM', status: 'New', sBg: '#F3E8FF', sCol: '#7C3AED' },
                    { name: 'Priya Reddy', action: 'Price Quote Requested', email: 'priya.r@email.com', phone: '+91 91234 56789', loc: 'Hyderabad', interest: '2 BHK Apartment', date: '29 May 2024, 10:15 AM', status: 'Contacted', sBg: '#EFF6FF', sCol: '#2563EB' },
                    { name: 'Amit Mishra', action: 'Site Visit Requested', email: 'amit.m@email.com', phone: '+91 99887 76655', loc: 'Bangalore', interest: '2 BHK Apartment', date: '28 May 2024, 04:45 PM', status: 'Scheduled', sBg: '#FEF3C7', sCol: '#D97706' },
                    { name: 'Neha Patel', action: 'Brochure Downloaded', email: 'neha.p@email.com', phone: '+91 87654 32109', loc: 'Pune', interest: '2 BHK Apartment', date: '28 May 2024, 03:20 PM', status: 'New', sBg: '#F3E8FF', sCol: '#7C3AED' },
                    { name: 'Rahul Verma', action: 'Price Quote Requested', email: 'rahul.v@email.com', phone: '+91 78965 43211', loc: 'Delhi', interest: '2 BHK Apartment', date: '27 May 2024, 01:10 PM', status: 'In Discussion', sBg: '#F3E8FF', sCol: '#7C3AED' }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F8FAFC' }}>
                      <td style={{ padding: '10px 8px', fontWeight: 700, color: '#071A33' }}>{row.name}</td>
                      <td style={{ padding: '10px 8px', color: '#475569' }}>{row.action}</td>
                      <td style={{ padding: '10px 8px', color: '#64748B' }}>
                        <div>{row.email}</div>
                        <div>{row.phone}</div>
                      </td>
                      <td style={{ padding: '10px 8px', color: '#475569' }}>{row.loc}</td>
                      <td style={{ padding: '10px 8px', color: '#475569' }}>{row.interest}</td>
                      <td style={{ padding: '10px 8px', color: '#64748B' }}>{row.date}</td>
                      <td style={{ padding: '10px 8px' }}>
                        <span style={{ background: row.sBg, color: row.sCol, padding: '2px 8px', borderRadius: '4px', fontWeight: 600, fontSize: '10px' }}>
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: '10px 8px' }}>
                        <MoreVertical size={14} color="#94A3B8" style={{ cursor: 'pointer' }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Site Visit Management */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: 0 }}>Site Visit Management</h4>
                <span onClick={() => showToast("Calendar view")} style={{ fontSize: '11px', color: '#7C3AED', fontWeight: 600, cursor: 'pointer' }}>View Calendar →</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { date: '30 May 2024, 11:00 AM', name: 'Saurav Kumar', phone: '+91 98765 43210', status: 'Confirmed', sBg: '#ECFDF5', sCol: '#059669' },
                  { date: '31 May 2024, 02:00 PM', name: 'Amit Mishra', phone: '+91 99887 76655', status: 'Pending', sBg: '#FEF3C7', sCol: '#D97706' },
                  { date: '01 Jun 2024, 10:30 AM', name: 'Rohit Singh', phone: '+91 91234 88900', status: 'Confirmed', sBg: '#ECFDF5', sCol: '#059669' }
                ].map((v, i) => (
                  <div key={i} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#64748B', marginBottom: '2px' }}>📅 {v.date}</div>
                      <div style={{ fontWeight: 700, color: '#071A33' }}>{v.name}</div>
                      <div style={{ color: '#64748B' }}>{v.phone}</div>
                    </div>
                    <span style={{ background: v.sBg, color: v.sCol, padding: '3px 8px', borderRadius: '4px', fontWeight: 600, fontSize: '10px' }}>
                      {v.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => showToast("All site visit requests modal")}
              style={{
                width: '100%',
                marginTop: '16px',
                padding: '10px 0',
                border: 'none',
                borderRadius: '6px',
                background: '#F5F3FF',
                color: '#7C3AED',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              View All Site Visit Requests
            </button>
          </div>
        </div>

        {/* Bottom Trust Banner */}
        <div style={{ 
          background: '#FFFFFF', 
          borderRadius: '12px', 
          border: '1px solid #E2E8F0', 
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <ShieldCheck size={18} color="#7C3AED" />
            <span style={{ color: '#071A33', fontWeight: 600 }}>
              All properties on 1 Crore Property are verified & listed under ₹1.99 Cr.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '24px', fontSize: '11px', color: '#64748B' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🛡 100% Verified Buyers</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🏷 Price Guarantee</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🔒 Secure & Trusted</span>
          </div>
        </div>

      </div>
    </div>
  );
}
