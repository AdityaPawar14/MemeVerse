import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Automatically resolves to .jsx or .tsx based on your project setup
import './index.css';

// Ensure the root element exists before rendering
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with ID 'root' not found in the DOM.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
