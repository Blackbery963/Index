import { Link } from 'react-router-dom';

const Gateway = () => {
  const communities = [
    {
      name: "Artisan Collective",
      type: "Traditional Artists",
      members: "12.4K",
      image: "community1.jpg"
    },
    {
      name: "Digital Creators",
      type: "Digital Artists", 
      members: "8.7K",
      image: "community2.jpg"
    },
    {
      name: "Lens Masters",
      type: "Photographers",
      members: "15.2K", 
      image: "community3.jpg"
    },
    {
      name: "Brush & Beyond",
      type: "Contemporary Painters",
      members: "22.1K",
      image: "community4.jpg"
    },
  ];

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Creative Communities</h2>
          <p className="text-gray-600 dark:text-gray-400">Join groups of like-minded artists</p>
        </div>
        <Link to="/communities" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {communities.map((community, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="aspect-[4/3] rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden mb-3 relative">
              <img 
                src={community.image} 
                alt={community.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">{community.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{community.type}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">{community.members} members</span>
              <button className="text-sm bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-lg hover:opacity-80 transition-opacity">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gateway;