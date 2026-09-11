# GemxAI — AI-Powered Sovereign Bid Compliance & Forensic Verification Platform

> **GeM 4.0 AI Tender Evaluation Portal**  
> Integrated Bid Compliance Verification, Ground-Truth Registry Triangulation & Forensic Evidence Platform built strictly in alignment with the **General Financial Rules (GFR 2017)** and **Public Procurement (Preference to Make in India) Order 2017**.

---

## 🏛️ Executive Overview

**GemxAI** is an enterprise-grade sovereign procurement and technical tender evaluation platform built with **React 18, Vite 6, and TypeScript**, backed by an **Express / MongoDB** persistence engine. 

Designed for both **Registered Bidders** and **Tender Evaluation Officers (TIA/TEC)**, the platform eliminates manual document verification overhead by automating multi-stage forensic compliance checking, external government registry cross-referencing, and cross-document mathematical triangulation (e.g. Make-in-India % claims vs. technical BOQ imported bills of materials).

---

## 🚀 Key Modules & Architecture

### 1. 🏢 Sovereign Bidder Workspace
- **Tender Discovery & Details:** Search and filter public PSU tenders across ONGC, CPCL, IOCL, GAIL, and HPCL. Review Pre-Qualification Criteria (PQC), delivery schedules, and statutory clauses.
- **10-Point Statutory Upload Checklist:** Dynamic document submission gateway enforcing all 10 mandatory certificates:
  1. GST Registration Certificate (Form REG-06) & GSTR-3B
  2. Permanent Account Number (PAN) Card
  3. Udyam / MSME Certificate (GFR EMD waiver)
  4. Income Tax Return (ITR-6 / ITR-V)
  5. EPFO & ESIC Combined Social Security Certificate
  6. Make in India (PPO 2017) Statutory Declaration
  7. Audited Balance Sheet & CA Turnover Certificate (with ICAI UDIN)
  8. Technical BOQ Line-Item Specification Compliance
  9. OEM Authorization / Manufacturing License
  10. Non-Blacklisting & Integrity Undertaking (e-Stamp Affidavit)
- **Document Previews & Authentic Artifacts:** Full-fidelity modal viewer rendering official government seals, digital signatures (DSC), QR verification tags, and notarized e-stamps.
- **Bid Submission Engine:** Immediate cryptographic bid generation synced directly to the Tender Evaluation Committee (TEC) console.

### 2. 🛡️ Procurement Officer Evaluation Console
- **Tender Oversight:** View all submitted bidders, package completion ratios, and compliance statuses.
- **On-Demand AI Verification:** AI auditing strictly requires officer initiation — preventing premature bias and preserving human-in-the-loop governance.
- **10-Stage Automated Forensic Audit Engine:**
  - *Stage 1:* Document Ingestion & Geometry Extraction
  - *Stage 2:* Multimodal OCR & Layout Analysis
  - *Stage 3:* QR Code Cryptographic Checksums
  - *Stage 4:* MSME Udyam Databank API Verification
  - *Stage 5:* CBIC GSTN Active Status & Filing History Verification
  - *Stage 6:* CBDT Corporate PAN & ITR Verification
  - *Stage 7:* EPFO & ESIC Labor Welfare & Arrears Audit
  - *Stage 8:* CPPP & GeM Central Debarment / Holiday-Listing Check
  - *Stage 9:* Make in India Cross-Document Mathematical Triangulation
  - *Stage 10:* Final Compliance Score (0–100) & Risk Classification
- **Automated Forensic Audit Scorecard:** High-visibility compliance score, risk level badge (`LOW RISK`, `HIGH RISK`, `REJECT`), and detailed parameter checklists.
- **Official TEC Decision Recording:** Formal record of qualification, disqualification, or clarification notice issuance with digital signature verification.

### 3. 🔍 Live Multi-Error Evidence Inspector (Split-Screen View)
- **Live Discrepancy Selector Ribbon:** Instantly switch between all detected flaws in real-time (e.g. Anomaly 1, Anomaly 2, Anomaly 3).
- **Dual-Pane Side-by-Side Comparison:**
  - **Left Viewport (Primary Document Excerpt):** What the bidder submitted in their PDF with yellow glowing text highlights.
  - **Right Viewport (Government Registry / Tender NIT Rule):** The official ground-truth registry or tender specification clause disproving the bidder's claim.
- **Forensic Reasoning Engine:** Deep contextual explanations detailing statutory non-conformance under GFR 2017 rules.
- **All-Discrepancies Comparative Matrix:** Summary table outlining every parameter, finding type, and severity.

### 4. 🏛️ Master Government & Regulatory Ground-Truth Databank (`govtRegistry.ts`)
Simulates official Central and State Government databases for real-time triangulation:
- **CBIC GST Portal:** Verifies active status, regular taxpayer class, and GSTR-1/3B filing defaults.
- **CBDT Income Tax Portal:** Reconciles gross taxable turnovers and e-filing acknowledgement numbers.
- **Ministry of MSME:** Confirms Udyam registration perpetual validity and manufacturing classification.
- **EPFO Unified Portal:** Validates active ECR employee counts and statutory contributions.
- **ESIC Portal:** Flags outstanding Section 45A demand notices and arrears.
- **ICAI UDIN Registry:** Validates practicing Chartered Accountant membership numbers and firm registrations.
- **CPPP Debarment Register:** Centralized blacklisting and debarment checks.

---

## 🎯 Live Internal Evaluation Demo Flow (Quick Guide)

A brand new tender and dedicated bidder have been seeded for instant, flawless demonstration during presentations and evaluations:

### 🔑 Demo Credentials
| Role | Email / Username | Password | Entity Name |
| :--- | :--- | :--- | :--- |
| **Demo Bidder** | `tenders@abcengineering.com` | `Demo@GeM2026` | ABC Engineering Ltd (`BID-001`) |
| **Officer** | `procurement.officer@cpcl.gov.in` | `Officer#2026` | Dr. K. S. Ramanathan (Chief Procurement Officer) |

### 📋 Step-by-Step Walkthrough
1. **Login:** Go to `/login` and select **Demo Bidder** (`tenders@abcengineering.com` / `Demo@GeM2026`).
2. **Select Tender:** Open **`CPCL-2026-TE-045`** (*Supply of High Pressure Valves*).
3. **Upload Documents:** Navigate to the statutory upload section, view the authentic certificates, and click **Submit Tender Bid**.
4. **Switch to Officer:** Log in as **Procurement Officer** and open tender `CPCL-2026-TE-045`.
5. **Inspect & Verify:** Select **ABC Engineering (`BID-001`)**, inspect the document package, and click **✨ RUN AI VERIFICATION**.
6. **Watch Real-Time Scanning:** The 10-stage AI verification pipeline executes dynamically.
7. **Inspect Scorecard:** View the Make in India local content discrepancy anomaly.
8. **View Side-by-Side Evidence:** Click **"Inspect Live Evidence Proof"** to view the split-screen evidence verification.

---

## 🛠️ Technology Stack

- **Frontend:** [React 18](https://react.dev/), [Vite 6](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling:** Vanilla Scoped CSS with Centralized Sovereign Design Tokens (`tokens.ts`)
- **Routing:** [React Router v6](https://reactrouter.com/) (HashRouter for resilient client-side navigation)
- **Backend Server:** Node.js, Express, JSON Web Tokens (JWT), bcrypt
- **Database:** MongoDB / Mongoose with offline memory resilience
- **Icons & Graphics:** Lucide React, Sovereign Ashoka SVGs, Canvas Captcha Generator

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Local Setup

```bash
# Clone the repository
git clone https://github.com/adityaraj250806-jpg/GemxAI.git
cd GemxAI

# Install dependencies for frontend and backend
npm install
cd server && npm install && cd ..

# Start Vite Development Server (Port 5173)
npm run dev

# (Optional) Start Express Backend API (Port 5000)
cd server && npm run dev
```

Open your browser at `http://localhost:5173/`.

---

## 🗂️ Project Structure

```
GemxAI/
├── index.html                  # Sovereign HTML shell with UIDAI / GeM meta
├── package.json                # Frontend dependencies and build scripts
├── server/                     # Express REST backend
│   ├── models/                 # User, Tender, and Submission schemas
│   ├── routes/                 # Auth and Tender evaluation endpoints
│   ├── seed.js                 # Database seeding with Kavach & CPCL accounts
│   └── server.js               # Express app entry point
└── src/
    ├── App.tsx                 # Route declarations and layout shells
    ├── tokens.ts               # Sovereign color palette (Navy, Green, Saffron, Amber)
    ├── data/
    │   ├── tenders.ts          # Public tenders (CPCL, ONGC, IOCL, GAIL, HPCL)
    │   ├── bidders.ts          # Registered bidders (BID-001 to BID-004)
    │   ├── documents.ts        # Authentic 10-document sets per bidder
    │   ├── govtRegistry.ts     # Ground-truth databases (CBIC, CBDT, MSME, EPFO, ESIC, ICAI)
    │   ├── verificationResults.ts # Audit scorecards and anomaly checklists
    │   └── evidence.ts         # Multi-error side-by-side evidence records
    ├── services/
    │   ├── authService.ts      # Authentication with KNOWN_ACCOUNTS fallback
    │   ├── tenderService.ts    # Tender persistence and search
    │   ├── bidderService.ts    # Bidder evaluation and registry updates
    │   ├── documentService.ts  # Document upload and bid submission
    │   └── verificationService.ts # 10-stage AI verification execution
    └── pages/
        ├── HomePage.tsx        # GeM sovereign portal landing page
        ├── LoginPage.tsx       # Dual-panel e-Gov login with textured canvas captcha
        ├── bidder/             # Bidder dashboard, tenders, and upload checklist
        └── officer/            # Officer console, bidders, live AI scan, and evidence viewer
```

---

## ⚖️ Statutory Governance & Standards

- **General Financial Rules (GFR) 2017:** Rule 144 (Fundamental principles of public procurement), Rule 149 (Procurement through GeM), Rule 173 (Technical evaluation and rejection of non-conforming bids).
- **Public Procurement (Preference to Make in India) Order 2017:** Class-I Local Supplier ($\ge 50\%$) and Class-II ($\ge 20\%$) eligibility.
- **Public Procurement Policy for MSEs Order 2012:** EMD waivers and MSME purchase preference.

---

## 📄 License

This project is licensed under the **MIT License**.
