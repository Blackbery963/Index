// import React from 'react';
// import { IoSparkles, IoAlertCircle } from 'react-icons/io5';

// const DetailsStep = ({
//   uploadType,
//   entry,
//   index,
//   updateEntry,
//   customTag,
//   setCustomTag,
//   addCustomTag,
//   removeTag,
//   handleSpecialToggle,
//   specialReason,
//   setSpecialReason,
//   artCategories
// }) => {
//   return (
//     <div className="space-y-6">
//       <div className="text-center mb-8">
//         <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2">
//           Add Details
//         </h3>
//         <p className="text-gray-600 dark:text-gray-400">Tell us about your creation</p>
//       </div>

//       <div className="space-y-4">
//         {/* Title */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Title *
//           </label>
//           <input
//             type="text"
//             value={entry.title}
//             onChange={(e) => updateEntry(index, 'title', e.target.value)}
//             placeholder="Give it a meaningful title..."
//             className="glass-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Description {uploadType === 'video' ? '*' : ''}
//           </label>
//           <textarea
//             value={entry.description}
//             onChange={(e) => updateEntry(index, 'description', e.target.value)}
//             placeholder={
//               uploadType === 'sell' 
//                 ? "Describe your product, materials used, dimensions, condition..." 
//                 : "Share the story behind your creation..."
//             }
//             rows={3}
//             className="glass-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent resize-none"
//           />
//         </div>

//         {/* Category - Only for images */}
//         {(uploadType === 'normal' || uploadType === 'sell') && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Category *
//             </label>
//             <select
//               value={entry.medium}
//               onChange={(e) => updateEntry(index, 'medium', e.target.value)}
//               className="glass-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
//             >
//               <option value="">Select a category</option>
//               {artCategories.map(cat => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Tags */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Tags {entry.tag ? `(${entry.tag.split(',').length}/5)` : ''}
//           </label>
//           <div className="flex gap-2 mb-2">
//             <input
//               type="text"
//               value={customTag}
//               onChange={(e) => setCustomTag(e.target.value)}
//               placeholder="Add a tag..."
//               className="glass-input flex-1 px-3 py-2 rounded-lg"
//               onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
//             />
//             <button
//               onClick={addCustomTag}
//               className="px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg transition-all hover:scale-105 shadow-lg shadow-teal-500/25"
//             >
//               Add
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {entry.tag?.split(',').filter(t => t.trim()).map((tag, idx) => (
//               <span key={idx} className="px-3 py-1 bg-gradient-to-r from-teal-400/20 to-blue-500/20 text-teal-300 rounded-full text-sm flex items-center gap-1 border border-teal-500/20">
//                 #{tag.trim()}
//                 <button 
//                   onClick={() => removeTag(tag)} 
//                   className="hover:text-teal-400 transition-colors"
//                 >
//                   ×
//                 </button>
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Price - Only for sell */}
//         {uploadType === 'sell' && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Price (₹) *
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
//               <input
//                 type="number"
//                 value={entry.price}
//                 onChange={(e) => updateEntry(index, 'price', e.target.value)}
//                 placeholder="0.00"
//                 min="1"
//                 className="glass-input w-full pl-10 pr-4 py-3 rounded-xl"
//               />
//             </div>
//           </div>
//         )}

//         {/* Special Piece - Only for images */}
//         {(uploadType === 'normal' || uploadType === 'sell') && (
//           <div>
//             <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
//               <IoSparkles className="text-yellow-400" />
//               Special Features (optional)
//             </label>
//             <div className="space-y-3">
//               <label className="flex items-center gap-3 glass-card p-3 rounded-xl">
//                 <input
//                   type="checkbox"
//                   checked={entry.awards?.includes('featured')}
//                   onChange={(e) => handleSpecialToggle('featured')}
//                   className="rounded border-white/30 bg-white/10 text-teal-500 focus:ring-teal-500/50"
//                 />
//                 <span>This is a featured work</span>
//               </label>
              
//               <label className="flex items-center gap-3 glass-card p-3 rounded-xl">
//                 <input
//                   type="checkbox"
//                   checked={entry.awards?.includes('award')}
//                   onChange={(e) => handleSpecialToggle('award')}
//                   className="rounded border-white/30 bg-white/10 text-teal-500 focus:ring-teal-500/50"
//                 />
//                 <span>Award-winning piece</span>
//               </label>

//               {(entry.awards?.includes('featured') || entry.awards?.includes('award')) && (
//                 <div className="glass-card p-4 rounded-xl border border-amber-500/20">
//                   <label className=" text-sm text-amber-400 mb-2 flex items-center gap-2">
//                     <IoAlertCircle />
//                     Why is it special?
//                   </label>
//                   <input
//                     type="text"
//                     value={specialReason}
//                     onChange={(e) => setSpecialReason(e.target.value)}
//                     placeholder="Briefly explain..."
//                     className="glass-input w-full px-3 py-2 rounded-lg"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DetailsStep;


import React from 'react';
import { IoSparkles, IoAlertCircle } from 'react-icons/io5';

const DetailsStep = ({
  uploadType,
  entry,
  index,
  updateEntry,
  customTag,
  setCustomTag,
  addCustomTag,
  removeTag,
  handleSpecialToggle,
  specialReason,
  setSpecialReason,
  artCategories
}) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Add Details
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Tell us about your creation
        </p>
      </div>

      <div className="space-y-5">

        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={entry.title}
            onChange={(e) => updateEntry(index, "title", e.target.value)}
            placeholder="Give it a meaningful title..."
            className="
              w-full px-4 py-3 rounded-xl
              bg-white/60 dark:bg-gray-800/50 
              border border-gray-200 dark:border-gray-700
              text-gray-800 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              shadow-inner
              focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50
              transition-all
            "
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
            Description {uploadType === "video" ? "*" : ""}
          </label>
          <textarea
            value={entry.description}
            onChange={(e) =>
              updateEntry(index, "description", e.target.value)
            }
            placeholder={
              uploadType === "sell"
                ? "Describe your product, materials used, dimensions, condition..."
                : "Share the story behind your creation..."
            }
            rows={3}
            className="
              w-full px-4 py-3 rounded-xl resize-none
              bg-white/60 dark:bg-gray-800/50 
              border border-gray-200 dark:border-gray-700
              text-gray-800 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              shadow-inner
              focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50
              transition-all
            "
          />
        </div>

        {/* CATEGORY (only images) */}
        {(uploadType === "normal" || uploadType === "sell") && (
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              Category *
            </label>
            <select
              value={entry.medium}
              onChange={(e) => updateEntry(index, "medium", e.target.value)}
              className="
                w-full px-4 py-3 rounded-xl
                bg-white/60 dark:bg-gray-800/50 
                border border-gray-200 dark:border-gray-700
                text-gray-800 dark:text-gray-100
                shadow-inner
                focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50
                transition-all
              "
            >
              <option value="">Select a category</option>
              {artCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* TAGS */}
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
            Tags {entry.tag ? `(${entry.tag.split(",").length}/5)` : ""}
          </label>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Add a tag..."
              className="
                flex-1 px-3 py-2 rounded-lg
                bg-white/60 dark:bg-gray-800/50 
                border border-gray-300 dark:border-gray-700
                text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                shadow-inner
                focus:ring-2 focus:ring-teal-500/50
              "
              onKeyPress={(e) => e.key === "Enter" && addCustomTag()}
            />
            <button
              onClick={addCustomTag}
              className="
                px-4 py-2 rounded-lg
                bg-gradient-to-r from-teal-400 to-blue-500 text-white
                shadow-md hover:shadow-lg hover:scale-105
                transition-all
              "
            >
              Add
            </button>
          </div>

          {/* TAG LIST */}
          <div className="flex flex-wrap gap-2">
            {entry.tag
              ?.split(",")
              .filter((t) => t.trim())
              .map((tag, idx) => (
                <span
                  key={idx}
                  className="
                    px-3 py-1 rounded-full text-sm flex items-center gap-1
                    bg-teal-500/10 dark:bg-teal-400/10
                    text-teal-700 dark:text-teal-300
                    border border-teal-500/20
                  "
                >
                  #{tag.trim()}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
          </div>
        </div>

        {/* PRICE (only sell) */}
        {uploadType === "sell" && (
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              Price (₹) *
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                ₹
              </span>

              <input
                type="number"
                value={entry.price}
                min="1"
                onChange={(e) => updateEntry(index, "price", e.target.value)}
                placeholder="0.00"
                className="
                  w-full pl-10 pr-4 py-3 rounded-xl
                  bg-white/60 dark:bg-gray-800/50 
                  border border-gray-200 dark:border-gray-700
                  text-gray-800 dark:text-gray-100
                  placeholder-gray-400 dark:placeholder-gray-500
                  shadow-inner
                  focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50
                "
              />
            </div>
          </div>
        )}

        {/* SPECIAL (only images) */}
        {(uploadType === "normal" || uploadType === "sell") && (
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200">
              <IoSparkles className="text-yellow-400" /> Special Features
            </label>

            <label className="flex items-center gap-3 bg-white/40 dark:bg-gray-800/40 p-3 rounded-xl border border-gray-200/40 dark:border-gray-700/40">
              <input
                type="checkbox"
                checked={entry.awards?.includes("featured")}
                onChange={() => handleSpecialToggle("featured")}
              />
              <span className="text-gray-800 dark:text-gray-200">
                This is a featured work
              </span>
            </label>

            <label className="flex items-center gap-3 bg-white/40 dark:bg-gray-800/40 p-3 rounded-xl border border-gray-200/40 dark:border-gray-700/40">
              <input
                type="checkbox"
                checked={entry.awards?.includes("award")}
                onChange={() => handleSpecialToggle("award")}
              />
              <span className="text-gray-800 dark:text-gray-200">
                Award-winning piece
              </span>
            </label>

            {(entry.awards?.includes("featured") ||
              entry.awards?.includes("award")) && (
              <div className="
                p-4 rounded-xl 
                bg-white/50 dark:bg-gray-800/40 
                border border-amber-400/30
              ">
                <label className="flex items-center gap-2 text-sm text-amber-500">
                  <IoAlertCircle /> Why is it special?
                </label>

                <input
                  type="text"
                  value={specialReason}
                  onChange={(e) => setSpecialReason(e.target.value)}
                  placeholder="Briefly explain..."
                  className="
                    w-full px-3 py-2 mt-2 rounded-lg
                    bg-white/60 dark:bg-gray-900/40
                    border border-gray-300 dark:border-gray-600
                    text-gray-800 dark:text-gray-100
                    placeholder-gray-400 dark:placeholder-gray-500
                    shadow-inner
                    focus:ring-2 focus:ring-teal-500/40
                  "
                />
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default DetailsStep;
