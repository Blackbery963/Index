import React, { useState, useEffect, useRef } from "react";
import {
  IoChevronForward,
  IoChevronBack,
  IoImages,
  IoPricetag,
} from "react-icons/io5";

const config = {
  bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

const ImageCard = ({
  image,
  editingImage,
  editForm,
  handleEditChange,
  startEditing,
  // handleUpdate,
  // deleteImage,
  setEditingImage,
  isInitialized,
  getAllImageUrls,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // mediaLoaded => true when the currently displayed media is fully loaded (image onLoad or video onLoadedData)
  const [mediaLoaded, setMediaLoaded] = useState(false);
  // fallback to avoid stuck skeletons
  const fallbackTimerRef = useRef(null);
  // update and delete handlers come from parent
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (id) => {
  setIsUpdating(true);
  await yourUpdateLogic(id);
  setIsUpdating(false);
  };

  const deleteImage = async (id, fileId) => {
  setIsDeleting(true);
  await yourDeleteLogic(id, fileId);
  setIsDeleting(false);
  };



  // Build URL list - use provided helper if available, otherwise build from image.fileId
  const buildUrls = () => {
    try {
      const urls = getAllImageUrls ? getAllImageUrls(image) : [];
      if (Array.isArray(urls) && urls.length > 0) return urls;
    } catch (err) {
      // ignore and fallback
    }
    // fallback single URL (if fileId exists)
    if (image?.fileId) {
      return [
        `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${
          config.bucketId
        }/files/${image.fileId}/view?project=${
          import.meta.env.VITE_APPWRITE_PROJECT_ID
        }`,
      ];
    }
    return [];
  };

  const allImageUrls = buildUrls();
  const hasAdditionalImages = allImageUrls.length > 1;
  const isForSale = !!image?.price;

  // Safely get main url
  const mainImageUrl = allImageUrls[0] || "";

  // navigation helpers
  const nextImage = () => {
    if (allImageUrls.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % allImageUrls.length);
  };

  const prevImage = () => {
    if (allImageUrls.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + allImageUrls.length) % allImageUrls.length);
  };

  const goToImage = (index) => {
    if (index < 0 || index >= allImageUrls.length) return;
    setCurrentImageIndex(index);
  };

  // whenever index or image changes, reset mediaLoaded and start fallback timer
  useEffect(() => {
    setMediaLoaded(false);

    // clear any existing timer
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
    }

    // If there is no media (empty URL), mark as loaded so skeleton doesn't hang
    if (!allImageUrls[currentImageIndex]) {
      // small delay to preserve UX consistency (so skeleton shows briefly)
      fallbackTimerRef.current = setTimeout(() => setMediaLoaded(true), 200);
      return () => clearTimeout(fallbackTimerRef.current);
    }

    // fallback: if media doesn't load within 8s, stop skeleton to avoid stuck UI
    fallbackTimerRef.current = setTimeout(() => {
      setMediaLoaded(true);
    }, 8000);

    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImageIndex, image?.fileId]);

  // handlers for successful load / error
  const handleMediaLoaded = () => {
    // clear fallback timer and reveal media
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    setMediaLoaded(true);
  };

  const handleMediaError = () => {
    // treat as loaded to reveal fallback UI
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    setMediaLoaded(true);
  };

  return (
    <div className=" backdrop-blur-xl p-2 rounded-md shadow-lg border border-white/40 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      {/* ------------------ EDIT MODE ------------------ */}
      {editingImage === image.$id ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => handleEditChange("title", e.target.value)}
            placeholder="Title"
            className="w-full p-3 bg-white/40 dark:bg-gray-700/40 backdrop-blur-lg border border-white/50 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 font-Playfair"
          />

          <textarea
            value={editForm.description}
            onChange={(e) => handleEditChange("description", e.target.value)}
            placeholder="Description"
            rows="3"
            className="w-full p-3 bg-white/40 dark:bg-gray-700/40 backdrop-blur-lg border border-white/50 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 font-Playfair"
          />

          <input
            type="text"
            value={editForm.tag}
            onChange={(e) => handleEditChange("tag", e.target.value)}
            placeholder="Tag"
            className="w-full p-3 bg-white/40 dark:bg-gray-700/40 backdrop-blur-lg border border-white/50 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 font-Playfair"
          />

          <input
            type="text"
            value={editForm.awards}
            onChange={(e) => handleEditChange("awards", e.target.value)}
            placeholder="Awards & Recognition"
            className="w-full p-3 bg-white/40 dark:bg-gray-700/40 backdrop-blur-lg border border-white/50 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 font-Playfair"
          />

          <input
            type="number"
            value={editForm.price}
            onChange={(e) => handleEditChange("price", e.target.value)}
            placeholder="Price (INR)"
            className="w-full p-3 bg-white/40 dark:bg-gray-700/40 backdrop-blur-lg border border-white/50 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 font-Playfair"
          />

          <div className="flex gap-2">
            <button
              onClick={() => handleUpdate(image.$id)}
              className="flex-1 p-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-Playfair"
            >
              Save
            </button>

            <button
              onClick={() => setEditingImage(null)}
              className="flex-1 p-3 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-xl hover:bg-gray-400 dark:hover:bg-gray-700 transition-all font-Playfair"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ------------------ VIEW MODE ------------------ */}

          <div className="relative mb-4 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
            {/* Skeleton overlay shown until mediaLoaded === true */}
            {!mediaLoaded && (
              <div className="absolute inset-0 z-20 animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
            )}

            {/* Display media */}
            {image.fileType === "video" ? (
              mainImageUrl ? (
                <video
                  className={`w-full h-48 object-cover transition-opacity duration-500 ${
                    mediaLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  controls
                  onLoadedData={handleMediaLoaded}
                  onError={handleMediaError}
                  src={mainImageUrl}
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center text-gray-600 dark:text-gray-300">
                  No video available
                </div>
              )
            ) : mainImageUrl ? (
              <img
                src={allImageUrls[currentImageIndex] || mainImageUrl}
                alt={image.title || "creation"}
                onLoad={handleMediaLoaded}
                onError={handleMediaError}
                className={`w-full h-48 object-cover transition-opacity duration-500 ${
                  mediaLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center text-gray-600 dark:text-gray-300">
                No image available
              </div>
            )}

            {/* BADGES (only show after media is revealed to avoid flicker) */}
            {hasAdditionalImages && mediaLoaded && (
              <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 z-30">
                <IoImages className="w-3 h-3" />
                {currentImageIndex + 1}/{allImageUrls.length}
              </div>
            )}

            {isForSale && mediaLoaded && (
              <div className="absolute top-2 left-2 bg-green-600/80 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 z-30">
                <IoPricetag className="w-3 h-3" /> ₹{image.price}
              </div>
            )}

            {/* SLIDER BUTTONS (only when we have more than one and media revealed) */}
            {hasAdditionalImages && mediaLoaded && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 z-30"
                >
                  <IoChevronBack className="w-4 h-4" />
                </button>

                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 z-30"
                >
                  <IoChevronForward className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* ---------- THUMBNAILS ---------- */}
          {hasAdditionalImages && (
            <div className="flex justify-center gap-2 mt-2 overflow-x-auto pb-1">
              {allImageUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => {
                    goToImage(index);
                  }}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-teal-500"
                      : "border-transparent hover:border-teal-300"
                  }`}
                >
                  {/* tiny thumbnail skeleton while it loads */}
                  <img
                    src={url}
                    className="w-full h-full object-cover"
                    alt={`thumb-${index}`}
                    onLoad={() => {}}
                    onError={() => {}}
                  />
                </button>
              ))}
            </div>
          )}

          {/* ---------- CONTENT ---------- */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-Playfair mt-3">
            {image.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            {image.description}
          </p>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            <span className="font-medium">Type:</span> {image.medium || "—"}
          </p>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            <span className="font-medium">Category:</span> {image.tag || "—"}
          </p>

          {image.awards && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              <span className="font-medium">Awards:</span> {image.awards}
            </p>
          )}

          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Uploaded on: {image.uploadDate ? new Date(image.uploadDate).toLocaleDateString() : "—"}
          </p>

          {/* ---------- BUTTONS ---------- */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => startEditing(image)}
              // disabled={!isInitialized}\
               disabled={isUpdating || isDeleting}
              className="flex-1 p-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-300 font-Playfair text-sm"
            >
              Edit
            </button>

            <button
              onClick={() => deleteImage(image.$id, image.fileId)}
              // disabled={!isInitialized}
               disabled={isUpdating || isDeleting}
              className="flex-1 p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 font-Playfair text-sm"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCard;
