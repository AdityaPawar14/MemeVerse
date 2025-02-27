import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Find the root element in the DOM
const rootElement = document.getElementById('root');

// Ensure the root element exists before rendering the app
if (rootElement) {
  const root = createRoot(rootElement);

  // Render the app inside StrictMode for additional development checks
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Root element not found in the DOM.');
}