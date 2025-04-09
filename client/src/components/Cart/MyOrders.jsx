import { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { inventoryAPI } from '../components/Services/InventoryAPI';

export default function MyOrders() {
  const auth = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const email = auth.user?.profile?.email;
      const result = await inventoryAPI.getOrdersByEmail(email);
      setOrders(result);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchOrders();
    }
  }, [auth.isAuthenticated]);

  if (!auth.isAuthenticated) return <div className="p-4">Please log in to view your orders.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>

      {loading ? (
        <p className="text-gray-600">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
                <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</span>
              </div>

              <ul className="list-disc list-inside text-gray-700">
                {order.items.map((item, index) => (
                  <li key={index}>
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
  );
}
