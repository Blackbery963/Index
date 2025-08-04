
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { FiChevronRight, FiUserPlus } from 'react-icons/fi';

const ArtistDiscovery = () => {


  const artists = [
    {
      id: 1,
      name: "Sophia Chen",
      specialty: "Watercolor",
      bio: "Creating dreamy landscapes with flowing hues.",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "James Wilson",
      specialty: "Sculpture",
      bio: "Modern shapes, timeless form.",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "Emma Brown",
      specialty: "Digital Art",
      bio: "Mixing fantasy and tech in illustrations.",
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      name: "Michael Lee",
      specialty: "Photography",
      bio: "Catching light and life in every shot.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 5,
      name: "Olivia Park",
      specialty: "Oil Painting",
      bio: "Bold, textured stories on canvas.",
      image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section className="py-12 bg-white dark:bg-[#0a0f14] max-w-[95%] mx-auto">
      <div className="max-w-[100%] mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
             Masters of the Canvas
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Explore handpicked creators tailored to your artistic taste
          </p>
        </div>

        {/* Category Filter (optional future feature) */}
         <div
    className="
      flex gap-4 overflow-x-auto hide-scrollbar 
      md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 md:overflow-visible
    "
  >
    {artists.map((artist) => (
      <div
        key={artist.id}
        className="
          flex-shrink-0 min-w-[240px] md:min-w-0
          bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md
          transition-all duration-200 border
        "
      >
        <div className="flex flex-col items-center text-center">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-20 h-20 rounded-full object-cover mb-3"
          />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {artist.name}
          </h3>
          <p className="text-xs text-blue-500 mb-1">{artist.specialty}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
            {artist.bio || "Passionate artist sharing creative journeys."}
          </p>
          <button className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 border border-blue-500 rounded-full px-3 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all">
            <FiUserPlus className="text-xs" />
            Follow
          </button>
        </div>
      </div>
    ))}
  </div>

        {/* CTA */}
        <div className="mt-8 text-right">

          <Link to={"Artists/DiscoverUsers"}>
          <button className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            View all artists
            <FiChevronRight className="ml-1" />
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArtistDiscovery;

