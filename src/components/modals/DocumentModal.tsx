import React, { useState } from "react";
import { DocumentItem } from "../../data/documents";
import { C, F } from "../../tokens";
import { DEMO_DOCUMENTS, downloadDemoPdf, getNonBlacklistingAffidavitText } from "../../utils/demoDocuments";

interface DocumentModalProps {
  doc: DocumentItem | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ doc, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!doc) return null;

  const content = doc.content || {};

  const handleDownloadFile = () => {
    // Check if matched in DEMO_DOCUMENTS
    const match = DEMO_DOCUMENTS.find(d => d.id === doc.id || d.fileName === doc.fileName);
    if (match) {
      downloadDemoPdf(match);
    } else {
      // Direct link fallback
      const link = document.createElement("a");
      link.href = `/demo-documents/${doc.fileName || "document.pdf"}`;
      link.download = doc.fileName || "Statutory_Document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyAffidavit = () => {
    const text = getNonBlacklistingAffidavitText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(15, 23, 42, 0.7)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: F.sans
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 780,
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "92vh",
          overflow: "hidden",
          border: `1px solid ${C.border}`
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f8fafc"
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.ink, display: "flex", alignItems: "center", gap: 8 }}>
              <span>📄</span>
              <span>{doc.title}</span>
            </div>
            <div style={{ fontSize: 12, color: C.inkFaint, marginTop: 2 }}>
              {doc.fileName} • {doc.fileSize} • Category: <strong style={{ color: C.navy }}>{doc.category || "Statutory Compliance"}</strong>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={handleDownloadFile}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: `1px solid ${C.border}`,
                background: "#ffffff",
                color: C.navy,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5
              }}
              title="Download official PDF copy to your computer"
            >
              <span>📥</span> Download PDF
            </button>

            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 20,
                color: C.inkMuted,
                cursor: "pointer",
                padding: 4,
                lineHeight: 1
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px", overflowY: "auto" }}>
          {doc.fileDataUrl && (
            <div style={{ marginBottom: 20, borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, background: "#f8fafc" }}>
              <div style={{ padding: "10px 16px", background: "#f1f5f9", fontSize: 12, fontWeight: 700, color: C.navy, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>📁 Attached Document File: {doc.fileName}</span>
                <span style={{ fontSize: 11, color: C.emerald, fontWeight: 700 }}>● Active Bidder Attachment</span>
              </div>
              <div style={{ padding: 12, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 180, background: "#ffffff" }}>
                {doc.fileDataUrl.startsWith("data:image/") ? (
                  <img src={doc.fileDataUrl} alt={doc.fileName} style={{ maxWidth: "100%", maxHeight: 420, objectFit: "contain", borderRadius: 6 }} />
                ) : doc.fileDataUrl.startsWith("data:application/pdf") ? (
                  <iframe src={doc.fileDataUrl} title={doc.fileName} style={{ width: "100%", height: 420, border: "none" }} />
                ) : (
                  <div style={{ textAlign: "center", padding: 24, color: C.inkMuted }}>
                    <span style={{ fontSize: 36 }}>📄</span>
                    <div style={{ fontWeight: 700, marginTop: 8, color: C.ink }}>{doc.fileName}</div>
                    <div style={{ fontSize: 12, color: C.inkFaint }}>Attached from Local File System ({doc.fileSize})</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 10. NON-BLACKLISTING & INTEGRITY UNDERTAKING (STAMP PAPER AFFIDAVIT) */}
          {(doc.id === "doc-undertaking" || doc.fileName?.includes("Blacklisting") || doc.fileName?.includes("Undertaking")) && (
            <div style={{ border: "2px solid #b45309", borderRadius: 10, overflow: "hidden", background: "#ffffff", boxShadow: "0 4px 20px rgba(180,83,9,0.12)" }}>
              {/* e-Stamp Paper Header Banner */}
              <div style={{ background: "linear-gradient(135deg, #78350f 0%, #b45309 50%, #92400e 100%)", color: "#ffffff", padding: "16px 20px", textAlign: "center", borderBottom: "3px solid #f59e0b" }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", opacity: 0.9, fontWeight: 700 }}>
                  GOVERNMENT OF INDIA • NON-JUDICIAL e-STAMP CERTIFICATE
                </div>
                <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: 0.5, margin: "4px 0" }}>
                  e-STAMP DUTY: ₹100/- (ONE HUNDRED RUPEES)
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 12, background: "rgba(0,0,0,0.25)", display: "inline-block", padding: "3px 12px", borderRadius: 4, marginTop: 2 }}>
                  Certificate No: {content.stampSerialNumber || "IN-TN98234710298374U"}
                </div>
              </div>

              {/* Certificate Particulars Table */}
              <div style={{ background: "#fffbeb", padding: "14px 18px", borderBottom: "1px solid #fde68a", fontSize: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div><strong>Purchased By:</strong> {content.deponentName?.split(",")[1]?.trim() || "ABC ENGINEERING LIMITED"}</div>
                <div><strong>Execution Date:</strong> {content.notarizedDate || "28/08/2026"}</div>
                <div><strong>Description of Doc:</strong> Article 4 Affidavit / Undertaking</div>
                <div><strong>Consideration Price:</strong> ₹100/- (Stamp Duty Paid)</div>
                <div style={{ gridColumn: "span 2" }}>
                  <strong>Statutory Clause:</strong> <span style={{ color: "#b45309", fontWeight: 700 }}>Rule 151 of General Financial Rules (GFR) 2017 & GeM Incident Management Policy</span>
                </div>
              </div>

              {/* Sworn Affidavit Text */}
              <div style={{ padding: "20px", background: "#fafafa" }}>
                <div style={{ textAlign: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.navy, letterSpacing: 0.5 }}>
                    AFFIDAVIT & SOLEMN UNDERTAKING
                  </div>
                  <div style={{ fontSize: 11.5, color: C.inkFaint }}>
                    Before the Tender Inviting Authority • CPCL / Government e-Marketplace (GeM)
                  </div>
                </div>

                <div style={{ fontSize: 12.5, color: C.ink, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ margin: 0 }}>
                    I, <strong>Mr. Rajesh Kumar</strong>, Managing Director of <strong>M/s ABC ENGINEERING LIMITED</strong>, Plot 14-B, Ambattur Industrial Estate, Chennai, do hereby solemnly swear and state on oath:
                  </p>

                  <div style={{ background: "#ffffff", padding: "12px 16px", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                    <div style={{ fontWeight: 700, color: C.navy, marginBottom: 4 }}>
                      1. Status of Non-Debarment & Non-Blacklisting:
                    </div>
                    <div>
                      {content.solemnAffirmation || "We hereby solemnly affirm and state on oath that M/s ABC Engineering Limited, its directors, partners, and key managerial personnel have never been blacklisted, debarred, suspended, or put on holiday list by GeM, Ministry of Petroleum & Natural Gas, CPCL, any Central/State Government Ministry, PSU, or multilateral funding agency. We also confirm full compliance with the Integrity Pact without any conflict of interest."}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}>
                      <strong>2. GFR Rule 151 Compliance:</strong>
                      <div style={{ color: C.emerald, fontWeight: 700, marginTop: 2 }}>✓ Fully Compliant (No debarment orders)</div>
                    </div>
                    <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}>
                      <strong>3. Insolvency / Bankruptcy (IBC):</strong>
                      <div style={{ color: C.emerald, fontWeight: 700, marginTop: 2 }}>✓ Nil / Fully Solvent Operating Concern</div>
                    </div>
                  </div>
                </div>

                {/* Notary Seal & Signatures Block */}
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px dashed #cbd5e1", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 11, color: C.inkFaint }}>DEPONENT / AUTHORIZED SIGNATORY</div>
                    <div style={{ fontFamily: "cursive", fontSize: 18, color: C.navy, margin: "6px 0 2px" }}>Rajesh Kumar</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>Mr. Rajesh Kumar</div>
                    <div style={{ fontSize: 11, color: C.inkFaint }}>Managing Director, ABC Engineering Limited</div>
                    <div style={{ fontSize: 10, color: C.inkMuted, marginTop: 2 }}>DIN: 02849102 • Corporate Seal Affixed</div>
                  </div>

                  {/* Red Notary Stamp */}
                  <div style={{ width: 130, height: 130, borderRadius: "50%", border: "2.5px solid #dc2626", color: "#dc2626", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 6, transform: "rotate(-6deg)", background: "rgba(220,38,38,0.03)" }}>
                    <div style={{ fontSize: 8, fontWeight: 800, textTransform: "uppercase" }}>R. SHANMUGAM</div>
                    <div style={{ fontSize: 7, fontWeight: 700, margin: "2px 0" }}>ADVOCATE & NOTARY</div>
                    <div style={{ fontSize: 8, fontWeight: 900 }}>GOVT. OF TAMIL NADU</div>
                    <div style={{ fontSize: 7 }}>REG. NO. 4412/2014</div>
                    <div style={{ fontSize: 8, fontWeight: 700, marginTop: 2 }}>CHENNAI - INDIA</div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: C.inkFaint }}>ATTESTED & REGISTERED BY</div>
                    <div style={{ fontFamily: "cursive", fontSize: 18, color: "#dc2626", margin: "6px 0 2px" }}>R. Shanmugam</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>{content.notaryAdvocate || "R. Shanmugam, B.Sc., B.L."}</div>
                    <div style={{ fontSize: 11, color: C.inkFaint }}>Notarial Register Vol. IX, Entry: 1428/2026</div>
                    <div style={{ fontSize: 10, color: C.emerald, fontWeight: 700, marginTop: 2 }}>● Valid through 14-06-2029</div>
                  </div>
                </div>

                <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", padding: 10, borderRadius: 6, marginTop: 16, fontSize: 12, color: "#065f46", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <span>✓ <strong>Cross-System Verification:</strong> Matched with CPPP Debarment Registry & GeM Incident System.</span>
                  <button
                    onClick={handleCopyAffidavit}
                    style={{
                      background: "#059669",
                      color: "#ffffff",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    {copied ? "✓ Copied to Clipboard!" : "📋 Copy Affidavit Text"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 1. GST REGISTRATION */}
          {doc.id === "doc-gst" && (
            <div style={{ border: "2px solid #0b3d91", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #0b3d91", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>GOVERNMENT OF INDIA • GOODS AND SERVICES TAX</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.navy, margin: "4px 0" }}>Registration Certificate</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Issued under Section 25 of the Central Goods and Services Tax Act, 2017</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                <div><strong>GSTIN:</strong> <span style={{ fontFamily: F.mono, color: C.navy, fontWeight: 700 }}>{content.registrationNumber}</span></div>
                <div><strong>Legal Name:</strong> {content.legalName}</div>
                <div><strong>Trade Name:</strong> {content.tradeName}</div>
                <div><strong>Date of Liability:</strong> {content.dateOfLiability}</div>
                <div><strong>Validity:</strong> <span style={{ color: C.emerald, fontWeight: 700 }}>{content.validity}</span></div>
                <div><strong>Taxpayer Type:</strong> {content.typeOfTaxpayer}</div>
                <div style={{ gridColumn: "span 2" }}><strong>Jurisdiction:</strong> {content.jurisdiction}</div>
              </div>
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: 10, borderRadius: 6, marginTop: 16, fontSize: 12, color: C.navy }}>
                ✓ <strong>Digital Signature Verification:</strong> Validated via Central Board of Indirect Taxes & Customs (CBIC).
              </div>
            </div>
          )}

          {/* 2. AUTHENTIC e-PAN CARD DESIGN (Matches Official NSDL / Income Tax Dept Format) */}
          {doc.id === "doc-pan" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Official Gazette Badge */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "8px 16px", borderRadius: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#166534", display: "flex", alignItems: "center", gap: 6 }}>
                  <span>✓</span> Central Board of Direct Taxes (CBDT) • Verified Permanent Account Number
                </span>
                <span style={{ fontSize: 11, fontFamily: F.mono, color: "#15803d", fontWeight: 800 }}>
                  PAN: {content.panNumber || "AABCA1234F"}
                </span>
              </div>

              {/* Realistic Two-Sided PAN Card Container */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: 16,
                  background: "#e2e8f0",
                  padding: 16,
                  borderRadius: 14,
                  border: "1.5px dashed #94a3b8"
                }}
              >
                {/* ─── FRONT SIDE OF PAN CARD ─── */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 30%, #93c5fd 70%, #dbeafe 100%)",
                    borderRadius: 12,
                    padding: "16px 18px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.7)",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid #93c5fd",
                    minHeight: 230,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  {/* Subtle Security Guilloche Pattern Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0.08,
                      pointerEvents: "none",
                      backgroundImage: "radial-gradient(#1e3a8a 1px, transparent 1px)",
                      backgroundSize: "8px 8px"
                    }}
                  />

                  {/* Top Header */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      {/* Left: Department */}
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: 900, color: "#831843", fontFamily: "serif", letterSpacing: "0.02em" }}>
                          आयकर विभाग
                        </div>
                        <div style={{ fontSize: 9.5, fontWeight: 900, color: "#831843", fontFamily: "serif", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                          INCOME TAX DEPARTMENT
                        </div>
                      </div>

                      {/* Center: Ashok Stambh Emblem */}
                      <div style={{ textAlign: "center", margin: "0 8px" }}>
                        <div style={{ fontSize: 22, color: "#1e3a8a", lineHeight: 1 }}>🏛️</div>
                        <div style={{ fontSize: 7, fontWeight: 800, color: "#1e3a8a", letterSpacing: 0.5 }}>सत्यमेव जयते</div>
                      </div>

                      {/* Right: Government */}
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 13, fontWeight: 900, color: "#831843", fontFamily: "serif", letterSpacing: "0.02em" }}>
                          भारत सरकार
                        </div>
                        <div style={{ fontSize: 9.5, fontWeight: 900, color: "#831843", fontFamily: "serif", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                          GOVT. OF INDIA
                        </div>
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div style={{ textAlign: "center", marginTop: 4 }}>
                      <div style={{ fontSize: 9.5, fontWeight: 800, color: "#1e3a8a" }}>
                        ई-स्थायी लेखा संख्या कार्ड
                      </div>
                      <div style={{ fontSize: 8, fontWeight: 700, color: "#1e40af", letterSpacing: 0.3 }}>
                        e-Permanent Account Number Card
                      </div>
                    </div>
                  </div>

                  {/* Middle Row: QR Code, Permanent Account Number, Hologram */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0 6px" }}>
                    {/* QR Code */}
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        background: "#ffffff",
                        borderRadius: 4,
                        border: "1px solid #cbd5e1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 26,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                      }}
                      title="Digitally Encrypted CBDT QR Code"
                    >
                      📱
                    </div>

                    {/* Prominent PAN Number */}
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 8.5, fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Permanent Account Number
                      </div>
                      <div
                        style={{
                          fontSize: 19,
                          fontWeight: 900,
                          fontFamily: F.mono,
                          color: "#0f172a",
                          letterSpacing: "0.12em",
                          textShadow: "0 1px 0 rgba(255,255,255,0.8)"
                        }}
                      >
                        {content.panNumber || "AABCA1234F"}
                      </div>
                    </div>

                    {/* Hologram */}
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 4,
                        background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 25%, #f8fafc 50%, #94a3b8 75%, #e2e8f0 100%)",
                        border: "1px solid #94a3b8",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                        opacity: 0.95
                      }}
                      title="Authentic Optical Variable Security Hologram"
                    >
                      <div style={{ fontSize: 6.5, fontWeight: 900, color: "#64748b", letterSpacing: 0.8 }}>HOLO</div>
                      <div style={{ fontSize: 13 }}>🛡️</div>
                      <div style={{ fontSize: 6.5, fontWeight: 900, color: "#64748b", letterSpacing: 0.8 }}>GRAM</div>
                    </div>
                  </div>

                  {/* Bottom Row: Name/DOB details, Signature box, Photo box */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
                    {/* Left: Entity Name & Father's Name */}
                    <div style={{ flex: 1, fontSize: 10.5, lineHeight: 1.35 }}>
                      <div>
                        <div style={{ fontSize: 8, color: "#475569", fontWeight: 700 }}>नाम / Name</div>
                        <div style={{ fontWeight: 900, color: "#0f172a", textTransform: "uppercase", letterSpacing: 0.2 }}>
                          {content.name || "ABC ENGINEERING LIMITED"}
                        </div>
                      </div>

                      <div style={{ marginTop: 4 }}>
                        <div style={{ fontSize: 8, color: "#475569", fontWeight: 700 }}>पिता का नाम / Father's Name</div>
                        <div style={{ fontWeight: 800, color: "#1e293b", textTransform: "uppercase" }}>
                          {content.fathersName || "N/A (CORPORATE ENTITY)"}
                        </div>
                      </div>

                      <div style={{ marginTop: 4 }}>
                        <div style={{ fontSize: 8, color: "#475569", fontWeight: 700 }}>जन्म की तारीख / Date of Birth / Inc.</div>
                        <div style={{ fontWeight: 800, color: "#1e293b", fontFamily: F.mono }}>
                          {content.incorporationDate || "14/05/2004"}
                        </div>
                      </div>
                    </div>

                    {/* Center-Right: Signature Box */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div
                        style={{
                          width: 80,
                          height: 28,
                          background: "rgba(255,255,255,0.85)",
                          borderRadius: 4,
                          border: "1px solid #94a3b8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "cursive",
                          fontSize: 13,
                          color: "#1e3a8a"
                        }}
                      >
                        Rajesh Kumar
                      </div>
                      <div style={{ fontSize: 7, color: "#475569", fontWeight: 700, marginTop: 2 }}>
                        हस्ताक्षर / Signature
                      </div>
                    </div>

                    {/* Right: Photo Frame */}
                    <div
                      style={{
                        width: 58,
                        height: 70,
                        background: "#ffffff",
                        borderRadius: 4,
                        border: "1.5px solid #64748b",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        flexShrink: 0
                      }}
                    >
                      <span style={{ fontSize: 32 }}>👤</span>
                      <span style={{ fontSize: 6.5, color: "#64748b", fontWeight: 700 }}>PHOTO</span>
                    </div>
                  </div>
                </div>

                {/* ─── BACK SIDE OF PAN CARD ─── */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 30%, #93c5fd 70%, #dbeafe 100%)",
                    borderRadius: 12,
                    padding: "16px 18px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.7)",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid #93c5fd",
                    minHeight: 230,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ fontSize: 9.5, fontWeight: 900, color: "#0f172a", lineHeight: 1.35 }}>
                      इस कार्ड के खोने/पाने पर कृपया सूचित करें/लौटाएं:
                    </div>
                    <div style={{ fontSize: 8.5, color: "#1e293b", marginTop: 2, lineHeight: 1.3 }}>
                      <strong>आयकर पैन सेवा इकाई, एन एस डी एल</strong><br />
                      5 वीं मंजिल, मंत्री स्टर्लिंग, प्लॉट नं. 341, सर्वे नं. 997/8,<br />
                      मॉडल कॉलोनी, दीप बंगला चौक के पास, पुणे - 411 016.
                    </div>

                    <div style={{ borderTop: "1px dashed rgba(30,58,138,0.3)", margin: "8px 0" }} />

                    <div style={{ fontSize: 9.5, fontWeight: 900, color: "#0f172a", lineHeight: 1.35, fontStyle: "italic" }}>
                      If this card is lost / someone's lost card is found, please inform / return to :
                    </div>
                    <div style={{ fontSize: 8.5, color: "#1e293b", marginTop: 2, lineHeight: 1.3 }}>
                      <strong>Income Tax PAN Services Unit, NSDL</strong><br />
                      5th Floor, Mantri Sterling, Plot No. 341, Survey No. 997/8,<br />
                      Model Colony, Near Deep Bungalow Chowk, Pune - 411 016.
                    </div>
                  </div>

                  {/* Contact & Verification Footer */}
                  <div style={{ background: "rgba(255,255,255,0.7)", padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.9)", fontSize: 8.5, color: "#1e3a8a", lineHeight: 1.4 }}>
                    <div><strong>Tel:</strong> 91-20-2721 8080, <strong>Fax:</strong> 91-20-2721 8081</div>
                    <div><strong>e-mail:</strong> tininfo@nsdl.co.in • <strong>Web:</strong> www.incometax.gov.in</div>
                    <div style={{ marginTop: 2, fontSize: 7.5, color: "#059669", fontWeight: 800 }}>
                      ✓ Authenticated Corporate Permanent Account Number under Section 139A of IT Act 1961
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Verification Table */}
              <div style={{ background: "#ffffff", padding: "14px 18px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 12 }}>
                <div style={{ fontWeight: 800, color: C.navy, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <span>📋</span> Extracted PAN Card Parameters (Direct CBDT/ITD Match):
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12 }}>
                  <div><strong>PAN Number:</strong> <span style={{ fontFamily: F.mono, color: C.navy, fontWeight: 700 }}>{content.panNumber || "AABCA1234F"}</span></div>
                  <div><strong>Entity Legal Name:</strong> {content.name || "ABC ENGINEERING LIMITED"}</div>
                  <div><strong>Date of Incorporation:</strong> {content.incorporationDate || "14/05/2004"}</div>
                  <div><strong>Issuing Authority:</strong> {content.issuingAuthority || "Income Tax Department, Government of India"}</div>
                  <div style={{ gridColumn: "span 2", color: C.emerald, fontWeight: 700 }}>
                    ✓ Corporate CIN & MCA Database Cross-Check: Verified & Matched (CIN: L28120TN2004PLC053210)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. UDYAM / MSME */}
          {doc.id === "doc-udyam" && (
            <div style={{ border: "2px solid #059669", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #059669", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>MINISTRY OF MICRO, SMALL & MEDIUM ENTERPRISES</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.emerald, margin: "4px 0" }}>UDYAM REGISTRATION CERTIFICATE</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Government of India Enterprise Verification</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                <div><strong>Udyam Number:</strong> <span style={{ fontFamily: F.mono, color: C.emerald, fontWeight: 700 }}>{content.udyamNumber}</span></div>
                <div><strong>Enterprise:</strong> {content.enterpriseName}</div>
                <div><strong>Classification:</strong> {content.classification}</div>
                <div><strong>Turnover:</strong> {content.turnover}</div>
                <div style={{ gridColumn: "span 2" }}><strong>Major Activity:</strong> {content.majorActivity}</div>
              </div>
              <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", padding: 10, borderRadius: 6, marginTop: 16, fontSize: 12, color: "#065f46" }}>
                ✓ <strong>EMD Waiver Status:</strong> Exempt from Earnest Money Deposit under GFR 2017 Rule 170.
              </div>
            </div>
          )}

          {/* 4. ITR-V */}
          {doc.id === "doc-itr" && (
            <div style={{ border: "2px solid #475569", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #475569", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>INCOME TAX DEPARTMENT • CENTRALIZED PROCESSING CENTER</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.navy, margin: "4px 0" }}>INDIAN INCOME TAX RETURN VERIFICATION (ITR-V)</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Assessment Year: {content.assessmentYear || "2025-26"} • Form: {content.formType || "ITR-6"}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                <div><strong>Acknowledgment No:</strong> <span style={{ fontFamily: F.mono, fontWeight: 700 }}>{content.acknowledgementNo}</span></div>
                <div><strong>Filing Date:</strong> {content.filingDate}</div>
                <div><strong>Gross Total Income:</strong> <span style={{ color: C.navy, fontWeight: 700 }}>{content.grossTotalIncome}</span></div>
                <div><strong>Total Tax Paid:</strong> <span style={{ color: C.emerald, fontWeight: 700 }}>{content.taxPaid}</span></div>
              </div>
              <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", padding: 10, borderRadius: 6, marginTop: 16, fontSize: 12, color: C.ink }}>
                ✓ <strong>Verification Status:</strong> Electronically Verified via Digital Signature Certificate (DSC).
              </div>
            </div>
          )}

          {/* 5. EPFO & ESIC */}
          {doc.id === "doc-epfo" && (
            <div style={{ border: "2px solid #0284c7", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #0284c7", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>EMPLOYEES' PROVIDENT FUND ORGANISATION (EPFO)</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#0284c7", margin: "4px 0" }}>ELECTRONIC CHALLAN CUM RETURN (ECR) RECEIPT</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Statutory Social Security Compliance</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                <div><strong>Establishment Code:</strong> <span style={{ fontFamily: F.mono, fontWeight: 700 }}>{content.establishmentCode}</span></div>
                <div><strong>Establishment Name:</strong> {content.establishmentName}</div>
                <div><strong>Active Contributing Members:</strong> {content.activeContributingMembers}</div>
                <div><strong>TRRN Number:</strong> <span style={{ fontFamily: F.mono, color: C.navy, fontWeight: 700 }}>{content.electronicChallanNo}</span></div>
                <div style={{ gridColumn: "span 2" }}><strong>Filing Status:</strong> <span style={{ color: C.emerald, fontWeight: 700 }}>{content.ecrFilingStatus}</span></div>
              </div>
            </div>
          )}

          {/* 6. MAKE IN INDIA */}
          {doc.id === "doc-mii" && (
            <div style={{ border: "2px solid #d97706", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #d97706", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>STATUTORY DECLARATION ON COMPANY LETTERHEAD</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.amber, margin: "4px 0" }}>Make in India Local Content Certificate</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Public Procurement Order 2017</div>
              </div>
              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", padding: 12, borderRadius: 6, marginBottom: 14, color: "#92400e", fontWeight: 700 }}>
                LOCAL CONTENT CLAIMED: {content.claimedLocalContent} ({content.supplierClassification})
              </div>
              <p style={{ fontSize: 13, color: C.ink, lineHeight: 1.5 }}>{content.statutoryDeclaration}</p>
              <div style={{ fontSize: 13, marginTop: 10 }}><strong>Location:</strong> {content.locationOfValueAddition}</div>
            </div>
          )}

          {/* 7. AUDITED BALANCE SHEET */}
          {doc.id === "doc-balance-sheet" && (
            <div style={{ border: "2px solid #0f766e", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #0f766e", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>INDEPENDENT AUDITOR'S REPORT & CA CERTIFICATE</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#0f766e", margin: "4px 0" }}>AUDITED FINANCIAL STATEMENTS</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Statutory Financial Audit for Tender Compliance</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                <div><strong>CA Firm:</strong> {content.caFirm}</div>
                <div><strong>Statutory UDIN:</strong> <span style={{ fontFamily: F.mono, fontWeight: 700, color: "#0f766e" }}>{content.caUdin}</span></div>
                <div><strong>Operating Revenue:</strong> <span style={{ fontWeight: 700, color: C.navy }}>{content.operatingRevenue}</span></div>
                <div><strong>Tangible Net Worth:</strong> <span style={{ fontWeight: 700, color: C.emerald }}>{content.netWorth}</span></div>
              </div>
            </div>
          )}

          {/* 8. TECHNICAL BOQ */}
          {doc.id === "doc-boq" && (
            <div style={{ border: "2px solid #334155", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #334155", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>SCHEDULE OF BILL OF QUANTITIES & TECHNICAL COMPLIANCE</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.navy, margin: "4px 0" }}>API 6D TECHNICAL DATASHEETS</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Standard: {content.specificationStandard}</div>
              </div>
              <div style={{ fontSize: 13, display: "flex", flexDirection: "column", gap: 10 }}>
                <div><strong>Total Line Items:</strong> {content.totalLineItems}</div>
                <div><strong>Key Component:</strong> {content.keyComponent1}</div>
                <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", padding: 10, borderRadius: 6, color: "#9f1239" }}>
                  <strong>Note:</strong> {content.keyComponent2}
                </div>
              </div>
            </div>
          )}

          {/* 9. OEM AUTHORIZATION */}
          {doc.id === "doc-oem" && (
            <div style={{ border: "2px solid #4338ca", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #4338ca", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>ORIGINAL EQUIPMENT MANUFACTURER AUTHORIZATION</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#4338ca", margin: "4px 0" }}>MANUFACTURER AUTHORIZATION FORM (MAF)</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Back-to-Back Warranty Guarantee</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                <div><strong>Authorizing OEM:</strong> {content.authorizingManufacturer}</div>
                <div><strong>Territory:</strong> {content.territory}</div>
                <div><strong>Validity:</strong> <span style={{ color: C.emerald, fontWeight: 700 }}>{content.validThrough}</span></div>
                <div><strong>Warranty:</strong> {content.warrantyCommitment}</div>
              </div>
            </div>
          )}

          {/* Generic Fallback for unlisted documents */}
          {!["doc-gst", "doc-pan", "doc-udyam", "doc-mii", "doc-undertaking", "doc-itr", "doc-epfo", "doc-balance-sheet", "doc-boq", "doc-oem"].includes(doc.id) && (
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.ink }}>{doc.title}</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Category: {doc.category}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
                {Object.entries(content).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: 8 }}>
                    <strong style={{ textTransform: "capitalize", minWidth: 160 }}>{k.replace(/([A-Z])/g, " $1")}:</strong>
                    <span>{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 24px",
            borderTop: `1px solid ${C.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f8fafc"
          }}
        >
          <div style={{ fontSize: 12, color: C.inkFaint }}>
            GeM Sentinel Statutory Verification Console
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handleDownloadFile}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: `1px solid ${C.border}`,
                background: "#ffffff",
                color: C.navy,
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              <span>📥</span> Download File
            </button>

            <button
              onClick={onClose}
              style={{
                padding: "8px 18px",
                borderRadius: 6,
                border: "none",
                background: C.navy,
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer"
              }}
            >
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
