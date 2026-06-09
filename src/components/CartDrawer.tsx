import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Plus, Minus, CreditCard } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart } from './CartContext';

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, addToCart, removeFromCart, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus('loading');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          phone: formData.phone,
          address: formData.address,
          items: cart,
          total,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setOrderId(data.orderId);
        setOrderStatus('success');
        clearCart();
        
        // Send format to WhatsApp
        const whatsappText = `*New Order Placed!*\n\n*Order ID:* ${data.orderId}\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Address:* ${formData.address}\n\n*Items:*\n${cart.map(item => `- ${item.quantity}x ${item.name}`).join('\n')}\n\n*Total:* Rs ${total}\n\nPlease confirm my order.`;
        const whatsappUrl = `https://wa.me/923430696210?text=${encodeURIComponent(whatsappText)}`;
        window.open(whatsappUrl, '_blank');

        setTimeout(() => {
          setIsOpen(false);
          setOrderStatus('idle');
          setIsCheckingOut(false);
          setFormData({ name: '', phone: '', address: '' });
          setOrderId(null);
        }, 8000); // Give them 8 seconds to read the ID
      } else {
        setOrderStatus('error');
      }
    } catch (err) {
      setOrderStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart className="text-red-600" />
                Your Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 && !isCheckingOut && orderStatus === 'idle' ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                  <ShoppingCart className="w-16 h-16 opacity-20" />
                  <p>Your cart is empty.</p>
                </div>
              ) : orderStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full items-center justify-center flex mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Order Placed!</h3>
                  <p className="text-gray-600">Thank you. We have received your order.</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 w-full">
                     <p className="text-sm font-medium text-gray-500 mb-1">Your Order ID:</p>
                     <p className="text-2xl font-mono font-bold text-gray-900 tracking-wider bg-white py-2 px-4 rounded-lg shadow-inner inline-block">{orderId}</p>
                  </div>
                  <p className="text-red-600 text-sm font-medium mt-2">Use this ID and your phone number on the Track Order page!</p>
                </div>
              ) : isCheckingOut ? (
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                  <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      required
                      type="tel"
                      className="w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-red-600 font-medium">Rs {item.price}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-white border rounded-md px-2 py-1">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-4 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="text-gray-500 hover:text-green-500"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && orderStatus === 'idle' && (
              <div className="border-t p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-gray-600">Total Amount:</span>
                  <span className="text-2xl font-bold">Rs {total}</span>
                </div>
                {isCheckingOut ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsCheckingOut(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                      type="button"
                    >
                      Back
                    </button>
                    <button
                      form="checkout-form"
                      type="submit"
                      disabled={orderStatus === 'loading'}
                      className="flex-[2] flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-70 transition-colors"
                    >
                      {orderStatus === 'loading' ? 'Processing...' : 'Confirm Order'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    <CreditCard className="w-5 h-5" />
                    Proceed to Checkout
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
