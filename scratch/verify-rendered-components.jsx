import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../src/context/AppContext.jsx';

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

// Polyfill minimal browser globals for SSR testing
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
  { name: 'Home / Properties Discovery', path: '/', element: <PropertiesPage /> },
  { name: 'Property Details View', path: '/properties/CP10241', element: <PropertyDetailPage /> },
  { name: 'Buyer Concierge Dashboard', path: '/buyer/dashboard', element: <BuyerDashboard /> },
  { name: 'Seller Property Analytics', path: '/buyer/property-dashboard', element: <PropertyDashboard /> },
  { name: 'Add New Property Wizard', path: '/buyer/add-property', element: <AddNewPropertyPage /> },
  { name: 'Add Open Plot Wizard', path: '/buyer/add-open-plot', element: <AddOpenPlotPage /> },
  { name: 'Buyer Compare Matrix', path: '/buyer/compare', element: <ComparePage /> },
  { name: 'Shortlisted Portfolio', path: '/buyer/shortlisted', element: <ShortlistedPage /> },
  { name: 'Admin Master Operations', path: '/admin/dashboard', element: <AdminDashboard /> },
  { name: 'NRI Wealth Dashboard', path: '/nri/dashboard', element: <NriDashboard /> },
  { name: 'NRI Owned Assets', path: '/nri/properties', element: <NriMyProperties /> },
  { name: 'NRI Shortlisted Units', path: '/nri/shortlisted', element: <NriShortlisted /> },
  { name: 'NRI Benchmarking Matrix', path: '/nri/compare', element: <NriCompare /> },
  { name: 'NRI Property Management', path: '/nri/property-management', element: <NriPropertyManagement /> },
  { name: 'NRI Advisory Services', path: '/nri/services', element: <NriServices /> },
  { name: 'NRI Document Repository', path: '/nri/documents', element: <NriDocuments /> },
  { name: 'NRI Milestone Escrow', path: '/nri/payments', element: <NriPayments /> },
  { name: 'NRI Relationship Officer', path: '/nri/agent', element: <NriAgent /> },
  { name: 'NRI Investor KYC Details', path: '/nri/details', element: <NriDetails /> },
  { name: 'Portal Login & Switching', path: '/login', element: <LoginPage /> },
  { name: 'Builder Registration (3-step)', path: '/register/builder', element: <BuilderRegisterPage /> },
  { name: 'Customer Registration (Tabs)', path: '/register/customer', element: <CustomerRegisterPage /> },
  { name: 'NRI Registration Flow', path: '/register/nri', element: <NriRegisterPage /> }
];

console.log(`Starting Component Tree Rendering Verification for ${testCases.length} core views...\n`);

let passed = 0;
let failed = 0;

for (const tc of testCases) {
  try {
    const html = renderToString(
      <AppProvider>
        <MemoryRouter initialEntries={[tc.path]}>
          {tc.element}
        </MemoryRouter>
      </AppProvider>
    );

    if (html && html.length > 100) {
      console.log(`[PASS] ${tc.name} (${tc.path}) -> Rendered ${html.length} bytes of valid DOM.`);
      passed++;
    } else {
      console.log(`[WARN] ${tc.name} (${tc.path}) -> Rendered suspiciously small output (${html.length} bytes).`);
      failed++;
    }
  } catch (err) {
    console.error(`[FAIL] ${tc.name} (${tc.path}) -> Error during rendering:`, err.message);
    failed++;
  }
}

console.log(`\n======================================================`);
console.log(`Component Verification: ${passed} of ${testCases.length} Views Rendered Successfully without errors!`);
console.log(`======================================================\n`);
