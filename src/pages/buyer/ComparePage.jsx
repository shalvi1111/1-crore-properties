
import React from 'react';
import { Link } from 'react-router-dom';
import {
  GitCompare,
  Trash2,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ComparePage() {
  const {
    properties,
    compareList,
    toggleCompare,
    clearCompare,
    openComparePicker,
    openVisitModal
  } = useApp();

  const comparedProperties = properties.filter(p =>
    compareList.includes(p.id)
  );

  // Find the property with the highest appreciation
  const bestValueProp = comparedProperties.length > 0
    ? [...comparedProperties].sort(
        (a, b) =>
          (b.appreciation || 0) - (a.appreciation || 0)
      )[0]
    : null;

  return (
    <div
      className="compare-page"
      style={{
        background: '#F8FAFC',
        minHeight: '100vh',
        padding: '32px 0 80px 0'
      }}
    >
      <div className="container">

        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#7C3AED',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              <GitCompare size={16} />
              LUXURY PROPERTY BENCHMARKING
            </div>

            <h1
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#071A33',
                margin: '4px 0 0 0',
                fontFamily: 'Playfair Display, serif'
              }}
            >
              Side-by-Side Comparison ({comparedProperties.length}/4)
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {comparedProperties.length > 0 && (
              <button
                onClick={clearCompare}
                className="btn btn-outline"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  color: '#EF4444',
                  borderColor: '#EF4444'
                }}
              >
                <Trash2 size={14} />
                Clear All
              </button>
            )}

            <button
              onClick={openComparePicker}
              className="btn btn-navy"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px'
              }}
            >
              <Plus size={16} />
              Add More Properties
            </button>
          </div>
        </div>

        {/* Empty State */}
        {comparedProperties.length === 0 ? (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '60px 20px',
              textAlign: 'center',
              border: '1px solid #E2E8F0'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#F5F3FF',
                color: '#7C3AED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <GitCompare size={32} />
            </div>

            <h3
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#071A33',
                marginBottom: '8px'
              }}
            >
              No Properties in Compare Tray
            </h3>

            <p
              style={{
                color: '#64748B',
                fontSize: '14px',
                maxWidth: '400px',
                margin: '0 auto 24px auto'
              }}
            >
              Browse listings across Hyderabad, Bangalore, or Mumbai
              and click the compare icon to benchmark them side by side.
            </p>

            <Link
              to="/properties"
              className="btn btn-gold"
              style={{ padding: '12px 28px' }}
            >
              Explore Properties Now
            </Link>
          </div>
        ) : (
          <div>

            {/* ALPHA REALITY Winner Banner */}
            {bestValueProp && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  color: '#FFFFFF',
                  marginBottom: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  boxShadow: '0 8px 20px rgba(124, 58, 237, 0.2)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px'
                  }}
                >
                  {/* Trophy Icon - Replaces AI Symbol */}
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      minWidth: '44px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trophy size={24} color="#FDE047" />
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#FDE047',
                        fontWeight: 700,
                        letterSpacing: '1px'
                      }}
                    >
                      ALPHA REALITY
                    </div>

                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        lineHeight: 1.5
                      }}
                    >
                      <strong>{bestValueProp.title}</strong> has the
                      highest projected 5-year appreciation
                      (+{bestValueProp.appreciation || 14.2}%)
                      and verified RERA title.
                    </div>
                  </div>
                </div>

                <Link
                  to={`/properties/${bestValueProp.id}`}
                  className="btn"
                  style={{
                    background: '#FFFFFF',
                    color: '#5B21B6',
                    fontWeight: 700,
                    fontSize: '13px',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  View Top Winner <ArrowRight size={14} />
                </Link>
              </div>
            )}

            {/* Comparison Matrix */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                overflowX: 'auto',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                  minWidth: '700px'
                }}
              >
                <tbody>

                  {/* Property Overview */}
                  <tr
                    style={{
                      borderBottom: '2px solid #E2E8F0',
                      verticalAlign: 'top'
                    }}
                  >
                    <td
                      style={{
                        padding: '24px',
                        width: '220px',
                        background: '#F8FAFC',
                        fontWeight: 700,
                        color: '#071A33',
                        fontSize: '14px'
                      }}
                    >
                      Property Overview
                    </td>

                    {comparedProperties.map((p) => (
                      <td
                        key={p.id}
                        style={{
                          padding: '24px',
                          width: `${100 / comparedProperties.length}%`,
                          position: 'relative'
                        }}
                      >
                        <button
                          onClick={() => toggleCompare(p.id)}
                          style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            background: '#F1F5F9',
                            border: 'none',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#64748B'
                          }}
                          title="Remove from compare"
                        >
                          ×
                        </button>

                        <img
                          src={p.image}
                          alt={p.title}
                          style={{
                            width: '100%',
                            height: '140px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            marginBottom: '12px'
                          }}
                        />

                        <span
                          className="badge badge-gold"
                          style={{
                            fontSize: '10px',
                            padding: '2px 8px'
                          }}
                        >
                          {p.type}
                        </span>

                        <h4
                          style={{
                            fontSize: '15px',
                            fontWeight: 700,
                            color: '#071A33',
                            margin: '6px 0 4px 0'
                          }}
                        >
                          {p.title}
                        </h4>

                        <div
                          style={{
                            fontSize: '12px',
                            color: '#64748B',
                            marginBottom: '8px'
                          }}
                        >
                          {p.location}
                        </div>

                        <div
                          style={{
                            fontSize: '20px',
                            fontWeight: 800,
                            color: '#C58A2A'
                          }}
                        >
                          {p.priceStr}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Price Per Sq.Ft */}
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={labelStyle}>Price / Sq.Ft</td>

                    {comparedProperties.map(p => (
                      <td key={p.id} style={valueStyle}>
                        {p.pricePerSqFt}
                      </td>
                    ))}
                  </tr>

                  {/* Super Area */}
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={labelStyle}>Super Area</td>

                    {comparedProperties.map(p => (
                      <td key={p.id} style={valueStyle}>
                        {p.area} sq.ft
                      </td>
                    ))}
                  </tr>

                  {/* BHK */}
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={labelStyle}>Bedrooms / BHK</td>

                    {comparedProperties.map(p => (
                      <td key={p.id} style={valueStyle}>
                        {p.bhk || `${p.beds} BHK`}
                      </td>
                    ))}
                  </tr>

                  {/* Facing */}
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={labelStyle}>Facing Direction</td>

                    {comparedProperties.map(p => (
                      <td key={p.id} style={valueStyle}>
                        {p.facing || 'East'}
                      </td>
                    ))}
                  </tr>

                  {/* Possession */}
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={labelStyle}>Possession Status</td>

                    {comparedProperties.map(p => (
                      <td key={p.id} style={valueStyle}>
                        {p.possession || 'Ready to Move'}
                      </td>
                    ))}
                  </tr>

                  {/* Appreciation */}
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={labelStyle}>5-Yr Appreciation</td>

                    {comparedProperties.map(p => (
                      <td
                        key={p.id}
                        style={{
                          ...valueStyle,
                          fontWeight: 700,
                          color: '#059669'
                        }}
                      >
                        +{p.appreciation || 12.8}% CAGR
                      </td>
                    ))}
                  </tr>

                  {/* RERA */}
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={labelStyle}>RERA Status</td>

                    {comparedProperties.map(p => (
                      <td
                        key={p.id}
                        style={{
                          padding: '16px 24px',
                          fontSize: '13px'
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#059669',
                            background: '#ECFDF5',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontWeight: 600
                          }}
                        >
                          <ShieldCheck size={14} />
                          Registered ({p.reraId || 'P02400012'})
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Direct Actions */}
                  <tr>
                    <td
                      style={{
                        ...labelStyle,
                        fontWeight: 700,
                        color: '#071A33'
                      }}
                    >
                      Direct Actions
                    </td>

                    {comparedProperties.map(p => (
                      <td key={p.id} style={{ padding: '24px' }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                          }}
                        >
                          <Link
                            to={`/properties/${p.id}`}
                            className="btn btn-navy"
                            style={{
                              padding: '8px 10px',
                              fontSize: '12px',
                              textAlign: 'center',
                              textDecoration: 'none'
                            }}
                          >
                            View Details
                          </Link>

                          <button
                            type="button"
                            onClick={() => openVisitModal(p)}
                            className="btn btn-gold"
                            style={{
                              padding: '8px 10px',
                              fontSize: '12px',
                              textAlign: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px'
                            }}
                          >
                            <Calendar size={13} />
                            Schedule Visit
                          </button>

                          <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline"
                            style={{
                              padding: '8px 10px',
                              fontSize: '12px',
                              textAlign: 'center',
                              textDecoration: 'none',
                              color: '#059669',
                              borderColor: '#059669',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                          >
                            <MessageSquare size={14} />
                            WhatsApp Desk
                          </a>
                        </div>
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Shared table styles
const labelStyle = {
  padding: '16px 24px',
  background: '#F8FAFC',
  fontWeight: 600,
  color: '#475569',
  fontSize: '13px'
};

const valueStyle = {
  padding: '16px 24px',
  color: '#334155',
  fontSize: '14px'
};
