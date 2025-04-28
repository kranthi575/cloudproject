import { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';
import InventoryListCustomer from '../components/Inventory/InventoryListCustomer';
import CartSummary from '../components/Cart/CartSummary';
import { inventoryAPI } from '../components/Services/InventoryAPI';

export default function CustomerDashboard() {
  const auth = useAuth();

  const [cart, setCart] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchInventory();
    }
  }, [auth.isAuthenticated]);

  const fetchInventory = async () => {
    try {
      const items = await inventoryAPI.getAllItems();
      setInventory(items);
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const email = auth.user?.profile?.email;
      const result = await inventoryAPI.getOrdersByEmail(email);
      setOrders(result);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  const handleLogout = () => {
    auth.removeUser(); // Clear local session
  
    const clientId = "iaa957ql9401546qvgv9hos4i";
    const logoutUri = window.location.origin;
    const cognitoDomain = "https://us-east-1ykuf68nc3.auth.us-east-1.amazoncognito.com";
  
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };
  

  const handleAddToCart = (item, quantity) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
      ));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const handleClearCart = () => setCart([]);

  const toggleOrders = async () => {
    setShowOrders(prev => !prev);
    setShowCart(false);
    if (!showOrders) await fetchOrders();
  };

  if (!auth.isAuthenticated && !auth.isLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Store (customer)</h1>

        <div className="flex items-center gap-4">
          {/* 🏠 Home */}
          <button
            onClick={() => {
              setShowCart(false);
              setShowOrders(false);
            }}
            className="bg-white text-gray-700 px-3 py-2 border rounded hover:bg-gray-100"
          >
            🏠 Home
          </button>

          {/* 🛒 Cart */}
          <button
            onClick={() => {
              setShowCart(!showCart);
              setShowOrders(false);
            }}
            className="relative bg-white text-gray-700 px-3 py-2 border rounded hover:bg-gray-100"
          >
            🛒 Cart
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </button>

          {/* 📦 My Orders */}
          <button
            onClick={toggleOrders}
            className="bg-white text-gray-700 px-3 py-2 border rounded hover:bg-gray-100"
          >
            📦 My Orders
          </button>

          {/* 👤 Email */}
          <span className="text-gray-700">👤 {auth.user?.profile?.email}</span>

          {/* 🔓 Sign Out */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Cart Panel */}
      {showCart && (
        <div className="p-4 max-w-6xl mx-auto">
          <CartSummary cartItems={cart} onClear={handleClearCart} />
        </div>
      )}

      {/* Orders Panel */}
      {showOrders && (
        <div className="p-4 max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4">My Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded shadow p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-gray-700">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity} — ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  <div className="text-right mt-2 font-semibold">
                    Total: ${order.totalPrice.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Inventory Section */}
      {!showCart && !showOrders && (
        <div className="p-8 max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Available Items</h2>
          {loading ? (
            <div className="text-gray-500">Loading items...</div>
          ) : (
            <InventoryListCustomer items={inventory} onAddToCart={handleAddToCart} />
          )}
        </div>
      )}
    </div>
  );
}
