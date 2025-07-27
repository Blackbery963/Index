import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ID, Permission, Role} from 'appwrite';
import { storage, databases,account  } from '../../appwriteConfig'; // Your configured Appwrite client
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';



const thumbnailDb = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID
const researchCollection = import.meta.env.VITE_APPWRITE_RESEARCH_COLLECTION_ID
const researchBucket = import.meta.env.VITE_APPWRITE_RESEARCH_BUCKET_ID


function ResourceUpload() {
  const navigate = useNavigate();
  const thumbnailInputRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDraggingThumbnail, setIsDraggingThumbnail] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'articles',
    type: '',
    description: '',
    author: '',
    thumbnail: null
  });

  // Categories for dropdown
  const categories = [
    { value: 'articles', label: 'Articles' },
    { value: 'guides', label: 'Guides & Tutorials' },
    { value: 'templates', label: 'Templates' },
    { value: 'research', label: 'Research Papers' },
    { value: 'tools', label: 'Tools & Resources' }
  ];

  // File types for dropdown
  const fileTypes = [
    { value: 'PDF', label: 'PDF Document' },
    { value: 'Article', label: 'Web Article' },
    { value: 'PSD', label: 'Photoshop File' },
    { value: 'Video', label: 'Video Tutorial' },
    { value: 'ABR', label: 'Photoshop Brushes' },
    { value: 'AI', label: 'Illustrator File' },
    { value: 'ZIP', label: 'Archive (ZIP)' }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle thumbnail selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag-and-drop for thumbnail
  const handleThumbnailDrop = (e) => {
    e.preventDefault();
    setIsDraggingThumbnail(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsUploading(true);
  setUploadProgress(0);

  try {
    // Get current user ID (required for permissions)
    const user = await account.get(); // Make sure you have imported 'account' from Appwrite
    const userId = user.$id;

    // 1. Upload thumbnail to Storage
    const thumbnailId = ID.unique();
    await storage.createFile(
      researchBucket, // Bucket ID
      thumbnailId,    // File ID
      formData.thumbnail, // File object
      [ // ✅ FLAT ARRAY of permissions
        Permission.read(Role.any()), // Public read
        Permission.write(Role.user(userId)), // Only owner can modify
        Permission.delete(Role.user(userId)) // Only owner can delete
      ],
      {
        onProgress: (progress) => {
          setUploadProgress(Math.round((progress.loaded / progress.total) * 50));
        }
      }
    );

    // 2. Create document in Database
    await databases.createDocument(
      thumbnailDb, // Database ID
      researchCollection, // Collection ID
      ID.unique(), // Document ID
      {
        title: formData.title,
        category: formData.category,
        type: formData.type,
        description: formData.description,
        author: formData.author,
        thumbnailId: thumbnailId,
        size: formatFileSize(formData.thumbnail.size),
        downloads: 0,
        date: new Date().toISOString()
      },
      [ // ✅ FLAT ARRAY of permissions
        Permission.read(Role.any()), // Public read
        Permission.write(Role.user(userId)), // Only owner can modify
        Permission.delete(Role.user(userId)) // Only owner can delete
      ]
    );

    setUploadProgress(100);
    setTimeout(() => navigate('/Community/Resources/ResourceHub'), 1000);

  } catch (error) {
    console.error('Upload failed:', error);
    toast.error(`Upload failed: ${error.message}`);
    toast.success("Your Document Uploaded Successfully..")
    setIsUploading(false);
  }
 };



  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

   const editorRef = useRef(null);

  // Handle editor change
  const handleEditorChange = (content, editor) => {
    // const plainText = content.replace(/<[^>]+>/g, '');
    setFormData(prev => ({
      ...prev,
      description: content
    }));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 pb-24">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-4 right-4 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl"
      >
        <div className="px-6 py-4 sm:px-8 flex justify-between items-center">
          <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle">
            ArtVerse
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {[
              {name: 'Home', path: '/'},
              {name: 'Challenges', path: '/challenges'},
              {name: 'Resources', path: '/resources'},
              {name: 'Community', path: '/community'}
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Link
                  to={item.path}
                  className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-semibold font-Playfair transition-colors duration-300"
                >
                  {item.name}
                </Link>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.div>
            ))}
          </div>
          
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
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
        
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-b-2xl"
        >
          <div className="px-6 py-4 space-y-3">
            {[
              {name: 'Home', path: '/'},
              {name: 'Challenges', path: '/challenges'},
              {name: 'Resources', path: '/resources'},
              {name: 'Community', path: '/community'}
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-semibold py-2 font-Playfair transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 mb-6 font-Quicksand">
            Share Your Resource
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-Playfair">
            Contribute to the ArtVerse community by uploading your tutorials, templates, research, or tools to inspire others.
          </p>
        </motion.div>

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto"
        >
          {isUploading ? (
            <div className="text-center py-12">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 mb-8 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-purple-600 to-blue-500 h-6 rounded-full transition-all duration-500 ease-out" 
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                ></motion.div>
              </div>
              <p className="text-xl text-gray-800 dark:text-gray-200 mb-4 font-Playfair">
                {uploadProgress < 100 ? 'Uploading your resource...' : 'Upload complete!'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-Playfair">
                {uploadProgress < 75 ? 'Uploading thumbnail...' : 
                 uploadProgress < 100 ? 'Saving to database...' : 'Redirecting to Resources Hub...'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 font-Playfair">
                  Resource Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200 font-Playfair"
                  placeholder="e.g., Ultimate Guide to Digital Illustration"
                />
              </div>

              {/* Category and Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 font-Playfair">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200 font-Playfair"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 font-Playfair">
                    File Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200 font-Playfair"
                  >
                    <option value="">Select a file type</option>
                    {fileTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
        
              <div dir="ltr">
      <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 font-Playfair">
        Description *
      </label>
          <Editor
        apiKey="5yz8buzpx45uwnxt8hebrnh0do7aheulmp7l0vw5ea3w3oa9"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={formData.description}
        onEditorChange={handleEditorChange}
        init={{
          height: 400,
          menubar: false,
          directionality: 'ltr',
          plugins: [
            'advlist autolink lists link image charmap preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect fontselect fontsizeselect | ' +
            'bold italic underline strikethrough forecolor backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | ' +
            'link image table code fullscreen | removeformat help',
          font_formats:
            'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Times New Roman=times new roman,times;',
          fontsize_formats: '12px 14px 16px 18px 24px 36px',
          content_style:
            'body { font-family: "Playfair Display", serif; font-size:14px; direction: ltr !important; text-align: left !important; }',
          skin: 'oxide-dark', // dark mode
          content_css: 'dark',
        }}
      />
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-Playfair">
        Provide a detailed description to help others understand your resource.
      </p>
      </div>



              {/* Author */}
              <div>
                <label htmlFor="author" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 font-Playfair">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200 font-Playfair"
                  placeholder="e.g., Alex Rivera"
                />
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 font-Playfair">
                  Thumbnail Image *
                </label>
                <div
                  className={`relative w-full h-64 rounded-xl bg-gray-100 dark:bg-gray-900/50 border-2 border-dashed ${
                    isDraggingThumbnail ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30' : 'border-gray-300 dark:border-gray-700'
                  } flex items-center justify-center transition-all duration-300`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingThumbnail(true);
                  }}
                  onDragLeave={() => setIsDraggingThumbnail(false)}
                  onDrop={handleThumbnailDrop}
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Thumbnail Preview" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <div className="text-center">
                      <svg className="mx-auto w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-Playfair">
                        {isDraggingThumbnail ? 'Drop your thumbnail here' : 'Drag or click to upload thumbnail'}
                      </p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => thumbnailInputRef.current.click()}
                    className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-semibold font-Playfair hover:from-purple-700 hover:to-blue-600 transition-all"
                  >
                    {previewImage ? 'Change' : 'Upload'}
                  </button>
                </div>
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  required
                  className="hidden"
                />
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-Playfair">
                  Recommended size: 800x600px (JPEG or PNG, max 5MB)
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-xl font-semibold font-Playfair transition-all shadow-lg"
                >
                  Share Resource
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default ResourceUpload;