import { useState } from 'react';
import { motion } from 'motion/react';
import { menuItems } from '../data';
import { useCart } from './CartContext';
import { Menu as MenuIcon, Filter, Plus } from 'lucide-react';

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('Best Sellers');
  const { addToCart } = useCart();

  const categories = ['Best Sellers', 'All', 'Pizza', 'Deals', 'Sides'];

  const filteredItems = activeCategory === 'Best Sellers'
    ? menuItems.filter(i => i.isBestSeller)
    : activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(i => i.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center justify-center gap-3 tracking-tight">
              Explore Our <span className="text-red-600">Menu</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 font-medium">Freshly baked, premium ingredients.</p>
          </motion.div>
        </div>

        <div className="flex justify-center mb-12 overflow-x-auto pb-4">
          <div className="flex gap-2 p-1.5 bg-white rounded-full shadow-md border border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-105' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
              key={item.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:border-red-200 overflow-hidden hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="h-64 overflow-hidden relative bg-gray-100">
                {item.image ? (
                   <img 
                     src={item.image} 
                     alt={item.name} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                   />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
                {item.isBestSeller && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    Best Seller
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                   <p className="text-white text-sm font-medium">{item.description}</p>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{item.name}</h3>
                  </div>
                  <p className="text-gray-500 mb-6 line-clamp-2 text-sm">{item.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-extrabold text-red-600">
                    Rs {item.price}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="p-3 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-red-200"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
