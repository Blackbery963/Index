import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { MdBook, MdClose } from 'react-icons/md';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {account, storage, databases, config, ID, Permission, Role, Query } from "../../appwriteConfig"
import { UploadSection } from './UploadSection';
import { UploadEntry } from './UploadEntry';
import { Navbar } from './Navbar';



const App = () => {
  return (
    <div className="min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <UploadEntry/>
      <UploadSection />
    </div>
  );
};

export default App;
