import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import NriLayout from '../layouts/NriLayout';

// Public & Property Pages
import PropertiesPage from '../pages/public/PropertiesPage';
import PropertyDetailPage from '../pages/public/PropertyDetailPage';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import BuilderRegisterPage from '../pages/auth/BuilderRegisterPage';
import CustomerRegisterPage from '../pages/auth/CustomerRegisterPage';
import NriRegisterPage from '../pages/auth/NriRegisterPage';

// Buyer Pages
import BuyerDashboard from '../pages/buyer/BuyerDashboard';
import PropertyDashboard from '../pages/buyer/PropertyDashboard';
import AddNewPropertyPage from '../pages/buyer/AddNewPropertyPage';
import AddOpenPlotPage from '../pages/buyer/AddOpenPlotPage';
import ComparePage from '../pages/buyer/ComparePage';
import ShortlistedPage from '../pages/buyer/ShortlistedPage';

// NRI Terminal Pages
import NriDashboard from '../pages/nri/NriDashboard';
import NriMyProperties from '../pages/nri/NriMyProperties';
import NriShortlisted from '../pages/nri/NriShortlisted';
import NriCompare from '../pages/nri/NriCompare';
import NriPropertyManagement from '../pages/nri/NriPropertyManagement';
import NriServices from '../pages/nri/NriServices';
import NriDocuments from '../pages/nri/NriDocuments';
import NriPayments from '../pages/nri/NriPayments';
import NriAgent from '../pages/nri/NriAgent';
import NriDetails from '../pages/nri/NriDetails';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';

export const router = createBrowserRouter([
  // Public & Buyer Routes
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <PropertiesPage /> },
      { path: 'properties', element: <PropertiesPage /> },
      { path: 'properties/:id', element: <PropertyDetailPage /> },
      { path: 'property/:id', element: <PropertyDetailPage /> },
      { path: 'compare', element: <ComparePage /> },
      { path: 'shortlisted', element: <ShortlistedPage /> },
      
      // Buyer Concierge & Dashboard
      { path: 'buyer/dashboard', element: <BuyerDashboard /> },
      { path: 'buyer/property-dashboard', element: <PropertyDashboard /> },
      { path: 'buyer/properties', element: <PropertyDashboard /> },
      { path: 'buyer/add-property', element: <AddNewPropertyPage /> },
      { path: 'buyer/add-open-plot', element: <AddOpenPlotPage /> },
      { path: 'buyer/compare', element: <ComparePage /> },
      { path: 'buyer/shortlisted', element: <ShortlistedPage /> },

      // Master Admin Dashboard
      { path: 'admin', element: <AdminDashboard /> },
      { path: 'admin/dashboard', element: <AdminDashboard /> },
    ]
  },

  // Dedicated NRI Terminal Subportal
  {
    path: '/nri',
    element: <NriLayout />,
    children: [
      { index: true, element: <Navigate to="/nri/dashboard" replace /> },
      { path: 'dashboard', element: <NriDashboard /> },
      { path: 'properties', element: <NriMyProperties /> },
      { path: 'my-properties', element: <NriMyProperties /> },
      { path: 'shortlisted', element: <NriShortlisted /> },
      { path: 'compare', element: <NriCompare /> },
      { path: 'property-management', element: <NriPropertyManagement /> },
      { path: 'management', element: <NriPropertyManagement /> },
      { path: 'services', element: <NriServices /> },
      { path: 'documents', element: <NriDocuments /> },
      { path: 'payments', element: <NriPayments /> },
      { path: 'agent', element: <NriAgent /> },
      { path: 'details', element: <NriDetails /> },
      { path: 'profile', element: <NriDetails /> },
    ]
  },

  // Authentication & Onboarding
  { path: '/login', element: <LoginPage /> },
  { path: '/register/builder', element: <BuilderRegisterPage /> },
  { path: '/builder/register', element: <Navigate to="/register/builder" replace /> },
  { path: '/register/customer', element: <CustomerRegisterPage /> },
  { path: '/customer/register', element: <Navigate to="/register/customer" replace /> },
  { path: '/register/nri', element: <NriRegisterPage /> },
  { path: '/nri/register', element: <Navigate to="/register/nri" replace /> },

  // Fallback
  { path: '*', element: <Navigate to="/" replace /> }
]);
