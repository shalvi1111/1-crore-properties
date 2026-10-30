import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building2, MapPin, Upload, CheckCircle2, ChevronRight, 
  ArrowLeft, ShieldCheck, DollarSign, Image as ImageIcon, 
  Sparkles, Video, Eye, Compass, Camera, Phone, User, Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AddNewPropertyPage() {
  const navigate = useNavigate();
  const { addProperty, showToast } = useApp();

  const [activeMediaTab, setActiveMediaTab] = useState('photos');
  const [formData, setFormData] = useState({
    title: 'Spacious 3 BHK Luxury Villa in Whitefield',
    type: 'Villa',
    config: '3 BHK',
    listingFor: 'Sale',
    project: 'Prestige Lakeside Habitat',
    rera: 'PRM/KA/RERA/1251/308/PR/171015/000456',
    possession: 'Ready to Move',
    furnishing: 'Semi-Furnished',
    address1: 'Villa No. 42, Palm Meadows Boulevard',
    address2: 'Phase 2, Varthur Main Road',
    landmark: 'Near Forum Shantiniketan Mall',
    city: 'Bangalore',
    locality: 'Whitefield',
    pincode: '560066',
    geoPin: '12.9698° N, 77.7499° E',
    price: '1.85',
    priceInWords: 'One Crore Eighty Five Lakhs Only',
    negotiable: 'Yes',
    contactName: 'Rahul Sharma',
    contactMobile: '9876543210',
    contactEmail: 'rahul.sharma@example.com',
    contactAltMobile: '9123456780',
    contactTime: 'Evening (4 PM - 8 PM)',
    contactRole: 'Property Owner',
    age: '0-1 Years',
    totalFloors: '2',
    floorNumber: 'Ground + 1',
    totalUnits: '48',
    approvedBy: 'BBMP / BDA',
    facing: 'East',
    parking: '2 Covered Cars',
    maintenance: '4500',
    declared: true
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
    if (!formData.declared) {
      showToast("Please agree to the declaration checkbox before submitting.");
      return;
    }

    const priceNum = parseFloat(formData.price) || 1.85;
    const newProperty = {
      id: `CP${Math.floor(10000 + Math.random() * 90000)}`,
      code: `CP${Math.floor(10000 + Math.random() * 90000)}`,
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type: formData.type,
      category: formData.type.toLowerCase().includes('villa') ? 'villas' : 'apartments',
      tag: 'VERIFIED SELLER',
      price: priceNum,
      priceStr: `₹${priceNum} Cr`,
      rawPrice: Math.round(priceNum * 10000000),
      pricePerSqFt: '₹7,850/sq.ft',
      location: `${formData.locality}, ${formData.city}`,
      city: formData.city,
      locality: formData.locality,
      bhk: formData.config,
      beds: 3,
      baths: 3,
      area: 2850,
      facing: formData.facing,
      possession: formData.possession,
      furnishing: formData.furnishing,
      reraId: formData.rera,
      reraApproved: true,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Superbly appointed verified property with high-end fixtures and clear legal titles.'
    };

    addProperty(newProperty);
    showToast("Property listing successfully submitted for verification!");
    navigate('/buyer/property-dashboard');
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '24px 32px 60px 32px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Title Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#071A33', margin: '0 0 4px 0' }}>
            Add New Property
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            Fill in the details below to list your property. All fields marked * are mandatory.
          </p>
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
            { step: '2', title: 'Media & Visuals', desc: 'Photos, Videos & Views', active: false },
            { step: '3', title: 'Location & Pricing', desc: 'Location & Price Details', active: false },
            { step: '4', title: 'Contact & Review', desc: 'Point of Contact & Submit', active: false }
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

        {/* Main 2-Column Form Layout */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
          {/* Left Column (Sections 1, 2, 3) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1. Basic Details */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#5B21B6', margin: '0 0 16px 0' }}>
                1. Basic Details
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px' }}>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Property Title *</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title} 
                    onChange={handleChange}
                    placeholder="e.g. Spacious 3 BHK Apartment in Whitefield" 
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Property Type *</label>
                  <select 
                    name="type"
                    value={formData.type} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Configuration *</label>
                  <select 
                    name="config"
                    value={formData.config} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  >
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                    <option value="5 BHK">5 BHK</option>
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
                  <input 
                    type="text" 
                    name="project"
                    value={formData.project} 
                    onChange={handleChange}
                    placeholder="Enter project or society name" 
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>RERA Number (If Applicable)</label>
                  <input 
                    type="text" 
                    name="rera"
                    value={formData.rera} 
                    onChange={handleChange}
                    placeholder="Enter RERA number" 
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Possession Status *</label>
                  <select 
                    name="possession"
                    value={formData.possession} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  >
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="New Launch">New Launch</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Furnishing *</label>
                  <select 
                    name="furnishing"
                    value={formData.furnishing} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  >
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Media & Visuals */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#5B21B6', margin: 0 }}>
                  2. Media & Visuals
                </h3>
                <span style={{ fontSize: '11px', color: '#64748B' }}>High quality visuals get more views and faster enquiries.</span>
              </div>

              {/* Media Tabs */}
              <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px', marginBottom: '16px', overflowX: 'auto' }}>
                {[
                  { id: 'photos', label: 'Photos', icon: ImageIcon },
                  { id: 'walkthrough', label: 'Walkthrough Video', icon: Video },
                  { id: '360', label: '360° Video', icon: Eye },
                  { id: 'balcony', label: 'Balcony Views', icon: Compass },
                  { id: 'drone', label: 'Drone View', icon: Camera },
                  { id: 'bird', label: 'Birds Eye View', icon: Eye }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveMediaTab(t.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: activeMediaTab === t.id ? '#EDE9FE' : 'transparent',
                      color: activeMediaTab === t.id ? '#5B21B6' : '#64748B',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <t.icon size={13} />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Upload Box */}
              <div style={{
                border: '2px dashed #CBD5E1',
                borderRadius: '8px',
                padding: '24px',
                textAlign: 'center',
                background: '#F8FAFC',
                marginBottom: '16px',
                cursor: 'pointer'
              }}
              onClick={() => showToast("File selector opened (Max 20 photos allowed)")}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
                  <Upload size={20} color="#5B21B6" />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#5B21B6' }}>Click to upload <span style={{ color: '#475569' }}>or drag and drop</span></div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>You can upload up to 20 images (JPG/PNG, Max 10MB each)</div>
              </div>

              {/* Suggested Photos Grid */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Suggested Photos</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
                  {[
                    { label: 'Living Room', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80' },
                    { label: 'Bedroom', img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=200&q=80' },
                    { label: 'Kitchen', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80' },
                    { label: 'Bathroom', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80' },
                    { label: 'Building Exterior', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80' },
                    { label: 'Amenities', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=200&q=80' }
                  ].map((p, idx) => (
                    <div key={idx} style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                      <img src={p.img} alt={p.label} style={{ width: '100%', height: '55px', objectFit: 'cover' }} />
                      <div style={{ fontSize: '10px', color: '#64748B', padding: '3px' }}>{p.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Boxes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ border: '1px dashed #CBD5E1', borderRadius: '6px', padding: '12px', textAlign: 'center', background: '#FAFAFA' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>Walkthrough Video *</div>
                  <div style={{ fontSize: '10px', color: '#94A3B8', margin: '2px 0 8px 0' }}>Upload a video demonstrating property</div>
                  <button type="button" onClick={() => showToast("Upload walkthrough video")} style={{ padding: '4px 10px', background: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>
                    Upload Video (Max 200MB)
                  </button>
                </div>

                <div style={{ border: '1px dashed #CBD5E1', borderRadius: '6px', padding: '12px', textAlign: 'center', background: '#FAFAFA' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>360° Video (If Available)</div>
                  <div style={{ fontSize: '10px', color: '#94A3B8', margin: '2px 0 8px 0' }}>Upload 360 degree video</div>
                  <button type="button" onClick={() => showToast("Upload 360 video")} style={{ padding: '4px 10px', background: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>
                    Upload 360° Video
                  </button>
                </div>

                <div style={{ border: '1px dashed #CBD5E1', borderRadius: '6px', padding: '12px', textAlign: 'center', background: '#FAFAFA' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>Drone View Video (If Available)</div>
                  <div style={{ fontSize: '10px', color: '#94A3B8', margin: '2px 0 8px 0' }}>Aerial/drone video showing property</div>
                  <button type="button" onClick={() => showToast("Upload drone video")} style={{ padding: '4px 10px', background: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>
                    Upload Drone Video
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Location & Pricing */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#5B21B6', margin: '0 0 16px 0' }}>
                3. Location & Pricing
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', fontSize: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Address Line 1 *</label>
                  <input type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="Enter address line 1" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Address Line 2</label>
                  <input type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Enter address line 2" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
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

              {/* Map Graphic Preview */}
              <div style={{ height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #CBD5E1', marginBottom: '16px', position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80" alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#5B21B6', color: '#FFF', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} /> Whitefield, Bangalore
                </div>
              </div>

              {/* Price Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', fontSize: '12px' }}>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Price (₹ in Cr) *</label>
                  <input type="text" name="price" value={formData.price} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: 700 }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Price (In Words)</label>
                  <input type="text" name="priceInWords" value={formData.priceInWords} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Price Negotiable? *</label>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', height: '38px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input type="radio" name="negotiable" value="Yes" checked={formData.negotiable === 'Yes'} onChange={handleChange} />
                      <span>Yes</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input type="radio" name="negotiable" value="No" checked={formData.negotiable === 'No'} onChange={handleChange} />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sections 4, 5, 6) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 4. Point of Contact */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#5B21B6', margin: '0 0 16px 0' }}>
                4. Point of Contact at Property
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px' }}>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Contact Person Name *</label>
                  <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} placeholder="Enter contact person name" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Mobile Number *</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ padding: '10px 12px', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#475569' }}>+91</span>
                    <input type="text" name="contactMobile" value={formData.contactMobile} onChange={handleChange} placeholder="Enter mobile number" style={{ flex: 1, padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Email ID</label>
                  <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} placeholder="Enter email ID" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Alternate Number</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ padding: '10px 12px', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#475569' }}>+91</span>
                    <input type="text" name="contactAltMobile" value={formData.contactAltMobile} onChange={handleChange} placeholder="Enter alternate number" style={{ flex: 1, padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Best Time to Contact</label>
                  <input type="text" name="contactTime" value={formData.contactTime} onChange={handleChange} placeholder="e.g. Evening (4 PM - 8 PM)" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Role / Designation</label>
                  <input type="text" name="contactRole" value={formData.contactRole} onChange={handleChange} placeholder="e.g. Property Manager / Owner / Sales Head" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
              </div>
            </div>

            {/* 5. Additional Details */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#5B21B6', margin: '0 0 16px 0' }}>
                5. Additional Details
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '12px' }}>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Property Age</label>
                  <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="e.g. 0-1 Years" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Total Floors</label>
                  <input type="text" name="totalFloors" value={formData.totalFloors} onChange={handleChange} placeholder="e.g. 14" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Floor Number</label>
                  <input type="text" name="floorNumber" value={formData.floorNumber} onChange={handleChange} placeholder="e.g. 6" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Total Units</label>
                  <input type="text" name="totalUnits" value={formData.totalUnits} onChange={handleChange} placeholder="e.g. 120" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Approved By</label>
                  <input type="text" name="approvedBy" value={formData.approvedBy} onChange={handleChange} placeholder="e.g. BBMP" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Facing</label>
                  <input type="text" name="facing" value={formData.facing} onChange={handleChange} placeholder="Select Facing" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Parking</label>
                  <input type="text" name="parking" value={formData.parking} onChange={handleChange} placeholder="Select Parking" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>Maintenance (Monthly)</label>
                  <input type="text" name="maintenance" value={formData.maintenance} onChange={handleChange} placeholder="₹ 0.00" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                </div>
              </div>
            </div>

            {/* 6. Review & Submit */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#5B21B6', margin: '0 0 16px 0' }}>
                6. Review & Submit
              </h3>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px', color: '#334155', marginBottom: '20px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  name="declared"
                  checked={formData.declared} 
                  onChange={handleChange}
                  style={{ marginTop: '2px' }}
                />
                <span>I hereby declare that all the details provided are true and correct to the best of my knowledge.</span>
              </label>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => showToast("Draft saved")}
                  style={{
                    flex: 1,
                    padding: '12px 0',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    color: '#475569',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Save as Draft
                </button>

                <button 
                  type="submit" 
                  style={{
                    flex: 1.5,
                    padding: '12px 0',
                    border: 'none',
                    borderRadius: '8px',
                    background: '#5B21B6',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Submit Property
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
