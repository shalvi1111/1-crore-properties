import React from 'react';
import { Outlet } from 'react-router-dom';
import NriHeader from '../components/layout/NriHeader';
import Footer from '../components/layout/Footer';
import { MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NriLayout = () => {
  const { showToast } = useApp();

  return (
    <div className="nri-layout">
      <NriHeader />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />

      {/* Floating Live Chat Button */}
      <button 
        onClick={() => showToast("Connecting to Anita Verma (NRI Expert Agent) via Live Chat...")}
        className="live-chat-floating"
      >
        <MessageSquare className="w-4 h-4 fill-current" />
        <span>Live Chat</span>
      </button>
    </div>
  );
};

export default NriLayout;
