import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { TrackOrder } from './pages/TrackOrder';
import { CartProvider } from './components/CartContext';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/track" element={<TrackOrder />} />
        </Routes>
        <CartDrawer />
      </BrowserRouter>
    </CartProvider>
  );
}


