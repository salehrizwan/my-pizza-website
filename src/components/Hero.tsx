import { motion } from 'motion/react';
import { ShoppingBag, Star } from 'lucide-react';
import myPizzaLogo from '../assets/images/my_pizza_logo_1780999753765.png';
import chickenPizzaPic from '../assets/images/chicken_pizza_1780999784524.png';

export function Hero() {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-[#0a0a0a] text-white pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-red-900/40 border border-red-500/30 text-red-400 font-bold px-4 py-2 rounded-full mb-8 text-sm uppercase tracking-wider">
            <Star className="w-4 h-4 fill-current" />
            Top Rated Fast Food in Lalamusa
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-gray-50">
            Taste the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">Perfect Slice</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 font-medium">
            Satisfy your cravings with our freshly baked pizzas, crispy zinger burgers, and amazing combo deals.
          </p>
          <div className="flex justify-center lg:justify-start">
            <button 
              onClick={scrollToMenu}
              className="bg-red-600 text-white font-bold text-lg px-10 py-5 rounded-2xl hover:bg-red-700 hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(220,38,38,0.4)]"
            >
              <ShoppingBag className="w-6 h-6" />
              Order Online Now
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
          className="lg:w-1/2 relative w-full max-w-lg mx-auto lg:max-w-none"
        >
          <div className="relative">
             {/* Decorative Background blob */}
             <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 to-yellow-500/30 rounded-full blur-3xl pointer-events-none" />
             <img 
               src={chickenPizzaPic} 
               alt="Gourmet Pizza"
               className="relative z-10 w-full h-auto drop-shadow-2xl animate-[spin_60s_linear_infinite]"
             />
             
             {/* Floating Badge */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
               className="absolute -bottom-4 -left-4 bg-white text-gray-900 p-4 rounded-2xl shadow-2xl z-20 flex items-center gap-3"
             >
                <img src={myPizzaLogo} className="w-10 h-10 rounded-full" alt="Logo" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Starting from</p>
                  <p className="text-xl font-extrabold text-red-600">Rs 1,000</p>
                </div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
