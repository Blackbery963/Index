import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaInfoCircle, FaUser, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPalette, FaCamera } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { MdBook, MdMenu, MdClose, MdEmail, MdLocationOn, MdWeb } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {databases, Permission, Role} from '../../../appwriteConfig'
import { ID } from '../../../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID

function Edit_Profile() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [profile, setProfile] = useState({
    bio: '',
    location: '',
    website: '',
    artStyle: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    portfolio: ''
  });

  // Load saved profile data from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    
    // Simulate loading user data from database
    // In a real app, you would fetch this from your backend
    setProfile(prev => ({
      ...prev,
      username: 'Artist123', // This would come from your database
      email: 'artist@example.com' // This would come from your database
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateSocialLink = (platform, username) => {
    if (!username) return true;
    // Simple validation - in a real app you might want more robust checks
    return !username.includes(' ') && !username.includes('/');
  };

  const navLinks = [
    { to: '/', icon: FaHome, text: 'Home' },
    { to: '/About', icon: FaInfoCircle, text: 'About' },
    { to: '/Account', icon: FaUser, text: 'Account' },
    { to: '/Journal', icon: MdBook, text: 'Diary' },
  ];

  const socialLinks = [
    { name: 'facebook', icon: FaFacebook, placeholder: 'Facebook username', color: 'text-blue-500 hover:text-blue-400' },
    { name: 'instagram', icon: FaInstagram, placeholder: 'Instagram username', color: 'text-pink-500 hover:text-pink-400' },
    { name: 'twitter', icon: FaTwitter, placeholder: 'Twitter handle', color: 'text-blue-400 hover:text-blue-300' },
    { name: 'linkedin', icon: FaLinkedin, placeholder: 'LinkedIn username', color: 'text-blue-600 hover:text-blue-500' },
  ];

  const artStyles = [
    'Abstract', 'Realism', 'Impressionism', 'Expressionism', 
    'Surrealism', 'Cubism', 'Pop Art', 'Minimalism', 
    'Contemporary', 'Digital Art', 'Watercolor', 'Oil Painting','Photography'
  ];

  //storing the data in the databse collection
  // Edit_Profile.js
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Get user ID from localStorage
    const user = JSON.parse(localStorage.getItem('userProfile'));
    if (!user?.$id) throw new Error("User not logged in");
    // checking if the user are logged in or not 
       try {
      await databases.getDocument(DATABASE_ID, USER_COLLECTION_ID, user.$id);
    } catch (getDocError) {
      if (getDocError.code === 404) {
        // Document doesn't exist? Create it now
        await databases.createDocument(
          DATABASE_ID,
          USER_COLLECTION_ID,
          user.$id,
          {
            userId: user.$id,
            username: user.username,
            email: user.email,
            createdAt: new Date().toISOString()
          },
          [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id))
          ]
        );
      } else {
        throw getDocError;
      }
    }

    // Prepare profile data to update
    const profileData = {
      nickname: profile.nickname || user.username,
      bio: profile.bio,
      location: profile.location,
      artStyle: profile.artStyle,
      portfolio: profile.portfolio,
      facebook: profile.facebook,
      instagram: profile.instagram,
      twitter: profile.twitter,
      linkedin: profile.linkedin,
      updatedAt: new Date().toISOString()
    };

    // Update the document (will merge with existing fields)
    await databases.updateDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      user.$id,
      profileData
    );

    // Update localStorage with new data
    const updatedProfile = {
      ...user,
      ...profileData
    };
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

    toast.success('Profile updated successfully!');
  } catch (error) {
    console.error('Profile update error:', error);
    toast.error('Failed to save profile');
  }
};

// Update the useEffect for loading profile data
useEffect(() => {
  const loadProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('userProfile'));
      if (!user?.$id) return;

      // Try to load from database
      const dbProfile = await databases.getDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        user.$id
      );

      if (dbProfile) {
        setProfile(dbProfile);
        localStorage.setItem('userProfile', JSON.stringify(dbProfile));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      // Fallback to localStorage if database fails
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    }
  };

  loadProfile();
}, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-[#040d12] dark:to-[#0a1929] transition-colors duration-300 flex flex-col pb-6">
      <ToastContainer />
      
      {/* Header */}
      <header className="fixed top-0 h-[80px] w-full bg-white/30 dark:bg-gray-900/90 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shadow-md z-50">
        <div className="flex items-center">
          <h1 className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] font-bold font-Eagle text-black dark:text-white">
            Painters' Diary
          </h1>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>

        <div className="hidden md:flex items-center gap-2 sm:gap-4 md:gap-6">
          <motion.div
            className="flex items-center justify-center bg-white/50 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md overflow-hidden h-[36px]"
            initial={{ width: '40px' }}
            animate={{ width: isExpanded ? '200px' : '40px' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <motion.input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`px-2 py-1 w-full outline-none text-gray-700 dark:text-gray-200 bg-transparent h-full ${
                isExpanded ? 'block' : 'hidden'
              }`}
              placeholder="Search..."
            />
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2 lg:px-3 py-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white h-full flex items-center justify-center rounded-r-md border border-gray-400 dark:border-gray-500 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <FaSearch className="text-xl" />
            </motion.button>
          </motion.div>
          <nav className="flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.text} to={link.to}>
                <button className="px-2 py-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md text-white border border-gray-400 dark:border-gray-500 text-[18px] flex items-center gap-1 font-Playfair font-bold h-[36px] transition-colors">
                  <link.icon className="" />
                  <span className="hidden sm:inline">{link.text}</span>
                </button>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[90px] right-4 w-48 bg-white/40 backdrop-blur-md dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 md:hidden"
        >
          <div className="p-2 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.text} 
                to={link.to}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 transition-colors font-Playfair"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <link.icon />
                  <span>{link.text}</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center pt-[120px] px-4">
        <motion.div
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold font-Eagle text-gray-800 dark:text-white mb-6 text-center">
            Edit Your Artist Profile
          </h2>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Picture Upload */}
               <div>
                <label className="block text-gray-700 dark:text-gray-300 font-Playfair mb-1 flex items-center gap-2">
                  <MdLocationOn />
                 Nickname
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={profile.nickname || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white/50 dark:bg-gray-700/50 transition-colors"
                  placeholder="Your name in short..."
                />
              </div>
                       
            {/* Artist Information */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-Playfair mb-1 flex items-center gap-2">
                  <MdLocationOn />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white/50 dark:bg-gray-700/50 transition-colors"
                  placeholder="Where do you create your art?"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-Playfair mb-1 flex items-center gap-2">
                  <FaPalette />
                  Primary Art Style
                </label>
                <select
                  name="artStyle"
                  value={profile.artStyle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white/50 dark:bg-gray-700/50 transition-colors"
                >
                  <option value="">Select your style</option>
                  {artStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 font-Playfair mb-1">Artist Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-y outline-none bg-white/50 dark:bg-gray-700/50 transition-colors"
                placeholder="Tell us about your artistic journey, inspirations, and techniques..."
                rows="5"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                This will be displayed on your public profile
              </p>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-Playfair mb-1 flex items-center gap-2">
                <MdWeb />
                Portfolio Website
              </label>
              <input
                type="url"
                name="portfolio"
                value={profile.portfolio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white/50 dark:bg-gray-700/50 transition-colors"
                placeholder="https://yourportfolio.com"
              />
            </div>

            {/* Social Media Section */}
            <div>
              <h3 className="text-lg font-semibold font-Playfair text-gray-800 dark:text-white mb-3">
                Social Media
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <div key={social.name}>
                    <label className="text-gray-700 dark:text-gray-300 font-Playfair mb-1 flex items-center gap-2">
                      <social.icon className={`${social.color} text-xl`} />
                      {social.placeholder}
                    </label>
                    <div className="flex items-center">
                      <span className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400">
                        @
                      </span>
                      <input
                        type="text"
                        name={social.name}
                        value={profile[social.name]}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white/50 dark:bg-gray-700/50 transition-colors"
                        placeholder={social.placeholder}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-4 mt-4">
              <Link to="/Account">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold rounded-lg transition-all shadow-md"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                // onClick={handleSaveChanges}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-md"
              >
                Save Changes
              </button>
            </div>
          </form>

          {/* Profile Preview Section */}
          <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-8">
            <h3 className="text-xl font-semibold font-Playfair text-gray-800 dark:text-white mb-4 text-center">
              Profile Preview
            </h3>
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Picture Preview */}
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden border-4 border-white dark:border-gray-500 shadow-md flex-shrink-0">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FaUser className="text-3xl" />
                    </div>
                  )}
                </div>
                
                {/* Profile Info Preview */}
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold font-Eagle text-gray-800 dark:text-white">
                    {profile.name || 'Artist Name'}
                  </h4>
                  {profile.artStyle && (
                    <span className="inline-block mt-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                      {profile.artStyle}
                    </span>
                  )}
                  
                  {profile.location && (
                    <div className="mt-2 flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300">
                      <MdLocationOn className="mr-1" />
                      {profile.location}
                    </div>
                  )}
                  
                  {profile.bio && (
                    <p className="mt-3 text-gray-700 dark:text-gray-300 font-Playfair">
                      {profile.bio}
                    </p>
                  )}
                  
                  {/* Social Links Preview */}
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                    {socialLinks.map((social) =>
                      profile[social.name] && (
                        <a
                          key={social.name}
                          href={`https://${social.name}.com/${profile[social.name]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${social.color} text-2xl`}
                          aria-label={social.name}
                        >
                          <social.icon />
                        </a>
                      )
                    )}
                    {profile.portfolio && (
                      <a
                        href={profile.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-2xl"
                        aria-label="Portfolio"
                      >
                        <MdWeb />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
    
  );
}
export default Edit_Profile;
