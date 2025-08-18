import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Users, X, Check } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';



const MemberDiscoveryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('discover');
  const [isLoading, setIsLoading] = useState(true);
const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const mockUsers = [
          {
            id: '1',
            name: 'Alex Johnson',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            skills: ['Design', 'Development'],
            bio: 'Product designer with 5 years of experience',
            joinedCommunities: 4,
          },
          {
            id: '2',
            name: 'Sam Taylor',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            skills: ['Marketing', 'Content'],
            bio: 'Digital marketer and content creator',
            joinedCommunities: 2,
          },
        ];
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchQuery, users]);

  const sendInvitation = (userId) => setInvitedUsers(prev => [...prev, userId]);
  const cancelInvitation = (userId) => setInvitedUsers(prev => prev.filter(id => id !== userId));

  return (
    <div className='max-w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4'>
                 <motion.nav
                   initial={{ y: -50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ duration: 0.6 }}
                   className="fixed top-4 left-4 right-4 z-50 bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-lg shadow-lg"
                 >
                   <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
                     <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle">
                       ArtVerse
                     </Link>
                     <div className="hidden md:flex items-center gap-6">
                       {[
                         {name: 'Home', path: '/'},
                         {name: 'Resources', path:'/resourches'},
                         {name:'Community', path:'/community'},
                         {name:'Challenges', path:'/communnity/Challenges'}
                       ].map((item) => (
                          <motion.div
                          key={item.name}
                          whileHover={{ scale: 1.1 }}
                          className="relative group"
                          >
                          <Link
                          to={item.path}
                          className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium font-Playfair"
                          >
                          {item.name}
                          </Link>
                          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                          </motion.div>
                       ))}
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
                   {/* Mobile Menu */}
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
                     transition={{ duration: 0.3 }}
                     className="md:hidden overflow-hidden bg-white/40 backdrop-blur-md dark:bg-gray-800/40 rounded-b-lg"
                   >
                     <div className="px-4 py-3 space-y-2">
                       {[
                         {name: 'Home', path: '/'},
                         {name: 'Resources', path:'/resourches'},
                         {name:'Community', path:'/community'},
                         {name:'Challenges', path:'/communnity/Challenges'}
                       ].map((item) => (
                         <Link
                         key={item.name}
                         to={item.path}
                         className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium py-2 font-Playfair"
                         >
                         {item.name}
                         </Link>
                       ))}
                     </div>
                   </motion.div>
                 </motion.nav>

    <div className=" w-full max-w-6xl bg-white/90 mt-12 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 relative overflow-hidden">
      <header className="mb-12">
        <h1 className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-1">Find New Members</h1>
        <p className="text-gray-500 dark:text-gray-400">Invite talented people to join your community</p>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 dark:border-gray-700 mb-8">
        <button
          onClick={() => setActiveTab('discover')}
          className={`pb-3 px-4 font-medium text-sm ${
            activeTab === 'discover' 
              ? 'text-black dark:text-white border-b-2 border-black dark:border-white' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Discover
        </button>
        <button
          onClick={() => setActiveTab('invites')}
          className={`pb-3 px-4 font-medium text-sm ${
            activeTab === 'invites' 
              ? 'text-black dark:text-white border-b-2 border-black dark:border-white' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Pending Invites ({invitedUsers.length})
        </button>
      </div>

      {/* Discover Tab */}
      <AnimatePresence>
        {activeTab === 'discover' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400 dark:text-gray-500" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search members..."
                className="pl-10 pr-4 py-2 w-full border-b border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black dark:border-white"></div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No matching members found
              </div>
            ) : (
              <div className="space-y-6">
                {filteredUsers.map(user => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-14 h-14 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">{user.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.bio}</p>
                        </div>
                        {invitedUsers.includes(user.id) ? (
                          <button
                            onClick={() => cancelInvitation(user.id)}
                            className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                          >
                            <Check className="mr-1" size={14} /> Invited
                          </button>
                        ) : (
                          <button
                            onClick={() => sendInvitation(user.id)}
                            className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                          >
                            <UserPlus className="mr-1" size={14} /> Invite
                          </button>
                        )}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {user.skills.map(skill => (
                          <span 
                            key={skill} 
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded text-gray-700 dark:text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invites Tab */}
      <AnimatePresence>
        {activeTab === 'invites' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {invitedUsers.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No pending invitations
              </div>
            ) : (
              users
                .filter(user => invitedUsers.includes(user.id))
                .map(user => (
                  <div 
                    key={user.id} 
                    className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{user.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.bio}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => cancelInvitation(user.id)}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white flex items-center"
                    >
                      <X className="mr-1" size={14} /> Cancel
                    </button>
                  </div>
                ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
};

export default MemberDiscoveryPage;