import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { router } from './router';
import Toast from '../components/common/Toast';
import GlobalModals from '../components/common/GlobalModals';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <Toast />
      <GlobalModals />
    </AppProvider>
  );
}
