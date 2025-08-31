import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'



// Mount React App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// =======================
// Service Worker Register
// =======================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service.js")
      .then(registration => {
        console.log("[PWA] Service Worker registered:", registration);

        // Listen for updates
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  // New update available
                  console.log("[PWA] New content available, please refresh.");
                  // You could show a toast/snackbar here
                  if (window.confirm("A new version is available. Reload?")) {
                    window.location.reload();
                  }
                } else {
                  console.log("[PWA] Content cached for offline use.");
                }
              }
            };
          }
        };
      })
      .catch(err => {
        console.error("[PWA] Service Worker registration failed:", err);
      });
  });
}
