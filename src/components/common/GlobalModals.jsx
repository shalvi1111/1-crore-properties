import React, { useState } from 'react';
import { 
  X, Calendar, Clock, User, Phone, CheckCircle2, ShieldCheck, 
  DollarSign, Video, Eye, Compass, Maximize2, Sparkles, Building, 
  FileText, Plus, Trash2, ArrowRight, Download, Send, Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function GlobalModals() {
  const { 
    properties,
    compareList,
    toggleCompare,
    showToast,
    formatPrice,
    bookSiteVisit,
    addMaintenanceRequest,
    bookService,
    downloadBrochure,
    // Modals state & handlers
    visitModal, closeVisitModal,
    quoteModal, closeQuoteModal,
    tourModal, closeTourModal,
    comparePicker, closeComparePicker,
    aiCompareModal, closeAiCompareModal,
    maintenanceModal, closeMaintenanceModal,
    serviceModal, closeServiceModal,
    docRequestModal, closeDocRequestModal
  } = useApp();

  // 1. Visit Form State
  const [visitDate, setVisitDate] = useState('2024-06-25');
  const [visitTime, setVisitTime] = useState('11:00 AM');
  const [visitName, setVisitName] = useState('Rahul Sharma');
  const [visitPhone, setVisitPhone] = useState('+91 98765 43210');
  const [visitNotes, setVisitNotes] = useState('Interested in 3 BHK high floor facing park.');
  const [visitSuccess, setVisitSuccess] = useState(false);

  const handleVisitSubmit = (e) => {
    e.preventDefault();
    bookSiteVisit({
      propertyTitle: visitModal.property?.title || 'Skyline Heights',
      date: visitDate,
      time: visitTime,
      name: visitName,
      phone: visitPhone
    });
    setVisitSuccess(true);
    setTimeout(() => {
      setVisitSuccess(false);
      closeVisitModal();
    }, 2200);
  };

  // 2. Quote Breakdown Calculations
  const quoteProp = quoteModal.property || properties[0];
  const rawPrice = quoteProp ? (quoteProp.rawPrice || 14500000) : 14500000;
  const stampDuty = Math.round(rawPrice * 0.06);
  const registration = Math.round(rawPrice * 0.01);
  const gst = Math.round(rawPrice * 0.05);
  const legalCharges = 50000;
  const maintenanceDeposit = 150000;
  const grandTotal = rawPrice + stampDuty + registration + gst + legalCharges + maintenanceDeposit;

  // 3. Tour active tab
  const [activeTourTab, setActiveTourTab] = useState(tourModal.tourType || 'Walkthrough Video');

  // 4. Compare Picker Search
  const [compareSearch, setCompareSearch] = useState('');

  // 5. Maintenance Form
  const [maintTitle, setMaintTitle] = useState('HVAC & Plumbing Check');
  const [maintProp, setMaintProp] = useState('Luxury Villa Greens');
  const [maintPriority, setMaintPriority] = useState('High');
  const [maintDesc, setMaintDesc] = useState('AC compressor needs scheduled summer servicing and refrigerant pressure top-up.');

  const handleMaintSubmit = (e) => {
    e.preventDefault();
    addMaintenanceRequest({
      title: maintTitle,
      property: maintProp,
      priority: maintPriority,
      estCost: '₹3,500'
    });
    closeMaintenanceModal();
  };

  // 6. Service Request Form
  const [serviceDate, setServiceDate] = useState('2024-06-30');
  const [serviceNotes, setServiceNotes] = useState('Please assign senior legal counsel for FEMA compliance review.');

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    bookService({
      service: serviceModal.serviceName || 'FEMA & Tax Consultation',
      property: 'Skyline Heights'
    });
    closeServiceModal();
  };

  // 7. Doc Request Form
  const [docReqName, setDocReqName] = useState('Encumbrance Certificate (Last 30 Years)');
  const [docReqProp, setDocReqProp] = useState('Skyline Heights');

  const handleDocReqSubmit = (e) => {
    e.preventDefault();
    showToast(`Document procurement ticket created for "${docReqName}". Legal officer assigned.`);
    closeDocRequestModal();
  };

  return (
    <>
      {/* ========================================================= */}
      {/* 1. SCHEDULE SITE VISIT MODAL */}
      {/* ========================================================= */}
      {visitModal.isOpen && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(7, 26, 51, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '520px', width: '100%', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', animation: 'scaleIn 0.2s ease-out' }}>
            <div style={{ background: 'linear-gradient(135deg, #071A33 0%, #0F2E59 100%)', padding: '20px 24px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#C58A2A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>VIP Concierge Service</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0', fontFamily: 'Playfair Display, serif' }}>Schedule Private Site Visit</h3>
              </div>
              <button onClick={closeVisitModal} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            {visitSuccess ? (
              <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                <CheckCircle2 size={56} color="#059669" style={{ margin: '0 auto 16px auto' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#071A33', margin: '0 0 8px 0' }}>Visit Confirmed!</h3>
                <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
                  Your appointment for <strong>{visitModal.property?.title || 'Selected Property'}</strong> on <strong>{visitDate}</strong> at <strong>{visitTime}</strong> is scheduled. Chauffeur pickup details sent via WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVisitSubmit} style={{ padding: '24px' }}>
                <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '18px' }}>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Target Property</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#071A33' }}>{visitModal.property?.title || 'Skyline Heights Luxury Residence'}</div>
                  <div style={{ fontSize: '12px', color: '#C58A2A', fontWeight: 600 }}>{visitModal.property?.location || 'Hyderabad, Telangana'}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Preferred Date *</label>
                    <input 
                      type="date" 
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Preferred Time Slot *</label>
                    <select 
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    >
                      <option>10:00 AM – 11:30 AM</option>
                      <option>11:30 AM – 01:00 PM</option>
                      <option>02:30 PM – 04:00 PM</option>
                      <option>04:30 PM – 06:00 PM</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Full Name *</label>
                    <input 
                      type="text" 
                      value={visitName}
                      onChange={(e) => setVisitName(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Contact Phone / WhatsApp *</label>
                    <input 
                      type="text" 
                      value={visitPhone}
                      onChange={(e) => setVisitPhone(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Special Instructions / Requirements</label>
                  <textarea 
                    rows="2"
                    value={visitNotes}
                    onChange={(e) => setVisitNotes(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={closeVisitModal} className="btn btn-outline" style={{ flex: 1, padding: '10px' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-gold" style={{ flex: 2, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Calendar size={16} /> Confirm Site Visit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. INSTANT QUOTE & COST BREAKDOWN MODAL */}
      {/* ========================================================= */}
      {quoteModal.isOpen && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(7, 26, 51, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '580px', width: '100%', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ background: '#071A33', padding: '20px 24px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#C58A2A', textTransform: 'uppercase' }}>Comprehensive Financial Breakdown</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0', fontFamily: 'Playfair Display, serif' }}>All-Inclusive Property Cost Sheet</h3>
              </div>
              <button onClick={closeQuoteModal} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #E2E8F0' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#071A33', margin: 0 }}>{quoteProp.title}</h4>
                <div style={{ fontSize: '12px', color: '#64748B' }}>{quoteProp.location} • {quoteProp.area} sq.ft</div>
              </div>

              <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '8px 0', color: '#475569' }}>Agreement Base Value</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 700, color: '#071A33' }}>₹{(rawPrice / 10000000).toFixed(2)} Cr</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '8px 0', color: '#475569' }}>Stamp Duty (6%)</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', color: '#334155' }}>₹{(stampDuty / 100000).toFixed(2)} Lakhs</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '8px 0', color: '#475569' }}>Registration Charges (1%)</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', color: '#334155' }}>₹{(registration / 100000).toFixed(2)} Lakhs</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '8px 0', color: '#475569' }}>GST (5% under construction)</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', color: '#334155' }}>₹{(gst / 100000).toFixed(2)} Lakhs</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '8px 0', color: '#475569' }}>Legal Verification & Escrow</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', color: '#334155' }}>₹50,000</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '8px 0', color: '#475569' }}>Clubhouse & Maintenance Sinking Fund</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', color: '#334155' }}>₹1,50,000</td>
                  </tr>
                  <tr style={{ background: '#FEF3C7' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 800, color: '#78350F', fontSize: '14px' }}>Estimated Total Cost (All Inclusive)</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 800, color: '#78350F', fontSize: '16px' }}>₹{(grandTotal / 10000000).toFixed(2)} Cr</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => downloadBrochure(quoteProp)} 
                  className="btn btn-outline" 
                  style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Download size={14} /> Download PDF Quote
                </button>
                <button 
                  type="button" 
                  onClick={() => { closeQuoteModal(); openVisitModal(quoteProp); }} 
                  className="btn btn-gold" 
                  style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Calendar size={14} /> Book Site Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. MEDIA TOUR & 360 VIEWER MODAL */}
      {/* ========================================================= */}
      {tourModal.isOpen && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(7, 26, 51, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#071A33', borderRadius: '16px', maxWidth: '850px', width: '100%', overflow: 'hidden', boxShadow: '0 24px 48px rgba(0,0,0,0.5)', border: '1px solid rgba(197, 138, 42, 0.3)' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ background: '#C58A2A', color: '#FFF', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>IMMERSIVE 4K</span>
                <span style={{ fontSize: '15px', fontWeight: 700 }}>{tourModal.property?.title || 'Skyline Heights Walkthrough'}</span>
              </div>
              <button onClick={closeTourModal} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            {/* Tour Tabs */}
            <div style={{ display: 'flex', background: '#0B2548', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['Walkthrough Video', 'Drone Video', '360° Virtual Tour', "Bird's Eye View"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTourTab(tab)}
                  style={{
                    flex: 1,
                    padding: '12px 0',
                    background: activeTourTab === tab ? 'rgba(197, 138, 42, 0.2)' : 'transparent',
                    border: 'none',
                    borderBottom: activeTourTab === tab ? '2px solid #C58A2A' : 'none',
                    color: activeTourTab === tab ? '#E4AC4C' : '#94A3B8',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Interactive Player Surface */}
            <div style={{ position: 'relative', height: '420px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img 
                src={tourModal.property?.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"} 
                alt="Tour View" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, rgba(7,26,51,0.85) 100%)' }} />

              <div style={{ position: 'absolute', textAlign: 'center', color: '#FFF' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#C58A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', cursor: 'pointer', boxShadow: '0 0 24px rgba(197, 138, 42, 0.6)' }} onClick={() => showToast(`Playing ${activeTourTab} stream in high-bitrate HDR`)}>
                  <Video size={28} color="#FFF" />
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700 }}>Interactive {activeTourTab}</div>
                <div style={{ fontSize: '12px', color: '#CBD5E1', marginTop: '4px' }}>360° Gyroscope & Spatial Audio Enabled • Click to Play</div>
              </div>

              {/* Panorama Hotspots */}
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={14} color="#C58A2A" />
                <span>Drag to rotate • Pinch to zoom inside living room</span>
              </div>
            </div>

            <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#071A33' }}>
              <div style={{ color: '#94A3B8', fontSize: '12px' }}>
                RERA Certified Digital Twin • Verified Dimensions & Views
              </div>
              <button onClick={() => { closeTourModal(); openVisitModal(tourModal.property); }} className="btn btn-gold" style={{ padding: '8px 16px', fontSize: '12px' }}>
                Schedule Physical Visit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. COMPARE PROPERTY PICKER DRAWER */}
      {/* ========================================================= */}
      {comparePicker.isOpen && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(7, 26, 51, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '700px', width: '100%', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ background: '#071A33', padding: '18px 24px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#C58A2A', textTransform: 'uppercase' }}>Property Selection Drawer</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0', fontFamily: 'Playfair Display, serif' }}>Add Property to Comparison Matrix</h3>
              </div>
              <button onClick={closeComparePicker} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '16px 24px', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
              <input 
                type="text" 
                placeholder="Search by title, location or property ID..." 
                value={compareSearch}
                onChange={(e) => setCompareSearch(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {properties
                .filter(p => p.title.toLowerCase().includes(compareSearch.toLowerCase()) || p.location.toLowerCase().includes(compareSearch.toLowerCase()))
                .map(prop => {
                  const isAlreadyInCompare = compareList.includes(prop.id);
                  return (
                    <div key={prop.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0', background: isAlreadyInCompare ? '#FEF3C7' : '#FFFFFF' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img src={prop.image} alt={prop.title} style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div>
                          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 2px 0' }}>{prop.title}</h4>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>{prop.location} • {prop.config || prop.bhk}</div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#C58A2A' }}>{formatPrice(prop.price)}</div>
                        </div>
                      </div>

                      <button 
                        onClick={() => toggleCompare(prop.id)}
                        className={`btn ${isAlreadyInCompare ? 'btn-outline' : 'btn-navy'}`}
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                      >
                        {isAlreadyInCompare ? 'Remove' : '+ Add to Compare'}
                      </button>
                    </div>
                  );
                })}
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Comparing <strong>{compareList.length}</strong> of max 4 properties
              </span>
              <button onClick={closeComparePicker} className="btn btn-gold" style={{ padding: '8px 20px', fontSize: '13px' }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. AI INVESTMENT RECOMMENDATION MODAL */}
      {/* ========================================================= */}
      {aiCompareModal.isOpen && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(7, 26, 51, 0.8)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '640px', width: '100%', overflow: 'hidden', boxShadow: '0 24px 48px rgba(0,0,0,0.3)' }}>
            <div style={{ background: 'linear-gradient(135deg, #071A33 0%, #1E1B4B 100%)', padding: '24px', color: '#FFF', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E4AC4C', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <Sparkles size={14} /> AI Portfolio Analysis Engine (v3.2)
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '6px 0 2px 0', fontFamily: 'Playfair Display, serif' }}>
                Comparative Investment Verdict
              </h3>
              <p style={{ fontSize: '12px', color: '#CBD5E1', margin: 0 }}>
                Evaluated against RBI FEMA repatriation caps, infrastructure growth corridors, and rental yield stability.
              </p>
              <button onClick={closeAiCompareModal} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              {/* Winner Card */}
              <div style={{ border: '2px solid #C58A2A', borderRadius: '12px', padding: '16px', background: '#FFFDF9', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ background: '#C58A2A', color: '#FFF', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                    HIGHEST COMPOSITE SCORE (9.4 / 10)
                  </span>
                  <span style={{ fontSize: '12px', color: '#059669', fontWeight: 700 }}>+16.8% Projected 5-Yr IRR</span>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#071A33', margin: '0 0 4px 0' }}>
                  Luxury Villa Greens — Bangalore
                </h4>
                <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  <strong>Key Advantage:</strong> Freehold title in high-growth North Bangalore airport corridor. Superior capital appreciation potential (+16.8%) outweighs the slightly higher ticket price. Full repatriability compliance under NRE accounts.
                </p>
              </div>

              {/* Runners Up Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px', background: '#F8FAFC' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Best for Immediate Cash Flow</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', marginTop: '2px' }}>Skyline Heights</div>
                  <div style={{ fontSize: '12px', color: '#059669', fontWeight: 600, marginTop: '4px' }}>3.8% Gross Rental Yield</div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Corporate tenant demand in Hitech City corridor.</div>
                </div>

                <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px', background: '#F8FAFC' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Best Value Entry</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', marginTop: '2px' }}>Oceanview Residences</div>
                  <div style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600, marginTop: '4px' }}>Ready Possession</div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Prime coastal infrastructure connection.</div>
                </div>
              </div>

              <button onClick={closeAiCompareModal} className="btn btn-navy" style={{ width: '100%', padding: '12px' }}>
                Apply AI Insights to Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. RAISE MAINTENANCE REQUEST MODAL */}
      {/* ========================================================= */}
      {maintenanceModal.isOpen && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(7, 26, 51, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '520px', width: '100%', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ background: '#071A33', padding: '20px 24px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#C58A2A', textTransform: 'uppercase' }}>Asset Care & Maintenance</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0', fontFamily: 'Playfair Display, serif' }}>Raise Maintenance Request</h3>
              </div>
              <button onClick={closeMaintenanceModal} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleMaintSubmit} style={{ padding: '24px' }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Target Property *</label>
                <select 
                  value={maintProp}
                  onChange={(e) => setMaintProp(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                >
                  <option>Luxury Villa Greens — Bangalore</option>
                  <option>Skyline Heights — Hyderabad</option>
                  <option>Green Acres Plots — Pune</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Service / Task Title *</label>
                  <input 
                    type="text" 
                    value={maintTitle}
                    onChange={(e) => setMaintTitle(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Priority *</label>
                  <select 
                    value={maintPriority}
                    onChange={(e) => setMaintPriority(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  >
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent (24h)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Description of Work</label>
                <textarea 
                  rows="3"
                  value={maintDesc}
                  onChange={(e) => setMaintDesc(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={closeMaintenanceModal} className="btn btn-outline" style={{ flex: 1, padding: '10px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" style={{ flex: 2, padding: '10px' }}>
                  Assign Partner & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. BOOK CONCIERGE SERVICE MODAL */}
      {/* ========================================================= */}
      {serviceModal.isOpen && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(7, 26, 51, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '520px', width: '100%', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ background: '#071A33', padding: '20px 24px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#C58A2A', textTransform: 'uppercase' }}>NRI Specialized Service</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0', fontFamily: 'Playfair Display, serif' }}>Book {serviceModal.serviceName}</h3>
              </div>
              <button onClick={closeServiceModal} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleServiceSubmit} style={{ padding: '24px' }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Requested Service</label>
                <input 
                  type="text" 
                  value={serviceModal.serviceName} 
                  disabled 
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', background: '#F1F5F9', fontWeight: 600 }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Preferred Execution Date</label>
                <input 
                  type="date" 
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Notes & Target Document or Property</label>
                <textarea 
                  rows="3"
                  value={serviceNotes}
                  onChange={(e) => setServiceNotes(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={closeServiceModal} className="btn btn-outline" style={{ flex: 1, padding: '10px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" style={{ flex: 2, padding: '10px' }}>
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. DOCUMENT PROCUREMENT REQUEST MODAL */}
      {/* ========================================================= */}
      {docRequestModal.isOpen && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(7, 26, 51, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '520px', width: '100%', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ background: '#071A33', padding: '20px 24px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#C58A2A', textTransform: 'uppercase' }}>Government & Bank Records</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0', fontFamily: 'Playfair Display, serif' }}>Request Document Procurement</h3>
              </div>
              <button onClick={closeDocRequestModal} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleDocReqSubmit} style={{ padding: '24px' }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Document Type *</label>
                <select 
                  value={docReqName}
                  onChange={(e) => setDocReqName(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                >
                  <option>Encumbrance Certificate (Last 30 Years)</option>
                  <option>Certified Title Deed from Sub-Registrar</option>
                  <option>Municipal Property Tax Mutation Certificate</option>
                  <option>Form 15CA & 15CB (Repatriation Certificate)</option>
                  <option>Registered Power of Attorney (POA)</option>
                  <option>Khata Certificate & Extract</option>
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Target Property</label>
                <select 
                  value={docReqProp}
                  onChange={(e) => setDocReqProp(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                >
                  <option>Skyline Heights — Hyderabad</option>
                  <option>Luxury Villa Greens — Bangalore</option>
                  <option>Green Acres Plots — Pune</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={closeDocRequestModal} className="btn btn-outline" style={{ flex: 1, padding: '10px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" style={{ flex: 2, padding: '10px' }}>
                  Submit Procurement Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
