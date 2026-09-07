$outputDir = "c:\Users\adity\Downloads\gem\gem2.o\public\demo-documents"
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
}

function Create-PdfFile {
    param(
        [string]$FileName,
        [string]$Title,
        [string]$Subtitle,
        [string[]]$BodyLines
    )

    $stream = "BT`n/F1 15 Tf`n50 740 Td`n($Title) Tj`nET`n"
    $stream += "BT`n/F1 11 Tf`n50 718 Td`n($Subtitle) Tj`nET`n"
    $stream += "BT`n/F1 9 Tf`n50 696 Td`n(GeM Tender Reference: CPCL/2026/TE/045 | Verified Document) Tj`nET`n"

    $y = 660
    foreach ($line in $BodyLines) {
        $clean = $line.Replace('\', '\\').Replace('(', '\(').Replace(')', '\)')
        $stream += "BT`n/F1 9.5 Tf`n50 $y Td`n($clean) Tj`nET`n"
        $y -= 20
    }

    $stream += "BT`n/F1 8 Tf`n50 110 Td`n(Official Demonstration Document for Government e-Marketplace Bidding Platform) Tj`nET`n"
    $stream += "BT`n/F1 8 Tf`n50 95 Td`n(Digital Certificate Timestamp: 2026-09-01T10:00:00Z - Status: Active / Authenticated) Tj`nET`n"

    $streamBytes = [System.Text.Encoding]::ASCII.GetBytes($stream)
    $streamLen = $streamBytes.Length

    $obj1 = "1 0 obj`n<< /Type /Catalog /Pages 2 0 R >>`nendobj`n"
    $obj2 = "2 0 obj`n<< /Type /Pages /Kids [3 0 R] /Count 1 >>`nendobj`n"
    $obj3 = "3 0 obj`n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>`nendobj`n"
    $obj4 = "4 0 obj`n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`nendobj`n"
    $obj5 = "5 0 obj`n<< /Length $streamLen >>`nstream`n$stream`nendstream`nendobj`n"

    $header = "%PDF-1.4`n"
    $pos1 = [System.Text.Encoding]::ASCII.GetByteCount($header)
    $pos2 = $pos1 + [System.Text.Encoding]::ASCII.GetByteCount($obj1)
    $pos3 = $pos2 + [System.Text.Encoding]::ASCII.GetByteCount($obj2)
    $pos4 = $pos3 + [System.Text.Encoding]::ASCII.GetByteCount($obj3)
    $pos5 = $pos4 + [System.Text.Encoding]::ASCII.GetByteCount($obj4)
    $xrefPos = $pos5 + [System.Text.Encoding]::ASCII.GetByteCount($obj5)

    $p1 = "{0:D10}" -f $pos1
    $p2 = "{0:D10}" -f $pos2
    $p3 = "{0:D10}" -f $pos3
    $p4 = "{0:D10}" -f $pos4
    $p5 = "{0:D10}" -f $pos5

    $xref = "xref`n0 6`n0000000000 65535 f `n$p1 00000 n `n$p2 00000 n `n$p3 00000 n `n$p4 00000 n `n$p5 00000 n `n"
    $trailer = "trailer`n<< /Size 6 /Root 1 0 R >>`nstartxref`n$xrefPos`n%%EOF`n"

    $fullPdf = $header + $obj1 + $obj2 + $obj3 + $obj4 + $obj5 + $xref + $trailer
    $dest = Join-Path $outputDir $FileName
    [System.IO.File]::WriteAllText($dest, $fullPdf)
    Write-Host "Created $dest"
}

# 1. GST Certificate
Create-PdfFile -FileName "GST_Certificate.pdf" `
    -Title "GOVERNMENT OF INDIA - GOODS AND SERVICES TAX" `
    -Subtitle "FORM GST REG-06 - REGISTRATION CERTIFICATE" `
    -BodyLines @(
        "Registration Number (GSTIN): 33AABCA1234F1Z8",
        "Legal Name: ABC ENGINEERING LIMITED",
        "Trade Name: ABC FLOW SOLUTIONS",
        "Constitution of Business: Public Limited Company",
        "Address: Plot 14-B, Ambattur Industrial Estate, Chennai - 600058",
        "Date of Liability: 01/07/2017 | Validity: Active",
        "Taxpayer Type: Regular | Jurisdiction: Range-IV, Division-II Chennai",
        "GSTR-3B & GSTR-1: Filed consecutively for 24 months through July 2026",
        "Digital Signature: CBIC Authorized Signatory Validated"
    )

# Also create minii.pdf (matches what user uploaded for requirement 1)
Create-PdfFile -FileName "minii.pdf" `
    -Title "GOVERNMENT OF INDIA - GST REGISTRATION & GSTR-3B" `
    -Subtitle "GSTIN 33AABCA1234F1Z8 - ACTIVE STATUTORY COMPLIANCE" `
    -BodyLines @(
        "Entity Name: ABC ENGINEERING LIMITED",
        "GSTIN: 33AABCA1234F1Z8 | Status: Active & In-Good-Standing",
        "Principal Place: Plot 14-B, Ambattur IE, Chennai 600058",
        "GSTR-3B Filing Acknowledgment ARN: AA3307260948210",
        "Statutory Returns Filed on time with zero overdue arrears"
    )

# 2. PAN Card
Create-PdfFile -FileName "PAN.pdf" `
    -Title "INCOME TAX DEPARTMENT - GOVT. OF INDIA" `
    -Subtitle "PERMANENT ACCOUNT NUMBER CARD" `
    -BodyLines @(
        "Permanent Account Number: AABCA1234F",
        "Name: ABC ENGINEERING LIMITED",
        "Date of Incorporation: 14/05/2004",
        "Corporate CIN: L28120TN2004PLC053210",
        "Issuing Authority: Income Tax Department, Government of India",
        "Verification Status: Direct ITD-MCA Matched"
    )

# 3. Udyam MSME Certificate
Create-PdfFile -FileName "Udyam.pdf" `
    -Title "MINISTRY OF MICRO, SMALL & MEDIUM ENTERPRISES" `
    -Subtitle "UDYAM REGISTRATION CERTIFICATE" `
    -BodyLines @(
        "Udyam Registration Number: UDYAM-TN-02-0045892",
        "Enterprise Name: ABC ENGINEERING LIMITED",
        "Classification: Medium Enterprise (Manufacturing)",
        "Major Activity: NIC 28120 - Manufacture of industrial high pressure valves",
        "Investment in Plant: Rs. 24.80 Crores | Turnover: Rs. 68.40 Crores",
        "EMD Exemption: Eligible under GFR 2017 Rule 170"
    )

# 4. Income Tax Return (ITR-V)
Create-PdfFile -FileName "ITR_V_FY24_25.pdf" `
    -Title "INCOME TAX DEPARTMENT - CENTRALIZED PROCESSING CENTER" `
    -Subtitle "INDIAN INCOME TAX RETURN VERIFICATION (ITR-V)" `
    -BodyLines @(
        "Assessment Year: 2025-2026 | Financial Year: 2024-2025",
        "Acknowledgment Number: 982347102938472",
        "Form Type: ITR-6 (Corporate Entity)",
        "Gross Total Income: Rs. 14,92,40,000",
        "Total Tax Paid: Rs. 3,72,10,000",
        "Filing Status: Electronic Verification Code Verified on 31/07/2025"
    )

# 5. EPFO & ESIC Certificate
Create-PdfFile -FileName "EPFO.pdf" `
    -Title "EMPLOYEES PROVIDENT FUND ORGANISATION (EPFO)" `
    -Subtitle "ELECTRONIC CHALLAN CUM RETURN (ECR) RECEIPT" `
    -BodyLines @(
        "Establishment Code: TN/MAS/0048291/000",
        "Establishment Name: ABC ENGINEERING LIMITED",
        "Wage Month: July 2026 | TRRN: 312260800921",
        "Total Covered Employees: 248 Members",
        "Payment Status: Confirmed / Paid in Full (Rs. 12,84,390)",
        "ESIC Employer Code: 51000849200000606 (Current Compliant)"
    )

# 6. Make in India Declaration
Create-PdfFile -FileName "Make_in_India_Declaration.pdf" `
    -Title "STATUTORY DECLARATION - MAKE IN INDIA ORDER (PPO 2017)" `
    -Subtitle "CLASS-I LOCAL SUPPLIER DOMESTIC CONTENT CERTIFICATE" `
    -BodyLines @(
        "Tender Reference: CPCL/2026/TE/045 (High Pressure Valves)",
        "Supplier Classification: Class-I Local Supplier",
        "Claimed Domestic Local Content: 75.00%",
        "Location of Value Addition: Plot 14-B, Ambattur IE, Chennai, Tamil Nadu",
        "Statutory Declaration: Issued on corporate letterhead pursuant to DPIIT order"
    )

# 7. Audited Balance Sheet & CA Certificate
Create-PdfFile -FileName "Audited_Balance_Sheet_FY25.pdf" `
    -Title "AUDITED FINANCIAL STATEMENTS & CA TURNOVER CERTIFICATE" `
    -Subtitle "M/s Ramanathan & Associates, Chartered Accountants" `
    -BodyLines @(
        "ICAI Statutory UDIN: 25042318AAAAAB8892",
        "Enterprise: ABC ENGINEERING LIMITED",
        "FY 2024-25 Turnover: Rs. 68.40 Crores",
        "FY 2023-24 Turnover: Rs. 61.20 Crores",
        "FY 2022-23 Turnover: Rs. 54.80 Crores",
        "3-Year Average Turnover: Rs. 61.47 Crores (Meets Tender Minimum Rs. 15 Cr)",
        "Net Worth: Rs. 42.30 Crores (Positive, Healthy, and Solvent)"
    )

# 8. Technical BOQ Final
Create-PdfFile -FileName "Technical_BOQ_Final.pdf" `
    -Title "TECHNICAL BILL OF QUANTITIES (BOQ) & CLAUSE COMPLIANCE" `
    -Subtitle "API 6D / ASME B16.34 SPECIFICATION COMPLIANCE" `
    -BodyLines @(
        "Tender Ref: CPCL/2026/TE/045 - High Pressure Valves & Actuators",
        "Total Line Items: 156 Items Fully Addressed",
        "Body Material: Cast Carbon Steel ASTM A216 WCB (Domestic Cast Foundry)",
        "Line Item 14.2 Note: High pressure hydraulic actuator pump assembly",
        "Lab Certification: Third-party hydrostatic & cryogenic lab clearance"
    )

# 9. OEM Authorization
Create-PdfFile -FileName "OEM_Authorization.pdf" `
    -Title "MANUFACTURER AUTHORIZATION FORM (MAF)" `
    -Subtitle "ABC Valvecraft Manufacturing Ltd to ABC ENGINEERING LIMITED" `
    -BodyLines @(
        "Authorizing Manufacturer: ABC Valvecraft Manufacturing Ltd",
        "Authorized Bidder: ABC ENGINEERING LIMITED",
        "Scope: Full manufacturing warranty for CPCL Tender CPCL/2026/TE/045",
        "Validity: Unconditionally valid through 31st December 2027",
        "Warranty Commitment: 36 Months Comprehensive On-site PSU Warranty"
    )

# 10. Non-Blacklisting & Integrity Undertaking (Crucial document requested by user!)
Create-PdfFile -FileName "Non_Blacklisting_Integrity_Undertaking.pdf" `
    -Title "NON-BLACKLISTING & INTEGRITY COMPLIANCE UNDERTAKING" `
    -Subtitle "AFFIDAVIT ON RS. 100/- NON-JUDICIAL STAMP PAPER" `
    -BodyLines @(
        "e-Stamp Certificate No: IN-TN98234710298374U | Value: Rs. 100/-",
        "Deponent: Rajesh Kumar, Managing Director, ABC ENGINEERING LIMITED",
        "1. DEBARMENT: Never blacklisted or debarred by GeM, CPCL, MoPNG or any PSU.",
        "2. GFR RULE 151: In full compliance; No operative debarment order under GFR 2017.",
        "3. INTEGRITY PACT: Absolute adherence to CVC ethical standards; Zero corruption.",
        "4. SOLVENCY: Solvent operational entity; No NCLT or IBC 2016 proceedings pending.",
        "5. TRUE RECORDS: All tender bid documents, turnover, and test sheets are authentic.",
        "DEPONENT: (Sd/- Rajesh Kumar, Managing Director, ABC Engineering Limited)",
        "ATTESTED BY: R. Shanmugam, Advocate & Notary Public (Reg No. 4412/2014, Chennai)"
    )

# Duplicate as Undertaking_Affidavit.pdf for tender reference compatibility
Create-PdfFile -FileName "Undertaking_Affidavit.pdf" `
    -Title "AFFIDAVIT OF NON-BLACKLISTING & DEBARMENT CLEARANCE" `
    -Subtitle "NOTARIZED STATUTORY UNDERTAKING FOR GeM BID SUBMISSION" `
    -BodyLines @(
        "e-Stamp Certificate: IN-TN98234710298374U",
        "Deponent: Rajesh Kumar, Managing Director, ABC ENGINEERING LIMITED",
        "Confirmed: Zero debarment history across all Central & State Government PSUs",
        "Notarized: 28th August 2026 by Advocate R. Shanmugam, High Court Chambers Chennai"
    )

Write-Host "All 10+ demo PDF statutory documents created successfully in public/demo-documents/"
