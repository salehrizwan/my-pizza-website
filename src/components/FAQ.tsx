import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Do you offer home delivery?",
    answer: "Yes, we offer fast and reliable home delivery within Lalamusa. Delivery charges may apply based on your exact location."
  },
  {
    question: "What are your opening hours?",
    answer: "We are open everyday from 6:00 AM to 3:00 AM, ready to serve you hot and fresh food."
  },
  {
    question: "Do you have vegetarian options?",
    answer: "Yes! Our Vegetable Pizza is loaded with fresh onions, capsicum, olives, mushrooms, and tomatoes. We also have sides suitable for vegetarians."
  },
  {
    question: "How long does delivery take?",
    answer: "Our standard delivery time is between 30 to 45 minutes, depending on order volume and your location."
  },
  {
    question: "Can I customize my pizza?",
    answer: "Absolutely! You can request to add extra cheese or remove certain toppings. Please mention your preferences while ordering."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center justify-center gap-3 tracking-tight">
              <HelpCircle className="w-10 h-10 text-red-600" />
              Frequently Asked <span className="text-red-600">Questions</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 font-medium">Everything you need to know about My Pizza.</p>
          </motion.div>
        </div>

        <div className="space-y-4 shadow-sm border border-gray-100 rounded-3xl p-6 md:p-10 bg-gray-50">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
              >
                <span className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-red-600' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 pb-4 font-medium leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.answer
            }
          }))
        })
      }} />
    </section>
  );
}
