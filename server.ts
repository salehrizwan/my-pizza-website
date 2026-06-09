import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory database
interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: any[];
  total: number;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt: string;
  isReviewed?: boolean;
}

interface Review {
  id: string;
  orderId?: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

let orders: Order[] = [];
let reviews: Review[] = [
  {
    id: 'r1',
    reviewerName: 'John D.',
    rating: 5,
    comment: 'The pizza here is absolutely fantastic! The zinger burger is crispy and fresh. Quick delivery too.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'r2',
    reviewerName: 'Sarah M.',
    rating: 5,
    comment: 'Best fast food joint in Lalamusa. The spicy tikka pizza is my favorite, highly recommended!',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  }
];

// API Routes
app.post('/api/orders', (req, res) => {
  // Generate a random 6-digit order ID that is user-friendly
  const newOrder: Order = {
    id: Math.floor(100000 + Math.random() * 900000).toString(),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString(),
    isReviewed: false,
  };
  orders.push(newOrder);
  res.status(201).json({ message: 'Order created successfully', orderId: newOrder.id });
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Track order by ID and Phone number
app.get('/api/orders/track', (req, res) => {
  const { id, phone } = req.query;
  const order = orders.find((o) => o.id === id && o.phone === phone);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found or details mismatch' });
  }
});

app.post('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = orders.find((o) => o.id === id);
  if (order && ['pending', 'accepted', 'completed', 'cancelled'].includes(status)) {
    order.status = status;
    res.json({ message: 'Order status updated', order });
  } else {
    res.status(400).json({ message: 'Invalid order or status' });
  }
});

// Reviews endpoints
app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
  const { orderId, reviewerName, rating, comment } = req.body;
  
  // If orderId provided, verify it and mark reviewed
  if (orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status !== 'completed') return res.status(400).json({ message: 'Can only review completed orders' });
    if (order.isReviewed) return res.status(400).json({ message: 'Order already reviewed' });
    
    order.isReviewed = true;
  }

  const newReview: Review = {
    id: Math.random().toString(36).substr(2, 9),
    orderId,
    reviewerName: reviewerName || 'Anonymous',
    rating: Number(rating),
    comment,
    date: new Date().toISOString(),
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
});

async function startServer() {

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
