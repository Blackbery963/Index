import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { databases, Query, account } from '../appwriteConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const CommunityDashboard = () => {
  const { slug } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentUser, setCurrentUser] = useState(null)
//   useEffect(() => {
//     const fetchCommunity = async () => {
//       try {
//         setLoading(true);

//         // Get community by slug
//         const response = await databases.listDocuments(
//           import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
//           import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
//           [Query.equal('slug', slug)]
//         );

//         if (response.documents.length === 0) {
//           throw new Error('Community not found');
//         }

//         const communityData = response.documents[0];
//         setCommunity(communityData);

//         // Get members by community ID
//         const membersResponse = await databases.listDocuments(
//           import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
//           import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID,
//           [Query.equal('communityId', communityData.$id)]
//         );

//         // Fetch usernames from users collection
//         const membersWithUsernames = await Promise.all(
//           membersResponse.documents.map(async (member) => {
//             try {
//              const userDoc = await databases.getDocument(
//                 import.meta.env.VITE_APPWRITE_DATABASE_ID,
//                 import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
//                 member.userId
            
//               ); 
//               return {
//                 ...member,
//                 username: userDoc.username || "Unknown User",
//               };

//             } catch (error) {
//               console.error("Failed to fetch user:", error);
//               return {
//                 ...member,
//                 username: "Unknown User",
//               };
//             }
//           })
//         );

//         setMembers(membersWithUsernames);
//       } catch (error) {
//         console.error("Error fetching community:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCommunity();
//   }, [slug]);


//   // getting the requested user 
//   useEffect(() => {
//   const fetchRequests = async () => {
//     try {
//       const user = await account.get();
//       const ownerId = user.$id;

//       const response = await databases.listDocuments(
//         import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
//         import.meta.env.VITE_APPWRITE_COMMUNITY_REQUEST_COLLECTION_ID,
//         [
//           Query.equal('ownerId', ownerId),
//           Query.equal('status', 'pending')
//         ]
//       );

//       setRequests(response.documents);
//     } catch (error) {
//       console.error("Error fetching join requests:", error);
//     }
//   };

//   fetchRequests();
// }, []);

// // approving the the requested user 
// const handleApprove = async (request) => {
//   try {
//     // Step 1: Add user to members
//     await databases.createDocument(
//       import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
//       import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID,
//       'unique()',
//       {
//         communityId: request.communityId,
//         userId: request.userId,
//         role: 'member', // optional role field
//         joinedAt: new Date().toISOString()
//       }
//     );

//     // Step 2: Update request status
//     await databases.updateDocument(
//       import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
//       import.meta.env.VITE_APPWRITE_COMMUNITY_REQUEST_COLLECTION_ID,
//       request.$id,
//       {
//         status: 'approved'
//       }
//     );

//     toast.success("User added to community!");
//     // Optionally refetch requests
//   } catch (err) {
//     console.error("Approval error:", err);
//     toast.error("Failed to approve request");
//   }
// };


// // rejecting the the requested user 
// const handleReject = async (request) => {
//   try {
//     await databases.updateDocument(
//       import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
//       import.meta.env.VITE_APPWRITE_COMMUNITY_REQUEST_COLLECTION_ID,
//       request.$id,
//       { status: 'rejected' }
//     );
//     toast("Request rejected");
//   } catch (err) {
//     console.error("Rejection error:", err);
//   }
// };

useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // Fetch community data
  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        setLoading(true);
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
          [Query.equal('slug', slug)]
        );

        if (response.documents.length === 0) {
          throw new Error('Community not found');
        }

        const communityData = response.documents[0];
        setCommunity(communityData);

        // Fetch members
        const membersResponse = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID,
          [Query.equal('communityId', communityData.$id)]
        );

        // Fetch usernames
        const membersWithUsernames = await Promise.all(
          membersResponse.documents.map(async (member) => {
            try {
              const userDoc = await databases.getDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
                member.userId
              );
              return {
                ...member,
                username: userDoc.username || "Unknown User",
                avatar: userDoc.avatar || null,
              };
            } catch (error) {
              console.error("Failed to fetch user:", error);
              return {
                ...member,
                username: "Unknown User",
                avatar: null,
              };
            }
          })
        );

        setMembers(membersWithUsernames);
      } catch (error) {
        console.error("Error fetching community:", error.message);
        toast.error("Failed to load community data");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [slug]);

  // Fetch pending requests
  useEffect(() => {
    const fetchRequests = async () => {
      if (!community) return;
      
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COMMUNITY_REQUEST_COLLECTION_ID,
          [
            Query.equal('communityId', community.$id),
            Query.equal('status', 'pending')
          ]
        );

        // Fetch usernames for requests
        const requestsWithUsernames = await Promise.all(
          response.documents.map(async (request) => {
            try {
              const userDoc = await databases.getDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
                request.userId
              );
              return {
                ...request,
                username: userDoc.username || "Unknown User",
                avatar: userDoc.avatar || null,
              };
            } catch (error) {
              console.error("Failed to fetch request user:", error);
              return {
                ...request,
                username: "Unknown User",
                avatar: null,
              };
            }
          })
        );

        setRequests(requestsWithUsernames);
      } catch (error) {
        console.error("Error fetching join requests:", error);
        toast.error("Failed to load join requests");
      }
    };

    fetchRequests();
  }, [community]);

  // // Approve join request
  // const handleApprove = async (request) => {
  //   try {
  //     // 1. Add user to members collection
  //     const newMember = await databases.createDocument(
  //       import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
  //       import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID,
  //       'unique()',
  //       {
  //         communityId: request.communityId,
  //         userId: request.userId,
  //         role: 'member',
  //         joinedAt: new Date().toISOString()
  //       }
  //     );

  //     // 2. Update request status to approved
  //     await databases.updateDocument(
  //       import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
  //       import.meta.env.VITE_APPWRITE_COMMUNITY_REQUEST_COLLECTION_ID,
  //       request.$id,
  //       { status: 'approved' }
  //     );

  //     // 3. Update local state
  //     setRequests(requests.filter(req => req.$id !== request.$id));
      
  //     // Add the new member to members list with username
  //     setMembers([...members, {
  //       ...newMember,
  //       username: request.username,
  //       avatar: request.avatar
  //     }]);

  //     toast.success(`${request.username} has been added to the community!`);
  //   } catch (error) {
  //     console.error("Approval error:", error);
  //     toast.error("Failed to approve request");
  //   }
  // };


  const handleApprove = async (request) => {
  try {
    // 1. Add user to members collection
    const newMember = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID,
      'unique()',
      {
        communityId: request.communityId,
        userId: request.userId,
        role: 'member',
        joinedAt: new Date().toISOString()
      }
    );

    // 2. Update community member count
    await databases.updateDocument(
      import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
      community.$id,
      {
        memberCount: community.memberCount + 1
      }
    );

    // 3. Update request status to approved
    await databases.updateDocument(
      import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COMMUNITY_REQUEST_COLLECTION_ID,
      request.$id,
      { status: 'approved' }
    );

    // 4. Update local state
    setRequests(requests.filter(req => req.$id !== request.$id));
    setMembers([...members, {
      ...newMember,
      username: request.username,
      avatar: request.avatar
    }]);
    setCommunity({
      ...community,
      memberCount: community.memberCount + 1
    });

    toast.success(`${request.username} has been added to the community!`);
  } catch (error) {
    console.error("Approval error:", error);
    toast.error("Failed to approve request");
  }
};


  // Reject join request
  const handleReject = async (request) => {
    try {
      // Update request status to rejected
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COMMUNITY_REQUEST_COLLECTION_ID,
        request.$id,
        { status: 'rejected' }
      );

      // Update local state
      setRequests(requests.filter(req => req.$id !== request.$id));
      toast.info(`Request from ${request.username} has been rejected`);
    } catch (error) {
      console.error("Rejection error:", error);
      toast.error("Failed to reject request");
    }
  };


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading community...</p>
        </div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Community Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">The community you're looking for doesn't exist or may have been removed.</p>
          <Link 
            to="/" 
            className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 font-Playfair">
      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-4 w-[95%] mx-auto rounded-lg left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle"
              >
                ArtVerse
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {['Home', 'Explore', 'Challenges', 'Resources'].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Link
                      to="#"
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition"
                    >
                      {item}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-purple-500/20 transition"
                >
                  Create
                </motion.button>
              </div>
            </div>

            <button
              className="md:hidden text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-2">
                {['Home', 'Explore', 'Challenges', 'Resources'].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to="#"
                      className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg shadow-lg"
                >
                  Create
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Community Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 text-white"
        style={{ backgroundColor: community.color }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-8"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl md:text-6xl shadow-lg font-Quicksand">
              {community.badge}
            </div>
            <div className="text-center md:text-left">
              <motion.h1 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg font-Quicksand"
              >
                {community.name}
              </motion.h1>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl opacity-90 drop-shadow-md font-Playfair"
              >
                {community.memberCount} members • {community.privacy === 'public' ? 'Public' : 'Private'} community
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Floating Tab Navigation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="sticky top-16 md:top-20 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8 overflow-hidden"
        >
          <nav className="flex overflow-x-auto">
            {['overview', 'members', 'challenges', 'resources', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap relative ${
                  activeTab === tab
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              {activeTab === 'overview' && (
                <>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-6 sm:p-8">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About</h2>
                      <motion.p 
                        variants={itemVariants}
                        className="text-gray-600 dark:text-gray-300"
                      >
                        {community.description}
                      </motion.p>
                      
                      {/* Rules Section */}
                      <motion.div
                        variants={itemVariants}
                        className="mt-6"
                      >
                        <h3 className="font-medium text-gray-800 dark:text-white mb-3">Community Rules</h3>
                        <ul className="space-y-2">
                          {community.rules.map((rule, index) => (
                            <motion.li 
                              key={index}
                              variants={itemVariants}
                              className="flex items-start"
                            >
                              <span className="text-purple-500 mr-2">•</span>
                              <span className="text-gray-600 dark:text-gray-300">{rule}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Activity</h2>
                        <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                          View All
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                          <motion.div
                            key={item}
                            variants={itemVariants}
                            className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition"
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                              {item % 2 === 0 ? '🎨' : '💬'}
                            </div>
                            <div>
                              <p className="text-gray-800 dark:text-gray-200">
                                <span className="font-medium">User{item}</span> {item % 2 === 0 ? 'submitted to' : 'commented on'} <span className="text-purple-600 dark:text-purple-400">Challenge #{item}</span>
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {item} hour{item !== 1 ? 's' : ''} ago
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}

              {/* Members Tab */}
              {/* {activeTab === 'members' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">Community Members</h2>
                      <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                        Invite Members
                      </button>
                    </div>
                    
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Member</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {members.map((member) => (
                            <motion.tr
                              key={member.$id}
                              variants={itemVariants}
                              whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                              className="transition"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    👤
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {member.username}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  member.role === 'owner' 
                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                }`}>
                                  {member.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {new Date(member.joinedAt).toLocaleDateString()}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                  {requests.map((req) => (
                  <div key={req.$id} className="border p-4 rounded mb-2">
                  <p>User ID: {req.userId}</p>
                  <p>Community: {req.communityName}</p>
                  <button onClick={() => handleApprove(req)} className="text-green-600 mr-4">Approve</button>
                  <button onClick={() => handleReject(req)} className="text-red-600">Reject</button>
                  </div>
                ))}

              </div>
                </motion.div>
              )} */}

              {activeTab === 'members' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Members Table */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Community Members ({members.length})
              </h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Member</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {members.map((member) => (
                      <tr key={member.$id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                              {member.avatar ? (
                                <img src={member.avatar} alt={member.username} className="h-full w-full object-cover" />
                              ) : (
                                <span className="text-lg">👤</span>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {member.username}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {member.userId === currentUser?.$id ? '(You)' : ''}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            member.role === 'admin' || member.role === 'owner'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(member.joinedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pending Requests Section */}
            {requests.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  Pending Join Requests ({requests.length})
                </h3>
                
                <div className="space-y-4">
                  {requests.map((request) => (
                    <motion.div
                      key={request.$id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                          {request.avatar ? (
                            <img src={request.avatar} alt={request.username} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-xl">👤</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white">
                            {request.username}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Requested {new Date(request.$createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: "0 0 0 2px rgba(74, 222, 128, 0.5)" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleApprove(request)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center space-x-1 transition"
                        >
                          <span>Approve</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: "0 0 0 2px rgba(248, 113, 113, 0.5)" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleReject(request)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center space-x-1 transition"
                        >
                          <span>Reject</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
              {/* Add other tabs content here */}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Community Stats */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Community Stats</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      variants={itemVariants}
                      className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <p className="text-sm text-gray-500 dark:text-gray-400">Members</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">{community.memberCount}</p>
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                      className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">87</p>
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                      className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <p className="text-sm text-gray-500 dark:text-gray-400">Challenges</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">24</p>
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                      className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <p className="text-sm text-gray-500 dark:text-gray-400">Resources</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">15</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Quick Actions</h2>
                  <div className="space-y-3">
                    <motion.button
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition"
                    >
                      <span className="text-gray-800 dark:text-white">Start Live Session</span>
                      <span className="text-purple-600 dark:text-purple-400 text-xl">🎥</span>
                    </motion.button>
                    <motion.button
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition"
                    >
                      <span className="text-gray-800 dark:text-white">Create Challenge</span>
                      <span className="text-purple-600 dark:text-purple-400 text-xl">🎨</span>
                    </motion.button>
                    <motion.button
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition"
                    >
                      <span className="text-gray-800 dark:text-white">Upload Resource</span>
                      <span className="text-purple-600 dark:text-purple-400 text-xl">📁</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Upcoming Events</h2>
                    <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <motion.div
                      variants={itemVariants}
                      className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 text-xl">
                        🎨
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">Live Portrait Workshop</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Nov 18, 4PM UTC</p>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                      className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl">
                        💬
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">AI Art Discussion</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Nov 20, 6PM UTC</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition"
                  >
                    View Calendar
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Resource Modal */}
        <AnimatePresence>
          {showResourceModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">Add New Resource</h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setShowResourceModal(false)}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ✕
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Resource Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Procreate Brush Pack"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Resource Type
                    </label>
                    <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                      <option>Brushes</option>
                      <option>Template</option>
                      <option>3D Model</option>
                      <option>Tutorial</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Upload File
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg"
                    >
                      <div className="space-y-1 text-center">
                        <div className="text-2xl text-gray-500 dark:text-gray-400 mb-2">
                          📁
                        </div>
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300">
                            <span>Upload a file</span>
                            <input type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, PSD up to 10MB
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowResourceModal(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition"
                    >
                      Upload Resource
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
export default CommunityDashboard;