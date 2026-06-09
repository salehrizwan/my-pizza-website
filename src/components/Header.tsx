import { Link } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, MapPin } from 'lucide-react';
import { useCart } from './CartContext';
import myPizzaLogo from '../assets/images/my_pizza_logo_1780999753765.png';

export function Header() {
  const { cart, setIsOpen } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-30 border-b border-gray-100 layout-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={myPizzaLogo} 
              alt="My Pizza Logo" 
              className="w-12 h-12 object-cover rounded-full shadow-md border-2 border-red-500 overflow-hidden group-hover:scale-105 transition-transform" 
            />
            <span className="font-extrabold text-2xl tracking-tighter text-gray-900">
              MY <span className="text-red-600">Pizza</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/#menu" className="font-semibold text-gray-700 hover:text-red-600 transition-colors">Menu</a>
            <a href="/#about" className="font-semibold text-gray-700 hover:text-red-600 transition-colors">About</a>
            <a href="/#reviews" className="font-semibold text-gray-700 hover:text-red-600 transition-colors">Reviews</a>
            <Link to="/track" className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-700 transition-colors bg-red-50 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" /> Track Order
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 text-gray-700 hover:text-white hover:bg-red-600 transition-all bg-gray-100 rounded-full group"
            >
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {itemCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-gray-700">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
