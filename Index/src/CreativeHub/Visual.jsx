import { Link } from 'react-router-dom';

const Visual = () => {
  const products = [
    {
      id: 1,
      title: 'Handwoven Basket',
      price: 45,
      image: 'product1.jpg',
      category: 'basketry',
    },
    {
      id: 2,
      title: 'Ceramic Clay Pot',
      price: 60,
      image: 'product2.jpg',
      category: 'pottery',
    },
    {
      id: 3,
      title: 'Macramé Wall Hanging',
      price: 80,
      image: 'product3.jpg',
      category: 'wall decor',
    },
    {
      id: 4,
      title: 'Hand-Carved Wooden Items',
      price: 25,
      image: 'product4.jpg',
      category: 'woodwork',
    },
    {
      id: 5,
      title: 'Natural Dye Textile',
      price: 95,
      image: 'product5.jpg',
      category: 'textile',
    },
    {
      id: 6,
      title: 'Pressed Floral Frame',
      price: 30,
      image: 'product6.jpg',
      category: 'paper craft',
    },
  ];

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Handmade Products</h2>
          <p className="text-gray-600 dark:text-gray-400">Unique pieces for your collection</p>
        </div>
        <Link to="/shop" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden mb-3">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">{product.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{product.category}</p>
            <p className="font-medium text-gray-900 dark:text-white">${product.price}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/shop">
          <button className="px-8 py-3 border border-black dark:border-white text-black dark:text-white rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
            Explore Collection
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Visual;