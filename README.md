# GemxAI — AI-Powered Bid Compliance Verification Platform

> **GeM AI Tender Evaluation Portal**  
> Integrated Bid Compliance Verification & Forensic Triangulation Platform inspired by the Government e-Marketplace (GeM) and Mercell enterprise procurement standards.

---

## 🏛️ Overview

**GemxAI** is a modern, full-featured procurement and technical tender evaluation portal built with **React 18, Vite 6, and TypeScript**. It provides dual-role workflows for both **Registered Bidders** and **Tender Evaluation Officers**, featuring automated multi-stage forensic compliance checking, cross-document inconsistency detection (e.g. Make-in-India vs. Technical BOQ), and human-in-the-loop governance under GFR 2017 standards.

---

## 🚀 Key Features

### 🏢 Bidder Portal
- **Tender Discovery**: Explore PSU tenders by category, issuing authority, and closing date.
- **Tender Specifications**: Review eligibility criteria, EMD escrow, and mandatory statutory requirements.
- **Statutory Document Checklist**: Real-time upload checklist for 10 statutory documents (GST, PAN, Udyam MSME, ITR, EPFO/ESIC, Make in India, Balance Sheets, Technical BOQ, OEM Authorization, Non-Blacklisting).
- **Bid Submission Tracking**: Track submitted enterprise bids with unique cryptographic submission IDs.

### 🛡️ Procurement Officer Console
- **Tender Overview & Bidder Rosters**: High-level metrics (`ACTIVE 08`, `PENDING 24`, `COMPLETED 41`) and bidder lists per tender.
- **On-Demand AI Verification**: AI verification strictly requires officer initiation — avoiding automated bias before manual document review.
- **10-Stage Forensic Processing**: Real-time progress monitoring across OCR, QR checksums, Udyam Databank API, GSTN returns, PAN/ITR reconciliation, and Blacklisting checks.
- **AI Scorecard & Anomaly Detection**: 13-point compliance matrix with score generation (e.g. `82/100`, `LOW RISK`, 96% AI confidence).
- **Side-by-Side Evidence Viewer**: Forensic cross-referencing comparing statutory declarations (e.g. 75% local content claim) against component origin in Technical BOQ (e.g. imported German assembly).
- **Human-in-the-Loop Decision Recording**: Formal qualification, disqualification, or statutory clarification notices with DSC token signing.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router v6](https://reactrouter.com/) (`HashRouter` for zero-configuration client hosting)
- **Icons**: [Lucide React](https://lucide.dev/) + Sovereign SVGs
- **Design System**: Scoped zero-dependency design tokens (`tokens.ts`) with Inter & Merriweather typography.

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/adityaraj250806-jpg/GemxAI.git
cd GemxAI

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview production bundle
npm run preview
```

---

## 🗂️ Project Structure

```
GemxAI/
├── index.html              # HTML Shell with Google Font preconnects
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── src/
    ├── main.tsx            # Application entry point
    ├── App.tsx             # HashRouter & route declarations
    ├── index.css           # Global typography and base CSS reset
    ├── tokens.ts           # Centralized design tokens (colors, fonts, shadows)
    ├── context/
    │   └── AppContext.tsx  # Global state (auth, active role, toasts)
    ├── data/               # Strongly typed mock datasets
    │   ├── tenders.ts
    │   ├── bidders.ts
    │   ├── documents.ts
    │   ├── verificationResults.ts
    │   └── evidence.ts
    ├── services/           # Service layer
    │   ├── authService.ts
    │   ├── tenderService.ts
    │   ├── bidderService.ts
    │   ├── documentService.ts
    │   └── verificationService.ts
    ├── components/
    │   ├── layout/         # AppHeader, AppSidebar, AppLayout
    │   └── modals/         # DocumentModal, OfficerDecisionModal
    └── pages/
        ├── HomePage.tsx    # Mercell-inspired sovereign landing page
        ├── LoginPage.tsx   # Dual-panel e-Gov login with canvas captcha
        ├── bidder/         # Bidder workspace views
        └── officer/        # Procurement officer evaluation views
```

---

## ⚖️ Governance & Compliance

Built in accordance with:
- **General Financial Rules (GFR) 2017** — Rule 144, Rule 149, Rule 170.
- **Public Procurement (Preference to Make in India) Order 2017**.
- **GeM 4.0 Standard Architecture**.

---

## 📄 License

This project is licensed under the MIT License.
