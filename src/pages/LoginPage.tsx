import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ROLES, UserRole } from "../services/authService";
import { C, F } from "../tokens";
import { GemLogo } from "../components/GemLogo";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, showToast } = useApp();

  const [role, setRole] = useState<UserRole>(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1] || window.location.search);
    return params.get("role") === "officer" ? ROLES.OFFICER : ROLES.BIDDER;
  });
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [gstin, setGstin] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [officerCode, setOfficerCode] = useState("");
  const [officerKey, setOfficerKey] = useState("");
  const [officerDesignation, setOfficerDesignation] = useState("Chief Procurement Officer");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Real-time validation checks
  const nameHasInvalidChars = name.trim().length > 0 && !/^[A-Za-z\s.'-]+$/.test(name);
  const emailMissingAt = username.trim().length > 0 && !username.includes("@");
  const emailInvalidFormat = username.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username.trim());

  useEffect(() => {
    const hashQuery = window.location.hash.includes("?") ? window.location.hash.split("?")[1] : "";
    const params = new URLSearchParams(hashQuery || location.search);
    const qRole = params.get("role");
    if (qRole === "officer" || (location.state as any)?.role === ROLES.OFFICER) {
      setRole(ROLES.OFFICER);
    } else if (qRole === "bidder" || (location.state as any)?.role === ROLES.BIDDER) {
      setRole(ROLES.BIDDER);
    }
  }, [location]);

  // Generate textured captcha
  const generateCaptcha = () => {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
    setCaptchaInput("");

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

    // Draw characters with centered slots so characters never clip or override borders
    ctx.font = "bold 20px 'Courier New', monospace, sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const slotWidth = canvas.width / text.length;

    for (let i = 0; i < text.length; i++) {
      ctx.save();
      const x = slotWidth * i + slotWidth / 2;
      const y = canvas.height / 2 + (Math.random() * 4 - 2);
      const angle = (Math.random() * 14 - 7) * (Math.PI / 180);
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = i % 2 === 0 ? "#0f172a" : "#1e3a8a";
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setName("");
    setOrgName("");
    setGstin("");
    setOfficerCode("");
    setOfficerKey("");
    setOfficerDesignation("Chief Procurement Officer");
    setCaptchaInput("");
    setNameTouched(false);
    setEmailTouched(false);
    setTimeout(() => generateCaptcha(), 50);
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    resetForm();
  };

  const handleModeChange = (targetMode: boolean) => {
    setIsRegisterMode(targetMode);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = username.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 1. If Register Mode, validate Name first
    if (isRegisterMode) {
      if (!name.trim()) {
        showToast(role === ROLES.OFFICER ? "Please enter Officer Full Name." : "Please enter Authorized Signatory Name.", "danger");
        return;
      }
      if (!/^[A-Za-z\s.'-]+$/.test(name.trim())) {
        showToast("Only alphabets are allowed in the Name field.", "danger");
        return;
      }

      // Distinguished Officer Security Checks
      if (role === ROLES.OFFICER) {
        if (!officerCode.trim()) {
          showToast("Please enter Government Employee Code / Officer ID (e.g. CPCL-GOV-104).", "danger");
          return;
        }
        if (!officerKey.trim()) {
          showToast("Please enter the Department Security Passkey. (Evaluation Passkey: GEM-OFFICER-2025)", "danger");
          return;
        }
        const cleanKey = officerKey.trim().toUpperCase();
        if (!["GEM-OFFICER-2025", "GOV-SECURE-2025", "CPCL-OFFICER", "OFFICER-2025"].includes(cleanKey)) {
          showToast("Access Denied: Invalid Department Authorization Passkey. Random users cannot create an Officer ID.", "danger");
          return;
        }
      }
    }

    // 2. Validate Email - Explicitly check for '@'
    if (!cleanEmail) {
      showToast(isRegisterMode ? "Please enter an official email ID." : "Please enter your email ID.", "danger");
      return;
    }
    if (!cleanEmail.includes("@")) {
      showToast("Email address must contain an '@' symbol (e.g. user@domain.com).", "danger");
      return;
    }
    if (!emailRegex.test(cleanEmail)) {
      showToast("Please enter a valid email address with domain (e.g. user@domain.com).", "danger");
      return;
    }

    // 3. Validate Password
    if (!password.trim()) {
      showToast("Please enter your password.", "danger");
      return;
    }
    if (isRegisterMode && password.length < 6) {
      showToast("Password must be at least 6 characters long.", "danger");
      return;
    }

    // 4. Validate Captcha
    if (!captchaInput.trim()) {
      showToast("Please enter the Captcha code shown.", "danger");
      return;
    }
    if (captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
      showToast("Invalid Captcha. Please enter the characters shown.", "danger");
      generateCaptcha();
      return;
    }

    // 5. Submit to backend
    if (isRegisterMode) {
      try {
        setIsSubmitting(true);
        await register({
          email: cleanEmail,
          password: password.trim(),
          name: name.trim(),
          role,
          orgName: orgName.trim() || (role === ROLES.OFFICER ? "Chennai Petroleum Corp Ltd" : "Private Vendor Ltd"),
          gstin: gstin.trim(),
          officerCode: role === ROLES.OFFICER ? officerCode.trim() : undefined,
          officerKey: role === ROLES.OFFICER ? officerKey.trim().toUpperCase() : undefined,
          designation: role === ROLES.OFFICER ? officerDesignation.trim() : undefined
        });
        navigate(role === ROLES.OFFICER ? "/officer/dashboard" : "/bidder/dashboard");
      } catch (err: any) {
        showToast(err.message || "Registration failed. Please check your details.", "danger");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    try {
      setIsSubmitting(true);
      await login(cleanEmail, password, role);
      navigate(role === ROLES.OFFICER ? "/officer/dashboard" : "/bidder/dashboard");
    } catch (err: any) {
      showToast(err.message || "Login failed. Please check your credentials.", "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async (targetRole: UserRole, customEmail?: string) => {
    let userEmail = customEmail;
    if (!userEmail) {
      userEmail = targetRole === ROLES.OFFICER ? "procurement.officer@cpcl.gov.in" : "tenders@abcengineering.com";
    }
    await login(userEmail, "DemoPass", targetRole);
    navigate(targetRole === ROLES.OFFICER ? "/officer/dashboard" : "/bidder/dashboard");
  };

  const handleFillKavachCredentials = () => {
    setRole(ROLES.BIDDER);
    setIsRegisterMode(false);
    setUsername("bidder@kavach.in");
    setPassword("Kavach@2026");
    showToast("Filled Kavach Engineering credentials (bidder@kavach.in / Kavach@2026). Enter captcha to login!", "info");
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
            <div style={{ marginBottom: 16 }}>
              <GemLogo size={42} showText textColor={C.navyDark} />
              <div style={{ marginTop: 6, fontSize: 12, color: C.inkMuted, lineHeight: 1.4 }}>
                {isRegisterMode 
                  ? (role === ROLES.OFFICER 
                      ? "Government Procurement Officer Onboarding • GeM 4.0 Standard"
                      : "Official Vendor Registration & Statutory Compliance Gateway")
                  : "Government e-Marketplace Integrated Verification Portal"}
              </div>
            </div>

            {/* Vector Graphic */}
            <div style={{ margin: "10px 0 16px", textAlign: "center" }}>
              <svg viewBox="0 0 460 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxHeight: isRegisterMode ? 280 : 250, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.06))" }}>
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

            {/* Rich Information Card during Registration */}
            {isRegisterMode && (
              <div
                style={{
                  margin: "8px 0 16px",
                  padding: "14px 16px",
                  background: "#ffffff",
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 800, color: C.navy, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <span>{role === ROLES.OFFICER ? "🏛️ Official Safeguards & Protocols" : "🚀 Registered Vendor Advantages"}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {role === ROLES.OFFICER ? [
                    { t: "Central Vigilance Audit Trails", d: "Full cryptographic logging for all tender decisions & disqualifications." },
                    { t: "AI Technical & Financial Scrutiny", d: "Instant verification of BOQ compliance, MSE rules, and GFR 2017." },
                    { t: "Department Authorization Enforced", d: "Passkey verification prevents unauthorized access to tender sanctions." }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "#2563eb", fontWeight: 700, fontSize: 12, lineHeight: 1.2 }}>✓</span>
                      <div>
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: C.ink }}>{item.t}</div>
                        <div style={{ fontSize: 10.5, color: C.inkMuted, lineHeight: 1.3 }}>{item.d}</div>
                      </div>
                    </div>
                  )) : [
                    { t: "Instant Statutory Verification", d: "Automatic sync across GSTN, MSME Udyam, MCA21, and EPFO registries." },
                    { t: "Pre-Submission AI Scrutiny", d: "Flag compliance errors or missing documents before tender submission." },
                    { t: "Real-Time Opportunity Radar", d: "Automated tender discovery matched to your registered capabilities." }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "#f97316", fontWeight: 700, fontSize: 12, lineHeight: 1.2 }}>✓</span>
                      <div>
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: C.ink }}>{item.t}</div>
                        <div style={{ fontSize: 10.5, color: C.inkMuted, lineHeight: 1.3 }}>{item.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Compliance Badges & Security */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: isRegisterMode ? 0 : 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "6px 8px", borderRadius: 6, fontSize: 10.5, fontWeight: 600, color: "#1e40af", display: "flex", alignItems: "center", gap: 6 }}>
                <span>🔒</span> 256-Bit Encrypted
              </div>
              <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "6px 8px", borderRadius: 6, fontSize: 10.5, fontWeight: 600, color: "#065f46", display: "flex", alignItems: "center", gap: 6 }}>
                <span>🏛️</span> MeitY Empanelled
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: C.inkMuted, padding: "2px 0" }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#eff6ff", color: C.navy, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 10 }}>
                ✓
              </span>
              <span>Automated GFR 2017 & GeM 4.0 Forensics (Udyam, GSTN, MCA21)</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Form */}
        <div style={{ padding: "36px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: C.ink, marginBottom: 4 }}>
                {isRegisterMode ? "Create New ID" : "Portal Login"}
              </h2>
              <p style={{ fontSize: 13, color: C.inkMuted }}>
                {isRegisterMode 
                  ? "Register official credentials directly into the cloud database" 
                  : "Government e-Marketplace Integrated Verification System"}
              </p>

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
                marginBottom: 20
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
                <span>{isRegisterMode ? "Register as Bidder" : "Bidder / Vendor"}</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange(ROLES.OFFICER)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: role === ROLES.OFFICER ? "1.5px solid #d97706" : "1.5px solid transparent",
                  background: role === ROLES.OFFICER ? "#0f172a" : "transparent",
                  color: role === ROLES.OFFICER ? "#ffffff" : C.inkMuted,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  boxShadow: role === ROLES.OFFICER ? "0 2px 6px rgba(15,23,42,0.25)" : "none",
                  transition: "all 0.15s"
                }}
              >
                <span>🛡️</span>
                <span>{isRegisterMode ? "Register as Officer" : "Procurement Officer"}</span>
                <span
                  style={{
                    fontSize: 9,
                    background: role === ROLES.OFFICER ? "#d97706" : "#e2e8f0",
                    color: role === ROLES.OFFICER ? "#ffffff" : C.inkMuted,
                    padding: "1px 5px",
                    borderRadius: 4,
                    fontWeight: 800,
                    letterSpacing: 0.5
                  }}
                >
                  GOVT
                </span>
              </button>
            </div>

            {/* Form */}
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              {isRegisterMode && (
                <>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 5 }}>
                      {role === ROLES.OFFICER ? "Officer Full Name" : "Authorized Signatory / Bidder Name"} <span style={{ color: C.crimson }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      onBlur={() => setNameTouched(true)}
                      placeholder={role === ROLES.OFFICER ? "e.g. Dr. K. S. Ramanathan" : "e.g. Rajesh Kumar"}
                      required
                      style={{
                        width: "100%",
                        padding: "9px 13px",
                        border: `1.5px solid ${nameHasInvalidChars ? "#dc2626" : C.border}`,
                        borderRadius: 8,
                        fontSize: 13,
                        color: C.ink,
                        outline: "none",
                        boxSizing: "border-box",
                        background: nameHasInvalidChars ? "#fef2f2" : "#ffffff",
                        transition: "all 0.2s"
                      }}
                    />
                    {nameHasInvalidChars && (
                      <div style={{ color: "#dc2626", fontSize: 11, fontWeight: 600, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <span>⚠️ Only alphabets are allowed (no numbers or special characters)</span>
                      </div>
                    )}
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 5 }}>
                      {role === ROLES.OFFICER ? "Ministry / PSU Department" : "Company / Firm Legal Name"} <span style={{ color: C.crimson }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={e => setOrgName(e.target.value)}
                      placeholder={role === ROLES.OFFICER ? "e.g. Chennai Petroleum Corp Ltd / CPCL" : "e.g. ABC Engineering Ltd"}
                      required
                      style={{
                        width: "100%",
                        padding: "9px 13px",
                        border: `1.5px solid ${C.border}`,
                        borderRadius: 8,
                        fontSize: 13,
                        color: C.ink,
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>

                  {/* Distinguished Officer Fields in Registration Mode */}
                  {role === ROLES.OFFICER && (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                        <div>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 5 }}>
                            Govt Employee Code / ID <span style={{ color: C.crimson }}>*</span>
                          </label>
                          <input
                            type="text"
                            value={officerCode}
                            onChange={e => setOfficerCode(e.target.value.toUpperCase())}
                            placeholder="e.g. CPCL-GOV-104"
                            required
                            style={{
                              width: "100%",
                              padding: "9px 13px",
                              border: `1.5px solid ${C.border}`,
                              borderRadius: 8,
                              fontSize: 13,
                              fontFamily: F.mono,
                              color: C.ink,
                              outline: "none",
                              boxSizing: "border-box"
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 5 }}>
                            Designation <span style={{ color: C.crimson }}>*</span>
                          </label>
                          <select
                            value={officerDesignation}
                            onChange={e => setOfficerDesignation(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "9px 10px",
                              border: `1.5px solid ${C.border}`,
                              borderRadius: 8,
                              fontSize: 12,
                              color: C.ink,
                              outline: "none",
                              boxSizing: "border-box",
                              background: "#ffffff"
                            }}
                          >
                            <option value="Chief Procurement Officer">Chief Procurement Officer</option>
                            <option value="Tender Inviting Authority">Tender Inviting Authority (TIA)</option>
                            <option value="Superintending / Executive Engineer">Superintending Engineer</option>
                            <option value="Deputy General Manager (Contracts)">DGM (Contracts)</option>
                            <option value="Evaluation Committee Member">Evaluation Committee Member</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                          <label style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>
                            Department Authorization Passkey <span style={{ color: C.crimson }}>*</span>
                          </label>
                          <span style={{ fontSize: 10, background: "#fef3c7", color: "#b45309", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
                            Authorized Key: GEM-OFFICER-2025
                          </span>
                        </div>
                        <input
                          type="password"
                          value={officerKey}
                          onChange={e => setOfficerKey(e.target.value)}
                          placeholder="Enter Department Security Passkey"
                          required
                          style={{
                            width: "100%",
                            padding: "9px 13px",
                            border: "1.5px solid #d97706",
                            borderRadius: 8,
                            fontSize: 13,
                            color: C.ink,
                            outline: "none",
                            boxSizing: "border-box",
                            background: "#fffbeb",
                            fontFamily: F.mono
                          }}
                        />
                        <div style={{ fontSize: 10.5, color: "#b45309", marginTop: 4 }}>
                          🔑 Only verified officers with an authorized key can register this account.
                        </div>
                      </div>
                    </>
                  )}

                  {role === ROLES.BIDDER && (
                    <div style={{ marginBottom: 14 }}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 5 }}>
                        GSTIN Number <span style={{ fontSize: 11, color: C.inkFaint, fontWeight: 500 }}>(Optional for GeM verification)</span>
                      </label>
                      <input
                        type="text"
                        value={gstin}
                        onChange={e => setGstin(e.target.value.toUpperCase())}
                        placeholder="e.g. 33AABCA1234F1Z5"
                        maxLength={15}
                        style={{
                          width: "100%",
                          padding: "9px 13px",
                          border: `1.5px solid ${C.border}`,
                          borderRadius: 8,
                          fontSize: 13,
                          fontFamily: F.mono,
                          color: C.ink,
                          outline: "none",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                  )}
                </>
              )}

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 5 }}>
                  {isRegisterMode 
                    ? (role === ROLES.OFFICER ? "Official Department Email ID" : "Business Email ID") 
                    : "Username / Email ID"} <span style={{ color: C.crimson }}>*</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  autoComplete="off"
                  placeholder={role === ROLES.OFFICER ? "e.g. officer@cpcl.gov.in" : "e.g. tenders@company.com"}
                  required
                  style={{
                    width: "100%",
                    padding: "9px 13px",
                    border: `1.5px solid ${(emailTouched || username.length > 3) && emailInvalidFormat ? "#dc2626" : C.border}`,
                    borderRadius: 8,
                    fontSize: 13,
                    color: C.ink,
                    outline: "none",
                    boxSizing: "border-box",
                    background: (emailTouched || username.length > 3) && emailInvalidFormat ? "#fef2f2" : "#ffffff",
                    transition: "all 0.2s"
                  }}
                />
                {(emailTouched || username.length > 3) && emailMissingAt && (
                  <div style={{ color: "#dc2626", fontSize: 11, fontWeight: 600, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                    <span>⚠️ Email address must contain an '@' symbol (e.g. user@domain.com)</span>
                  </div>
                )}
                {(emailTouched || username.length > 3) && !emailMissingAt && emailInvalidFormat && (
                  <div style={{ color: "#dc2626", fontSize: 11, fontWeight: 600, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                    <span>⚠️ Please enter a complete domain (e.g. user@domain.com)</span>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>
                    {isRegisterMode ? "Create Password (min 6 characters)" : "Password"} <span style={{ color: C.crimson }}>*</span>
                  </label>
                  {!isRegisterMode && (
                    <a href="#/login" style={{ fontSize: 12, color: C.navy, fontWeight: 600 }}>Forgot Password?</a>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete={isRegisterMode ? "new-password" : "current-password"}
                    placeholder={isRegisterMode ? "Create a secure password" : "Enter Password"}
                    required
                    style={{
                      width: "100%",
                      padding: "9px 40px 9px 13px",
                      border: `1.5px solid ${C.border}`,
                      borderRadius: 8,
                      fontSize: 13,
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
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 5 }}>
                  Enter Captcha <span style={{ color: C.crimson }}>*</span>
                </label>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", background: "#f8fafc" }}>
                    <canvas ref={canvasRef} width={144} height={38} style={{ display: "block" }} />
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      style={{
                        padding: "8px 10px",
                        background: "transparent",
                        border: "none",
                        borderLeft: `1px solid ${C.border}`,
                        cursor: "pointer",
                        fontSize: 13
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
                    placeholder="Enter Captcha"
                    maxLength={6}
                    autoCapitalize="none"
                    autoCorrect="off"
                    autoComplete="off"
                    spellCheck={false}
                    required
                    style={{
                      flex: 1,
                      padding: "9px 12px",
                      border: `1.5px solid ${C.border}`,
                      borderRadius: 8,
                      fontSize: 13,
                      fontFamily: F.mono,
                      fontWeight: 700,
                      letterSpacing: 2,
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button
                  type="button"
                  onClick={() => navigate("/home")}
                  style={{
                    padding: "10px 16px",
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
                  disabled={isSubmitting}
                  style={{
                    flex: 1,
                    padding: "10px 20px",
                    borderRadius: 8,
                    border: role === ROLES.OFFICER ? "1px solid #d97706" : "none",
                    background: role === ROLES.OFFICER
                      ? "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)"
                      : isRegisterMode
                        ? `linear-gradient(135deg, ${C.gemOrange}, ${C.gemOrangeDark})`
                        : `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    boxShadow: role === ROLES.OFFICER
                      ? "0 4px 12px rgba(15, 23, 42, 0.35)"
                      : isRegisterMode
                        ? `0 4px 12px ${C.gemOrange}40`
                        : `0 4px 12px ${C.navy}40`,
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: "all 0.15s"
                  }}
                >
                  {isSubmitting 
                    ? "Processing..." 
                    : isRegisterMode 
                      ? (role === ROLES.OFFICER ? "🏛️ Register Verified Officer ID →" : "✨ Create Bidder ID →")
                      : (role === ROLES.OFFICER ? "🛡️ Authenticate Officer Credentials →" : "Secure Login →")}
                </button>
              </div>

              {/* Toggle text link */}
              <div style={{ textAlign: "center", marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => handleModeChange(!isRegisterMode)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: C.navy,
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: "pointer",
                    textDecoration: "underline"
                  }}
                >
                  {isRegisterMode 
                    ? "Already have an ID? Switch to Sign In" 
                    : "Need a new account? Create a Bidder or Officer ID here"}
                </button>
              </div>
            </form>

            {/* Quick Demo Access Bar */}
            <div
              style={{
                marginTop: 24,
                padding: "14px 16px",
                background: "#eff6ff",
                border: "1px dashed #93c5fd",
                borderRadius: 10
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  ⚡ Live Internal Evaluation Accounts:
                </span>
                <span style={{ fontSize: 11, color: C.inkFaint, fontWeight: 600 }}>1-Click or Manual Login</span>
              </div>

              {/* Dedicated Highlight for New Tender Bidder: Kavach Engineering */}
              <div
                style={{
                  background: "#ffffff",
                  border: `1.5px solid ${C.navy}`,
                  borderRadius: 8,
                  padding: "10px 12px",
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 2px 4px rgba(11,61,145,0.08)"
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: C.navy, display: "flex", alignItems: "center", gap: 6 }}>
                    <span>🚀 Kavach Engineering (New Bidder)</span>
                    <span style={{ padding: "1px 6px", borderRadius: 4, background: "#dbeafe", color: "#1e40af", fontSize: 10 }}>ONGC Tender</span>
                  </div>
                  <div style={{ fontSize: 11, color: C.inkMuted, fontFamily: F.mono, marginTop: 2 }}>
                    ID: <strong>bidder@kavach.in</strong> • Pass: <strong>Kavach@2026</strong>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    type="button"
                    onClick={handleFillKavachCredentials}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 5,
                      border: "1px solid #cbd5e1",
                      background: "#f8fafc",
                      color: C.ink,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                    title="Fill email and password into form"
                  >
                    ✏️ Fill
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin(ROLES.BIDDER, "bidder@kavach.in")}
                    style={{
                      padding: "5px 12px",
                      borderRadius: 5,
                      border: "none",
                      background: `linear-gradient(135deg, ${C.navy} 0%, #1e40af 100%)`,
                      color: "#ffffff",
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: "pointer"
                    }}
                  >
                    Login →
                  </button>
                </div>
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
                  👤 ABC Bidder
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
