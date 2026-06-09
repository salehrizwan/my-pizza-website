import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Search, Package, CheckCircle, Clock, Truck, Star } from 'lucide-react';
import { Order } from '../types';

export function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Review Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);
    setReviewSubmitted(false);

    try {
      const res = await fetch(`/api/orders/track?id=${orderId}&phone=${phone}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else {
        const err = await res.json();
        setError(err.message || 'Order not found');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;
    
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          reviewerName: order.customerName,
          rating,
          comment
        }),
      });

      if (res.ok) {
        setReviewSubmitted(true);
        setOrder({ ...order, isReviewed: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-12 h-12 text-yellow-500" />;
      case 'accepted': return <Truck className="w-12 h-12 text-blue-500" />;
      case 'completed': return <CheckCircle className="w-12 h-12 text-green-500" />;
      default: return <Package className="w-12 h-12 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Order Placed & Pending Confirmation';
      case 'accepted': return 'Preparing & Out for Delivery';
      case 'completed': return 'Delivered Successfully';
      case 'cancelled': return 'Order Cancelled';
      default: return 'Unknown Status';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 font-sans text-gray-900">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Track Your Order</h1>
          <p className="text-gray-600">Enter your order ID and phone number to see the status.</p>
        </div>

        <form onSubmit={handleTrack} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1">
             <label className="block text-sm font-bold text-gray-700 mb-2">Order ID</label>
             <input 
               type="text" 
               required
               placeholder="e.g. 123456"
               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all font-mono"
               value={orderId}
               onChange={e => setOrderId(e.target.value)}
             />
          </div>
          <div className="flex-1">
             <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
             <input 
               type="tel" 
               required
               placeholder="Enter phone used for order"
               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
               value={phone}
               onChange={e => setPhone(e.target.value)}
             />
          </div>
          <div className="flex items-end">
            <button 
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-70 h-[50px]"
            >
              <Search className="w-5 h-5 mr-2" />
              {loading ? 'Searching...' : 'Track'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium mb-8">
            {error}
          </div>
        )}

        {order && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-6 justify-center text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 mb-8">
                {getStatusIcon(order.status)}
                <div>
                   <h2 className="text-2xl font-bold text-gray-900 mb-1">{getStatusText(order.status)}</h2>
                   <p className="text-gray-500 font-medium">Order #{order.id}</p>
                </div>
              </div>

              <h3 className="font-bold text-xl mb-4 border-b pb-4">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {order.items.map((item, idx) => (
                   <div key={idx} className="flex justify-between items-center text-gray-700">
                     <span className="font-medium">{item.quantity}x {item.name}</span>
                     <span>Rs {item.price * item.quantity}</span>
                   </div>
                ))}
              </div>
              <div className="flex justify-between items-center text-xl font-extrabold border-t pt-4">
                <span>Total</span>
                <span className="text-red-600">Rs {order.total}</span>
              </div>
            </div>

            {/* Review Section */}
            {order.status === 'completed' && !order.isReviewed && !reviewSubmitted && (
              <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                <h3 className="font-bold text-2xl mb-2 text-center">How was your food?</h3>
                <p className="text-gray-600 text-center mb-6">Leave a review to help us improve.</p>
                
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star className={`w-10 h-10 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    required
                    placeholder="Tell us what you liked about your order..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all resize-none"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                  <button type="submit" className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors">
                    Submit Review
                  </button>
                </form>
              </div>
            )}

            {(order.isReviewed || reviewSubmitted) && (
              <div className="bg-green-50 text-green-700 p-6 rounded-3xl border border-green-100 text-center font-bold">
                Thank you for your feedback! Your review has been published.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
