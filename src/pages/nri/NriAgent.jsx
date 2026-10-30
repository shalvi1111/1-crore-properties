import React, { useState } from 'react';
import { 
  UserCheck, Phone, MessageSquare, Video, Calendar, 
  Clock, Globe, Star, ShieldCheck, CheckCircle2, Award 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function NriAgent() {
  const { showToast } = useApp();

  const [timezone, setTimezone] = useState('GST (Dubai)');
  const [selectedSlot, setSelectedSlot] = useState('04:00 PM');
  const [callTopic, setCallTopic] = useState('Legal Review of Skyline Heights Agreement');
  const [scheduledSuccess, setScheduledSuccess] = useState(false);

  const availableSlots = [
    '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '06:30 PM', '08:00 PM'
  ];

  const handleScheduleCall = (e) => {
    e.preventDefault();
    setScheduledSuccess(true);
    showToast(`Video conference scheduled with Anita Verma for ${selectedSlot} (${timezone})!`);
  };

  return (
    <div className="nri-agent-page" style={{ padding: '24px 0 60px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#C58A2A', letterSpacing: '0.5px' }}>
            PRIVATE CLIENT ADVISORY
          </span>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#071A33', margin: '4px 0 0 0', fontFamily: 'Playfair Display, serif' }}>
            Dedicated NRI Relationship Officer
          </h1>
        </div>

        {/* 2-Column: Agent Profile on Left + Calendar Consultation on Right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px' }}>
          {/* Agent Profile Card */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '24px' }}>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" 
                alt="Anita Verma" 
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #C58A2A', marginBottom: '14px' }}
              />
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#071A33', margin: '0 0 4px 0' }}>Anita Verma</h2>
              <div style={{ fontSize: '13px', color: '#C58A2A', fontWeight: 700 }}>Senior NRI Portfolio Advisor (Tier-1 Specialist)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '12px', color: '#64748B' }}>
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <strong style={{ color: '#071A33' }}>4.95 / 5.0</strong> (240+ NRI Investors Advised)
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', marginBottom: '24px', fontSize: '13px', lineHeight: 1.6, color: '#334155' }}>
              "I specialize in assisting overseas Indians in the US, UAE, UK, and Singapore navigate legal title due diligence, NRE/NRO banking compliances, and virtual site inspections without requiring you to fly down."
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#059669" />
                <span>Authorized Indian High Commission Notary Liaison</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#059669" />
                <span>Direct Access to DLF & Prestige Promoters</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#059669" />
                <span>Multilingual: English, Hindi, Telugu, Tamil</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-outline" 
                style={{ padding: '12px', color: '#059669', borderColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px' }}
              >
                <MessageSquare size={16} /> WhatsApp Direct
              </a>
              <a 
                href="tel:+919876543210" 
                className="btn btn-navy" 
                style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px' }}
              >
                <Phone size={16} /> Call Desk
              </a>
            </div>
          </div>

          {/* Schedule Video Consultation Card */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Video size={20} color="#C58A2A" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#071A33', margin: 0 }}>
                Schedule Private 1-on-1 Video Consultation
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 24px 0' }}>
              Complimentary 30-minute encrypted Zoom/Google Meet video session with screen-sharing.
            </p>

            {scheduledSuccess ? (
              <div style={{ background: '#ECFDF5', border: '1px solid #10B981', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                <CheckCircle2 size={40} color="#10B981" style={{ margin: '0 auto 12px auto' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#065F46', margin: '0 0 6px 0' }}>Appointment Confirmed!</h4>
                <p style={{ fontSize: '13px', color: '#047857', margin: '0 0 16px 0' }}>
                  Calendar invite and Zoom link sent to your email with topic: "{callTopic}".
                </p>
                <button onClick={() => setScheduledSuccess(false)} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px' }}>
                  Schedule Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleScheduleCall}>
                {/* Timezone Switcher */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Your Resident Timezone</label>
                  <select 
                    value={timezone} 
                    onChange={(e) => setTimezone(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  >
                    <option value="GST (Dubai / UAE)">GST (Dubai / UAE) - GMT+4</option>
                    <option value="EST (New York / US)">EST (New York / US) - GMT-5</option>
                    <option value="PST (San Francisco / US)">PST (San Francisco / US) - GMT-8</option>
                    <option value="BST (London / UK)">BST (London / UK) - GMT+1</option>
                    <option value="SGT (Singapore)">SGT (Singapore) - GMT+8</option>
                    <option value="IST (India Standard)">IST (India Standard) - GMT+5:30</option>
                  </select>
                </div>

                {/* Consultation Topic */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Consultation Topic</label>
                  <select 
                    value={callTopic} 
                    onChange={(e) => setCallTopic(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  >
                    <option value="Legal Review of Skyline Heights Agreement">Legal Review of Skyline Heights Agreement</option>
                    <option value="NRE/NRO Bank Wire & Tax Planning">NRE/NRO Bank Wire & Tax Planning</option>
                    <option value="Virtual Walkthrough of Luxury Villa Greens">Virtual Walkthrough of Luxury Villa Greens</option>
                    <option value="Open Plot HMDA Approval Due Diligence">Open Plot HMDA Approval Due Diligence</option>
                  </select>
                </div>

                {/* Time Slot Selector */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Available Slots for Tomorrow</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {availableSlots.map(slot => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          border: selectedSlot === slot ? '2px solid #C58A2A' : '1px solid #CBD5E1',
                          background: selectedSlot === slot ? '#FEF3C7' : '#FFFFFF',
                          color: selectedSlot === slot ? '#071A33' : '#64748B',
                          fontWeight: selectedSlot === slot ? 700 : 500,
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-gold" 
                  style={{ width: '100%', padding: '14px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Calendar size={16} /> Confirm Video Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
