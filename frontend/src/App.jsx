import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import { useCart } from './context/CartContext.jsx';

export default function App() {
  const { count } = useCart();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 text-white shadow">
        <div className="container-app py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg tracking-tight">Mock E-Com Cart</Link>
          <nav className="flex gap-1 text-sm">
            <NavLink to="/" className={({isActive})=> `nav-link-invert ${isActive? 'nav-link-invert-active' : ''}`}>Products</NavLink>
            <NavLink to="/cart" className={({isActive})=> `nav-link-invert ${isActive? 'nav-link-invert-active' : ''}`}>
              <span className="relative inline-flex items-center">Cart
                {count > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center text-[10px] font-semibold rounded-full px-1.5 py-0.5 bg-white text-fuchsia-700">
                    {count}
                  </span>
                )}
              </span>
            </NavLink>
            <NavLink to="/checkout" className={({isActive})=> `nav-link-invert ${isActive? 'nav-link-invert-active' : ''}`}>Checkout</NavLink>
            <NavLink to="/orders" className={({isActive})=> `nav-link-invert ${isActive? 'nav-link-invert-active' : ''}`}>Orders</NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 container-app py-6">
        <Routes>
          <Route path="/" element={<Products/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/orders" element={<Orders/>} />
        </Routes>
      </main>
      <footer className="text-center text-xs text-gray-500 py-6">Demo app — no real payments</footer>
    </div>
  );
}
