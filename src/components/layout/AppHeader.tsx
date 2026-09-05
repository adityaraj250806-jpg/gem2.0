import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { ROLES } from "../../services/authService";
import { C, F } from "../../tokens";

export const AppHeader: React.FC = () => {
  const { user, logout, switchRole, showToast } = useApp();
  const navigate = useNavigate();

  const isOfficer = user?.role === ROLES.OFFICER;

  const handleToggleRole = () => {
    const target = isOfficer ? ROLES.BIDDER : ROLES.OFFICER;
    switchRole(target);
    navigate(target === ROLES.OFFICER ? "/officer/dashboard" : "/bidder/dashboard");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 900,
        background: "#ffffff",
        borderBottom: `1px solid ${C.border}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        fontFamily: F.sans
      }}
    >
      {/* Top micro ribbon */}
      <div
        style={{
          background: C.navyDark,
          color: "#94a3b8",
          fontSize: 11,
          fontWeight: 500,
          padding: "4px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span>🇮🇳 भारत सरकार | Government of India · Official Procurement System</span>
        <span>GFR 2017 & CPPP Verified</span>
      </div>

      {/* Main Header bar */}
      <div
        style={{
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* Brand */}
        <Link
          to={isOfficer ? "/officer/dashboard" : "/bidder/dashboard"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none"
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: 1
            }}
          >
            GeM
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.ink, letterSpacing: "-0.01em" }}>
              GeM <span style={{ color: C.teal }}>SENTINEL</span>
            </div>
            <div style={{ fontSize: 10, color: C.inkFaint, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              AI Tender Evaluation Portal
            </div>
          </div>
        </Link>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Role badge */}
          <span
            style={{
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              background: isOfficer ? "#eff6ff" : "#f0fdf4",
              color: isOfficer ? C.navy : C.emerald,
              border: `1px solid ${isOfficer ? "#bfdbfe" : "#bbf7d0"}`
            }}
          >
            {isOfficer ? "🛡️ Procurement Officer" : "🏢 Registered Bidder"}
          </span>

          {/* Quick role toggle */}
          <button
            onClick={handleToggleRole}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              background: "#f1f5f9",
              border: `1px solid ${C.border}`,
              color: C.ink,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
            title="Switch between Bidder and Officer view for demonstration"
          >
            🔄 Switch to {isOfficer ? "Bidder" : "Officer"}
          </button>

          {/* Notifications */}
          <button
            onClick={() => showToast("No new statutory notifications at this time.", "info")}
            style={{
              background: "transparent",
              border: "none",
              fontSize: 16,
              cursor: "pointer",
              padding: "6px 8px",
              borderRadius: 6,
              color: C.inkMuted
            }}
            title="System Notifications"
          >
            🔔
          </button>

          {/* User profile & logout */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingLeft: 12,
              borderLeft: `1px solid ${C.border}`
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: isOfficer ? C.navy : C.teal,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 13
              }}
            >
              {user?.avatarInitial || "U"}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, lineHeight: 1.2 }}>
                {user?.name || "User"}
              </span>
              <span style={{ fontSize: 10, color: C.inkFaint }}>
                {user?.orgName || "GeM Portal"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              style={{
                marginLeft: 6,
                padding: "5px 10px",
                borderRadius: 6,
                border: `1px solid ${C.border}`,
                background: "#ffffff",
                color: C.inkMuted,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
