// DecorCraftsGallery.jsx
import React, { useState, useEffect } from 'react';

const DecorCraftsGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

  // Fetch images from Pexels API for decor and crafts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Using Pexels API with a curated collection of decor and crafts photos
        const response = await fetch('https://api.pexels.com/v1/search?query=handmade+decor+crafts&per_page=9&orientation=square', {
          headers: {
            'Authorization': '563492ad6f91700001000001b8f5c9f4b4f14e2b9c3b3c3b3c3b3c3b'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch from Pexels API');
        }
        
        const data = await response.json();
        
        // Transform Pexels data to match our structure
        const formattedItems = data.photos.map((photo, index) => ({
          id: photo.id,
          title: ["Boho Dreamcatcher", "Macrame Wall Hanging", "Hand-painted Ceramics", 
                 "Wooden Carved Sculpture", "Artisanal Candles", "Embroidery Hoop Art",
                 "Handwoven Basket", "Decorative Throw Pillows", "Custom Wood Sign"][index],
          artist: photo.photographer,
          image: photo.src.large2x,
          description: "Handcrafted with care and attention to detail, this unique piece adds character to any space.",
          category: ["Wall Decor", "Textile Art", "Home Accessories", 
                    "Sculpture", "Home Fragrance", "Textile Art",
                    "Storage Solution", "Home Textiles", "Wall Art"][index],
          price: `$${25 + (index * 15)}`
        }));
        
        setItems(formattedItems);
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        // Fallback data in case API fails
        const fallbackItems = [
          {
            id: 1,
            title: "Boho Dreamcatcher",
            artist: "Crafty Creations",
            image: "https://images.pexels.com/photos/6344230/pexels-photo-6344230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            description: "Handmade dreamcatcher with feathers and beads for boho home decor.",
            category: "Wall Decor",
            price: "$35"
          },
          {
            id: 2,
            title: "Macrame Wall Hanging",
            artist: "Knotty Designs",
            image: "https://images.pexels.com/photos/6344236/pexels-photo-6344236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            description: "Intricately knotted macrame piece perfect for adding texture to your walls.",
            category: "Textile Art",
            price: "$45"
          },
          {
            id: 3,
            title: "Hand-painted Ceramics",
            artist: "Clay Masters",
            image: "https://images.pexels.com/photos/4207785/pexels-photo-4207785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            description: "Beautifully hand-painted ceramic vase with unique patterns.",
            category: "Home Accessories",
            price: "$40"
          },
          {
            id: 4,
            title: "Wooden Carved Sculpture",
            artist: "Woodcraft Studios",
            image: "https://images.pexels.com/photos/5099220/pexels-photo-5099220.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            description: "Hand-carved wooden sculpture showcasing natural wood grains.",
            category: "Sculpture",
            price: "$55"
          },
          {
            id: 5,
            title: "Artisanal Candles",
            artist: "Flicker & Flame",
            image: "https://images.pexels.com/photos/4207789/pexels-photo-4207789.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            description: "Hand-poured soy candles with essential oils and natural fragrances.",
            category: "Home Fragrance",
            price: "$28"
          },
          {
            id: 6,
            title: "Embroidery Hoop Art",
            artist: "Stitch Stories",
            image: "https://images.pexels.com/photos/6344232/pexels-photo-6344232.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            description: "Delicate embroidery artwork mounted in a wooden hoop for display.",
            category: "Textile Art",
            price: "$32"
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
    alert(`Thank you for subscribing with ${email}! You'll receive updates about new handmade decor items.`);
    setEmail('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading beautiful crafts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-2">DC</div>
            <h1 className="text-2xl font-serif font-bold text-green-800">Artisan Crafts</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors">Home</a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
            <a href="#collection" className="text-gray-700 hover:text-green-600 transition-colors">Shop</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">Contact</a>
          </nav>
          <button className="md:hidden text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-green-900 mb-6">Handmade Decor & Crafts</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-10">
            Discover unique handmade pieces that add warmth and character to your living spaces.
          </p>
          <button className="px-8 py-3 bg-green-700 text-white rounded-lg text-lg hover:bg-green-800 transition-colors shadow-md">
            Explore Collection
          </button>
        </div>
      </section>

      {/* Importance Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-green-900 mb-12">Why Choose Handmade Decor?</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-green-800">Unique & One-of-a-Kind</h3>
                </div>
                <p className="text-gray-700">
                  Each handmade decor piece is unique, carrying the artisan's personal touch. You won't find these exact items in mass-produced collections.
                </p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-green-800">Eco-Friendly & Sustainable</h3>
                </div>
                <p className="text-gray-700">
                  Handmade items often use sustainable materials and processes, reducing environmental impact compared to mass production.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-green-800">Support Artisans Directly</h3>
                </div>
                <p className="text-gray-700">
                  When you buy handmade, you're supporting individual artisans and small businesses, helping to preserve traditional crafts.
                </p>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/6344230/pexels-photo-6344230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Handmade decor items" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-green-900 mb-4">Handmade Collection</h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Explore our curated selection of handmade decor and craft items from talented artisans.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-serif font-semibold text-gray-800 mt-2 mb-2">{item.title}</h3>
                  <p className="text-green-700 mb-2">By {item.artist}</p>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-800">{item.price}</span>
                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-amber-900 mb-12">Explore Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Wall Decor", "Textile Art", "Ceramics", "Wood Crafts", "Home Fragrance", "Jewelry", "Gifts", "Seasonal"].map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Join Our Creative Community</h2>
          <p className="mb-8">
            Subscribe to receive updates on new handmade collections, crafting tutorials, and exclusive offers.
          </p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded-lg hover:bg-amber-400 transition-colors"
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
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-2">DC</div>
                <h3 className="text-xl font-serif font-semibold">Artisan Crafts</h3>
              </div>
              <p className="text-gray-400 mt-2">
                Handmade decor and crafts for your home
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
              <p className="text-gray-400">123 Craft Avenue</p>
              <p className="text-gray-400">Artisan Town, CR 12345</p>
              <p className="text-gray-400 mt-2">hello@artisancrafts.com</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Artisan Crafts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DecorCraftsGallery;