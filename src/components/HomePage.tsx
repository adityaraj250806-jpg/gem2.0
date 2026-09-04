import React, { useState, useEffect } from 'react';

/* ─── DESIGN TOKENS ──────────────────────────────────────────── */
const T = {
  navy: '#0b3d91',
  navyDark: '#071f52',
  navyLight: '#1a5cb5',
  teal: '#0891b2',
  tealLight: '#06b6d4',
  emerald: '#059669',
  saffron: '#ea580c',
  ink: '#0f172a',
  inkMuted: '#475569',
  inkFaint: '#94a3b8',
  white: '#ffffff',
  surfaceAlt: '#f8fafc',
  surfaceBlue: '#eff6ff',
  border: '#e2e8f0',
  borderStrong: '#cbd5e1',
};

const font = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
const fontSerif = `'Merriweather', 'Georgia', serif`;
const fontMono = `'JetBrains Mono', monospace`;

/* ─── HELPER COMPONENTS ──────────────────────────────────────── */

interface BadgeProps { label: string; color?: string; bg?: string; }
const Badge: React.FC<BadgeProps> = ({ label, color = T.teal, bg = '#e0f2fe' }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '4px 12px', borderRadius: 999, fontSize: 11,
    fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
    color, background: bg, fontFamily: font,
  }}>
    {label}
  </span>
);

/* ─── TOP GOVERNMENT BAR ─────────────────────────────────────── */
const TopBar: React.FC = () => (
  <div style={{
    background: T.navyDark, color: '#cbd5e1', fontSize: 11,
    fontFamily: font, fontWeight: 500, letterSpacing: '0.03em',
  }}>
    <div style={{
      maxWidth: 1280, margin: '0 auto', padding: '6px 24px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>🇮🇳</span>
        <span style={{ color: '#e2e8f0', fontWeight: 600 }}>Government of India</span>
        <span style={{ color: '#475569' }}>|</span>
        <span>भारत सरकार</span>
        <span style={{ color: '#475569' }}>|</span>
        <span>Department of Commerce, Ministry of Commerce & Industry</span>
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {['हिन्दी', 'Accessibility', 'Help', '1800-419-3436'].map((item, i) => (
          <span key={i} style={{ cursor: 'pointer', color: '#94a3b8', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
          >{item}</span>
        ))}
      </span>
    </div>
  </div>
);

/* ─── NAVIGATION ─────────────────────────────────────────────── */
interface NavProps { onOfficerLogin: () => void; onExploreTenders: () => void; }
const Navbar: React.FC<NavProps> = ({ onOfficerLogin, onExploreTenders }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(255,255,255,0.97)' : '#ffffff',
      borderBottom: `1px solid ${T.border}`,
      boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
      backdropFilter: 'blur(8px)',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 24px',
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: `linear-gradient(135deg, ${T.navy}, ${T.navyLight})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 14, fontWeight: 800, fontFamily: fontSerif,
            boxShadow: `0 4px 12px ${T.navy}30`,
          }}>G</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: T.ink, fontFamily: font, lineHeight: 1.1 }}>
              GeM AI<span style={{ color: T.navy }}> Portal</span>
            </div>
            <div style={{ fontSize: 10, color: T.inkFaint, fontWeight: 500, letterSpacing: '0.04em' }}>
              AI-Powered Bid Compliance
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[
            { label: 'Tenders', id: 'tenders' },
            { label: 'For Bidders', id: 'journeys' },
            { label: 'For Officers', id: 'journeys' },
            { label: 'How It Works', id: 'how-it-works' },
          ].map(({ label, id }) => (
            <button key={label} onClick={() => scrollTo(id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: T.inkMuted, fontFamily: font, transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = T.navy; e.currentTarget.style.background = T.surfaceBlue; }}
              onMouseLeave={e => { e.currentTarget.style.color = T.inkMuted; e.currentTarget.style.background = 'none'; }}
            >{label}</button>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onExploreTenders}
            style={{
              background: 'none', border: `1.5px solid ${T.border}`, cursor: 'pointer',
              padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              color: T.ink, fontFamily: font, transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.navy; e.currentTarget.style.color = T.navy; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.ink; }}
          >View Tenders</button>
          <button onClick={onOfficerLogin}
            style={{
              background: `linear-gradient(135deg, ${T.navy}, ${T.navyLight})`,
              border: 'none', cursor: 'pointer',
              padding: '9px 20px', borderRadius: 8, fontSize: 13, fontWeight: 700,
              color: 'white', fontFamily: font, transition: 'all 0.2s',
              boxShadow: `0 4px 12px ${T.navy}35`,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${T.navy}45`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 4px 12px ${T.navy}35`; }}
          >Officer Login →</button>
        </div>
      </div>
    </nav>
  );
};

/* ─── HERO SECTION ───────────────────────────────────────────── */
interface HeroProps { onExplore: () => void; onLogin: () => void; }
const HeroSection: React.FC<HeroProps> = ({ onExplore, onLogin }) => (
  <section style={{
    background: `linear-gradient(160deg, #f8fafc 0%, #eff6ff 40%, #e0f2fe 100%)`,
    padding: '100px 24px 80px',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* Decorative circles */}
    <div style={{
      position: 'absolute', right: -120, top: -120,
      width: 600, height: 600, borderRadius: '50%',
      background: `radial-gradient(circle, ${T.navy}08 0%, transparent 70%)`,
      pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute', left: -60, bottom: -80,
      width: 400, height: 400, borderRadius: '50%',
      background: `radial-gradient(circle, ${T.teal}06 0%, transparent 70%)`,
      pointerEvents: 'none',
    }} />

    <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

        {/* LEFT COLUMN */}
        <div>
          <div style={{ marginBottom: 24 }}>
            <Badge label="Government of India · GFR 2017 Compliant" color={T.navy} bg={`${T.navy}12`} />
          </div>

          <h1 style={{
            fontFamily: fontSerif, fontSize: 52, fontWeight: 700, lineHeight: 1.15,
            color: T.ink, margin: '0 0 24px', letterSpacing: '-0.02em',
          }}>
            Smarter bid evaluation for{' '}
            <span style={{
              background: `linear-gradient(135deg, ${T.navy}, ${T.teal})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Indian procurement.</span>
          </h1>

          <p style={{
            fontFamily: font, fontSize: 18, color: T.inkMuted, lineHeight: 1.7,
            margin: '0 0 36px', maxWidth: 480,
          }}>
            AI-powered compliance verification that helps procurement officers evaluate 
            bids faster, and bidders submit winning dossiers with full statutory confidence.
          </p>

          {/* Trust chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
            {[
              { icon: '✓', label: 'GST & PAN Verified' },
              { icon: '✓', label: 'MSME Compliant' },
              { icon: '✓', label: 'GFR 2017 Aligned' },
              { icon: '✓', label: 'CVC Audit-Ready' },
            ].map(({ icon, label }) => (
              <span key={label} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                color: T.emerald, background: '#f0fdf4', border: '1px solid #bbf7d0',
                fontFamily: font,
              }}><span>{icon}</span>{label}</span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 14 }}>
            <button onClick={onExplore}
              style={{
                background: `linear-gradient(135deg, ${T.navy}, ${T.navyLight})`,
                color: 'white', border: 'none', cursor: 'pointer',
                padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700,
                fontFamily: font, boxShadow: `0 8px 24px ${T.navy}30`,
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${T.navy}40`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 8px 24px ${T.navy}30`; }}
            >Explore Active Tenders <span>→</span></button>

            <button onClick={onLogin}
              style={{
                background: 'white', border: `1.5px solid ${T.border}`,
                color: T.ink, cursor: 'pointer',
                padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600,
                fontFamily: font, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.navy; e.currentTarget.style.color = T.navy; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.ink; }}
            >Officer Login</button>
          </div>

          {/* Micro trust statement */}
          <p style={{ fontFamily: font, fontSize: 12, color: T.inkFaint, marginTop: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>🔒</span>
            Hosted in MeitY-empaneled sovereign cloud · NIC infrastructure · AES-256 encrypted
          </p>
        </div>

        {/* RIGHT COLUMN — Browser UI Mockup */}
        <div style={{ position: 'relative' }}>
          {/* Floating badges */}
          <div style={{
            position: 'absolute', top: -18, right: -12, zIndex: 10,
            background: 'white', borderRadius: 12, padding: '10px 16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: `1px solid ${T.border}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 20 }}>🤖</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.ink, fontFamily: font }}>AI Engine</div>
              <div style={{ fontSize: 10, color: T.inkFaint, fontFamily: font }}>6 registries checked</div>
            </div>
          </div>

          <div style={{
            position: 'absolute', bottom: -18, left: -18, zIndex: 10,
            background: 'white', borderRadius: 12, padding: '10px 16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: `1px solid ${T.border}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 20 }}>✅</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.emerald, fontFamily: font }}>Verified</div>
              <div style={{ fontSize: 10, color: T.inkFaint, fontFamily: font }}>GSTIN Active</div>
            </div>
          </div>

          {/* Main card */}
          <div style={{
            background: 'white', borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(11,61,145,0.12), 0 4px 16px rgba(0,0,0,0.05)',
            border: `1px solid ${T.border}`,
          }}>
            {/* Browser bar */}
            <div style={{ background: '#f1f5f9', borderBottom: `1px solid ${T.border}`, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fc5f5a', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fdbc40', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#34c84a', display: 'inline-block' }} />
              <div style={{ flex: 1, margin: '0 10px', background: 'white', borderRadius: 6, padding: '4px 12px', fontSize: 11, color: T.inkFaint, fontFamily: fontMono, border: `1px solid ${T.border}` }}>
                gem-ai-eval.gov.in/tender/CPCL-PROC-2026-001
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '20px 24px' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: T.teal, fontFamily: font, textTransform: 'uppercase', marginBottom: 4 }}>Tender Reference: CPCL/PROC/2026/001</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, fontFamily: font }}>CPCL Industrial Equipment Procurement</div>
                  <div style={{ fontSize: 12, color: T.inkMuted, fontFamily: font, marginTop: 2 }}>Chennai Petroleum Corporation Limited</div>
                </div>
                <span style={{
                  padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, fontFamily: font,
                  color: '#92400e', background: '#fef3c7', border: '1px solid #fde68a',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>⏳ In Progress</span>
              </div>

              {/* Bidder row */}
              <div style={{ background: T.surfaceAlt, borderRadius: 10, padding: '12px 14px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${T.navy}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🏭</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: font }}>ABC Engineering Pvt. Ltd.</div>
                    <div style={{ fontSize: 11, color: T.inkFaint, fontFamily: font }}>Micro Enterprise · Udyam Registered</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: T.inkFaint, fontFamily: font }}>Documents</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.navy, fontFamily: font }}>6 / 8</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: T.inkMuted, fontFamily: font, fontWeight: 600 }}>Document verification in progress</span>
                  <span style={{ fontSize: 11, color: T.navy, fontFamily: font, fontWeight: 700 }}>75%</span>
                </div>
                <div style={{ height: 6, background: T.border, borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '75%', background: `linear-gradient(90deg, ${T.navy}, ${T.tealLight})`, borderRadius: 999, transition: 'width 1s ease' }} />
                </div>
              </div>

              {/* Compliance chips */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 14 }}>
                {[
                  { label: 'GST', status: 'Verified', ok: true },
                  { label: 'PAN', status: 'Verified', ok: true },
                  { label: 'Udyam', status: 'Verified', ok: true },
                  { label: 'ITR', status: 'Verified', ok: true },
                  { label: 'EPFO', status: 'Verified', ok: true },
                  { label: 'OEM Auth', status: 'Uploaded', ok: false },
                ].map(({ label, status, ok }) => (
                  <div key={label} style={{
                    padding: '6px 10px', borderRadius: 8, fontSize: 11, fontFamily: font,
                    background: ok ? '#f0fdf4' : '#fefce8',
                    border: `1px solid ${ok ? '#bbf7d0' : '#fde68a'}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    color: ok ? '#065f46' : '#92400e',
                  }}>
                    <span style={{ fontWeight: 700 }}>{label}</span>
                    <span>{ok ? '✓' : '↑'} {status}</span>
                  </div>
                ))}
              </div>

              {/* Run AI Analysis CTA */}
              <button style={{
                width: '100%', padding: '11px', borderRadius: 10,
                background: `linear-gradient(135deg, ${T.navy}12, ${T.teal}12)`,
                border: `1.5px dashed ${T.navy}40`,
                color: T.navy, fontWeight: 700, fontSize: 13, fontFamily: font, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${T.navy}12`; e.currentTarget.style.borderColor = T.navy; }}
              onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${T.navy}12, ${T.teal}12)`; e.currentTarget.style.borderColor = `${T.navy}40`; }}
              >
                🤖 Run AI Compliance Analysis
                <span style={{ fontWeight: 400, color: T.inkFaint, fontSize: 11 }}>(Officer Action Required)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── STATS SECTION ──────────────────────────────────────────── */
const StatsSection: React.FC = () => (
  <section style={{ background: T.navy, padding: '56px 24px' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
        {[
          { val: '60–80%', label: 'Reduction in manual verification effort', sub: 'Target operational benchmark' },
          { val: '10+', label: 'Government registries integrated', sub: 'GST, PAN, MSME, EPFO & more' },
          { val: '4 CPSEs', label: 'Active PSU procurement tenders', sub: 'CPCL · IOCL · ONGC · GAIL' },
          { val: 'AI-First', label: 'Compliance matrix evaluation', sub: 'Human officer retains authority' },
        ].map(({ val, label, sub }, i) => (
          <div key={i} style={{
            padding: '32px 36px',
            borderRight: i < 3 ? `1px solid rgba(255,255,255,0.1)` : 'none',
          }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: 'white', fontFamily: fontSerif, lineHeight: 1, marginBottom: 10 }}>{val}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontFamily: font, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: font }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── BUYER / SUPPLIER SPLIT ─────────────────────────────────── */
interface JourneyProps { onBidder: () => void; onOfficer: () => void; }
const JourneySection: React.FC<JourneyProps> = ({ onBidder, onOfficer }) => (
  <section id="journeys" style={{ padding: '96px 24px', background: '#ffffff' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <Badge label="Structured Procurement" color={T.navy} bg={`${T.navy}10`} />
        <h2 style={{ fontFamily: fontSerif, fontSize: 40, fontWeight: 700, color: T.ink, margin: '20px 0 16px', letterSpacing: '-0.02em' }}>
          One platform. Two procurement journeys.
        </h2>
        <p style={{ fontFamily: font, fontSize: 17, color: T.inkMuted, maxWidth: 560, margin: '0 auto' }}>
          Connecting verified bidders with procurement officers through a transparent, AI-assisted workflow.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {/* Bidder Panel */}
        <div style={{
          borderRadius: 20, padding: '44px', border: `1px solid ${T.border}`,
          background: 'linear-gradient(145deg, #fafbff 0%, #ffffff 100%)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
          transition: 'all 0.3s', cursor: 'default',
        }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 48px ${T.navy}12`; e.currentTarget.style.borderColor = `${T.navy}30`; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = T.border; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: T.surfaceBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏭</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: T.teal, fontFamily: font, textTransform: 'uppercase' }}>Vendor & MSME Ecosystem</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: T.ink, fontFamily: fontSerif }}>For Bidders</div>
            </div>
          </div>

          <div style={{ space: 0, marginBottom: 32 }}>
            {[
              ['🔍', 'Discover tenders by category, organisation, or location'],
              ['📋', 'Review NIT conditions and mandatory qualification criteria'],
              ['📤', 'Upload and manage statutory compliance documents'],
              ['✅', 'Submit bids with pre-verified registry credentials'],
              ['📊', 'Track submission status and evaluation progress'],
            ].map(([icon, text], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'start', gap: 12, padding: '10px 0', borderBottom: i < 4 ? `1px solid ${T.border}` : 'none' }}>
                <span style={{ fontSize: 16, marginTop: 1 }}>{icon}</span>
                <span style={{ fontSize: 14, color: T.inkMuted, fontFamily: font, fontWeight: 500, lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>

          <button onClick={onBidder}
            style={{
              width: '100%', padding: '13px', borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: font,
              background: T.surfaceBlue, border: `1.5px solid ${T.navy}25`, color: T.navy, cursor: 'pointer',
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${T.navy}15`; e.currentTarget.style.borderColor = T.navy; }}
            onMouseLeave={e => { e.currentTarget.style.background = T.surfaceBlue; e.currentTarget.style.borderColor = `${T.navy}25`; }}
          >Explore Tenders <span>→</span></button>
        </div>

        {/* Officer Panel */}
        <div style={{
          borderRadius: 20, padding: '44px', border: `1px solid ${T.border}`,
          background: `linear-gradient(145deg, ${T.navy} 0%, ${T.navyLight} 100%)`,
          boxShadow: `0 4px 24px ${T.navy}20`,
          color: 'white', transition: 'all 0.3s',
        }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 20px 56px ${T.navy}35`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 4px 24px ${T.navy}20`; e.currentTarget.style.transform = 'none'; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏛️</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', fontFamily: font, textTransform: 'uppercase' }}>Evaluation Committee</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'white', fontFamily: fontSerif }}>For Officers</div>
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            {[
              ['📁', 'Manage and publish tenders with NIT configuration'],
              ['👥', 'Review all bidder submissions in one dashboard'],
              ['🔍', 'Verify statutory documents across government registries'],
              ['🤖', 'Run AI-assisted compliance analysis and gap detection'],
              ['✍️', 'Record final evaluation with justified, audit-ready rationale'],
            ].map(([icon, text], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'start', gap: 12, padding: '10px 0', borderBottom: i < 4 ? `1px solid rgba(255,255,255,0.1)` : 'none' }}>
                <span style={{ fontSize: 16, marginTop: 1 }}>{icon}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.80)', fontFamily: font, fontWeight: 500, lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>

          <button onClick={onOfficer}
            style={{
              width: '100%', padding: '13px', borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: font,
              background: 'white', border: 'none', color: T.navy, cursor: 'pointer',
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; }}
          >Officer Login <span>→</span></button>
        </div>
      </div>
    </div>
  </section>
);

/* ─── AI PROCESS SECTION ─────────────────────────────────────── */
const AIProcessSection: React.FC = () => {
  const steps = [
    { num: '01', icon: '📋', title: 'Tender Requirements', desc: 'NIT clauses, statutory criteria, and GFR 2017 rules configured.' },
    { num: '02', icon: '📤', title: 'Bidder Documents', desc: 'Submissions, certificates, and BOQ schedules ingested.' },
    { num: '03', icon: '🔍', title: 'Registry Verification', desc: 'Cross-referencing across GSTN, Udyam, MCA21, and CBDT.' },
    { num: '04', icon: '🤖', title: 'AI Compliance Analysis', desc: 'Pattern matching verifies eligibility against evidence.' },
    { num: '05', icon: '⚠️', title: 'Gap Detection', desc: 'Missing documents, mismatches, and risk flags surfaced.' },
    { num: '06', icon: '✍️', title: 'Officer Review', desc: 'Committee reviews dossier and records final verdict.' },
  ];

  return (
    <section style={{ padding: '96px 24px', background: T.surfaceAlt }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Badge label="AI-Powered Workflow" color={T.teal} bg='#e0f2fe' />
          <h2 style={{ fontFamily: fontSerif, fontSize: 40, fontWeight: 700, color: T.ink, margin: '20px 0 16px', letterSpacing: '-0.02em' }}>
            From documents to decisions — intelligently.
          </h2>
          <p style={{ fontFamily: font, fontSize: 17, color: T.inkMuted, maxWidth: 560, margin: '0 auto' }}>
            A structured 6-step pipeline that transforms procurement from a manual bottleneck to an evidence-based, auditable workflow.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, position: 'relative', marginBottom: 40 }}>
          {steps.map(({ num, icon, title, desc }, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <div style={{
                background: 'white', borderRadius: 16, padding: '24px 18px',
                border: `1px solid ${T.border}`, height: '100%',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 36px ${T.navy}12`; e.currentTarget.style.borderColor = `${T.navy}30`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ fontFamily: fontMono, fontSize: 10, fontWeight: 700, color: T.navy, letterSpacing: '0.1em', marginBottom: 10 }}>{num}</div>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: font, marginBottom: 8, lineHeight: 1.3 }}>{title}</div>
                <div style={{ fontSize: 12, color: T.inkMuted, fontFamily: font, lineHeight: 1.6 }}>{desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ position: 'absolute', top: '38px', right: -12, zIndex: 1, fontSize: 16, color: T.inkFaint }}>›</div>
              )}
            </div>
          ))}
        </div>

        {/* Officer Authority Disclaimer */}
        <div style={{
          background: 'white', border: `1px solid #fde68a`, borderRadius: 12, padding: '16px 24px',
          display: 'flex', alignItems: 'center', gap: 14, maxWidth: 900, margin: '0 auto',
        }}>
          <span style={{ fontSize: 22 }}>⚖️</span>
          <p style={{ fontFamily: font, fontSize: 13, color: '#92400e', fontWeight: 500, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: '#78350f' }}>Officer Authority Notice:</strong> AI provides decision support only. Final qualification, disqualification, 
            or award decisions remain the sole responsibility of the Procurement Officer and Tender Evaluation Committee under GFR 2017 Rule 173.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── PLATFORM BENEFITS ──────────────────────────────────────── */
const BenefitsSection: React.FC = () => {
  const benefits = [
    { icon: '⚡', title: 'Faster Verification', desc: 'Automated registry queries cut processing from weeks to hours. Simultaneous cross-checking across GSTN, CBDT, Udyam and more.', color: T.teal },
    { icon: '🎯', title: 'AI-Assisted Compliance', desc: 'Multimodal AI compares BOQ specs, local content declarations, and technical qualifications against tender requirements.', color: T.navy },
    { icon: '🔍', title: 'Full Traceability', desc: 'Every verified point links to source API receipts, portal screenshots, and timestamped evidence.', color: T.emerald },
    { icon: '⚖️', title: 'Standardised Screening', desc: 'Deterministic GFR 2017 criteria applied equally to all bidders, eliminating subjectivity and ensuring fair competition.', color: T.saffron },
    { icon: '📋', title: 'Audit Ready', desc: 'Immutable, tamper-evident evaluation logs exportable for CAG, CVC, and departmental audit review.', color: '#7c3aed' },
  ];

  return (
    <section id="benefits" style={{ padding: '96px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <Badge label="Platform Capabilities" color={T.emerald} bg='#f0fdf4' />
            <h2 style={{ fontFamily: fontSerif, fontSize: 38, fontWeight: 700, color: T.ink, margin: '20px 0 20px', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              Built for modern government procurement.
            </h2>
            <p style={{ fontFamily: font, fontSize: 16, color: T.inkMuted, lineHeight: 1.7, margin: 0 }}>
              Engineered to support procurement officers with consistency, clarity, and institutional speed. 
              Grounded in statutory compliance, not marketing promises.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {benefits.map(({ icon, title, desc, color }, i) => (
              <div key={i} style={{
                borderRadius: 16, padding: '28px',
                border: `1px solid ${T.border}`,
                gridColumn: i === 4 ? '1 / -1' : undefined,
                transition: 'all 0.25s',
                background: 'white',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 40px ${color}15`; e.currentTarget.style.borderColor = `${color}30`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 14,
                }}>{icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font, marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 13, color: T.inkMuted, fontFamily: font, lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── IMPACT / MERCELL-STYLE EDITORIAL STATS ─────────────────── */
const ImpactSection: React.FC = () => (
  <section id="impact" style={{ padding: '96px 24px', background: T.surfaceAlt, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <Badge label="Impact & Efficiency" color={T.navy} bg={`${T.navy}10`} />
        <h2 style={{ fontFamily: fontSerif, fontSize: 40, fontWeight: 700, color: T.ink, margin: '20px 0 0', letterSpacing: '-0.02em' }}>
          Designed to make procurement more efficient.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
        {[
          { val: '60–80%', caption: 'Reduction in verification effort', desc: 'Target potential reduction in manual document cross-referencing and verification cycles.' },
          { val: '1 Platform', caption: 'Unified procurement journey', desc: 'Synchronized workspace supporting both bidder submission and officer evaluation.' },
          { val: 'AI-Assisted', caption: 'Evidence-based verification', desc: 'Automated extraction and rule evaluation with direct traceability to supporting records.' },
          { val: 'End-to-End', caption: 'Structured procurement workflow', desc: 'From tender requirements definition to final qualified bidder committee reporting.' },
        ].map(({ val, caption, desc }, i) => (
          <div key={i}>
            <div style={{ fontFamily: fontSerif, fontSize: 42, fontWeight: 800, color: T.navy, lineHeight: 1, marginBottom: 10 }}>{val}</div>
            <div style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: T.ink, marginBottom: 8 }}>{caption}</div>
            <div style={{ fontFamily: font, fontSize: 13, color: T.inkMuted, lineHeight: 1.65 }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── VERIFICATION ECOSYSTEM ─────────────────────────────────── */
const EcosystemSection: React.FC = () => {
  const sources = [
    { icon: '🏢', name: 'GST Network', agency: 'GSTN', scope: 'Active status & GSTR-3B filings' },
    { icon: '💳', name: 'PAN / Income Tax', agency: 'CBDT', scope: '3-Year ITR compliance & entity match' },
    { icon: '🏭', name: 'Udyam / MSME', agency: 'Ministry of MSME', scope: 'Enterprise tier & investment limits' },
    { icon: '👥', name: 'EPFO', agency: 'Labour & Employment', scope: 'ECR returns & active workforce' },
    { icon: '❤️', name: 'ESIC', agency: 'Min. of Labour', scope: 'Social security compliance' },
    { icon: '🚀', name: 'Startup India', agency: 'DPIIT', scope: 'Turnover & experience exemptions' },
    { icon: '🏆', name: 'NSIC', agency: 'National Small Industries', scope: 'Single Point Registration' },
    { icon: '📁', name: 'DigiLocker', agency: 'MeitY / NE-Gov', scope: 'Cryptographic document verification' },
    { icon: '🏭', name: 'OEM Authorization', agency: 'Manufacturer Verification', scope: 'Direct tender authorization' },
    { icon: '🚫', name: 'Debarment Check', agency: 'CVC / CBI', scope: 'GFR 2017 Rule 151 holiday scan' },
  ];

  return (
    <section id="verification-ecosystem" style={{ padding: '96px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Badge label="Interoperable Registries" color={T.teal} bg='#e0f2fe' />
          <h2 style={{ fontFamily: fontSerif, fontSize: 40, fontWeight: 700, color: T.ink, margin: '20px 0 16px', letterSpacing: '-0.02em' }}>
            Designed for connected verification.
          </h2>
          <p style={{ fontFamily: font, fontSize: 17, color: T.inkMuted, maxWidth: 600, margin: '0 auto' }}>
            Engineered to interface with sovereign statutory registries and credential networks for automated compliance cross-referencing.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 32 }}>
          {sources.map(({ icon, name, agency, scope }, i) => (
            <div key={i} style={{
              background: T.surfaceAlt, borderRadius: 14, padding: '20px',
              border: `1px solid ${T.border}`, transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.boxShadow = `0 8px 32px ${T.navy}10`; e.currentTarget.style.borderColor = `${T.navy}25`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.surfaceAlt; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: font, marginBottom: 4 }}>{name}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.teal, fontFamily: font, marginBottom: 6 }}>{agency}</div>
              <div style={{ fontSize: 11, color: T.inkMuted, fontFamily: font, lineHeight: 1.5 }}>{scope}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <span style={{
            display: 'inline-block', background: '#fefce8', border: '1px solid #fde68a',
            borderRadius: 10, padding: '10px 20px', fontSize: 12, color: '#92400e', fontFamily: font, fontWeight: 500,
          }}>
            ⚠️ Connectors operate within statutory sandbox protocols and authorized departmental API frameworks under GFR 2017.
          </span>
        </div>
      </div>
    </section>
  );
};

/* ─── ACTIVE TENDERS ─────────────────────────────────────────── */
const tenders = [
  { ref: 'CPCL/PROC/2026/001', title: 'Industrial Equipment Procurement — Cryogenic Heat Exchanger Packages', org: 'Chennai Petroleum Corporation Limited (CPCL)', cat: 'Heavy Engineering', val: '₹14.80 Cr', close: '18 Sep 2026', location: 'Manali Refinery, Chennai' },
  { ref: 'IOCL/ENG/2026/088', title: 'High-Pressure Electro-Hydraulic Turbine Actuators & Control Valves', org: 'Indian Oil Corporation Limited (IOCL)', cat: 'Oil & Gas / Energy', val: '₹8.40 Cr', close: '24 Sep 2026', location: 'Panipat Refinery, Haryana' },
  { ref: 'ONGC/OFFSHORE/2026/012', title: 'Subsea Pipeline Ultrasonic Diagnostic Sensors & Telemetry System', org: 'Oil and Natural Gas Corporation (ONGC)', cat: 'Instrumentation & Telecom', val: '₹22.50 Cr', close: '30 Sep 2026', location: 'Western Offshore Basin, Mumbai' },
  { ref: 'GAIL/PIPE/2026/410', title: 'Cryogenic Gas Compressors and Pressure Regulating Skid Stations', org: 'GAIL (India) Limited', cat: 'Heavy Engineering', val: '₹19.20 Cr', close: '05 Oct 2026', location: 'HVJ Pipeline Corridor, Hazira' },
];

interface TendersProps { onSelect: (t: typeof tenders[0]) => void; }
const TendersSection: React.FC<TendersProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const cats = ['All', 'Heavy Engineering', 'Oil & Gas / Energy', 'Instrumentation & Telecom'];
  const filtered = tenders.filter(t =>
    (cat === 'All' || t.cat === cat) &&
    (!query || [t.ref, t.title, t.org, t.location].join(' ').toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <section id="tenders" style={{ padding: '96px 24px', background: T.surfaceAlt }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <Badge label="Live PSU Procurement" color={T.navy} bg={`${T.navy}10`} />
            <h2 style={{ fontFamily: fontSerif, fontSize: 38, fontWeight: 700, color: T.ink, margin: '16px 0 8px', letterSpacing: '-0.02em' }}>
              Active Government Tenders
            </h2>
            <p style={{ fontFamily: font, fontSize: 15, color: T.inkMuted }}>Central PSUs with AI-assisted criteria parsing and verification.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: `1px solid ${T.border}`, borderRadius: 10, padding: '8px 14px', fontSize: 12, color: T.inkMuted, fontFamily: font }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.emerald, display: 'inline-block', animation: 'pulse 2s infinite' }} />
            Real-time updates
          </div>
        </div>

        {/* Search & Filter */}
        <div style={{ background: 'white', borderRadius: 16, padding: 20, border: `1px solid ${T.border}`, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ position: 'relative', marginBottom: 14 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
            <input
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search by tender ID, keyword, organisation, or location..."
              style={{
                width: '100%', padding: '12px 14px 12px 42px', borderRadius: 10, fontSize: 14, fontFamily: font,
                border: `1.5px solid ${T.border}`, outline: 'none', color: T.ink,
                boxSizing: 'border-box', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.currentTarget.style.borderColor = T.navy}
              onBlur={e => e.currentTarget.style.borderColor = T.border}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: T.inkMuted, fontFamily: font, marginRight: 4 }}>⚙ Category:</span>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: font, cursor: 'pointer',
                  border: `1.5px solid ${cat === c ? T.navy : T.border}`,
                  background: cat === c ? T.navy : 'transparent',
                  color: cat === c ? 'white' : T.inkMuted,
                  transition: 'all 0.15s',
                }}
              >{c}</button>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: 12, color: T.inkFaint, fontFamily: font }}>
              {filtered.length} of {tenders.length} tenders
            </span>
          </div>
        </div>

        {/* Tender Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((t, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 16, padding: '24px 28px', border: `1px solid ${T.border}`,
              transition: 'all 0.25s', boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 36px ${T.navy}10`; e.currentTarget.style.borderColor = `${T.navy}25`; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = T.border; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12, alignItems: 'center' }}>
                    <span style={{ fontFamily: fontMono, fontSize: 11, fontWeight: 700, color: T.navy, background: `${T.navy}10`, padding: '3px 10px', borderRadius: 6, border: `1px solid ${T.navy}20` }}>{t.ref}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: T.emerald, background: '#f0fdf4', padding: '3px 10px', borderRadius: 6, border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.emerald, display: 'inline-block' }} />Open
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: T.inkMuted, background: T.surfaceAlt, padding: '3px 10px', borderRadius: 6, border: `1px solid ${T.border}` }}>{t.cat}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#92400e', background: '#fef3c7', padding: '3px 10px', borderRadius: 6, border: '1px solid #fde68a' }}>Est. {t.val}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, fontFamily: font, marginBottom: 8, lineHeight: 1.4 }}>{t.title}</div>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, color: T.inkMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 6 }}>🏢 {t.org}</span>
                    <span style={{ fontSize: 13, color: T.inkMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 6 }}>📍 {t.location}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#be123c', fontFamily: font, display: 'flex', alignItems: 'center', gap: 6 }}>📅 Closing: {t.close}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
                  <button onClick={() => onSelect(t)}
                    style={{
                      padding: '9px 18px', borderRadius: 9, fontSize: 13, fontWeight: 600, fontFamily: font, cursor: 'pointer',
                      border: `1.5px solid ${T.border}`, background: 'white', color: T.ink, transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = T.navy; e.currentTarget.style.color = T.navy; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.ink; }}
                  >View Requirements</button>
                  <button
                    style={{
                      padding: '9px 18px', borderRadius: 9, fontSize: 13, fontWeight: 700, fontFamily: font, cursor: 'pointer',
                      border: 'none', background: `linear-gradient(135deg, ${T.navy}, ${T.navyLight})`, color: 'white',
                      boxShadow: `0 4px 12px ${T.navy}30`, transition: 'all 0.2s',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                  >Submit Bid →</button>
                </div>
              </div>

              <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: T.inkFaint, fontFamily: font }}>
                <span style={{ color: T.emerald }}>✅</span>
                Eligible for instant GSTIN, Udyam & PAN statutory auto-verification · Standard Two-Cover Bid
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── TRUST SECTION ──────────────────────────────────────────── */
const TrustSection: React.FC = () => (
  <section id="trust" style={{ padding: '96px 24px', background: 'white' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <Badge label="Institutional Governance" color={T.navy} bg={`${T.navy}10`} />
        <h2 style={{ fontFamily: fontSerif, fontSize: 40, fontWeight: 700, color: T.ink, margin: '20px 0 16px', letterSpacing: '-0.02em' }}>
          Upholding integrity, accountability and transparency.
        </h2>
        <p style={{ fontFamily: font, fontSize: 17, color: T.inkMuted, maxWidth: 520, margin: '0 auto' }}>
          Public procurement requires unwavering trust. Our platform is engineered around statutory compliance and human-in-the-loop governance.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginBottom: 40 }}>
        {[
          { icon: '📋', color: T.navy, title: 'Evidence-Based Verification', desc: 'Every compliance indicator links to primary statutory registries (GSTN, CBDT, MSME) or exact page citations. No black-box inferences.', points: ['Direct statutory API cross-referencing', 'Deterministic document clause verification', 'Zero hallucinated compliance flags'] },
          { icon: '👤', color: T.teal, title: 'Human Oversight is Absolute', desc: 'AI operates strictly as a decision-support copilot. All recommendations must be reviewed and signed off by authorized Evaluation Committees.', points: ['Officers retain final discretion always', 'Committee overrides recorded with justifications', 'Full alignment with GFR 2017 Rule 173'] },
          { icon: '📁', color: T.emerald, title: 'Immutable Audit Trails', desc: 'Tamper-evident chronological logs document every verification step, AI analysis, and officer rationale for CAG and CVC scrutiny.', points: ['End-to-end cryptographic logging', 'Exportable dossiers for CAG & CVC', 'Standardised compliance reporting archives'] },
        ].map(({ icon, color, title, desc, points }, i) => (
          <div key={i} style={{
            borderRadius: 20, padding: '36px', border: `1px solid ${T.border}`,
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 48px ${color}12`; e.currentTarget.style.borderColor = `${color}25`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 20 }}>{icon}</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color, textTransform: 'uppercase', fontFamily: font, marginBottom: 8 }}>Pillar</div>
            <div style={{ fontSize: 19, fontWeight: 700, color: T.ink, fontFamily: fontSerif, marginBottom: 12, lineHeight: 1.3 }}>{title}</div>
            <p style={{ fontSize: 13, color: T.inkMuted, fontFamily: font, lineHeight: 1.7, marginBottom: 18 }}>{desc}</p>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
              {points.map((pt, j) => (
                <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'start', padding: '5px 0', fontSize: 12, color: T.inkMuted, fontFamily: font }}>
                  <span style={{ color, fontWeight: 700, marginTop: 1 }}>•</span>{pt}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Security badge bar */}
      <div style={{
        background: T.surfaceAlt, borderRadius: 14, border: `1px solid ${T.border}`, padding: '18px 28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>🔒</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: font }}>Statutory Standards & Information Security</div>
            <div style={{ fontSize: 12, color: T.inkMuted, fontFamily: font }}>MeitY-empaneled sovereign data centers · AES-256 at rest · TLS 1.3 in transit</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {['CERT-In Compliant', 'NIC Infrastructure', 'ISO 27001 Aligned', 'Parichay SSO'].map(l => (
            <span key={l} style={{ fontSize: 11, fontWeight: 700, color: T.navy, background: `${T.navy}10`, padding: '5px 12px', borderRadius: 20, fontFamily: font }}>✓ {l}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─── FINAL CTA ──────────────────────────────────────────────── */
interface FinalCTAProps { onExplore: () => void; onLogin: () => void; }
const FinalCTA: React.FC<FinalCTAProps> = ({ onExplore, onLogin }) => (
  <section style={{ padding: '96px 24px', background: `linear-gradient(160deg, ${T.navy} 0%, ${T.navyDark} 100%)`, position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', right: -200, top: -200, width: 800, height: 800, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
      <Badge label="National E-Procurement Modernization" color="rgba(255,255,255,0.8)" bg="rgba(255,255,255,0.08)" />
      <h2 style={{ fontFamily: fontSerif, fontSize: 48, fontWeight: 700, color: 'white', margin: '28px 0 20px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
        Make procurement simpler, faster and more transparent.
      </h2>
      <p style={{ fontFamily: font, fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 600, margin: '0 auto 44px', lineHeight: 1.7 }}>
        Join central ministries, CPSEs, and verified suppliers across India in setting the benchmark for evidence-backed, automated bid verification.
      </p>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 48 }}>
        <button onClick={onExplore}
          style={{
            padding: '15px 32px', borderRadius: 12, fontSize: 15, fontWeight: 800, fontFamily: font, cursor: 'pointer',
            background: 'white', border: 'none', color: T.navy,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)'; }}
        >📋 Explore Active Tenders →</button>

        <button onClick={onLogin}
          style={{
            padding: '15px 32px', borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: font, cursor: 'pointer',
            background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', color: 'white',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
        >🔒 Officer Login</button>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 28, display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
        {['GFR 2017 Compliant', 'Sovereign Data Residency', 'Parichay SSO Auth', 'CERT-In Guidelines'].map(l => (
          <span key={l} style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontFamily: font, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.emerald, display: 'inline-block' }} />{l}
          </span>
        ))}
      </div>
    </div>
  </section>
);

/* ─── FOOTER ─────────────────────────────────────────────────── */
const Footer: React.FC = () => (
  <footer style={{ background: '#0f172a', color: '#94a3b8', fontFamily: font }}>
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1280, margin: '0 auto' }}>
      <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: T.emerald, display: 'inline-block' }} />
        <strong style={{ color: '#e2e8f0' }}>Helpdesk: 1800-419-3436</strong> | Mon–Sat 9:00 AM – 6:00 PM IST
      </span>
      <span style={{ fontSize: 11 }}>📧 support-gem-ai@gov.in</span>
    </div>

    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg, ${T.navy}, ${T.navyLight})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 800 }}>G</div>
            <span style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>GeM AI Portal</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: '#64748b', maxWidth: 280 }}>
            AI-Powered Integrated Bid Compliance Verification Platform for public procurement under Government of India's procurement reform initiative.
          </p>
          <p style={{ fontSize: 11, color: '#475569', marginTop: 12 }}>
            Department of Commerce<br />Ministry of Commerce & Industry
          </p>
        </div>

        {[
          { heading: 'For Bidders', links: ['Search Tenders', 'Bid Guidelines', 'MSME Exemptions', 'Pre-Submission Checklist', 'Udyam Registration'] },
          { heading: 'For Officers', links: ['Evaluation Workflow', 'AI Compliance Matrix', 'GFR 2017 Reference', 'Audit Trail Records', 'Committee Portal'] },
          { heading: 'Information', links: ['Terms of Use', 'Privacy Policy', 'Accessibility', 'Disclaimers', 'Hyperlinking Policy'] },
        ].map(({ heading, links }) => (
          <div key={heading}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 16 }}>{heading}</div>
            {links.map(l => (
              <a key={l} href="#" style={{ display: 'block', fontSize: 13, color: '#64748b', padding: '5px 0', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
              >{l}</a>
            ))}
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#475569' }}>
        <span>🇮🇳 भारत सरकार | Government of India · GeM AI Tender Evaluation Portal</span>
        <span>Last Updated: 04 Sep 2026</span>
        <span>© 2026 GeM AI Portal. All rights reserved.</span>
      </div>
    </div>
  </footer>
);

/* ─── MODALS ─────────────────────────────────────────────────── */
const OfficerLoginModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div onClick={onClose} style={{
    position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,23,42,0.6)',
    backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    animation: 'fadeIn 0.2s ease',
  }}>
    <div onClick={e => e.stopPropagation()} style={{
      background: 'white', borderRadius: 20, width: '100%', maxWidth: 440, overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
      animation: 'slideUp 0.25s ease',
    }}>
      <div style={{ background: `linear-gradient(135deg, ${T.navy}, ${T.navyLight})`, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontFamily: font, marginBottom: 4 }}>Secure Government Access</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'white', fontFamily: fontSerif }}>Officer Authentication</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: font, marginTop: 4 }}>Tender Evaluation Committee Access</div>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', width: 32, height: 32, borderRadius: 8, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
      </div>

      <div style={{ padding: '24px 28px' }}>
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 10, marginBottom: 20 }}>
          <span>🔒</span>
          <span style={{ fontSize: 12, color: '#1e40af', fontFamily: font }}>Authorized Government & PSU Officers only. Multi-factor Parichay SSO authentication enforced.</span>
        </div>

        {[['Official Gov / PSU Email ID', 'eval.officer@cpcl.gov.in'], ['Department & Role Designation', 'Chief Procurement Manager — Mechanical']].map(([label, val]) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.inkMuted, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: font, marginBottom: 6 }}>{label}</label>
            <input readOnly defaultValue={val} style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 9, fontSize: 14, fontFamily: font, color: T.ink, background: T.surfaceAlt, boxSizing: 'border-box' }} />
          </div>
        ))}

        <button
          onClick={() => { alert('Officer Authentication Successful! Redirecting to Evaluation Workspace…'); onClose(); }}
          style={{
            width: '100%', padding: '13px', borderRadius: 10, fontSize: 14, fontWeight: 800, fontFamily: font,
            background: `linear-gradient(135deg, ${T.navy}, ${T.navyLight})`, border: 'none', color: 'white', cursor: 'pointer',
            boxShadow: `0 8px 24px ${T.navy}35`, marginTop: 4, transition: 'all 0.2s',
          }}
        >🔒 Authenticate via Parichay SSO</button>

        <p style={{ fontSize: 11, textAlign: 'center', color: T.inkFaint, fontFamily: font, marginTop: 14 }}>Secured by NIC · GFR 2017 Audited · CERT-In Compliant</p>
      </div>
    </div>
  </div>
);

const TenderDetailModal: React.FC<{ tender: typeof tenders[0]; onClose: () => void }> = ({ tender, onClose }) => (
  <div onClick={onClose} style={{
    position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,23,42,0.6)',
    backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
  }}>
    <div onClick={e => e.stopPropagation()} style={{
      background: 'white', borderRadius: 20, width: '100%', maxWidth: 640, overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.25)', maxHeight: '85vh', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ background: '#0f172a', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexShrink: 0 }}>
        <div>
          <span style={{ fontFamily: fontMono, fontSize: 10, color: T.tealLight, fontWeight: 700 }}>{tender.ref}</span>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'white', fontFamily: font, marginTop: 4, lineHeight: 1.4 }}>{tender.title}</div>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', width: 32, height: 32, borderRadius: 8, fontSize: 16, marginLeft: 16, flexShrink: 0 }}>✕</button>
      </div>

      <div style={{ padding: '20px 24px', overflowY: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20, background: T.surfaceAlt, padding: 16, borderRadius: 12, border: `1px solid ${T.border}`, fontSize: 12, fontFamily: font }}>
          <div><span style={{ color: T.inkFaint }}>Organization</span><br /><strong style={{ color: T.ink }}>{tender.org}</strong></div>
          <div><span style={{ color: T.inkFaint }}>Est. Value</span><br /><strong style={{ color: T.emerald, fontSize: 15 }}>{tender.val}</strong></div>
          <div><span style={{ color: T.inkFaint }}>Closing Date</span><br /><strong style={{ color: '#be123c' }}>{tender.close}</strong></div>
          <div><span style={{ color: T.inkFaint }}>Location</span><br /><strong style={{ color: T.ink }}>{tender.location}</strong></div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.navy, fontFamily: font, marginBottom: 12 }}>Mandatory Statutory Checklist</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            ['GST Registration & 3-Year Filings', 'Valid GSTIN with GSTR-3B filings current up to latest tax period. Zero active notices.'],
            ['Udyam Registration Certificate', 'Verified MSME status for EMD exemption under Rule 170 of GFR 2017.'],
            ['Financial Turnover & Audited Balance Sheets', 'Min. average annual turnover exceeding 30% of tender value for last 3 fiscal years.'],
            ['Make in India — Class-I / Class-II Supplier', 'Minimum 50% local value addition certificate signed by statutory auditor.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, padding: '12px 14px', borderRadius: 10, border: `1px solid ${T.border}`, alignItems: 'start' }}>
              <span style={{ color: T.emerald, fontSize: 16, marginTop: 1, flexShrink: 0 }}>✅</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: font }}>{title}</div>
                <div style={{ fontSize: 12, color: T.inkMuted, fontFamily: font, marginTop: 3 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 24px', borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'flex-end', gap: 12, flexShrink: 0 }}>
        <button onClick={onClose} style={{ padding: '9px 20px', borderRadius: 9, fontSize: 13, fontWeight: 600, fontFamily: font, border: `1.5px solid ${T.border}`, background: 'white', color: T.ink, cursor: 'pointer' }}>Close</button>
        <button onClick={() => { alert('Proceeding to Bid Submission Portal…'); onClose(); }}
          style={{ padding: '9px 20px', borderRadius: 9, fontSize: 13, fontWeight: 700, fontFamily: font, border: 'none', background: `linear-gradient(135deg, ${T.navy}, ${T.navyLight})`, color: 'white', cursor: 'pointer', boxShadow: `0 4px 16px ${T.navy}30` }}
        >Proceed to Submission →</button>
      </div>
    </div>
  </div>
);

/* ─── MAIN HOME PAGE ─────────────────────────────────────────── */
export const HomePage: React.FC = () => {
  const [officerModal, setOfficerModal] = useState(false);
  const [selectedTender, setSelectedTender] = useState<typeof tenders[0] | null>(null);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const openOfficer = () => setOfficerModal(true);
  const openTenders = () => scrollTo('tenders');

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Merriweather:ital,wght@0,400;0,700;0,900;1,300&display=swap');
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: none } }
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { outline: none; }
      `}</style>

      <TopBar />
      <Navbar onOfficerLogin={openOfficer} onExploreTenders={openTenders} />
      <HeroSection onExplore={openTenders} onLogin={openOfficer} />
      <StatsSection />
      <JourneySection onBidder={openTenders} onOfficer={openOfficer} />
      <AIProcessSection />
      <BenefitsSection />
      <ImpactSection />
      <EcosystemSection />
      <TendersSection onSelect={setSelectedTender} />
      <TrustSection />
      <FinalCTA onExplore={openTenders} onLogin={openOfficer} />
      <Footer />

      {officerModal && <OfficerLoginModal onClose={() => setOfficerModal(false)} />}
      {selectedTender && <TenderDetailModal tender={selectedTender} onClose={() => setSelectedTender(null)} />}
    </div>
  );
};

export default HomePage;
