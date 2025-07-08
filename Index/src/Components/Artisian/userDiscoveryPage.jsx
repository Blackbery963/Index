import { useState, useEffect } from 'react';
import { FiSearch, FiHeart, FiUserPlus, FiFilter, FiX, FiChevronLeft, FiChevronRight, FiAward, FiMenu } from 'react-icons/fi';
import { FaPalette, FaBrush, FaDigitalTachograph, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const UserDiscoveryPage = () => {
  // Art-specific data (unchanged)
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

  const sampleArtists = [
    {
      id: 1,
      name: 'Alex Rivera',
      username: '@alexcreative',
      bio: 'Digital artist exploring the intersection of technology and emotion',
      categories: ['Digital Art', 'Concept Art'],
      styles: ['Abstract', 'Surrealism'],
      followers: 1243,
      isFollowing: false,
      signatureArt: {
        title: 'Neon Dreams',
        description: 'A vibrant exploration of digital consciousness',
        image: 'https://images.pexels.com/photos/9795661/pexels-photo-9795661.jpeg',
        awards: ['Digital Art Award 2023']
      },
      artworks: [
        { id: 1, title: 'Neon Dreams', image: 'https://images.pexels.com/photos/30145964/pexels-photo-30145964.jpeg', likes: 342 },
        { id: 2, title: 'Data Flow', image: 'https://images.pexels.com/photos/11581120/pexels-photo-11581120.jpeg', likes: 278 },
        { id: 3, title: 'Electric Memories', image: 'https://images.pexels.com/photos/24461725/pexels-photo-24461725.jpeg', likes: 189 }
      ]
    },
    {
      id: 2,
      name: 'Sam Lee',
      username: '@samshoots',
      bio: 'Street photographer capturing raw urban emotions',
      categories: ['Photography', 'Street Art'],
      styles: ['Realism', 'Documentary'],
      followers: 856,
      isFollowing: true,
      signatureArt: {
        title: 'City Lights Reflection',
        description: 'Urban landscapes mirrored in rain puddles',
        image: 'https://images.pexels.com/photos/2838159/pexels-photo-2838159.jpeg',
        awards: ['Urban Photo Award 2022']
      },
      artworks: [
        { id: 1, title: 'City Lights', image: ' https://images.pexels.com/photos/27704587/pexels-photo-27704587.jpeg', likes: 421 },
        { id: 2, title: 'Urban Jungle', image: 'https://cdn.pixabay.com/photo/2022/11/27/13/22/tree-7619791_960_720.jpg', likes: 312 },
        { id: 3, title: 'Metro Stories', image: 'https://cdn.pixabay.com/photo/2020/06/02/06/41/wilamowice-5249675_960_720.jpg', likes: 203 }
      ]
    },
    {
      id: 3,
      name: 'Taylor Morgan',
      username: '@taypaints',
      bio: 'Oil painter specializing in surreal portraits',
      categories: ['Painting'],
      styles: ['Surrealism', 'Oil Painting'],
      followers: 2100,
      isFollowing: false,
      signatureArt: {
        title: 'Floating Consciousness',
        description: 'Oil on canvas - 24x36"',
        image: 'https://cdn.pixabay.com/photo/2024/09/19/14/44/cat-9059025_1280.jpg',
        awards: ['Contemporary Art Prize', 'Young Painter Award']
      },
      artworks: [
        { id: 1, title: 'Dream State', image: 'https://cdn.pixabay.com/photo/2025/04/05/11/06/water-drops-9515029_1280.jpg', likes: 587 },
        { id: 2, title: 'Melting Time', image: 'https://cdn.pixabay.com/photo/2025/05/09/15/06/fluffy-bird-string-9589605_1280.jpg', likes: 432 },
        { id: 3, title: 'Inner Universe', image: 'https://cdn.pixabay.com/photo/2025/05/30/17/16/mountain-9631830_1280.jpg', likes: 321 }
      ]
    }
  ];

  // State
  const [artists, setArtists] = useState(sampleArtists);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filter artists (unchanged)
  useEffect(() => {
    let filtered = sampleArtists;
    
    if (searchTerm) {
      filtered = filtered.filter(artist => 
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        artist.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(artist => 
        artist.categories.some(cat => selectedCategories.includes(cat))
      );
    }
    
    if (selectedStyles.length > 0) {
      filtered = filtered.filter(artist => 
        artist.styles.some(style => selectedStyles.includes(style))
      );
    }
    
    setArtists(filtered);
  }, [searchTerm, selectedCategories, selectedStyles]);

  const toggleFollow = (artistId) => {
    setArtists(artists.map(artist => 
      artist.id === artistId ? { ...artist, isFollowing: !artist.isFollowing } : artist
    ));
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
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Improved Header */}
      <header className="bg-white/40 backdrop-blur-md shadow-sm py-5 px-4 sticky top-0 z-10">
        <div className=" mx-auto flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-600 flex items-center">
            <h1 className='lg:text-[35px] md:text-[30px] sm:text-[25px] text-[21px] font-bold font-Eagle'>Painters' Diary</h1>
          </h1>

          {/* Desktop Search and Filter */}
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

          {/* Mobile Menu Toggle and Search */}
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

        {/* Mobile Menu */}
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

      {/* Main Content (unchanged) */}
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
        {/* Filters Panel */}
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

        {/* Artist List or Artist Detail View */}
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
                          src={artist.signatureArt.image} 
                          alt={artist.signatureArt.title}
                          className="w-full h-full object-cover"
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
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFollow(artist.id);
                            }}
                            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                              artist.isFollowing
                                ? 'bg-gray-200 text-gray-800'
                                : 'bg-indigo-600 text-white'
                            }`}
                          >
                            {artist.isFollowing ? <FiHeart className="fill-current" /> : <FiUserPlus />}
                            <span>{artist.isFollowing ? 'Following' : 'Follow'}</span>
                          </button>
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
                          {artist.categories.map(category => (
                            <span key={category} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
                              {artCategories.find(c => c.name === category)?.icon}
                              <span className="ml-1">{category}</span>
                            </span>
                          ))}
                          {artist.styles.map(style => (
                            <span key={style} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                              {style}
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
                 <Link to={'/Account'}>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-3xl">
                      {selectedArtist.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold font-Quicksand">{selectedArtist.name}</h2>
                      <p className="text-indigo-600">{selectedArtist.username}</p>
                    </div>
                  </div>
                 </Link>
                  <button 
                    onClick={() => toggleFollow(selectedArtist.id)}
                    className={`mt-4 w-full py-2 rounded-full flex items-center justify-center gap-2 ${
                      selectedArtist.isFollowing
                        ? 'bg-gray-200 text-gray-800'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {selectedArtist.isFollowing ? <FiHeart className="fill-current" /> : <FiUserPlus />}
                    <span>{selectedArtist.isFollowing ? 'Following' : 'Follow Artist'}</span>
                  </button>
                  <p className="mt-4 text-gray-700">{selectedArtist.bio}</p>
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Art Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedArtist.categories.map(category => (
                        <span key={category} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
                          {artCategories.find(c => c.name === category)?.icon}
                          <span className="ml-1">{category}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Art Styles</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedArtist.styles.map(style => (
                        <span key={style} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Signature Artwork</h3>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <img 
                        src={selectedArtist.signatureArt.image} 
                        alt={selectedArtist.signatureArt.title}
                        className="w-full h-auto rounded"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedArtist.artworks.map(artwork => (
                      <div key={artwork.id} className="group relative rounded-lg overflow-hidden">
                        <img 
                          src={artwork.image} 
                          alt={artwork.title}
                          className="w-full h-48 object-cover transition transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition">
                          <h4 className="text-white font-medium">{artwork.title}</h4>
                          <div className="flex items-center text-white text-sm mt-1">
                            <FiHeart className="mr-1" />
                            <span>{artwork.likes} likes</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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