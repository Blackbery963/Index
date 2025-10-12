// ArtCategories.jsx (simplified)
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const ArtCategories = () => {
  const categories = [
    { id: 1, name: "Portrait", image: "portrait.jpg", link: "/portrait" },
    { id: 2, name: "Landscape", image: "landscape.png", link: "/landscape" },
    { id: 3, name: "Abstract", image: "abstract.jpg", link: "/abstract" },
    { id: 4, name: "Still Life", image: "still-life.jpg", link: "/still-life" },
    { id: 5, name: "Oil Painting", image: "oil.jpg", link: "/oil-painting" },
    { id: 6, name: "Watercolor", image: "water.jpg", link: "/watercolor" },
  ];

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Art Categories</h2>
          <p className="text-gray-600 dark:text-gray-400">Explore different artistic styles</p>
        </div>
        <Link to="/categories" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
          View all <FiArrowRight className="ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map(category => (
          <Link key={category.id} to={category.link} className="group">
            <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden mb-2">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-sm font-medium text-center text-gray-900 dark:text-white">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ArtCategories;