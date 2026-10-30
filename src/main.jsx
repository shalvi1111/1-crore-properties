import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

// Global Design Tokens & Stylesheets
import './styles/variables.css';
import './styles/index.css';
import './styles/auth.css';
import './styles/property.css';
import './styles/buyer.css';
import './styles/nri.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
