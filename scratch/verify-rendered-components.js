import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '../src/context/AppContext.jsx';

// Layouts
import PublicLayout from '../src/layouts/PublicLayout.jsx';
import NriLayout from '../src/layouts/NriLayout.jsx';

// Public & Property Pages
import PropertiesPage from '../src/pages/public/PropertiesPage.jsx';
import PropertyDetailPage from '../src/pages/public/PropertyDetailPage.jsx';

// Auth Pages
import LoginPage from '../src/pages/auth/LoginPage.jsx';
import BuilderRegisterPage from '../src/pages/auth/BuilderRegisterPage.jsx';
import CustomerRegisterPage from '../src/pages/auth/CustomerRegisterPage.jsx';
import NriRegisterPage from '../src/pages/auth/NriRegisterPage.jsx';

// Buyer Pages
import BuyerDashboard from '../src/pages/buyer/BuyerDashboard.jsx';
import PropertyDashboard from '../src/pages/buyer/PropertyDashboard.jsx';
import AddNewPropertyPage from '../src/pages/buyer/AddNewPropertyPage.jsx';
import AddOpenPlotPage from '../src/pages/buyer/AddOpenPlotPage.jsx';
import ComparePage from '../src/pages/buyer/ComparePage.jsx';
import ShortlistedPage from '../src/pages/buyer/ShortlistedPage.jsx';

// NRI Terminal Pages
import NriDashboard from '../src/pages/nri/NriDashboard.jsx';
import NriMyProperties from '../src/pages/nri/NriMyProperties.jsx';
import NriShortlisted from '../src/pages/nri/NriShortlisted.jsx';
import NriCompare from '../src/pages/nri/NriCompare.jsx';
import NriPropertyManagement from '../src/pages/nri/NriPropertyManagement.jsx';
import NriServices from '../src/pages/nri/NriServices.jsx';
import NriDocuments from '../src/pages/nri/NriDocuments.jsx';
import NriPayments from '../src/pages/nri/NriPayments.jsx';
import NriAgent from '../src/pages/nri/NriAgent.jsx';
import NriDetails from '../src/pages/nri/NriDetails.jsx';

// Admin Pages
import AdminDashboard from '../src/pages/admin/AdminDashboard.jsx';

// Setup mock window/localStorage for Node environment if needed
if (typeof window === 'undefined') {
  global.window = {
    location: { href: 'http://localhost:3000/' }
  };
}
if (typeof localStorage === 'undefined') {
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  };
}

const testCases = [
  { name: 'Home / Properties Page', path: '/', component: <PropertiesPage /> },
  { name: 'Property Details Page', path: '/properties/CP10241', component: <PropertyDetailPage /> },
  { name: 'Buyer Dashboard', path: '/buyer/dashboard', component: <BuyerDashboard /> },
  { name: 'Seller Property Dashboard', path: '/buyer/property-dashboard', component: <PropertyDashboard /> },
  { name: 'Add New Property Wizard', path: '/buyer/add-property', component: <AddNewPropertyPage /> },
  { name: 'Add Open Plot Wizard', path: '/buyer/add-open-plot', component: <AddOpenPlotPage /> },
  { name: 'Compare Properties Page', path: '/buyer/compare', component: <ComparePage /> },
  { name: 'Shortlisted Properties', path: '/buyer/shortlisted', component: <ShortlistedPage /> },
  { name: 'Admin Operations Dashboard', path: '/admin/dashboard', component: <AdminDashboard /> },
  { name: 'NRI Wealth Dashboard', path: '/nri/dashboard', component: <NriDashboard /> },
  { name: 'NRI My Properties', path: '/nri/properties', component: <NriMyProperties /> },
  { name: 'NRI Shortlisted Portfolio', path: '/nri/shortlisted', component: <NriShortlisted /> },
  { name: 'NRI Property Compare Matrix', path: '/nri/compare', component: <NriCompare /> },
  { name: 'NRI Property Management', path: '/nri/property-management', component: <NriPropertyManagement /> },
  { name: 'NRI Concierge Services', path: '/nri/services', component: <NriServices /> },
  { name: 'NRI Encrypted Documents', path: '/nri/documents', component: <NriDocuments /> },
  { name: 'NRI Milestone Payments', path: '/nri/payments', component: <NriPayments /> },
  { name: 'NRI Dedicated Agent Booking', path: '/nri/agent', component: <NriAgent /> },
  { name: 'NRI Investor KYC Details', path: '/nri/details', component: <NriDetails /> },
  { name: 'Login Page', path: '/login', component: <LoginPage /> },
  { name: 'Builder Registration', path: '/register/builder', component: <BuilderRegisterPage /> },
  { name: 'Customer Registration', path: '/register/customer', component: <CustomerRegisterPage /> },
  { name: 'NRI Registration', path: '/register/nri', component: <NriRegisterPage /> }
];

console.log(`Starting Component Tree Rendering Verification for ${testCases.length} core views...\n`);

let passed = 0;
let failed = 0;

for (const tc of testCases) {
  try {
    const html = renderToString(
      <AppProvider>
        <MemoryRouter initialEntries={[tc.path]}>
          {tc.component}
        </MemoryRouter>
      </AppProvider>
    );

    if (html && html.length > 50) {
      console.log(`[PASS] ${tc.name} (${tc.path}) -> Rendered ${html.length} bytes of HTML.`);
      passed++;
    } else {
      console.log(`[WARN] ${tc.name} (${tc.path}) -> Rendered empty or suspiciously small output.`);
      failed++;
    }
  } catch (err) {
    console.error(`[FAIL] ${tc.name} (${tc.path}) -> Exception during render:`, err.message);
    failed++;
  }
}

console.log(`\n========================================`);
console.log(`Rendering Results: Total: ${testCases.length}, Passed: ${passed}, Failed: ${failed}`);
console.log(`========================================\n`);
