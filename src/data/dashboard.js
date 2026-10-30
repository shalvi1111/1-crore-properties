export const BUYER_ACTIVITY = [
  { id: 1, type: "wishlist", title: "Added to wishlist", desc: "3 BHK Apartment in Whitefield", time: "2h ago", icon: "Heart" },
  { id: 2, type: "compare", title: "Compared properties", desc: "3 properties", time: "1d ago", icon: "Scale" },
  { id: 3, type: "search", title: "Saved search created", desc: "3 BHK in Bangalore", time: "2d ago", icon: "Search" },
  { id: 4, type: "view", title: "Property viewed", desc: "4 BHK Villa in Sarjapur Road", time: "3d ago", icon: "Eye" }
];

export const BUYER_SAVED_SEARCHES = [
  { id: 1, title: "3 BHK in Bangalore", filters: "Price: Any • ₹1 Cr - ₹1.99 Cr • 12 Results", active: true },
  { id: 2, title: "Villa in Bangalore", filters: "Price: Any • ₹1 Cr - ₹1.99 Cr • 8 Results", active: true },
  { id: 3, title: "East Facing Properties", filters: "Price: Any • Under ₹1.99 Cr • 25 Results", active: true }
];

export const PRICE_TREND_DATA = [
  { month: "Dec", price: 0.95 },
  { month: "Jan", price: 1.15 },
  { month: "Feb", price: 1.12 },
  { month: "Mar", price: 1.25 },
  { month: "Apr", price: 1.20 },
  { month: "May", price: 1.35 }
];

export const AUDIENCE_INSIGHTS = [
  { name: "Bangalore", value: 62, color: "#5b46e8" },
  { name: "Other Cities", value: 18, color: "#38bdf8" },
  { name: "NRI / Abroad", value: 12, color: "#22c55e" },
  { name: "Nearby Localities", value: 8, color: "#f97316" }
];

export const TRAFFIC_SOURCES = [
  { source: "1Crore Property Portal", percentage: 82, color: "#5b46e8" },
  { source: "Google Search", percentage: 11, color: "#38bdf8" },
  { source: "Direct / Bookmark", percentage: 4, color: "#22c55e" },
  { source: "Social Media", percentage: 3, color: "#f97316" }
];

export const SELLER_LEADS = [
  { id: "L1", name: "Saurav Kumar", action: "Brochure Downloaded", contact: "saurav.k@email.com\n+91 98765 43210", location: "Bangalore", interest: "2 BHK Apartment", date: "29 May 2024, 11:30 AM", status: "New" },
  { id: "L2", name: "Priya Reddy", action: "Price Quote Requested", contact: "priya.r@email.com\n+91 91234 56789", location: "Hyderabad", interest: "2 BHK Apartment", date: "29 May 2024, 10:15 AM", status: "Contacted" },
  { id: "L3", name: "Amit Mishra", action: "Site Visit Requested", contact: "amit.m@email.com\n+91 99887 76655", location: "Bangalore", interest: "2 BHK Apartment", date: "28 May 2024, 04:45 PM", status: "Scheduled" },
  { id: "L4", name: "Neha Patel", action: "Brochure Downloaded", contact: "neha.p@email.com\n+91 87654 32109", location: "Pune", interest: "2 BHK Apartment", date: "28 May 2024, 03:20 PM", status: "New" },
  { id: "L5", name: "Rahul Verma", action: "Price Quote Requested", contact: "rahul.v@email.com\n+91 78965 43211", location: "Delhi", interest: "2 BHK Apartment", date: "27 May 2024, 01:10 PM", status: "In Discussion" }
];

export const SELLER_SITE_VISITS = [
  { id: "SV1", name: "Saurav Kumar", phone: "+91 98765 43210", datetime: "30 May 2024, 11:00 AM", status: "Confirmed" },
  { id: "SV2", name: "Amit Mishra", phone: "+91 99887 76655", datetime: "31 May 2024, 02:00 PM", status: "Pending" },
  { id: "SV3", name: "Rohit Singh", phone: "+91 91234 88900", datetime: "01 Jun 2024, 10:30 AM", status: "Confirmed" }
];

export const NRI_PORTFOLIO_DONUT = [
  { name: "Under Construction", value: 2.55, percentage: 43.6, color: "#d97706" },
  { name: "Ready to Move", value: 2.85, percentage: 48.7, color: "#16a34a" },
  { name: "Plots / Land", value: 0.785, percentage: 7.7, color: "#ca8a04" }
];

export const NRI_SHORTLIST_DONUT = [
  { name: "Apartments", value: 2.20, percentage: 51.8, color: "#f97316" },
  { name: "Villas", value: 1.55, percentage: 36.5, color: "#16a34a" },
  { name: "Plots / Land", value: 0.50, percentage: 11.7, color: "#0ea5e9" }
];

export const NRI_COMPARE_DONUT = [
  { name: "Skyline Heights", value: 1.45, percentage: 19.6, color: "#f59e0b" },
  { name: "Luxury Villa Greens", value: 2.85, percentage: 38.5, color: "#10b981" },
  { name: "Oceanview Residences", value: 3.10, percentage: 41.9, color: "#0284c7" }
];

export const PROPERTY_MANAGEMENT_FINANCIAL = [
  { name: "Rent Received", value: 130000, percentage: 89.7, color: "#16a34a" },
  { name: "Maintenance", value: 10000, percentage: 6.9, color: "#f97316" },
  { name: "Other Charges", value: 5000, percentage: 3.4, color: "#6366f1" }
];

export const INITIAL_MAINTENANCE_REQUESTS = [
  {
    id: "MR1234",
    title: "AC Not Cooling",
    priority: "High",
    property: "Luxury Villa Greens",
    estCost: "₹1,500",
    status: "Pending Assignment",
    assignedTo: "CoolAir Services",
    date: "24 May 2024"
  },
  {
    id: "MR1235",
    title: "Water Leakage",
    priority: "Medium",
    property: "Oceanview Residences",
    estCost: "₹850",
    status: "Pending Assignment",
    assignedTo: "Apex Plumbing",
    date: "23 May 2024"
  },
  {
    id: "MR1236",
    title: "Paint Touch-up",
    priority: "Low",
    property: "Skyline Heights",
    estCost: "₹1,200",
    status: "Pending Assignment",
    assignedTo: "ColorCraft Painters",
    date: "21 May 2024"
  }
];

export const ADMIN_STATS = {
  totalProperties: "2,458",
  activeProperties: "1,890",
  underReview: "245",
  rejected: "78",
  totalEnquiries: "12,684",
  siteVisitRequests: "1,248",
  totalUsers: "856",
  verifiedAgents: "612",
  totalViews: "1.24M",
  totalLeads: "12,684"
};

export const ADMIN_PROPERTY_STATUS = [
  { name: "Active", value: 1890, percentage: 76.9, color: "#4f46e5" },
  { name: "Under Review", value: 245, percentage: 10.0, color: "#f59e0b" },
  { name: "Inactive", value: 167, percentage: 6.8, color: "#06b6d4" },
  { name: "Rejected", value: 78, percentage: 3.2, color: "#ef4444" },
  { name: "Expired", value: 78, percentage: 3.2, color: "#8b5cf6" }
];
