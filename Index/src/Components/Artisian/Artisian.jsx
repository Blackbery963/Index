import React, { useState, useEffect } from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const artisans = [
  { 
    id: 1, 
    name: "Anna Smith", 
    bio: "Specializing in watercolor landscapes for over 10 years. Anna brings a delicate touch to natural scenes, capturing the ephemeral beauty of light and water.", 
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
    signaturePiece: "Mountain Reflections", 
  },
  { 
    id: 2, 
    name: "John Doe", 
    bio: "Crafts unique wooden sculptures with a modern twist. John combines traditional woodworking techniques with contemporary design principles.", 
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
    signaturePiece: "Oak & Steel Series", 
  },
  { 
    id: 3, 
    name: "Emma Brown", 
    bio: "Creates minimalist art prints with bold lines and subtle textures. Emma's work explores the balance between positive and negative space.", 
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
    signaturePiece: "Silhouette Series", 
  },
];

const Artisan = () => {
  // const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    const savedProfileImage = localStorage.getItem('profileImage');
    const savedCoverImage = localStorage.getItem('coverImage');
    setProfile((prev) => ({
      ...prev,
      ...savedProfile
    }));
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
    if (savedCoverImage) {
      setImage(savedCoverImage);
      setShowButton(false);
    }
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === artisans.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? artisans.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="py-4 bg-gray-100 dark:bg-[#040d1200] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-medium text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
            Meet Our Artisans
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the skilled hands and creative minds behind each unique piece in our collection.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {artisans.map((artisan, index) => (
              <div key={artisan.id} className="w-full flex-shrink-0 px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  {/* Artisan Image */}
                  <div className="w-full md:w-1/2">
                    <div className="relative pb-[100%] overflow-hidden rounded-lg shadow-lg dark:shadow-gray-800/50">
                      <img
                        src={artisan.image}
                        alt={artisan.name}
                        className="absolute h-full w-full object-cover transition-all duration-500 hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Artisan Details */}
                  <div className="w-full md:w-1/2">
                    <div className="max-w-md mx-auto md:mx-0">
                      <h3 className="text-3xl font-serif font-medium text-gray-900 dark:text-white mb-4">
                        {artisan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {artisan.bio}
                      </p>
                      
                      <div className="mb-8">
                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                          Signature Piece
                        </h4>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">
                          {artisan.signaturePiece}
                        </p>
                      </div>
                      
                      <div className="flex gap-4 mx-auto">
                        {[
                          {
                            platform: 'facebook',
                            icon: <FaFacebook className="hover:text-blue-600 dark:hover:text-blue-400" />,
                            url: profile.facebook ? `https://www.facebook.com/${profile.facebook}` : null
                          },
                          {
                            platform: 'instagram',
                            icon: <FaInstagram className="hover:text-pink-900 dark:hover:text-pink-400" />,
                            url: profile.instagram ? `https://www.instagram.com/${profile.instagram}` : null
                          },
                          {
                            platform: 'twitter',
                            icon: <FaXTwitter className="hover:text-blue-400 dark:hover:text-blue-300" />,
                            url: profile.twitter ? `https://twitter.com/${profile.twitter}` : null
                          },
                          {
                            platform: 'linkedin',
                            icon: <FaLinkedin className="hover:text-blue-300 dark:hover:text-blue-200" />,
                            url: profile.linkedin ? `https://www.linkedin.com/${profile.linkedin}` : null
                          }
                        ].map((social) => (
                          <a
                            key={social.platform}
                            href={social.url || '#'}
                            target={social.url ? "_blank" : "_self"}
                            rel={social.url ? "noopener noreferrer" : ""}
                            className={`w-8 h-8 flex items-center justify-center rounded-md text-white bg-gray-700 hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-800 transition ${!social.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {social.icon}
                          </a>
                        ))}
                      </div>

                      <Link to={'Account'}>
                        <button className="px-8 py-3 mt-4 border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 transition-colors duration-300 font-GreatVibes">
                          View Profile
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {artisans.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentSlide === index 
                  ? 'bg-gray-900 dark:bg-gray-100' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artisan;