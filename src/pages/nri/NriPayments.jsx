import React from 'react';
import { CreditCard, CheckCircle2, Clock, Download, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function NriPayments() {
  const { showToast } = useApp();

  const paymentTransactions = [
    { id: 'TXN-8801', property: 'Skyline Heights 1402', desc: 'Initial Booking Token', amount: '₹5,00,000', date: '10 May 2024', mode: 'SBI NRE Wire Transfer', status: 'Cleared' },
    { id: 'TXN-8802', property: 'Skyline Heights 1402', desc: 'Foundation Slab Completion Milestone', amount: '₹15,50,000', date: '22 Jun 2024', mode: 'HDFC Forex Remittance', status: 'Cleared' },
    { id: 'TXN-8803', property: 'Luxury Villa Greens', desc: 'Quarterly Maintenance Fund (FY24)', amount: '₹45,000', date: '01 Apr 2024', mode: 'Direct Debit', status: 'Cleared' },
    { id: 'TXN-8804', property: 'Skyline Heights 1402', desc: '14th Floor Roof Slab Milestone', amount: '₹12,00,000', date: 'Due 15 Aug 2024', mode: 'Wire Transfer', status: 'Upcoming' },
  ];

  return (
    <div className="nri-payments-page" style={{ padding: '24px 0 60px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#C58A2A', letterSpacing: '0.5px' }}>
              FOREIGN EXCHANGE & ESCROW MONITOR
            </span>
            <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#071A33', margin: '4px 0 0 0', fontFamily: 'Playfair Display, serif' }}>
              Token & Milestone Payments
            </h1>
          </div>

          <button 
            onClick={() => showToast("Opening Escrow Wire Instructions for SBI NRE Account...")}
            className="btn btn-gold" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
          >
            <CreditCard size={16} /> View Wire & Escrow Instructions
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Total Disbursed</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#071A33', marginTop: '6px' }}>₹20.95 Lakhs</div>
            <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>100% RERA Escrow Account Protected</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Next Milestone Due</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#C58A2A', marginTop: '6px' }}>₹12.00 Lakhs</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>15 Aug 2024 (14th Floor Slab)</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>TDS Deducted (Form 26AS)</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#2563EB', marginTop: '6px' }}>₹20,950</div>
            <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>1% Sec 194-IA Compliant</div>
          </div>
        </div>

        {/* Transactions Table */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#071A33', marginBottom: '20px' }}>
            Transaction History & Escrow Receipts
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#475569' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Reference ID</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Property / Milestone</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Amount</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Date & Channel</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {paymentTransactions.map((tx) => (
                  <tr key={tx.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#071A33' }}>{tx.id}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#071A33' }}>{tx.desc}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{tx.property}</div>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#071A33' }}>{tx.amount}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ color: '#071A33' }}>{tx.date}</div>
                      <div style={{ fontSize: '11px', color: '#94A3B8' }}>{tx.mode}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 600, 
                        color: tx.status === 'Cleared' ? '#059669' : '#D97706',
                        background: tx.status === 'Cleared' ? '#ECFDF5' : '#FEF3C7',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}>
                        {tx.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button 
                        onClick={() => showToast(`Downloading official RERA Escrow receipt for ${tx.id}...`)}
                        className="btn btn-outline" 
                        style={{ padding: '6px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Download size={13} /> Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
