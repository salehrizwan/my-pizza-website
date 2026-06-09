import { useEffect, useState } from 'react';
import { Star, MapPin, Clock, Phone, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { Review } from '../types';

export function InfoSections() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(console.error);
  }, []);

  return (
    <>
      {/* About & Directions */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gray-900 text-white rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row gap-16 items-center shadow-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight text-white">Find My Pizza</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-red-600 p-4 rounded-2xl shadow-lg shrink-0"><MapPin className="w-6 h-6 text-white" /></div>
                  <div>
                    <h3 className="font-bold text-xl mb-1 text-white">Location</h3>
                    <p className="text-gray-400 font-medium mb-3">Near Fatima Jinah Park, Behari Colony, Lalamusa, Pakistan</p>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=My+Pizza+Lalamusa,+Behari+Colony,+Lalamusa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-colors shadow-lg">
                      <MapPin className="w-4 h-4" /> Get Directions
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-red-600 p-4 rounded-2xl shadow-lg shrink-0"><Clock className="w-6 h-6 text-white" /></div>
                  <div>
                    <h3 className="font-bold text-xl mb-1 text-white">Hours</h3>
                    <p className="text-gray-400 font-medium">Open Everyday · Closes 3:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-red-600 p-4 rounded-2xl shadow-lg shrink-0"><Phone className="w-6 h-6 text-white" /></div>
                  <div>
                    <h3 className="font-bold text-xl mb-1 text-white">Contact</h3>
                    <p className="text-gray-400 font-medium text-lg">03430696210</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:w-1/2 w-full h-[400px] bg-gray-800 rounded-3xl overflow-hidden border-8 border-gray-800 shadow-xl"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13374.40939529323!2d73.94582695536556!3d32.700140228303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f4b82d4957f83%3A0xc6c7d9bcddf1e00!2sMy%20Pizza%20Lalamusa!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="My Pizza Lalamusa Location"
                aria-label="Interactive map showing the location of My Pizza Lalamusa"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Customer <span className="text-red-600">Reviews</span></h2>
            <div className="flex items-center justify-center gap-2 mt-6 text-3xl">
              <span className="font-extrabold">4.8</span>
              <div className="flex text-yellow-400">
                <Star className="fill-current" /><Star className="fill-current" /><Star className="fill-current" /><Star className="fill-current" /><Star className="fill-current rotate-12" />
              </div>
              <span className="text-gray-500 text-lg ml-3 font-medium">({reviews.length > 0 ? reviews.length + 102 : '104'} reviews)</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div 
                key={review.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative hover:shadow-lg transition-shadow"
              >
                <Quote className="absolute top-6 right-8 w-12 h-12 text-red-50 opacity-50" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                    {review.reviewerName[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{review.reviewerName}</h4>
                    <div className="flex text-yellow-400 w-4 h-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={i < review.rating ? 'fill-current' : 'text-gray-200'} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed font-medium">
                  "{review.comment}"
                </p>
                <div className="mt-6 text-sm text-gray-400 font-medium">
                  {new Date(review.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
