import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { AppLayout } from "./components/layout/AppLayout";

// Bidder pages
import { BidderDashboard } from "./pages/bidder/BidderDashboard";
import { BidderTenders } from "./pages/bidder/BidderTenders";
import { BidderTenderDetails } from "./pages/bidder/BidderTenderDetails";
import { BidderUpload } from "./pages/bidder/BidderUpload";
import { BidderSubmissions } from "./pages/bidder/BidderSubmissions";

// Officer pages
import { OfficerDashboard } from "./pages/officer/OfficerDashboard";
import { OfficerTenders } from "./pages/officer/OfficerTenders";
import { OfficerBidders } from "./pages/officer/OfficerBidders";
import { OfficerBidderDocs } from "./pages/officer/OfficerBidderDocs";
import { OfficerAiProcessing } from "./pages/officer/OfficerAiProcessing";
import { OfficerAiResults } from "./pages/officer/OfficerAiResults";
import { OfficerEvidence } from "./pages/officer/OfficerEvidence";

export function App() {
  return (
    <AppProvider>
      <HashRouter>
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
      </HashRouter>
    </AppProvider>
  );
}

export default App;
