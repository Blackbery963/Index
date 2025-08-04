import { useState, useEffect } from 'react';
import { FiSearch, FiHeart, FiUserPlus, FiFilter, FiX, FiChevronLeft, FiChevronRight, FiAward, FiMenu } from 'react-icons/fi';
import { FaPalette, FaBrush, FaDigitalTachograph, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { databases, storage, Query } from '../../appwriteConfig';
import { toast } from 'react-toastify';
import FollowButton from '../../Follow/FollowButton';
import LikeButton from '../../EngagementService/likeButton';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
const IMAGE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
const STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const PROFILE_BUCKET_ID = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID 

const UserDiscoveryPage = () => {
  const artCategories = [
    { name: 'Digital Art', icon: <FaDigitalTachograph className="mr-2" /> },
    { name: 'Painting', icon: <FaBrush className="mr-2" /> },
    { name: 'Illustration', icon: <FaPalette className="mr-2" /> },
    { name: 'Photography', icon: <FaCamera className="mr-2" /> },
    { name: 'Sculpture', icon: '🗿' },
    { name: 'Street Art', icon: '🏙️' },
    { name: 'Concept Art', icon: '🎮' },
    { name: 'NFT Art', icon: '🖼️' }
  ];

  const artStyles = [
    'Abstract', 'Realism', 'Surrealism', 'Minimalist',
    'Pop Art', 'Cubism', 'Impressionism', 'Anime',
    'Vector', 'Pixel Art', 'Watercolor', 'Oil Painting'
  ];
 const artStyle = [
    'Abstract', 'Realism', 'Surrealism', 'Minimalist',
    'Pop Art', 'Cubism', 'Impressionism', 'Anime',
    'Vector', 'Pixel Art', 'Watercolor', 'Oil Painting'
  ];
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null)

//  useEffect(() => {
//     const fetchAwardedArtworks = async () => {
//       try {
//         setLoading(true);
//         // First query to get awarded artworks with basic filters
//         let artworkQueries = [
//           Query.isNotNull('awards'), 
//           Query.limit(12), 
//           Query.orderDesc('$createdAt')
//         ];

//         // Fetch the awarded artworks first
//         const awardedImagesResponse = await databases.listDocuments(
//           DATABASE_ID,
//           IMAGE_COLLECTION_ID,
//           artworkQueries
//         );

//         const awardedImages = awardedImagesResponse.documents;
//         const uniqueUserIds = [...new Set(awardedImages.map(img => img.userId))];

//         // Then fetch user data with filtering
//         let userQueries = [
//           Query.equal('$id', uniqueUserIds),
//           Query.limit(12)
//         ];

//         // Add category filters if any are selected
//         if (selectedCategories.length > 0) {
//           userQueries.push(Query.contains('interests', selectedCategories));
//         }

//         // Add style filters if any are selected
//         if (selectedStyles.length > 0) {
//           userQueries.push(Query.contains('artStyle', selectedStyles));
//         }

//         // Get users with the applied filters
//         const usersResponse = await databases.listDocuments(
//           DATABASE_ID,
//           USER_COLLECTION_ID,
//           userQueries
//         );

//         const filteredUserIds = usersResponse.documents.map(user => user.$id);

//         // Now combine the data
//         const artistsWithArt = await Promise.all(
//           filteredUserIds.map(async userId => {
//             try {
//               const user = await databases.getDocument(DATABASE_ID, USER_COLLECTION_ID, userId);
//               const allUserImages = await databases.listDocuments(
//                 DATABASE_ID,
//                 IMAGE_COLLECTION_ID,
//                 [Query.equal('userId', userId), Query.orderDesc('$createdAt')]
//               );

//               // fetching the profile image
//                 let profileImage = null;
//                 if (user.profileImage) {
//                 profileImage = storage.getFilePreview(PROFILE_BUCKET_ID, user.profileImage);
//                 }

//               const awardedImage = awardedImages.find(img => img.userId === userId);
//               const otherArtworks = allUserImages.documents
//                 .filter(img => img.$id !== awardedImage?.$id)
//                 .map(img => ({
//                   id: img.$id,
//                   title: img.title,
//                   image: img.fileId,
//                   awards: img.awards || []
//                 }));

//               return {
//                 id: userId,
//                 userId: userId,
//                 name: user.username,
//                 username: user.nickname,
//                 bio: user.bio || "No bio available",
//                 profileImage: user.profileImageUrl,
//                 interests: user.interests || [],
//                 artStyles: user.artStyle || [],
//                 followers: user.followers || 0,
//                 isFollowing: false,
//                 signatureArt: {
//                   id: awardedImage?.$id,
//                   title: awardedImage?.title || '',
//                   description: awardedImage?.description || 'No description available',
//                   image: awardedImage?.fileId || '',
//                   awards: awardedImage?.awards || []
//                 },
//                 artworks: otherArtworks
//               };
//             } catch (err) {
//               console.error(`Failed to fetch user ${userId}:`, err);
//               return null;
//             }
//           })
//         );

//         const filteredArtists = artistsWithArt
//           .filter(Boolean)
//           .filter(artist => {
//             if (!searchTerm) return true;
//             return (
//               artist.signatureArt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               artist.username.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//           });

//         setArtists(filteredArtists);
//       } catch (error) {
//         console.error("Error fetching awarded artworks:", error);
//         toast.error("Failed to load artworks");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAwardedArtworks();
//   }, [searchTerm, selectedCategories, selectedStyles]);


useEffect(() => {
  const fetchAwardedArtworks = async () => {
    try {
      setLoading(true);
      
      // First, fetch users with the applied filters
      let userQueries = [Query.limit(12)];
      
      // Add category filters if any are selected
      if (selectedCategories.length > 0) {
        userQueries.push(Query.contains('interests', selectedCategories));
      }
      
      // Add style filters if any are selected
      if (selectedStyles.length > 0) {
        userQueries.push(Query.contains('artStyle', selectedStyles));
      }
      
      const usersResponse = await databases.listDocuments(
        DATABASE_ID,
        USER_COLLECTION_ID,
        userQueries
      );
      
      // Then for each user, find their awarded artworks
      const artistsWithArt = await Promise.all(
        usersResponse.documents.map(async (user) => {
          try {
            // Get user's awarded artworks
            const awardedImagesResponse = await databases.listDocuments(
              DATABASE_ID,
              IMAGE_COLLECTION_ID,
              [
                Query.equal('userId', user.$id),
                Query.isNotNull('awards'),
                Query.limit(1), // Just get one awarded artwork per user
                Query.orderDesc('$createdAt')
              ]
            );
            
            // Skip users with no awarded artworks
            if (awardedImagesResponse.documents.length === 0) {
              return null;
            }
            
            const awardedImage = awardedImagesResponse.documents[0];
            
            // Get user's other artworks
            const allUserImages = await databases.listDocuments(
              DATABASE_ID,
              IMAGE_COLLECTION_ID,
              [
                Query.equal('userId', user.$id),
                Query.orderDesc('$createdAt')
              ]
            );
            
            // Get profile image URL
            // let profileImageUrl = null;
            // if (user.profileImage) {
            //   profileImageUrl = storage.getFilePreview(
            //     PROFILE_BUCKET_ID, 
            //     user.profileImage
            //   );
            // }
             let profileImage = null;
                if (user.profileImage) {
                profileImage = storage.getFilePreview(PROFILE_BUCKET_ID, user.profileImage);
                }
            
            const otherArtworks = allUserImages.documents
              .filter(img => img.$id !== awardedImage?.$id)
              .map(img => ({
                id: img.$id,
                title: img.title,
                image: img.fileId,
                awards: img.awards || []
              }));
            
            return {
              id: user.$id,
              userId: user.$id,
              name: user.username,
              username: user.nickname,
              bio: user.bio || "No bio available",
              profileImage: user.profileImageUrl,
              interests: user.interests || [],
              artStyles: user.artStyle || [],
              followers: user.followers || 0,
              isFollowing: false,
              signatureArt: {
                id: awardedImage.$id,
                title: awardedImage.title || '',
                description: awardedImage.description || 'No description available',
                image: awardedImage.fileId,
                awards: awardedImage.awards || []
              },
              artworks: otherArtworks
            };
          } catch (err) {
            console.error(`Failed to fetch user ${user.$id}:`, err);
            return null;
          }
        })
      );
      
      // Filter out null entries and apply search term filter
      const filteredArtists = artistsWithArt
        .filter(Boolean)
        .filter(artist => {
          if (!searchTerm) return true;
          const searchLower = searchTerm.toLowerCase();
          return (
            (artist.signatureArt.title && artist.signatureArt.title.toLowerCase().includes(searchLower)) ||
            (artist.username && artist.username.toLowerCase().includes(searchLower))
          );
        });
      
      setArtists(filteredArtists);
    } catch (error) {
      console.error("Error fetching awarded artworks:", error);
      toast.error("Failed to load artworks");
    } finally {
      setLoading(false);
    }
  };
  
  fetchAwardedArtworks();
}, [searchTerm, selectedCategories, selectedStyles]);



  const fetchArtistCollection = async (userId) => {
    try {
      setLoading(true);
      const imagesResponse = await databases.listDocuments(
        DATABASE_ID,
        IMAGE_COLLECTION_ID,
        [Query.equal('userId', userId), Query.orderDesc('$createdAt')]
      );

      const allArtworks = imagesResponse.documents.map(image => ({
        id: image.$id,
        title: image.title,
        image: image.fileId,
        awards: image.awards || []
      }));

      setSelectedArtist(prev => {
        if (!prev) return prev;
        
        const combinedArtworks = [
          {
            id: prev.signatureArt.id,
            title: prev.signatureArt.title,
            image: prev.signatureArt.image,
            awards: prev.signatureArt.awards
          },
          ...allArtworks.filter(art => art.id !== prev.signatureArt.id)
        ];

        return { 
          ...prev, 
          artworks: combinedArtworks 
        };
      });
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


  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleStyle = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(item => item !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const viewArtistDetails = (artist) => {
    setSelectedArtist(artist);
    fetchArtistCollection(artist.id);
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const ProfileAvatar = ({ username, profileImage, size = '32' }) => {
  const firstLetter = username?.charAt(0).toUpperCase() || 'U';
  
  return (
    <div 
      className={`flex items-center justify-center rounded-full bg-indigo-600 text-white`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size / 2}px`
      }}
    >
      {profileImage ? (
        <img 
          src={profileImage} 
          alt={username}
          className="w-full h-full rounded-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
            e.target.parentElement.textContent = firstLetter;
          }}
        />
      ) : (
        firstLetter
      )}
    </div>
  );
};

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-Playfair">
      <header className="bg-white/40 backdrop-blur-md shadow-sm py-5 px-4 sticky top-0 z-10">
        <div className="max-w-full mx-auto flex items-center justify-between">
          <h1 className='lg:text-[35px] md:text-[30px] sm:text-[25px] text-[21px] font-bold font-Eagle'>
            Painters' Diary
          </h1>

          <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
            <div className="relative w-1/3 max-w-xs">
              <input
                type="text"
                placeholder="Search artists..."
                className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition text-sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter />
              <span>Filters</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <div className="relative flex-1 max-w-[200px]">
              <input
                type="text"
                placeholder="Search..."
                className={`${
                  isSearchExpanded ? 'w-full' : 'w-10'
                } py-2 px-4 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-300`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => setTimeout(() => setIsSearchExpanded(false), 200)}
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              className="p-2 text-gray-600 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 animate-fadeIn">
            <button
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition mb-2"
              onClick={() => {
                setShowFilters(!showFilters);
                setIsMenuOpen(false);
              }}
            >
              <FiFilter />
              <span>Art Filters</span>
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiX />
              <span>Close</span>
            </button>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
        {showFilters && (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filter Artists</h2>
              <button onClick={() => setShowFilters(false)}>
                <FiX className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Art Categories</h3>
              <div className="flex flex-wrap gap-2">
                {artCategories.map(category => (
                  <button
                    key={category.name}
                    onClick={() => toggleCategory(category.name)}
                    className={`px-3 py-1 rounded-full text-sm flex items-center ${
                      selectedCategories.includes(category.name)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {category.icon}
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Art Styles</h3>
              <div className="flex flex-wrap gap-2">
                {artStyles.map(style => (
                  <button
                    key={style}
                    onClick={() => toggleStyle(style)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedStyles.includes(style)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            
            {(selectedCategories.length > 0 || selectedStyles.length > 0) && (
              <button 
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedStyles([]);
                }}
                className="mt-4 text-indigo-600 text-sm font-medium hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {!selectedArtist ? (
          <>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <FaPalette className="mr-2 text-indigo-600" />
              {selectedCategories.length > 0 || selectedStyles.length > 0 
                ? `Artists matching your criteria`
                : 'Featured Artists'}
            </h2>
            
            {artists.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No artists match your search criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategories([]);
                    setSelectedStyles([]);
                  }}
                  className="mt-4 text-indigo-600 font-medium hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {artists.map(artist => (
                  <div 
                    key={artist.id} 
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
                    onClick={() => viewArtistDetails(artist)}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 h-64 md:h-auto relative group">
                        <img 
                          src={getImageUrl(artist.signatureArt.image)} 
                          alt={artist.signatureArt.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150';
                            e.target.alt = 'Image not available';
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <span className="text-white font-medium">View Signature Artwork</span>
                        </div>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold font-Quicksand">{artist.name}</h3>
                            <p className="text-indigo-600">{artist.username}</p>
                          </div>
                          <FollowButton 
                            targetUserId={artist.userId}
                            className="px-4 py-2 rounded-full flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700"
                          />
                        </div>
                        <p className="mt-3 text-gray-600">{artist.bio}</p>
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center text-indigo-600 font-medium">
                            <FiAward className="mr-2" />
                            <span>Signature Artwork</span>
                          </div>
                          <h4 className="font-semibold mt-1 font-Quicksand">{artist.signatureArt.title}</h4>
                          <p className="text-sm text-gray-600 font-Playfair">{artist.signatureArt.description}</p>
                          {artist.signatureArt.awards.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {artist.signatureArt.awards.map(award => (
                                <span key={award} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                                  {award}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {artist.interests?.map(category => (
                            <span key={category} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
                              {artCategories.find(c => c.name === category)?.icon}
                              <span className="ml-1">{category}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button 
              onClick={() => setSelectedArtist(null)}
              className="flex items-center gap-2 text-indigo-600 p-6 hover:underline"
            >
              <FiChevronLeft />
              <span>Back to artists</span>
            </button>
            <div className="px-6 pb-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <Link to={`/Account/${selectedArtist.userId}`}>
                    <div className="flex items-start gap-4 flex-col">
                      <div className='h-32 w-32 rounded-full bg-black flex items-center text-white'>
                        {/* profile Image  */}
                        <ProfileAvatar 
                          username={selectedArtist.username} 
                          profileImage={selectedArtist.profileImage} 
                          size="128"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold font-Quicksand">{selectedArtist.name}</h2>
                        <p className="text-indigo-600">{selectedArtist.username}</p>
                      </div>
                    </div>
                  </Link>
                  <FollowButton 
                    targetUserId={selectedArtist.userId}
                    className="w-full mt-4"
                  />                  
                  <p className="mt-4 text-gray-700">{selectedArtist.bio}</p>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Art Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedArtist.interests?.map(category => (
                        <span key={category} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center shadow-inner">
                          {artCategories.find(c => c.name === category)?.icon}
                          <span className="ml-1">{category}</span>
                        </span>
                      ))}
                      {/* {selectedArtist.interests} */}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Art Styles</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center shadow-inner'>
                        {selectedArtist.artStyles}
                      </span>                     
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Signature Artwork</h3>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <img 
                        src={getImageUrl(selectedArtist.signatureArt.image)} 
                        alt={selectedArtist.signatureArt.title}
                        className="w-full h-auto rounded"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150';
                          e.target.alt = 'Image not available';
                        }}
                      />
                      <h4 className="font-semibold mt-3">{selectedArtist.signatureArt.title}</h4>
                      <p className="text-sm text-gray-600">{selectedArtist.signatureArt.description}</p>
                      {selectedArtist.signatureArt.awards.length > 0 && (
                        <div className="mt-3">
                          <h5 className="text-sm font-medium mb-1">Awards</h5>
                          <ul className="space-y-1">
                            {selectedArtist.signatureArt.awards.map(award => (
                              <li key={award} className="flex items-center text-sm">
                                <FiAward className="mr-2 text-indigo-600" />
                                {award}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-4 font-Quicksand">Art Gallery</h3>
                  {selectedArtist.artworks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedArtist.artworks.map(artwork => (
                        <div key={artwork.id} className="group relative rounded-lg overflow-hidden">
                          <img 
                            src={getImageUrl(artwork.image)} 
                            alt={artwork.title}
                            className="w-full h-48 object-cover transition transform group-hover:scale-105"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150';
                              e.target.alt = 'Image not available';
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition">
                            <h4 className="text-white font-medium">{artwork.title}</h4>
                            <div className="flex items-center text-white text-sm mt-1">
                              <LikeButton 
                                targetId={artwork.id} 
                                targetType="artwork"
                                className="text-white hover:text-indigo-300"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No additional artworks found for this artist.</p>
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


