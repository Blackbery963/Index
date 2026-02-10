import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MapPin, Globe, Briefcase, Palette, 
  ChevronLeft, Save, Search, X, Hash, 
  Facebook, Instagram, Twitter, Linkedin,
  LayoutGrid, BookOpen,
  Link2,
  UserCheck
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
              <UserCheck size={18} />
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
              {saving ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <UserCheck size={18} />}
              Save Profile
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}