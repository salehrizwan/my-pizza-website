import React, { useEffect, useState } from 'react';
import { Order } from '../types';
import { Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Clock, XCircle, RefreshCw, Lock } from 'lucide-react';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password requirement
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const fetchOrders = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        // Sort descending by date
        setOrders(data.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      const interval = setInterval(fetchOrders, 10000); // Auto-refresh every 10s
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 w-full max-w-md text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
          <p className="text-gray-500 mb-8">Enter the administration password to view orders.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors">
              Login
            </button>
          </form>
          <Link to="/" className="inline-block mt-6 text-sm text-gray-500 hover:text-red-600 font-medium transition-colors">
            &larr; Back to Website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={fetchOrders}
               className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow border border-gray-100 text-sm font-medium hover:bg-gray-50 transition-colors"
             >
               <RefreshCw className={`w-4 h-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
               Refresh
             </button>
             <button 
               onClick={() => setIsAuthenticated(false)}
               className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg shadow border border-red-100 text-sm font-bold hover:bg-red-100 transition-colors"
             >
               Logout
             </button>
          </div>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {loading && orders.length === 0 ? (
             <div className="p-16 text-center text-gray-400 flex flex-col items-center">
               <RefreshCw className="w-8 h-8 animate-spin mb-4" />
               <p>Loading orders...</p>
             </div>
          ) : orders.length === 0 ? (
            <div className="p-16 text-center text-gray-500">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No active orders</h3>
              <p>When a customer places an order, it will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100">
                    <th className="p-5 font-bold text-gray-500 text-xs tracking-wider uppercase">Order ID</th>
                    <th className="p-5 font-bold text-gray-500 text-xs tracking-wider uppercase">Customer</th>
                    <th className="p-5 font-bold text-gray-500 text-xs tracking-wider uppercase">Items</th>
                    <th className="p-5 font-bold text-gray-500 text-xs tracking-wider uppercase">Total</th>
                    <th className="p-5 font-bold text-gray-500 text-xs tracking-wider uppercase">Status</th>
                    <th className="p-5 font-bold text-gray-500 text-xs tracking-wider uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-5 font-mono text-sm text-gray-500 font-medium">#{order.id}</td>
                      <td className="p-5">
                        <div className="font-bold text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500 font-medium">{order.phone}</div>
                        <div className="text-xs text-gray-400 mt-1 max-w-[150px] truncate" title={order.address}>{order.address}</div>
                      </td>
                      <td className="p-5">
                        <div className="text-sm font-medium text-gray-700">
                          {order.items.map((item, i) => (
                            <div key={i} className="mb-0.5">{item.quantity}x {item.name}</div>
                          ))}
                        </div>
                      </td>
                      <td className="p-5 font-extrabold text-gray-900">Rs {order.total}</td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-5">
                        {order.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'accepted')}
                              className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-bold text-sm transition-colors shadow-sm"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                              className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 rounded-lg font-bold text-sm transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {order.status === 'accepted' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'completed')}
                            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg font-bold text-sm transition-colors shadow-sm flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" /> Delivered
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
