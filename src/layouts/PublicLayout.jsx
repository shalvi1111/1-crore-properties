import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

const PublicLayout = () => {
  const { showToast } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />

      {/* Floating Live Chat Button */}
      <button 
        onClick={() => showToast("Opening 24x7 Real Estate Advisory Live Chat...")}
        className="live-chat-floating"
      >
        <MessageSquare className="w-4 h-4 fill-current" />
        <span>Live Chat</span>
      </button>
    </div>
  );
};

export default PublicLayout;
