// // import { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { databases, Query, account } from '../appwriteConfig';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Link } from 'react-router-dom';
// // import { toast } from 'react-toastify';


// // const CommunityDashboard = () => {
// //   const { slug } = useParams();
// //   const [community, setCommunity] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [members, setMembers] = useState([]);
// //   const [activeTab, setActiveTab] = useState('overview');
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [showResourceModal, setShowResourceModal] = useState(false);
// //   const [requests, setRequests] = useState([]);
// //   const [currentUser, setCurrentUser] = useState(null)

// // useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const user = await account.get();
// //         setCurrentUser(user);
// //       } catch (error) {
// //         console.error("Error fetching user:", error);
// //       }
// //     };
// //     fetchUser();
// //   }, []);

// //   // Fetch community data
// //   useEffect(() => {
// //     const fetchCommunity = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await databases.listDocuments(
// //           import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
// //           import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
// //           [Query.equal('slug', slug)]
// //         );

// //         if (response.documents.length === 0) {
// //           throw new Error('Community not found');
// //         }

// //         const communityData = response.documents[0];
// //         setCommunity(communityData);

// //         // Fetch members
// //         const membersResponse = await databases.listDocuments(
// //           import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
// //           import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID,
// //           [Query.equal('communityId', communityData.$id)]
// //         );

// //         // Fetch usernames
// //         const membersWithUsernames = await Promise.all(
// //           membersResponse.documents.map(async (member) => {
// //             try {
// //               const userDoc = await databases.getDocument(
// //                 import.meta.env.VITE_APPWRITE_DATABASE_ID,
// //                 import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
// //                 member.userId
// //               );
// //               return {
// //                 ...member,
// //                 username: userDoc.username || "Unknown User",
// //                 avatar: userDoc.avatar || null,
// //               };
// //             } catch (error) {
// //               console.error("Failed to fetch user:", error);
// //               return {
// //                 ...member,
// //                 username: "Unknown User",
// //                 avatar: null,
// //               };
// //             }
// //           })
// //         );

// //         setMembers(membersWithUsernames);
// //       } catch (error) {
// //         console.error("Error fetching community:", error.message);
// //         toast.error("Failed to load community data");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCommunity();
// //   }, [slug]);

// //   // Fetch pending requests
// //   useEffect(() => {
// //     const fetchRequests = async () => {
// //       if (!community) return;
      
// //       try {
// //         const response = await databases.listDocuments(
// //           import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
// //           import.meta.env.VITE_APPWRITE_COMMUNITY_REQUEST_COLLECTION_ID,
// //           [
// //             Query.equal('communityId', community.$id),
// //             Query.equal('status', 'pending')
// //           ]
// //         );

// //         // Fetch usernames for requests
// //         const requestsWithUsernames = await Promise.all(
// //           response.documents.map(async (request) => {
// //             try {
// //               const userDoc = await databases.getDocument(
// //                 import.meta.env.VITE_APPWRITE_DATABASE_ID,
// //                 import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
// //                 request.userId
// //               );
// //               return {
// //                 ...request,
// //                 username: userDoc.username || "Unknown User",
// //                 avatar: userDoc.avatar || null,
// //               };
// //             } catch (error) {
// //               console.error("Failed to fetch request user:", error);
// //               return {
// //                 ...request,
// //                 username: "Unknown User",
// //                 avatar: null,
// //               };
// //             }
// //           })
// //         );

// //         setRequests(requestsWithUsernames);
// //       } catch (error) {
// //         console.error("Error fetching join requests:", error);
// //         toast.error("Failed to load join requests");
// //       }
// //     };

// //     fetchRequests();
// //   }, [community]);


// //   const handleApprove = async (request) => {
// //   try {
// //     // 1. Add user to members collection
// //     const newMember = await databases.createDocument(
// //       import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
// //       import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID,
// //       'unique()',
// //       {
// //         communityId: request.communityId,
// //         userId: request.userId,
// //         role: 'member',
// //         joinedAt: new Date().toISOString()
// //       }
// //     );

// //     // 2. Update community member count
// //     await databases.updateDocument(
// //       import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
// //       import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
// //       community.$id,
// //       {
// //         memberCount: community.memberCount + 1
// //       }
// //     );

// //     // 3. Update request status to approved
// //     await databases.updateDocument(
// //       import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
// //       import.meta.env.VITE_APPWRITE_COMMUNITY_REQUEST_COLLECTION_ID,
// //       request.$id,
// //       { status: 'approved' }
// //     );

// //     // 4. Update local state
// //     setRequests(requests.filter(req => req.$id !== request.$id));
// //     setMembers([...members, {
// //       ...newMember,
// //       username: request.username,
// //       avatar: request.avatar
// //     }]);
// //     setCommunity({
// //       ...community,
// //       memberCount: community.memberCount + 1
// //     });

// //     toast.success(`${request.username} has been added to the community!`);
// //   } catch (error) {
// //     console.error("Approval error:", error);
// //     toast.error("Failed to approve request");
// //   }
// // };


// //   // Reject join request
// //   const handleReject = async (request) => {
// //     try {
// //       // Update request status to rejected
// //       await databases.updateDocument(
// //         import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
// //         import.meta.env.VITE_APPWRITE_COMMUNITY_REQUEST_COLLECTION_ID,
// //         request.$id,
// //         { status: 'rejected' }
// //       );

// //       // Update local state
// //       setRequests(requests.filter(req => req.$id !== request.$id));
// //       toast.info(`Request from ${request.username} has been rejected`);
// //     } catch (error) {
// //       console.error("Rejection error:", error);
// //       toast.error("Failed to reject request");
// //     }
// //   };


// //   // Animation variants
// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //         when: "beforeChildren"
// //       }
// //     }
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: { duration: 0.5 }
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
// //         <div className="flex flex-col items-center gap-4">
// //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
// //           <p className="text-gray-600 dark:text-gray-400">Loading community...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!community) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
// //         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md text-center">
// //           <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Community Not Found</h2>
// //           <p className="text-gray-600 dark:text-gray-300 mb-4">The community you're looking for doesn't exist or may have been removed.</p>
// //           <Link 
// //             to="/" 
// //             className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
// //           >
// //             Return Home
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 font-Playfair">
// //       {/* Floating Navigation */}
// //       <motion.nav
// //         initial={{ y: -100 }}
// //         animate={{ y: 0 }}
// //         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
// //         className="fixed top-4 w-[95%] mx-auto rounded-lg left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700"
// //       >
// //         <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-center justify-between h-16">
// //             <div className="flex items-center">
// //               <Link 
// //                 to="/" 
// //                 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle"
// //               >
// //                 ArtVerse
// //               </Link>
// //             </div>
            
// //             <div className="hidden md:block">
// //               <div className="flex items-center space-x-8">
// //                 {['Home', 'Explore', 'Challenges', 'Resources'].map((item) => (
// //                   <motion.div
// //                     key={item}
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                     className="relative"
// //                   >
// //                     <Link
// //                       to="#"
// //                       className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition"
// //                     >
// //                       {item}
// //                       <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
// //                     </Link>
// //                   </motion.div>
// //                 ))}
// //                 <motion.button
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-purple-500/20 transition"
// //                 >
// //                   Create
// //                 </motion.button>
// //               </div>
// //             </div>

// //             <button
// //               className="md:hidden text-gray-700 dark:text-gray-300"
// //               onClick={() => setIsMenuOpen(!isMenuOpen)}
// //             >
// //               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 {isMenuOpen ? (
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                 ) : (
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //                 )}
// //               </svg>
// //             </button>
// //           </div>
// //         </div>

// //         {/* Mobile menu */}
// //         <AnimatePresence>
// //           {isMenuOpen && (
// //             <motion.div
// //               initial={{ opacity: 0, height: 0 }}
// //               animate={{ opacity: 1, height: 'auto' }}
// //               exit={{ opacity: 0, height: 0 }}
// //               transition={{ duration: 0.3 }}
// //               className="md:hidden overflow-hidden"
// //             >
// //               <div className="px-4 pb-4 space-y-2">
// //                 {['Home', 'Explore', 'Challenges', 'Resources'].map((item) => (
// //                   <motion.div
// //                     key={item}
// //                     initial={{ x: -20, opacity: 0 }}
// //                     animate={{ x: 0, opacity: 1 }}
// //                     transition={{ duration: 0.2 }}
// //                   >
// //                     <Link
// //                       to="#"
// //                       className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium"
// //                     >
// //                       {item}
// //                     </Link>
// //                   </motion.div>
// //                 ))}
// //                 <motion.button
// //                   initial={{ scale: 0.9, opacity: 0 }}
// //                   animate={{ scale: 1, opacity: 1 }}
// //                   transition={{ delay: 0.1 }}
// //                   className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg shadow-lg"
// //                 >
// //                   Create
// //                 </motion.button>
// //               </div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </motion.nav>

// //       {/* Community Header */}
// //       <motion.header
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ delay: 0.2 }}
// //         className="relative pt-24 pb-16 md:pt-32 md:pb-24 text-white"
// //         style={{ backgroundColor: community.color }}
// //       >
// //         <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// //           <motion.div
// //             initial={{ y: 20, opacity: 0 }}
// //             animate={{ y: 0, opacity: 1 }}
// //             transition={{ delay: 0.3 }}
// //             className="flex flex-col md:flex-row items-center gap-6 md:gap-8"
// //           >
// //             <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl md:text-6xl shadow-lg font-Quicksand">
// //               {community.badge}
// //             </div>
// //             <div className="text-center md:text-left">
// //               <motion.h1 
// //                 initial={{ y: 10, opacity: 0 }}
// //                 animate={{ y: 0, opacity: 1 }}
// //                 transition={{ delay: 0.4 }}
// //                 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg font-Quicksand"
// //               >
// //                 {community.name}
// //               </motion.h1>
// //               <motion.p
// //                 initial={{ y: 10, opacity: 0 }}
// //                 animate={{ y: 0, opacity: 1 }}
// //                 transition={{ delay: 0.5 }}
// //                 className="text-lg md:text-xl opacity-90 drop-shadow-md font-Playfair"
// //               >
// //                 {community.memberCount} members • {community.privacy === 'public' ? 'Public' : 'Private'} community
// //               </motion.p>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </motion.header>

// //       {/* Main Content */}
// //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
// //         {/* Floating Tab Navigation */}
// //         <motion.div
// //           initial={{ y: -20, opacity: 0 }}
// //           animate={{ y: 0, opacity: 1 }}
// //           transition={{ delay: 0.4 }}
// //           className="sticky top-16 md:top-20 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8 overflow-hidden"
// //         >
// //           <nav className="flex overflow-x-auto">
// //             {['overview', 'members', 'challenges', 'resources', 'settings'].map((tab) => (
// //               <button
// //                 key={tab}
// //                 onClick={() => setActiveTab(tab)}
// //                 className={`px-6 py-3 font-medium text-sm whitespace-nowrap relative ${
// //                   activeTab === tab
// //                     ? 'text-purple-600 dark:text-purple-400'
// //                     : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
// //                 }`}
// //               >
// //                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
// //                 {activeTab === tab && (
// //                   <motion.div
// //                     layoutId="tabIndicator"
// //                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400"
// //                     transition={{ type: 'spring', stiffness: 300, damping: 30 }}
// //                   />
// //                 )}
// //               </button>
// //             ))}
// //           </nav>
// //         </motion.div>

// //         {/* Tab Content */}
// //         <AnimatePresence mode="wait">
// //           <motion.div
// //             key={activeTab}
// //             initial={{ opacity: 0, y: 10 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -10 }}
// //             transition={{ duration: 0.2 }}
// //             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
// //           >
// //             {/* Left Column */}
// //             <div className="lg:col-span-2 space-y-6">
// //               {/* About Section */}
// //               {activeTab === 'overview' && (
// //                 <>
// //                   <motion.div
// //                     variants={containerVariants}
// //                     initial="hidden"
// //                     animate="visible"
// //                     className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
// //                   >
// //                     <div className="p-6 sm:p-8">
// //                       <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About</h2>
// //                       <motion.p 
// //                         variants={itemVariants}
// //                         className="text-gray-600 dark:text-gray-300"
// //                       >
// //                         {community.description}
// //                       </motion.p>
                      
// //                       {/* Rules Section */}
// //                       <motion.div
// //                         variants={itemVariants}
// //                         className="mt-6"
// //                       >
// //                         <h3 className="font-medium text-gray-800 dark:text-white mb-3">Community Rules</h3>
// //                         <ul className="space-y-2">
// //                           {community.rules.map((rule, index) => (
// //                             <motion.li 
// //                               key={index}
// //                               variants={itemVariants}
// //                               className="flex items-start"
// //                             >
// //                               <span className="text-purple-500 mr-2">•</span>
// //                               <span className="text-gray-600 dark:text-gray-300">{rule}</span>
// //                             </motion.li>
// //                           ))}
// //                         </ul>
// //                       </motion.div>
// //                     </div>
// //                   </motion.div>

// //                   {/* Recent Activity */}
// //                   <motion.div
// //                     variants={containerVariants}
// //                     initial="hidden"
// //                     animate="visible"
// //                     className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
// //                   >
// //                     <div className="p-6 sm:p-8">
// //                       <div className="flex justify-between items-center mb-4">
// //                         <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Activity</h2>
// //                         <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
// //                           View All
// //                         </button>
// //                       </div>
                      
// //                       <div className="space-y-4">
// //                         {[1, 2, 3].map((item) => (
// //                           <motion.div
// //                             key={item}
// //                             variants={itemVariants}
// //                             className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition"
// //                           >
// //                             <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
// //                               {item % 2 === 0 ? '🎨' : '💬'}
// //                             </div>
// //                             <div>
// //                               <p className="text-gray-800 dark:text-gray-200">
// //                                 <span className="font-medium">User{item}</span> {item % 2 === 0 ? 'submitted to' : 'commented on'} <span className="text-purple-600 dark:text-purple-400">Challenge #{item}</span>
// //                               </p>
// //                               <p className="text-sm text-gray-500 dark:text-gray-400">
// //                                 {item} hour{item !== 1 ? 's' : ''} ago
// //                               </p>
// //                             </div>
// //                           </motion.div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </motion.div>
// //                 </>
// //               )}

// //               {/* Members Tab */}

// //               {activeTab === 'members' && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ duration: 0.3 }}
// //             className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
// //           >
// //             {/* Members Table */}
// //             <div className="p-6">
// //               <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
// //                 Community Members ({members.length})
// //               </h2>
              
// //               <div className="overflow-x-auto">
// //                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
// //                   <thead className="bg-gray-50 dark:bg-gray-700">
// //                     <tr>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Member</th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
// //                     {members.map((member) => (
// //                       <tr key={member.$id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="flex items-center">
// //                             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
// //                               {member.avatar ? (
// //                                 <img src={member.avatar} alt={member.username} className="h-full w-full object-cover" />
// //                               ) : (
// //                                 <span className="text-lg">👤</span>
// //                               )}
// //                             </div>
// //                             <div className="ml-4">
// //                               <div className="text-sm font-medium text-gray-900 dark:text-white">
// //                                 {member.username}
// //                               </div>
// //                               <div className="text-sm text-gray-500 dark:text-gray-400">
// //                                 {member.userId === currentUser?.$id ? '(You)' : ''}
// //                               </div>
// //                             </div>
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                             member.role === 'admin' || member.role === 'owner'
// //                               ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
// //                               : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
// //                           }`}>
// //                             {member.role}
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
// //                           {new Date(member.joinedAt).toLocaleDateString()}
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //              </div>
// //             {/* Pending Requests Section */}
// //             {requests.length > 0 && (
// //               <div className="border-t border-gray-200 dark:border-gray-700 p-6">
// //                 <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
// //                   Pending Join Requests ({requests.length})
// //                 </h3>
                
// //                 <div className="space-y-4">
// //                   {requests.map((request) => (
// //                     <motion.div
// //                       key={request.$id}
// //                       initial={{ opacity: 0, y: 10 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
// //                     >
// //                       <div className="flex items-center space-x-4">
// //                         <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
// //                           {request.avatar ? (
// //                             <img src={request.avatar} alt={request.username} className="h-full w-full object-cover" />
// //                           ) : (
// //                             <span className="text-xl">👤</span>
// //                           )}
// //                         </div>
// //                         <div>
// //                           <h4 className="font-medium text-gray-800 dark:text-white">
// //                             {request.username}
// //                           </h4>
// //                           <p className="text-sm text-gray-500 dark:text-gray-400">
// //                             Requested {new Date(request.$createdAt).toLocaleDateString()}
// //                           </p>
// //                         </div>
// //                       </div>
                      
// //                       <div className="flex space-x-2">
// //                         <motion.button
// //                           whileHover={{ scale: 1.05, boxShadow: "0 0 0 2px rgba(74, 222, 128, 0.5)" }}
// //                           whileTap={{ scale: 0.95 }}
// //                           onClick={() => handleApprove(request)}
// //                           className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center space-x-1 transition"
// //                         >
// //                           <span>Approve</span>
// //                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
// //                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
// //                           </svg>
// //                         </motion.button>
                        
// //                         <motion.button
// //                           whileHover={{ scale: 1.05, boxShadow: "0 0 0 2px rgba(248, 113, 113, 0.5)" }}
// //                           whileTap={{ scale: 0.95 }}
// //                           onClick={() => handleReject(request)}
// //                           className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center space-x-1 transition"
// //                         >
// //                           <span>Reject</span>
// //                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
// //                             <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
// //                           </svg>
// //                         </motion.button>
// //                       </div>
// //                     </motion.div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </motion.div>
// //         )}
// //               {/* Add other tabs content here */}
// //               <Link to={"/Community/DiscoverNewMember/MemberDiscoveryPage"}>
// //              <div>
// //               find new member
// //              </div></Link>
// //             </div>

// //             {/* Right Column - Sidebar */}
// //             <div className="space-y-6">
// //               {/* Community Stats */}
// //               <motion.div
// //                 variants={containerVariants}
// //                 initial="hidden"
// //                 animate="visible"
// //                 className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
// //               >
// //                 <div className="p-6 sm:p-8">
// //                   <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Community Stats</h2>
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <motion.div
// //                       variants={itemVariants}
// //                       className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
// //                     >
// //                       <p className="text-sm text-gray-500 dark:text-gray-400">Members</p>
// //                       <p className="text-2xl font-bold text-gray-800 dark:text-white">{community.memberCount}</p>
// //                     </motion.div>
// //                     <motion.div
// //                       variants={itemVariants}
// //                       className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
// //                     >
// //                       <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
// //                       <p className="text-2xl font-bold text-gray-800 dark:text-white">87</p>
// //                     </motion.div>
// //                     <motion.div
// //                       variants={itemVariants}
// //                       className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
// //                     >
// //                       <p className="text-sm text-gray-500 dark:text-gray-400">Challenges</p>
// //                       <p className="text-2xl font-bold text-gray-800 dark:text-white">24</p>
// //                     </motion.div>
// //                     <motion.div
// //                       variants={itemVariants}
// //                       className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
// //                     >
// //                       <p className="text-sm text-gray-500 dark:text-gray-400">Resources</p>
// //                       <p className="text-2xl font-bold text-gray-800 dark:text-white">15</p>
// //                     </motion.div>
// //                   </div>
// //                 </div>
// //               </motion.div>

// //               {/* Quick Actions */}
// //               <motion.div
// //                 variants={containerVariants}
// //                 initial="hidden"
// //                 animate="visible"
// //                 className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
// //               >
// //                 <div className="p-6 sm:p-8">
// //                   <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Quick Actions</h2>
// //                   <div className="space-y-3">
// //                     <motion.button
// //                       variants={itemVariants}
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition"
// //                     >
// //                       <span className="text-gray-800 dark:text-white">Start Live Session</span>
// //                       <span className="text-purple-600 dark:text-purple-400 text-xl">🎥</span>
// //                     </motion.button>
// //                     <Link to={"/Community/CommunityDashboard/CreateNewChallenge"}>                  
// //                     <motion.button
// //                       variants={itemVariants}
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition"
// //                     >
// //                       <span className="text-gray-800 dark:text-white">Create Challenge</span>
// //                       <span className="text-purple-600 dark:text-purple-400 text-xl">🎨</span>
// //                     </motion.button>
// //                       </Link>
// //                     <motion.button
// //                       variants={itemVariants}
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition"
// //                     >
// //                       <span className="text-gray-800 dark:text-white">Upload Resource</span>
// //                       <span className="text-purple-600 dark:text-purple-400 text-xl">📁</span>
// //                     </motion.button>
// //                   </div>
// //                 </div>
// //               </motion.div>

// //               {/* Upcoming Events */}
// //               <motion.div
// //                 variants={containerVariants}
// //                 initial="hidden"
// //                 animate="visible"
// //                 className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
// //               >
// //                 <div className="p-6 sm:p-8">
// //                   <div className="flex justify-between items-center mb-6">
// //                     <h2 className="text-xl font-bold text-gray-800 dark:text-white">Upcoming Events</h2>
// //                     <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
// //                       View All
// //                     </button>
// //                   </div>
                  
// //                   <div className="space-y-4">
// //                     <motion.div
// //                       variants={itemVariants}
// //                       className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition"
// //                     >
// //                       <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 text-xl">
// //                         🎨
// //                       </div>
// //                       <div>
// //                         <h3 className="font-medium text-gray-800 dark:text-white">Live Portrait Workshop</h3>
// //                         <p className="text-sm text-gray-500 dark:text-gray-400">Nov 18, 4PM UTC</p>
// //                       </div>
// //                     </motion.div>
// //                     <motion.div
// //                       variants={itemVariants}
// //                       className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition"
// //                     >
// //                       <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl">
// //                         💬
// //                       </div>
// //                       <div>
// //                         <h3 className="font-medium text-gray-800 dark:text-white">AI Art Discussion</h3>
// //                         <p className="text-sm text-gray-500 dark:text-gray-400">Nov 20, 6PM UTC</p>
// //                       </div>
// //                     </motion.div>
// //                   </div>
                  
// //                   <motion.button
// //                     variants={itemVariants}
// //                     whileHover={{ scale: 1.02 }}
// //                     whileTap={{ scale: 0.98 }}
// //                     className="mt-4 w-full py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition"
// //                   >
// //                     View Calendar
// //                   </motion.button>
// //                 </div>
// //               </motion.div>
// //             </div>
// //           </motion.div>
// //         </AnimatePresence>

// //         {/* Resource Modal */}
// //         <AnimatePresence>
// //           {showResourceModal && (
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
// //             >
// //               <motion.div
// //                 initial={{ scale: 0.95, opacity: 0 }}
// //                 animate={{ scale: 1, opacity: 1 }}
// //                 exit={{ scale: 0.95, opacity: 0 }}
// //                 className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700"
// //               >
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h3 className="text-lg font-bold text-gray-800 dark:text-white">Add New Resource</h3>
// //                   <motion.button
// //                     whileHover={{ scale: 1.1 }}
// //                     onClick={() => setShowResourceModal(false)}
// //                     className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
// //                   >
// //                     ✕
// //                   </motion.button>
// //                 </div>
                
// //                 <div className="space-y-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
// //                       Resource Name
// //                     </label>
// //                     <input
// //                       type="text"
// //                       placeholder="e.g. Procreate Brush Pack"
// //                       className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
// //                     />
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
// //                       Resource Type
// //                     </label>
// //                     <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
// //                       <option>Brushes</option>
// //                       <option>Template</option>
// //                       <option>3D Model</option>
// //                       <option>Tutorial</option>
// //                     </select>
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
// //                       Upload File
// //                     </label>
// //                     <motion.div
// //                       whileHover={{ scale: 1.01 }}
// //                       className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg"
// //                     >
// //                       <div className="space-y-1 text-center">
// //                         <div className="text-2xl text-gray-500 dark:text-gray-400 mb-2">
// //                           📁
// //                         </div>
// //                         <div className="flex text-sm text-gray-600 dark:text-gray-400">
// //                           <label className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300">
// //                             <span>Upload a file</span>
// //                             <input type="file" className="sr-only" />
// //                           </label>
// //                           <p className="pl-1">or drag and drop</p>
// //                         </div>
// //                         <p className="text-xs text-gray-500 dark:text-gray-400">
// //                           PNG, JPG, PSD up to 10MB
// //                         </p>
// //                       </div>
// //                     </motion.div>
// //                   </div>
                  
// //                   <div className="flex justify-end gap-3 pt-4">
// //                     <motion.button
// //                       whileHover={{ scale: 1.05 }}
// //                       whileTap={{ scale: 0.95 }}
// //                       onClick={() => setShowResourceModal(false)}
// //                       className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
// //                     >
// //                       Cancel
// //                     </motion.button>
// //                     <motion.button
// //                       whileHover={{ scale: 1.05 }}
// //                       whileTap={{ scale: 0.95 }}
// //                       className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition"
// //                     >
// //                       Upload Resource
// //                     </motion.button>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </main>
// //     </div>
// //   );
// // }
// // export default CommunityDashboard;


// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Users, 
//   Calendar, 
//   Settings, 
//   MessageSquare, 
//   Layers, 
//   Search, 
//   Bell, 
//   MoreHorizontal,
//   ChevronRight,
//   ShieldCheck,
//   LayoutGrid
// } from 'lucide-react';

// // --- MOCK DATA (Replaces Appwrite) ---
// const COMMUNITY_DATA = {
//   name: "UX/UI Minimalists",
//   slug: "ux-ui-minimalists",
//   description: "A professional collective for designers focused on monochromatic and structural design systems. We discuss clean interfaces, typography, and accessibility.",
//   memberCount: 1240,
//   onlineCount: 85,
//   role: "admin", // current user role
//   rules: ["Respect the grid.", "Accessibility first.", "No solicitations."],
// };

// const MEMBERS_DATA = [
//   { id: 1, name: "Alex Morgan", role: "Owner", avatar: null, status: "online" },
//   { id: 2, name: "Sarah Chen", role: "Admin", avatar: null, status: "offline" },
//   { id: 3, name: "Jordan Smith", role: "Member", avatar: null, status: "online" },
//   { id: 4, name: "Mike Ross", role: "Member", avatar: null, status: "offline" },
// ];

// const EVENTS_DATA = [
//   { id: 1, title: "Design System Review", date: "Today, 4:00 PM", type: "Live" },
//   { id: 2, title: "Typography Workshop", date: "Oct 24, 2:00 PM", type: "Workshop" },
// ];

// const ACTIVITY_FEED = [
//   { id: 1, user: "Sarah Chen", action: "posted a new resource", target: "Figma UI Kit v2", time: "2h ago" },
//   { id: 2, user: "Jordan Smith", action: "commented on", target: "Dark Mode Guidelines", time: "4h ago" },
//   { id: 3, user: "Alex Morgan", action: "created a challenge", target: "White Space Utilization", time: "1d ago" },
// ];

// // --- UI COMPONENTS ---

// const Card = ({ children, className = "" }) => (
//   <div className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg ${className}`}>
//     {children}
//   </div>
// );

// const Badge = ({ children, variant = "default" }) => {
//   const styles = {
//     default: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300",
//     outline: "border border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400",
//     dark: "bg-zinc-900 text-white dark:bg-white dark:text-black",
//   };
//   return (
//     <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${styles[variant]}`}>
//       {children}
//     </span>
//   );
// };

// const CommunityDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isSidebarOpen, setSidebarOpen] = useState(true);

//   // Tab Content Renderer
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return <OverviewTab />;
//       case 'members':
//         return <MembersTab />;
//       case 'events':
//         return <EventsTab />;
//       default:
//         return <OverviewTab />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex font-sans">
      
//       {/* Sidebar Navigation */}
//       <motion.aside 
//         initial={false}
//         animate={{ width: isSidebarOpen ? 260 : 80 }}
//         className="fixed left-0 top-0 h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-40 hidden md:flex flex-col"
//       >
//         <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
//           <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center text-white dark:text-black font-bold">
//             AV
//           </div>
//           {isSidebarOpen && <span className="ml-3 font-semibold tracking-tight">ArtVerse Pro</span>}
//         </div>

//         <nav className="flex-1 py-6 px-4 space-y-1">
//           <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" active />
//           <NavItem icon={<Layers size={20} />} label="Projects" />
//           <NavItem icon={<MessageSquare size={20} />} label="Messages" />
//           <div className="pt-4 pb-2">
//             {isSidebarOpen && <p className="px-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">Community</p>}
//           </div>
//           <NavItem icon={<Users size={20} />} label="Members" />
//           <NavItem icon={<Settings size={20} />} label="Settings" />
//         </nav>

//         <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
//             {isSidebarOpen && (
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium truncate">Alex Morgan</p>
//                 <p className="text-xs text-zinc-500 truncate">alex@artverse.com</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.aside>

//       {/* Main Content Area */}
//       <main className={`flex-1 ${isSidebarOpen ? 'md:ml-[260px]' : 'md:ml-[80px]'} transition-all duration-300`}>
        
//         {/* Top Header */}
//         <header className="h-16 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30 px-6 flex items-center justify-between">
//           <div className="flex items-center gap-2 text-sm text-zinc-500">
//             <span>Communities</span>
//             <ChevronRight size={14} />
//             <span className="text-zinc-900 dark:text-white font-medium">{COMMUNITY_DATA.name}</span>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="relative hidden sm:block">
//               <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
//               <input 
//                 type="text" 
//                 placeholder="Search..." 
//                 className="pl-9 pr-4 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-md border-none focus:ring-1 focus:ring-zinc-400 outline-none w-64 transition-all"
//               />
//             </div>
//             <button className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors relative">
//               <Bell size={20} />
//               <span className="absolute top-2 right-2 w-2 h-2 bg-black dark:bg-white rounded-full"></span>
//             </button>
//           </div>
//         </header>

//         <div className="p-6 max-w-7xl mx-auto space-y-8">
          
//           {/* Community Banner area */}
//           <div className="relative">
//             <div className="h-48 bg-gradient-to-r from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 rounded-xl"></div>
//             <div className="absolute -bottom-12 left-8 flex items-end gap-6">
//               <div className="w-24 h-24 bg-white dark:bg-zinc-950 rounded-xl p-1 shadow-lg">
//                 <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-3xl">
//                   🎨
//                 </div>
//               </div>
//               <div className="mb-2">
//                 <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{COMMUNITY_DATA.name}</h1>
//                 <p className="text-zinc-500 flex items-center gap-2 text-sm mt-1">
//                   @{COMMUNITY_DATA.slug} • {COMMUNITY_DATA.memberCount} members
//                 </p>
//               </div>
//             </div>
//             <div className="absolute bottom-4 right-8 flex gap-3">
//                <button className="px-4 py-2 text-sm font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-sm hover:bg-zinc-50 transition-colors">
//                  Share
//                </button>
//                <button className="px-4 py-2 text-sm font-medium bg-zinc-900 dark:bg-white text-white dark:text-black rounded-md shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
//                  Invite Members
//                </button>
//             </div>
//           </div>

//           {/* Spacer for the overlapping banner content */}
//           <div className="h-10"></div>

//           {/* Navigation Tabs */}
//           <div className="border-b border-zinc-200 dark:border-zinc-800">
//             <nav className="flex gap-8">
//               {['overview', 'members', 'challenges', 'events', 'settings'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`pb-4 text-sm font-medium capitalize relative transition-colors ${
//                     activeTab === tab 
//                       ? 'text-zinc-900 dark:text-white' 
//                       : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
//                   }`}
//                 >
//                   {tab}
//                   {activeTab === tab && (
//                     <motion.div 
//                       layoutId="activeTab"
//                       className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900 dark:bg-white"
//                     />
//                   )}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           {/* Dynamic Content */}
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             {renderContent()}
//           </motion.div>

//         </div>
//       </main>
//     </div>
//   );
// };

// // --- SUB-COMPONENTS ---

// const NavItem = ({ icon, label, active = false }) => (
//   <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//     active 
//       ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' 
//       : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200'
//   }`}>
//     <span className={active ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}>{icon}</span>
//     <span>{label}</span>
//   </button>
// );

// const OverviewTab = () => (
//   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//     {/* Left Column (Main) */}
//     <div className="lg:col-span-2 space-y-6">
      
//       {/* Stats Cards */}
//       <div className="grid grid-cols-3 gap-4">
//         <StatCard label="Total Members" value="1,240" trend="+12%" />
//         <StatCard label="Active Now" value="85" trend="+5%" />
//         <StatCard label="Posts Today" value="14" trend="-2%" />
//       </div>

//       {/* About */}
//       <Card className="p-6">
//         <h3 className="text-lg font-semibold mb-4">About</h3>
//         <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
//           {COMMUNITY_DATA.description}
//         </p>
//         <div className="mt-6">
//           <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Community Rules</h4>
//           <ul className="space-y-2">
//             {COMMUNITY_DATA.rules.map((rule, i) => (
//               <li key={i} className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
//                 <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mr-3"></div>
//                 {rule}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </Card>

//       {/* Activity Feed */}
//       <div>
//         <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
//         <div className="space-y-4">
//           {ACTIVITY_FEED.map((item) => (
//             <Card key={item.id} className="p-4 flex items-start gap-4">
//               <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
//                 <LayoutGrid size={18} />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm text-zinc-900 dark:text-white">
//                   <span className="font-medium">{item.user}</span> {item.action} <span className="font-medium underline decoration-zinc-300 underline-offset-2">{item.target}</span>
//                 </p>
//                 <p className="text-xs text-zinc-500 mt-1">{item.time}</p>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>

//     {/* Right Column (Sidebar Widgets) */}
//     <div className="space-y-6">
      
//       {/* Upcoming Events */}
//       <Card className="p-0 overflow-hidden">
//         <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
//           <h3 className="font-semibold text-sm">Upcoming Events</h3>
//           <Calendar size={16} className="text-zinc-400" />
//         </div>
//         <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
//           {EVENTS_DATA.map(event => (
//             <div key={event.id} className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
//               <div className="flex justify-between items-start mb-1">
//                 <span className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
//                   {event.type}
//                 </span>
//                 <span className="text-xs text-zinc-400">{event.date}</span>
//               </div>
//               <p className="text-sm font-medium text-zinc-900 dark:text-white">{event.title}</p>
//             </div>
//           ))}
//         </div>
//         <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 text-center">
//           <button className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white">View Calendar</button>
//         </div>
//       </Card>

//       {/* Key Members */}
//       <Card className="p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-semibold text-sm">Admins & Mods</h3>
//           <ShieldCheck size={16} className="text-zinc-400" />
//         </div>
//         <div className="space-y-3">
//           {MEMBERS_DATA.filter(m => m.role !== 'Member').map(member => (
//             <div key={member.id} className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
//                 <div>
//                   <p className="text-sm font-medium text-zinc-900 dark:text-white">{member.name}</p>
//                   <p className="text-xs text-zinc-500">{member.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Card>
//     </div>
//   </div>
// );

// const MembersTab = () => (
//   <Card className="overflow-hidden">
//     <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
//       <div className="relative">
//         <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
//         <input 
//           type="text" 
//           placeholder="Filter members..." 
//           className="pl-8 pr-4 py-1.5 text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400"
//         />
//       </div>
//       <div className="flex gap-2">
//         <button className="px-3 py-1.5 text-xs font-medium border border-zinc-200 dark:border-zinc-800 rounded-md bg-white dark:bg-zinc-900 hover:bg-zinc-50">
//           Export CSV
//         </button>
//       </div>
//     </div>
//     <table className="w-full text-left text-sm">
//       <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-500 font-medium">
//         <tr>
//           <th className="px-6 py-3">User</th>
//           <th className="px-6 py-3">Role</th>
//           <th className="px-6 py-3">Status</th>
//           <th className="px-6 py-3 text-right">Actions</th>
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
//         {MEMBERS_DATA.map((member) => (
//           <tr key={member.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
//             <td className="px-6 py-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
//                 <span className="font-medium text-zinc-900 dark:text-white">{member.name}</span>
//               </div>
//             </td>
//             <td className="px-6 py-4">
//               <Badge variant={member.role === 'Member' ? 'outline' : 'default'}>{member.role}</Badge>
//             </td>
//             <td className="px-6 py-4">
//               <span className={`inline-block w-2 h-2 rounded-full mr-2 ${member.status === 'online' ? 'bg-emerald-500' : 'bg-zinc-300'}`}></span>
//               <span className="text-zinc-500 capitalize">{member.status}</span>
//             </td>
//             <td className="px-6 py-4 text-right">
//               <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
//                 <MoreHorizontal size={16} />
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </Card>
// );

// const EventsTab = () => (
//   <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 border-dashed">
//     <Calendar className="mx-auto text-zinc-300 mb-4" size={48} />
//     <h3 className="text-lg font-medium text-zinc-900 dark:text-white">Events Calendar</h3>
//     <p className="text-zinc-500 max-w-sm mx-auto mt-2">View and manage upcoming community gatherings, workshops, and challenges.</p>
//   </div>
// );

// const StatCard = ({ label, value, trend }) => {
//   const isPositive = trend.startsWith('+');
//   return (
//     <Card className="p-4">
//       <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{label}</p>
//       <div className="mt-2 flex items-baseline justify-between">
//         <p className="text-2xl font-semibold text-zinc-900 dark:text-white">{value}</p>
//         <span className={`text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
//           {trend}
//         </span>
//       </div>
//     </Card>
//   );
// };

// export default CommunityDashboard;


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  Users, 
  Settings, 
  Calendar, 
  Image as ImageIcon, 
  BookOpen, 
  PenTool, 
  Search, 
  Menu,
  X,
  Heart,
  MessageCircle,
  MapPin,
  Send,
  Paperclip,
  Smile,
  MoreVertical
} from 'lucide-react';

// --- MOCK DATA ---
const COMMUNITY_DATA = {
  name: "Nomad Creatives",
  description: "A sanctuary for traveling artists and writers.",
};

const CREATIONS_FEED = [
  { 
    id: 1, 
    type: 'art', 
    author: "Sarah Chen", 
    avatar: "SC", 
    title: "Kyoto Streets at Night", 
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=60",
    likes: 42, 
    comments: 5, 
    time: "2h ago",
    location: "Kyoto"
  },
  { 
    id: 2, 
    type: 'journal', 
    author: "Mike Ross", 
    avatar: "MR", 
    title: "The Solitude of the Alps", 
    excerpt: "The air was thin, and the silence was deafening. I realized then that design is much like climbing—it requires patience...",
    likes: 89, 
    comments: 12, 
    time: "5h ago",
    location: "Alps"
  },
];

// --- MAIN COMPONENT ---

const CommunityDashboard = () => {
  const [activeTab, setActiveTab] = useState('creations'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); 
  
  // Ref for the scrollable area
  const mainScrollRef = useRef(null);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => window.innerWidth >= 768 && setIsMobileMenuOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredContent = activeFilter === 'all' 
    ? CREATIONS_FEED 
    : CREATIONS_FEED.filter(item => item.type === activeFilter);

  return (
    // MAIN CONTAINER: h-screen and overflow-hidden prevents body scroll (x-axis overflow fix)
    <div className="h-screen w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans flex overflow-hidden">
      
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="hidden md:flex flex-col w-64 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
           <div className="w-6 h-6 bg-zinc-900 dark:bg-white rounded flex items-center justify-center text-white dark:text-black text-xs font-bold mr-2">AV</div>
           <span className="font-semibold tracking-tight">ArtVerse</span>
        </div>
        
        <div className="p-4 space-y-6 overflow-y-auto flex-1">
          <SidebarGroup title="Discover">
            <SidebarItem icon={<LayoutGrid size={18} />} label="All Feed" active={activeFilter === 'all' && activeTab === 'creations'} onClick={() => { setActiveTab('creations'); setActiveFilter('all'); }} />
            <SidebarItem icon={<ImageIcon size={18} />} label="Artwork" active={activeFilter === 'art'} onClick={() => { setActiveTab('creations'); setActiveFilter('art'); }} />
            <SidebarItem icon={<BookOpen size={18} />} label="Journals" active={activeFilter === 'journal'} onClick={() => { setActiveTab('creations'); setActiveFilter('journal'); }} />
          </SidebarGroup>

          <SidebarGroup title="Community">
             <SidebarItem icon={<Settings size={18} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
             <SidebarItem icon={<Users size={18} />} label="Members" active={activeTab === 'members'} onClick={() => setActiveTab('members')} />
          </SidebarGroup>
        </div>
      </aside>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm" />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-50 md:hidden flex flex-col p-4">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={20} /></button>
              </div>
              <SidebarItem icon={<LayoutGrid size={18} />} label="Feed" active={activeTab === 'creations'} onClick={() => { setActiveTab('creations'); setIsMobileMenuOpen(false); }} />
              <SidebarItem icon={<Users size={18} />} label="Members" active={activeTab === 'members'} onClick={() => { setActiveTab('members'); setIsMobileMenuOpen(false); }} />
              <SidebarItem icon={<Settings size={18} />} label="Overview" active={activeTab === 'overview'} onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* --- CENTER FEED AREA --- */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        
        {/* HEADER */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md">
              <Menu size={20} />
            </button>
            <h1 className="font-semibold text-lg truncate">{COMMUNITY_DATA.name}</h1>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors"><Search size={20} /></button>
             <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700" />
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div 
          ref={mainScrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 pb-24 scroll-smooth hide-scrollbar" // pb-24 adds space for bottom bar
        >
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Banner (Clean Version) */}
            <div className="relative h-40 md:h-48 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
               <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-black opacity-60" />
               <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=60" alt="Cover" className="w-full h-full object-cover" />
               <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-2xl font-bold">{COMMUNITY_DATA.name}</h2>
                  <p className="text-zinc-300 text-sm">{COMMUNITY_DATA.description}</p>
               </div>
            </div>

            {/* Content Tabs (Mobile Switcher) */}
            <div className="flex gap-2 pb-2 md:hidden overflow-x-auto no-scrollbar">
              <Chip label="All" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
              <Chip label="Art" active={activeFilter === 'art'} onClick={() => setActiveFilter('art')} />
              <Chip label="Journals" active={activeFilter === 'journal'} onClick={() => setActiveFilter('journal')} />
            </div>

            {/* THE FEED */}
            <AnimatePresence mode="wait">
              {activeTab === 'creations' && (
                <motion.div 
                  key="feed"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {filteredContent.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      
                      {/* Header */}
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold border border-zinc-200 dark:border-zinc-700">{item.avatar}</div>
                          <div>
                            <p className="text-sm font-medium">{item.author}</p>
                            {item.location && <p className="text-[10px] text-zinc-500 flex items-center gap-1"><MapPin size={8} /> {item.location}</p>}
                          </div>
                        </div>
                        <button className="text-zinc-400 hover:text-black dark:hover:text-white"><MoreVertical size={16} /></button>
                      </div>

                      {/* Content Body */}
                      {item.type === 'art' ? (
                        <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-900">
                          <img src={item.image} alt="Post" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="px-4 py-2">
                           <h3 className="text-lg font-serif italic mb-2 text-zinc-800 dark:text-zinc-200">{item.title}</h3>
                           <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-800 pl-3">{item.excerpt}</p>
                        </div>
                      )}

                      {/* Footer Actions */}
                      <div className="p-3 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 mt-2">
                        <div className="flex gap-4">
                           <ActionButton icon={<Heart size={18} />} count={item.likes} />
                           <ActionButton icon={<MessageCircle size={18} />} count={item.comments} />
                        </div>
                        <span className="text-xs text-zinc-400">{item.time}</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Spacer for bottom input visibility */}
                  <div className="h-12"></div>
                </motion.div>
              )}
              
              {activeTab === 'members' && <MembersView />}
              {activeTab === 'overview' && <OverviewView />}
            </AnimatePresence>
          </div>
        </div>

        {/* --- BOTTOM "SEND BOX" (The requested feature) --- */}
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 p-3 md:p-4 z-20">
          <div className="max-w-3xl mx-auto flex items-end gap-2 md:gap-4">
            <button className="p-2.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors hidden sm:block">
              <Paperclip size={20} />
            </button>
            
            <div className="flex-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center px-4 py-2 border border-transparent focus-within:border-zinc-300 dark:focus-within:border-zinc-700 transition-colors">
              <input 
                type="text" 
                placeholder="Share your art, journey, or thoughts..." 
                className="bg-transparent w-full text-sm md:text-base outline-none text-zinc-900 dark:text-white placeholder:text-zinc-500 py-1"
              />
              <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 ml-2">
                <Smile size={20} />
              </button>
            </div>

            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:opacity-90 transition-opacity"
            >
              <Send size={18} className="ml-0.5" /> {/* Offset slightly for visual centering */}
            </motion.button>
          </div>
        </div>

      </main>

      {/* --- RIGHT PANEL (Desktop Context) --- */}
      <aside className="hidden lg:block w-72 border-l border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
        <h3 className="font-semibold text-sm mb-4 text-zinc-500 uppercase tracking-wider">Upcoming</h3>
        <div className="space-y-4">
          <EventCard title="Live Sketch Session" time="Today, 4pm" />
          <EventCard title="Journal Club" time="Friday, 6pm" />
        </div>
        
        <div className="mt-8">
           <h3 className="font-semibold text-sm mb-4 text-zinc-500 uppercase tracking-wider">Active Members</h3>
           <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-700 border-2 border-white dark:border-black" />
              ))}
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-black flex items-center justify-center text-xs text-zinc-500">+8</div>
           </div>
        </div>
      </aside>

    </div>
  );
};

// --- SUB COMPONENTS ---

const SidebarGroup = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="px-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">{title}</h3>
    <div className="space-y-1">{children}</div>
  </div>
);

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      active 
        ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' 
        : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-black dark:hover:text-zinc-200'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Chip = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
      active 
       ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-transparent shadow-sm' 
       : 'bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800'
    }`}
  >
    {label}
  </button>
);

const ActionButton = ({ icon, count }) => (
  <button className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors group">
    {React.cloneElement(icon, { size: 18, className: "group-hover:scale-110 transition-transform" })}
    <span className="text-xs font-medium">{count}</span>
  </button>
);

const EventCard = ({ title, time }) => (
  <div className="flex items-start gap-3 p-3 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg">
    <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded text-zinc-500"><Calendar size={16} /></div>
    <div>
      <p className="text-sm font-medium leading-none mb-1">{title}</p>
      <p className="text-xs text-zinc-500">{time}</p>
    </div>
  </div>
);

// Simple Placeholders for other tabs
const MembersView = () => (
  <div className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 text-center text-zinc-500">
    <Users className="mx-auto mb-2 opacity-50" size={32} />
    <p>Member list goes here</p>
  </div>
);

const OverviewView = () => (
  <div className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 text-center text-zinc-500">
    <Settings className="mx-auto mb-2 opacity-50" size={32} />
    <p>Community stats and settings</p>
  </div>
);

export default CommunityDashboard;