import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, Search, Upload, Download, MoreHorizontal, ShieldCheck, 
  Trash2, Share2, CheckSquare, Plus, Lock, ArrowRight, Phone, MessageSquare,
  AlertCircle, FileCheck, CheckCircle2, ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useApp } from '../../context/AppContext';

export default function NriDocuments() {
  const { showToast, downloadDocument, openDocRequestModal, openVisitModal } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchVal, setSearchVal] = useState('');
  const fileInputRef = useRef(null);

  const storageData = [
    { name: 'Property Docs', value: 45, color: '#D97706' },
    { name: 'Personal Docs', value: 20, color: '#2563EB' },
    { name: 'Financial Docs', value: 15, color: '#059669' },
    { name: 'Others', value: 20, color: '#7C3AED' }
  ];

  const initialDocs = [
    {
      name: 'Sale Agreement.pdf',
      type: 'PDF',
      typeBg: '#EF4444',
      category: 'Property Documents',
      catBg: '#FEF3C7',
      catColor: '#D97706',
      purpose: 'Skyline Heights',
      date: '28 May 2024',
      size: '2.4 MB'
    },
    {
      name: 'Power of Attorney.docx',
      type: 'DOC',
      typeBg: '#2563EB',
      category: 'Legal Documents',
      catBg: '#EFF6FF',
      catColor: '#2563EB',
      purpose: 'General',
      date: '25 May 2024',
      size: '1.1 MB'
    },
    {
      name: 'Rental Income Statement.xlsx',
      type: 'XLS',
      typeBg: '#059669',
      category: 'Financial Documents',
      catBg: '#ECFDF5',
      catColor: '#059669',
      purpose: 'FY 2023-24',
      date: '22 May 2024',
      size: '850 KB'
    },
    {
      name: 'Passport – Rahul Sharma.pdf',
      type: 'PDF',
      typeBg: '#EF4444',
      category: 'Personal Documents',
      catBg: '#F3E8FF',
      catColor: '#7C3AED',
      purpose: 'KYC',
      date: '20 May 2024',
      size: '1.2 MB'
    },
    {
      name: 'Property Tax Receipt.jpg',
      type: 'JPG',
      typeBg: '#D97706',
      category: 'Tax Documents',
      catBg: '#FEF3C7',
      catColor: '#D97706',
      purpose: 'Green Acres Plots',
      date: '18 May 2024',
      size: '720 KB'
    }
  ];

  const [docsList, setDocsList] = useState(initialDocs);

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const ext = file.name.split('.').pop().toUpperCase();
    const newDoc = {
      name: file.name,
      type: ext.length <= 4 ? ext : 'DOC',
      typeBg: '#2563EB',
      category: 'Property Documents',
      catBg: '#EFF6FF',
      catColor: '#2563EB',
      purpose: 'Self-Uploaded Vault',
      date: 'Just now',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    };

    setDocsList(prev => [newDoc, ...prev]);
    showToast(`"${file.name}" uploaded successfully to your encrypted NRI vault!`);
    e.target.value = '';
  };

  const categories = [
    { title: 'Property Documents', count: '18 Documents', desc: 'Sale deeds, agreements, approvals, possession letters etc.' },
    { title: 'Personal Documents', count: '10 Documents', desc: 'Passport, ID proofs, address proofs and other personal docs.' },
    { title: 'Financial Documents', count: '8 Documents', desc: 'Bank statements, income proofs, investments, loan docs.' },
    { title: 'Legal Documents', count: '7 Documents', desc: 'POA, affidavits, NOCs, legal opinions and more.' },
    { title: 'Tax Documents', count: '13 Documents', desc: 'ITR, TDS, Form 16, property tax receipts, etc.' },
    { title: 'KYC Documents', count: '6 Documents', desc: 'KYC, PAN, Aadhaar, FATCA, CRS & other compliances.' }
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
          <FileText size={20} color="#C58A2A" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#C58A2A', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Documents
          </span>
        </div>

        {/* Categories */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { id: 'all', label: 'All Documents' },
            { id: 'prop', label: 'Property Documents' },
            { id: 'personal', label: 'Personal Documents' },
            { id: 'fin', label: 'Financial Documents' },
            { id: 'legal', label: 'Legal Documents' },
            { id: 'tax', label: 'Tax Documents' },
            { id: 'kyc', label: 'KYC Documents' },
            { id: 'shared', label: 'Shared With Me' },
            { id: 'recent', label: 'Recently Uploaded' },
            { id: 'trash', label: 'Trash' }
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
            <button onClick={() => showToast("Upload file selector opened")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <Upload size={16} color="#C58A2A" />
              <span>Upload Document</span>
            </button>
            <button onClick={() => showToast("Requesting document from builder/authority")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <FileCheck size={16} color="#C58A2A" />
              <span>Request Document</span>
            </button>
            <button onClick={() => showToast("Secure document share link generated")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <Share2 size={16} color="#C58A2A" />
              <span>Share Document</span>
            </button>
            <button onClick={() => showToast("NRI Legal Document checklist loaded")} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#CBD5E1', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <CheckSquare size={16} color="#C58A2A" />
              <span>Document Checklist</span>
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
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>Your Documents are Safe</span>
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
            <div>✓ 256-bit SSL Encryption</div>
            <div>✓ Secure Cloud Storage</div>
            <div>✓ Role-based Access</div>
            <div>✓ Regular Backups</div>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#071A33', margin: 0, fontFamily: 'Playfair Display, serif' }}>
              NRI Documents
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
              Securely store, manage and access all your important documents in one place.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input 
                type="text" 
                placeholder="Search Documents..." 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 32px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  fontSize: '12px'
                }}
              />
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: '#071A33',
                color: '#FFFFFF',
                borderRadius: '6px',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Upload size={14} />
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* 6 Document Count Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '24px' }}>
          {[
            { label: 'All Documents', count: `${docsList.length + 51}`, sub: 'Total Files', color: '#2563EB', bg: '#EFF6FF' },
            { label: 'Property Documents', count: '18', sub: 'Documents', color: '#2563EB', bg: '#EFF6FF' },
            { label: 'Personal Documents', count: '10', sub: 'Documents', color: '#7C3AED', bg: '#F3E8FF' },
            { label: 'Financial Documents', count: '8', sub: 'Documents', color: '#059669', bg: '#ECFDF5' },
            { label: 'Legal Documents', count: '7', sub: 'Documents', color: '#D97706', bg: '#FEF3C7' },
            { label: 'Tax Documents', count: '13', sub: 'Documents', color: '#D97706', bg: '#FEF3C7' }
          ].map((c, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '14px', textAlign: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
                <FileText size={16} />
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>{c.label}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#071A33' }}>{c.count}</div>
              <div style={{ fontSize: '10px', color: '#94A3B8' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Recent Documents Table */}
        <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '20px', marginBottom: '28px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#071A33', margin: '0 0 16px 0' }}>
            Recent Documents
          </h3>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B', textAlign: 'left', fontSize: '11px' }}>
                  <th style={{ padding: '8px 12px' }}>Document Name</th>
                  <th style={{ padding: '8px 12px' }}>Category</th>
                  <th style={{ padding: '8px 12px' }}>Property / Purpose</th>
                  <th style={{ padding: '8px 12px' }}>Uploaded On</th>
                  <th style={{ padding: '8px 12px' }}>Size</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {docsList.map((doc, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F8FAFC' }}>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ background: doc.typeBg, color: '#FFF', fontSize: '9px', fontWeight: 700, padding: '2px 4px', borderRadius: '3px' }}>
                        {doc.type}
                      </span>
                      <strong style={{ color: '#071A33' }}>{doc.name}</strong>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ background: doc.catBg, color: doc.catColor, fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px' }}>
                        {doc.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#475569' }}>{doc.purpose}</td>
                    <td style={{ padding: '12px', color: '#64748B' }}>{doc.date}</td>
                    <td style={{ padding: '12px', color: '#64748B' }}>{doc.size}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button 
                          onClick={() => downloadDocument(doc)} 
                          title="Download Document"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2563EB' }}
                        >
                          <Download size={14} />
                        </button>
                        <button 
                          onClick={() => showToast(`Options for ${doc.name}`)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                        >
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center', marginTop: '14px', borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
            <span onClick={() => showToast("Viewing full documents repository")} style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>
              View All Documents →
            </span>
          </div>
        </div>

        {/* Document Categories 6 Cards */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#071A33', margin: '0 0 14px 0' }}>
            Document Categories
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
            {categories.map((c, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', padding: '14px 10px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#071A33', margin: '0 0 4px 0' }}>{c.title}</h4>
                  <p style={{ fontSize: '10px', color: '#64748B', margin: '0 0 8px 0', lineHeight: 1.3 }}>{c.desc}</p>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#071A33', marginBottom: '10px' }}>{c.count}</div>
                </div>

                <button 
                  onClick={() => showToast(`Filtering ${c.title}`)}
                  style={{
                    padding: '6px 0',
                    border: '1px solid #E2E8F0',
                    borderRadius: '4px',
                    background: '#FAFAFA',
                    color: '#334155',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  View Documents
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Important Note Banner */}
        <div style={{ 
          background: '#FFFBEB', 
          border: '1px solid #FDE68A', 
          borderRadius: '8px', 
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#92400E' }}>
            <AlertCircle size={16} />
            <span><strong>Important Note:</strong> Please ensure all uploaded documents are clear and valid. For security reasons, some documents may require verification.</span>
          </div>

          <span onClick={() => showToast("Document guidelines modal")} style={{ color: '#2563EB', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            View Document Guidelines →
          </span>
        </div>
      </main>

      {/* 3. Right Column: Storage, Security, Request, Help */}
      <aside style={{ 
        width: '320px', 
        minWidth: '320px',
        padding: '28px 24px 60px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Storage Overview */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#071A33', margin: '0 0 14px 0' }}>
            Storage Overview
          </h4>

          <div style={{ position: 'relative', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  isAnimationActive={false}
                  data={storageData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {storageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => `${val}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#071A33' }}>12.6 GB</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Used</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px', marginBottom: '14px' }}>
            {storageData.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                  <span style={{ color: '#475569' }}>{item.name}</span>
                </div>
                <strong style={{ color: '#071A33' }}>{item.value}%</strong>
              </div>
            ))}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>
              <span>12.6 GB of 50 GB Used</span>
              <strong>25%</strong>
            </div>
            <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '25%', height: '100%', background: '#2563EB' }} />
            </div>
          </div>

          <button 
            onClick={() => showToast("Upgrade storage tier")}
            style={{
              width: '100%',
              marginTop: '14px',
              padding: '8px 0',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              background: '#FFFFFF',
              color: '#334155',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Manage Storage
          </button>
        </div>

        {/* Document Security */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '18px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', margin: '0 0 12px 0' }}>Document Security</h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#475569', marginBottom: '14px' }}>
            <div>✓ End-to-End Encrypted</div>
            <div>✓ Two-Factor Authentication</div>
            <div>✓ Secure Cloud Backup</div>
            <div>✓ Access Control & Permissions</div>
            <div>✓ Activity Log & Audit Trail</div>
          </div>

          <button 
            onClick={() => showToast("Security Center")}
            style={{
              width: '100%',
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
            Go to Security Center
          </button>
        </div>

        {/* Need a Document? */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '18px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#071A33', margin: '0 0 4px 0' }}>Need a Document?</h4>
          <p style={{ fontSize: '11px', color: '#64748B', margin: '0 0 12px 0', lineHeight: 1.4 }}>
            We can help you get documents from builders, authorities and banks.
          </p>

          <button 
            onClick={openDocRequestModal}
            style={{
              width: '100%',
              padding: '8px 0',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              background: '#FAFAFA',
              color: '#071A33',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Request a Document
          </button>
        </div>

        {/* Need Help? */}
        <div style={{ background: '#071A33', borderRadius: '12px', padding: '18px', color: '#FFFFFF' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 4px 0' }}>Need Help?</h4>
          <p style={{ fontSize: '11px', color: '#94A3B8', margin: '0 0 12px 0' }}>Our support team is available 24x7 for NRIs.</p>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#FCD34D', marginBottom: '12px' }}>Dedicated Hotline: +91 98765 43210</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noreferrer" 
              style={{ textAlign: 'center', textDecoration: 'none', padding: '8px 0', background: '#059669', color: '#FFF', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
            >
              Chat on WhatsApp
            </a>
            <button 
              onClick={() => openVisitModal()} 
              style={{ padding: '8px 0', background: '#C58A2A', color: '#FFF', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
            >
              Request a Callback
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
