import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkModeProvider } from './Components/Header/Header.jsx'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <DarkModeProvider>
    <App />
   </DarkModeProvider>
  </React.StrictMode>,
)
