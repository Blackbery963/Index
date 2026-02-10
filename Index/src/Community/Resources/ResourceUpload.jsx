// // import React, { useState, useRef } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { ID, Permission, Role } from 'appwrite';
// // import { storage, databases, account } from '../../appwriteConfig';
// // import { toast } from 'react-toastify';
// // import RichTextEditor from './RichTextEditor';
// // import FileUploadArea from './FileUploadArea';
// // import ProgressIndicator from './ProgressIndicator';

// // const thumbnailDb = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID
// // const researchCollection = import.meta.env.VITE_APPWRITE_RESEARCH_COLLECTION_ID
// // const researchBucket = import.meta.env.VITE_APPWRITE_RESEARCH_BUCKET_ID

// // const ResourceUpload = () => {
// //   const navigate = useNavigate();
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [uploadProgress, setUploadProgress] = useState(0);
// //   const [activeStep, setActiveStep] = useState(1); // For multi-step form

// //   // Form state
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     category: 'articles',
// //     type: '',
// //     description: '',
// //     author: '',
// //     thumbnail: null,
// //     file: null
// //   });

// //   const [content, setContent] = useState('');

// //   // Categories and file types
// //   const categories = [
// //     { value: 'articles', label: 'Articles', icon: '📝' },
// //     { value: 'guides', label: 'Guides', icon: '📚' },
// //     { value: 'research', label: 'Research', icon: '🔬' },
// //   ];

// //   const fileTypes = [
// //     { value: 'PDF', label: 'PDF Document' },
// //     { value: 'Article', label: 'Web Article' },
// //     { value: 'Video', label: 'Video Tutorial' },
// //     { value: 'PSD', label: 'Photoshop File' },
// //     { value: 'ABR', label: 'Photoshop Brushes' },
// //     { value: 'AI', label: 'Illustrator File' },
// //     { value: 'ZIP', label: 'Archive (ZIP)' }
// //   ];

// //   // Handle input changes
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   // Handle file uploads
// //   const handleFileUpload = (file, fieldName) => {
// //     setFormData(prev => ({ ...prev, [fieldName]: file }));
// //   };

// //   // Handle editor content change
// //   const handleEditorChange = (htmlContent) => {
// //     setContent(htmlContent);
// //     setFormData(prev => ({ ...prev, description: htmlContent }));
// //   };

// //   // Submit form
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsUploading(true);
// //     setUploadProgress(0);

// //     try {
// //       const user = await account.get();
// //       const userId = user.$id;

// //       // Upload thumbnail
// //       const thumbnailId = ID.unique();
// //       await storage.createFile(
// //         researchBucket,
// //         thumbnailId,
// //         formData.thumbnail,
// //         [
// //           Permission.read(Role.any()),
// //           Permission.write(Role.user(userId)),
// //           Permission.delete(Role.user(userId))
// //         ],
// //         {
// //           onProgress: (progress) => {
// //             setUploadProgress(Math.round((progress.loaded / progress.total) * 50));
// //           }
// //         }
// //       );

// //       // Upload main file if exists
// //       let fileId = null;
// //       if (formData.file) {
// //         fileId = ID.unique();
// //         await storage.createFile(
// //           researchBucket,
// //           fileId,
// //           formData.file,
// //           [
// //             Permission.read(Role.any()),
// //             Permission.write(Role.user(userId)),
// //             Permission.delete(Role.user(userId))
// //           ],
// //           {
// //             onProgress: (progress) => {
// //               setUploadProgress(50 + Math.round((progress.loaded / progress.total) * 50));
// //             }
// //           }
// //         );
// //       }

// //       // Create document
// //       await databases.createDocument(
// //         thumbnailDb,
// //         researchCollection,
// //         ID.unique(),
// //         {
// //           title: formData.title,
// //           category: formData.category,
// //           type: formData.type,
// //           description: formData.description,
// //           author: formData.author,
// //           thumbnailId,
// //           fileId,
// //           size: formData.file?.size || 0,
// //           downloads: 0,
// //           date: new Date().toISOString()
// //         },
// //         [
// //           Permission.read(Role.any()),
// //           Permission.write(Role.user(userId)),
// //           Permission.delete(Role.user(userId))
// //         ]
// //       );

// //       setUploadProgress(100);
// //       toast.success("Resource uploaded successfully!");
// //       setTimeout(() => navigate('/Community/Resources/ResourceHub'), 1500);
// //     } catch (error) {
// //       console.error('Upload failed:', error);
// //       toast.error(`Upload failed: ${error.message}`);
// //       setIsUploading(false);
// //     }
// //   };

// //   // Format file size
// //   const formatFileSize = (bytes) => {
// //     if (!bytes) return '0 Bytes';
// //     const k = 1024;
// //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// //     return parseFloat((bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i]);
// //   };

// //   // Navigation steps
// //   const steps = [
// //     { id: 1, name: 'Basic Info' },
// //     { id: 2, name: 'Content' },
// //     { id: 3, name: 'Files' },
// //     { id: 4, name: 'Review' }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
// //       {/* Header */}
// //       <header className="bg-white dark:bg-gray-800 shadow-sm">
// //         <div className="container mx-auto px-4 py-6">
// //           <div className="flex justify-between items-center">
// //             <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
// //               ArtVerse
// //             </Link>
// //             <nav className="hidden md:flex space-x-8">
// //               <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
// //               <Link to="/resources" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Resources</Link>
// //               <Link to="/community" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Community</Link>
// //             </nav>
// //             <button className="md:hidden text-gray-700 dark:text-gray-300">
// //               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //               </svg>
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="container mx-auto px-4 py-12">
// //         {/* Upload Progress */}
// //         {isUploading ? (
// //           <ProgressIndicator progress={uploadProgress} />
// //         ) : (
// //           <motion.div 
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
// //           >
// //             {/* Form Header */}
// //             <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
// //               <h1 className="text-3xl font-bold">Share Your Resource</h1>
// //               <p className="opacity-90">Contribute to the ArtVerse community</p>
// //             </div>

// //             {/* Stepper */}
// //             <div className="px-6 pt-6">
// //               <nav className="flex items-center justify-center">
// //                 <ol className="flex items-center space-x-8">
// //                   {steps.map((step) => (
// //                     <li key={step.id} className="flex items-center">
// //                       <button
// //                         onClick={() => setActiveStep(step.id)}
// //                         className={`flex items-center justify-center w-10 h-10 rounded-full ${activeStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
// //                       >
// //                         {step.id}
// //                       </button>
// //                       <span className={`ml-2 text-sm font-medium ${activeStep >= step.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
// //                         {step.name}
// //                       </span>
// //                     </li>
// //                   ))}
// //                 </ol>
// //               </nav>
// //             </div>

// //             {/* Form Content */}
// //             <form onSubmit={handleSubmit} className="p-6 space-y-8">
// //               {/* Step 1: Basic Info */}
// //               {activeStep === 1 && (
// //                 <motion.div
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   className="space-y-6"
// //                 >
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resource Title *</label>
// //                     <input
// //                       type="text"
// //                       name="title"
// //                       value={formData.title}
// //                       onChange={handleInputChange}
// //                       required
// //                       className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
// //                       placeholder="e.g., Ultimate Digital Painting Guide"
// //                     />
// //                   </div>

// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
// //                       <div className="grid grid-cols-3 gap-3">
// //                         {categories.map((cat) => (
// //                           <button
// //                             key={cat.value}
// //                             type="button"
// //                             onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
// //                             className={`flex flex-col items-center justify-center p-3 rounded-lg border ${formData.category === cat.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-300 dark:border-gray-600'} hover:border-blue-500 transition-colors`}
// //                           >
// //                             <span className="text-xl mb-1">{cat.icon}</span>
// //                             <span className="text-sm">{cat.label}</span>
// //                           </button>
// //                         ))}
// //                       </div>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">File Type *</label>
// //                       <select
// //                         name="type"
// //                         value={formData.type}
// //                         onChange={handleInputChange}
// //                         required
// //                         className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
// //                       >
// //                         <option value="">Select file type</option>
// //                         {fileTypes.map((type) => (
// //                           <option key={type.value} value={type.value}>{type.label}</option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name *</label>
// //                     <input
// //                       type="text"
// //                       name="author"
// //                       value={formData.author}
// //                       onChange={handleInputChange}
// //                       required
// //                       className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
// //                       placeholder="e.g., Alex Rivera"
// //                     />
// //                   </div>

// //                   <div className="flex justify-end">
// //                     <button
// //                       type="button"
// //                       onClick={() => setActiveStep(2)}
// //                       className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
// //                     >
// //                       Next: Content
// //                     </button>
// //                   </div>
// //                 </motion.div>
// //               )}

// //               {/* Step 2: Content */}
// //               {activeStep === 2 && (
// //                 <motion.div
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   className="space-y-6"
// //                 >
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
// //                     <RichTextEditor 
// //                       value={content} 
// //                       onChange={handleEditorChange} 
// //                       placeholder="Describe your resource in detail..."
// //                     />
// //                   </div>

// //                   <div className="flex justify-between">
// //                     <button
// //                       type="button"
// //                       onClick={() => setActiveStep(1)}
// //                       className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium"
// //                     >
// //                       Back
// //                     </button>
// //                     <button
// //                       type="button"
// //                       onClick={() => setActiveStep(3)}
// //                       className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
// //                     >
// //                       Next: Files
// //                     </button>
// //                   </div>
// //                 </motion.div>
// //               )}

// //               {/* Step 3: Files */}
// //               {activeStep === 3 && (
// //                 <motion.div
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   className="space-y-6"
// //                 >
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Thumbnail Image *</label>
// //                     <FileUploadArea
// //                       onFileUpload={(file) => handleFileUpload(file, 'thumbnail')}
// //                       accept="image/*"
// //                       preview={formData.thumbnail}
// //                       label="Drag & drop thumbnail or click to browse"
// //                     />
// //                   </div>

// //                   <div className="flex justify-between">
// //                     <button
// //                       type="button"
// //                       onClick={() => setActiveStep(2)}
// //                       className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium"
// //                     >
// //                       Back
// //                     </button>
// //                     <button
// //                       type="button"
// //                       onClick={() => setActiveStep(4)}
// //                       className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
// //                     >
// //                       Next: Review
// //                     </button>
// //                   </div>
// //                 </motion.div>
// //               )}

// //               {/* Step 4: Review */}
// //               {activeStep === 4 && (
// //                 <motion.div
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   className="space-y-6"
// //                 >
// //                   <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
// //                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Review Your Submission</h3>
                    
// //                     <div className="space-y-4">
// //                       <div>
// //                         <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">Basic Information</h4>
// //                         <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
// //                           <div>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">Title</p>
// //                             <p className="text-gray-900 dark:text-white">{formData.title}</p>
// //                           </div>
// //                           <div>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
// //                             <p className="text-gray-900 dark:text-white">
// //                               {categories.find(c => c.value === formData.category)?.label}
// //                             </p>
// //                           </div>
// //                           <div>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">File Type</p>
// //                             <p className="text-gray-900 dark:text-white">{formData.type}</p>
// //                           </div>
// //                           <div>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
// //                             <p className="text-gray-900 dark:text-white">{formData.author}</p>
// //                           </div>
// //                         </div>
// //                       </div>

// //                       <div>
// //                         <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">Files</h4>
// //                         <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
// //                           <div>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">Thumbnail</p>
// //                             {formData.thumbnail && (
// //                               <div className="mt-1 w-32 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
// //                                 <img 
// //                                   src={URL.createObjectURL(formData.thumbnail)} 
// //                                   alt="Thumbnail preview" 
// //                                   className="w-full h-full object-cover"
// //                                 />
// //                               </div>
// //                             )}
// //                           </div>
// //                           <div>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">Resource File</p>
// //                             {formData.file ? (
// //                               <div className="mt-1">
// //                                 <p className="text-gray-900 dark:text-white">{formData.file.name}</p>
// //                                 <p className="text-sm text-gray-500 dark:text-gray-400">
// //                                   {formatFileSize(formData.file.size)}
// //                                 </p>
// //                               </div>
// //                             ) : (
// //                               <p className="text-gray-500 dark:text-gray-400">No file uploaded</p>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="flex justify-between">
// //                     <button
// //                       type="button"
// //                       onClick={() => setActiveStep(3)}
// //                       className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium"
// //                     >
// //                       Back
// //                     </button>
// //                     <button
// //                       type="submit"
// //                       className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
// //                     >
// //                       Submit Resource
// //                     </button>
// //                   </div>
// //                 </motion.div>
// //               )}
// //             </form>
// //           </motion.div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };

// // export default ResourceUpload;



import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Microscope, Layers, Upload, 
  ArrowRight, ArrowLeft, Check, X, File, Image as ImageIcon, Menu,
  Blocks
} from 'lucide-react';
import { account, databases, storage } from '../../appwriteConfig'; // Adjust path
import { ID } from 'appwrite';
import { toast } from 'react-toastify';
import Logo from "../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg"
import { Link } from 'react-router-dom';

// --- CONFIG ---
const DB_ID = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID;
const COLL_ID = import.meta.env.VITE_APPWRITE_RESEARCH_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_RESEARCH_BUCKET_ID;

// --- UI COMPONENTS ---

const SectionTitle = ({ children }) => (
  <h2 className="text-xl md:text-2xl font-light text-zinc-900 dark:text-white mb-6 tracking-tight">{children}</h2>
);

const Label = ({ children }) => (
  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 mt-4">
    {children}
  </label>
);

const Input = ({ ...props }) => (
  <input 
    className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-3 text-base md:text-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors rounded-none"
    {...props}
  />
);

const TextArea = ({ ...props }) => (
  <textarea 
    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 text-sm font-sans leading-relaxed text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-500 resize-y min-h-[120px]"
    {...props}
  />
);

const DropZone = ({ label, accept, value, onChange, subtext }) => (
  <div className="group border-2 border-zinc-200 dark:border-zinc-800 rounded-xl h-48 md:h-64 flex flex-col items-center justify-center relative hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer bg-white dark:bg-black">
    <input 
      type="file" 
      accept={accept}
      onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
    />
    {value ? (
      <div className="text-center z-0 px-4">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3 text-green-500">
          <Check size={24} />
        </div>
        <p className="font-bold text-sm md:text-base text-zinc-900 dark:text-zinc-100 line-clamp-1">{value.name}</p>
        <p className="text-xs text-zinc-400 mt-1">{(value.size / 1024 / 1024).toFixed(2)} MB</p>
        <button onClick={(e) => {e.stopPropagation(); onChange(null)}} className="mt-4 text-xs text-red-500 hover:underline z-20 relative">Remove</button>
      </div>
    ) : (
      <div className="text-center p-6 opacity-60 group-hover:opacity-100 transition-opacity">
        <Upload size={24} className="mx-auto mb-4 text-zinc-400" />
        <p className="font-medium text-sm md:text-base text-zinc-700 dark:text-zinc-300">{label}</p>
        <p className="text-[10px] md:text-xs text-zinc-400 mt-2">{subtext}</p>
      </div>
    )}
  </div>
);

// --- MAIN PAGE ---
export default function CreatorStudio() {
  const navigate = useNavigate();
  
  // STATE
  const [activeCategory, setActiveCategory] = useState('article'); 
  const [step, setStep] = useState(1); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FORM DATA
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: null,
    // Article
    tags: '',
    description: '', // Body for article
    // Research
    author: '',
    institution: '',
    abstract: '', // Short overview
    mainContent: '', // Full details
    proofFile: null,
    // Guide
    complexity: 'Beginner',
    steps: [{ title: '', desc: '' }],
  });

  const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setStep(1);
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
        const user = await account.get();
        // --- APPWRITE UPLOAD LOGIC HERE (Simulated) ---
        // 1. Storage Uploads
        // 2. Database Create
        await new Promise(resolve => setTimeout(resolve, 1500)); // Mock delay
        toast.success("Published successfully");
        navigate('/Community/Resources/ResourceHub');
    } catch (e) {
        console.error(e);
        toast.error("Upload failed");
    } finally {
        setIsSubmitting(false);
    }
  };

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <div className="max-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans flex flex-col items-center">
        {/* HEADER */}
        
      <header className="h-16 w-full max-w-7xl shrink-0 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 md:px-8 bg-white dark:bg-black z-50">
          <Link to={"/"}>
          <div className="flex items-center gap-3">
              <div className="w-8 h-8  overflow-hidden bg-zinc-900 dark:bg-zinc-100 rounded-lg flex items-center justify-center text-white dark:text-black font-bold text-xs">
                <img src={Logo} alt="" />
              </div>
              <span className="font-bold tracking-tight text-lg font-Eagle">Painters' Diary</span>
          </div>
          </Link>
          
          {/* onClick={() => navigate(-1)} */}
          <Link to={"/Community/Resources/Hub"}>
          <button  className="text-[10px] md:text-xs font-bold uppercase text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-2">
             <Blocks/> 
          </button>
          </Link>
        </header>
      {/* WRAPPER: Max 7xl for large screens */}
      <div className=" w-full max-w-7xl flex flex-col h-screen overflow-hidden shadow-2xl bg-white dark:bg-black ">
        {/* border-x border-zinc-100 dark:border-zinc-900 */}
    
        {/* MAIN LAYOUT: Mobile (Col) -> Desktop (Row) */}
        <div className=" w-full max-w-7xl flex flex-col lg:flex-row flex-1 overflow-hidden relative">
          
          {/* 1. CATEGORY SELECTOR 
              Mobile: Horizontal Scroll Strip at top
              Desktop: Sidebar on Left
          */}
          <aside className="shrink-0 lg:w-1/4 lg:min-w-[280px] lg:border-r border-b lg:border-b-0 border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/20">
            <div className="lg:h-full overflow-x-auto lg:overflow-y-auto flex lg:flex-col gap-3 p-4 hide-scrollbar">
              
              <div className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 px-2">
                Format
              </div>

              {[
                  { id: 'article', label: 'Article', icon: FileText, desc: 'Insights & News' },
                  { id: 'research', label: 'Research', icon: Microscope, desc: 'Academic Paper' },
                  { id: 'guide', label: 'Guide', icon: Layers, desc: 'Step-by-Step' },
              ].map((cat) => (
                  <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`flex-shrink-0 lg:w-full text-left p-2 md:p-4 rounded-xl transition-all flex items-center gap-3 md:gap-4 border lg:border-0
                          ${activeCategory === cat.id 
                              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black border-zinc-900 dark:border-zinc-100 shadow-md' 
                              : 'bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                          }`}
                  >
                      <cat.icon size={18} />
                      <div className="flex flex-col">
                          <span className="font-bold text-sm whitespace-nowrap">{cat.label}</span>
                          <span className={`text-[10px] hidden lg:block ${activeCategory === cat.id ? 'opacity-70' : 'opacity-50'}`}>
                              {cat.desc}
                          </span>
                      </div>
                  </button>
              ))}
            </div>
          </aside>

          {/* 2. MAIN FORM AREA */}
          <main className="flex-1 flex flex-col relative bg-white dark:bg-black h-full">
              
              {/* Progress Bar */}
              <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-900 shrink-0">
                  <motion.div 
                      className="h-full bg-blue-600 dark:bg-blue-400"
                      initial={{ width: "33%" }}
                      animate={{ width: `${(step / 3) * 100}%` }}
                  />
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto p-5 md:p-12 pb-32 custom-scrollbar">
                  <div className="max-w-3xl mx-auto">
                      <AnimatePresence mode="wait">
                          
                          {/* --- STEP 1: MEDIA --- */}
                          {step === 1 && (
                              <motion.div 
                                  key="step1"
                                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                  className="space-y-6"
                              >
                                  <SectionTitle>1. Upload Assets</SectionTitle>
                                  
                                  {activeCategory === 'article' && (
                                      <DropZone 
                                          label="Cover Image" accept="image/*" 
                                          value={formData.thumbnail} onChange={(f) => updateForm('thumbnail', f)}
                                          subtext="High-res recommended (1920x1080)"
                                      />
                                  )}

                                  {activeCategory === 'research' && (
                                      <div className="flex flex-col gap-6">
                                          <DropZone 
                                              label="Research Paper (PDF)" accept="application/pdf" 
                                              value={formData.proofFile} onChange={(f) => updateForm('proofFile', f)}
                                              subtext="Required for verification"
                                          />
                                           <DropZone 
                                              label="Visual Abstract / Graph" accept="image/*" 
                                              value={formData.thumbnail} onChange={(f) => updateForm('thumbnail', f)}
                                              subtext="Visual representation of findings"
                                          />
                                      </div>
                                  )}

                                  {activeCategory === 'guide' && (
                                      <DropZone 
                                          label="Final Result / Cover" accept="image/*" 
                                          value={formData.thumbnail} onChange={(f) => updateForm('thumbnail', f)}
                                          subtext="Show what the user will build"
                                      />
                                  )}
                              </motion.div>
                          )}

                          {/* --- STEP 2: DETAILS --- */}
                          {step === 2 && (
                              <motion.div 
                                  key="step2"
                                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                  className="space-y-8"
                              >
                                  <SectionTitle>2. The Details</SectionTitle>

                                  {/* Common Title */}
                                  <div>
                                      <Label>{activeCategory === 'research' ? 'Paper Title' : 'Title'}</Label>
                                      <Input 
                                          placeholder="Enter a descriptive title..." 
                                          value={formData.title} 
                                          onChange={e => updateForm('title', e.target.value)} 
                                          autoFocus
                                      />
                                  </div>

                                  {/* Article Specific */}
                                  {activeCategory === 'article' && (
                                      <>
                                          <div>
                                              <Label>Category Tags</Label>
                                              <Input placeholder="Tech, Design, Art..." value={formData.tags} onChange={e => updateForm('tags', e.target.value)} />
                                          </div>
                                          <div>
                                              <Label>Article Body</Label>
                                              <TextArea placeholder="Write your content here..." value={formData.description} onChange={e => updateForm('description', e.target.value)} className="min-h-[300px] w-full bg-gray-100 dark:bg-zinc-950 outline-none p-6 rounded-lg overflow-hidden" />
                                          </div>
                                      </>
                                  )}

                                  {/* Research Specific */}
                                  {activeCategory === 'research' && (
                                      <>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                              <div><Label>Lead Author</Label><Input placeholder="Name" value={formData.author} onChange={e => updateForm('author', e.target.value)} /></div>
                                              <div><Label>Institution</Label><Input placeholder="University / Lab" value={formData.institution} onChange={e => updateForm('institution', e.target.value)} /></div>
                                          </div>
                                          <div>
                                              <Label>Abstract (Overview)</Label>
                                              <TextArea placeholder="Brief summary of the paper..." value={formData.abstract} onChange={e => updateForm('abstract', e.target.value)} />
                                          </div>
                                          <div>
                                              <Label>Full Methodology / Details</Label>
                                              <TextArea placeholder="Detailed explanation, methodology, and conclusion..." value={formData.mainContent} onChange={e => updateForm('mainContent', e.target.value)} className="min-h-[200px] w-full bg-gray-100 dark:bg-zinc-950 outline-none p-6 rounded-lg overflow-hidden" />
                                          </div>
                                      </>
                                  )}

                                  {/* Guide Specific */}
                                  {activeCategory === 'guide' && (
                                      <>
                                          <div>
                                              <Label>Complexity Level</Label>
                                              <div className="flex flex-wrap gap-2 mt-2">
                                                  {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                                                      <button key={lvl} onClick={() => updateForm('complexity', lvl)} className={`px-4 py-2 text-xs font-bold border rounded-full transition-colors ${formData.complexity === lvl ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-transparent' : 'border-zinc-300 text-zinc-500'}`}>
                                                          {lvl}
                                                      </button>
                                                  ))}
                                              </div>
                                          </div>
                                          
                                          <div className="pt-6">
                                              <Label>Step-by-Step Instructions</Label>
                                              <div className="space-y-4 mt-4">
                                                  {formData.steps.map((s, idx) => (
                                                      <div key={idx} className="flex gap-3 items-start p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                                          <span className="mt-2 w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 text-[10px] font-bold flex items-center justify-center shrink-0">{idx + 1}</span>
                                                          <div className="flex-1 space-y-2">
                                                              <input 
                                                                  className="w-full bg-transparent font-bold text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
                                                                  placeholder={`Step ${idx + 1} Title`}
                                                                  value={s.title}
                                                                  onChange={(e) => {
                                                                      const newSteps = [...formData.steps];
                                                                      newSteps[idx].title = e.target.value;
                                                                      updateForm('steps', newSteps);
                                                                  }}
                                                              />
                                                              <textarea 
                                                                  className="w-full bg-transparent text-sm text-zinc-600 dark:text-zinc-400 placeholder:text-zinc-500 focus:outline-none resize-none"
                                                                  placeholder="Explain this step..."
                                                                  value={s.desc}
                                                                  onChange={(e) => {
                                                                      const newSteps = [...formData.steps];
                                                                      newSteps[idx].desc = e.target.value;
                                                                      updateForm('steps', newSteps);
                                                                  }}
                                                              />
                                                          </div>
                                                          {formData.steps.length > 1 && (
                                                              <button onClick={() => updateForm('steps', formData.steps.filter((_, i) => i !== idx))} className="text-zinc-400 hover:text-red-500"><X size={14}/></button>
                                                          )}
                                                      </div>
                                                  ))}
                                                  <button 
                                                      onClick={() => updateForm('steps', [...formData.steps, { title: '', desc: '' }])}
                                                      className="w-full py-3 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg text-xs font-bold uppercase text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                                  >
                                                      + Add Next Step
                                                  </button>
                                              </div>
                                          </div>
                                      </>
                                  )}
                              </motion.div>
                          )}

                          {/* --- STEP 3: REVIEW --- */}
                          {step === 3 && (
                              <motion.div 
                                  key="step3"
                                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                  className="flex flex-col items-center justify-center text-center space-y-6 pt-8"
                              >
                                  <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                                      <Check size={40} />
                                  </div>
                                  <h2 className="text-2xl font-light">Ready to Publish?</h2>
                                  <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 w-full text-left">
                                      <span className="text-[10px] font-bold uppercase bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-600 dark:text-zinc-300">{activeCategory}</span>
                                      <h3 className="text-xl font-bold mt-2">{formData.title || "Untitled Draft"}</h3>
                                      <p className="text-sm text-zinc-500 mt-1 truncate">{activeCategory === 'research' ? formData.abstract : formData.description}</p>
                                  </div>
                                  <p className="text-xs text-zinc-400 max-w-sm">
                                      Your content will be reviewed by our automated systems before going live on the Hub.
                                  </p>
                              </motion.div>
                          )}
                      </AnimatePresence>
                  </div>
              </div>

              {/* FIXED BOTTOM NAV */}
              <div className="shrink-0 h-20 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur px-6 md:px-12 flex items-center justify-between z-40 absolute bottom-0 w-full">
                  <button 
                      onClick={handleBack}
                      disabled={step === 1}
                      className={`flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors ${step === 1 ? 'opacity-0 cursor-default' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                  >
                      <ArrowLeft size={16} /> Back
                  </button>

                  {step < 3 ? (
                      <button 
                          onClick={handleNext}
                          className="bg-zinc-900 dark:bg-white text-white dark:text-black px-6 md:px-8 py-3 rounded-full font-bold text-xs md:text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg"
                      >
                          Next <ArrowRight size={16} />
                      </button>
                  ) : (
                      <button 
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="bg-green-600 text-white px-6 md:px-8 py-3 rounded-full font-bold text-xs md:text-sm hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg"
                      >
                          {isSubmitting ? 'Uploading...' : 'Publish'} <Check size={16} />
                      </button>
                  )}
              </div>

          </main>
        </div>
      </div>
    </div>
  );
}