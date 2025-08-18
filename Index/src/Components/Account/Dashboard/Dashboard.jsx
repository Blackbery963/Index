
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import { Client, Databases, Account, Query } from 'appwrite';
import { 
  FaBars, FaMoon, FaSun, FaSignOutAlt, FaPalette, 
  FaHome, FaUser, FaEye, FaDollarSign, FaUsers, FaEnvelope 
} from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdClose } from 'react-icons/md';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

// Reusable KPI Card Component
const KPICard = ({ title, value, change, icon, darkMode }) => (
  <div className={`p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-pink-50'}`}>
    <div className="flex justify-between items-start">
      <div>
        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h3>
        <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-pink-100'}`}>
        {icon}
      </div>
    </div>
    <p className={`text-xs mt-3 ${
      change.startsWith('+') ? 'text-green-500' : change.startsWith('-') ? 'text-red-500' : 'text-gray-500'
    }`}>
      {change}
    </p>
  </div>
);

function Dashboard() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [dateRange, setDateRange] = useState('month');
  
  // Data states
  const [engagementData, setEngagementData] = useState({
    labels: [],
    views: [],
    followers: [],
    inquiries: []
  });
  const [salesByType, setSalesByType] = useState({
    labels: [],
    data: []
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [topArtworks, setTopArtworks] = useState([]);

  // Chart refs
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  // Calculate KPIs
  const kpis = useMemo(() => ({
    views: engagementData.views?.reduce((sum, val) => sum + val, 0) || 0,
    sales: salesByType.data?.reduce((sum, val) => sum + val, 0) || 0,
    followers: engagementData.followers?.[engagementData.followers.length - 1] || 0,
    inquiries: engagementData.inquiries?.reduce((sum, val) => sum + val, 0) || 0,
    viewsChange: calculateChange(engagementData.views),
    salesChange: calculateChange(salesByType.data),
    followersChange: calculateChange(engagementData.followers),
    inquiriesChange: calculateChange(engagementData.inquiries)
  }), [engagementData, salesByType]);

  // Helper function to calculate percentage change
  function calculateChange(data) {
    if (!data || data.length < 2) return '+0%';
    const current = data[data.length - 1];
    const previous = data[data.length - 2];
    const change = ((current - previous) / previous) * 100;
    return `${change >= 0 ? '+' : ''}${Math.round(change)}%`;
  }

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await account.get();
        const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        const savedProfileImage = localStorage.getItem('profileImage');
        setProfile({
          username: savedProfile.username || user.name || 'Artist',
          email: user.email,
        });
        setProfileImage(savedProfileImage || null);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setProfile({ username: 'Artist', email: '' });
      }
    };
    fetchUserProfile();
  }, []);

  // Fetch all dashboard data
  const fetchData = async () => {
    setLoading(true);
    try {
      const now = new Date();
      let startDate;

      switch(dateRange) {
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7)).toISOString();
          break;
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
          break;
        case 'quarter':
          startDate = new Date(now.setMonth(now.getMonth() - 3)).toISOString();
          break;
        case 'year':
          startDate = new Date(now.setFullYear(now.getFullYear() - 1)).toISOString();
          break;
        default:
          startDate = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
      }

      const engagementResponse = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'engagementMetrics',
        [
          Query.greaterThan('date', startDate),
          Query.orderAsc('date')
        ]
      );
      
      const engagementLabels = engagementResponse.documents.map(doc => 
        new Date(doc.date).toLocaleDateString('default', { month: 'short', day: 'numeric' })
      );
      
      setEngagementData({ 
        labels: engagementLabels,
        views: engagementResponse.documents.map(doc => doc.views || 0),
        followers: engagementResponse.documents.map(doc => doc.followers || 0),
        inquiries: engagementResponse.documents.map(doc => doc.inquiries || 0)
      });

      const salesResponse = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'sales',
        [
          Query.greaterThan('date', startDate),
          Query.orderDesc('date')
        ]
      );
      
      const salesByType = salesResponse.documents.reduce((acc, doc) => {
        acc[doc.type] = (acc[doc.type] || 0) + doc.amount;
        return acc;
      }, {});
      
      setSalesByType({
        labels: Object.keys(salesByType),
        data: Object.values(salesByType)
      });

      const activityResponse = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'activity',
        [
          Query.orderDesc('date'),
          Query.limit(5)
        ]
      );
      
      setRecentActivity(activityResponse.documents.map(doc => ({
        id: doc.$id,
        customer: doc.customer,
        artwork: doc.artwork,
        type: doc.type,
        amount: doc.amount,
        date: new Date(doc.date).toLocaleDateString()
      })));

      const artworksResponse = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'artworks',
        [
          Query.orderDesc('views'),
          Query.limit(5)
        ]
      );
      
      setTopArtworks(artworksResponse.documents.map(doc => ({
        id: doc.$id,
        title: doc.title,
        views: doc.views,
        imageUrl: doc.imageUrl
      })));

      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Initialize data fetch and subscriptions
  useEffect(() => {
    fetchData();

    const engagementUnsubscribe = client.subscribe(
      `databases.${import.meta.env.VITE_APPWRITE_DATABASE_ID}.collections.engagementMetrics.documents`,
      response => {
        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
          fetchData();
        }
      }
    );

    const salesUnsubscribe = client.subscribe(
      `databases.${import.meta.env.VITE_APPWRITE_DATABASE_ID}.collections.sales.documents`,
      response => {
        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
          fetchData();
        }
      }
    );

    return () => {
      engagementUnsubscribe();
      salesUnsubscribe();
    };
  }, [dateRange]);

  // Initialize Line Chart with uPlot
  useEffect(() => {
    if (lineChartRef.current && engagementData.labels.length > 0) {
      const data = [
        engagementData.labels.map((_, i) => i), // X-axis as index
        engagementData.views,
        engagementData.followers
      ];

      const opts = {
        width: lineChartRef.current.offsetWidth,
        height: 300,
        series: [
          {},
          {
            label: 'Views',
            stroke: isDarkMode ? '#F472B6' : '#DB2777',
            fill: isDarkMode ? 'rgba(244, 114, 182, 0.2)' : 'rgba(219, 39, 119, 0.2)',
          },
          {
            label: 'Followers',
            stroke: isDarkMode ? '#93C5FD' : '#3B82F6',
            fill: isDarkMode ? 'rgba(147, 197, 253, 0.2)' : 'rgba(59, 130, 246, 0.2)',
            scale: '%',
          },
        ],
        scales: {
          x: { time: false },
          y: { },
          '%': { },
        },
        legend: { show: true },
        cursor: { show: true },
      };

      const chart = new uPlot(opts, data, lineChartRef.current);
      return () => chart.destroy();
    }
  }, [isDarkMode, engagementData]);

  // Initialize Pie Chart with uPlot
  useEffect(() => {
    if (pieChartRef.current && salesByType.labels.length > 0) {
      const data = [salesByType.data.map((_, i) => i), salesByType.data];
      const opts = {
        width: pieChartRef.current.offsetWidth,
        height: 300,
        series: [
          {},
          {
            label: salesByType.labels,
            fill: true,
            stroke: isDarkMode ? '#374151' : '#F3F4F6',
            points: { show: false },
            paths: uPlot.paths.pie({}),
            values: (self, rawIdxs) => rawIdxs.map(i => data[1][i]),
          },
        ],
        legend: { show: true },
      };

      const chart = new uPlot(opts, data, pieChartRef.current);
      return () => chart.destroy();
    }
  }, [isDarkMode, salesByType]);

  // Handle logout
  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        await account.deleteSession('current');
        localStorage.clear();
        navigate('/login');
        toast.success('Logged out successfully');
      } catch (error) {
        toast.error('Logout failed');
        console.error('Logout error:', error);
      }
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-gray-900' : 'bg-pink-50'} min-h-screen transition-colors duration-300 font-inter`}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 font-Eagle">Painters' Diary</h2>
          <button
            className="md:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            <MdClose size={20} />
          </button>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700 font-serif"
          >
            <FaHome className="mr-2" /> Home
          </button>
          <button
            onClick={() => navigate('/artworks')}
            className="flex items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700 font-serif"
          >
            <FaPalette className="mr-2" /> Artworks
          </button>
          <button
            onClick={() => navigate('/account')}
            className="flex items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700 font-serif"
          >
            <FaUser className="mr-2" /> Account
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700 font-serif"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 p-4 md:p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 md:mb-8">
          <div className="flex items-center">
            <button
              className="md:hidden text-gray-600 dark:text-gray-300 mr-4"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FiMenu size={20} />
            </button>
            <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white font-playfair">Artist Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-1 md:space-x-2">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className={`bg-transparent border rounded-lg px-2 py-1 text-xs md:px-3 md:py-1 md:text-sm ${
                  isDarkMode ? 'border-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 3 Months</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-pink-100 dark:bg-gray-700 text-pink-600 dark:text-pink-400"
            >
              {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <FaUser className="text-xl md:text-2xl text-gray-400" />
                )}
              </div>
              <span className="hidden md:inline text-gray-800 dark:text-white">
                {profile.username || 'Artist'}
              </span>
            </div>
          </div>
        </header>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {/* KPI Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`p-4 md:p-5 rounded-xl shadow-sm animate-pulse ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className={`h-3 md:h-4 rounded w-1/2 mb-3 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}></div>
                <div className={`h-6 md:h-8 rounded w-3/4 mb-2 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}></div>
                <div className={`h-2 md:h-3 rounded w-1/3 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <KPICard 
              title="Artwork Views" 
              value={kpis.views.toLocaleString()} 
              change={kpis.viewsChange} 
              icon={<FaEye className="text-pink-500" size={18} />}
              darkMode={isDarkMode}
            />
            <KPICard 
              title="Total Sales" 
              value={`$${kpis.sales.toLocaleString()}`} 
              change={kpis.salesChange} 
              icon={<FaDollarSign className="text-green-500" size={18} />}
              darkMode={isDarkMode}
            />
            <KPICard 
              title="Followers" 
              value={kpis.followers.toLocaleString()} 
              change={kpis.followersChange} 
              icon={<FaUsers className="text-blue-500" size={18} />}
              darkMode={isDarkMode}
            />
            <KPICard 
              title="Inquiries" 
              value={kpis.inquiries.toLocaleString()} 
              change={kpis.inquiriesChange} 
              icon={<FaEnvelope className="text-yellow-500" size={18} />}
              darkMode={isDarkMode}
            />
          </div>
        )}

        {/* Chart and Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Line Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-playfair">Engagement Trends</h3>
              <div className="flex space-x-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-pink-500 mr-1"></div>
                  <span className="text-xs">Views</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span className="text-xs">Followers</span>
                </div>
              </div>
            </div>
            {loading ? (
              <div className={`h-64 rounded animate-pulse ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}></div>
            ) : (
              <div ref={lineChartRef} style={{ height: '300px' }}></div>
            )}
          </div>

          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 font-playfair">Sales Distribution</h3>
            {loading ? (
              <div className={`h-64 rounded animate-pulse ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}></div>
            ) : (
              <div ref={pieChartRef} style={{ height: '300px' }}></div>
            )}
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-playfair">Recent Activity</h3>
              <button 
                onClick={() => navigate('/activity')}
                className="text-sm text-pink-600 dark:text-pink-400 hover:underline"
              >
                View All
              </button>
            </div>
            {loading ? (
              <div className={`h-64 rounded animate-pulse ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`text-xs uppercase ${
                    isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-pink-50 text-gray-700'
                  }`}>
                    <tr>
                      <th className="px-3 py-2 md:px-4 md:py-3 text-left">Date</th>
                      <th className="px-3 py-2 md:px-4 md:py-3 text-left">Customer</th>
                      <th className="px-3 py-2 md:px-4 md:py-3 text-left">Artwork</th>
                      <th className="px-3 py-2 md:px-4 md:py-3 text-left">Type</th>
                      <th className="px-3 py-2 md:px-4 md:py-3 text-right">Amount</th>
                      <th className="px-3 py-2 md:px-4 md:py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((activity) => (
                      <tr key={activity.id} className={`border-b ${
                        isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'hover:bg-pink-50'
                      }`}>
                        <td className="px-3 py-2 md:px-4 md:py-3 text-sm">{activity.date}</td>
                        <td className="px-3 py-2 md:px-4 md:py-3 font-medium text-sm">{activity.customer}</td>
                        <td className="px-3 py-2 md:px-4 md:py-3 text-sm">{activity.artwork}</td>
                        <td className="px-3 py-2 md:px-4 md:py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            activity.type === 'Sale' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {activity.type}
                          </span>
                        </td>
                        <td className="px-3 py-2 md:px-4 md:py-3 text-right text-sm">
                          {activity.amount > 0 ? `$${activity.amount.toFixed(2)}` : '-'}
                        </td>
                        <td className="px-3 py-2 md:px-4 md:py-3 text-center">
                          <button 
                            onClick={() => navigate(`/activity/${activity.id}`)}
                            className="text-pink-600 dark:text-pink-400 hover:underline text-xs md:text-sm"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Top Artworks Section */}
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm mt-4 md:mt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 font-playfair">Top Performing Artworks</h3>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`rounded-lg animate-pulse ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`} style={{ height: '180px' }}></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {topArtworks.map(artwork => (
                <div key={artwork.id} className="group relative">
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title} 
                    className="w-full h-32 md:h-40 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => navigate(`/artworks/${artwork.id}`)}
                      className="bg-pink-600 text-white px-3 py-1 rounded text-sm"
                    >
                      View Details
                    </button>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium truncate dark:text-white">{artwork.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{artwork.views.toLocaleString()} views</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;