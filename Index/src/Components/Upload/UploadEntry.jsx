// import { useState } from "react";
// import { UploadSection } from "./UploadSection";

//  //account, storage, databases, config, ID, Permission, Role, Query 
// export const UploadEntry = ({ index, entry, updateEntry, removeEntry, handleFileChange, handleEntryUpload, uploading }) => {
//   const [isDragging, setIsDragging] = useState(false);

//   const artTypes = [
//   // Traditional & Fine Arts
//   "Oil Painting",
//   "Acrylic Painting",
//   "Watercolor Painting",
//   "Ink",
//   "Charcoal",
//   "Pastel",
//   "Pencil Drawing",
//   "Graphite Drawing",
//   "Tempera",
//   "Fresco Painting",
//   "Mosaic Art",
//   "Glass Art",
//   "Fiber Art",
//   "Sand Art",

//   // Digital & Modern Art
//   "Digital Art",
//   "Digital Painting",
//   "Vector Art",
//   "Pixel Art",
//   "3D Modeling",
//   "Photography",
//   "Mixed Media",
//   "Collage",
//   "Printmaking",
//   "AI-Generated Art",
//   "Augmented Reality Art",
//   "Virtual Reality Art",
//   "NFT Art",
//   "Data Visualization Art",

//   // Calligraphy & Typography
//   "Calligraphy",
//   "Typography Design",

//   // Sculpture & Installation
//   "Sculpture",
//   "Ceramic",
//   "Installation Art",
//   "Kinetic Art",
//   "Light Art",

//   // Performance & Experimental
//   "Performance Art",
//   "Sound Art",
//   "Bio Art",

//   //Photogrraphy
//   "Portrait Photography",
//   "Landscape Photography",
//   "Street Photography",
//   "Conceptual Photography",
//   "Documentary Photography",
//   "Micro Photography",

//   // Design & Applied Arts
//   "Graphic Design",
//   "Industrial Design",
//   "Fashion Design",
//   "Interior Design",
//   "Architectural Drawing",
//   "Game Design",

//   // Other
//   "Other",
// ];

// const tagOptions = [
//   'Abstract',
//   'Landscape',
//   'Portrait',
//   'StillLife',
//   'Fantasy',
//   'Realism',
//   'Surrealism',
//   'Traditional',
//   'Minimalism',
//   'Expressionism',
//   'Impressionism',
//   'PopArt',
//   'DigitalArt',
//   'Historical',
//   'Modern',
//   'Nature',
//   'Photography'
// ];


//   return (
//     <div className="bg-white dark:bg-gray-800/90 p-6 rounded-xl shadow-lg mb-6 border border-gray-100 dark:border-gray-700 transform hover:scale-100 transition-transform duration-300">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//           Image Entry {index + 1}
//         </h3>
//         {index > 0 && (
//           <button
//             onClick={() => removeEntry(index)}
//             className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-600 text-sm font-medium underline"
//           >
//             Remove
//           </button>
//         )}
//       </div>
//       <div className="grid grid-cols-1 gap-4">
//         <div>
//           <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//             Title *
//           </label>
//           <input
//             type="text"
//             placeholder="Give your image a catchy name"
//             value={entry.title}
//             onChange={(e) => updateEntry(index, 'title', e.target.value)}
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
//             required
//           />
//         </div>
//         <div>
//           <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//             Story Behind It
//           </label>
//           <textarea
//             placeholder="Share the story or details"
//             value={entry.description}
//             onChange={(e) => updateEntry(index, 'description', e.target.value)}
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
//             rows="3"
//           />
//         </div>
//         {/* The tag part */}
//         <div>
//           <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//             Category Tag *
//           </label>
//           <select
//             value={entry.tag}
//             onChange={(e) => updateEntry(index, 'tag', e.target.value)}
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//             required
//           >
//             <option value="">Choose a Category Tag</option>
//             {tagOptions.map((tag) => (
//               <option key={tag} value={tag} className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-teal-300">
//                 {tag}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//             Art Type *
//           </label>
//           <select
//             value={entry.medium}
//             onChange={(e) => updateEntry(index, 'medium', e.target.value)}
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//             required
//           >
//             <option value="">Choose Art Type</option>
//                {artTypes.map((type) => (
//                <option key={type} value={type} className=' bg-black text-white '>
//                {type}
//              </option>
//               ))}
//          </select>
//         </div>
       

//         <div>
//           <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//             Upload Your Masterpiece *
//           </label>
//           <div
//             className={`border-2 border-dashed ${isDragging ? 'border-teal-500 bg-teal-50 dark:border-teal-400 dark:bg-teal-900' : 'border-teal-300 dark:border-teal-600'} rounded-xl p-6 text-center cursor-pointer transition-all bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 hover:bg-gradient-to-tl hover:from-teal-50 hover:to-gray-50 dark:hover:from-teal-900 dark:hover:to-gray-700`}
//             onDragOver={(e) => {
//               e.preventDefault();
//               setIsDragging(true);
//             }}
//             onDragLeave={(e) => {
//               e.preventDefault();
//               setIsDragging(false);
//             }}
//             onDrop={(e) => {
//               e.preventDefault();
//               setIsDragging(false);
//               handleFileChange(index, e.dataTransfer.files);
//             }}
//             onClick={() => document.getElementById(`fileInput-${index}`).click()}
//           >
//             {entry.file ? (
//               <div className="flex flex-col items-center">
//                 <img
//                   src={URL.createObjectURL(entry.file)}
//                   alt="Preview"
//                   className="h-32 object-contain mb-2 rounded-lg"
//                 />
//                 <p className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-xs">
//                   {entry.file.name}
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   {(entry.file.size / 1024 / 1024).toFixed(2)} MB
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <IoCloudUploadOutline className="mx-auto h-12 w-12 text-teal-500 dark:text-teal-400" />
//                 <p className="mt-2 text-gray-600 dark:text-gray-400 font-Playfair">
//                   Drag & drop your image or{' '}
//                   <span className="text-teal-600 dark:text-teal-400 font-semibold">browse</span>
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-wrap">
//                   Supports JPG, PNG, WEBP (Max 10MB)
//                 </p>
//               </>
//             )}
//             <input
//               type="file"
//               id={`fileInput-${index}`}
//               className="hidden"
//               accept="image/jpeg,image/png,image/webp"
//               onChange={(e) => handleFileChange(index, e.target.files)}
//             />
//           </div>
//         </div>
//         <button
//           className={`w-full bg-gradient-to-r from-teal-600 to-teal-300 dark:from-teal-500 dark:to-teal-700 text-white py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 mt-4 font-Playfair ${uploading ? 'opacity-70 cursor-not-allowed' : 'hover:from-teal-700 hover:to-teal-400 dark:hover:from-teal-600 dark:hover:to-teal-800'}`}
//           onClick={() => handleEntryUpload(index)}
//           disabled={uploading}
//         >
//           {uploading ? (
//             <span className="flex items-center justify-center">
//               <svg
//                 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Uploading...
//             </span>
//           ) : (
//             'Share Your Art'
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };



import { useState } from "react";
// import PropTypes from "prop-types";
import { IoCloudUploadOutline } from "react-icons/io5";

// Move constants outside component to avoid recreation on each render
  const artTypes = [
  // Traditional & Fine Arts
  "Oil Painting",
  "Acrylic Painting",
  "Watercolor Painting",
  "Ink",
  "Charcoal",
  "Pastel",
  "Pencil Drawing",
  "Graphite Drawing",
  "Tempera",
  "Fresco Painting",
  "Mosaic Art",
  "Glass Art",
  "Fiber Art",
  "Sand Art",

  // Digital & Modern Art
  "Digital Art",
  "Digital Painting",
  "Vector Art",
  "Pixel Art",
  "3D Modeling",
  "Photography",
  "Mixed Media",
  "Collage",
  "Printmaking",
  "AI-Generated Art",
  "Augmented Reality Art",
  "Virtual Reality Art",
  "NFT Art",
  "Data Visualization Art",

  // Calligraphy & Typography
  "Calligraphy",
  "Typography Design",

  // Sculpture & Installation
  "Sculpture",
  "Ceramic",
  "Installation Art",
  "Kinetic Art",
  "Light Art",

  // Performance & Experimental
  "Performance Art",
  "Sound Art",
  "Bio Art",

  //Photogrraphy
  "Portrait Photography",
  "Landscape Photography",
  "Street Photography",
  "Conceptual Photography",
  "Documentary Photography",
  "Micro Photography",

  // Design & Applied Arts
  "Graphic Design",
  "Industrial Design",
  "Fashion Design",
  "Interior Design",
  "Architectural Drawing",
  "Game Design",

  // Other
  "Other",
];

const tagOptions = [
  'Abstract',
  'Landscape',
  'Portrait',
  'StillLife',
  'Fantasy',
  'Realism',
  'Surrealism',
  'Traditional',
  'Minimalism',
  'Expressionism',
  'Impressionism',
  'PopArt',
  'DigitalArt',
  'Historical',
  'Modern',
  'Nature',
  'Photography'
];

  const handleFileChange = (index, files) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB
    // const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const validTypes = [
    'image/jpeg', 
    'image/jpg', // Add this
    'image/png', 
    'image/webp',
    'image/x-png' // Some browsers use this
    ];
  }

export const UploadEntry = ({ 
  index, 
  entry, 
  updateEntry, 
  removeEntry, 
  handleFileChange, 
  handleEntryUpload, 
  uploading 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(index, e.dataTransfer.files);
    }
  };

  
  return (
    <div className="bg-white dark:bg-gray-800/90 p-6 rounded-xl shadow-lg mb-6 border border-gray-100 dark:border-gray-700 transform hover:scale-100 transition-transform duration-300">
      {/* Header with remove button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Image Entry {index + 1}
        </h3>
        {index > 0 && (
          <button
            onClick={() => removeEntry(index)}
            className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-600 text-sm font-medium underline"
            aria-label={`Remove entry ${index + 1}`}
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Title Input */}
        <div>
          <label htmlFor={`title-${index}`} className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
            Title *
          </label>
          <input
            id={`title-${index}`}
            type="text"
            placeholder="Give your image a catchy name"
            value={UploadEntry.title}
            onChange={(e) => updateEntry(index, 'title', e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
            required
            aria-required="true"
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label htmlFor={`description-${index}`} className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
            Story Behind It
          </label>
          <textarea
            id={`description-${index}`}
            placeholder="Share the story or details"
            value={UploadEntry.description}
            onChange={(e) => updateEntry(index, 'description', e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
            rows="3"
          />
        </div>

        {/* Category Tag Select */}
        <div>
          <label htmlFor={`tag-${index}`} className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
            Category Tag *
          </label>
          <select
            id={`tag-${index}`}
            value={UploadEntry.tag}
            onChange={(e) => updateEntry(index, 'tag', e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
            required
            aria-required="true"
          >
            <option value="">Choose a Category Tag</option>
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Art Type Select */}
        <div>
          <label htmlFor={`medium-${index}`} className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
            Art Type *
          </label>
          <select
            id={`medium-${index}`}
            value={UploadEntry.medium}
            onChange={(e) => updateEntry(index, 'medium', e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
            required
            aria-required="true"
          >
            <option value="">Choose Art Type</option>
            {artTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload Area */}
        <div>
          <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
            Upload Your Masterpiece *
          </label>
          <div
            className={`border-2 border-dashed ${
              isDragging 
                ? 'border-teal-500 bg-teal-50 dark:border-teal-400 dark:bg-teal-900' 
                : 'border-teal-300 dark:border-teal-600'
            } rounded-xl p-6 text-center cursor-pointer transition-all bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 hover:bg-gradient-to-tl hover:from-teal-50 hover:to-gray-50 dark:hover:from-teal-900 dark:hover:to-gray-700`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById(`fileInput-${index}`).click()}
            role="button"
            tabIndex="0"
            aria-label="Upload artwork"
            onKeyDown={(e) => e.key === 'Enter' && document.getElementById(`fileInput-${index}`).click()}
          >
            {UploadEntry.file ? (
              <div className="flex flex-col items-center">
                <img
                  src={URL.createObjectURL(entry.file)}
                  alt="Preview"
                  className="h-32 object-contain mb-2 rounded-lg"
                />
                <p className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-xs">
                  {entry.file.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {(entry.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <IoCloudUploadOutline className="mx-auto h-12 w-12 text-teal-500 dark:text-teal-400" />
                <p className="mt-2 text-gray-600 dark:text-gray-400 font-Playfair">
                  Drag & drop your image or{' '}
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">browse</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-wrap">
                  Supports JPG, PNG, WEBP (Max 10MB)
                </p>
              </>
            )}
            <input
              type="file"
              id={`fileInput-${index}`}
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleFileChange(index, e.target.files)}
              aria-label="File upload"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          className={`w-full bg-gradient-to-r from-teal-600 to-teal-300 dark:from-teal-500 dark:to-teal-700 text-white py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 mt-4 font-Playfair ${
            uploading 
              ? 'opacity-70 cursor-not-allowed' 
              : 'hover:from-teal-700 hover:to-teal-400 dark:hover:from-teal-600 dark:hover:to-teal-800'
          }`}
          onClick={() => handleEntryUpload(index)}
          disabled={uploading}
          aria-busy={uploading}
          aria-label={uploading ? "Uploading artwork" : "Submit artwork"}
        >
          {uploading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading...
            </span>
          ) : (
            'Share Your Art'
          )}
        </button>
      </div>
    </div>
  );
};

// Prop type validation
// UploadEntry.propTypes = {
//   index: PropTypes.number.isRequired,
//   entry: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string,
//     tag: PropTypes.string.isRequired,
//     medium: PropTypes.string.isRequired,
//     file: PropTypes.instanceOf(File)
//   }).isRequired,
//   updateEntry: PropTypes.func.isRequired,
//   removeEntry: PropTypes.func.isRequired,
//   handleFileChange: PropTypes.func.isRequired,
//   handleEntryUpload: PropTypes.func.isRequired,
//   uploading: PropTypes.bool.isRequired
// };