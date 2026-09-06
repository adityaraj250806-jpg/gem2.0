import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ROLES } from '../services/authService';
import { GemLogo } from './GemLogo';

/* ─── GeM PORTAL-INSPIRED DESIGN TOKENS ────────────────────────── */
const T = {
  // GeM Signature Orange / Saffron
  orange: '#f37021',
  orangeDark: '#d95400',
  orangeLight: '#ff8c38',
  orangeSubtle: '#fff7ed',
  orangeBorder: '#fed7aa',

  // Sovereign Indian Green
  green: '#138808',
  greenLight: '#16a34a',
  greenSubtle: '#f0fdf4',
  greenBorder: '#bbf7d0',
  greenDark: '#0f6b2a',

  // Sovereign Navy Anchors
  navy: '#002d62',
  navyDark: '#051937',
  navyLight: '#0b3d91',
  navySubtle: '#eff6ff',

  // Supporting Accents
  amber: '#d97706',
  amberSubtle: '#fffbeb',
  crimson: '#dc2626',
  crimsonSubtle: '#fef2f2',
  teal: '#0891b2',

  // Slate Neutrals
  ink: '#0f172a',
  inkMuted: '#475569',
  inkFaint: '#94a3b8',
  white: '#ffffff',
  surfaceAlt: '#f8fafc',
  surfaceWarm: '#fffaf5',
  border: '#e2e8f0',
  borderStrong: '#cbd5e1',
};

// Official UIDAI Government Typeface (Noto Sans)
const font = `'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
const fontHead = `'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
const fontMono = `'JetBrains Mono', monospace`;

/* ─── HELPER COMPONENTS ──────────────────────────────────────── */

interface BadgeProps { label: string; color?: string; bg?: string; borderColor?: string; }
const Badge: React.FC<BadgeProps> = ({ label, color = T.orange, bg = T.orangeSubtle, borderColor = T.orangeBorder }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '4px 14px', borderRadius: 999, fontSize: 11,
    fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
    color, background: bg, border: `1px solid ${borderColor}`, fontFamily: font,
  }}>
    {label}
  </span>
);

/* ─── TOP GOVERNMENT BAR WITH SOVEREIGN TRICOLOR ─────────────── */
const TopBar: React.FC = () => (
  <>
    <div style={{
      background: T.navyDark, color: '#cbd5e1', fontSize: 11,
      fontFamily: font, fontWeight: 500, letterSpacing: '0.03em',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '7px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13 }}>🇮🇳</span>
          <span style={{ color: '#ffffff', fontWeight: 700 }}>Government of India</span>
          <span style={{ color: '#475569' }}>|</span>
          <span style={{ color: '#f8fafc' }}>भारत सरकार</span>
          <span style={{ color: '#475569' }}>|</span>
          <span style={{ color: '#94a3b8' }}>GeM Public Procurement Modernization</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {['हिन्दी', 'Accessibility', 'Helpdesk: 1800-419-3436', 'GFR 2017 & CPPP'].map((item, i) => (
            <span key={i} style={{ cursor: 'pointer', color: '#94a3b8', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >{item}</span>
          ))}
        </span>
      </div>
    </div>
    {/* Sovereign 3px Tricolor Accent Ribbon */}
    <div style={{
      height: 3,
      width: '100%',
      background: `linear-gradient(90deg, ${T.orange} 0%, ${T.orange} 33.33%, #ffffff 33.33%, #ffffff 66.66%, ${T.green} 66.66%, ${T.green} 100%)`,
    }} />
  </>
);

/* ─── NAVIGATION ─────────────────────────────────────────────── */
interface NavProps { onOfficerLogin: () => void; onExploreTenders: () => void; onPortalLogin: () => void; }
const Navbar: React.FC<NavProps> = ({ onOfficerLogin, onExploreTenders, onPortalLogin }) => {
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
      background: scrolled ? 'rgba(255,255,255,0.98)' : '#ffffff',
      borderBottom: `1px solid ${T.border}`,
      boxShadow: scrolled ? '0 4px 20px rgba(0,45,98,0.08)' : 'none',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 24px',
        height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Brand with 3rd screenshot official GeM star logo */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <GemLogo size={46} showText textColor={T.navy} />
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {[
            { label: 'Live Tenders', id: 'tenders' },
            { label: 'Bidder Workspace', id: 'journeys' },
            { label: 'Officer Console', id: 'journeys' },
            { label: 'AI Process', id: 'how-it-works' },
            { label: 'Sovereign Trust', id: 'trust' },
          ].map(({ label, id }) => (
            <button key={label} onClick={() => scrollTo(id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                color: T.inkMuted, fontFamily: font, transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = T.orange; e.currentTarget.style.background = T.orangeSubtle; }}
              onMouseLeave={e => { e.currentTarget.style.color = T.inkMuted; e.currentTarget.style.background = 'none'; }}
            >{label}</button>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onPortalLogin}
            style={{
              background: 'none', border: `1.5px solid ${T.border}`, cursor: 'pointer',
              padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700,
              color: T.ink, fontFamily: font, transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.orange; e.currentTarget.style.color = T.orange; e.currentTarget.style.background = T.orangeSubtle; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.ink; e.currentTarget.style.background = 'none'; }}
          >Portal Login</button>

          <button onClick={onExploreTenders}
            style={{
              background: T.greenSubtle, border: `1.5px solid ${T.greenBorder}`, cursor: 'pointer',
              padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700,
              color: T.green, fontFamily: font, transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#dcfce7'; e.currentTarget.style.borderColor = T.green; }}
            onMouseLeave={e => { e.currentTarget.style.background = T.greenSubtle; e.currentTarget.style.borderColor = T.greenBorder; }}
          >View Tenders</button>

          {/* Officer Login: Directly navigates to Login Page in Officer mode (2nd ss) */}
          <button onClick={onOfficerLogin}
            style={{
              background: `linear-gradient(135deg, ${T.orange} 0%, ${T.orangeDark} 100%)`,
              border: 'none', cursor: 'pointer',
              padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 800,
              color: 'white', fontFamily: font, transition: 'all 0.2s',
              boxShadow: `0 4px 14px ${T.orange}40`,
              display: 'flex', alignItems: 'center', gap: 6,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${T.orange}55`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 4px 14px ${T.orange}40`; }}
          >
            <span>🛡️</span>
            <span>Officer Login →</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

/* ─── HERO SECTION ───────────────────────────────────────────── */
interface HeroProps { onExplore: () => void; onLogin: () => void; }
const HeroSection: React.FC<HeroProps> = ({ onExplore, onLogin }) => (
  <section style={{
    background: `linear-gradient(165deg, #ffffff 0%, #fff9f3 40%, #f0fdf4 100%)`,
    padding: '84px 24px 76px',
    position: 'relative', overflow: 'hidden',
    borderBottom: `1px solid ${T.border}`,
  }}>
    {/* Decorative warm aura */}
    <div style={{
      position: 'absolute', right: -140, top: -100,
      width: 650, height: 650, borderRadius: '50%',
      background: `radial-gradient(circle, ${T.orange}12 0%, transparent 70%)`,
      pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute', left: -80, bottom: -60,
      width: 500, height: 500, borderRadius: '50%',
      background: `radial-gradient(circle, ${T.green}10 0%, transparent 70%)`,
      pointerEvents: 'none',
    }} />

    <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 56, alignItems: 'center' }}>

        {/* LEFT COLUMN */}
        <div>
          <div style={{ marginBottom: 20 }}>
            <Badge
              label="Government e-Marketplace (GeM) Standards · GFR 2017 Compliant"
              color={T.orange}
              bg={T.orangeSubtle}
              borderColor={T.orangeBorder}
            />
          </div>

          <h1 style={{
            fontFamily: fontHead, fontSize: 48, fontWeight: 900, lineHeight: 1.15,
            color: T.ink, margin: '0 0 20px', letterSpacing: '-0.025em',
          }}>
            Forensic AI tender verification for{' '}
            <span style={{
              background: `linear-gradient(135deg, ${T.orange} 0%, ${T.navy} 55%, ${T.green} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Indian public procurement.</span>
          </h1>

          <p style={{
            fontFamily: font, fontSize: 16, color: T.inkMuted, lineHeight: 1.7,
            margin: '0 0 30px', maxWidth: 520,
          }}>
            <strong>GemxAI</strong> automates multi-point compliance verification across GSTN, PAN, MSME Udyam Databank, and Technical BOQs. Helping procurement officers eliminate tender fraud and helping verified bidders submit winning dossiers.
          </p>

          {/* Trust chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 34 }}>
            {[
              { icon: '✓', label: 'GST & PAN Live API' },
              { icon: '✓', label: 'MSME Udyam Verified' },
              { icon: '✓', label: 'Make in India (PPO 2017)' },
              { icon: '✓', label: 'CVC Audit-Ready Dossier' },
            ].map(({ icon, label }) => (
              <span key={label} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800,
                color: T.green, background: T.greenSubtle, border: `1px solid ${T.greenBorder}`,
                fontFamily: font,
              }}>
                <span style={{ color: T.green }}>{icon}</span>
                {label}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 14 }}>
            <button onClick={onExplore}
              style={{
                background: `linear-gradient(135deg, ${T.orange} 0%, ${T.orangeDark} 100%)`,
                color: 'white', border: 'none', cursor: 'pointer',
                padding: '14px 28px', borderRadius: 10, fontSize: 14, fontWeight: 800,
                fontFamily: font, boxShadow: `0 8px 24px ${T.orange}40`,
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 30px ${T.orange}55`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 8px 24px ${T.orange}40`; }}
            >
              <span>📋</span>
              <span>Explore Active Tenders</span>
              <span>→</span>
            </button>

            <button onClick={onLogin}
              style={{
                background: 'white', border: `1.5px solid ${T.navy}`,
                color: T.navy, cursor: 'pointer',
                padding: '14px 26px', borderRadius: 10, fontSize: 14, fontWeight: 800,
                fontFamily: font, boxShadow: '0 2px 8px rgba(0,45,98,0.06)',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = T.navySubtle; e.currentTarget.style.borderColor = T.navy; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
            >
              <span>🛡️</span>
              <span>Officer Evaluation Console</span>
            </button>
          </div>

          <p style={{ fontFamily: font, fontSize: 12, color: T.inkFaint, marginTop: 22, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: T.green }}>🔒</span>
            MeitY-Empaneled Sovereign Infrastructure · 256-Bit SSL Encrypted · GFR 2017 Rule 144
          </p>
        </div>

        {/* RIGHT COLUMN — Browser UI Mockup */}
        <div style={{ position: 'relative' }}>
          {/* Floating badge 1: GeM Orange AI Engine */}
          <div style={{
            position: 'absolute', top: -16, right: -12, zIndex: 10,
            background: 'white', borderRadius: 12, padding: '10px 16px',
            boxShadow: '0 8px 30px rgba(243,112,33,0.18)', border: `1.5px solid ${T.orangeBorder}`,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <GemLogo size={28} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: T.orange, fontFamily: font }}>GemxAI Engine</div>
              <div style={{ fontSize: 10, color: T.inkMuted, fontFamily: font }}>6 Registries Cross-Checked</div>
            </div>
          </div>

          {/* Floating badge 2: Sovereign Green Score */}
          <div style={{
            position: 'absolute', bottom: -18, left: -16, zIndex: 10,
            background: 'white', borderRadius: 12, padding: '10px 16px',
            boxShadow: '0 8px 30px rgba(19,136,8,0.18)', border: `1.5px solid ${T.greenBorder}`,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: T.greenSubtle, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              ✅
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: T.green, fontFamily: font }}>Compliance Score: 82/100</div>
              <div style={{ fontSize: 10, color: T.inkMuted, fontFamily: font }}>Low Risk · 96% AI Confidence</div>
            </div>
          </div>

          {/* Main Simulated Browser Card */}
          <div style={{
            background: 'white', borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,45,98,0.12), 0 4px 16px rgba(0,0,0,0.04)',
            border: `1px solid ${T.border}`,
          }}>
            {/* Browser top title bar */}
            <div style={{ background: '#f8fafc', borderBottom: `1px solid ${T.border}`, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: T.orange, display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: T.green, display: 'inline-block' }} />
              <div style={{ flex: 1, margin: '0 10px', background: 'white', borderRadius: 6, padding: '4px 12px', fontSize: 11, color: T.inkMuted, fontFamily: fontMono, border: `1px solid ${T.border}` }}>
                gemx-ai.gov.in/tenders/CPCL-2026-TE-045/verification
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: '22px 24px' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', color: T.orange, fontFamily: font, textTransform: 'uppercase', marginBottom: 3 }}>
                    Tender Reference: CPCL/2026/TE/045
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: T.ink, fontFamily: fontHead }}>
                    Supply of High Pressure API 6D Valves
                  </div>
                  <div style={{ fontSize: 11, color: T.inkMuted, fontFamily: font, marginTop: 2 }}>
                    Chennai Petroleum Corporation Limited (CPCL) · Est. ₹8.45 Cr
                  </div>
                </div>
                <span style={{
                  padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, fontFamily: font,
                  color: T.orange, background: T.orangeSubtle, border: `1px solid ${T.orangeBorder}`,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  ⏳ Under Review
                </span>
              </div>

              {/* Bidder Profile */}
              <div style={{ background: T.surfaceWarm, borderRadius: 10, padding: '12px 14px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px solid ${T.orangeBorder}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: T.orange, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 }}>
                    ABC
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: T.ink, fontFamily: fontHead }}>ABC Engineering Ltd</div>
                    <div style={{ fontSize: 11, color: T.inkMuted, fontFamily: font }}>Class-I Local Supplier · Udyam-TN-02-0045892</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: T.inkFaint, fontFamily: font, textTransform: 'uppercase', fontWeight: 700 }}>Statutory Files</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: T.green, fontFamily: fontMono }}>10 / 10 Verified</div>
                </div>
              </div>

              {/* Progress Meter */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: T.inkMuted, fontFamily: font, fontWeight: 600 }}>10-Stage Forensic Check: Stage 9 of 10</span>
                  <span style={{ fontSize: 11, color: T.orange, fontFamily: fontMono, fontWeight: 800 }}>90%</span>
                </div>
                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '90%', background: `linear-gradient(90deg, ${T.orange} 0%, ${T.green} 100%)`, borderRadius: 999 }} />
                </div>
              </div>

              {/* Compliance Badges Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 16 }}>
                {[
                  { label: 'GSTN (Active)', status: 'Active 24M', ok: true },
                  { label: 'Udyam Databank', status: 'Class-I MSME', ok: true },
                  { label: 'CBDT / 3Y ITR', status: 'Filed', ok: true },
                  { label: 'EPFO & ESIC', status: '142 Workers', ok: true },
                  { label: 'Debarment CVC', status: 'Clean Record', ok: true },
                  { label: 'MII vs BOQ', status: 'Inconsistency', ok: false },
                ].map(({ label, status, ok }) => (
                  <div key={label} style={{
                    padding: '6px 8px', borderRadius: 7, fontSize: 10, fontFamily: font,
                    background: ok ? T.greenSubtle : T.orangeSubtle,
                    border: `1px solid ${ok ? T.greenBorder : T.orangeBorder}`,
                    display: 'flex', flexDirection: 'column', gap: 2,
                    color: ok ? T.green : T.orange,
                  }}>
                    <span style={{ fontWeight: 800 }}>{label}</span>
                    <span style={{ fontSize: 9, opacity: 0.85 }}>{ok ? '✓' : '⚠'} {status}</span>
                  </div>
                ))}
              </div>

              {/* Action Button that goes to login/officer console */}
              <button
                onClick={onLogin}
                style={{
                  width: '100%', padding: '11px', borderRadius: 10,
                  background: `linear-gradient(135deg, ${T.navy}, ${T.navyLight})`,
                  border: 'none',
                  color: 'white', fontWeight: 800, fontSize: 13, fontFamily: font, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: `0 4px 14px ${T.navy}35`,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
              >
                <span>🔍</span>
                <span>Open Forensic Evidence & Scorecard</span>
                <span>→</span>
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
  <section style={{ background: T.navy, padding: '52px 24px', borderBottom: `3px solid ${T.orange}` }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
        {[
          { val: '60–80%', valColor: T.orangeLight, label: 'Faster Technical Evaluation', sub: 'Reduces weeks of manual document checks to minutes' },
          { val: '10+', valColor: '#4ade80', label: 'Government Registries Verified', sub: 'GSTN, CBDT, MSME Udyam, EPFO, ESIC & MCA21' },
          { val: '₹450+ Cr', valColor: T.orangeLight, label: 'PSU Procurement Analyzed', sub: 'CPCL, IOCL, ONGC, GAIL & Central Departments' },
          { val: '100%', valColor: '#4ade80', label: 'GFR 2017 & CVC Auditable', sub: 'Officers retain sovereign authority with signed DSC' },
        ].map(({ val, valColor, label, sub }, i) => (
          <div key={i} style={{
            padding: '24px 32px',
            borderRight: i < 3 ? `1px solid rgba(255,255,255,0.12)` : 'none',
          }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: valColor, fontFamily: fontHead, lineHeight: 1, marginBottom: 8, letterSpacing: '-0.02em' }}>
              {val}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#ffffff', fontFamily: font, marginBottom: 4 }}>
              {label}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', fontFamily: font, lineHeight: 1.5 }}>
              {sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── DUAL WORKSPACE JOURNEY (BIDDER vs OFFICER) ─────────────── */
interface JourneyProps { onBidder: () => void; onOfficer: () => void; }
const JourneySection: React.FC<JourneyProps> = ({ onBidder, onOfficer }) => (
  <section id="journeys" style={{ padding: '90px 24px', background: '#ffffff' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <Badge label="Integrated Procurement Ecosystem" color={T.navy} bg={T.navySubtle} borderColor="#bfdbfe" />
        <h2 style={{ fontFamily: fontHead, fontSize: 38, fontWeight: 900, color: T.ink, margin: '16px 0 12px', letterSpacing: '-0.025em' }}>
          Tailored Workspaces for Bidders & Officers
        </h2>
        <p style={{ fontFamily: font, fontSize: 16, color: T.inkMuted, maxWidth: 580, margin: '0 auto' }}>
          Whether you are an enterprise supplier submitting compliant bids or an evaluation committee verifying statutory eligibility, GemxAI streamlines your workflow.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {/* Bidder Card — GeM Orange Accent */}
        <div style={{
          borderRadius: 20, padding: '40px', border: `1.5px solid ${T.orangeBorder}`,
          background: `linear-gradient(145deg, #ffffff 0%, ${T.surfaceWarm} 100%)`,
          boxShadow: '0 8px 30px rgba(243,112,33,0.08)',
          transition: 'all 0.3s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 16px 40px rgba(243,112,33,0.18)`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(243,112,33,0.08)'; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: T.orangeSubtle, border: `1px solid ${T.orangeBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              🏭
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: T.orange, fontFamily: font, textTransform: 'uppercase' }}>
                For Registered Suppliers & MSMEs
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: T.ink, fontFamily: fontHead }}>
                Bidder Workspace
              </div>
            </div>
          </div>

          <p style={{ fontSize: 14, color: T.inkMuted, lineHeight: 1.6, marginBottom: 20 }}>
            Prepare, validate, and track tender dossiers with real-time statutory checklist guidance before formal submission.
          </p>

          <div style={{ marginBottom: 28 }}>
            {[
              ['🔍', 'Discover PSU tenders by sector, department, and closing date'],
              ['📑', 'Review GFR eligibility criteria and mandatory statutory documents'],
              ['📤', 'Upload 10-point checklist (GST, PAN, MSME, ITR, EPFO, MII)'],
              ['🏷️', 'Receive instant cryptographic submission receipts with unique IDs'],
              ['📈', 'Real-time status tracking throughout evaluation phases'],
            ].map(([icon, text], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'start', gap: 12, padding: '9px 0', borderBottom: i < 4 ? `1px solid ${T.border}` : 'none' }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <span style={{ fontSize: 13, color: T.ink, fontFamily: font, fontWeight: 600, lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>

          <button onClick={onBidder}
            style={{
              width: '100%', padding: '14px', borderRadius: 10, fontSize: 14, fontWeight: 800, fontFamily: font,
              background: `linear-gradient(135deg, ${T.orange} 0%, ${T.orangeDark} 100%)`,
              border: 'none', color: 'white', cursor: 'pointer',
              boxShadow: `0 4px 16px ${T.orange}40`,
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 6px 20px ${T.orange}60`; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 4px 16px ${T.orange}40`; }}
          >
            <span>Explore Tenders as Bidder</span>
            <span>→</span>
          </button>
        </div>

        {/* Officer Card — Navigates directly to 2nd screenshot (LoginPage in Officer Mode) */}
        <div style={{
          borderRadius: 20, padding: '40px', border: `1.5px solid ${T.greenBorder}`,
          background: `linear-gradient(145deg, #ffffff 0%, ${T.greenSubtle} 100%)`,
          boxShadow: '0 8px 30px rgba(19,136,8,0.08)',
          transition: 'all 0.3s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 16px 40px rgba(19,136,8,0.18)`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(19,136,8,0.08)'; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: T.greenSubtle, border: `1px solid ${T.greenBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              🛡️
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: T.green, fontFamily: font, textTransform: 'uppercase' }}>
                For Procurement Officers & TEC
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: T.ink, fontFamily: fontHead }}>
                Officer Evaluation Console
              </div>
            </div>
          </div>

          <p style={{ fontSize: 14, color: T.inkMuted, lineHeight: 1.6, marginBottom: 20 }}>
            Verify statutory returns, detect forensic inconsistencies, and execute committee decisions with digital signature token signing.
          </p>

          <div style={{ marginBottom: 28 }}>
            {[
              ['📋', 'Tender-wide overview of active bids, document counts, and statuses'],
              ['🤖', 'On-demand officer-initiated 10-stage forensic AI verification'],
              ['🔍', 'Side-by-side evidence viewer (Make-in-India vs BOQ triangulation)'],
              ['📊', '13-point statutory compliance scorecard and anomaly detector'],
              ['✍️', 'Human-in-the-loop decision recording (Qualify, Reject, Clarify)'],
            ].map(([icon, text], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'start', gap: 12, padding: '9px 0', borderBottom: i < 4 ? `1px solid ${T.border}` : 'none' }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <span style={{ fontSize: 13, color: T.ink, fontFamily: font, fontWeight: 600, lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>

          <button onClick={onOfficer}
            style={{
              width: '100%', padding: '14px', borderRadius: 10, fontSize: 14, fontWeight: 800, fontFamily: font,
              background: `linear-gradient(135deg, ${T.navy} 0%, ${T.navyLight} 100%)`,
              border: 'none', color: 'white', cursor: 'pointer',
              boxShadow: `0 4px 16px ${T.navy}35`,
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 6px 20px ${T.navy}55`; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 4px 16px ${T.navy}35`; }}
          >
            <span>Enter Officer Console</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  </section>
);

/* ─── 6-STEP AI PROCESS PIPELINE ─────────────────────────────── */
const AIProcessSection: React.FC = () => {
  const steps = [
    { num: '01', icon: '📥', title: 'Document Ingestion', desc: 'Secure upload of all 10 statutory bids, affidavits, and BOQs.' },
    { num: '02', icon: '🔤', title: 'Multimodal OCR', desc: 'Text extraction, QR code checksum check, and seal authentication.' },
    { num: '03', icon: '🌐', title: 'Sovereign APIs', desc: 'Real-time cross-checking with GSTN, MCA21, CBDT, and Udyam.' },
    { num: '04', icon: '⚖️', title: 'Forensic Triangulation', desc: 'Local content claim cross-checked against imported item origins.' },
    { num: '05', icon: '📊', title: 'Scorecard & Advisory', desc: '13-point compliance matrix with low/medium/high risk tiers.' },
    { num: '06', icon: '✍️', title: 'Officer Signing', desc: 'Committee records binding verdict with DSC authorization.' },
  ];

  return (
    <section id="how-it-works" style={{ padding: '90px 24px', background: T.surfaceAlt, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Badge label="End-to-End Pipeline" color={T.green} bg={T.greenSubtle} borderColor={T.greenBorder} />
          <h2 style={{ fontFamily: fontHead, fontSize: 38, fontWeight: 900, color: T.ink, margin: '16px 0 12px', letterSpacing: '-0.025em' }}>
            From statutory documents to certified decisions.
          </h2>
          <p style={{ fontFamily: font, fontSize: 16, color: T.inkMuted, maxWidth: 600, margin: '0 auto' }}>
            A transparent, audit-ready compliance verification architecture that pairs forensic speed with statutory accountability.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, marginBottom: 36 }}>
          {steps.map(({ num, icon, title, desc }, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 16, padding: '24px 18px',
              border: `1.5px solid ${i === 3 ? T.orangeBorder : i === 4 ? T.greenBorder : T.border}`,
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              transition: 'all 0.25s',
              position: 'relative',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,45,98,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)'; }}
            >
              <div style={{ fontFamily: fontMono, fontSize: 11, fontWeight: 800, color: i < 3 ? T.orange : T.green, marginBottom: 10 }}>
                {num}
              </div>
              <div style={{ fontSize: 26, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.ink, fontFamily: fontHead, marginBottom: 6, lineHeight: 1.3 }}>
                {title}
              </div>
              <div style={{ fontSize: 11, color: T.inkMuted, fontFamily: font, lineHeight: 1.6 }}>
                {desc}
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer Box */}
        <div style={{
          background: '#ffffff', border: `1.5px solid ${T.orangeBorder}`, borderRadius: 12, padding: '16px 24px',
          display: 'flex', alignItems: 'center', gap: 16, maxWidth: 940, margin: '0 auto',
          boxShadow: '0 2px 8px rgba(243,112,33,0.06)',
        }}>
          <span style={{ fontSize: 24 }}>⚖️</span>
          <p style={{ fontFamily: font, fontSize: 13, color: '#7c2d12', fontWeight: 600, margin: 0, lineHeight: 1.6 }}>
            <strong>Human-in-the-Loop Governance Notice:</strong> Under GFR 2017 Rule 173 and CVC Procurement Guidelines, AI serves strictly as an analytical decision-support copilot. Final technical qualification or disqualification remains the exclusive statutory authority of the Procurement Officer.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── PLATFORM BENEFITS ──────────────────────────────────────── */
const BenefitsSection: React.FC = () => {
  const benefits = [
    { icon: '⚡', title: 'Instant Registry Triangulation', desc: 'Direct statutory validation against GSTN, Udyam, CBDT, and EPFO reduces evaluation cycles from 45 days to hours.', color: T.orange },
    { icon: '🎯', title: 'Cross-Document Inconsistency Detection', desc: 'AI cross-references Make-in-India declarations against component origins in Technical BOQs to uncover masked imports.', color: T.green },
    { icon: '🔍', title: 'Side-by-Side Forensic Evidence', desc: 'Officers review highlighted excerpts from statutory declarations and technical catalogs with complete source page citations.', color: T.navy },
    { icon: '⚖️', title: '13-Point Compliance Scoring', desc: 'Objective, rule-based scoring eliminates subjective bias and applies GFR 2017 criteria equally to every enterprise.', color: T.orange },
    { icon: '📜', title: 'CVC & CAG Audit-Ready Logs', desc: 'Immutable, tamper-evident audit dossiers preserve every API response, anomaly note, and officer justification.', color: T.green },
  ];

  return (
    <section id="benefits" style={{ padding: '90px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <Badge label="Core Capabilities" color={T.orange} bg={T.orangeSubtle} borderColor={T.orangeBorder} />
            <h2 style={{ fontFamily: fontHead, fontSize: 36, fontWeight: 900, color: T.ink, margin: '16px 0 14px', lineHeight: 1.25, letterSpacing: '-0.025em' }}>
              Built for integrity in government tenders.
            </h2>
            <p style={{ fontFamily: font, fontSize: 15, color: T.inkMuted, lineHeight: 1.7, margin: 0 }}>
              GemxAI brings enterprise-grade forensic precision to central PSUs and government departments, protecting public funds and fostering fair competition for domestic manufacturers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            {benefits.map(({ icon, title, desc, color }, i) => (
              <div key={i} style={{
                borderRadius: 16, padding: '24px',
                border: `1px solid ${T.border}`,
                gridColumn: i === 4 ? '1 / -1' : undefined,
                transition: 'all 0.25s',
                background: 'white',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 10px 30px ${color}15`; e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 14,
                }}>{icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.ink, fontFamily: fontHead, marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: T.inkMuted, fontFamily: font, lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── LIVE PSU TENDERS ───────────────────────────────────────── */
const tenders = [
  { ref: 'CPCL/2026/TE/045', title: 'Supply of High Pressure API 6D Gate, Globe & Check Valves', org: 'Chennai Petroleum Corporation Limited (CPCL)', cat: 'Mechanical & Flow Control', val: '₹8.45 Cr', close: '15 Sep 2026', location: 'Manali Refinery, Chennai' },
  { ref: 'IOCL/ENG/2026/088', title: 'High-Pressure Electro-Hydraulic Turbine Actuators & Control Skids', org: 'Indian Oil Corporation Limited (IOCL)', cat: 'Oil & Gas / Energy', val: '₹12.40 Cr', close: '24 Sep 2026', location: 'Panipat Refinery, Haryana' },
  { ref: 'ONGC/OFFSHORE/2026/012', title: 'Subsea Pipeline Ultrasonic Diagnostic Sensors & Telemetry System', org: 'Oil and Natural Gas Corporation (ONGC)', cat: 'Instrumentation & Telecom', val: '₹22.50 Cr', close: '30 Sep 2026', location: 'Western Offshore Basin, Mumbai' },
  { ref: 'GAIL/PIPE/2026/410', title: 'Cryogenic Gas Compressors and Pressure Regulating Skid Stations', org: 'GAIL (India) Limited', cat: 'Mechanical & Flow Control', val: '₹19.20 Cr', close: '05 Oct 2026', location: 'HVJ Pipeline Corridor, Hazira' },
];

interface TendersProps { onSelect: (t: typeof tenders[0]) => void; }
const TendersSection: React.FC<TendersProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const cats = ['All', 'Mechanical & Flow Control', 'Oil & Gas / Energy', 'Instrumentation & Telecom'];
  const filtered = tenders.filter(t =>
    (cat === 'All' || t.cat === cat) &&
    (!query || [t.ref, t.title, t.org, t.location].join(' ').toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <section id="tenders" style={{ padding: '90px 24px', background: T.surfaceAlt }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 34 }}>
          <div>
            <Badge label="Live Public Procurement" color={T.orange} bg={T.orangeSubtle} borderColor={T.orangeBorder} />
            <h2 style={{ fontFamily: fontHead, fontSize: 36, fontWeight: 900, color: T.ink, margin: '14px 0 6px', letterSpacing: '-0.025em' }}>
              Active Central PSU Tenders
            </h2>
            <p style={{ fontFamily: font, fontSize: 15, color: T.inkMuted }}>
              Tenders configured with automated statutory checklists and GFR 2017 compliance parameters.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: `1.5px solid ${T.greenBorder}`, borderRadius: 10, padding: '8px 16px', fontSize: 12, color: T.green, fontFamily: font, fontWeight: 800 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.green, display: 'inline-block' }} />
            4 Live Tenders Open
          </div>
        </div>

        {/* Search & Category Filter */}
        <div style={{ background: 'white', borderRadius: 16, padding: 20, border: `1px solid ${T.border}`, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ position: 'relative', marginBottom: 14 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
            <input
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search by tender reference ID, title, issuing PSU, or refinery..."
              style={{
                width: '100%', padding: '12px 14px 12px 42px', borderRadius: 10, fontSize: 14, fontFamily: font,
                border: `1.5px solid ${T.border}`, outline: 'none', color: T.ink,
                boxSizing: 'border-box', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.currentTarget.style.borderColor = T.orange}
              onBlur={e => e.currentTarget.style.borderColor = T.border}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: T.inkMuted, fontFamily: font, marginRight: 4 }}>Filter Category:</span>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: font, cursor: 'pointer',
                  border: `1.5px solid ${cat === c ? T.orange : T.border}`,
                  background: cat === c ? T.orange : 'transparent',
                  color: cat === c ? 'white' : T.inkMuted,
                  transition: 'all 0.15s',
                }}
              >{c}</button>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: 12, color: T.inkFaint, fontFamily: fontMono }}>
              Showing {filtered.length} of {tenders.length} tenders
            </span>
          </div>
        </div>

        {/* Tender Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map((t, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 16, padding: '24px 28px', border: `1px solid ${T.border}`,
              transition: 'all 0.25s', boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 10px 30px ${T.orange}15`; e.currentTarget.style.borderColor = T.orangeBorder; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = T.border; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10, alignItems: 'center' }}>
                    <span style={{ fontFamily: fontMono, fontSize: 12, fontWeight: 800, color: T.navy, background: T.navySubtle, padding: '3px 10px', borderRadius: 6, border: `1px solid #bfdbfe` }}>
                      {t.ref}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: T.green, background: T.greenSubtle, padding: '3px 10px', borderRadius: 6, border: `1px solid ${T.greenBorder}`, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.green, display: 'inline-block' }} />
                      OPEN FOR BIDDING
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.inkMuted, background: T.surfaceAlt, padding: '3px 10px', borderRadius: 6, border: `1px solid ${T.border}` }}>
                      {t.cat}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 900, color: T.green, background: T.greenSubtle, padding: '3px 12px', borderRadius: 6, border: `1px solid ${T.greenBorder}` }}>
                      Est. {t.val}
                    </span>
                  </div>

                  <div style={{ fontSize: 17, fontWeight: 800, color: T.ink, fontFamily: fontHead, marginBottom: 8, lineHeight: 1.4 }}>
                    {t.title}
                  </div>

                  <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, color: T.inkMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 6 }}>
                      🏢 {t.org}
                    </span>
                    <span style={{ fontSize: 13, color: T.inkMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 6 }}>
                      📍 {t.location}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#dc2626', fontFamily: font, display: 'flex', alignItems: 'center', gap: 6 }}>
                      📅 Closing: {t.close}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
                  <button onClick={() => onSelect(t)}
                    style={{
                      padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: font, cursor: 'pointer',
                      border: `1.5px solid ${T.border}`, background: 'white', color: T.ink, transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = T.navy; e.currentTarget.style.color = T.navy; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.ink; }}
                  >
                    View Specs
                  </button>
                  <button onClick={() => onSelect(t)}
                    style={{
                      padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 800, fontFamily: font, cursor: 'pointer',
                      border: 'none', background: `linear-gradient(135deg, ${T.orange} 0%, ${T.orangeDark} 100%)`, color: 'white',
                      boxShadow: `0 4px 14px ${T.orange}40`, transition: 'all 0.2s',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${T.orange}60`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 4px 14px ${T.orange}40`; }}
                  >
                    <span>Bid Now</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: T.inkMuted, fontFamily: font }}>
                <span style={{ color: T.green }}>✅</span>
                Eligible for instant GSTIN, Udyam MSME & PAN statutory verification · Two-Cover e-Tender
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── TRUST & INSTITUTIONAL GOVERNANCE ───────────────────────── */
const TrustSection: React.FC = () => (
  <section id="trust" style={{ padding: '90px 24px', background: 'white' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <Badge label="Statutory Standards" color={T.green} bg={T.greenSubtle} borderColor={T.greenBorder} />
        <h2 style={{ fontFamily: fontHead, fontSize: 38, fontWeight: 900, color: T.ink, margin: '16px 0 12px', letterSpacing: '-0.025em' }}>
          Upholding public trust, transparency & accountability.
        </h2>
        <p style={{ fontFamily: font, fontSize: 16, color: T.inkMuted, maxWidth: 540, margin: '0 auto' }}>
          Engineered to satisfy the most stringent vigilance guidelines of the Central Vigilance Commission (CVC) and Comptroller & Auditor General (CAG).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginBottom: 36 }}>
        {[
          { icon: '📜', color: T.orange, title: 'Evidence-Based Triangulation', desc: 'Every compliance check links to primary government databanks or line-item citations. Eliminates black-box assertions.' },
          { icon: '⚖️', color: T.green, title: 'Human Oversight is Absolute', desc: 'Officers retain sovereign authority under GFR Rule 173. AI flags anomalies, but officers confirm all qualification verdicts.' },
          { icon: '🔒', color: T.navy, title: 'Cryptographic Audit Trails', desc: 'Every verification step, timestamp, and officer remark is cryptographically logged for departmental vigilance inspection.' },
        ].map(({ icon, color, title, desc }, i) => (
          <div key={i} style={{
            borderRadius: 18, padding: '32px', border: `1.5px solid ${T.border}`,
            boxShadow: '0 2px 12px rgba(0,0,0,0.03)', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 36px ${color}15`; e.currentTarget.style.borderColor = color; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = T.border; }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 18 }}>
              {icon}
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: T.ink, fontFamily: fontHead, marginBottom: 10 }}>{title}</div>
            <p style={{ fontSize: 13, color: T.inkMuted, fontFamily: font, lineHeight: 1.65, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── FINAL CALL TO ACTION ───────────────────────────────────── */
interface FinalCTAProps { onExplore: () => void; onLogin: () => void; }
const FinalCTA: React.FC<FinalCTAProps> = ({ onExplore, onLogin }) => (
  <section style={{
    padding: '84px 24px',
    background: `linear-gradient(145deg, ${T.navyDark} 0%, ${T.navy} 60%, #0b3d91 100%)`,
    position: 'relative', overflow: 'hidden',
    borderTop: `4px solid ${T.orange}`,
  }}>
    <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
      <Badge label="Government e-Marketplace Modernization" color={T.orangeLight} bg="rgba(243,112,33,0.15)" borderColor="rgba(243,112,33,0.3)" />
      <h2 style={{ fontFamily: fontHead, fontSize: 42, fontWeight: 900, color: 'white', margin: '22px 0 14px', lineHeight: 1.2, letterSpacing: '-0.025em' }}>
        Smarter, faster & auditable public procurement with GemxAI.
      </h2>
      <p style={{ fontFamily: font, fontSize: 16, color: 'rgba(255,255,255,0.75)', maxWidth: 620, margin: '0 auto 34px', lineHeight: 1.7 }}>
        Join procurement officers and enterprises setting the national standard for forensic bid compliance and Make-in-India verification.
      </p>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={onExplore}
          style={{
            padding: '14px 30px', borderRadius: 10, fontSize: 14, fontWeight: 800, fontFamily: font, cursor: 'pointer',
            background: `linear-gradient(135deg, ${T.orange} 0%, ${T.orangeDark} 100%)`,
            border: 'none', color: 'white',
            boxShadow: `0 8px 24px ${T.orange}50`, transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
        >
          <span>📋</span>
          <span>Explore Open Tenders</span>
          <span>→</span>
        </button>

        <button onClick={onLogin}
          style={{
            padding: '14px 28px', borderRadius: 10, fontSize: 14, fontWeight: 800, fontFamily: font, cursor: 'pointer',
            background: 'white', border: 'none', color: T.navy,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
        >
          <span>🛡️</span>
          <span>Officer Evaluation Login</span>
        </button>
      </div>
    </div>
  </section>
);

/* ─── FOOTER WITH GemxAI SOVEREIGN BRANDING & OFFICIAL GeM STAR ── */
const Footer: React.FC = () => (
  <footer style={{ background: '#09152b', color: '#94a3b8', fontFamily: font }}>
    <div style={{
      height: 3,
      background: `linear-gradient(90deg, ${T.orange} 0%, ${T.orange} 33.33%, #ffffff 33.33%, #ffffff 66.66%, ${T.green} 66.66%, ${T.green} 100%)`,
    }} />

    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '50px 24px 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 38 }}>
        <div>
          <div style={{ marginBottom: 14 }}>
            <GemLogo size={42} showText textColor="#ffffff" subtextColor="#94a3b8" />
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: '#64748b', maxWidth: 300 }}>
            AI-Powered Forensic Bid Compliance Verification Platform designed in alignment with GeM architecture, General Financial Rules (GFR 2017), and Public Procurement Order 2017.
          </p>
          <p style={{ fontSize: 11, color: '#475569', marginTop: 12 }}>
            National Public Procurement System<br />
            Department of Commerce · Ministry of Commerce & Industry
          </p>
        </div>

        {[
          { heading: 'Bidder Workspace', links: ['Search Live Tenders', 'Statutory Document Checklist', 'Make in India Class-I Rules', 'MSME Exemption Guidelines', 'Submission Status'] },
          { heading: 'Officer Console', links: ['Tender Evaluation Rosters', '10-Stage AI Verification', 'Forensic Evidence Viewer', 'DSC Token Signing', 'CVC Audit Logs'] },
          { heading: 'Compliance', links: ['General Financial Rules 2017', 'Public Procurement Order 2017', 'NIC Security Directives', 'Terms & Privacy', 'Helpdesk: 1800-419-3436'] },
        ].map(({ heading, links }) => (
          <div key={heading}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.orange, marginBottom: 14 }}>{heading}</div>
            {links.map(l => (
              <a key={l} href="#" style={{ display: 'block', fontSize: 13, color: '#64748b', padding: '4px 0', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
              >{l}</a>
            ))}
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#475569' }}>
        <span>🇮🇳 भारत सरकार | Government of India · GemxAI Sovereign Platform</span>
        <span>© 2026 GemxAI. All rights reserved.</span>
      </div>
    </div>
  </footer>
);

/* ─── TENDER DETAILS MODAL ───────────────────────────────────── */
const TenderDetailModal: React.FC<{ tender: typeof tenders[0]; onClose: () => void; onSubmit: () => void }> = ({ tender, onClose, onSubmit }) => (
  <div onClick={onClose} style={{
    position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,23,42,0.65)',
    backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
  }}>
    <div onClick={e => e.stopPropagation()} style={{
      background: 'white', borderRadius: 20, width: '100%', maxWidth: 660, overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.25)', maxHeight: '85vh', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ background: T.navy, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexShrink: 0, borderBottom: `3px solid ${T.orange}` }}>
        <div>
          <span style={{ fontFamily: fontMono, fontSize: 11, color: T.orangeLight, fontWeight: 800 }}>{tender.ref}</span>
          <div style={{ fontSize: 17, fontWeight: 800, color: 'white', fontFamily: fontHead, marginTop: 4, lineHeight: 1.4 }}>{tender.title}</div>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', width: 32, height: 32, borderRadius: 8, fontSize: 16, marginLeft: 16 }}>✕</button>
      </div>

      <div style={{ padding: '22px 24px', overflowY: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20, background: T.surfaceWarm, padding: 16, borderRadius: 12, border: `1px solid ${T.orangeBorder}`, fontSize: 12, fontFamily: font }}>
          <div><span style={{ color: T.inkMuted, fontSize: 11, fontWeight: 600 }}>Issuing PSU / Dept</span><br /><strong style={{ color: T.ink }}>{tender.org}</strong></div>
          <div><span style={{ color: T.inkMuted, fontSize: 11, fontWeight: 600 }}>Estimated Value</span><br /><strong style={{ color: T.green, fontSize: 15, fontWeight: 900 }}>{tender.val}</strong></div>
          <div><span style={{ color: T.inkMuted, fontSize: 11, fontWeight: 600 }}>Closing Deadline</span><br /><strong style={{ color: '#dc2626' }}>{tender.close}</strong></div>
          <div><span style={{ color: T.inkMuted, fontSize: 11, fontWeight: 600 }}>Location</span><br /><strong style={{ color: T.ink }}>{tender.location}</strong></div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.orange, fontFamily: font, marginBottom: 12 }}>
          Mandatory Statutory Upload Checklist
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            ['GST Registration & GSTR-3B Tax Filings', 'Valid active GSTIN with returns filed for previous 24 consecutive months.'],
            ['Udyam Registration Certificate', 'Verified MSME enterprise classification for EMD waiver under GFR Rule 170.'],
            ['Audited Balance Sheets & CA Turnover Certificate', 'Minimum average annual turnover exceeding threshold criteria for past 3 fiscal years.'],
            ['Make in India Declaration (PPO 2017)', 'Mandatory domestic local content certificate with audited manufacturing origin breakdown.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, padding: '12px 14px', borderRadius: 10, border: `1px solid ${T.border}`, alignItems: 'start' }}>
              <span style={{ color: T.green, fontSize: 16, flexShrink: 0 }}>✅</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: T.ink, fontFamily: fontHead }}>{title}</div>
                <div style={{ fontSize: 12, color: T.inkMuted, fontFamily: font, marginTop: 2 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 24px', borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'flex-end', gap: 12, flexShrink: 0 }}>
        <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: 9, fontSize: 13, fontWeight: 700, fontFamily: font, border: `1.5px solid ${T.border}`, background: 'white', color: T.ink, cursor: 'pointer' }}>Close</button>
        <button onClick={onSubmit}
          style={{
            padding: '10px 22px', borderRadius: 9, fontSize: 13, fontWeight: 800, fontFamily: font, border: 'none',
            background: `linear-gradient(135deg, ${T.orange} 0%, ${T.orangeDark} 100%)`, color: 'white', cursor: 'pointer',
            boxShadow: `0 4px 16px ${T.orange}40`,
          }}
        >
          Proceed to Document Upload →
        </button>
      </div>
    </div>
  </div>
);

/* ─── MAIN HOME PAGE EXPORT ──────────────────────────────────── */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [selectedTender, setSelectedTender] = useState<typeof tenders[0] | null>(null);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Officer Login directly navigates to the 2nd screenshot (/login in Officer mode)
  const handleOfficerLogin = () => {
    navigate('/login?role=officer', { state: { role: ROLES.OFFICER } });
  };

  const handlePortalLogin = () => {
    navigate('/login?role=bidder', { state: { role: ROLES.BIDDER } });
  };

  const openTenders = () => scrollTo('tenders');

  const handleTenderSubmit = async () => {
    setSelectedTender(null);
    await login('tenders@abcengineering.com', 'DemoPass', ROLES.BIDDER);
    navigate('/bidder/tenders/CPCL-2026-TE-045/documents');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { outline: none; }
      `}</style>

      <TopBar />
      <Navbar onOfficerLogin={handleOfficerLogin} onExploreTenders={openTenders} onPortalLogin={handlePortalLogin} />
      <HeroSection onExplore={openTenders} onLogin={handleOfficerLogin} />
      <StatsSection />
      <JourneySection onBidder={openTenders} onOfficer={handleOfficerLogin} />
      <AIProcessSection />
      <BenefitsSection />
      <TendersSection onSelect={setSelectedTender} />
      <TrustSection />
      <FinalCTA onExplore={openTenders} onLogin={handleOfficerLogin} />
      <Footer />

      {selectedTender && <TenderDetailModal tender={selectedTender} onClose={() => setSelectedTender(null)} onSubmit={handleTenderSubmit} />}
    </div>
  );
};

export default HomePage;
