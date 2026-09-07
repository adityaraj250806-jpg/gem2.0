import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { tenderService } from "../../services/tenderService";
import { documentService } from "../../services/documentService";
import { DocumentModal } from "../../components/modals/DocumentModal";
import { Tender } from "../../data/tenders";
import { DocumentItem } from "../../data/documents";
import { useApp } from "../../context/AppContext";
import { C, F, S } from "../../tokens";
import {
  DEMO_DOCUMENTS,
  generateValidPdfDataUrl,
  downloadDemoPdf,
  downloadAllDemoDocuments,
  getNonBlacklistingAffidavitText
} from "../../utils/demoDocuments";

interface DocStateItem {
  id: string;
  name: string;
  hint: string;
  fileName: string | null;
  fileSize: string | null;
  fileDataUrl?: string;
  isUploaded: boolean;
  docRef: DocumentItem;
}

const STATUTORY_REQUIREMENTS = [
  { id: "doc-gst", name: "1. GST Registration Certificate & GSTR-3B", hint: "Active GSTIN registration certificate with filed returns" },
  { id: "doc-pan", name: "2. Permanent Account Number (PAN) Card", hint: "Enterprise PAN certificate issued by Income Tax Dept" },
  { id: "doc-udyam", name: "3. Udyam / MSME Certificate", hint: "Valid MSME classification for GFR EMD waiver" },
  { id: "doc-itr", name: "4. Income Tax Return (ITR-V)", hint: "Filed acknowledgment for past 2 consecutive assessment years" },
  { id: "doc-epfo", name: "5. EPFO & ESIC Registration Certificate", hint: "Proof of statutory employee social security compliance" },
  { id: "doc-mii", name: "6. Make in India Declaration (PPO 2017)", hint: "Class-I local supplier domestic content percentage certification" },
  { id: "doc-balance-sheet", name: "7. Audited Balance Sheet & CA Turnover Certificate", hint: "3-year audited financial statements certified by Chartered Accountant" },
  { id: "doc-boq", name: "8. Technical BOQ Line-Item Compliance", hint: "Signed technical datasheets matching tender specification clauses" },
  { id: "doc-oem", name: "9. OEM Authorization / Manufacturing License", hint: "Valid original equipment manufacturer clearance" },
  { id: "doc-undertaking", name: "10. Non-Blacklisting & Integrity Undertaking", hint: "Notarized affidavit on non-judicial stamp paper" }
];

export const BidderUpload: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast, user } = useApp();

  const [tender, setTender] = useState<Tender | null>(null);
  const [docItems, setDocItems] = useState<DocStateItem[]>([]);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [showAffidavitModal, setShowAffidavitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [copiedFormat, setCopiedFormat] = useState(false);

  // File input refs for each document slot
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const tenderId = id || "CPCL-2026-TE-045";
    tenderService.getTenderById(tenderId).then(t => {
      if (t) setTender(t);
      else tenderService.getAllTenders().then(list => setTender(list[0]));
    });

    documentService.getDocumentsByBidder("BID-001").then(savedDocs => {
      const initial: DocStateItem[] = STATUTORY_REQUIREMENTS.map(r => {
        const found = savedDocs.find(d => d.id === r.id);
        const hasExisting = !!found && !!found.fileName;

        return {
          id: r.id,
          name: r.name,
          hint: r.hint,
          fileName: found?.fileName || null,
          fileSize: found?.fileSize || null,
          fileDataUrl: found?.fileDataUrl,
          isUploaded: hasExisting,
          docRef: found || {
            id: r.id,
            title: r.name,
            fileName: "",
            fileSize: "",
            uploadDate: "",
            verified: false,
            category: "Compliance",
            content: { status: "Pending Upload" }
          }
        };
      });

      setDocItems(initial);
    });
  }, [id]);

  // Open native Windows file selector dialog for a specific document
  const triggerFileDialog = (docId: string) => {
    const input = fileInputRefs.current[docId];
    if (input) {
      input.click();
    }
  };

  // Handle native file selection
  const handleFileChange = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processSelectedFile(docId, file);
    e.target.value = ""; // Reset input so same file can be re-selected if desired
  };

  // Process selected file from PC
  const processSelectedFile = (docId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      const formattedSize = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${Math.max(1, Math.round(file.size / 1024))} KB`;

      await documentService.uploadDocument("BID-001", docId, {
        name: file.name,
        size: file.size,
        fileDataUrl: dataUrl
      });

      setDocItems(prev => prev.map(item => {
        if (item.id === docId) {
          const updatedDocRef: DocumentItem = {
            id: item.id,
            title: item.name,
            fileName: file.name,
            fileSize: formattedSize,
            fileDataUrl: dataUrl,
            uploadDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
            verified: true,
            category: "Compliance",
            content: {
              status: "Uploaded from Local PC",
              originalFileName: file.name,
              fileType: file.type || "Document",
              lastModified: new Date(file.lastModified).toLocaleDateString("en-IN")
            }
          };

          return {
            ...item,
            fileName: file.name,
            fileSize: formattedSize,
            fileDataUrl: dataUrl,
            isUploaded: true,
            docRef: updatedDocRef
          };
        }
        return item;
      }));

      showToast(`Selected "${file.name}" (${formattedSize}) from your PC!`, "success");
    };
    reader.readAsDataURL(file);
  };

  // Drag & drop handlers
  const handleDragOver = (docId: string, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverId(docId);
  };

  const handleDragLeave = (docId: string, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragOverId === docId) setDragOverId(null);
  };

  const handleDrop = (docId: string, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverId(null);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(docId, file);
    }
  };

  // 1-Click Attach Demo Document
  const handleAttachDemo = async (docId: string) => {
    const demo = DEMO_DOCUMENTS.find(d => d.id === docId);
    if (!demo) return;

    const dataUrl = generateValidPdfDataUrl(demo);

    await documentService.uploadDocument("BID-001", docId, {
      name: demo.fileName,
      size: demo.fileSize.includes("MB") ? parseFloat(demo.fileSize) * 1024 * 1024 : parseFloat(demo.fileSize) * 1024,
      fileDataUrl: dataUrl
    });

    setDocItems(prev => prev.map(item => {
      if (item.id === docId) {
        const updatedDocRef: DocumentItem = {
          id: item.id,
          title: demo.name,
          fileName: demo.fileName,
          fileSize: demo.fileSize,
          fileDataUrl: dataUrl,
          uploadDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          verified: true,
          category: demo.category,
          content: demo.metadata
        };

        return {
          ...item,
          fileName: demo.fileName,
          fileSize: demo.fileSize,
          fileDataUrl: dataUrl,
          isUploaded: true,
          docRef: updatedDocRef
        };
      }
      return item;
    }));

    showToast(`Attached demo document "${demo.fileName}" (${demo.fileSize}) successfully!`, "success");
  };

  // Download individual demo PDF to user's computer
  const handleDownloadSample = (docId: string) => {
    const demo = DEMO_DOCUMENTS.find(d => d.id === docId);
    if (demo) {
      downloadDemoPdf(demo);
      showToast(`Downloaded "${demo.fileName}" to your PC Downloads folder`, "info");
    }
  };

  // Download all 10 demo PDFs
  const handleDownloadAllDemos = () => {
    downloadAllDemoDocuments();
    showToast("Triggered download of all 10 statutory demo PDF documents to your PC", "success");
  };

  // 1-Click Fill Remaining Missing Documents
  const handleFillMissingWithDemo = () => {
    const missing = docItems.filter(d => !d.isUploaded);
    if (missing.length === 0) {
      showToast("All 10 documents are already attached!", "info");
      return;
    }

    missing.forEach(item => {
      handleAttachDemo(item.id);
    });
    showToast(`Attached demo documents for all ${missing.length} remaining requirement(s)!`, "success");
  };

  // Auto-fill all 10 sample files
  const handleAutoFillAllSample = () => {
    DEMO_DOCUMENTS.forEach(demo => {
      handleAttachDemo(demo.id);
    });
    showToast("Populated all 10 authentic statutory demo documents!", "success");
  };

  // Remove a document
  const handleRemove = (docId: string) => {
    setDocItems(prev => prev.map(item => {
      if (item.id === docId) {
        return {
          ...item,
          fileName: null,
          fileSize: null,
          fileDataUrl: undefined,
          isUploaded: false
        };
      }
      return item;
    }));
    showToast("Document cleared. Ready to select a new file from your PC.", "info");
  };

  // Clear all files
  const handleClearAll = () => {
    setDocItems(prev => prev.map(item => ({
      ...item,
      fileName: null,
      fileSize: null,
      fileDataUrl: undefined,
      isUploaded: false
    })));
    showToast("All document slots cleared. You can upload each file from your PC.", "info");
  };

  // Copy Affidavit Text
  const handleCopyAffidavit = () => {
    navigator.clipboard.writeText(getNonBlacklistingAffidavitText());
    setCopiedFormat(true);
    setTimeout(() => setCopiedFormat(false), 2500);
    showToast("Copied Non-Blacklisting Affidavit format to clipboard!", "success");
  };

  // Final bid submission
  const handleSubmitBid = async () => {
    if (!tender) return;
    setSubmitting(true);
    const res = await documentService.submitBid(
      tender.id,
      tender.referenceNumber,
      user?.name || "ABC Engineering Ltd",
      docItems,
      tender.title,
      tender.department
    );
    setSubmitting(false);

    if (res.success) {
      showToast(`Bid submitted successfully! Reference: ${res.submission.bidId} — Synced in real-time to Officer Evaluation Console.`, "success");
      navigate("/bidder/bids");
    }
  };

  const uploadedCount = docItems.filter(d => d.isUploaded).length;
  const totalCount = docItems.length || 10;
  const percent = Math.round((uploadedCount / totalCount) * 100);
  const pendingCount = totalCount - uploadedCount;

  return (
    <div style={{ maxWidth: 1140, margin: "0 auto", fontFamily: F.sans, paddingBottom: 60 }}>
      {/* Top Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontSize: 12, color: C.inkFaint }}>
          <Link to={`/bidder/tenders/${tender?.id || ""}`} style={{ color: C.navy, textDecoration: "none", fontWeight: 600 }}>
            ← Tender Details
          </Link>
          {" / "}
          <span style={{ color: C.ink, fontWeight: 700 }}>Upload Statutory Documents</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {pendingCount > 0 && (
            <button
              onClick={handleFillMissingWithDemo}
              style={{
                padding: "8px 16px",
                borderRadius: 7,
                border: "none",
                background: `linear-gradient(135deg, ${C.navy} 0%, #1e40af 100%)`,
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 12.5,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 2px 8px rgba(11,61,145,0.25)"
              }}
              title="Instantly attach demo documents for the missing requirements (e.g. Document 10)"
            >
              <span>⚡</span> {pendingCount === 1 ? "Fill Pending #10 with Demo" : `Fill ${pendingCount} Pending with Demo`}
            </button>
          )}

          <button
            onClick={handleDownloadAllDemos}
            style={{
              padding: "8px 14px",
              borderRadius: 7,
              border: `1px solid ${C.border}`,
              background: "#ffffff",
              color: C.navy,
              fontWeight: 700,
              fontSize: 12.5,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
            title="Download all 10 sample PDF documents to your computer hard drive"
          >
            <span>📥</span> Download All 10 Demo PDFs
          </button>

          <button
            onClick={() => setShowAffidavitModal(true)}
            style={{
              padding: "8px 14px",
              borderRadius: 7,
              border: `1px solid #b45309`,
              background: "#fffbeb",
              color: "#92400e",
              fontWeight: 700,
              fontSize: 12.5,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
            title="View or copy the official ₹100 Stamp Paper Non-Blacklisting Affidavit legal text"
          >
            <span>📜</span> ₹100 Stamp Format
          </button>

          <button
            onClick={handleAutoFillAllSample}
            style={{
              padding: "8px 14px",
              borderRadius: 7,
              border: `1px solid ${C.border}`,
              background: "#ffffff",
              color: C.ink,
              fontWeight: 700,
              fontSize: 12.5,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
            title="Auto-populate all 10 sample government certificates"
          >
            <span>⚡</span> Auto-Fill All 10
          </button>

          <button
            onClick={handleClearAll}
            style={{
              padding: "8px 12px",
              borderRadius: 7,
              border: `1px solid #cbd5e1`,
              background: "#ffffff",
              color: C.crimson,
              fontWeight: 700,
              fontSize: 12.5,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5
            }}
            title="Clear all uploaded documents"
          >
            <span>🗑️</span> Clear All
          </button>

          <button
            onClick={handleSubmitBid}
            disabled={submitting}
            style={{
              padding: "10px 22px",
              borderRadius: 8,
              background: `linear-gradient(135deg, ${C.gemOrange} 0%, #ea580c 100%)`,
              color: "#ffffff",
              fontWeight: 800,
              fontSize: 13,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(243,112,33,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            {submitting ? "Submitting..." : "SUBMIT BID →"}
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 700, color: C.navy, background: "#eff6ff", padding: "2px 8px", borderRadius: 4, border: "1px solid #bfdbfe" }}>
            {tender?.referenceNumber || "CPCL/2026/TE/045"}
          </span>
          <span style={{ fontSize: 12, color: C.inkFaint }}>
            Procuring Authority: {tender?.department || "CPCL"}
          </span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.ink, margin: "4px 0 6px" }}>
          Upload Statutory Verification Documents
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: C.inkMuted }}>
          Select official PDF, JPG, PNG, or DOCX documents from your computer for each statutory compliance requirement, or use the pre-built demo documents for instant testing.
        </p>
      </div>

      {/* Demo Documents Ready Notice Box */}
      <div
        style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)",
          borderRadius: 12,
          border: "1px solid #bbf7d0",
          padding: "14px 20px",
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 28 }}>📦</div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: C.navy }}>
              Project Demo Documents Ready (Including #10 Non-Blacklisting Notarized Undertaking)
            </div>
            <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 2 }}>
              All 10 statutory sample files are available. Use <strong>"⚡ Use Demo Document"</strong> on any row to attach with 1 click, or download sample PDFs to your computer.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => handleAttachDemo("doc-undertaking")}
            style={{
              padding: "7px 14px",
              borderRadius: 6,
              background: "#059669",
              color: "#ffffff",
              border: "none",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5
            }}
          >
            <span>⚡</span> Attach #10 Undertaking
          </button>

          <button
            onClick={() => handleDownloadSample("doc-undertaking")}
            style={{
              padding: "7px 14px",
              borderRadius: 6,
              background: "#ffffff",
              color: C.navy,
              border: `1px solid ${C.border}`,
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5
            }}
          >
            <span>📥</span> Download Undertaking PDF
          </button>
        </div>
      </div>

      {/* Progress & Upload Instructions Box */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          padding: "18px 24px",
          marginBottom: 24,
          boxShadow: S.card
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>
            Mandatory Documents Uploaded:{" "}
            <span style={{ color: C.navy, fontSize: 17, fontWeight: 800 }}>{uploadedCount} / {totalCount}</span>
            <span style={{ fontSize: 12, color: C.inkFaint, fontWeight: 500, marginLeft: 8 }}>({percent}% complete)</span>
          </div>
          <span
            style={{
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 800,
              background: percent === 100 ? "#f0fdf4" : "#fffbeb",
              color: percent === 100 ? C.emerald : C.amber,
              border: percent === 100 ? "1px solid #bbf7d0" : "1px solid #fde68a"
            }}
          >
            {percent === 100 ? "Ready for Submission ✓" : `${pendingCount} Document(s) Pending`}
          </span>
        </div>

        <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden", marginBottom: 12 }}>
          <div
            style={{
              height: "100%",
              width: `${percent}%`,
              background: `linear-gradient(90deg, ${C.teal}, ${C.emerald})`,
              transition: "width 0.3s ease"
            }}
          />
        </div>

        <div style={{ fontSize: 12, color: C.inkFaint, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span>💡 <strong>Tip:</strong> Click <strong>"📁 Choose File from PC"</strong> to select a file from your hard drive, or <strong>"⚡ Use Demo Document"</strong> for instant population.</span>
          <span>📁 Supported: PDF, JPG, PNG, DOCX (up to 25 MB)</span>
        </div>
      </div>

      {/* Document Items List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {docItems.map(item => {
          const isDragging = dragOverId === item.id;
          const isUndertaking = item.id === "doc-undertaking";

          return (
            <div
              key={item.id}
              onDragOver={e => handleDragOver(item.id, e)}
              onDragLeave={e => handleDragLeave(item.id, e)}
              onDrop={e => handleDrop(item.id, e)}
              style={{
                background: isDragging ? "#eff6ff" : isUndertaking && !item.isUploaded ? "#fffdf5" : "#ffffff",
                borderRadius: 12,
                border: isDragging
                  ? `2px dashed ${C.navy}`
                  : isUndertaking && !item.isUploaded
                  ? `1.5px dashed #f59e0b`
                  : item.isUploaded
                  ? "1px solid #cbd5e1"
                  : `1px solid ${C.border}`,
                padding: "16px 22px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
                boxShadow: item.isUploaded ? S.subtle : "none",
                transition: "all 0.15s ease"
              }}
            >
              {/* Hidden file input for native OS file selection */}
              <input
                type="file"
                ref={el => (fileInputRefs.current[item.id] = el)}
                style={{ display: "none" }}
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx"
                onChange={e => handleFileChange(item.id, e)}
              />

              {/* Left Column: Status Icon & Details */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 280 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: item.isUploaded ? "#f0fdf4" : isUndertaking ? "#fffbeb" : "#f1f5f9",
                    color: item.isUploaded ? C.emerald : isUndertaking ? "#d97706" : C.inkFaint,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 16,
                    border: `1.5px solid ${item.isUploaded ? "#86efac" : isUndertaking ? "#fde68a" : "#cbd5e1"}`,
                    flexShrink: 0
                  }}
                >
                  {item.isUploaded ? "✓" : "○"}
                </div>

                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: C.ink }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 12, color: C.inkFaint, marginTop: 2 }}>
                    {item.hint}
                  </div>

                  {item.isUploaded ? (
                    <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: 12,
                          color: C.navy,
                          fontWeight: 700,
                          fontFamily: F.mono,
                          background: "#eff6ff",
                          padding: "2px 8px",
                          borderRadius: 4,
                          border: "1px solid #bfdbfe",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5
                        }}
                      >
                        <span>📄</span> {item.fileName}
                      </span>
                      {item.fileSize && (
                        <span style={{ fontSize: 11, color: C.inkFaint }}>
                          ({item.fileSize})
                        </span>
                      )}
                      <span style={{ fontSize: 11, color: C.emerald, fontWeight: 700 }}>
                        ● Uploaded & Ready
                      </span>
                    </div>
                  ) : (
                    <div style={{ marginTop: 4, fontSize: 11.5, color: isUndertaking ? "#b45309" : C.amber, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                      <span>⚠️ Pending Upload</span>
                      {isUndertaking && (
                        <span style={{ background: "#fef3c7", padding: "1px 6px", borderRadius: 4, fontSize: 11, color: "#92400e" }}>
                          Demo file available below
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
                {item.isUploaded ? (
                  <>
                    <button
                      onClick={() => setPreviewDoc(item.docRef)}
                      style={{
                        padding: "7px 14px",
                        borderRadius: 6,
                        border: `1px solid ${C.border}`,
                        background: "#ffffff",
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: C.navy,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 5
                      }}
                      title="Preview this document"
                    >
                      <span>👁️</span> Preview
                    </button>

                    <button
                      onClick={() => triggerFileDialog(item.id)}
                      style={{
                        padding: "7px 14px",
                        borderRadius: 6,
                        border: `1px solid #cbd5e1`,
                        background: "#f8fafc",
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: C.ink,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 5
                      }}
                      title="Replace this file with another file from your computer"
                    >
                      <span>🔄</span> Replace from PC
                    </button>

                    <button
                      onClick={() => handleDownloadSample(item.id)}
                      style={{
                        padding: "7px 10px",
                        borderRadius: 6,
                        border: `1px solid ${C.border}`,
                        background: "#ffffff",
                        color: C.inkMuted,
                        fontSize: 12,
                        cursor: "pointer"
                      }}
                      title="Download sample PDF copy"
                    >
                      <span>📥</span>
                    </button>

                    <button
                      onClick={() => handleRemove(item.id)}
                      style={{
                        padding: "7px 10px",
                        borderRadius: 6,
                        border: "1px solid #fecaca",
                        background: "#fff1f2",
                        color: C.crimson,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                      title="Remove uploaded file"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleAttachDemo(item.id)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 6,
                        border: "none",
                        background: isUndertaking ? "#059669" : C.navy,
                        color: "#ffffff",
                        fontSize: 12.5,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                      }}
                      title="Instantly attach the official pre-built demo document"
                    >
                      <span>⚡</span> {isUndertaking ? "Use Demo Undertaking" : "Use Demo Document"}
                    </button>

                    <button
                      onClick={() => triggerFileDialog(item.id)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 6,
                        border: `1px solid ${C.border}`,
                        background: "#ffffff",
                        color: C.ink,
                        fontSize: 12.5,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 5
                      }}
                      title="Browse your computer to select this statutory document"
                    >
                      <span>📁</span> Choose from PC
                    </button>

                    <button
                      onClick={() => handleDownloadSample(item.id)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 6,
                        border: `1px solid ${C.border}`,
                        background: "#f8fafc",
                        color: C.navy,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4
                      }}
                      title="Download sample PDF to your PC"
                    >
                      <span>📥</span> Sample
                    </button>

                    {isUndertaking && (
                      <button
                        onClick={() => setShowAffidavitModal(true)}
                        style={{
                          padding: "8px 10px",
                          borderRadius: 6,
                          border: `1px solid #fde68a`,
                          background: "#fffbeb",
                          color: "#92400e",
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer"
                        }}
                        title="View affidavit wording for Rs. 100 stamp paper"
                      >
                        <span>📜</span> Format
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Floating/Sticky Submission Card */}
      <div
        style={{
          marginTop: 28,
          padding: "20px 28px",
          background: "#ffffff",
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          boxShadow: S.card,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16
        }}
      >
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.ink }}>
            Completed Statutory Package: {uploadedCount} of {totalCount} Uploaded
          </div>
          <div style={{ fontSize: 12, color: C.inkFaint, marginTop: 2 }}>
            Once submitted, documents are immediately routed to the Officer Portal for AI Triangulation and evaluation.
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {pendingCount > 0 && (
            <button
              onClick={handleFillMissingWithDemo}
              style={{
                padding: "11px 20px",
                borderRadius: 8,
                background: "#059669",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 13,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              <span>⚡</span> Fill Remaining {pendingCount} with Demo
            </button>
          )}

          <button
            onClick={handleSubmitBid}
            disabled={submitting}
            style={{
              padding: "12px 32px",
              borderRadius: 8,
              background: `linear-gradient(135deg, ${C.gemOrange} 0%, #ea580c 100%)`,
              color: "#ffffff",
              fontWeight: 800,
              fontSize: 14,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(243,112,33,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <span>🚀</span> {submitting ? "Submitting Bid..." : "SUBMIT BID TO OFFICER PORTAL →"}
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && <DocumentModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />}

      {/* Affidavit Format Modal */}
      {showAffidavitModal && (
        <div
          onClick={() => setShowAffidavitModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 760,
              background: "#ffffff",
              borderRadius: 14,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
              overflow: "hidden"
            }}
          >
            <div style={{ padding: "16px 22px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.ink }}>
                  📜 Format of Non-Blacklisting & Integrity Undertaking Affidavit
                </div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>
                  Required on ₹100 Non-Judicial Stamp Paper attested by Notary Public
                </div>
              </div>
              <button
                onClick={() => setShowAffidavitModal(false)}
                style={{ background: "transparent", border: "none", fontSize: 20, cursor: "pointer", color: C.inkMuted }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: "20px", overflowY: "auto", background: "#fafafa" }}>
              <pre style={{
                background: "#ffffff",
                padding: "16px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 12,
                lineHeight: 1.6,
                color: C.ink,
                whiteSpace: "pre-wrap",
                fontFamily: F.mono
              }}>
                {getNonBlacklistingAffidavitText()}
              </pre>
            </div>

            <div style={{ padding: "14px 22px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc" }}>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={handleCopyAffidavit}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 6,
                    background: copiedFormat ? "#059669" : C.navy,
                    color: "#ffffff",
                    border: "none",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer"
                  }}
                >
                  {copiedFormat ? "✓ Copied to Clipboard!" : "📋 Copy Affidavit Text"}
                </button>

                <a
                  href="/demo-documents/Non_Blacklisting_Undertaking_Template.txt"
                  download="Non_Blacklisting_Undertaking_Template.txt"
                  style={{
                    padding: "8px 14px",
                    borderRadius: 6,
                    border: `1px solid ${C.border}`,
                    background: "#ffffff",
                    color: C.ink,
                    fontWeight: 600,
                    fontSize: 13,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  <span>📥</span> Download .txt Format
                </a>
              </div>

              <button
                onClick={() => {
                  handleAttachDemo("doc-undertaking");
                  setShowAffidavitModal(false);
                }}
                style={{
                  padding: "8px 18px",
                  borderRadius: 6,
                  background: "#059669",
                  color: "#ffffff",
                  border: "none",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer"
                }}
              >
                ⚡ Attach Demo Undertaking to Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidderUpload;
