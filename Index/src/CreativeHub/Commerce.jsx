// Commerce.jsx (simplified)
import { Link } from 'react-router-dom';

const Commerce = () => {
  const products = [
    { id: 1, name: "Handmade Painting", price: "$45", image: "product1.jpg" },
    { id: 2, name: "Ceramic Pot", price: "$60", image: "product2.jpg" },
    { id: 3, name: "Textile Art", price: "$80", image: "product3.jpg" },
    { id: 4, name: "Wooden Craft", price: "$25", image: "product4.jpg" },
  ];

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Art Marketplace</h2>
          <p className="text-gray-600 dark:text-gray-400">Shop unique handmade pieces</p>
        </div>
        <Link to="/shop" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="group">
            <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden mb-2">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">{product.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Commerce;