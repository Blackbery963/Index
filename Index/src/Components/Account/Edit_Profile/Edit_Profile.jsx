// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaHome, FaInfoCircle, FaUser, FaPalette, FaSearch,  FaTimes, FaCamera, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { MdBook, MdMenu, MdClose, MdEmail, MdLocationOn, MdWeb, MdWork } from 'react-icons/md';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { databases, Permission, Role, account } from '../../../appwriteConfig';
// import { ID } from '../../../appwriteConfig';
// import { AnimatePresence, } from 'framer-motion';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

// function Edit_Profile() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [profilePic, setProfilePic] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [selectedInterests, setSelectedInterests] = useState([]);
//   const [profile, setProfile] = useState({
//     bio: '',
//     location: '',
//     website: '',
//     artStyle: '',
//     profession: '',
//     interests: '',
//     facebook: '',
//     instagram: '',
//     twitter: '',
//     linkedin: '',
//     portfolio: ''
//   });

//   // Load saved profile data
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const user = await account.get();
//         const dbProfile = await databases.getDocument(
//           DATABASE_ID,
//           USER_COLLECTION_ID,
//           user.$id
//         );
        
//         if (dbProfile) {
//           // Ensure nickname has @ prefix
//           const nickname = dbProfile.nickname?.startsWith('@') 
//             ? dbProfile.nickname 
//             : `@${dbProfile.nickname || ''}`;
            
//           setProfile({
//             ...dbProfile,
//             nickname
//           });
//           setSelectedInterests(dbProfile.interests || []);
//           localStorage.setItem('userProfile', JSON.stringify(dbProfile));
//         }
//       } catch (error) {
//         console.error('Error loading profile:', error);
//         const savedProfile = localStorage.getItem('userProfile');
//         if (savedProfile) {
//           const parsedProfile = JSON.parse(savedProfile);
//           setProfile(parsedProfile);
//           setSelectedInterests(parsedProfile.interests || []);
//         }
//       }
//     };

//     loadProfile();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prev => ({ ...prev, [name]: value }));
//   };

//   const handleNicknameChange = (e) => {
//     let value = e.target.value;
//     // Ensure nickname starts with @
//     if (!value.startsWith('@')) {
//       value = `@${value}`;
//     }
//     // Remove any spaces
//     value = value.replace(/\s/g, '');
//     setProfile(prev => ({ ...prev, nickname: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.match('image.*')) {
//       setProfilePic(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const navLinks = [
//     { to: '/', icon: FaHome, text: 'Home' },
//     { to: '/About', icon: FaInfoCircle, text: 'About' },
//     { to: '/Account', icon: FaUser, text: 'Account' },
//     { to: '/Journal', icon: MdBook, text: 'Diary' },
//   ];

//   const socialLinks = [
//     { name: 'facebook', icon: FaFacebook, placeholder: 'Facebook username', color: 'text-blue-500 hover:text-blue-400' },
//     { name: 'instagram', icon: FaInstagram, placeholder: 'Instagram username', color: 'text-pink-500 hover:text-pink-400' },
//     { name: 'twitter', icon: FaTwitter, placeholder: 'Twitter handle', color: 'text-blue-400 hover:text-blue-300' },
//     { name: 'linkedin', icon: FaLinkedin, placeholder: 'LinkedIn username', color: 'text-blue-600 hover:text-blue-500' },
//   ];

//   const artStyles = [
//     'Abstract',
//     'Landscape',
//     'Portrait',
//     'Still Life',
//     'Fantasy',
//     'Realism',
//     'Surrealism',
//     'Traditional',
//     'Minimalism',
//     'Expressionism',
//     'Impressionism',
//     'Pop Art',
//     'Digital Art',
//     'Historical',
//     'Modern',
//     'Nature',
//     'Photography',
//     'Oil Painting',
//     'Pastel',
//     'Watercolour',
//   ];

//   const professions = [
//     'Professional Artist',
//     'Hobbyist',
//     'Art Student',
//     'Art Teacher',
//     'Illustrator',
//     'Graphic Designer',
//     'Photographer',
//     'Digital Artist',
//     'Art Director',
//     'Curator',
//     'Art Therapist',
//     'Other'
//   ];

//   const interestCategories = {
//     'Painting': [
//       "Oil Painting", "Acrylic Painting", "Watercolor Painting", "Ink", 
//       "Charcoal", "Pastel", "Pencil Drawing", "Graphite Drawing",
//       "Tempera", "Fresco Painting", "Abstract", "Landscape", "Portrait"
//     ],
//     'Digital': [
//       "Digital Art", "Digital Painting", "Vector Art", "Pixel Art",
//       "3D Modeling", "AI-Generated Art", "NFT Art", "Augmented Reality Art"
//     ],
//     'Photography': [
//       "Portrait Photography", "Landscape Photography", "Street Photography",
//       "Conceptual Photography", "Documentary Photography", "Micro Photography"
//     ],
//     'Design': [
//       "Graphic Design", "Typography Design", "Fashion Design", 
//       "Interior Design", "Game Design", "Industrial Design"
//     ],
//     'Sculpture': [
//       "Sculpture", "Ceramic", "Installation Art", "Kinetic Art", "Light Art"
//     ],
//     'Other': [
//       "Mixed Media", "Collage", "Printmaking", "Performance Art", "Sound Art"
//     ]
//   };

//   const [activeCategory, setActiveCategory] = useState('Painting');
//   const [searchTerm, setSearchTerm] = useState('');

//   const InterestSelector = () => {
//     const toggleInterest = (interest) => {
//       setSelectedInterests(prev =>
//         prev.includes(interest)
//           ? prev.filter(i => i !== interest)
//           : [...prev, interest]
//       );
//     };

//     const filteredInterests = interestCategories[activeCategory].filter(interest =>
//       interest.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
//         {/* Category Tabs */}
//         <div className="flex overflow-x-auto pb-2 mb-4">
//           {Object.keys(interestCategories).map(category => (
//             <button
//               key={category}
//               type="button"
//               onClick={() => setActiveCategory(category)}
//               className={`px-4 py-2 mr-2 rounded-full text-sm font-medium whitespace-nowrap ${
//                 activeCategory === category
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Search Input */}
//         <div className="relative mb-4">
//           <input
//             type="text"
//             placeholder="Search interests..."
//             className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         </div>

//         {/* Selected Interests */}
//         {selectedInterests.length > 0 && (
//           <div className="mb-4">
//             <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected:</h3>
//             <div className="flex flex-wrap gap-2">
//               {selectedInterests.map(interest => (
//                 <span
//                   key={interest}
//                   className="flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm"
//                 >
//                   {interest}
//                   <button
//                     type="button"
//                     onClick={() => toggleInterest(interest)}
//                     className="ml-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
//                   >
//                     <FaTimes size={12} />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Interest List */}
//         <div className="max-h-60 overflow-y-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             {filteredInterests.map(interest => (
//               <button
//                 key={interest}
//                 type="button"
//                 onClick={() => toggleInterest(interest)}
//                 className={`text-left px-4 py-2 rounded-lg border transition-colors ${
//                   selectedInterests.includes(interest)
//                     ? 'bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
//                     : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
//                 }`}
//               >
//                 {interest}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const user = await account.get();
//       const userId = user.$id;

//       // Prepare profile data with @ prefix for nickname
//       const profileData = {
//         nickname: profile.nickname.startsWith('@') 
//           ? profile.nickname 
//           : `@${profile.nickname}`,
//         bio: profile.bio,
//         location: profile.location,
//         profession: profile.profession,
//         artStyle: profile.artStyle,
//         interests: selectedInterests,
//         portfolio: profile.portfolio,
//         facebook: profile.facebook,
//         instagram: profile.instagram,
//         twitter: profile.twitter,
//         linkedin: profile.linkedin,
//         updatedAt: new Date().toISOString()
//       };

//       // Update or create document
//       try {
//         await databases.updateDocument(
//           DATABASE_ID,
//           USER_COLLECTION_ID,
//           userId,
//           profileData
//         );
//       } catch (updateError) {
//         if (updateError.code === 404) {
//           await databases.createDocument(
//             DATABASE_ID,
//             USER_COLLECTION_ID,
//             userId,
//             {
//               ...profileData,
//               userId: userId,
//               username: user.name,
//               email: user.email,
//               createdAt: new Date().toISOString(),
//             },
//             [
//               Permission.read(Role.user(userId)),
//               Permission.update(Role.user(userId)),
//             ]
//           );
//         } else {
//           throw updateError;
//         }
//       }

//       // Update localStorage
//       const updatedProfile = {
//         ...user,
//         ...profileData
//       };
//       localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

//       toast.success('Profile updated successfully!');
//     } catch (error) {
//       console.error('Profile update error:', error);
//       toast.error('Failed to save profile');
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex flex-col pb-6">
//       <ToastContainer />
      
//       {/* Header */}
//       <header className="fixed top-0 h-20 w-full bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm flex items-center justify-between px-6 shadow-sm z-50 border-b border-gray-200 dark:border-gray-700">
//         <Link to="/" className="text-2xl font-bold font-Eagle text-gray-800 dark:text-white">
//           Painters' Diary
//         </Link>
        
//         {/* Mobile Menu Button */}
//         <button 
//           className="md:hidden p-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
//         </button>

//         <nav className="hidden md:flex items-center gap-4">
//           {navLinks.map((link) => (
//             <Link 
//               key={link.text} 
//               to={link.to}
//               className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium flex items-center gap-2"
//             >
//               <link.icon />
//               <span>{link.text}</span>
//             </Link>
//           ))}
//         </nav>
//       </header>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="fixed top-20 right-6 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 md:hidden"
//           >
//             <div className="p-2 space-y-1">
//               {navLinks.map((link) => (
//                 <Link 
//                   key={link.text} 
//                   to={link.to}
//                   className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 transition-colors font-medium"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <div className="flex items-center gap-3">
//                     <link.icon />
//                     <span>{link.text}</span>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Content */}
//       <main className="flex-1 flex items-center justify-center pt-28 px-4">
//         <motion.div
//           className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-4xl border border-gray-200 dark:border-gray-700 overflow-hidden"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           {/* Form Header */}
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
//             <h2 className="text-2xl font-bold text-white">Edit Your Artist Profile</h2>
//             <p className="text-blue-100 mt-1">Update your creative identity</p>
//           </div>

//           {/* Form Content */}
//           <div className="p-6 md:p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Profile Picture Section */}
//               <div className="flex flex-col items-center mb-6">
//                 <div className="relative w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-4 border-white dark:border-gray-600 shadow-lg mb-4">
//                   {previewUrl ? (
//                     <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-gray-400">
//                       <FaUser className="text-3xl" />
//                     </div>
//                   )}
//                 </div>
//                 <label className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
//                   <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
//                   <div className="flex items-center gap-2">
//                     <FaCamera />
//                     <span>Change Photo</span>
//                   </div>
//                 </label>
//               </div>

//               {/* Basic Info Section */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
//                     Nickname <span className="text-gray-500">(with @)</span>
//                   </label>
//                   <div className="flex">
//                     <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
//                       @
//                     </span>
//                     <input
//                       type="text"
//                       name="nickname"
//                       value={profile.nickname}
//                       onChange={handleNicknameChange}
//                       className="flex-1 px-4 py-2 rounded-r-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white dark:bg-gray-700 transition-colors"
//                       placeholder="yourname"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
//                     Profession
//                   </label>
//                   <select
//                     name="profession"
//                     value={profile.profession}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white dark:bg-gray-700 transition-colors"
//                   >
//                     <option value="">Select your profession</option>
//                     {professions.map(profession => (
//                       <option key={profession} value={profession}>{profession}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
//                     Location
//                   </label>
//                   <div className="flex items-center">
//                     <MdLocationOn className="ml-3 text-gray-500 absolute" />
//                     <input
//                       type="text"
//                       name="location"
//                       value={profile.location}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white dark:bg-gray-700 transition-colors"
//                       placeholder="City, Country"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
//                     Primary Art Style
//                   </label>
//                   <select
//                     name="artStyle"
//                     value={profile.artStyle}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white dark:bg-gray-700 transition-colors"
//                   >
//                     <option value="">Select your style</option>
//                     {artStyles.map(style => (
//                       <option key={style} value={style}>{style}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Interests Section */}
//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
//                   Artistic Interests
//                 </label>
//                 <InterestSelector />
//               </div>

//               {/* Bio Section */}
//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
//                   Artist Bio
//                 </label>
//                 <textarea
//                   name="bio"
//                   value={profile.bio}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white dark:bg-gray-700 transition-colors"
//                   placeholder="Tell us about your artistic journey..."
//                   rows="5"
//                 />
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   This will be displayed on your public profile
//                 </p>
//               </div>

//               {/* Portfolio Section */}
//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
//                   Portfolio Website
//                 </label>
//                 <div className="flex items-center">
//                   <MdWeb className="ml-3 text-gray-500 absolute" />
//                   <input
//                     type="url"
//                     name="portfolio"
//                     value={profile.portfolio}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white dark:bg-gray-700 transition-colors"
//                     placeholder="https://yourportfolio.com"
//                   />
//                 </div>
//               </div>

//               {/* Social Media Section */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
//                   Social Media
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {socialLinks.map((social) => (
//                     <div key={social.name}>
//                       <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2 gap-2">
//                         <social.icon className={`${social.color} text-lg`} />
//                         {social.placeholder}
//                       </label>
//                       <div className="flex">
//                         <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
//                           @
//                         </span>
//                         <input
//                           type="text"
//                           name={social.name}
//                           value={profile[social.name]}
//                           onChange={handleInputChange}
//                           className="flex-1 px-4 py-2 rounded-r-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white dark:bg-gray-700 transition-colors"
//                           placeholder={social.placeholder}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Form Actions */}
//               <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
//                 <Link to="/Account">
//                   <button
//                     type="button"
//                     className="w-full sm:w-auto px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </Link>
//                 <button
//                   type="submit"
//                   className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-md"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </motion.div>
//       </main>
//     </div>
//   );
// }

// export default Edit_Profile;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MapPin, Globe, Briefcase, Palette, 
  ChevronLeft, Save, Search, X, Hash, 
  Facebook, Instagram, Twitter, Linkedin,
  LayoutGrid, BookOpen,
  Link2
} from 'lucide-react';
import { databases, Permission, Role, account, ID } from '../../../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

// --- Toast Notification Component ---
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-xl backdrop-blur-md border ${
      type === 'success' 
        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
        : 'bg-red-500/10 border-red-500/20 text-red-500'
    } flex items-center gap-3 z-50`}
  >
    <div className={`w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
    <span className="font-medium">{message}</span>
    <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100">
      <X size={14} />
    </button>
  </motion.div>
);

// --- Helper Components (Defined OUTSIDE to prevent focus loss) ---

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-6">
    <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400">
      <Icon size={20} />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
    </div>
  </div>
);

const InputField = ({ label, name, value, onChange, placeholder, prefix, type = "text" }) => (
  <div className="group">
    <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">
      {label}
    </label>
    <div className="relative flex items-center">
      {prefix && (
        <span className="absolute left-3 text-zinc-400 select-none pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all ${prefix ? 'pl-8' : ''}`}
      />
    </div>
  </div>
);

const SocialInput = ({ icon: Icon, name, placeholder, value, onChange }) => (
  <div className="relative group">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-800 dark:group-focus-within:text-zinc-200 transition-colors">
      <Icon size={18} />
    </div>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
    />
  </div>
);

// --- Main Component ---
export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Profile State
  const [profile, setProfile] = useState({
    nickname: '',
    bio: '',
    location: '',
    website: '',
    artStyle: '',
    profession: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    portfolio: ''
  });
  
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Painting');
  const [searchTerm, setSearchTerm] = useState('');

  // --- Data Constants ---
  const artStyles = [
    'Abstract', 'Realism', 'Impressionism', 'Surrealism', 'Minimalism', 
    'Pop Art', 'Digital', 'Cyberpunk', 'Traditional', 'Watercolor', 'Oil'
  ];

  const professions = [
    'Professional Artist', 'Hobbyist', 'Student', 'Instructor', 
    'Illustrator', 'Designer', 'Curator', 'Concept Artist'
  ];

  const interestCategories = {
    'Painting': ["Oil", "Acrylic", "Watercolor", "Gouache", "Ink", "Fresoc", "Encaustic"],
    'Drawing': ["Charcoal", "Graphite", "Pastel", "Colored Pencil", "Digital Sketching"],
    'Digital': ["3D Modeling", "Vector", "Pixel Art", "VFX", "Generative", "NFT"],
    'Photo': ["Portrait", "Landscape", "Street", "Analog", "Macro", "Editorial"],
    'Design': ["Graphic", "UI/UX", "Product", "Fashion", "Interior", "Motion"],
    'Craft': ["Ceramics", "Textiles", "Woodworking", "Sculpture", "Printmaking"]
  };

  // --- Auth & Data Loading (Appwrite) ---
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);

        try {
          const dbProfile = await databases.getDocument(
            DATABASE_ID,
            USER_COLLECTION_ID,
            currentUser.$id
          );
          
          if (dbProfile) {
            // Ensure nickname has @ prefix
            const nickname = dbProfile.nickname?.startsWith('@') 
              ? dbProfile.nickname 
              : `@${dbProfile.nickname || ''}`;
            
            // Filter out system fields
            const { $id, $createdAt, $updatedAt, $permissions, $collectionId, $databaseId, ...data } = dbProfile;
            
            setProfile(prev => ({
              ...prev,
              ...data,
              nickname
            }));
            
            if (dbProfile.interests) {
              setSelectedInterests(dbProfile.interests);
            }
          }
        } catch (dbError) {
          console.log('Profile not found, user will create one on save.');
        }

      } catch (error) {
        console.error("Auth failed:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleNicknameChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value && !value.startsWith('@')) value = `@${value}`;
    if (value === '@') value = '';
    setProfile(prev => ({ ...prev, nickname: value }));
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    try {
      const profileData = {
        nickname: profile.nickname.startsWith('@') ? profile.nickname : `@${profile.nickname}`,
        bio: profile.bio,
        location: profile.location,
        profession: profile.profession,
        artStyle: profile.artStyle,
        interests: selectedInterests,
        portfolio: profile.portfolio,
        facebook: profile.facebook,
        instagram: profile.instagram,
        twitter: profile.twitter,
        linkedin: profile.linkedin,
        updatedAt: new Date().toISOString()
      };

      try {
        await databases.updateDocument(
          DATABASE_ID,
          USER_COLLECTION_ID,
          user.$id,
          profileData
        );
      } catch (error) {
        if (error.code === 404) {
          await databases.createDocument(
            DATABASE_ID,
            USER_COLLECTION_ID,
            user.$id,
            {
              ...profileData,
              userId: user.$id,
              username: user.name,
              email: user.email,
              createdAt: new Date().toISOString(),
            },
            [
              Permission.read(Role.user(user.$id)),
              Permission.update(Role.user(user.$id)),
            ]
          );
        } else {
          throw error;
        }
      }
      
      setToast({ message: "Profile saved successfully", type: "success" });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      console.error("Save error:", error);
      setToast({ message: "Failed to save profile", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto px-1 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Link to="/Account">
              <button className="p-2 -ml-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                <ChevronLeft size={24} />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage your public artist persona</p>
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={saving}
            className="hidden sm:flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Changes
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Section 1: Identity */}
          <section className="bg-white dark:bg-zinc-900/30 rounded-lg p-6 sm:p-8 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
            <SectionTitle icon={User} title="Identity" subtitle="How you appear to others" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField 
                label="Nickname" 
                name="nickname"
                value={profile.nickname}
                onChange={handleNicknameChange}
                placeholder="@username"
              />
              
              <div className="group">
                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">
                  Profession
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <select
                    name="profession"
                    value={profile.profession}
                    onChange={handleInputChange}
                    className="w-full appearance-none bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all cursor-pointer"
                  >
                    <option value="">Select Profession</option>
                    {professions.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <InputField 
                label="Location"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
                placeholder="City, Country"
                prefix={<MapPin size={16} />}
              />

              <div className="group">
                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">
                  Primary Style
                </label>
                <div className="relative">
                  <Palette className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <select
                    name="artStyle"
                    value={profile.artStyle}
                    onChange={handleInputChange}
                    className="w-full appearance-none bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all cursor-pointer"
                  >
                    <option value="">Select Style</option>
                    {artStyles.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">
                Artist Bio
              </label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all resize-none"
                placeholder="Tell your story..."
              />
            </div>
          </section>

          {/* Section 2: Interests */}
          <section className="bg-white dark:bg-zinc-900/30 rounded-lg p-6 sm:p-8 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
            <SectionTitle icon={LayoutGrid} title="Interests" subtitle="Select topics you follow" />

            <div className="flex flex-wrap gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
              {Object.keys(interestCategories).map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md transform scale-105'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input
                type="text"
                placeholder={`Search ${activeCategory} tags...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {interestCategories[activeCategory]
                .filter(i => i.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(interest => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-all ${
                    selectedInterests.includes(interest)
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300'
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  <span>{interest}</span>
                  {selectedInterests.includes(interest) && <X size={12} />}
                </button>
              ))}
            </div>
            
            {selectedInterests.length > 0 && (
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Active Tags</span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedInterests.map(interest => (
                    <span key={interest} className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs rounded-md">
                      {interest}
                      <button type="button" onClick={() => toggleInterest(interest)}>
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Section 3: Digital Presence */}
          <section className="bg-white dark:bg-zinc-900/30 rounded-lg p-6 sm:p-8 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm pb-20">
            <SectionTitle icon={Globe} title="Digital Presence" subtitle="Where can people find you?" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <InputField 
                  label="Portfolio Website"
                  name="portfolio"
                  value={profile.portfolio}
                  onChange={handleInputChange}
                  placeholder="https://your-portfolio.com"
                  prefix={< Link2 size={16} />}
                />
              </div>

              <SocialInput 
                icon={Twitter} 
                name="twitter" 
                placeholder="Twitter handle"
                value={profile.twitter} 
                onChange={handleInputChange} 
              />
              <SocialInput 
                icon={Instagram} 
                name="instagram" 
                placeholder="Instagram username"
                value={profile.instagram} 
                onChange={handleInputChange} 
              />
              <SocialInput 
                icon={Facebook} 
                name="facebook" 
                placeholder="Facebook username"
                value={profile.facebook} 
                onChange={handleInputChange} 
              />
              <SocialInput 
                icon={Linkedin} 
                name="linkedin" 
                placeholder="LinkedIn profile"
                value={profile.linkedin} 
                onChange={handleInputChange} 
              />
            </div>
          </section>

          {/* Mobile Sticky Save */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 sm:hidden z-40">
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3 rounded-xl font-medium"
            >
              {saving ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Save size={18} />}
              Save Profile
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}