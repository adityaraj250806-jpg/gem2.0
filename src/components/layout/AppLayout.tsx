import React from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

export const AppLayout: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc" }}>
      <AppHeader />
      <div style={{ flex: 1, display: "flex" }}>
        <AppSidebar />
        <main style={{ flex: 1, padding: "28px 36px", overflowY: "auto", minHeight: "calc(100vh - 80px)" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
