import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Menu } from '../components/Menu';
import { InfoSections } from '../components/InfoSections';
import { FAQ } from '../components/FAQ';
import { TrustBadges } from '../components/TrustBadges';
import { FloatingActions } from '../components/FloatingActions';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
        <main>
          <Hero />
          <TrustBadges />
          <Menu />
          <InfoSections />
          <FAQ />
        </main>
        <FloatingActions />
        <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">My Pizza Lalamusa</h3>
                <p className="text-gray-400 font-medium max-w-sm mx-auto md:mx-0">
                  The finest fast food and tastiest pizzas in town. Crafted with passion, delivered with speed.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                <ul className="space-y-2 font-medium">
                  <li><a href="/#menu" className="hover:text-red-500 transition-colors">Our Menu</a></li>
                  <li><a href="/track" className="hover:text-red-500 transition-colors">Track Your Order</a></li>
                  <li><a href="/#about" className="hover:text-red-500 transition-colors">Location & Hours</a></li>
                  <li><a href="/#faq" className="hover:text-red-500 transition-colors">FAQs</a></li>
                </ul>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-red-600 hover:text-white transition-all" aria-label="Facebook">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-red-600 hover:text-white transition-all" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-red-600 hover:text-white transition-all" aria-label="Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium">
              <p>© {new Date().getFullYear()} My Pizza Lalamusa. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a href="/admin" className="hover:text-white transition-colors flex items-center gap-1">
                  Admin Login
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
}
