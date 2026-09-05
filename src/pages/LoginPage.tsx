import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ROLES, UserRole } from "../services/authService";
import { C, F } from "../tokens";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, showToast } = useApp();

  const [role, setRole] = useState<UserRole>(ROLES.BIDDER);
  const [username, setUsername] = useState("tenders@abcengineering.com");
  const [password, setPassword] = useState("Demo@GeM2026");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate textured captcha
  const generateCaptcha = () => {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
    setCaptchaInput(text); // auto-fill for demo convenience

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Random noise dots
    for (let i = 0; i < 65; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "#94a3b8" : "#cbd5e1";
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Strike-through security curved lines
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = i === 0 ? "#93c5fd" : "#cbd5e1";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * canvas.height);
      ctx.bezierCurveTo(
        canvas.width * 0.3, Math.random() * canvas.height,
        canvas.width * 0.7, Math.random() * canvas.height,
        canvas.width, Math.random() * canvas.height
      );
      ctx.stroke();
    }

    // Draw characters
    const startX = 14;
    const letterSpacing = 20;
    ctx.font = "bold 20px 'Courier New', monospace, sans-serif";
    ctx.textBaseline = "middle";

    for (let i = 0; i < text.length; i++) {
      ctx.save();
      const x = startX + i * letterSpacing;
      const y = canvas.height / 2 + (Math.random() * 6 - 3);
      const angle = (Math.random() * 20 - 10) * (Math.PI / 180);
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = i % 2 === 0 ? "#0f172a" : "#1e3a8a";
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, [role]);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === ROLES.OFFICER) {
      setUsername("procurement.officer@cpcl.gov.in");
      setPassword("Officer#2026");
    } else {
      setUsername("tenders@abcengineering.com");
      setPassword("Demo@GeM2026");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captchaText.toUpperCase()) {
      showToast("Invalid Captcha. Please enter the characters shown.", "danger");
      generateCaptcha();
      return;
    }

    await login(username, password, role);
    navigate(role === ROLES.OFFICER ? "/officer/dashboard" : "/bidder/dashboard");
  };

  const handleDemoLogin = async (targetRole: UserRole) => {
    const userEmail = targetRole === ROLES.OFFICER ? "procurement.officer@cpcl.gov.in" : "tenders@abcengineering.com";
    await login(userEmail, "DemoPass", targetRole);
    navigate(targetRole === ROLES.OFFICER ? "/officer/dashboard" : "/bidder/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #071f52 0%, #0b3d91 50%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        fontFamily: F.sans
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1040,
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden"
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            background: "#f8fafc",
            borderRight: "1px solid #e2e8f0",
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <span style={{ fontSize: 28 }}>🇮🇳</span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.navyDark, letterSpacing: "-0.02em" }}>
                  GeM <span style={{ color: C.teal }}>SENTINEL</span>
                </div>
                <div style={{ fontSize: 11, color: C.inkFaint, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Government e-Marketplace Verification
                </div>
              </div>
            </div>

            {/* Vector Graphic */}
            <div style={{ margin: "16px 0 24px", textAlign: "center" }}>
              <svg viewBox="0 0 460 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxHeight: 250 }}>
                <defs>
                  <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8"/>
                    <stop offset="100%" stopColor="#0284c7"/>
                  </linearGradient>
                  <linearGradient id="chairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa"/>
                    <stop offset="100%" stopColor="#2563eb"/>
                  </linearGradient>
                </defs>
                <rect x="25" y="25" width="410" height="310" rx="16" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="25" y1="95" x2="435" y2="95" stroke="#f1f5f9" strokeWidth="1.5"/>
                <line x1="25" y1="260" x2="435" y2="260" stroke="#f1f5f9" strokeWidth="1.5"/>

                {/* Big Verification Monitor */}
                <rect x="150" y="55" width="260" height="175" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2"/>
                <rect x="150" y="55" width="260" height="24" rx="8" fill="url(#screenGrad)"/>
                <circle cx="166" cy="67" r="4" fill="#ffffff" opacity="0.9"/>
                <circle cx="178" cy="67" r="4" fill="#ffffff" opacity="0.6"/>
                <circle cx="190" cy="67" r="4" fill="#ffffff" opacity="0.6"/>

                {/* Cards on monitor */}
                <rect x="165" y="90" width="62" height="52" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
                <line x1="172" y1="102" x2="218" y2="102" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="172" y1="112" x2="210" y2="112" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="216" cy="128" r="4" fill="#22c55e"/>

                <rect x="240" y="90" width="62" height="52" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
                <line x1="247" y1="102" x2="293" y2="102" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="247" y1="112" x2="285" y2="112" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="291" cy="128" r="4" fill="#22c55e"/>

                <rect x="315" y="90" width="80" height="52" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
                <line x1="322" y1="102" x2="385" y2="102" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="385" cy="128" r="4" fill="#f59e0b"/>

                {/* Desk & Person */}
                <rect x="140" y="240" width="220" height="12" rx="3" fill="#cbd5e1"/>
                <line x1="165" y1="252" x2="155" y2="330" stroke="#64748b" strokeWidth="4" strokeLinecap="round"/>
                <line x1="330" y1="252" x2="340" y2="330" stroke="#64748b" strokeWidth="4" strokeLinecap="round"/>

                <rect x="52" y="165" width="48" height="90" rx="10" fill="url(#chairGrad)" transform="rotate(-6 52 165)"/>
                <rect x="50" y="245" width="55" height="14" rx="6" fill="url(#chairGrad)"/>
                <circle cx="112" cy="154" r="13" fill="#fbcfe8"/>
                <path d="M102 150 C102 140 114 138 124 142 C126 146 126 154 122 156 Z" fill="#0f172a"/>
                <path d="M82 245 L94 175 L118 178 L112 245 Z" fill="#1e293b"/>
                <path d="M85 240 L135 252 L145 320" fill="none" stroke="#0284c7" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "✓", text: "Automated GFR 2017 & GeM 4.0 Compliance" },
              { icon: "🛡️", text: "Multi-Portal Forensics (Udyam, GSTN, MCA21, EPFO)" },
              { icon: "⚡", text: "AI-Assisted Contradiction & Tamper Detection" }
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: C.inkMuted }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#eff6ff", color: C.navy, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11 }}>
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: Form */}
        <div style={{ padding: "36px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: C.ink, marginBottom: 4 }}>Portal Login</h2>
              <p style={{ fontSize: 13, color: C.inkMuted }}>Government e-Marketplace Integrated Verification System</p>
            </div>

            {/* Role Switcher Tabs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                background: "#f1f5f9",
                padding: 4,
                borderRadius: 10,
                marginBottom: 24
              }}
            >
              <button
                type="button"
                onClick={() => handleRoleChange(ROLES.BIDDER)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: role === ROLES.BIDDER ? "#ffffff" : "transparent",
                  color: role === ROLES.BIDDER ? C.navy : C.inkMuted,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: role === ROLES.BIDDER ? "0 2px 4px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.15s"
                }}
              >
                <span>🏢</span>
                <span>Bidder / Vendor</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange(ROLES.OFFICER)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: role === ROLES.OFFICER ? "#ffffff" : "transparent",
                  color: role === ROLES.OFFICER ? C.navy : C.inkMuted,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: role === ROLES.OFFICER ? "0 2px 4px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.15s"
                }}
              >
                <span>🛡️</span>
                <span>Procurement Officer</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 6 }}>
                  Username / Email ID <span style={{ color: C.crimson }}>*</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter Registered Email or User ID"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: `1.5px solid ${C.border}`,
                    borderRadius: 8,
                    fontSize: 14,
                    color: C.ink,
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>
                    Password <span style={{ color: C.crimson }}>*</span>
                  </label>
                  <a href="#/login" style={{ fontSize: 12, color: C.navy, fontWeight: 600 }}>Forgot Password?</a>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                    style={{
                      width: "100%",
                      padding: "10px 40px 10px 14px",
                      border: `1.5px solid ${C.border}`,
                      borderRadius: 8,
                      fontSize: 14,
                      color: C.ink,
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 16
                    }}
                  >
                    {showPassword ? "👁️" : "🔒"}
                  </button>
                </div>
              </div>

              {/* Captcha */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 6 }}>
                  Enter Captcha <span style={{ color: C.crimson }}>*</span>
                </label>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", background: "#f8fafc" }}>
                    <canvas ref={canvasRef} width={130} height={38} style={{ display: "block" }} />
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      style={{
                        padding: "8px 10px",
                        background: "transparent",
                        border: "none",
                        borderLeft: `1px solid ${C.border}`,
                        cursor: "pointer",
                        fontSize: 14
                      }}
                      title="Regenerate Captcha"
                    >
                      🔄
                    </button>
                  </div>
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={e => setCaptchaInput(e.target.value)}
                    placeholder="Captcha"
                    maxLength={6}
                    required
                    style={{
                      flex: 1,
                      padding: "10px 12px",
                      border: `1.5px solid ${C.border}`,
                      borderRadius: 8,
                      fontSize: 14,
                      fontFamily: F.mono,
                      fontWeight: 700,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <button
                  type="button"
                  onClick={() => navigate("/home")}
                  style={{
                    padding: "11px 18px",
                    borderRadius: 8,
                    border: `1.5px solid ${C.border}`,
                    background: "#ffffff",
                    color: C.ink,
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer"
                  }}
                >
                  🏠 Home
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "11px 20px",
                    borderRadius: 8,
                    border: "none",
                    background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    boxShadow: `0 4px 12px ${C.navy}40`
                  }}
                >
                  Secure Login →
                </button>
              </div>
            </form>

            {/* Quick Demo Access Bar */}
            <div
              style={{
                marginTop: 24,
                padding: "12px 14px",
                background: "#eff6ff",
                border: "1px dashed #93c5fd",
                borderRadius: 10
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                ⚡ 1-Click Evaluation Demo Access:
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => handleDemoLogin(ROLES.BIDDER)}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: "1px solid #bfdbfe",
                    background: "#ffffff",
                    color: C.navy,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  👤 Bidder Portal
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin(ROLES.OFFICER)}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: "1px solid #bfdbfe",
                    background: C.navy,
                    color: "#ffffff",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  🛡️ Officer Console
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, textAlign: "center", fontSize: 11, color: C.inkFaint }}>
            🔒 Government of India • 256-Bit SSL Encrypted • GeM 4.0 Standard
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
