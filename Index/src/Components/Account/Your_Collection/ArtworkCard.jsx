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
      className="group relative bg-white dark:bg-zinc-950 rounded-xl overflow-hidden 
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
