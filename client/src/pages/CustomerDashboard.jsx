import { useState, useEffect } from 'react';
import InventoryListCustomer from '../components/Inventory/InventoryListCustomer';
import CartSummary from '../components/Cart/CartSummary';
import { inventoryAPI } from '../components/Services/InventoryAPI';

export default function CustomerDashboard() {
  const [cart, setCart] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const items = await inventoryAPI.getAllItems();
      setInventory(items);
      setLoading(false);
    };
    fetchData();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 flex justify-between items-center shadow bg-white">
        <h1 className="text-2xl font-bold">Inventory Store</h1>
        <CartSummary cartItems={cart} onClear={handleClearCart} />
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Available Items</h2>
        {loading ? (
          <div className="text-gray-500">Loading items...</div>
        ) : (
          <InventoryListCustomer items={inventory} onAddToCart={handleAddToCart} />
        )}
      </div>
    </div>
  );
}
