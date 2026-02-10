// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate, Link, useParams } from 'react-router-dom';
// import { databases, ID, account } from '../appwriteConfig';


// const communityDatabaseId = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID
// const communityCollectionId = import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID
// const communityMembersCollectionId = import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID

// const CreateCommunityPage = () => {
//   const {slug} = useParams()
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     badge: '🎨',
//     color: '#6D28D9',
//     privacy: 'public',
//     allowInvites: true,
//     rules: ['Be respectful', 'No spam'],
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
//     exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//   };

//   // Handle rule updates
//   const handleRuleChange = (index, value) => {
//     const newRules = [...formData.rules];
//     newRules[index] = value;
//     setFormData((prev) => ({ ...prev, rules: newRules }));
//   };

//   const addRule = () => {
//     setFormData((prev) => ({ ...prev, rules: [...prev.rules, ''] }));
//   };

//   const removeRule = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       rules: prev.rules.filter((_, i) => i !== index),
//     }));
//   };

//   // Validate current step
//   const validateStep = () => {
//     const newErrors = {};
//     if (step === 1) {
//       if (!formData.name.trim()) newErrors.name = 'Community name is required';
//       else if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
//       else if (formData.name.length > 50) newErrors.name = 'Name cannot exceed 50 characters';

//       if (!formData.description.trim()) newErrors.description = 'Description is required';
//       else if (formData.description.length > 300) newErrors.description = 'Description cannot exceed 300 characters';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle navigation
//   const nextStep = () => {
//     if (validateStep()) setStep((prev) => prev + 1);
//   };

//   const prevStep = () => {
//     setStep((prev) => prev - 1);
//   };

//   // getting user Id 
//   const getUserId = async () => {
//   try {
//     const user = await account.get();
//     console.log('User ID:', user.$id); // This is the AID
//     return user.$id;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//   }
// };
//   // handle the form submiission 

//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const userId = await getUserId()
    
//     try {
//       // Prepare community data
//       const communityData = {
//         name: formData.name,
//         description: formData.description,
//         badge: formData.badge,
//         color: formData.color,
//         privacy: formData.privacy,
//         allowInvites: formData.allowInvites,
//         rules: formData.rules,
//         slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
//         createdAt: new Date().toISOString(),
//         memberCount: 1, // Starts with creator as member
//         ownerId: userId, // Replace with your auth user ID
//       };

//       // Save to Appwrite
//       const response = await databases.createDocument(
//         communityDatabaseId,
//         communityCollectionId,
//         ID.unique(),
//         communityData
//       );

//       // Optional: Add creator as first member in separate collection
//       await databases.createDocument(
//         communityDatabaseId,
//         communityMembersCollectionId,
//         ID.unique(),
//         {
//           communityId: response.$id,
//           userId: userId, // Replace with your auth user ID
//           role: 'owner',
//           joinedAt: new Date().toISOString()
//         }
//       );

//       navigate(`/community/${communityData.slug}`);
//     } catch (error) {
//       console.error('Error creating community:', error);
//       setErrors({ submit: error.message || 'Failed to create community' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   const badges = [
//   '🎨', '🖌️', '👩‍🎨', '🖼️', '🌈', '✨',
//   '🧑‍🎨', '🖍️', '🎭', '🧵', '✏️', '🖋️',
//   '🧑‍🎤', '📸', '🌟', '🌌', '💫', '🌠',
//   '🦋', '🍭', '🖊️', '🧽', '🪡', '🪞',
//   '🎞️', '🪆', '📚', '🧠', '🪄', '🗯️',
//   '🧑‍🏫', '💡', '🤝', '🧩', '🔗', '💬',
//   '🫂', '🏳️‍🌈', '🏆', '📁', '🖥️', '🏷️',
//   '💼', '🪪', '📓', '✍️', '🧾', '🪶', '📖'
// ];


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-Playfair">
//         <motion.nav
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.6 }}
//               className="fixed top-4 left-4 right-4 z-50 bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-lg shadow-lg"
//             >
//               <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
//                 <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle">
//                   ArtVerse
//                 </Link>
//                 <div className="hidden md:flex items-center gap-6">
//                   {[
//                     {name: 'Home', path: '/'},
//                     {name: 'Resources', path:'/resourches'},
//                     {name:'Community', path:'/community'},
//                     {name:'Challenges', path:'/communnity/Challenges'}
//                   ].map((item) => (
//                      <motion.div
//                      key={item.name}
//                      whileHover={{ scale: 1.1 }}
//                      className="relative group"
//                      >
//                      <Link
//                      to={item.path}
//                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium font-Playfair"
//                      >
//                      {item.name}
//                      </Link>
//                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
//                      </motion.div>
//                   ))}
//                 </div>
//                 <button
//                   className="md:hidden text-gray-700 dark:text-gray-300"
//                   onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     {isMenuOpen ? (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     ) : (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                     )}
//                   </svg>
//                 </button>
//               </div>
//               {/* Mobile Menu */}
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="md:hidden overflow-hidden bg-white/40 backdrop-blur-md dark:bg-gray-800/40 rounded-b-lg"
//               >
//                 <div className="px-4 py-3 space-y-2">
//                   {[
//                     {name: 'Home', path: '/'},
//                     {name: 'Resources', path:'/resourches'},
//                     {name:'Community', path:'/community'},
//                     {name:'Challenges', path:'/communnity/Challenges'}
//                   ].map((item) => (
//                     <Link
//                     key={item.name}
//                     to={item.path}
//                     className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium py-2 font-Playfair"
//                     >
//                     {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               </motion.div>
//             </motion.nav>
      
//       {/* Background Blobs */}
//       <motion.div
//         animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
//         transition={{ duration: 3, repeat: Infinity }}
//         className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
//       />
//       <motion.div
//         animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
//         transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
//         className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
//       />

//       <div className="max-w-3xl mx-auto py-32">
//         {/* Progress Steps */}
//         <div className="mb-10">
//           <nav className="flex justify-center items-center gap-4">
//             {['Basics', 'Customize', 'Review'].map((label, index) => (
//               <motion.div
//                 key={index}
//                 className="flex items-center"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.2 }}
//               >
//                 <button
//                   onClick={() => index + 1 < step && setStep(index + 1)}
//                   className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
//                     step === index + 1
//                       ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
//                       : step > index + 1
//                       ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
//                       : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//                 <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400 hidden sm:inline">{label}</span>
//                 {index < 2 && (
//                   <div
//                     className={`w-12 h-1 mx-2 rounded-full transition-all ${
//                       step > index + 1 ? 'bg-gradient-to-r from-purple-600 to-blue-500' : 'bg-gray-300 dark:bg-gray-600'
//                     }`}
//                   ></div>
//                 )}
//               </motion.div>
//             ))}
//           </nav>
//         </div>

//         {/* Form Container */}
//         <motion.div
//           key={step}
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8"
//         >
//           <form onSubmit={handleSubmit}>
//             {/* Step 1: Basic Info */}
//             {step === 1 && (
//               <div className="space-y-6">
//                 <motion.h3
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-2xl font-bold text-gray-800 dark:text-white mb-4"
//                 >
//                   Community Basics
//                 </motion.h3>
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Community Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="e.g. Digital Watercolor Masters"
//                     className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white outline-none ${
//                       errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                     maxLength={50}
//                   />
//                   <div className="flex justify-between mt-1 text-sm">
//                     {errors.name && <p className="text-red-600">{errors.name}</p>}
//                     <p className="text-gray-500 dark:text-gray-400 ml-auto">{formData.name.length}/50</p>
//                   </div>
//                 </div>
//                 <div>
//                   <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Description <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     rows={4}
//                     placeholder="What makes your community unique?"
//                     className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white outline-none ${
//                       errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                     maxLength={300}
//                   />
//                   <div className="flex justify-between mt-1 text-sm">
//                     {errors.description && <p className="text-red-600">{errors.description}</p>}
//                     <p className="text-gray-500 dark:text-gray-400 ml-auto">{formData.description.length}/300</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Customization */}
//             {step === 2 && (
//               <div className="space-y-8">
//                 {/* <motion.h3
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-2xl font-bold text-gray-800 dark:text-white mb-4"
//                 >
//                   Customize Your Community
//                 </motion.h3> */}
//                 {/* <div>
//                   <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                     Community Badge
//                   </label>
//                   <div className="flex items-center gap-4 flex-wrap">
//                     <motion.div
//                       animate={{ scale: [1, 1.1, 1] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                       className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-3xl"
//                     >
//                       {formData.badge}
//                     </motion.div>
//                     <div className="grid grid-cols-6 gap-2">
//                       {['🎨', '🖌️', '👩‍🎨', '🖼️', '🌈', '✨','🧑‍🎨', '🖍️', '🎭', '🧵', '✏️', '🖋️', '🧑‍🎤', '📸', '🎨','🌟', '🌌', '💫', '🌠', '🦋', '🍭','🖊️', '🧽', '🪡', '🪞', '🎞️', '🪆','📚', '🧠', '🪄', '🗯️', '🧑‍🏫', '💡','🤝', '🧩', '🔗', '💬', '🫂', '🏳️‍🌈', '🏆', '📁', '🖥️', '🏷️', '💼', '🪪','📓', '✍️', '🧾', '🪶', '📖'
//                         ].map((emoji) => (
//                         <motion.button
//                           key={emoji}
//                           type="button"
//                           onClick={() => setFormData((prev) => ({ ...prev, badge: emoji }))}
//                           whileHover={{ scale: 1.2 }}
//                           whileTap={{ scale: 0.9 }}
//                           className={`w-10 h-10 overflow-x-auto rounded-full flex items-center justify-center text-xl transition-all ${
//                             formData.badge === emoji
//                               ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200'
//                               : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
//                           }`}
//                         >
//                           {emoji}
//                         </motion.button>
//                       ))}
//                     </div>
//                   </div>
//                 </div> */}

//                 <div className="space-y-8">
//   <motion.h3
//     initial={{ opacity: 0, y: -10 }}
//     animate={{ opacity: 1, y: 0 }}
//     className="text-3xl font-semibold text-gray-800 dark:text-white mb-4"
//   >
//     🎯 Customize Your Community
//   </motion.h3>

//   <div className="space-y-4">
//     <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
//       Selected Badge
//     </label>
//     <motion.div
//       animate={{ scale: [1, 1.1, 1] }}
//       transition={{ duration: 2, repeat: Infinity }}
//       className="w-20 h-20 rounded-full shadow-md bg-white dark:bg-gray-800 flex items-center justify-center text-4xl border-2 border-purple-400"
//     >
//       {formData.badge}
//     </motion.div>
//   </div>

//   <div className="space-y-2">
//     <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
//       Choose a Community Badge
//     </label>
//     <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md border dark:border-gray-700">
//       <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3 max-h-[200px] overflow-y-auto">
//         {badges.map((emoji) => (
//           <motion.button
//             key={emoji}
//             type="button"
//             onClick={() => setFormData((prev) => ({ ...prev, badge: emoji }))}
//             whileHover={{ scale: 1.15 }}
//             whileTap={{ scale: 0.9 }}
//             className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-200 ease-in-out border 
//               ${
//                 formData.badge === emoji
//                   ? 'bg-purple-100 dark:bg-purple-800/50 border-purple-500 text-purple-700 dark:text-purple-200'
//                   : 'bg-gray-100 dark:bg-gray-700 border-transparent hover:bg-gray-200 dark:hover:bg-gray-600'
//               }`}
//           >
//             {emoji}
//           </motion.button>
//         ))}
//       </div>
//     </div>
//   </div>
// </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                     Brand Color
//                   </label>
//                   <div className="flex items-center gap-3 flex-wrap">
//                     {['#6D28D9', '#3B82F6', '#10B981', '#F59E0B', '#EC4899'].map((color) => (
//                       <motion.button
//                         key={color}
//                         type="button"
//                         onClick={() => setFormData((prev) => ({ ...prev, color }))}
//                         whileHover={{ scale: 1.2 }}
//                         whileTap={{ scale: 0.9 }}
//                         className={`w-10 h-10 rounded-full border-2 transition-all ${
//                           formData.color === color ? 'border-purple-600 dark:border-purple-400' : 'border-transparent'
//                         }`}
//                         style={{ backgroundColor: color }}
//                         aria-label={`Select color ${color}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                     Privacy Settings <span className="text-red-500">*</span>
//                   </label>
//                   <div className="space-y-4">
//                     {[
//                       { value: 'public', label: 'Public', description: 'Anyone can join and see content' },
//                       { value: 'private', label: 'Private', description: 'Anyone can see, but must request to join' },
//                       { value: 'hidden', label: 'Hidden', description: 'Only invited members can join' },
//                     ].map((option) => (
//                       <motion.label
//                         key={option.value}
//                         whileHover={{ x: 5 }}
//                         className="flex items-start gap-3 cursor-pointer"
//                       >
//                         <input
//                           type="radio"
//                           name="privacy"
//                           value={option.value}
//                           checked={formData.privacy === option.value}
//                           onChange={() => setFormData((prev) => ({ ...prev, privacy: option.value }))}
//                           className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
//                         />
//                         <div>
//                           <p className="font-medium text-gray-800 dark:text-gray-200">{option.label}</p>
//                           <p className="text-sm text-gray-500 dark:text-gray-400">{option.description}</p>
//                         </div>
//                       </motion.label>
//                     ))}
//                   </div>
//                 </div>
//                 <motion.label
//                   whileHover={{ x: 5 }}
//                   className="flex items-center gap-3 cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     name="allowInvites"
//                     checked={formData.allowInvites}
//                     onChange={(e) => setFormData((prev) => ({ ...prev, allowInvites: e.target.checked }))}
//                     className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
//                   />
//                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Allow members to invite others
//                   </span>
//                 </motion.label>
//               </div>
//             )}

//             {/* Step 3: Rules & Review */}
//             {step === 3 && (
//               <div className="space-y-6">
//                 <motion.h3
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-2xl font-bold text-gray-800 dark:text-white mb-4"
//                 >
//                   Community Rules
//                 </motion.h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                   Set guidelines for your community. These will be shown to all members.
//                 </p>
//                 <div className="space-y-3">
//                   {formData.rules.map((rule, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="flex items-start gap-3"
//                     >
//                       <div className="flex-1">
//                         <input
//                           type="text"
//                           value={rule}
//                           onChange={(e) => handleRuleChange(index, e.target.value)}
//                           placeholder="Enter a rule..."
//                           className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
//                         />
//                       </div>
//                       <motion.button
//                         type="button"
//                         onClick={() => removeRule(index)}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 text-sm"
//                       >
//                         Remove
//                       </motion.button>
//                     </motion.div>
//                   ))}
//                 </div>
//                 <motion.button
//                   type="button"
//                   onClick={addRule}
//                   whileHover={{ scale: 1.05 }}
//                   className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 flex items-center"
//                 >
//                   <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                   </svg>
//                   Add another rule
//                 </motion.button>
//                 <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
//                   <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Review Your Community</h4>
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6"
//                   >
//                     <div className="flex items-start gap-4">
//                       <motion.div
//                         animate={{ rotate: [0, 5, -5, 0] }}
//                         transition={{ duration: 4, repeat: Infinity }}
//                         className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
//                         style={{ backgroundColor: formData.color }}
//                       >
//                         {formData.badge}
//                       </motion.div>
//                       <div>
//                         <h5 className="font-bold text-lg text-gray-800 dark:text-white">{formData.name}</h5>
//                         <p className="text-gray-600 dark:text-gray-300">{formData.description}</p>
//                         <div className="mt-2 flex items-center gap-2 flex-wrap">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200">
//                             {formData.privacy === 'public' ? 'Public' : formData.privacy === 'private' ? 'Private' : 'Hidden'}
//                           </span>
//                           {formData.allowInvites && (
//                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200">
//                               Invites allowed
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>
//               </div>
//             )}

//             {/* Form Actions */}
//             <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 sm:px-8 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
//               {step > 1 ? (
//                 <motion.button
//                   type="button"
//                   onClick={prevStep}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
//                 >
//                   Back
//                 </motion.button>
//               ) : (
//                 <Link
//                   to="/community"
//                   className="px-6 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
//                 >
//                   Cancel
//                 </Link>
//               )}
//               {step < 3 ? (
//                 <motion.button
//                   type="button"
//                   onClick={nextStep}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition"
//                 >
//                   Continue
//                 </motion.button>
//               ) : (
//                 <motion.button
//                   type="submit"
//                   disabled={isSubmitting}
//                   whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
//                   whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
//                   className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Creating...
//                     </>
//                   ) : (
//                     'Create Community'
//                   )}
//                 </motion.button>
//               )}
//             </div>
//           </form>
//         </motion.div>

//         {/* Error Message */}
//         {errors.submit && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg text-red-700 dark:text-red-400 text-center"
//           >
//             {errors.submit}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateCommunityPage;





import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { databases, ID, account } from '../appwriteConfig';
import { 
  ArrowRight, 
  ArrowLeft, 
  Image as ImageIcon, 
  Upload, 
  Plus, 
  X, 
  Shield, 
  CheckCircle2,
  Globe,
  Lock,
  Camera
} from 'lucide-react';

const communityDatabaseId = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID;
const communityCollectionId = import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID;
const communityMembersCollectionId = import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID;

const CreateCommunityPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    coverImage: null, // Changed to null (File object)
    coverPreview: '', // For displaying the image immediately
    avatar: null,     // Changed to null (File object)
    avatarPreview: '', // For displaying the image immediately
    privacy: 'public',
    rules: ['Be respectful to fellow artists', 'No AI-generated content without tags'],
  });

  // --- Handlers ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Handle File Upload (Cover & Avatar)
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      // Create a local preview URL
      const previewUrl = URL.createObjectURL(file);
      
      setFormData((prev) => ({
        ...prev,
        [field]: file,
        [`${field}Preview`]: previewUrl
      }));
    }
  };

  const handleRuleChange = (index, value) => {
    const newRules = [...formData.rules];
    newRules[index] = value;
    setFormData((prev) => ({ ...prev, rules: newRules }));
  };

  const addRule = () => {
    setFormData((prev) => ({ ...prev, rules: [...prev.rules, ''] }));
  };

  const removeRule = (index) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index),
    }));
  };

  // --- Validation ---

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Community name is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      // Optional: Check if images are uploaded
      // if (!formData.avatar) newErrors.avatar = 'Logo is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // --- Submission ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const user = await account.get();
      const userId = user.$id;

      // TODO: UPLOAD FILES TO APPWRITE STORAGE HERE
      // const coverFile = await storage.createFile(BUCKET_ID, ID.unique(), formData.coverImage);
      // const avatarFile = await storage.createFile(BUCKET_ID, ID.unique(), formData.avatar);
      // const coverUrl = storage.getFileView(BUCKET_ID, coverFile.$id);

      const communityData = {
        name: formData.name,
        description: formData.description,
        // For now, use the preview or a placeholder until storage is connected
        coverImage: formData.coverPreview, 
        avatar: formData.avatarPreview,
        privacy: formData.privacy,
        rules: formData.rules,
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        createdAt: new Date().toISOString(),
        memberCount: 1,
        ownerId: userId,
      };

      const response = await databases.createDocument(
        communityDatabaseId,
        communityCollectionId,
        ID.unique(),
        communityData
      );

      await databases.createDocument(
        communityDatabaseId,
        communityMembersCollectionId,
        ID.unique(),
        {
          communityId: response.$id,
          userId: userId,
          role: 'owner',
          joinedAt: new Date().toISOString()
        }
      );

      navigate(`/community/${communityData.slug}`);
    } catch (error) {
      console.error('Error creating community:', error);
      setErrors({ submit: error.message || 'Failed to create community' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      
      {/* Navbar Minimal */}
      <nav className="fixed top-0 w-full h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
        <Link to="/community" className="flex items-center gap-2 font-bold tracking-tight">
          <ArrowLeft size={20} className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors" />
          <span>Back</span>
        </Link>
        <span className="text-sm font-medium text-zinc-500">Step {step} of 3</span>
      </nav>

      <div className="max-w-2xl mx-auto pt-32 pb-20 px-6">
        
        {/* Progress Indicator */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                step >= i ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'
              }`} 
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            
            {/* --- STEP 1: IDENTITY --- */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2">Community Identity</h1>
                  <p className="text-zinc-500">Define the visual look and feel of your new space.</p>
                </div>

                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Cover Image</label>
                  <div className="relative group h-48 w-full bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 rounded-xl overflow-hidden transition-colors hover:border-zinc-400 dark:hover:border-zinc-500">
                    
                    {formData.coverPreview ? (
                      <>
                        <img src={formData.coverPreview} alt="Cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white font-medium flex items-center gap-2"><Camera size={20}/> Change Cover</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                        <ImageIcon size={32} className="mb-2" />
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Click to upload cover</span>
                        <span className="text-xs mt-1">1200 x 400 recommended</span>
                      </div>
                    )}
                    
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'coverImage')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Avatar & Name Group */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  
                  {/* Avatar Upload */}
                  <div className="space-y-2 shrink-0">
                    <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Logo</label>
                    <div className="relative group w-24 h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
                      {formData.avatarPreview ? (
                        <>
                          <img src={formData.avatarPreview} alt="Logo" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Upload size={16} className="text-white" />
                          </div>
                        </>
                      ) : (
                        <Upload size={24} className="text-zinc-400" />
                      )}
                      
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'avatar')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-6 w-full">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Minimalist Designers"
                        className="w-full text-2xl font-bold bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 focus:outline-none focus:border-black dark:focus:border-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700 transition-colors"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="What is this community about?"
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all resize-none"
                      />
                      {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- STEP 2: GUIDELINES --- */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2">Guidelines</h1>
                  <p className="text-zinc-500">Set the tone and privacy level.</p>
                </div>

                {/* Privacy Toggle */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, privacy: 'public' }))}
                    className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
                      formData.privacy === 'public' 
                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black' 
                        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-400'
                    }`}
                  >
                    <Globe size={24} />
                    <span className="font-medium">Public</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, privacy: 'private' }))}
                    className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
                      formData.privacy === 'private' 
                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black' 
                        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-400'
                    }`}
                  >
                    <Lock size={24} />
                    <span className="font-medium">Private</span>
                  </button>
                </div>

                {/* Rules List */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Community Rules</label>
                  </div>
                  
                  {formData.rules.map((rule, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2"
                    >
                      <div className="flex items-center justify-center w-8 h-10 text-zinc-400 font-mono text-sm">
                        {index + 1}.
                      </div>
                      <input
                        type="text"
                        value={rule}
                        onChange={(e) => handleRuleChange(index, e.target.value)}
                        placeholder="Enter a rule..."
                        className="flex-1 bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-2 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
                      />
                      <button 
                        type="button"
                        onClick={() => removeRule(index)}
                        className="text-zinc-400 hover:text-red-500 transition-colors px-2"
                      >
                        <X size={18} />
                      </button>
                    </motion.div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addRule}
                    className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-white hover:opacity-70 transition-opacity mt-4 pl-10"
                  >
                    <Plus size={16} /> Add Rule
                  </button>
                </div>
              </motion.div>
            )}

            {/* --- STEP 3: REVIEW --- */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2">Review</h1>
                  <p className="text-zinc-500">This is how your community will look.</p>
                </div>

                {/* Preview Card */}
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-black shadow-lg">
                  {/* Banner */}
                  <div className="h-48 w-full bg-zinc-100 dark:bg-zinc-900 relative">
                     {formData.coverPreview && <img src={formData.coverPreview} className="w-full h-full object-cover" alt="Cover" />}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="px-6 pb-6 -mt-10 relative">
                    <div className="flex justify-between items-end">
                      <div className="flex gap-4 items-end">
                        <div className="w-24 h-24 rounded-xl bg-white dark:bg-zinc-900 p-1 shadow-md">
                          {formData.avatarPreview ? (
                            <img src={formData.avatarPreview} className="w-full h-full rounded-lg object-cover bg-zinc-200" alt="Avatar" />
                          ) : (
                            <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">🎨</div>
                          )}
                        </div>
                        <div className="mb-2">
                           <h2 className="text-2xl font-bold text-white drop-shadow-md">{formData.name}</h2>
                           <span className="text-zinc-200 text-sm drop-shadow-md flex items-center gap-1">
                             {formData.privacy === 'public' ? <Globe size={12}/> : <Lock size={12}/>} 
                             {formData.privacy.charAt(0).toUpperCase() + formData.privacy.slice(1)} Group
                           </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {formData.description}
                      </p>
                      
                      <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
                          <Shield size={12} /> Community Rules
                        </h3>
                        <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                          {formData.rules.filter(r => r).map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
          
          {/* Form Actions */}
          <div className="mt-12 flex justify-between items-center pt-6 border-t border-zinc-200 dark:border-zinc-800">
             {step > 1 ? (
               <button 
                type="button" 
                onClick={prevStep}
                className="text-zinc-500 hover:text-black dark:hover:text-white font-medium transition-colors"
               >
                 Back
               </button>
             ) : (
               <div />
             )}

             {step < 3 ? (
               <button 
                type="button" 
                onClick={nextStep}
                className="bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
               >
                 Continue <ArrowRight size={18} />
               </button>
             ) : (
               <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
               >
                 {isSubmitting ? 'Creating...' : 'Launch Community'} 
                 {!isSubmitting && <CheckCircle2 size={18} />}
               </button>
             )}
          </div>
          
          {errors.submit && (
            <p className="text-red-500 text-center mt-4 text-sm">{errors.submit}</p>
          )}

        </form>
      </div>
    </div>
  );
};

export default CreateCommunityPage;