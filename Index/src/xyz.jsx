 import React from 'react'
 
 function Xyz() {
    return (
      <>
        <div className="relative w-full flex flex-col items-center justify-center mt-[100px]">
        {/* Profile image */}
        
         <div
            className="mx-auto rounded-full absolute border-[5px] border-white flex items-center justify-center bg-black overflow-hidden "
        style={{
        width: "clamp(250px, 18vw, 280px)",
        height: "clamp(250px, 18vw, 280px)",
        top: "-90%",
    }}
>
    {/* Profile Image */}
    {profileImage ? (
        <img
            src={profileImage}
            alt="Uploaded"
            className="w-full h-full object-cover"
        />
    ) : (
        <span className="text-white font-serif">No Image</span>
    )}

    {/* Upload Button */}
    <input
        type="file"
        accept="image/*"
        onChange={handleProfileImageUpload}
        className="hidden"
        id="upload"
    />
    
   
</div>
{/* the button for uploading */}
<div className=' absolute lg:left-[56%] md:left-[60%] sm:left-[65%] left-[75%] top-[30%] px-2 py-1 rounded-md'>
  <label
        htmlFor="upload"
        className="absolute bottom-4 right-4 translate-x-1/2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700 px-2 py-1"
        style={{ zIndex: 50, backdropFilter: "blur(5px)", opacity: 1 }}
    >
        {profileImage ? "Edit" : "Upload"}
    </label></div>
</div>
  

 <div className="h-full lg:w-[60%] sm:w-[80%] w-[95%] bg-black/20 rounded-xl border border-[#fc8e97be] flex flex-col items-center p-6 gap-4">

 {/* Title */}
 <div className="w-full flex flex-col gap-1">
   <h1 className="text-white font-semibold">Title</h1>
   <input
     className="h-10 lg:w-[60%] md:w-[75%] sm:w-[85%] w-[90%] px-3 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fc8e97]"
     placeholder="Enter the title of the artwork"
     type="text"
   />
 </div>
 
 {/* Description */}
 <div className="w-full flex flex-col gap-1">
   <h1 className="text-white font-semibold">Description</h1>
   <textarea
     className="h-20 lg:w-[60%] md:w-[75%] sm:w-[85%] w-[90%] px-3 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fc8e97] resize-none"
     placeholder="Enter a short description..."
   />
 </div>
 
 {/* Tags */}
 <div className="w-full flex flex-col gap-1">
   <h1 className="text-white font-semibold">Tags</h1>
   <select
     className="h-10 lg:w-[60%] md:w-[75%] sm:w-[85%] w-[90%] px-3 border border-gray-500 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#fc8e97] cursor-pointer"
   >
     <option value="" disabled selected hidden>Choose a tag...</option>
     <option className="bg-[#990931] text-white">#Abstract</option>
     <option className="bg-[#990931] text-white">#Landscape</option>
     <option className="bg-[#990931] text-white">#Portrait</option>
     <option className="bg-[#990931] text-white">#Surrealism</option>
   </select>
 </div>
 
 {/* Submit Button */}
 <div className="flex justify-center w-full">
   <button className="px-6 py-2 border border-gray-500 rounded-md text-white bg-[#fc8e97] hover:bg-[#d75b6b] transition-colors duration-200">
     Submit
   </button>
 </div>
 
 </div>
 </div>
 <main className="flex-1 flex items-center justify-center pt-[120px] px-4">
        <motion.div
          className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold font-Eagle text-gray-800 mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Profile Fields */}
            <div>
              <label className="block text-gray-700 font-Playfair mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-Playfair mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-Playfair mb-1">Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                placeholder="Tell us about yourself"
                rows="4"
              />
            </div>

            {/* Social Media Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-Playfair text-gray-800">Social Media</h3>
              {socialLinks.map((social) => (
                <div key={social.name}>
                  <label className=" text-gray-700 font-Playfair mb-1 flex items-center gap-2">
                    <social.icon className={`${social.color} text-xl`} />
                    {social.placeholder}
                  </label>
                  <input
                    type="text"
                    name={social.name}
                    value={profile[social.name]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${social.placeholder}`}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-700/80 hover:bg-blue-800/90 text-white font-Playfair font-bold rounded-md transition-colors"
            >
              Save Changes
            </button>
          </form>

          {/* Profile Preview */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold font-Playfair text-gray-800 mb-2">Profile Preview</h3>
            <div className="space-y-2">
              <p><strong>Username:</strong> {profile.username || 'Not set'}</p>
              <p><strong>Email:</strong> {profile.email || 'Not set'}</p>
              <p><strong>Bio:</strong> {profile.bio || 'Not set'}</p>
              <div className="flex gap-4 mt-2">
                {socialLinks.map((social) => (
                  profile[social.name] && (
                    <a
                      key={social.name}
                      href={`https://${social.name}.com/${profile[social.name]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} hover:opacity-80`}
                    >
                      <social.icon className="text-2xl" />
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

     </>
 
 export default Xyz
 


















 // // import { useState, useEffect } from 'react';
 // // import { FiSearch, FiHeart, FiUserPlus, FiFilter, FiX, FiChevronLeft, FiChevronRight, FiAward, FiMenu } from 'react-icons/fi';
 // // import { FaPalette, FaBrush, FaDigitalTachograph, FaCamera } from 'react-icons/fa';
 // // import { Link } from 'react-router-dom';
 // // import { databases, account, storage, ID, Query } from '../../appwriteConfig';
 // // import { toast } from 'react-toastify';
 import FollowButton from '../../Follow/FollowButton';
 
 // // const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
 // // const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
 // // const IMAGE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
 // // const STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
 
 // // const userDiscoveryPage = () => {
 // //   // State
 // //   const [artists, setArtists] = useState([]);
 // //   const [awardedArtworks, setAwardedArtworks] = useState([]);
 // //   const [currentUser, setCurrentUser] = useState(null);
 // //   const [searchTerm, setSearchTerm] = useState('');
 // //   const [selectedCategories, setSelectedCategories] = useState([]);
 // //   const [selectedStyles, setSelectedStyles] = useState([]);
 // //   const [showFilters, setShowFilters] = useState(false);
 // //   const [selectedArtist, setSelectedArtist] = useState(null);
 // //   const [isSearchExpanded, setIsSearchExpanded] = useState(false);
 // //   const [isMenuOpen, setIsMenuOpen] = useState(false);
 // //   const [loading, setLoading] = useState(true);
 
 // //   // Categories and styles
 // //   const artCategories = [
 // //     { name: 'Digital Art', icon: <FaDigitalTachograph className="mr-2" /> },
 // //     { name: 'Painting', icon: <FaBrush className="mr-2" /> },
 // //     { name: 'Illustration', icon: <FaPalette className="mr-2" /> },
 // //     { name: 'Photography', icon: <FaCamera className="mr-2" /> },
 // //   ];
 
 // //   const artStyles = [
 // //     'Abstract', 'Realism', 'Surrealism', 'Minimalist',
 // //     'Pop Art', 'Cubism', 'Impressionism', 'Anime'
 // //   ];
 
 // //   // Fetch all data
 // //   useEffect(() => {
 // //     const fetchData = async () => {
 // //       try {
 // //         setLoading(true);
         
 // //         // Get current user session if exists
 // //         try {
 // //           const user = await account.get();
 // //           setCurrentUser(user);
 // //         } catch (error) {
 // //           console.log("No user logged in");
 // //         }
 
 // //         // Fetch awarded artworks with user data
 // //         await fetchAwardedArtworks();
         
 // //         // Fetch artists with their images
 // //         await fetchArtistsWithImages();
         
 // //       } catch (error) {
 // //         console.error("Error fetching data:", error);
 // //         toast.error("Failed to load data");
 // //       } finally {
 // //         setLoading(false);
 // //       }
 // //     };
 
 // //     fetchData();
 // //   }, []);
 
 // //   const fetchAwardedArtworks = async () => {
 // //     try {
 // //       // Fetch images that have awards
 // //       const awardedImagesResponse = await databases.listDocuments(
 // //         DATABASE_ID,
 // //         IMAGE_COLLECTION_ID,
 // //         [
 // //           Query.isNotNull('awards'),
 // //           Query.limit(6) // Limit to 6 award-winning artworks
 // //         ]
 // //       );
 
 // //       // Fetch user details for each awarded image
 // //       const artworksWithUserData = await Promise.all(
 // //         awardedImagesResponse.documents.map(async (image) => {
 // //           try {
 // //             const userResponse = await databases.getDocument(
 // //               DATABASE_ID,
 // //               USER_COLLECTION_ID,
 // //               image.userId
 // //             );
             
 // //             return {
 // //               ...image,
 // //               user: {
 // //                 id: userResponse.$id,
 // //                 name: userResponse.name,
 // //                 username: userResponse.username,
 // //                 avatar: userResponse.avatar,
 // //                 categories: userResponse.categories,
 // //                 styles: userResponse.styles
 // //               }
 // //             };
 // //           } catch (error) {
 // //             console.error(`Error fetching user for image ${image.$id}:`, error);
 // //             return null; // Skip this artwork if user fetch fails
 // //           }
 // //         })
 // //       );
 
 // //       // Filter out any null values from failed user fetches
 // //       setAwardedArtworks(artworksWithUserData.filter(artwork => artwork !== null));
 // //     } catch (error) {
 // //       console.error("Error fetching awarded artworks:", error);
 // //       toast.error("Failed to load award-winning artworks");
 // //     }
 // //   };
 
 // //   const fetchArtistsWithImages = async () => {
 // //     try {
 // //       // Fetch artists
 // //       const artistsResponse = await databases.listDocuments(
 // //         DATABASE_ID,
 // //         USER_COLLECTION_ID,
 // //         [Query.orderDesc('$createdAt'), Query.limit(12)]
 // //       );
 
 // //       // Fetch images for each artist
 // //       const artistsWithImages = await Promise.all(
 // //         artistsResponse.documents.map(async (artist) => {
 // //           const imagesResponse = await databases.listDocuments(
 // //             DATABASE_ID,
 // //             IMAGE_COLLECTION_ID,
 // //             [Query.equal('userId', artist.$id), Query.limit(3)]
 // //           );
 
 // //           return {
 // //             ...artist,
 // //             images: imagesResponse.documents
 // //           };
 // //         })
 // //       );
 
 // //       setArtists(artistsWithImages);
 // //     } catch (error) {
 // //       console.error("Error fetching artists:", error);
 // //       throw error;
 // //     }
 // //   };
 
 // //   // Get image preview URL
 // // const getImageUrl = (fileId) => {
 // //   if (!fileId) return null; // or a placeholder image URL
 // //   return storage.getFilePreview(STORAGE_BUCKET_ID, fileId);
 // // };
 
 // //   // Filter artists based on search and filters
 // //   const filteredArtists = artists.filter(artist => {
 // //     // const matchesSearch = artist.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
 // //     //                      artist.username.toLowerCase().includes(searchTerm.toLowerCase());
     
 // //     const matchesCategories = selectedCategories.length === 0 || 
 // //                             artist.categories?.some(cat => selectedCategories.includes(cat));
     
 // //     const matchesStyles = selectedStyles.length === 0 || 
 // //                          artist.styles?.some(style => selectedStyles.includes(style));
     
 // //     return  matchesCategories && matchesStyles;
 // //   });
 
 // //   // Render loading state
 // //   if (loading) {
 // //     return (
 // //       <div className="min-h-screen flex items-center justify-center">
 // //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
 // //       </div>
 // //     );
 // //   }
 
 // //   return (
 // //     <div className="min-h-screen bg-gray-50 text-gray-900">
 // //       {/* Header */}
 // //       <header className="bg-white/80 backdrop-blur-md shadow-sm py-4 px-4 sticky top-0 z-10">
 // //         <div className="max-w-7xl mx-auto flex items-center justify-between">
 // //           <Link to="/" className="text-xl font-bold text-indigo-600">
 // //             ArtVerse
 // //           </Link>
 
 // //           {/* Desktop Search */}
 // //           <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
 // //             <div className="relative w-full">
 // //               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
 // //               <input
 // //                 type="text"
 // //                 placeholder="Search artists..."
 // //                 className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
 // //                 value={searchTerm}
 // //                 onChange={(e) => setSearchTerm(e.target.value)}
 // //               />
 // //             </div>
 // //             <button
 // //               onClick={() => setShowFilters(!showFilters)}
 // //               className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
 // //             >
 // //               <FiFilter />
 // //               <span>Filters</span>
 // //             </button>
 // //           </div>
 
 // //           {/* Mobile Menu */}
 // //           <div className="md:hidden flex items-center gap-2">
 // //             <button
 // //               onClick={() => setIsSearchExpanded(!isSearchExpanded)}
 // //               className="p-2 text-gray-600 hover:text-indigo-600"
 // //             >
 // //               <FiSearch size={20} />
 // //             </button>
 // //             <button
 // //               onClick={() => setIsMenuOpen(!isMenuOpen)}
 // //               className="p-2 text-gray-600 hover:text-indigo-600"
 // //             >
 // //               <FiMenu size={20} />
 // //             </button>
 // //           </div>
 // //         </div>
 
 // //         {/* Expanded Mobile Search */}
 // //         {isSearchExpanded && (
 // //           <div className="mt-2 md:hidden">
 // //             <div className="relative">
 // //               <input
 // //                 type="text"
 // //                 placeholder="Search artists..."
 // //                 className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
 // //                 value={searchTerm}
 // //                 onChange={(e) => setSearchTerm(e.target.value)}
 // //               />
 // //               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
 // //             </div>
 // //           </div>
 // //         )}
 // //       </header>
 
 // //       {/* Main Content */}
 // //       <main className="max-w-7xl mx-auto py-8 px-4">
 // //         {/* Award-Winning Artworks Section */}
 // //         {awardedArtworks.length > 0 && (
 // //           <section className="mb-12">
 // //             <div className="flex justify-between items-center mb-6">
 // //               <h2 className="text-2xl font-semibold">Award-Winning Artworks</h2>
 // //               <Link to="/awards" className="text-indigo-600 hover:underline">
 // //                 View all awards
 // //               </Link>
 // //             </div>
 // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 // //               {awardedArtworks.map((artwork) => (
 // //                 <div key={artwork.$id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
 // //                   <Link to={`/artwork/${artwork.$id}`} className="block relative h-64 bg-gray-100">
 // //                     <img
 // //                       src={getImageUrl(artwork.fileId)}
 // //                       alt={artwork.title}
 // //                       className="w-full h-full object-cover"
 // //                     />
 // //                     <div className="absolute top-3 right-3 bg-yellow-400 text-white p-2 rounded-full shadow-md">
 // //                       <FiAward size={18} />
 // //                     </div>
 // //                   </Link>
 // //                   <div className="p-4">
 // //                     <h3 className="font-bold text-lg mb-1">{artwork.title}</h3>
 // //                     {artwork.user && (
 // //                       <Link 
 // //                         to={`/artist/${artwork.user.username}`} 
 // //                         className="flex items-center gap-2 text-indigo-600 hover:underline mb-3"
 // //                       >
 // //                         {artwork.user.avatar ? (
 // //                           <img 
 // //                             src={getImageUrl(artwork.user.avatar)} 
 // //                             alt={artwork.user.name}
 // //                             className="w-6 h-6 rounded-full object-cover"
 // //                           />
 // //                         ) : (
 // //                           <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">
 // //                             {artwork.username}
 // //                           </div>
 // //                         )}
 // //                         <span>@{artwork.user.username}</span>
 // //                       </Link>
 // //                     )}
 // //                     {artwork.awards && (
 // //                       <div className="mt-2">
 // //                         <p className="text-sm font-medium text-gray-700">Awards:</p>
 // //                         <ul className="text-xs text-gray-600 space-y-1 mt-1">
 // //                           {artwork.awards.map((award, index) => (
 // //                             <li key={index} className="flex items-center">
 // //                               <FiAward className="mr-1 text-yellow-500" size={12} />
 // //                               {award}
 // //                             </li>
 // //                           ))}
 // //                         </ul>
 // //                       </div>
 // //                     )}
 // //                   </div>
 // //                 </div>
 // //               ))}
 // //             </div>
 // //           </section>
 // //         )}
 
 // //         {/* Filters Panel */}
 // //         {showFilters && (
 // //           <div className="bg-white p-6 rounded-xl shadow-md mb-8">
 // //             <div className="flex justify-between items-center mb-4">
 // //               <h2 className="text-lg font-semibold">Filter Artists</h2>
 // //               <button 
 // //                 onClick={() => setShowFilters(false)}
 // //                 className="text-gray-500 hover:text-gray-700"
 // //               >
 // //                 <FiX size={20} />
 // //               </button>
 // //             </div>
             
 // //             <div className="space-y-6">
 // //               <div>
 // //                 <h3 className="font-medium mb-2">Art Categories</h3>
 // //                 <div className="flex flex-wrap gap-2">
 // //                   {artCategories.map(category => (
 // //                     <button
 // //                       key={category.name}
 // //                       onClick={() => {
 // //                         if (selectedCategories.includes(category.name)) {
 // //                           setSelectedCategories(selectedCategories.filter(c => c !== category.name));
 // //                         } else {
 // //                           setSelectedCategories([...selectedCategories, category.name]);
 // //                         }
 // //                       }}
 // //                       className={`px-3 py-1 rounded-full text-sm flex items-center ${
 // //                         selectedCategories.includes(category.name)
 // //                           ? 'bg-indigo-600 text-white'
 // //                           : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
 // //                       }`}
 // //                     >
 // //                       {category.icon}
 // //                       {category.name}
 // //                     </button>
 // //                   ))}
 // //                 </div>
 // //               </div>
               
 // //               <div>
 // //                 <h3 className="font-medium mb-2">Art Styles</h3>
 // //                 <div className="flex flex-wrap gap-2">
 // //                   {artStyles.map(style => (
 // //                     <button
 // //                       key={style}
 // //                       onClick={() => {
 // //                         if (selectedStyles.includes(style)) {
 // //                           setSelectedStyles(selectedStyles.filter(s => s !== style));
 // //                         } else {
 // //                           setSelectedStyles([...selectedStyles, style]);
 // //                         }
 // //                       }}
 // //                       className={`px-3 py-1 rounded-full text-sm ${
 // //                         selectedStyles.includes(style)
 // //                           ? 'bg-indigo-600 text-white'
 // //                           : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
 // //                       }`}
 // //                     >
 // //                       {style}
 // //                     </button>
 // //                   ))}
 // //                 </div>
 // //               </div>
               
 // //               {(selectedCategories.length > 0 || selectedStyles.length > 0) && (
 // //                 <button 
 // //                   onClick={() => {
 // //                     setSelectedCategories([]);
 // //                     setSelectedStyles([]);
 // //                   }}
 // //                   className="text-indigo-600 text-sm font-medium hover:underline"
 // //                 >
 // //                   Clear all filters
 // //                 </button>
 // //               )}
 // //             </div>
 // //           </div>
 // //         )}
 
 // //         {/* Artist List */}
 // //         {!selectedArtist ? (
 // //           <>
 // //             <div className="flex justify-between items-center mb-6">
 // //               <h2 className="text-2xl font-semibold">
 // //                 {filteredArtists.length === artists.length 
 // //                   ? 'Featured Artists' 
 // //                   : `Filtered Artists (${filteredArtists.length})`}
 // //               </h2>
 // //               {filteredArtists.length !== artists.length && (
 // //                 <button 
 // //                   onClick={() => {
 // //                     setSearchTerm('');
 // //                     setSelectedCategories([]);
 // //                     setSelectedStyles([]);
 // //                   }}
 // //                   className="text-indigo-600 hover:underline"
 // //                 >
 // //                   Reset filters
 // //                 </button>
 // //               )}
 // //             </div>
             
 // //             {filteredArtists.length === 0 ? (
 // //               <div className="text-center py-12 bg-white rounded-xl shadow-sm">
 // //                 <p className="text-gray-500 mb-4">No artists match your search criteria.</p>
 // //                 <button 
 // //                   onClick={() => {
 // //                     setSearchTerm('');
 // //                     setSelectedCategories([]);
 // //                     setSelectedStyles([]);
 // //                   }}
 // //                   className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
 // //                 >
 // //                   Reset filters
 // //                 </button>
 // //               </div>
 // //             ) : (
 // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 // //                 {filteredArtists.map(artist => (
 // //                   <div 
 // //                     key={artist.$id} 
 // //                     className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
 // //                     onClick={() => setSelectedArtist(artist)}
 // //                   >
 // //                     <div className="relative h-48 bg-gray-100">
 // //                       {artist.images.length > 0 ? (
 // //                         <img 
 // //                           src={getImageUrl(artist.images[0].fileId)} 
 // //                           alt={artist.images[0].title}
 // //                           className="w-full h-full object-cover"
 // //                         />
 // //                       ) : (
 // //                         <div className="w-full h-full flex items-center justify-center text-gray-400">
 // //                           <FaPalette size={48} />
 // //                         </div>
 // //                       )}
 // //                       <div className="absolute bottom-2 left-2 flex">
 // //                         {artist.images.slice(0, 3).map((image, index) => (
 // //                           <div 
 // //                             key={index} 
 // //                             className="w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden"
 // //                             style={{ marginLeft: index > 0 ? '-8px' : '0' }}
 // //                           >
 // //                             {image.imageId && (
 // //                               <img 
 // //                                 src={getImageUrl(image.fileId)} 
 // //                                 alt="" 
 // //                                 className="w-full h-full object-cover"
 // //                               />
 // //                             )}
 // //                           </div>
 // //                         ))}
 // //                       </div>
 // //                     </div>
                     
 // //                     <div className="p-4">
 // //                       <div className="flex justify-between items-start mb-2">
 // //                         <div>
 // //                           <h3 className="text-lg font-bold">{artist.username}</h3>
 // //                           <p className="text-indigo-600 text-sm">@{artist.nickname}</p>
 // //                         </div>
 // //                         {currentUser && currentUser.$id !== artist.$id && (
 // //                           <FollowButton targetUserId={artist.$id} />
 // //                         )}
 // //                       </div>
                       
 // //                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">
 // //                         {artist.bio || 'No bio available'}
 // //                       </p>
                       
 // //                       <div className="flex justify-between items-center text-sm text-gray-500">
 // //                         <span>{artist.followerCount || 0} followers</span>
 // //                         <span>{artist.images.length} artworks</span>
 // //                       </div>
 // //                     </div>
 // //                   </div>
 // //                 ))}
 // //               </div>
 // //             )}
 // //           </>
 // //         ) : (
 // //           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
 // //             <button 
 // //               onClick={() => setSelectedArtist(null)}
 // //               className="flex items-center gap-2 text-indigo-600 p-4 hover:underline"
 // //             >
 // //               <FiChevronLeft />
 // //               <span>Back to artists</span>
 // //             </button>
             
 // //             <div className="px-6 pb-6">
 // //               <div className="flex flex-col md:flex-row gap-8">
 // //                 {/* Artist Info */}
 // //                 <div className="md:w-1/3">
 // //                   <div className="flex items-center gap-4 mb-6">
 // //                     {selectedArtist.avatar ? (
 // //                       <img 
 // //                         src={getImageUrl(selectedArtist.avatar)} 
 // //                         alt={selectedArtist.username}
 // //                         className="w-20 h-20 rounded-full object-cover"
 // //                       />
 // //                     ) : (
 // //                       <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl">
 // //                         {selectedArtist.name.charAt(0)}
 // //                       </div>
 // //                     )}
 // //                     <div>
 // //                       <h2 className="text-2xl font-bold">{selectedArtist.username}</h2>
 // //                       <p className="text-indigo-600">@{selectedArtist.nickname}</p>
 // //                     </div>
 // //                   </div>
                   
 // //                   {currentUser && currentUser.$id !== selectedArtist.$id && (
 // //                     <div className="mb-6">
 // //                       <FollowButton targetUserId={selectedArtist.$id} />
 // //                     </div>
 // //                   )}
                   
 // //                   <p className="text-gray-700 mb-6 whitespace-pre-line">
 // //                     {selectedArtist.bio || 'No bio available'}
 // //                   </p>
                   
 // //                   <div className="space-y-4">
 // //                     {selectedArtist.categories && selectedArtist.categories.length > 0 && (
 // //                       <div>
 // //                         <h3 className="font-medium mb-2">Art Categories</h3>
 // //                         <div className="flex flex-wrap gap-2">
 // //                           {selectedArtist.categories.map(category => (
 // //                             <span 
 // //                               key={category} 
 // //                               className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
 // //                             >
 // //                               {category}
 // //                             </span>
 // //                           ))}
 // //                         </div>
 // //                       </div>
 // //                     )}
                     
 // //                     {selectedArtist.styles && selectedArtist.styles.length > 0 && (
 // //                       <div>
 // //                         <h3 className="font-medium mb-2">Art Styles</h3>
 // //                         <div className="flex flex-wrap gap-2">
 // //                           {selectedArtist.styles.map(style => (
 // //                             <span 
 // //                               key={style} 
 // //                               className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
 // //                             >
 // //                               {style}
 // //                             </span>
 // //                           ))}
 // //                         </div>
 // //                       </div>
 // //                     )}
                     
 // //                     <div className="pt-4 border-t border-gray-200">
 // //                       <h3 className="font-medium mb-2">Stats</h3>
 // //                       <div className="flex gap-4 text-sm">
 // //                         <span>{selectedArtist.followerCount || 0} followers</span>
 // //                         <span>{selectedArtist.images.length} artworks</span>
 // //                       </div>
 // //                     </div>
 // //                   </div>
 // //                 </div>
                 
 // //                 {/* Artist Gallery */}
 // //                 <div className="md:w-2/3">
 // //                   <h3 className="text-xl font-bold mb-4">Art Gallery</h3>
                   
 // //                   {selectedArtist.images.length === 0 ? (
 // //                     <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
 // //                       No artworks available yet
 // //                     </div>
 // //                   ) : (
 // //                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      //  {selectedArtist.images.map(artwork => (
                      //    <Link 
                      //      key={artwork.$id} 
                      //      to={`/artwork/${artwork.$id}`}
                      //      className="group relative rounded-lg overflow-hidden"
                      //    >
                      //      <img 
                      //        src={getImageUrl(artwork.fileId)} 
                      //        alt={artwork.title}
                      //        className="w-full h-48 sm:h-56 object-cover"
                      //      />
                      //      <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition">
                      //        <h4 className="text-white font-medium">{artwork.title}</h4>
                      //        {artwork.awards && artwork.awards.length > 0 && (
                      //          <div className="flex items-center mt-1 text-yellow-300 text-sm">
                      //            <FiAward className="mr-1" />
                      //            <span>Award Winner</span>
                      //          </div>
                      //        )}
 // //                           </div>
 // //                         </Link>
 // //                       ))}
 // //                     </div>
 // //                   )}
 // //                 </div>
 // //               </div>
 // //             </div>
 // //           </div>
 // //         )}
 // //       </main>
 // //     </div>
 // //   );
 // // };
 
 // // export default userDiscoveryPage;
 
 
 
 
 import { useState, useEffect } from 'react';
 import { FiChevronLeft, FiAward, FiHeart, FiShare2, FiFilter, FiSearch, FiX } from 'react-icons/fi';
 import { Link } from 'react-router-dom';
 import { databases, storage, Query } from '../../appwriteConfig';
 import { toast } from 'react-toastify';
 
 const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
 const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
 const IMAGE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
 const STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
 
 const UserDiscoveryPage = () => {
   const [awardedArtworks, setAwardedArtworks] = useState([]);
   const [selectedArtist, setSelectedArtist] = useState(null);
   const [artistCollection, setArtistCollection] = useState([]);
   const [loading, setLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState('');
   const [showFilters, setShowFilters] = useState(false);
   const [selectedCategories, setSelectedCategories] = useState([]);
   const [sortBy, setSortBy] = useState('latest');
 
   const categories = ['Digital', 'Painting', 'Photography', 'Sculpture', 'Mixed Media'];
 
   useEffect(() => {
     const fetchAwardedArtworks = async () => {
       try {
         setLoading(true);
         let queries = [Query.isNotNull('awards'), Query.limit(12)];
         
         // Add sorting
         if (sortBy === 'latest') {
           queries.push(Query.orderDesc('$createdAt'));
         } else if (sortBy === 'popular') {
           queries.push(Query.orderDesc('views'));
         }
 
         // Add category filter
         if (selectedCategories.length > 0) {
           queries.push(Query.equal('category', selectedCategories));
         }
 
         const awardedImagesResponse = await databases.listDocuments(
           DATABASE_ID,
           IMAGE_COLLECTION_ID,
           queries
         );
 
         const artworksWithUserData = await Promise.all(
           awardedImagesResponse.documents.map(async (image) => {
             try {
               const userResponse = await databases.getDocument(
                 DATABASE_ID,
                 USER_COLLECTION_ID,
                 image.userId
               );
               return {
                 ...image,
                 user: {
                   id: userResponse.$id,
                   name: userResponse.name,
                   username: userResponse.username,
                   avatar: userResponse.avatar,
                   bio: userResponse.bio,
                   followers: userResponse.followers || 0
                 }
               };
             } catch (error) {
               console.error(`Error fetching user for image ${image.$id}:`, error);
               return null;
             }
           })
         );
 
         // Filter by search term if present
         const filteredArtworks = artworksWithUserData.filter(artwork => {
           if (!artwork) return false;
           if (!searchTerm) return true;
           return artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  artwork.user.username.toLowerCase().includes(searchTerm.toLowerCase());
         });
 
         setAwardedArtworks(filteredArtworks);
       } catch (error) {
         console.error("Error fetching awarded artworks:", error);
         toast.error("Failed to load artworks");
       } finally {
         setLoading(false);
       }
     };
 
     fetchAwardedArtworks();
   }, [searchTerm, selectedCategories, sortBy]);
 
   const fetchArtistCollection = async (userId) => {
     try {
       setLoading(true);
       const imagesResponse = await databases.listDocuments(
         DATABASE_ID,
         IMAGE_COLLECTION_ID,
         [Query.equal('userId', userId), Query.orderDesc('$createdAt')]
       );
       setArtistCollection(imagesResponse.documents);
     } catch (error) {
       console.error("Error fetching artist collection:", error);
       toast.error("Failed to load artist collection");
     } finally {
       setLoading(false);
     }
   };
 
   const getImageUrl = (fileId) => {
     if (!fileId) return 'https://via.placeholder.com/150';
     return storage.getFilePreview(STORAGE_BUCKET_ID, fileId);
   };
 
   const handleShare = async (artworkId) => {
     try {
       await navigator.clipboard.writeText(`${window.location.origin}/artwork/${artworkId}`);
       toast.success('Link copied to clipboard!');
     } catch (error) {
       toast.error('Failed to copy link');
     }
   };
 
   if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-gray-50">
       <header className="bg-white shadow-sm sticky top-0 z-10">
         <div className="max-w-7xl mx-auto px-6 py-4">
           <div className="flex justify-between items-center">
             <Link to="/" className="text-2xl font-bold text-indigo-600">
               ArtVerse
             </Link>
             
             {!selectedArtist && (
               <div className="flex items-center gap-4">
                 <div className="relative hidden md:block">
                   <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                   <input
                     type="text"
                     placeholder="Search artworks or artists..."
                     className="w-64 py-2 px-4 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                   />
                 </div>
                 <button
                   onClick={() => setShowFilters(!showFilters)}
                   className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                 >
                   <FiFilter />
                   <span className="hidden sm:inline">Filters</span>
                 </button>
               </div>
             )}
           </div>
         </div>
       </header>
 
       <main className="max-w-7xl mx-auto px-6 py-8">
         {showFilters && !selectedArtist && (
           <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-lg font-semibold">Filter Options</h2>
               <button 
                 onClick={() => setShowFilters(false)}
                 className="text-gray-500 hover:text-gray-700"
               >
                 <FiX size={20} />
               </button>
             </div>
             
             <div className="space-y-6">
               <div>
                 <h3 className="text-sm font-medium mb-3 text-gray-700">Sort By</h3>
                 <div className="flex flex-wrap gap-3">
                   <button
                     onClick={() => setSortBy('latest')}
                     className={`px-4 py-2 rounded-lg text-sm ${
                       sortBy === 'latest' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                     }`}
                   >
                     Latest
                   </button>
                   <button
                     onClick={() => setSortBy('popular')}
                     className={`px-4 py-2 rounded-lg text-sm ${
                       sortBy === 'popular' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                     }`}
                   >
                     Most Popular
                   </button>
                 </div>
               </div>
               
               <div>
                 <h3 className="text-sm font-medium mb-3 text-gray-700">Categories</h3>
                 <div className="flex flex-wrap gap-2">
                   {categories.map(category => (
                     <button
                       key={category}
                       onClick={() => {
                         if (selectedCategories.includes(category)) {
                           setSelectedCategories(selectedCategories.filter(c => c !== category));
                         } else {
                           setSelectedCategories([...selectedCategories, category]);
                         }
                       }}
                       className={`px-3 py-1.5 rounded-lg text-xs ${
                         selectedCategories.includes(category)
                           ? 'bg-indigo-600 text-white'
                           : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                       }`}
                     >
                       {category}
                     </button>
                   ))}
                 </div>
               </div>
               
               {(selectedCategories.length > 0 || sortBy !== 'latest') && (
                 <button 
                   onClick={() => {
                     setSelectedCategories([]);
                     setSortBy('latest');
                   }}
                   className="text-indigo-600 text-sm font-medium hover:underline"
                 >
                   Reset all filters
                 </button>
               )}
             </div>
           </div>
         )}
 
         {!selectedArtist ? (
           <section>
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-3xl font-bold text-gray-900">Award-Winning Artworks</h2>
               <div className="relative md:hidden">
                 <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                 <input
                   type="text"
                   placeholder="Search..."
                   className="py-2 px-4 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
             </div>
 
             {awardedArtworks.length === 0 ? (
               <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                 <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                   <FiAward className="text-gray-400 text-2xl" />
                 </div>
                 <h3 className="text-lg font-medium text-gray-900 mb-2">No artworks found</h3>
                 <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                 <button
                   onClick={() => {
                     setSearchTerm('');
                     setSelectedCategories([]);
                     setSortBy('latest');
                   }}
                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
                 >
                   Reset filters
                 </button>
               </div>
             ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                 {awardedArtworks.map((artwork) => (
                   <div
                     key={artwork.$id}
                     className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                     onClick={() => {
                       setSelectedArtist(artwork.user);
                       fetchArtistCollection(artwork.user.id);
                     }}
                   >
                     <div className="relative aspect-square bg-gray-100 overflow-hidden">
                       <img
                         src={getImageUrl(artwork.fileId)}
                         alt={artwork.title}
                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                       />
                       <div className="absolute top-3 right-3 flex gap-2">
                         <div className="bg-yellow-400/90 text-white p-2 rounded-full">
                           <FiAward size={16} />
                         </div>
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             handleShare(artwork.$id);
                           }}
                           className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-gray-100 transition"
                         >
                           <FiShare2 size={16} />
                         </button>
                       </div>
                     </div>
                     <div className="p-5">
                       <h3 className="text-lg font-semibold text-gray-900 mb-1">{artwork.title}</h3>
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <img
                             src={getImageUrl(artwork.user.avatar)}
                             alt={artwork.user.name}
                             className="w-6 h-6 rounded-full object-cover"
                           />
                           <span className="text-indigo-600 text-sm">@{artwork.user.username}</span>
                         </div>
                         <div className="flex items-center gap-2 text-gray-500 text-sm">
                           <FiHeart className="text-gray-400" />
                           <span>{artwork.likes || 0}</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             )}
           </section>
         ) : (
           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
             <div className="border-b border-gray-100 p-4">
               <button
                 onClick={() => {
                   setSelectedArtist(null);
                   setArtistCollection([]);
                 }}
                 className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition"
               >
                 <FiChevronLeft size={20} />
                 <span className="font-medium">Back to artworks</span>
               </button>
             </div>
             
             <div className="p-6 md:p-8">
               <div className="flex flex-col md:flex-row gap-8">
                 <div className="md:w-1/3">
                   <div className="flex flex-col items-center md:items-start gap-6">
                     <div className="relative">
                       <img
                         src={getImageUrl(selectedArtist.avatar)}
                         alt={selectedArtist.name}
                         className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                       />
                       {selectedArtist.followers > 1000 && (
                         <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                           Top Artist
                         </div>
                       )}
                     </div>
                     
                     <div className="text-center md:text-left">
                       <h2 className="text-2xl font-bold text-gray-900">{selectedArtist.name}</h2>
                       <p className="text-indigo-600 mb-2">@{selectedArtist.username}</p>
                       <p className="text-gray-600 max-w-md">{selectedArtist.bio || 'No bio available'}</p>
                     </div>
                     
                     <div className="flex gap-6 text-center">
                       <div>
                         <p className="text-gray-900 font-bold">{selectedArtist.followers}</p>
                         <p className="text-gray-500 text-sm">Followers</p>
                       </div>
                       <div>
                         <p className="text-gray-900 font-bold">{artistCollection.length}</p>
                         <p className="text-gray-500 text-sm">Artworks</p>
                       </div>
                     </div>
                     
                     <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition">
                       Follow
                     </button>
                   </div>
                 </div>
                 
                 <div className="md:w-2/3">
                   <h3 className="text-2xl font-bold text-gray-900 mb-6">Art Collection</h3>
                   
                   {artistCollection.length === 0 ? (
                     <div className="text-center py-12 bg-gray-50 rounded-lg">
                       <div className="mx-auto h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                         <FiImage className="text-gray-400" size={24} />
                       </div>
                       <p className="text-gray-600">No artworks available yet</p>
                     </div>
                   ) : (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       {artistCollection.map(artwork => (
                         <Link
                           key={artwork.$id}
                           to={`/artwork/${artwork.$id}`}
                           className="group relative rounded-lg overflow-hidden aspect-square bg-gray-100"
                         >
                           <img
                             src={getImageUrl(artwork.fileId)}
                             alt={artwork.title}
                             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                             <h4 className="text-white font-medium">{artwork.title}</h4>
                             <div className="flex justify-between items-center mt-2">
                               <span className="text-sm text-white/80">
                                 {new Date(artwork.$createdAt).toLocaleDateString()}
                               </span>
                               {artwork.awards?.length > 0 && (
                                 <div className="flex items-center text-yellow-300 text-sm">
                                   <FiAward className="mr-1" size={14} />
                                   <span>Awarded</span>
                                 </div>
                               )}
                             </div>
                           </div>
                         </Link>
                       ))}
                     </div>
                   )}
                 </div>
               </div>
             </div>
           </div>
         )}
       </main>
     </div>
   );
 };
 
 export default UserDiscoveryPage;
 
 
 
 