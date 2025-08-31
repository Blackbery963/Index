// import { StrictMode } from 'react'
// import React from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { DarkModeProvider } from './Components/Header/Header.jsx'
// import MainApp from './MainApp.jsx'

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//    <DarkModeProvider>
//     <App />
//     <MainApp />
//    </DarkModeProvider>
//   </React.StrictMode>,
// )

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("./public/service.js")
//       .then(registration => {
//         console.log("Service Worker registered with scope:", registration.scope);
//       })
//       .catch(error => {
//         console.error("Service Worker registration failed:", error);
//       });
//   });
// }


import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DarkModeProvider } from "./Components/Header/Header.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service.js")
      .then((registration) => {
        console.log("✅ Service Worker registered:", registration.scope);
      })
      .catch((error) => {
        console.error("❌ Service Worker registration failed:", error);
      });
  });
}
