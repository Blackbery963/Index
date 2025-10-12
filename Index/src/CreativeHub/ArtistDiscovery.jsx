// ArtistDiscovery.jsx (simplified)
import { Link } from 'react-router-dom';

const ArtistDiscovery = () => {
  const artists = [
    { id: 1, name: "Sophia Chen", specialty: "Watercolor", image: "artist1.jpg" },
    { id: 2, name: "James Wilson", specialty: "Sculpture", image: "artist2.jpg" },
    { id: 3, name: "Emma Brown", specialty: "Digital Art", image: "artist3.jpg" },
    { id: 4, name: "Michael Lee", specialty: "Photography", image: "artist4.jpg" },
  ];

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Featured Artists</h2>
          <p className="text-gray-600 dark:text-gray-400">Discover talented creators</p>
        </div>
        <Link to="/artists" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {artists.map(artist => (
          <div key={artist.id} className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3">
              <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">{artist.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{artist.specialty}</p>
            <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Follow
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtistDiscovery;