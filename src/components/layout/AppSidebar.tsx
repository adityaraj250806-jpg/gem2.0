import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { ROLES } from "../../services/authService";
import { C, F } from "../../tokens";
import { GemLogo } from "../GemLogo";

export const AppSidebar: React.FC = () => {
  const { user, showToast } = useApp();
  const location = useLocation();
  const path = location.pathname;

  const isOfficer = user?.role === ROLES.OFFICER;

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 16px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
    color: isActive ? "#ffffff" : C.inkMuted,
    background: isActive ? `linear-gradient(135deg, ${C.navy}, ${C.navyLight})` : "transparent",
    transition: "all 0.15s ease"
  });

  return (
    <aside
      style={{
        width: 240,
        background: "#ffffff",
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: F.sans,
        flexShrink: 0
      }}
    >
      <div style={{ padding: "20px 14px" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: C.inkFaint,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 12,
            paddingLeft: 8
          }}
        >
          {isOfficer ? "OFFICER CONSOLE" : "BIDDER WORKSPACE"}
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {isOfficer ? (
            <>
              <NavLink to="/officer/dashboard" style={({ isActive }) => linkStyle(isActive || path === "/officer")}>
                <span style={{ fontSize: 16 }}>🏠</span>
                <span>Dashboard</span>
              </NavLink>

              <NavLink to="/officer/tenders" style={({ isActive }) => linkStyle(isActive && !path.includes("/bidders"))}>
                <span style={{ fontSize: 16 }}>📋</span>
                <span>Tenders</span>
              </NavLink>

              <NavLink
                to="/officer/tenders/CPCL-2026-TE-045/bidders"
                style={({ isActive }) => linkStyle(isActive || (path.includes("/bidders") && !path.includes("/documents") && !path.includes("/verification") && !path.includes("/results") && !path.includes("/evidence")))}
              >
                <span style={{ fontSize: 16 }}>👥</span>
                <span>Bidders</span>
              </NavLink>

              <NavLink
                to="/officer/bidders/BID-001/documents"
                style={() => linkStyle(path.includes("/documents") || path.includes("/verification") || path.includes("/results") || path.includes("/evidence"))}
              >
                <span style={{ fontSize: 16 }}>📊</span>
                <span>AI Evaluation</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/bidder/dashboard" style={({ isActive }) => linkStyle(isActive || path === "/bidder")}>
                <span style={{ fontSize: 16 }}>🏠</span>
                <span>Home</span>
              </NavLink>

              <NavLink to="/bidder/tenders" style={({ isActive }) => linkStyle(isActive && !path.includes("/documents"))}>
                <span style={{ fontSize: 16 }}>📋</span>
                <span>Explore Tenders</span>
              </NavLink>

              <NavLink to="/bidder/bids" style={({ isActive }) => linkStyle(isActive)}>
                <span style={{ fontSize: 16 }}>📁</span>
                <span>My Bids</span>
              </NavLink>

              <NavLink
                to="/bidder/tenders/CPCL-2026-TE-045/documents"
                style={({ isActive }) => linkStyle(isActive)}
              >
                <span style={{ fontSize: 16 }}>📄</span>
                <span>Submit Documents</span>
              </NavLink>

              <button
                onClick={() => showToast("Notifications: You have 0 pending administrative queries.", "info")}
                style={{
                  ...linkStyle(false),
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <span style={{ fontSize: 16 }}>🔔</span>
                <span>Notifications</span>
              </button>
            </>
          )}
        </nav>
      </div>

      <div
        style={{
          padding: "16px 20px",
          borderTop: `1px solid ${C.border}`,
          background: "#f8fafc",
          fontSize: 11,
          color: C.inkFaint,
          lineHeight: 1.5
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <GemLogo size={22} />
          <strong style={{ color: C.inkMuted }}>GemxAI Platform</strong>
        </div>
        256-Bit SSL Encrypted • GFR 2017
        <br />
        Government e-Marketplace Suite
      </div>
    </aside>
  );
};
