import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { databases, ID, account } from '../appwriteConfig';


const communityDatabaseId = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID
const communityCollectionId = import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID
const communityMembersCollectionId = import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID

const CreateCommunityPage = () => {
  const {slug} = useParams()
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    badge: '🎨',
    color: '#6D28D9',
    privacy: 'public',
    allowInvites: true,
    rules: ['Be respectful', 'No spam'],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle rule updates
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

  // Validate current step
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Community name is required';
      else if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
      else if (formData.name.length > 50) newErrors.name = 'Name cannot exceed 50 characters';

      if (!formData.description.trim()) newErrors.description = 'Description is required';
      else if (formData.description.length > 300) newErrors.description = 'Description cannot exceed 300 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle navigation
  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  // getting user Id 
  const getUserId = async () => {
  try {
    const user = await account.get();
    console.log('User ID:', user.$id); // This is the AID
    return user.$id;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};
  // handle the form submiission 

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userId = await getUserId()
    
    try {
      // Prepare community data
      const communityData = {
        name: formData.name,
        description: formData.description,
        badge: formData.badge,
        color: formData.color,
        privacy: formData.privacy,
        allowInvites: formData.allowInvites,
        rules: formData.rules,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        createdAt: new Date().toISOString(),
        memberCount: 1, // Starts with creator as member
        ownerId: userId, // Replace with your auth user ID
      };

      // Save to Appwrite
      const response = await databases.createDocument(
        communityDatabaseId,
        communityCollectionId,
        ID.unique(),
        communityData
      );

      // Optional: Add creator as first member in separate collection
      await databases.createDocument(
        communityDatabaseId,
        communityMembersCollectionId,
        ID.unique(),
        {
          communityId: response.$id,
          userId: userId, // Replace with your auth user ID
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.nav
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="fixed top-4 left-4 right-4 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-lg"
            >
              <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle">
                  ArtVerse
                </Link>
                <div className="hidden md:flex items-center gap-6">
                  {['Home', 'Community', 'Challenges', 'Resources'].map((item) => (
                    <motion.a
                      key={item}
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium relative group font-Playfair"
                    >
                      {item}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                    </motion.a>
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
                  {['Home', 'Community', 'Challenges', 'Resources'].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium py-2 font-Playfair"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.nav>
      
      {/* Background Blobs */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
      />

      <div className="max-w-3xl mx-auto py-32">
        {/* Progress Steps */}
        <div className="mb-10">
          <nav className="flex justify-center items-center gap-4">
            {['Basics', 'Customize', 'Review'].map((label, index) => (
              <motion.div
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <button
                  onClick={() => index + 1 < step && setStep(index + 1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step === index + 1
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                      : step > index + 1
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {index + 1}
                </button>
                <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400 hidden sm:inline">{label}</span>
                {index < 2 && (
                  <div
                    className={`w-12 h-1 mx-2 rounded-full transition-all ${
                      step > index + 1 ? 'bg-gradient-to-r from-purple-600 to-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  ></div>
                )}
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Form Container */}
        <motion.div
          key={step}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-gray-800 dark:text-white mb-4"
                >
                  Community Basics
                </motion.h3>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Community Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Digital Watercolor Masters"
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white outline-none ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    maxLength={50}
                  />
                  <div className="flex justify-between mt-1 text-sm">
                    {errors.name && <p className="text-red-600">{errors.name}</p>}
                    <p className="text-gray-500 dark:text-gray-400 ml-auto">{formData.name.length}/50</p>
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What makes your community unique?"
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white outline-none ${
                      errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    maxLength={300}
                  />
                  <div className="flex justify-between mt-1 text-sm">
                    {errors.description && <p className="text-red-600">{errors.description}</p>}
                    <p className="text-gray-500 dark:text-gray-400 ml-auto">{formData.description.length}/300</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Customization */}
            {step === 2 && (
              <div className="space-y-8">
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-gray-800 dark:text-white mb-4"
                >
                  Customize Your Community
                </motion.h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Community Badge
                  </label>
                  <div className="flex items-center gap-4 flex-wrap">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-3xl"
                    >
                      {formData.badge}
                    </motion.div>
                    <div className="grid grid-cols-6 gap-2">
                      {['🎨', '🖌️', '👩‍🎨', '🖼️', '🌈', '✨'].map((emoji) => (
                        <motion.button
                          key={emoji}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, badge: emoji }))}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                            formData.badge === emoji
                              ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200'
                              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {emoji}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Brand Color
                  </label>
                  <div className="flex items-center gap-3 flex-wrap">
                    {['#6D28D9', '#3B82F6', '#10B981', '#F59E0B', '#EC4899'].map((color) => (
                      <motion.button
                        key={color}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, color }))}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          formData.color === color ? 'border-purple-600 dark:border-purple-400' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Privacy Settings <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-4">
                    {[
                      { value: 'public', label: 'Public', description: 'Anyone can join and see content' },
                      { value: 'private', label: 'Private', description: 'Anyone can see, but must request to join' },
                      { value: 'hidden', label: 'Hidden', description: 'Only invited members can join' },
                    ].map((option) => (
                      <motion.label
                        key={option.value}
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="privacy"
                          value={option.value}
                          checked={formData.privacy === option.value}
                          onChange={() => setFormData((prev) => ({ ...prev, privacy: option.value }))}
                          className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">{option.label}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{option.description}</p>
                        </div>
                      </motion.label>
                    ))}
                  </div>
                </div>
                <motion.label
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="allowInvites"
                    checked={formData.allowInvites}
                    onChange={(e) => setFormData((prev) => ({ ...prev, allowInvites: e.target.checked }))}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Allow members to invite others
                  </span>
                </motion.label>
              </div>
            )}

            {/* Step 3: Rules & Review */}
            {step === 3 && (
              <div className="space-y-6">
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-gray-800 dark:text-white mb-4"
                >
                  Community Rules
                </motion.h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Set guidelines for your community. These will be shown to all members.
                </p>
                <div className="space-y-3">
                  {formData.rules.map((rule, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-1">
                        <input
                          type="text"
                          value={rule}
                          onChange={(e) => handleRuleChange(index, e.target.value)}
                          placeholder="Enter a rule..."
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <motion.button
                        type="button"
                        onClick={() => removeRule(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 text-sm"
                      >
                        Remove
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  type="button"
                  onClick={addRule}
                  whileHover={{ scale: 1.05 }}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 flex items-center"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add another rule
                </motion.button>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                  <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Review Your Community</h4>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                        style={{ backgroundColor: formData.color }}
                      >
                        {formData.badge}
                      </motion.div>
                      <div>
                        <h5 className="font-bold text-lg text-gray-800 dark:text-white">{formData.name}</h5>
                        <p className="text-gray-600 dark:text-gray-300">{formData.description}</p>
                        <div className="mt-2 flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200">
                            {formData.privacy === 'public' ? 'Public' : formData.privacy === 'private' ? 'Private' : 'Hidden'}
                          </span>
                          {formData.allowInvites && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200">
                              Invites allowed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 sm:px-8 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              {step > 1 ? (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  Back
                </motion.button>
              ) : (
                <Link
                  to="/community"
                  className="px-6 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </Link>
              )}
              {step < 3 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition"
                >
                  Continue
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    'Create Community'
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Error Message */}
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg text-red-700 dark:text-red-400 text-center"
          >
            {errors.submit}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CreateCommunityPage;