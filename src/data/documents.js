export const INITIAL_DOCUMENTS = [
  {
    id: "DOC-01",
    name: "Sale Agreement.pdf",
    category: "Property Documents",
    categoryId: "property",
    property: "Skyline Heights",
    uploadedOn: "28 May 2024",
    size: "2.4 MB",
    type: "pdf",
    status: "Verified",
    downloadUrl: "#"
  },
  {
    id: "DOC-02",
    name: "Power of Attorney.docx",
    category: "Legal Documents",
    categoryId: "legal",
    property: "General",
    uploadedOn: "25 May 2024",
    size: "1.1 MB",
    type: "doc",
    status: "Approved",
    downloadUrl: "#"
  },
  {
    id: "DOC-03",
    name: "Rental Income Statement.xlsx",
    category: "Financial Documents",
    categoryId: "financial",
    property: "FY 2023-24",
    uploadedOn: "22 May 2024",
    size: "850 KB",
    type: "xls",
    status: "Verified",
    downloadUrl: "#"
  },
  {
    id: "DOC-04",
    name: "Passport - Rahul Sharma.pdf",
    category: "Personal Documents",
    categoryId: "personal",
    property: "KYC",
    uploadedOn: "20 May 2024",
    size: "1.2 MB",
    type: "pdf",
    status: "Verified",
    downloadUrl: "#"
  },
  {
    id: "DOC-05",
    name: "Property Tax Receipt.jpg",
    category: "Tax Documents",
    categoryId: "tax",
    property: "Green Acres Plots",
    uploadedOn: "18 May 2024",
    size: "720 KB",
    type: "jpg",
    status: "Verified",
    downloadUrl: "#"
  },
  {
    id: "DOC-06",
    name: "Encumbrance Certificate.pdf",
    category: "Property Documents",
    categoryId: "property",
    property: "Luxury Villa Greens",
    uploadedOn: "15 May 2024",
    size: "1.8 MB",
    type: "pdf",
    status: "Verified",
    downloadUrl: "#"
  },
  {
    id: "DOC-07",
    name: "NRI Form 15CA/CB.pdf",
    category: "Tax Documents",
    categoryId: "tax",
    property: "FY 2024-25",
    uploadedOn: "10 May 2024",
    size: "940 KB",
    type: "pdf",
    status: "Approved",
    downloadUrl: "#"
  },
  {
    id: "DOC-08",
    name: "OCI Card Copy.pdf",
    category: "KYC Documents",
    categoryId: "kyc",
    property: "Identity Verification",
    uploadedOn: "05 May 2024",
    size: "1.5 MB",
    type: "pdf",
    status: "Verified",
    downloadUrl: "#"
  }
];

export const DOCUMENT_CATEGORIES_SUMMARY = [
  { id: "all", label: "All Documents", count: 56, icon: "Files", desc: "Total Files" },
  { id: "property", label: "Property Documents", count: 18, icon: "Building", desc: "Sale deeds, agreements, approvals, possession letters etc." },
  { id: "personal", label: "Personal Documents", count: 10, icon: "User", desc: "Passport, ID proofs, address proofs and other personal docs." },
  { id: "financial", label: "Financial Documents", count: 8, icon: "IndianRupee", desc: "Bank statements, income proofs, investments, loan docs." },
  { id: "legal", label: "Legal Documents", count: 7, icon: "Scale", desc: "POA, affidavits, NOCs, legal opinions and more." },
  { id: "tax", label: "Tax Documents", count: 13, icon: "FileText", desc: "ITR, TDS, Form 16, property tax receipts, etc." },
  { id: "kyc", label: "KYC Documents", count: 6, icon: "ShieldCheck", desc: "KYC, PAN, Aadhaar, FATCA, CRS & other compliances." }
];

export const STORAGE_BREAKDOWN = [
  { name: "Property Docs", percentage: 45, color: "#f59e0b" },
  { name: "Personal Docs", percentage: 20, color: "#3b82f6" },
  { name: "Financial Docs", percentage: 15, color: "#10b981" },
  { name: "Others", percentage: 20, color: "#a855f7" }
];
