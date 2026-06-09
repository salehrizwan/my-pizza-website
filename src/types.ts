export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Pizza' | 'Deals' | 'Sides' | 'Drinks';
  image?: string;
  isBestSeller?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt: string;
  isReviewed?: boolean;
}

export interface Review {
  id: string;
  orderId?: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}
