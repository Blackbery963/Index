import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, UserPlus, MapPin, Sparkles, Palette, Camera, Brush, Zap, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ArtistDiscovery = ({ viewMode = 'feed', onArtistClick, onFollow }) => {
  const [artists, setArtists] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const specialtyStyles = {
    Watercolor: { icon: Palette, color: 'from-blue-500 to-cyan-500' },
    Digital: { icon: Zap, color: 'from-purple-500 to-pink-500' },
    Sculpture: { icon: Brush, color: 'from-amber-500 to-orange-500' },
    Photography: { icon: Camera, color: 'from-emerald-500 to-teal-500' },
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch('https://randomuser.me/api/?results=8&inc=name,picture,location,login');
        const data = await res.json();

        const specialties = Object.keys(specialtyStyles);
        const cities = ['Paris', 'Tokyo', 'New York', 'Berlin', 'Seoul', 'Mexico City', 'London', 'Barcelona'];

        const loaded = data.results.map((user, i) => {
          const specialty = specialties[i % specialties.length];
          const { icon: Icon, color } = specialtyStyles[specialty];

          return {
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            specialty,
            specialtyColor: color,
            specialtyIcon: Icon,
            avatar: user.picture.large,
            location: `${cities[i % cities.length]}`,
            followers: Math.floor(Math.random() * 8000) + 800,
            isFollowing: Math.random() > 0.6,
            isFeatured: i < 3
          };
        });

        setArtists(loaded);
      } catch {
        setArtists([]);
      }
    };

    fetchArtists();
  }, []);

  const next = () => setCurrentSlide((p) => (p + 1) % artists.length);
  const prev = () => setCurrentSlide((p) => (p - 1 + artists.length) % artists.length);

  const toggleFollow = (e, id) => {
    e.stopPropagation();
    onFollow?.(id);

    setArtists(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, isFollowing: !a.isFollowing, followers: a.isFollowing ? a.followers - 1 : a.followers + 1 }
          : a
      )
    );
  };

  // FEED MODE
  if (viewMode === 'feed') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full rounded-sm border border-gray-300 dark:border-gray-700 p-2 bg-transparent"
      >
        {/* TOP BOX */}
        <div className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Featured Artists</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Amazing creators to follow</p>
            </div>
          </div>

          <Link
            to="/Artists/DiscoverUsers"
            className="text-rose-600 dark:text-rose-400 text-xs font-medium hover:underline"
          >
            View all →
          </Link>
        </div>

        {/* MIDDLE SLIDER BOX */}
        <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden relative">
          <motion.div
            className="flex"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            {artists.map((artist) => {
              const Icon = artist.specialtyIcon;
              return (
                <div
                  key={artist.id}
                  className="w-full flex-shrink-0 p-4 cursor-pointer"
                  onClick={() => onArtistClick?.(artist)}
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 shadow-sm">
                        <img
                          src={artist.avatar}
                          alt={artist.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      {artist.isFeatured && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {artist.name}

                        <div className={`w-7 h-7 rounded-full bg-gradient-to-r ${artist.specialtyColor} flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                      </h4>

                      <p className="text-sm text-rose-600 dark:text-rose-400 font-medium">
                        {artist.specialty} Artist
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {artist.location}
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5" />{" "}
                          {artist.followers.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Follow Button */}
                    <button
                      onClick={(e) => toggleFollow(e, artist.id)}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                        artist.isFollowing
                          ? "border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                          : "bg-rose-600 text-white hover:bg-rose-700"
                      }`}
                    >
                      {artist.isFollowing ? "Following" : "+ Follow"}
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* NEW ARROW CONTROLS — NOT OVERLAPPING ANYTHING */}

        </div>
{/* FIXED RESPONSIVE ARROWS */}
<button
  onClick={prev}
  className="
    absolute 
    left-2           /* stays inside screen on mobile */
    top-1/2 
    -translate-y-1/2
    z-20
    p-1.5
    bg-white/90 dark:bg-gray-900/90 
    border border-gray-300 dark:border-gray-700 
    rounded-full shadow-sm
    backdrop-blur-md
  "
>
  <ArrowLeft className="w-4 h-4" />
</button>

<button
  onClick={next}
  className="
    absolute 
    right-2          /* also inside, safe for mobile */
    top-1/2 
    -translate-y-1/2
    z-20
    p-1.5
    bg-white/90 dark:bg-gray-900/90 
    border border-gray-300 dark:border-gray-700 
    rounded-full shadow-sm
    backdrop-blur-md
  "
>
  <ArrowRight className="w-4 h-4" />
</button>

      </motion.div>
    );
  }

  return null;
};

export default ArtistDiscovery;
