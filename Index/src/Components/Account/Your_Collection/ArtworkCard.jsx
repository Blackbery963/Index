// // components/ArtworkCard.js
// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaRegEye, FaRegHeart, FaRegComment, FaEllipsisV } from 'react-icons/fa';
// import { PiShareFatLight } from 'react-icons/pi';
// import LikeButton from '../../../EngagementService/likeButton';
// import ShareButton from '../../../Share/ShareFunction';
// import DownloadService from '../../../Downloads/downloadService';
// import { AppwriteMedia } from './MediaComponents';

// export const ArtworkCard = ({ 
//   upload, 
//   activeTab, 
//   onImageClick, 
//   onMarkAsSold,
//   onEdit,
//   currentUserId 
// }) => {
//   const Tooltip = ({ content, children }) => (
//     <div className="relative group">
//       {children}
//       <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50">
//         {content}
//       </div>
//     </div>
//   );

//   const ActionButton = ({ icon, count, tooltip, onClick }) => (
//     <Tooltip content={tooltip}>
//       <button
//         onClick={onClick}
//         className="flex items-center gap-1 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
//       >
//         {icon}
//         <span className="text-xs">{count}</span>
//       </button>
//     </Tooltip>
//   );

//   return (
//     <motion.div
//       className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
//       whileHover={{ y: -4 }}
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Media Section */}
//       <div className="relative aspect-[4/3] overflow-hidden">
//         <AppwriteMedia
//           upload={upload}
//           className="w-full h-full"
//           onImageClick={onImageClick}
//         />
//       </div>

//       {/* Content Section */}
//       <div className="p-4">
//         {/* Title and Description */}
//         <div className="mb-3">
//           <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 text-sm mb-1">
//             {upload.title || "Untitled"}
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2">
//             {upload.description || "No description provided"}
//           </p>
//         </div>

//         {/* Awards */}
//         {upload.isAward && upload.awards.length > 0 && (
//           <div className="flex flex-wrap gap-1 mb-3">
//             {upload.awards.slice(0, 2).map((award, index) => (
//               <span
//                 key={index}
//                 className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs rounded-full font-medium"
//               >
//                 {award}
//               </span>
//             ))}
//             {upload.awards.length > 2 && (
//               <span className="text-xs text-gray-500">+{upload.awards.length - 2} more</span>
//             )}
//           </div>
//         )}

//         {/* Price and Date */}
//         <div className="flex justify-between items-center mb-3">
//           {upload.forSale ? (
//             <div>
//               <span className="text-lg font-bold text-green-600 dark:text-green-400">
//                 ₹{upload.price.toLocaleString()}
//               </span>
//               <div className="text-xs text-gray-500">{upload.formattedDate}</div>
//             </div>
//           ) : (
//             <span className="text-xs text-gray-500">{upload.formattedDate}</span>
//           )}
          
//           <ActionButton
//             icon={<FaRegEye />}
//             count={upload.viewCount || 0}
//             tooltip="Views"
//           />
//         </div>

//         {/* Engagement Actions */}
//         <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
//           <div className="flex gap-4">
//             <LikeButton targetId={upload.$id} targetType="artwork" />
//             <DownloadService artwork={upload} />
//             <ActionButton
//               icon={<FaRegComment />}
//               count={0}
//               tooltip="Comments"
//             />
//             <ShareButton artwork={upload} />
//           </div>
          
//           <button className="text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 p-1 transition-colors">
//             <FaEllipsisV size={12} />
//           </button>
//         </div>

//         {/* Sale Actions */}
//         {activeTab === "Sell" && currentUserId === upload.userId && (
//           <div className="mt-3 flex gap-2">
//             {upload.forSale ? (
//               <>
//                 <button
//                   onClick={() => onMarkAsSold(upload.$id)}
//                   className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
//                 >
//                   Mark as Sold
//                 </button>
//                 <button
//                   onClick={() => onEdit(upload.$id)}
//                   className="px-3 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
//                 >
//                   Edit
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => onEdit(upload.$id)}
//                 className="w-full px-3 py-2 text-sm bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-lg hover:from-violet-600 hover:to-violet-700 transition-all"
//               >
//                 Set Price
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// components/ArtworkCard.js
// components/ArtworkCard.js


// import React from "react";
// import { motion } from "framer-motion";
// import { FaRegEye, FaRegHeart, FaRegComment, FaEllipsisV } from "react-icons/fa";
// import { PiShareFatLight } from "react-icons/pi";
// import LikeButton from "../../../EngagementService/likeButton";
// import ShareButton from "../../../Share/ShareFunction";
// import DownloadService from "../../../Downloads/downloadService";
// import { AppwriteMedia } from "./MediaComponents";

// export const ArtworkCard = ({
//   upload,
//   activeTab,
//   onImageClick,
//   onMarkAsSold,
//   onEdit,
//   currentUserId,
// }) => {
//   // Tooltip Component
//   const Tooltip = ({ content, children }) => (
//     <div className="relative group">
//       {children}
//       <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50">
//         {content}
//       </div>
//     </div>
//   );

//   // Action Button Component
//   const ActionButton = ({ icon, count, tooltip, onClick }) => (
//     <Tooltip content={tooltip}>
//       <button
//         onClick={onClick}
//         className="flex items-center justify-center gap-1 h-7 px-2 
//                    text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 
//                    transition-colors"
//       >
//         <span className="text-base">{icon}</span>
//         {typeof count === "number" && (
//           <span className="text-xs leading-none">{count}</span>
//         )}
//       </button>
//     </Tooltip>
//   );

//   return (
//     <motion.div
//       className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300"
//       whileHover={{ y: -4 }}
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Media Section */}
//       <div className="relative aspect-square overflow-hidden">
//         <AppwriteMedia
//           upload={upload}
//           className="w-full h-full"
//           onImageClick={onImageClick}
//         />
//       </div>

//       {/* Content Section */}
//       <div className="p-4">
//         {/* Title and Description */}
//         <div className="mb-3">
//           <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 text-sm mb-1">
//             {upload.title || "Untitled"}
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2">
//             {upload.description || "No description provided"}
//           </p>
//         </div>

//         {/* Awards */}
//         {upload.isAward && upload.awards?.length > 0 && (
//           <div className="flex flex-wrap gap-1 mb-3">
//             {upload.awards.slice(0, 2).map((award, index) => (
//               <span
//                 key={index}
//                 className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs rounded-full font-medium"
//               >
//                 {award}
//               </span>
//             ))}
//             {upload.awards.length > 2 && (
//               <span className="text-xs text-gray-500">
//                 +{upload.awards.length - 2} more
//               </span>
//             )}
//           </div>
//         )}

//         {/* Price & Date */}
//         {/* <div className="flex justify-between items-center mb-3">
//           {upload.forSale ? (
//             <div>
//               <span className="text-lg font-bold text-green-600 dark:text-green-400">
//                 ₹{upload.price.toLocaleString()}
//               </span>
//               <div className="text-xs text-gray-500">{upload.formattedDate}</div>
//             </div>
//           ) : (
//             <span className="text-xs text-gray-500">{upload.formattedDate}</span>
//           )}
//         </div> */}
//         <div className="flex justify-between items-center mb-3">
//   {upload.forSale ? (
//     <div>
//       <span className="text-lg font-bold text-green-600 dark:text-green-400">
//         ₹{upload.price.toLocaleString()}
//       </span>
//       <div className="text-xs text-gray-500">{upload.formattedDate}</div>
//     </div>
//   ) : (
//     <span className="text-xs text-gray-500">{upload.formattedDate}</span>
//   )}

//   {/* Views here */}
//   <div className="flex items-center text-gray-500 gap-1">
//     <FaRegEye className="text-lg" />
//     <span className="text-xs">{upload.viewCount || 0}</span>
//   </div>
// </div>


//         {/* Engagement Actions */}
//         <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
//           <div className="flex items-center gap-4">
//             <LikeButton targetId={upload.$id} targetType="artwork" />
//             <DownloadService artwork={upload} />
//             <ActionButton icon={<FaRegComment />} count={0} tooltip="Comments" />
//             <ShareButton artwork={upload} />
//             {/* <ActionButton
//               icon={<FaRegEye />}
//               count={upload.viewCount || 0}
//               tooltip="Views"
//             /> */}
//           </div>


//         </div>

//         {/* Sale Actions */}
//         {activeTab === "Sell" && currentUserId === upload.userId && (
//           <div className="mt-3 flex gap-2">
//             {upload.forSale ? (
//               <>
//                 <button
//                   onClick={() => onMarkAsSold(upload.$id)}
//                   className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
//                 >
//                   Mark as Sold
//                 </button>
//                 <button
//                   onClick={() => onEdit(upload.$id)}
//                   className="px-3 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
//                 >
//                   Edit
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => onEdit(upload.$id)}
//                 className="w-full px-3 py-2 text-sm bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-lg hover:from-violet-600 hover:to-violet-700 transition-all"
//               >
//                 Set Price
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

import React from "react";
import { motion } from "framer-motion";
import { FaRegEye, FaRegHeart, FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import LikeButton from "../../../EngagementService/likeButton";
import ShareButton from "../../../Share/ShareFunction";
import DownloadService from "../../../Downloads/downloadService";
import { AppwriteMedia } from "./MediaComponents";

export const ArtworkCard = ({
  upload,
  activeTab,
  onImageClick,
  onMarkAsSold,
  onEdit,
  currentUserId,
}) => {
  return (
    <motion.div
      className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden 
                 shadow hover:shadow-lg border border-gray-100 dark:border-gray-700 
                 transition-all duration-300 flex flex-col"
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Media */}
      <div className="relative aspect-square overflow-hidden">
        <AppwriteMedia
          upload={upload}
          className="w-full h-full object-cover"
          onImageClick={onImageClick}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4">
        {/* Title + Desc */}
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
            {upload.title || "Untitled"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2">
            {upload.description || "No description provided"}
          </p>
        </div>

        {/* Awards */}
        {upload.isAward && upload.awards?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {upload.awards.slice(0, 2).map((award, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[11px] bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full"
              >
                {award}
              </span>
            ))}
            {upload.awards.length > 2 && (
              <span className="text-xs text-gray-400">+{upload.awards.length - 2}</span>
            )}
          </div>
        )}

        {/* Price + Views */}
        <div className="flex items-center justify-between text-sm mb-3">
          {upload.forSale ? (
            <span className="font-semibold text-green-600 dark:text-green-400">
              ₹{upload.price.toLocaleString()}
            </span>
          ) : (
            <span className="text-xs text-gray-400">{upload.formattedDate}</span>
          )}

          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <FaRegEye className="text-sm" />
            <span className="text-xs">{upload.viewCount || 0}</span>
          </div>
        </div>

        {/* Actions */}
        {/* <div className="flex items-center justify-between border-t pt-2 mt-auto">
          <div className="flex items-center justify-between gap-4">
            <button>            <LikeButton targetId={upload.$id} targetType="artwork" /> </button>
            <button>            <DownloadService artwork={upload} />  </button>
            <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-violet-500 transition text-sm">
              <FaRegComment />
            </button>
            <button>            <ShareButton artwork={upload} />   </button>
          </div> 
        </div> */}
        {/* Actions */}
<div className="flex items-center justify-between border-t pt-2 mt-auto">
  <LikeButton targetId={upload.$id} targetType="artwork" />
  <DownloadService artwork={upload} />
  <button className="text-gray-500 dark:text-gray-400 hover:text-violet-500 transition text-sm">
    <FaRegComment />
  </button>
  <ShareButton artwork={upload} />
</div>


        {/* Sell Section */}
        {activeTab === "Sell" && currentUserId === upload.userId && (
          <div className="mt-3 flex gap-2">
            {upload.forSale ? (
              <>
                <button
                  onClick={() => onMarkAsSold(upload.$id)}
                  className="flex-1 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700"
                >
                  Mark as Sold
                </button>
                <button
                  onClick={() => onEdit(upload.$id)}
                  className="px-3 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={() => onEdit(upload.$id)}
                className="w-full py-2 text-sm bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-lg hover:from-violet-600 hover:to-violet-700"
              >
                Set Price
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
