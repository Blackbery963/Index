// CulturalCreationsGallery.jsx
import React, { useState, useEffect } from 'react';

const CulturalCreationsGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Fetch images from Pexels API for cultural creations
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Using Pexels API with a curated collection of cultural photos
        const response = await fetch('https://api.pexels.com/v1/search?query=traditional+art+craft+culture&per_page=12&orientation=square', {
          headers: {
            'Authorization': '563492ad6f91700001000001b8f5c9f4b4f14e2b9c3b3c3b3c3b3c3b'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch from Pexels API');
        }
        
        const data = await response.json();
        
        // Transform Pexels data to match our structure
        const formattedItems = data.photos.map((photo, index) => {
          const categories = [
            {name: "Textile Arts", region: "West Africa"},
            {name: "Pottery", region: "East Asia"},
            {name: "Wood Carving", region: "Oceania"},
            {name: "Jewelry", region: "Middle East"},
            {name: "Mask Making", region: "Central Africa"},
            {name: "Weaving", region: "South America"},
            {name: "Metalwork", region: "South Asia"},
            {name: "Painting", region: "East Asia"},
            {name: "Sculpture", region: "Southern Europe"},
            {name: "Basketry", region: "North America"},
            {name: "Printmaking", region: "East Asia"},
            {name: "Embroidery", region: "Eastern Europe"}
          ];
          
          const culturalItems = [
            "Kente Cloth",
            "Blue Pottery",
            "Tiki Sculpture",
            "Filigree Necklace",
            "Traditional Mask",
            "Andean Textile",
            "Brass Sculpture",
            "Scroll Painting",
            "Marble Statue",
            "Sweetgrass Basket",
            "Woodblock Print",
            "Folk Embroidery"
          ];
          
          return {
            id: photo.id,
            title: culturalItems[index],
            artist: photo.photographer,
            image: photo.src.large2x,
            description: "A traditional cultural artifact representing centuries of heritage and craftsmanship.",
            category: categories[index].name,
            region: categories[index].region,
            price: `$${45 + (index * 25)}`
          };
        });
        
        setItems(formattedItems);
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        // Fallback data in case API fails
        const fallbackItems = [
          {
            id: 1,
            title: "Kente Cloth",
            artist: "Ghanaian Weavers",
            image: "https://images.pexels.com/photos/8947868/pexels-photo-8947868.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            description: "Handwoven textile with vibrant patterns from Ghana, each design carrying specific cultural meanings.",
            category: "Textile Arts",
            region: "West Africa",
            price: "$120"
          },
          {
            id: 2,
            title: "Blue Pottery",
            artist: "Persian Artisans",
            image: "https://images.pexels.com/photos/7009486/pexels-photo-7009486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            description: "Traditional Persian pottery with intricate blue patterns, a craft dating back centuries.",
            category: "Pottery",
            region: "Middle East",
            price: "$85"
          },
          {
            id: 3,
            title: "Maori Carving",
            artist: "New Zealand Artists",
            image: "https://images.pexels.com/photos/10842121/pexels-photo-10842121.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            description: "Wood carving representing Maori cultural stories and ancestral connections.",
            category: "Wood Carving",
            region: "Oceania",
            price: "$210"
          },
          {
            id: 4,
            title: "Navajo Jewelry",
            artist: "Native American Artisans",
            image: "https://images.pexels.com/photos/9775902/pexels-photo-9775902.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            description: "Silver and turquoise jewelry with symbolic designs from Navajo tradition.",
            category: "Jewelry",
            region: "North America",
            price: "$95"
          },
          {
            id: 5,
            title: "Balinese Mask",
            artist: "Indonesian Craftsmen",
            image: "https://images.pexels.com/photos/10842119/pexels-photo-10842119.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            description: "Hand-carved mask used in traditional Balinese dance performances and ceremonies.",
            category: "Mask Making",
            region: "Southeast Asia",
            price: "$75"
          },
          {
            id: 6,
            title: "Andean Textile",
            artist: "Peruvian Weavers",
            image: "https://images.pexels.com/photos/9558763/pexels-photo-9558763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            description: "Vibrant woven textiles featuring traditional patterns from the Andes mountains.",
            category: "Weaving",
            region: "South America",
            price: "$140"
          }
        ];
        setItems(fallbackItems);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}! You'll receive updates about cultural creations from around the world.`);
    setEmail('');
  };

  const categories = [
    { id: 'all', name: 'All Creations' },
    { id: 'Textile Arts', name: 'Textile Arts' },
    { id: 'Pottery', name: 'Pottery' },
    { id: 'Wood Carving', name: 'Wood Carving' },
    { id: 'Jewelry', name: 'Jewelry' },
    { id: 'Mask Making', name: 'Masks' },
    { id: 'Weaving', name: 'Weaving' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Discovering cultural treasures...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-red-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-2">CC</div>
            <h1 className="text-2xl font-serif font-bold text-red-800">Cultural Creations</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="text-gray-700 hover:text-red-600 transition-colors">Home</a>
            <a href="#about" className="text-gray-700 hover:text-red-600 transition-colors">Heritage</a>
            <a href="#collection" className="text-gray-700 hover:text-red-600 transition-colors">Gallery</a>
            <a href="#regions" className="text-gray-700 hover:text-red-600 transition-colors">Regions</a>
            <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors">Contact</a>
          </nav>
          <button className="md:hidden text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-amber-900 opacity-20 z-0"></div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-red-900 mb-6">Cultural Creations of the World</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-10">
            Discover the rich tapestry of traditional arts and crafts from diverse cultures across the globe.
          </p>
          <button className="px-8 py-3 bg-red-700 text-white rounded-lg text-lg hover:bg-red-800 transition-colors shadow-md">
            Explore Heritage
          </button>
        </div>
      </section>

      {/* Cultural Importance Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-red-900 mb-12">Preserving Cultural Heritage</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-700 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-red-800">Intergenerational Knowledge</h3>
                </div>
                <p className="text-gray-700">
                  Cultural creations represent knowledge passed down through generations, preserving techniques, stories, and values that define communities and their identities.
                </p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-700 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-red-800">Community Identity</h3>
                </div>
                <p className="text-gray-700">
                  Traditional arts strengthen community bonds and cultural identity, serving as visual representations of shared history, beliefs, and social structures.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-700 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-red-800">Sustainable Practices</h3>
                </div>
                <p className="text-gray-700">
                  Many traditional art forms utilize locally sourced, natural materials and environmentally conscious methods, offering sustainable alternatives to mass production.
                </p>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/7009486/pexels-photo-7009486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Traditional cultural artifacts" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section with Filter */}
      <section id="collection" className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-red-900 mb-4">Global Cultural Gallery</h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Explore traditional creations from diverse cultures around the world.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-red-700 text-white'
                    : 'bg-white text-red-700 hover:bg-red-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                      {item.region}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-gray-800 mt-2 mb-2">{item.title}</h3>
                  <p className="text-red-700 mb-2">By {item.artist}</p>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-red-800">{item.price}</span>
                    <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section id="regions" className="py-16 bg-amber-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-amber-900 mb-12">Cultural Regions</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Africa", count: "42", color: "bg-amber-500" },
              { name: "Asia", count: "68", color: "bg-red-500" },
              { name: "Europe", count: "35", color: "bg-amber-600" },
              { name: "Americas", count: "47", color: "bg-red-600" },
              { name: "Oceania", count: "23", color: "bg-amber-700" },
              { name: "Middle East", count: "29", color: "bg-red-700" },
              { name: "Central Asia", count: "18", color: "bg-amber-800" },
              { name: "Indigenous", count: "56", color: "bg-red-800" }
            ].map((region, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 ${region.color} rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4`}>
                  {region.count}
                </div>
                <h3 className="font-semibold text-gray-800">{region.name}</h3>
                <p className="text-sm text-gray-600">Cultural Artforms</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Quote Section */}
      <section className="py-16 bg-red-800 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-6 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <blockquote className="text-2xl font-serif italic mb-6">
            "Cultural diversity is as necessary for humankind as biodiversity is for nature."
          </blockquote>
          <p className="text-red-200">- UNESCO Universal Declaration on Cultural Diversity</p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-amber-800 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Join Our Cultural Journey</h2>
          <p className="mb-8">
            Subscribe to receive updates on traditional arts, cultural events, and heritage preservation efforts.
          </p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-2">CC</div>
                <h3 className="text-xl font-serif font-semibold">Cultural Creations</h3>
              </div>
              <p className="text-gray-400 mt-2">
                Preserving and celebrating global cultural heritage
              </p>
            </div>
            
            <div className="flex space-x-4 mb-6 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">123 Heritage Lane</p>
              <p className="text-gray-400">Cultural District, CC 12345</p>
              <p className="text-gray-400 mt-2">info@culturalcreations.com</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Cultural Creations. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CulturalCreationsGallery;