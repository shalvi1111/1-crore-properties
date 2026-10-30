import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, DollarSign, TrendingUp, ShieldCheck, 
  CheckCircle2, XCircle, Eye, Search, Filter, Download, ArrowUpRight,
  PlusCircle, FileCheck, Calendar, MessageSquare, Tag, FileText, UserCheck, Clock, MapPin
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, 
  CartesianGrid, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const { properties, showToast } = useApp();

  const [approvalList, setApprovalList] = useState([
    { id: 'PROP-901', title: 'DLF Magnolias Ultra Penthouse', builder: 'DLF Limited', price: '₹14.50 Cr', city: 'Gurgaon / NCR', status: 'Under Review', submitted: '2 hours ago' },
    { id: 'PROP-902', title: 'Emaar Beachfront Horizon', builder: 'Emaar India', price: '₹8.20 Cr', city: 'Mumbai', status: 'Under Review', submitted: '5 hours ago' },
    { id: 'PROP-903', title: 'Prestige Sanctuary Villa', builder: 'Prestige Group', price: '₹4.75 Cr', city: 'Bangalore', status: 'Active', submitted: 'Yesterday' },
    { id: 'PROP-904', title: 'Aparna CyberLife Luxury Flat', builder: 'Aparna Constructions', price: '₹2.10 Cr', city: 'Hyderabad', status: 'Active', submitted: '2 days ago' },
    { id: 'PROP-905', title: 'Green Meadows Open Plots', builder: 'Vertex Homes', price: '₹1.15 Cr', city: 'Hyderabad', status: 'Active', submitted: '3 days ago' },
  ]);

  const overviewData = [
    { month: 'Jan', views: 4200, enquiries: 1240, siteVisits: 180, deals: 42 },
    { month: 'Feb', views: 5600, enquiries: 1560, siteVisits: 220, deals: 55 },
    { month: 'Mar', views: 7200, enquiries: 2100, siteVisits: 310, deals: 78 },
    { month: 'Apr', views: 8900, enquiries: 2650, siteVisits: 410, deals: 94 },
    { month: 'May', views: 10800, enquiries: 3200, siteVisits: 520, deals: 118 },
    { month: 'Jun', views: 12684, enquiries: 3890, siteVisits: 640, deals: 142 },
  ];

  const statusDonutData = [
    { name: 'Active', value: 1890, color: '#059669' },
    { name: 'Under Review', value: 245, color: '#C58A2A' },
    { name: 'Inactive', value: 167, color: '#64748B' },
    { name: 'Rejected', value: 78, color: '#EF4444' },
    { name: 'Expired', value: 78, color: '#7C3AED' },
  ];

  const topLocations = [
    { city: 'Bangalore', count: 1245, percent: 50 },
    { city: 'Hyderabad', count: 456, percent: 18 },
    { city: 'Pune', count: 234, percent: 10 },
    { city: 'Chennai', count: 189, percent: 8 },
    { city: 'Others', count: 100, percent: 4 },
  ];

  const handleAction = (id, newStatus) => {
    setApprovalList(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    showToast(`Property ${id} status updated to: ${newStatus}`);
  };

  const handleExportAudit = () => {
    const csvContent = "Property ID,Title,Builder,Price,City,Status,Submitted\n" +
      approvalList.map(p => `"${p.id}","${p.title}","${p.builder}","${p.price}","${p.city}","${p.status}","${p.submitted}"`).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Audit_Log_1CroreProperties_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Audit log CSV exported successfully!");
  };

  return (
    <div className="admin-dashboard-page" style={{ background: '#F8FAFC', minHeight: '100vh', padding: '32px 0 80px 0' }}>
      <div className="container">
        
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#C58A2A', letterSpacing: '0.5px' }}>
              MASTER PLATFORM MANAGEMENT
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#071A33', margin: '4px 0 0 0', fontFamily: 'Playfair Display, serif' }}>
              Admin Dashboard
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              type="button"
              onClick={handleExportAudit}
              className="btn btn-outline" 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
            >
              <Download size={16} /> Export Audit Log
            </button>
            <Link to="/properties" className="btn btn-navy" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <Eye size={16} /> View Live Portal
            </Link>
          </div>
        </div>

        {/* 6 Top KPI Cards (Screenshot 3.1) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Total Properties</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#071A33', marginTop: '4px' }}>2,458</div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px' }}>+12% this month</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Active Properties</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>1,890</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>76.8% active rate</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Under Review</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#C58A2A', marginTop: '4px' }}>245</div>
            <div style={{ fontSize: '11px', color: '#C58A2A', marginTop: '4px', fontWeight: 600 }}>Needs action</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Rejected</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>78</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>3.2% rejection rate</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Total Enquiries</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#2563EB', marginTop: '4px' }}>12,684</div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px' }}>+24% vs last mo</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Site Visit Requests</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#7C3AED', marginTop: '4px' }}>1,248</div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px' }}>182 this week</div>
          </div>
        </div>

        {/* 2-Column: Overview 4-Line Chart + Status Donut Chart */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
          
          {/* Property Overview Chart */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#071A33', margin: 0 }}>
                  Property Overview
                </h3>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0 0' }}>Multi-metric platform trend analysis</p>
              </div>
            </div>

            <div style={{ height: '280px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={overviewData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#071A33', borderRadius: '8px', color: '#FFF' }} />
                  <Legend />
                  <Line isAnimationActive={false} type="monotone" dataKey="views" name="Page Views" stroke="#071A33" strokeWidth={3} dot={{ r: 3 }} />
                  <Line isAnimationActive={false} type="monotone" dataKey="enquiries" name="Enquiries" stroke="#C58A2A" strokeWidth={2} dot={{ r: 3 }} />
                  <Line isAnimationActive={false} type="monotone" dataKey="siteVisits" name="Site Visits" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
                  <Line isAnimationActive={false} type="monotone" dataKey="deals" name="Deals Closed" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Donut Chart */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#071A33', margin: '0 0 4px 0' }}>
              Property Status Distribution
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 16px 0' }}>Current inventory breakdown</p>

            <div style={{ height: '200px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    isAnimationActive={false}
                    data={statusDonutData}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `${val} units`} contentStyle={{ background: '#071A33', borderRadius: '8px', color: '#FFF' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
              {statusDonutData.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                    <span style={{ color: '#475569' }}>{item.name}</span>
                  </div>
                  <strong style={{ color: '#071A33' }}>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 8 Quick Actions Grid (Screenshot 3.1) */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#071A33', margin: '0 0 16px 0' }}>
            Quick Actions
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '12px' }}>
            {[
              { label: 'Add Property', icon: PlusCircle, color: '#059669', bg: '#ECFDF5', link: '/buyer/add-property' },
              { label: 'Review Pending', icon: FileCheck, color: '#C58A2A', bg: '#FEF3C7', count: '245' },
              { label: 'Verify Builders', icon: ShieldCheck, color: '#2563EB', bg: '#EFF6FF' },
              { label: 'Site Visits', icon: Calendar, color: '#7C3AED', bg: '#F5F3FF', count: '1,248' },
              { label: 'Manage Enquiries', icon: MessageSquare, color: '#071A33', bg: '#F1F5F9' },
              { label: 'Price Approvals', icon: Tag, color: '#D97706', bg: '#FFFBEB' },
              { label: 'Generate Reports', icon: FileText, color: '#4F46E5', bg: '#EEF2FF' },
              { label: 'User Management', icon: UserCheck, color: '#0891B2', bg: '#ECFEFF' },
            ].map((qa, i) => {
              const Icon = qa.icon;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => showToast(`Opening ${qa.label}...`)}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '14px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '8px'
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: qa.bg, color: qa.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#1E293B' }}>{qa.label}</span>
                  {qa.count && (
                    <span style={{ fontSize: '10px', background: qa.color, color: '#FFF', padding: '1px 6px', borderRadius: '10px', fontWeight: 700 }}>
                      {qa.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Recent Properties Table + Top Locations Progress Bars */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
          
          {/* Recent Properties Table */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#071A33', margin: '0 0 16px 0' }}>
              Recent Properties
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#475569' }}>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Property Title</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Developer</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Price</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {approvalList.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '12px', fontWeight: 700, color: '#071A33' }}>{item.title}</td>
                      <td style={{ padding: '12px', color: '#334155' }}>{item.builder}</td>
                      <td style={{ padding: '12px', fontWeight: 700, color: '#C58A2A' }}>{item.price}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ 
                          fontSize: '11px', 
                          fontWeight: 600, 
                          color: item.status === 'Active' ? '#059669' : '#D97706',
                          background: item.status === 'Active' ? '#ECFDF5' : '#FEF3C7',
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          {item.status !== 'Active' && (
                            <button 
                              type="button"
                              onClick={() => handleAction(item.id, 'Active')}
                              className="btn btn-navy" 
                              style={{ padding: '4px 8px', fontSize: '11px' }}
                            >
                              Approve
                            </button>
                          )}
                          <button 
                            type="button"
                            onClick={() => handleAction(item.id, 'Rejected')}
                            className="btn btn-outline" 
                            style={{ padding: '4px 8px', fontSize: '11px', color: '#EF4444', borderColor: '#EF4444' }}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Locations Horizontal Bars */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#071A33', margin: '0 0 16px 0' }}>
              Top Locations
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {topLocations.map((loc, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: '#1E293B' }}>{loc.city}</span>
                    <span style={{ color: '#64748B' }}>{loc.count} listings ({loc.percent}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${loc.percent}%`, height: '100%', background: '#C58A2A', borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 4 Bottom Stats Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#64748B' }}>Avg Listing Price</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#071A33', marginTop: '4px' }}>₹1.48 Cr</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#64748B' }}>Platform Conversion</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>14.8%</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#64748B' }}>Active Brokers & Builders</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#C58A2A', marginTop: '4px' }}>342</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#64748B' }}>Avg Time on Market</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#2563EB', marginTop: '4px' }}>42 Days</div>
          </div>
        </div>

      </div>
    </div>
  );
}
