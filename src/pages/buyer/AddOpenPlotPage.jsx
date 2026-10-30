import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building2, MapPin, CheckCircle2, ChevronRight, 
  ArrowLeft, ShieldCheck, DollarSign, Image as ImageIcon, 
  Sparkles, Video, Eye, Compass, Camera, Phone, User, Check,
  Square, RectangleHorizontal, HelpCircle, MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AddOpenPlotPage() {
  const navigate = useNavigate();
  const { addProperty, showToast } = useApp();

  const [plotShape, setPlotShape] = useState('Rectangle');
  const [formData, setFormData] = useState({
    propertyType: 'Open Plot',
    plotType: 'Residential Plot',
    listingFor: 'Sale',
    project: 'Green Acres Layout',
    plotTitle: 'Green Acres Open Plot',
    rera: 'PRM/KA/RERA/1251/308/PR/171015/000988',
    possession: 'Ready for Possession',
    ownership: 'Freehold',
    plotArea: '1200',
    areaUnit: 'Sq. Ft.',
    dimensions: '40 x 30',
    facing: 'East',
    roadWidth: '40 Feet Road',
    address1: 'Plot No. 18, Green Meadows Extension',
    address2: 'Near Varthur Lake',
    landmark: 'Behind Forum Value Mall',
    city: 'Bangalore',
    locality: 'Whitefield',
    pincode: '560066',
    geoPin: "12° 58' 07.1\" N, 77° 43' 19.2\" E",
    plusCode: '7J9P+Q8 Bangalore, Karnataka',
    price: '7200000',
    pricePerSqft: '6000'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlot = {
      id: `PL${Math.floor(10000 + Math.random() * 90000)}`,
      code: `PL${Math.floor(10000 + Math.random() * 90000)}`,
      title: formData.plotTitle,
      slug: formData.plotTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type: 'Open Plot',
      category: 'plots',
      tag: 'VERIFIED PLOT',
      price: 0.72,
      priceStr: '₹72.00 L',
      rawPrice: 7200000,
      pricePerSqFt: '₹6,000/sq.ft',
      location: `${formData.locality}, ${formData.city}`,
      city: formData.city,
      locality: formData.locality,
      bhk: 'Residential Plot',
      area: Number(formData.plotArea),
      facing: formData.facing,
      possession: formData.possession,
      reraId: formData.rera,
      reraApproved: true,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      description: `Premium freehold residential plot in Whitefield measuring ${formData.plotArea} sq.ft with 40 ft road width and clear title.`
    };

    addProperty(newPlot);
    showToast("Open Plot successfully listed and verified!");
    navigate('/properties');
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '24px 32px 60px 32px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Title & Save Draft Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#071A33', margin: '0 0 4px 0' }}>
              Add New Property – Open Plot
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
              Fill in the details below to list your open plot. All fields marked * are mandatory.
            </p>
          </div>

          <button 
            type="button" 
            onClick={() => showToast("Draft saved successfully")}
            style={{
              padding: '8px 16px',
              border: '1px solid #5B21B6',
              borderRadius: '6px',
              background: '#FFFFFF',
              color: '#5B21B6',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Save as Draft</span>
          </button>
        </div>

        {/* 4-Step Stepper Header */}
        <div style={{ 
          background: '#FFFFFF', 
          borderRadius: '12px', 
          border: '1px solid #E2E8F0', 
          padding: '16px 32px', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { step: '1', title: 'Basic Details', desc: 'Property Information', active: true },
            { step: '2', title: 'Location & Pricing', desc: 'Location & Price Details', active: false },
            { step: '3', title: 'Media & Documents', desc: 'Photos, Videos & Documents', active: false },
            { step: '4', title: 'Contact & Review', desc: 'Review & Submit', active: false }
          ].map((st, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: st.active ? '#5B21B6' : '#F1F5F9', 
                color: st.active ? '#FFFFFF' : '#64748B', 
                fontWeight: 700, 
                fontSize: '13px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {st.step}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: st.active ? '#5B21B6' : '#1E293B' }}>{st.title}</div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>{st.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main 2-Column Layout */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '24px' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1. Basic Details */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#5B21B6', margin: '0 0 16px 0' }}>
                1. Basic Details
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px' }}>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Property Type *</label>
                  <select name="propertyType" value={formData.propertyType} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}>
                    <option value="Open Plot">Open Plot</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Plot Type *</label>
                  <select name="plotType" value={formData.plotType} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}>
                    <option value="Residential Plot">Residential Plot</option>
                    <option value="Commercial Plot">Commercial Plot</option>
                    <option value="Agricultural / Farm Land">Agricultural / Farm Land</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Listing For *</label>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '38px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input type="radio" name="listingFor" value="Sale" checked={formData.listingFor === 'Sale'} onChange={handleChange} />
                      <span>Sale</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input type="radio" name="listingFor" value="Resale" checked={formData.listingFor === 'Resale'} onChange={handleChange} />
                      <span>Resale</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Project / Society Name</label>
                  <input type="text" name="project" value={formData.project} onChange={handleChange} placeholder="Enter project or society name (optional)" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Plot Name / Title *</label>
                  <input type="text" name="plotTitle" value={formData.plotTitle} onChange={handleChange} placeholder="e.g. Green Acres Open Plot" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>RERA Number (If Applicable)</label>
                  <input type="text" name="rera" value={formData.rera} onChange={handleChange} placeholder="Enter RERA number" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Possession Status *</label>
                  <select name="possession" value={formData.possession} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}>
                    <option value="Ready for Possession">Ready for Possession</option>
                    <option value="Under Development">Under Development</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Ownership *</label>
                  <select name="ownership" value={formData.ownership} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}>
                    <option value="Freehold">Freehold</option>
                    <option value="Leasehold">Leasehold</option>
                    <option value="Co-operative Society">Co-operative Society</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Plot Details */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#5B21B6', margin: '0 0 16px 0' }}>
                2. Plot Details
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', fontSize: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Total Plot Area *</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input type="text" name="plotArea" value={formData.plotArea} onChange={handleChange} placeholder="e.g. 1200" style={{ flex: 1, padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                    <select name="areaUnit" value={formData.areaUnit} onChange={handleChange} style={{ width: '80px', padding: '10px 6px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '11px' }}>
                      <option value="Sq. Ft.">Sq. Ft.</option>
                      <option value="Sq. Yds.">Sq. Yds.</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Plot Dimensions (L x B)</label>
                  <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="e.g. 40 x 30" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Facing</label>
                  <select name="facing" value={formData.facing} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}>
                    <option value="East">East</option>
                    <option value="North">North</option>
                    <option value="North-East">North-East</option>
                    <option value="West">West</option>
                    <option value="South">South</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Road Width</label>
                  <select name="roadWidth" value={formData.roadWidth} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}>
                    <option value="30 Feet Road">30 Feet Road</option>
                    <option value="40 Feet Road">40 Feet Road</option>
                    <option value="60 Feet Road">60 Feet Road</option>
                    <option value="100 Feet Road">100 Feet Road</option>
                  </select>
                </div>
              </div>

              {/* Plot Shape Selector */}
              <div>
                <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '8px', fontSize: '12px' }}>Plot Shape</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                  {[
                    { id: 'Rectangle', label: 'Rectangle', icon: '▭' },
                    { id: 'Square', label: 'Square', icon: '◻' },
                    { id: 'L-Shape', label: 'L-Shape', icon: '⌐' },
                    { id: 'Irregular', label: 'Irregular', icon: '☁' },
                    { id: 'Other', label: 'Other', icon: '⋯' }
                  ].map(shape => {
                    const isSelected = plotShape === shape.id;
                    return (
                      <button
                        key={shape.id}
                        type="button"
                        onClick={() => setPlotShape(shape.id)}
                        style={{
                          padding: '12px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #5B21B6' : '1px solid #E2E8F0',
                          background: isSelected ? '#F5F3FF' : '#FFFFFF',
                          color: isSelected ? '#5B21B6' : '#64748B',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ fontSize: '18px' }}>{shape.icon}</span>
                        <span style={{ fontSize: '11px', fontWeight: 600 }}>{shape.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Location */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#5B21B6', margin: '0 0 16px 0' }}>
                3. Location
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', fontSize: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Address Line 1 *</label>
                  <input type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="Enter address line 1" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Address Line 2</label>
                  <input type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Enter address line 2 (optional)" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Landmark</label>
                  <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Enter landmark" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Locality *</label>
                  <input type="text" name="locality" value={formData.locality} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Pincode *</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
              </div>

              {/* Map Preview & Geo Pin */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #CBD5E1', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#FFF', borderRadius: '4px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column' }}>
                    <button type="button" style={{ padding: '4px 8px', border: 'none', background: '#FFF', cursor: 'pointer' }}>+</button>
                    <button type="button" style={{ padding: '4px 8px', borderTop: '1px solid #E2E8F0', background: '#FFF', cursor: 'pointer' }}>-</button>
                  </div>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#5B21B6', color: '#FFF', padding: '4px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                    📍 Whitefield
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '4px' }}>Geo Pin Location *</label>
                    <input type="text" name="geoPin" value={formData.geoPin} onChange={handleChange} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '11px' }} />
                    <span onClick={() => showToast("GPS Coordinates detected")} style={{ fontSize: '10px', color: '#5B21B6', fontWeight: 600, cursor: 'pointer' }}>Use Current Location</span>
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '4px' }}>Google Plus Code (Optional)</label>
                    <input type="text" name="plusCode" value={formData.plusCode} onChange={handleChange} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '11px' }} />
                    <span style={{ fontSize: '10px', color: '#94A3B8' }}>Helps buyers locate the exact property.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                <button 
                  type="button" 
                  onClick={() => navigate('/properties')}
                  style={{
                    padding: '10px 24px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    background: '#FFFFFF',
                    color: '#475569',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button 
                  type="submit" 
                  style={{
                    padding: '10px 28px',
                    border: 'none',
                    borderRadius: '6px',
                    background: '#5B21B6',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Save & Continue</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Open Plot Preview, What Buyers See, Help */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Open Plot Preview */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#071A33', margin: '0 0 14px 0' }}>
                Open Plot Preview
              </h3>

              {/* Graphic Banner */}
              <div style={{ 
                height: '140px', 
                borderRadius: '8px', 
                background: 'linear-gradient(135deg, #DDD6FE 0%, #C4B5FD 100%)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                marginBottom: '16px',
                overflow: 'hidden'
              }}>
                <div style={{ background: '#5B21B6', color: '#FFF', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 800, letterSpacing: '0.5px', boxShadow: '0 4px 10px rgba(91, 33, 182, 0.3)' }}>
                  PLOT FOR SALE
                </div>
              </div>

              {/* Details List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '14px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Plot Name</span>
                  <strong style={{ color: '#071A33' }}>{formData.plotTitle}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Location</span>
                  <strong style={{ color: '#071A33' }}>{formData.locality}, {formData.city} – {formData.pincode}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Plot Area</span>
                  <strong style={{ color: '#071A33' }}>{formData.plotArea} {formData.areaUnit}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Facing</span>
                  <strong style={{ color: '#071A33' }}>{formData.facing}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ color: '#64748B' }}>Price</span>
                  <div>
                    <strong style={{ fontSize: '15px', color: '#071A33' }}>₹ 72,00,000</strong>
                    <span style={{ fontSize: '10px', background: '#EDE9FE', color: '#5B21B6', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px', fontWeight: 600 }}>
                      ₹ 6,000 / Sq. Ft.
                    </span>
                  </div>
                </div>
              </div>

              {/* What Buyers Will See */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#071A33', marginBottom: '10px' }}>What Buyers Will See</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} color="#059669" />
                    <span>Clear plot details & dimensions</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} color="#059669" />
                    <span>Exact location on map</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} color="#059669" />
                    <span>Photos, videos & documents</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} color="#059669" />
                    <span>Your contact details</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help? Card */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Phone size={16} color="#5B21B6" />
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', margin: 0 }}>Need Help?</h4>
              </div>
              <p style={{ fontSize: '11px', color: '#64748B', margin: '0 0 14px 0' }}>Our support team is here to assist you.</p>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  type="button" 
                  onClick={() => showToast("Opening WhatsApp")}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    background: '#059669',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Chat on WhatsApp
                </button>
                <button 
                  type="button" 
                  onClick={() => showToast("Callback scheduled")}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    background: '#FFF',
                    color: '#5B21B6',
                    border: '1px solid #5B21B6',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Request a Callback
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Bottom Trust Strip */}
        <div style={{ 
          marginTop: '32px',
          background: '#FFFFFF', 
          borderRadius: '12px',
          border: '1px solid #E2E8F0', 
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {[
            { title: 'Maximum Visibility', desc: 'Reach 1000+ active buyers' },
            { title: 'Verified Platform', desc: '100% verified buyers & leads' },
            { title: 'Fast Enquiries', desc: 'Get genuine enquiries quickly' },
            { title: 'Secure & Trusted', desc: 'Safe and secure transactions' }
          ].map((t, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={16} color="#5B21B6" />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#071A33' }}>{t.title}</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
