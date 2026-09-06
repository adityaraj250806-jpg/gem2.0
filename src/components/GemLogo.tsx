import React from 'react';

interface GemLogoProps {
  size?: number;
  showText?: boolean;
  textColor?: string;
  subtextColor?: string;
  variant?: 'full' | 'icon' | 'badge';
}

/**
 * Official Government e-Marketplace (GeM) Star / Pinwheel Logo
 * Recreated with precision based on official GeM sovereign branding.
 */
export const GemLogo: React.FC<GemLogoProps> = ({
  size = 42,
  showText = false,
  textColor = '#002d62',
  subtextColor = '#475569',
  variant = 'icon',
}) => {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <defs>
        {/* Gradients for GeM Pinwheel arms */}
        <linearGradient id="gemRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="gemYellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="gemGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="gemCyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="gemIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#3730a3" />
        </linearGradient>
        <linearGradient id="gemOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        {/* Shadow filter for depth */}
        <filter id="hubShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* ── 6 Star / Kite Arms radiating from center (50, 50) ── */}

      {/* 1. Top Point (Yellow / Lime) */}
      <polygon points="50,50 42,34 49,12 59,32" fill="url(#gemYellow)" />

      {/* 2. Top-Right Point (Green) */}
      <polygon points="50,50 59,32 82,27 68,46" fill="url(#gemGreen)" />

      {/* 3. Bottom-Right Point (Cyan / Sky Blue) */}
      <polygon points="50,50 68,46 83,67 59,62" fill="url(#gemCyan)" />

      {/* 4. Bottom Point (Indigo / Violet) */}
      <polygon points="50,50 59,62 48,88 39,66" fill="url(#gemIndigo)" />

      {/* 5. Bottom-Left Point (Warm Orange) */}
      <polygon points="50,50 39,66 16,66 31,48" fill="url(#gemOrange)" />

      {/* 6. Top-Left Point (Red / Coral) */}
      <polygon points="50,50 31,48 16,26 42,34" fill="url(#gemRed)" />

      {/* ── Floating Accent Wings / Chevrons (Signature GeM Feature) ── */}
      {/* Right Orange Dart */}
      <polygon points="76,46 92,49 80,56 82,50" fill="#f97316" />

      {/* Top-Left Blue Wedge */}
      <polygon points="30,22 40,28 34,34" fill="#2563eb" opacity="0.9" />

      {/* Bottom-Left Lime Wedge */}
      <polygon points="28,70 36,76 30,82" fill="#a3e635" opacity="0.9" />

      {/* ── Center Translucent Frosted Glass Hub ── */}
      <circle
        cx="50"
        cy="50"
        r="14"
        fill="rgba(255, 255, 255, 0.65)"
        stroke="rgba(255, 255, 255, 0.85)"
        strokeWidth="1.2"
        filter="url(#hubShadow)"
      />
      {/* Subtle inner pinwheel hint in center */}
      <circle cx="50" cy="50" r="4" fill="rgba(11, 61, 145, 0.25)" />
    </svg>
  );

  if (variant === 'icon' && !showText) {
    return icon;
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, userSelect: 'none' }}>
      {icon}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}>
            <span style={{ fontSize: size * 0.44, fontWeight: 900, color: textColor, letterSpacing: '-0.02em', fontFamily: `'Noto Sans', sans-serif` }}>
              Gemx<span style={{ color: '#f37021' }}>AI</span>
            </span>
          </div>

          <div style={{ fontSize: size * 0.21, color: subtextColor, fontWeight: 600, letterSpacing: '0.02em', marginTop: 3, fontFamily: `'Noto Sans', sans-serif` }}>
            Government e Marketplace
          </div>

          {/* Dual-color Tricolor Bar from 3rd screenshot */}
          <div style={{ display: 'flex', height: 2, width: '100%', marginTop: 3, borderRadius: 1, overflow: 'hidden' }}>
            <div style={{ flex: 1, background: '#f37021' }} />
            <div style={{ flex: 1, background: '#16a34a' }} />
          </div>

          <div style={{ fontSize: size * 0.17, color: '#64748b', fontWeight: 600, letterSpacing: '0.05em', marginTop: 2, fontFamily: `'Noto Sans', sans-serif` }}>
            Efficient • Transparent • Inclusive
          </div>
        </div>
      )}
    </div>
  );
};

export default GemLogo;
