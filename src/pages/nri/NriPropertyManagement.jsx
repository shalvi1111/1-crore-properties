import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, Users, DollarSign, Wrench, FileText, CheckCircle2, 
  ShieldCheck, AlertCircle, Phone, MessageSquare, Plus, ChevronDown, 
  Home, Eye, Calendar, MoreVertical, Clock, ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useApp } from '../../context/AppContext';

export default function NriPropertyManagement() {
  const { showToast, openMaintenanceModal, openVisitModal } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const performanceData = [
    { name: 'Rent Received', value: 89.7, amount: '₹1,30,000', color: '#059669' },
    { name: 'Maintenance', value: 6.9, amount: '₹10,000', color: '#D97706' },
    { name: 'Other Charges', value: 3.4, amount: '₹5,000', color: '#2563EB' }
  ];

  const stats = [
    { label: 'Total Properties', count: '4', sub: 'View All', icon: Building2 },
    { label: 'Occupied', count: '2', sub: '50% Occupancy', icon: Home },
    { label: 'Monthly Rental Income', count: '₹1,45,000', sub: 'View Details', icon: DollarSign, isHighlight: true },
    { label: 'Pending Requests', count: '3', sub: 'View Requests', icon: Wrench },
    { label: 'Active Tenants', count: '2', sub: 'View Tenants', icon: Users }
  ];

  const managedProperties = [
    {
      id: 'MP-01',
      title: 'Luxury Villa Greens',
      location: 'Bangalore, Karnataka',
      type: '4 BHK Villa',
      status: 'Occupied',
      statusColor: '#059669',
      statusBg: '#ECFDF5',
      rent: '₹65,000 /month',
      tenantSince: '10 Jun 2024',
      nextRentDue: '10 Jun 2024',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'MP-02',
      title: 'Oceanview Residences',
      location: 'Mumbai, Maharashtra',
      type: '3 BHK Apartment',
      status: 'Occupied',
      statusColor: '#059669',
      statusBg: '#ECFDF5',
      rent: '₹80,000 /month',
      tenantSince: '25 May 2024',
      nextRentDue: '25 May 2024',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'MP-03',
      title: 'Skyline Heights',
      location: 'Hyderabad, Telangana',
      type: '3 BHK Apartment',
      status: 'Vacant',
      statusColor: '#D97706',
      statusBg: '#FEF3C7',
      rent: '₹0 /month',
      tenantSince: 'Vacant',
      nextRentDue: '15 Apr 2024',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'MP-04',
      title: 'Green Acres Plots',
      location: 'Pune, Maharashtra',
      type: 'Residential Plot',
      status: 'Occupied',
      statusColor: '#059669',
      statusBg: '#ECFDF5',
      rent: '₹0 /month',
      tenantSince: '-',
      nextRentDue: '-',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'
    }
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
          <Building2 size={20} color="#C58A2A" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#C58A2A', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Property Management
          </span>
        </div>

        {/* Categories */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'my-properties', label: 'My Properties' },
            { id: 'tenant-mgmt', label: 'Tenant Management' },
            { id: 'rent-collection', label: 'Rent Collection' },
            { id: 'maintenance', label: 'Maintenance Requests' },
            { id: 'inspections', label: 'Property Inspections' },
            { id: 'documents', label: 'Documents' },
            { id: 'legal', label: 'Legal & Compliance' },
            { id: 'reports', label: 'Property Reports' },
            { id: 'utility', label: 'Utility Management' },
            { id: 'insurance', label: 'Insurance' }
          ].map(cat => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '9px 14px',
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
            <button onClick={() => showToast("Maintenance ticket raised")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <Plus size={16} color="#C58A2A" />
              <span>Raise Maintenance Request</span>
            </button>
            <Link to="/buyer/add-property" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', textDecoration: 'none' }}>
              <Building2 size={16} color="#C58A2A" />
              <span>Add New Property</span>
            </Link>
            <button onClick={() => showToast("Property details editor opened")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <FileText size={16} color="#C58A2A" />
              <span>Update Property Details</span>
            </button>
            <button onClick={() => showToast("Downloading management summary PDF...")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <DollarSign size={16} color="#C58A2A" />
              <span>Download Report</span>
            </button>
            <button onClick={() => showToast("Contacting property manager")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <Phone size={16} color="#C58A2A" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>

        {/* Security Card */}
        <div style={{ 
          marginTop: 'auto',
          background: 'linear-gradient(180deg, rgba(14, 40, 73, 0.7) 0%, rgba(7, 26, 51, 1) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(197, 138, 42, 0.3)',
          padding: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <ShieldCheck size={16} color="#059669" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>Your Data is 100% Secure</span>
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
            <div>✓ End-to-End Encrypted</div>
            <div>✓ ISO 27001 Certified</div>
            <div>✓ RERA Verified Platform</div>
          </div>
          <button onClick={() => showToast("Security Center")} style={{
            width: '100%',
            background: 'transparent',
            color: '#CBD5E1',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '7px 0',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Security Center
          </button>
        </div>
      </aside>

      {/* 2. Center Content Area */}
      <main style={{ flex: 1, padding: '28px 28px 60px 28px', maxWidth: '1020px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#071A33', margin: 0, fontFamily: 'Playfair Display, serif' }}>
              Property Management Overview
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
              Manage your properties, tenants, maintenance & more – all in one place.
            </p>
          </div>

          <button 
            onClick={() => showToast("Filtering by property")}
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
            <span>All Properties</span>
            <ChevronDown size={14} />
          </button>
        </div>

        {/* 5 Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '28px' }}>
          {stats.map((s, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '10px',
                padding: '16px 14px',
                border: '1px solid #E2E8F0'
              }}
            >
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>{s.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: s.isHighlight ? '#C58A2A' : '#071A33', marginBottom: '2px' }}>
                {s.count}
              </div>
              <div style={{ fontSize: '11px', color: '#2563EB', fontWeight: 500, cursor: 'pointer' }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* My Managed Properties Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#071A33', margin: 0 }}>
            My Managed Properties
          </h3>
          <Link to="/nri/my-properties" style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>
            View All Properties
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
          {managedProperties.map(p => (
            <div 
              key={p.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ position: 'relative', height: '110px' }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  background: p.statusColor,
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {p.status}
                </span>
                <button style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFF' }}>
                  <MoreVertical size={12} />
                </button>
              </div>

              <div style={{ padding: '12px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', margin: '0 0 2px 0' }}>{p.title}</h4>
                <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '2px' }}>{p.location}</div>
                <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '8px' }}>{p.type}</div>

                <div style={{ fontSize: '12px', fontWeight: 700, color: '#071A33', marginBottom: '8px' }}>
                  Rent: {p.rent}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748B', borderTop: '1px solid #F1F5F9', paddingTop: '6px' }}>
                  <div>
                    <div>Tenant Since</div>
                    <strong style={{ color: '#334155' }}>{p.tenantSince}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div>Next Rent Due</div>
                    <strong style={{ color: '#334155' }}>{p.nextRentDue}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Property Management Services 5 Cards */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#071A33', margin: '0 0 14px 0' }}>
            Property Management Services
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
            {[
              { title: 'Tenant Management', desc: 'Add tenants, manage leases, renewals & more.', link: 'Manage Tenants' },
              { title: 'Rent Collection', desc: 'Track rent, send reminders & view collection history.', link: 'View Rent Details' },
              { title: 'Maintenance', desc: 'Raise requests, track status & manage vendors.', link: 'Manage Requests' },
              { title: 'Inspections', desc: 'Schedule property inspections & view reports.', link: 'View Inspections' },
              { title: 'Documents', desc: 'Property documents, agreements & important files.', link: 'View Documents' }
            ].map((s, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#071A33', margin: '0 0 4px 0' }}>{s.title}</h4>
                  <p style={{ fontSize: '10px', color: '#64748B', margin: '0 0 12px 0', lineHeight: 1.4 }}>{s.desc}</p>
                </div>
                <span onClick={() => showToast(`Navigating to ${s.title}`)} style={{ fontSize: '11px', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>
                  {s.link}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 2 Cards: Rent Collection Summary + Recent Activities */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px' }}>
          {/* Rent Collection Summary */}
          <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: 0 }}>Rent Collection Summary</h4>
              <span style={{ fontSize: '11px', color: '#64748B', border: '1px solid #E2E8F0', padding: '2px 8px', borderRadius: '4px' }}>This Month ⌵</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Total Rent</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#071A33' }}>₹1,45,000</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Collected</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#059669' }}>₹1,30,000 <span style={{ fontSize: '11px' }}>(89.7%)</span></div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Pending</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#DC2626' }}>₹15,000 <span style={{ fontSize: '11px' }}>(10.3%)</span></div>
              </div>
            </div>

            <div style={{ textAlign: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
              <span onClick={() => showToast("Collection details drawer")} style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>
                View Collection Details
              </span>
            </div>
          </div>

          {/* Recent Activities */}
          <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: 0 }}>Recent Activities</h4>
              <span onClick={() => showToast("Activity logs")} style={{ fontSize: '11px', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>View All</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
              {[
                { title: 'Rent collected from Rohan Singh (Oceanview Residences)', amount: '₹80,000', date: '25 May 2024' },
                { title: 'Maintenance request completed (Villa Greens – Plumbing)', amount: '₹1,200', date: '23 May 2024' },
                { title: 'New tenant added – Rohan Singh (Oceanview Residences)', amount: '', date: '20 May 2024' },
                { title: 'Rent reminder sent to tenant (Villa Greens)', amount: '', date: '15 May 2024' }
              ].map((act, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#334155' }}>• {act.title}</span>
                  <div style={{ display: 'flex', gap: '8px', color: '#64748B', whiteSpace: 'nowrap' }}>
                    {act.amount && <strong style={{ color: '#071A33' }}>{act.amount}</strong>}
                    <span>{act.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 3. Right Column: Performance, Maintenance, Tenant, Help */}
      <aside style={{ 
        width: '320px', 
        minWidth: '320px',
        padding: '28px 24px 60px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Property Performance Summary */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: 0 }}>Property Performance Summary</h4>
            <span style={{ fontSize: '11px', color: '#64748B', border: '1px solid #E2E8F0', padding: '2px 6px', borderRadius: '4px' }}>This Month ⌵</span>
          </div>

          <div style={{ position: 'relative', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  isAnimationActive={false}
                  data={performanceData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => `${val}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#071A33' }}>₹1,45,000</div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>Total Income</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
            {performanceData.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                  <span style={{ color: '#475569' }}>{item.name}</span>
                </div>
                <strong style={{ color: '#071A33' }}>{item.amount} ({item.value}%)</strong>
              </div>
            ))}
          </div>

          <button 
            onClick={() => showToast("Financial report generated")}
            style={{
              width: '100%',
              marginTop: '14px',
              padding: '8px 0',
              border: '1px solid #C58A2A',
              borderRadius: '6px',
              background: '#FFFFFF',
              color: '#C58A2A',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            View Detailed Financial Report
          </button>
        </div>

        {/* Pending Maintenance Requests */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', margin: 0 }}>Pending Maintenance Requests</h4>
            <span onClick={() => showToast("All maintenance tickets")} style={{ fontSize: '11px', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>View All</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { issue: 'AC Not Cooling', priority: 'High', pColor: '#DC2626', prop: 'Luxury Villa Greens', id: 'Request ID: #MR1234', cost: '₹1,500' },
              { issue: 'Water Leakage', priority: 'Medium', pColor: '#D97706', prop: 'Oceanview Residences', id: 'Request ID: #MR1235', cost: '₹850' },
              { issue: 'Paint Touch-up', priority: 'Low', pColor: '#059669', prop: 'Skyline Heights', id: 'Request ID: #MR1236', cost: '₹1,200' }
            ].map((m, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', background: '#F8FAFC', borderRadius: '6px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#071A33' }}>{m.issue}</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: m.pColor }}>{m.priority}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>{m.prop}</div>
                  <div style={{ fontSize: '9px', color: '#94A3B8' }}>{m.id}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#071A33' }}>{m.cost}</div>
                  <div style={{ fontSize: '9px', color: '#94A3B8', marginBottom: '4px' }}>Est. Cost</div>
                  <button onClick={() => showToast(`Vendor assigned to ${m.id}`)} style={{ padding: '3px 8px', background: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '10px', cursor: 'pointer' }}>
                    Assign
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={openMaintenanceModal}
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '8px 0',
              border: '1px dashed #CBD5E1',
              borderRadius: '6px',
              background: '#FAFAFA',
              color: '#334155',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Raise New Request
          </button>
        </div>

        {/* Tenant Information Card */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', margin: 0 }}>Tenant Information</h4>
            <span onClick={() => showToast("Tenants directory")} style={{ fontSize: '11px', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>View All</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              RS
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#071A33' }}>Rohan Singh</div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>+91 98765 43210 • Oceanview Residences</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
            <div>
              <div style={{ color: '#64748B' }}>Rent On Time</div>
              <span style={{ color: '#059669', fontWeight: 700, background: '#ECFDF5', padding: '1px 6px', borderRadius: '3px' }}>Yes</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#64748B' }}>Security Deposit</div>
              <span style={{ color: '#071A33', fontWeight: 700 }}>₹1,50,000</span>
            </div>
          </div>
        </div>

        {/* Need Help Card */}
        <div style={{ background: '#071A33', borderRadius: '12px', padding: '18px', color: '#FFFFFF' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 4px 0' }}>Need Help?</h4>
          <p style={{ fontSize: '11px', color: '#94A3B8', margin: '0 0 12px 0' }}>Our property management team is here.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noreferrer" 
              style={{ textAlign: 'center', textDecoration: 'none', padding: '8px 0', background: '#059669', color: '#FFF', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
            >
              Chat on WhatsApp
            </a>
            <button onClick={() => openVisitModal()} style={{ padding: '8px 0', background: '#C58A2A', color: '#FFF', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
              Request a Call Back
            </button>
          </div>
          <div style={{ fontSize: '10px', color: '#94A3B8', textAlign: 'center', marginTop: '10px' }}>
            Dedicated NRI Support: +91 98765 43210
          </div>
        </div>
      </aside>
    </div>
  );
}
