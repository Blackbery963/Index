import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const ArtResearchPage = () => {
  const featuredPapers = [
    {
      id: 1,
      title: "Digital Brushstrokes: AI in Contemporary Art",
      authors: "M. Chen, A. Rodriguez",
      excerpt: "Exploring how neural networks are transforming artistic creation",
      image: "research1.jpg",
    },
    {
      id: 2,
      title: "The Minimalist Aesthetic", 
      authors: "S. Yamamoto",
      excerpt: "How less became more in 21st century art",
      image: "research2.jpg",
    },
    {
      id: 3,
      title: "Street Art as Social Commentary",
      authors: "J. Banks Collective", 
      excerpt: "Urban spaces as canvases for cultural dialogue",
      image: "research3.jpg",
    },
  ];

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Art Research</h2>
          <p className="text-gray-600 dark:text-gray-400">Essential readings on modern artistic practice</p>
        </div>
        <Link to="/research" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredPapers.map((paper) => (
          <div key={paper.id} className="group cursor-pointer">
            <div className="aspect-[4/3] rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden mb-4">
              <img 
                src={paper.image} 
                alt={paper.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">{paper.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{paper.authors}</p>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">{paper.excerpt}</p>
            <button className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Read study <FiArrowRight className="ml-1" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center mt-8">
        <Link to="/research/hub">
          <button className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl hover:opacity-80 transition-opacity">
            View all studies
          </button>
        </Link>
        <Link to="/research/contribute">
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Contribute research
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ArtResearchPage;