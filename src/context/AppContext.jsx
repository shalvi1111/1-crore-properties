import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROPERTIES } from '../data/properties';
import { USERS } from '../data/users';
import { INITIAL_MAINTENANCE_REQUESTS } from '../data/dashboard';
import { SERVICES_LIST, INITIAL_SERVICE_REQUESTS } from '../data/services';
import { INITIAL_DOCUMENTS } from '../data/documents';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Load state from localStorage or initial mock data
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('1cp_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('1cp_wishlist');
    return saved ? JSON.parse(saved) : ["CP10241", "CP10242", "CP10243", "CP10244", "CP10246"];
  });

  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('1cp_compare');
    return saved ? JSON.parse(saved) : ["CP10242", "CP10243", "CP10244"];
  });

  const [currentUserRole, setCurrentUserRole] = useState(() => {
    return localStorage.getItem('1cp_user_role') || 'nri';
  });

  // Currency Converter state
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    return localStorage.getItem('1cp_currency') || 'INR';
  });

  const exchangeRates = {
    INR: { rate: 1, symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    USD: { rate: 0.012, symbol: '$', code: 'USD', name: 'US Dollar' },
    AED: { rate: 0.044, symbol: 'AED ', code: 'AED', name: 'UAE Dirham' },
    GBP: { rate: 0.0095, symbol: '£', code: 'GBP', name: 'British Pound' }
  };

  // Accepts a price in INR crores, INR rupees, or a formatted string such as
  // "₹1.45 Cr" / "₹85 L". All conversions use the shared selectedCurrency.
  const formatPrice = (value) => {
    let numericCrores = 0;

    if (typeof value === 'number' && Number.isFinite(value)) {
      numericCrores = value > 100000 ? value / 10000000 : value;
    } else if (typeof value === 'string') {
      const cleaned = value.replace(/,/g, '').replace(/[^0-9.]/g, '');
      const parsed = Number.parseFloat(cleaned);

      if (Number.isFinite(parsed)) {
        const normalized = value.toLowerCase();
        if (normalized.includes('l')) {
          numericCrores = parsed / 100;
        } else if (normalized.includes('cr')) {
          numericCrores = parsed;
        } else {
          // Plain numeric strings are treated as INR crore values for
          // backward compatibility with existing page components.
          numericCrores = parsed;
        }
      }
    }

    if (!Number.isFinite(numericCrores) || numericCrores < 0) {
      return '—';
    }

    const currency = exchangeRates[selectedCurrency] || exchangeRates.INR;

    if (selectedCurrency === 'INR') {
      return numericCrores < 1
        ? `₹${(numericCrores * 100).toFixed(2)} L`
        : `₹${numericCrores.toFixed(2)} Cr`;
    }

    const convertedValue = numericCrores * 10000000 * currency.rate;

    if (convertedValue >= 1000000) {
      return `${currency.symbol}${(convertedValue / 1000000).toFixed(2)}M`;
    }

    if (convertedValue >= 1000) {
      return `${currency.symbol}${(convertedValue / 1000).toFixed(1)}K`;
    }

    return `${currency.symbol}${convertedValue.toFixed(2)}`;
  };

  const [maintenanceRequests, setMaintenanceRequests] = useState(() => {
    const saved = localStorage.getItem('1cp_maintenance');
    return saved ? JSON.parse(saved) : INITIAL_MAINTENANCE_REQUESTS;
  });

  const [serviceRequests, setServiceRequests] = useState(() => {
    const saved = localStorage.getItem('1cp_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICE_REQUESTS;
  });

  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('1cp_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [siteVisits, setSiteVisits] = useState(() => {
    const saved = localStorage.getItem('1cp_site_visits');
    return saved ? JSON.parse(saved) : [
      { id: "SV-01", property: "Skyline Heights", date: "2024-06-15", time: "11:00 AM", status: "Confirmed" },
      { id: "SV-02", property: "Luxury Villa Greens", date: "2024-06-20", time: "03:00 PM", status: "Scheduled" }
    ];
  });

  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem('1cp_offers');
    return saved ? JSON.parse(saved) : [
      { id: "OF-01", property: "Commercial Office Space Hitech", offerPrice: "₹1.85 Cr", status: "Under Review" }
    ];
  });

  const [toast, setToast] = useState(null);

  // Global Modals State
  const [visitModal, setVisitModal] = useState({ isOpen: false, property: null });
  const [quoteModal, setQuoteModal] = useState({ isOpen: false, property: null });
  const [tourModal, setTourModal] = useState({ isOpen: false, tourType: 'Walkthrough Video', property: null });
  const [comparePicker, setComparePicker] = useState({ isOpen: false });
  const [aiCompareModal, setAiCompareModal] = useState({ isOpen: false });
  const [maintenanceModal, setMaintenanceModal] = useState({ isOpen: false });
  const [serviceModal, setServiceModal] = useState({ isOpen: false, serviceName: '' });
  const [docRequestModal, setDocRequestModal] = useState({ isOpen: false });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('1cp_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('1cp_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('1cp_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('1cp_user_role', currentUserRole);
  }, [currentUserRole]);

  useEffect(() => {
    localStorage.setItem('1cp_currency', selectedCurrency);
  }, [selectedCurrency]);

  useEffect(() => {
    localStorage.setItem('1cp_maintenance', JSON.stringify(maintenanceRequests));
  }, [maintenanceRequests]);

  useEffect(() => {
    localStorage.setItem('1cp_services', JSON.stringify(serviceRequests));
  }, [serviceRequests]);

  useEffect(() => {
    localStorage.setItem('1cp_documents', JSON.stringify(documents));
  }, [documents]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const toggleWishlist = (propertyId) => {
    setWishlist(prev => {
      const exists = prev.includes(propertyId);
      const next = exists ? prev.filter(id => id !== propertyId) : [...prev, propertyId];
      showToast(exists ? "Property removed from shortlist" : "Property added to your shortlist!");
      return next;
    });
  };

  const toggleCompare = (propertyId) => {
    setCompareList(prev => {
      if (prev.includes(propertyId)) {
        showToast("Removed property from comparison");
        return prev.filter(id => id !== propertyId);
      }
      if (prev.length >= 4) {
        showToast("You can compare up to 4 properties at a time.", "warning");
        return prev;
      }
      showToast("Property added to comparison!");
      return [...prev, propertyId];
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast("Comparison cleared");
  };

  // Real client-side file downloader
  const downloadFile = (filename, content, mimeType = 'text/plain') => {
    try {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(`Downloaded: ${filename}`);
    } catch (err) {
      showToast(`Error generating download for ${filename}`, 'warning');
    }
  };

  const downloadBrochure = (property) => {
    if (!property) return;
    const content = `========================================================
1 CRORE PROPERTIES — OFFICIAL PROPERTY BROCHURE
========================================================
Property Name: ${property.title}
Property Code: ${property.code || property.id}
Location: ${property.location || 'Prime Location'}
Configuration: ${property.bhk || property.type} (${property.area || 1850} sq.ft)
Price: ${property.priceStr || '₹1.45 Cr - ₹1.99 Cr'}
RERA Status: ${property.reraApproved ? 'Verified Approved (' + property.reraId + ')' : 'Under RERA Registration'}
Developer: ${property.builder?.name || 'DLF / Prestige Verified Partner'}
Possession Date: ${property.possession || 'Ready to Move'}

AMENITIES & SPECIFICATIONS:
- 100% Clear Title Verified with 256-bit Digital Audit
- Premium Clubhouse with Gymnasium & Olympic Pool
- High-Speed Elevators & 100% DG Power Backup
- 24/7 Multi-tier Smart Security Surveillance
- Vastu-compliant layout designed for maximum natural light

FINANCIAL & INVESTMENT HIGHLIGHTS:
- Projected 5-Year Capital Appreciation: 14.8% per annum
- Est. Rental Yield: 3.8% gross yield
- Eligible for NRI Foreign Remittance via NRE/NRO repatriation

CONTACT OUR DEDICATED CONCIERGE:
Hotline: +91 98765 43210
Email: concierge@1croreproperties.com
Portal: https://www.1croreproperties.com/property/${property.id}
========================================================
Generated on: ${new Date().toLocaleString('en-IN')}
`;
    const safeTitle = (property.title || 'Property').replace(/[^a-zA-Z0-9]/g, '_');
    downloadFile(`1CroreProperties_Brochure_${safeTitle}.txt`, content, 'text/plain;charset=utf-8');
  };

  const downloadDocument = (doc) => {
    if (!doc) return;
    const content = `========================================================
1 CRORE PROPERTIES — DIGITAL DOCUMENT VAULT ARCHIVE
========================================================
Document Name: ${doc.name}
Category: ${doc.category || 'Legal / Property'}
Target Asset: ${doc.purpose || doc.property || 'Skyline Heights'}
Status: Verified & Blockchain Timestamped
Security: AES-256 Cloud Encrypted
Original Upload Date: ${doc.date || doc.uploadedOn || 'May 2024'}

LEGAL DISCLAIMER:
This digital certified copy is issued by 1 Crore Properties legal compliance desk. 
For registration verification with sub-registrar offices, contact our dedicated legal desk.

Certified by:
Advo. S. Ramanathan, Senior Legal Counsel (Bar Council Reg: TS/1892/2014)
1 Crore Properties Terminal
========================================================
Downloaded on: ${new Date().toLocaleString('en-IN')}
`;
    const safeName = (doc.name || 'Document').replace(/\.pdf$|\.docx$|\.xlsx$|\.jpg$/i, '');
    downloadFile(`Vault_${safeName}_Certified.txt`, content, 'text/plain;charset=utf-8');
  };

  const addProperty = (newProp) => {
    const id = `CP${10250 + properties.length + 1}`;
    const propertyObj = {
      ...newProp,
      id,
      code: id,
      rating: 4.8,
      reviewCount: 1,
      image: newProp.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      images: [newProp.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"],
      tag: "NEW",
      mediaTags: ["Walkthrough", "Video"],
      highlights: [
        { label: "Prime Location", desc: newProp.location || "Prime City" },
        { label: "Clear Title", desc: "100% Freehold" },
        { label: "RERA Approved", desc: newProp.reraId || "Verified" }
      ],
      amenities: ["24x7 Security", "Power Backup", "Car Parking", "Water Supply", "Clubhouse"],
      builder: {
        name: USERS.builder.name,
        verified: true,
        delivered: 25,
        ongoing: 2,
        rating: 4.8
      }
    };
    setProperties([propertyObj, ...properties]);
    showToast(`Property "${newProp.title}" listed successfully!`);
    return propertyObj;
  };

  const addMaintenanceRequest = (req) => {
    const newReq = {
      id: `MR${Math.floor(1000 + Math.random() * 9000)}`,
      title: req.title || "General Maintenance",
      priority: req.priority || "Medium",
      property: req.property || "Luxury Villa Greens",
      estCost: req.estCost || "₹1,200",
      status: "Assigned to Service Partner",
      assignedTo: req.assignedTo || "Verified 1Crore Tech Partner",
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setMaintenanceRequests([newReq, ...maintenanceRequests]);
    showToast("Maintenance request submitted and assigned!");
  };

  const assignMaintenanceRequest = (id) => {
    setMaintenanceRequests(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: "Assigned & In Progress" };
      }
      return item;
    }));
    showToast(`Request ${id} assigned to field technician.`);
  };

  const bookService = (serviceData) => {
    const newServiceReq = {
      id: `SR${Math.floor(10 + Math.random() * 90)}`,
      service: serviceData.service,
      property: serviceData.property || "Luxury Villa Greens",
      status: "In Progress",
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setServiceRequests([newServiceReq, ...serviceRequests]);
    showToast(`Service "${serviceData.service}" requested successfully!`);
  };

  const uploadDocument = (docData) => {
    const newDoc = {
      id: `DOC-${Math.floor(10 + Math.random() * 90)}`,
      name: docData.name,
      category: docData.category || "Property Documents",
      categoryId: docData.categoryId || "property",
      property: docData.property || "Luxury Villa Greens",
      uploadedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      size: docData.size || "1.4 MB",
      type: docData.type || "pdf",
      status: "Under Verification",
      downloadUrl: "#"
    };
    setDocuments([newDoc, ...documents]);
    showToast(`Document "${docData.name}" uploaded safely with 256-bit encryption!`);
  };

  const deleteDocument = (id) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    showToast("Document moved to trash");
  };

  const bookSiteVisit = (data) => {
    const newVisit = {
      id: `SV-${Math.floor(100 + Math.random() * 900)}`,
      property: data.propertyTitle,
      date: data.date,
      time: data.time || "11:00 AM",
      status: "Confirmed",
      name: data.name,
      phone: data.phone
    };
    setSiteVisits([newVisit, ...siteVisits]);
    showToast("Site visit scheduled successfully! Details sent via WhatsApp & Email.");
  };

  const submitOffer = (data) => {
    const newOffer = {
      id: `OF-${Math.floor(10 + Math.random() * 90)}`,
      property: data.propertyTitle,
      offerPrice: `₹${data.price}`,
      status: "Submitted to Seller"
    };
    setOffers([newOffer, ...offers]);
    showToast("Your offer has been submitted to the seller!");
  };

  // Modal Triggers
  const openVisitModal = (property) => setVisitModal({ isOpen: true, property });
  const closeVisitModal = () => setVisitModal({ isOpen: false, property: null });

  const openQuoteModal = (property) => setQuoteModal({ isOpen: true, property });
  const closeQuoteModal = () => setQuoteModal({ isOpen: false, property: null });

  const openTourModal = (tourType, property) => setTourModal({ isOpen: true, tourType, property });
  const closeTourModal = () => setTourModal({ isOpen: false, tourType: 'Walkthrough Video', property: null });

  const openComparePicker = () => setComparePicker({ isOpen: true });
  const closeComparePicker = () => setComparePicker({ isOpen: false });

  const openAiCompareModal = () => setAiCompareModal({ isOpen: true });
  const closeAiCompareModal = () => setAiCompareModal({ isOpen: false });

  const openMaintenanceModal = () => setMaintenanceModal({ isOpen: true });
  const closeMaintenanceModal = () => setMaintenanceModal({ isOpen: false });

  const openServiceModal = (serviceName) => setServiceModal({ isOpen: true, serviceName });
  const closeServiceModal = () => setServiceModal({ isOpen: false, serviceName: '' });

  const openDocRequestModal = () => setDocRequestModal({ isOpen: true });
  const closeDocRequestModal = () => setDocRequestModal({ isOpen: false });

  const user = USERS[currentUserRole] || USERS.nri;

  return (
    <AppContext.Provider value={{
      properties,
      wishlist,
      compareList,
      currentUserRole,
      setCurrentUserRole,
      user,
      selectedCurrency,
      setSelectedCurrency,
      exchangeRates,
      formatPrice,
      downloadFile,
      downloadBrochure,
      downloadDocument,
      maintenanceRequests,
      serviceRequests,
      documents,
      siteVisits,
      offers,
      toast,
      showToast,
      toggleWishlist,
      toggleCompare,
      clearCompare,
      addProperty,
      addMaintenanceRequest,
      assignMaintenanceRequest,
      bookService,
      uploadDocument,
      deleteDocument,
      bookSiteVisit,
      submitOffer,
      // Modals
      visitModal, openVisitModal, closeVisitModal,
      quoteModal, openQuoteModal, closeQuoteModal,
      tourModal, openTourModal, closeTourModal,
      comparePicker, openComparePicker, closeComparePicker,
      aiCompareModal, openAiCompareModal, closeAiCompareModal,
      maintenanceModal, openMaintenanceModal, closeMaintenanceModal,
      serviceModal, openServiceModal, closeServiceModal,
      docRequestModal, openDocRequestModal, closeDocRequestModal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
