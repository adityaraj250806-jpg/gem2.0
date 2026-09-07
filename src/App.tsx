import React, { Suspense, lazy } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AppLayout } from "./components/layout/AppLayout";

// Lazy-loaded pages for fast initial load & route code-splitting
const HomePage = lazy(() => import("./components/HomePage").then(m => ({ default: m.HomePage })));
const LoginPage = lazy(() => import("./pages/LoginPage").then(m => ({ default: m.LoginPage })));

// Bidder pages
const BidderDashboard = lazy(() => import("./pages/bidder/BidderDashboard").then(m => ({ default: m.BidderDashboard })));
const BidderTenders = lazy(() => import("./pages/bidder/BidderTenders").then(m => ({ default: m.BidderTenders })));
const BidderTenderDetails = lazy(() => import("./pages/bidder/BidderTenderDetails").then(m => ({ default: m.BidderTenderDetails })));
const BidderUpload = lazy(() => import("./pages/bidder/BidderUpload").then(m => ({ default: m.BidderUpload })));
const BidderSubmissions = lazy(() => import("./pages/bidder/BidderSubmissions").then(m => ({ default: m.BidderSubmissions })));

// Officer pages
const OfficerDashboard = lazy(() => import("./pages/officer/OfficerDashboard").then(m => ({ default: m.OfficerDashboard })));
const OfficerTenders = lazy(() => import("./pages/officer/OfficerTenders").then(m => ({ default: m.OfficerTenders })));
const OfficerBidders = lazy(() => import("./pages/officer/OfficerBidders").then(m => ({ default: m.OfficerBidders })));
const OfficerBidderDocs = lazy(() => import("./pages/officer/OfficerBidderDocs").then(m => ({ default: m.OfficerBidderDocs })));
const OfficerAiProcessing = lazy(() => import("./pages/officer/OfficerAiProcessing").then(m => ({ default: m.OfficerAiProcessing })));
const OfficerAiResults = lazy(() => import("./pages/officer/OfficerAiResults").then(m => ({ default: m.OfficerAiResults })));
const OfficerEvidence = lazy(() => import("./pages/officer/OfficerEvidence").then(m => ({ default: m.OfficerEvidence })));

const PageLoader = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh", color: "#002d62", fontWeight: 700, fontSize: 13, gap: 8 }}>
    <span>⏳ Loading workspace...</span>
  </div>
);

export function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Landing & Login */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Authenticated Workspace wrapped in AppLayout */}
            <Route element={<AppLayout />}>
              {/* Bidder Routes */}
              <Route path="/bidder" element={<Navigate to="/bidder/dashboard" replace />} />
              <Route path="/bidder/dashboard" element={<BidderDashboard />} />
              <Route path="/bidder/tenders" element={<BidderTenders />} />
              <Route path="/bidder/tenders/:id" element={<BidderTenderDetails />} />
              <Route path="/bidder/tenders/:id/documents" element={<BidderUpload />} />
              <Route path="/bidder/bids" element={<BidderSubmissions />} />

              {/* Officer Routes */}
              <Route path="/officer" element={<Navigate to="/officer/dashboard" replace />} />
              <Route path="/officer/dashboard" element={<OfficerDashboard />} />
              <Route path="/officer/tenders" element={<OfficerTenders />} />
              <Route path="/officer/tenders/:id/bidders" element={<OfficerBidders />} />
              <Route path="/officer/bidders/:id/documents" element={<OfficerBidderDocs />} />
              <Route path="/officer/bidders/:id/verification" element={<OfficerAiProcessing />} />
              <Route path="/officer/bidders/:id/results" element={<OfficerAiResults />} />
              <Route path="/officer/bidders/:id/evidence" element={<OfficerEvidence />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
