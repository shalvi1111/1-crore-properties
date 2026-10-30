import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, CheckCircle2, ShieldCheck, Phone, MessageSquare, 
  Clock, Play, Crown, Star, ArrowRight, UserCheck, Wrench, 
  Home, FileText, DollarSign, Eye, Car, Building2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function NriServices() {
  const { showToast, openServiceModal, openVisitModal } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const servicesList = [
    {
      id: 'srv-1',
      title: 'Property Management',
      desc: 'End-to-end management of your property in India.',
      features: ['Tenant Management', 'Rent Collection', 'Property Maintenance', 'Regular Reporting'],
      action: 'Book Now',
      icon: Home,
      iconBg: '#EFF6FF',
      iconColor: '#2563EB'
    },
    {
      id: 'srv-2',
      title: 'Tenant Management',
      desc: 'We find verified tenants and manage everything for you.',
      features: ['Tenant Screening', 'Agreement Management', 'Move-in / Move-out', 'Tenant Support'],
      action: 'Book Now',
      icon: UserCheck,
      iconBg: '#FEF3C7',
      iconColor: '#D97706'
    },
    {
      id: 'srv-3',
      title: 'Maintenance Services',
      desc: 'Keep your property in perfect condition always.',
      features: ['Plumbing, Electrical', 'Carpentry, Painting', 'Appliance Repair', 'AMC & Inspections'],
      action: 'Book Now',
      icon: Wrench,
      iconBg: '#F5F3FF',
      iconColor: '#7C3AED'
    },
    {
      id: 'srv-4',
      title: 'Rent Collection',
      desc: 'Hassle-free rent collection and payouts on time.',
      features: ['On-time Collection', 'Online Payments', 'Rent Statements', 'Automatic Reminders'],
      action: 'Book Now',
      icon: DollarSign,
      iconBg: '#ECFDF5',
      iconColor: '#059669'
    },
    {
      id: 'srv-5',
      title: 'Legal & Compliance',
      desc: 'Stay compliant with all legal requirements.',
      features: ['Document Verification', 'Agreement Drafting', 'RERA / Tax Support', 'Legal Consultation'],
      action: 'Book Now',
      icon: FileText,
      iconBg: '#EFF6FF',
      iconColor: '#2563EB'
    },
    {
      id: 'srv-6',
      title: 'Home Setup Services',
      desc: 'We set up your home beautifully before you arrive.',
      features: ['Interior Setup', 'Furniture & Appliances', 'Utility Connections', 'Home Essentials'],
      action: 'Book Now',
      icon: Home,
      iconBg: '#ECFDF5',
      iconColor: '#059669'
    },
    {
      id: 'srv-7',
      title: 'Property Inspections',
      desc: 'Regular inspections with detailed reports & photos.',
      features: ['Property Visits', 'Photo & Video Reports', 'Maintenance Check', 'Issue Resolution'],
      action: 'Book Now',
      icon: Eye,
      iconBg: '#EFF6FF',
      iconColor: '#2563EB'
    },
    {
      id: 'srv-8',
      title: 'Financial Services',
      desc: 'Simplify your property finances and investments.',
      features: ['Home Loan Assistance', 'Tax Planning', 'Investment Advisory', 'NRI Banking Support'],
      action: 'Enquire Now',
      icon: DollarSign,
      iconBg: '#ECFDF5',
      iconColor: '#059669',
      isEnquire: true
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
          <Briefcase size={20} color="#C58A2A" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#C58A2A', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Services
          </span>
        </div>

        {/* Categories */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { id: 'all', label: 'All Services' },
            { id: 'prop', label: 'Property Services' },
            { id: 'legal', label: 'Legal & Compliance' },
            { id: 'fin', label: 'Financial Services' },
            { id: 'home', label: 'Home Setup Services' },
            { id: 'travel', label: 'Travel & Concierge' },
            { id: 'doc', label: 'Documentation' },
            { id: 'other', label: 'Other Services' }
          ].map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
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
            <button onClick={() => showToast("Select a service to book")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <Briefcase size={16} color="#C58A2A" />
              <span>Book a Service</span>
            </button>
            <button onClick={() => showToast("Track ongoing service requests")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <Clock size={16} color="#C58A2A" />
              <span>Track Service Requests</span>
            </button>
            <button onClick={() => showToast("Service history logs loaded")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <FileText size={16} color="#C58A2A" />
              <span>Service History</span>
            </button>
            <button onClick={() => showToast("Appointments calendar")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <UserCheck size={16} color="#C58A2A" />
              <span>Manage Appointments</span>
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
            <div>✓ PCI DSS Compliant</div>
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
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#071A33', margin: 0, fontFamily: 'Playfair Display, serif' }}>
              Our Services
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
              Everything you need for seamless property ownership in India.
            </p>
          </div>

          <button 
            onClick={() => showToast("How It Works video modal")}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#071A33',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Play size={14} color="#C58A2A" />
            <span>How It Works</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {[
            { id: 'all', label: 'All Services' },
            { id: 'prop', label: 'Property Services' },
            { id: 'legal', label: 'Legal & Compliance' },
            { id: 'fin', label: 'Financial Services' },
            { id: 'home', label: 'Home Setup' },
            { id: 'travel', label: 'Travel & Concierge' },
            { id: 'doc', label: 'Documentation' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setActiveCategory(p.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: activeCategory === p.id ? 'none' : '1px solid #E2E8F0',
                background: activeCategory === p.id ? '#C58A2A' : '#FFFFFF',
                color: activeCategory === p.id ? '#FFFFFF' : '#64748B',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Explore Our Services 8 Cards */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#071A33', margin: '0 0 14px 0' }}>
            Explore Our Services
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {servicesList.map(srv => (
              <div 
                key={srv.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: srv.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                    <srv.icon size={18} color={srv.iconColor} />
                  </div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', margin: '0 0 4px 0' }}>{srv.title}</h4>
                  <p style={{ fontSize: '11px', color: '#64748B', margin: '0 0 12px 0', lineHeight: 1.4 }}>{srv.desc}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                    {srv.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#475569' }}>
                        <span style={{ color: '#D97706', fontSize: '10px' }}>✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => openServiceModal(srv.title)}
                  style={{
                    width: '100%',
                    padding: '8px 0',
                    border: srv.isEnquire ? '1px solid #059669' : '1px solid #C58A2A',
                    borderRadius: '6px',
                    background: '#FFFFFF',
                    color: srv.isEnquire ? '#059669' : '#C58A2A',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {srv.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* NRI Concierge Services Banner */}
        <div style={{ 
          background: '#FFFBEB', 
          border: '1px solid #FDE68A', 
          borderRadius: '12px', 
          padding: '18px 24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '28px',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Crown size={18} color="#C58A2A" />
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#071A33' }}>NRI Concierge Services</span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 12px 0' }}>
              We assist you beyond property – travel, stay, local transport and more.
            </p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#475569', flexWrap: 'wrap' }}>
              <span>✈ Airport Pickup</span>
              <span>🏢 Hotel Booking</span>
              <span>🚗 Local Transport</span>
              <span>🏙 City Tours</span>
              <span>🤝 NRI Meet & Greet</span>
            </div>
          </div>

          <button 
            onClick={() => openServiceModal("NRI Concierge Services")}
            style={{
              padding: '10px 20px',
              background: '#C58A2A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Explore Concierge
          </button>
        </div>

        {/* Bottom 2 Sections: How It Works + Recent Service Requests */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* How It Works */}
          <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '16px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 16px 0' }}>How It Works</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center' }}>
              {[
                { step: '1. Choose a Service', desc: 'Select the service you need' },
                { step: '2. Share Requirements', desc: 'Tell us your requirements' },
                { step: '3. We Take Care', desc: 'Relax, we do the rest' },
                { step: '4. Regular Updates', desc: 'Get updates on WhatsApp/Email' }
              ].map((st, i) => (
                <div key={i}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', fontWeight: 700, fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#071A33', marginBottom: '2px' }}>{st.step}</div>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>{st.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Service Requests */}
          <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: 0 }}>Recent Service Requests</h4>
              <span onClick={() => showToast("All service tickets")} style={{ fontSize: '11px', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>View All</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
              {[
                { title: 'AC Repair – Luxury Villa Greens', status: 'In Progress', sBg: '#EFF6FF', sColor: '#2563EB', date: '24 May 2024' },
                { title: 'Tenant Screening – Oceanview Residences', status: 'Completed', sBg: '#ECFDF5', sColor: '#059669', date: '22 May 2024' },
                { title: 'Painting – Skyline Heights', status: 'In Progress', sBg: '#EFF6FF', sColor: '#2563EB', date: '20 May 2024' }
              ].map((req, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#334155' }}>• {req.title}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: req.sBg, color: req.sColor, padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>{req.status}</span>
                    <span style={{ color: '#64748B' }}>{req.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 3. Right Column: Why Choose, Need Help, Hotline, Popular */}
      <aside style={{ 
        width: '320px', 
        minWidth: '320px',
        padding: '28px 24px 60px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Why Choose 1 Crore Properties Services? */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 14px 0' }}>
            Why Choose 1 Crore Properties Services?
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { title: 'NRI Focused', desc: 'Specialized services for NRIs, by NRI experts.' },
              { title: 'Trusted & Verified', desc: 'Background verified partners & professionals.' },
              { title: 'Transparent Pricing', desc: 'No hidden charges. 100% transparency.' },
              { title: 'Timely Updates', desc: 'Regular updates & reports on WhatsApp/Email.' },
              { title: '24/7 Support', desc: 'Dedicated support for all your queries.' }
            ].map((it, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', fontWeight: 700, fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  ✓
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#071A33' }}>{it.title}</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>{it.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Need Help Choosing a Service? */}
        <div style={{ 
          background: 'linear-gradient(135deg, #071A33 0%, #0A2540 100%)', 
          borderRadius: '12px', 
          padding: '20px', 
          color: '#FFFFFF' 
        }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 2px 0' }}>
            Need Help Choosing a Service?
          </h4>
          <p style={{ fontSize: '11px', color: '#94A3B8', margin: '0 0 14px 0' }}>
            Our relationship manager is here for you.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" 
              alt="Amit Patel" 
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C58A2A' }} 
            />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>Amit Patel ✓</div>
              <div style={{ fontSize: '11px', color: '#93C5FD' }}>NRI Relationship Manager</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#FCD34D' }}>+91 98765 43210</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => showToast("Opening WhatsApp with Amit Patel")}
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
              onClick={() => showToast("Scheduling consultation call with Amit")}
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
            Request a Callback
          </button>
        </div>

        {/* Popular Services */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', margin: 0 }}>Popular Services</h4>
            <span onClick={() => showToast("All services")} style={{ fontSize: '11px', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>View All</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { name: 'Property Management', rating: '4.8' },
              { name: 'Rent Collection', rating: '4.7' },
              { name: 'Home Setup Services', rating: '4.9' }
            ].map((ps, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ color: '#334155', fontWeight: 500 }}>{ps.name}</span>
                <span style={{ color: '#D97706', fontWeight: 700 }}>★ {ps.rating}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
