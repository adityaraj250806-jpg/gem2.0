import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, User, UserRole, ROLES } from "../services/authService";

export interface ToastItem {
  id: string;
  message: string;
  type: "success" | "warning" | "danger" | "info";
}

interface AppContextType {
  user: User | null;
  login: (email?: string, password?: string, role?: UserRole) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    orgName?: string;
    gstin?: string;
    officerCode?: string;
    officerKey?: string;
    designation?: string;
  }) => Promise<User>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
  showToast: (message: string, type?: "success" | "warning" | "danger" | "info") => void;
  activeTenderId: string;
  setActiveTenderId: (id: string) => void;
  activeBidderId: string;
  setActiveBidderId: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [activeTenderId, setActiveTenderId] = useState("CPCL-2026-TE-045");
  const [activeBidderId, setActiveBidderId] = useState("BID-001");

  const showToast = (message: string, type: "success" | "warning" | "danger" | "info" = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const login = async (email?: string, password?: string, role: UserRole = ROLES.BIDDER) => {
    const res = await authService.login(email, password, role);
    setUser(res.user);
    showToast(`Welcome back, ${res.user.name}!`, "success");
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    orgName?: string;
    gstin?: string;
    officerCode?: string;
    officerKey?: string;
    designation?: string;
  }) => {
    const res = await authService.register(data);
    setUser(res.user);
    showToast(`Account created successfully! Welcome, ${res.user.name}`, "success");
    return res.user;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    showToast("Logged out successfully", "info");
  };

  const switchRole = (role: UserRole) => {
    const newUser = authService.switchRole(role);
    setUser(newUser);
    showToast(`Switched workspace to ${role === ROLES.OFFICER ? "Procurement Officer" : "Registered Bidder"}`, "info");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        switchRole,
        showToast,
        activeTenderId,
        setActiveTenderId,
        activeBidderId,
        setActiveBidderId
      }}
    >
      {children}

      {/* Floating Toast Container */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 380,
          width: "100%",
          pointerEvents: "none"
        }}
      >
        {toasts.map(toast => {
          const isSuccess = toast.type === "success";
          const isWarning = toast.type === "warning";
          const isDanger = toast.type === "danger";

          const bg = isSuccess ? "#f0fdf4" : isWarning ? "#fffbeb" : isDanger ? "#fef2f2" : "#eff6ff";
          const borderColor = isSuccess ? "#86efac" : isWarning ? "#fcd34d" : isDanger ? "#fca5a5" : "#93c5fd";
          const iconColor = isSuccess ? "#16a34a" : isWarning ? "#d97706" : isDanger ? "#dc2626" : "#2563eb";
          const icon = isSuccess ? "✓" : isWarning ? "⚠" : isDanger ? "✕" : "ℹ";

          return (
            <div
              key={toast.id}
              style={{
                pointerEvents: "auto",
                background: bg,
                border: `1px solid ${borderColor}`,
                borderRadius: 10,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
                animation: "slideIn 0.25s ease-out forwards"
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: iconColor,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  flexShrink: 0
                }}
              >
                {icon}
              </div>
              <div style={{ flex: 1, fontSize: 13, color: "#1e293b", fontWeight: 500, lineHeight: 1.4 }}>
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: 18,
                  lineHeight: 1,
                  padding: 4
                }}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
