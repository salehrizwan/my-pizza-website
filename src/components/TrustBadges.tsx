import { motion } from 'motion/react';
import { ShieldCheck, Leaf, Flame, Heart } from 'lucide-react';

const badges = [
  {
    icon: <Flame className="w-8 h-8 text-orange-500" />,
    title: "Freshly Baked",
    description: "Hot straight out of the oven, maintaining the perfect crispiness."
  },
  {
    icon: <Leaf className="w-8 h-8 text-green-500" />,
    title: "Premium Ingredients",
    description: "We use only the highest quality meats, fresh veggies, and rich cheeses."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
    title: "100% Halal",
    description: "Certified and guaranteed halal fast food for your peace of mind."
  },
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Made with Love",
    description: "Serving Lalamusa with passion and a commitment to incredible taste."
  }
];

export function TrustBadges() {
  return (
    <section className="py-20 bg-gray-900 border-t border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-6 bg-gray-800/50 rounded-3xl border border-gray-700/50 hover:bg-gray-800 transition-colors"
            >
              <div className="bg-gray-900 p-4 rounded-full shadow-inner mb-6">
                {badge.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{badge.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
