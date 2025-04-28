import { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';
import { inventoryAPI } from '../components/Services/InventoryAPI';
import InventoryList from '../components/Inventory/InventoryList';
import AddItemForm from '../components/Inventory/AddItemForm';

export default function OwnerDashboard() {
  const auth = useAuth();

  const [inventory, setInventory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showMyItems, setShowMyItems] = useState(false);
  const [showOrdersTab, setShowOrdersTab] = useState(false);
  const [receivedOrders, setReceivedOrders] = useState([]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchInventory();
    }
  }, [auth.isAuthenticated]);

  if (!auth.isAuthenticated && !auth.isLoading) {
    return <Navigate to="/" replace />;
  }

  const signOutRedirect = () => {
    auth.removeUser();
    const clientId = "iaa957ql9401546qvgv9hos4i";
    const logoutUri = window.location.origin;
    const cognitoDomain = "https://us-east-1ykuf68nc3.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  const fetchInventory = async () => {
    try {
      const data = await inventoryAPI.getAllItems();
      setInventory(data);
      setError(null);
    } catch (err) {
      console.error("Fetch inventory failed", err);
      setError("Failed to load inventory. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReceivedOrders = async () => {
    try {
      const data = await inventoryAPI.getOrdersByOwnerEmail(auth.user?.profile?.email);
      setReceivedOrders(data);
    } catch (err) {
      console.error("Failed to fetch received orders:", err);
      setError("Could not load orders received.");
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      await inventoryAPI.addItem(newItem);
      await fetchInventory();
      setShowForm(false);
    } catch (err) {
      setError("Failed to add item. Please check your input.");
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      await inventoryAPI.updateItem(updatedItem);
      await fetchInventory();
      setEditingItem(null);
    } catch (err) {
      setError("Failed to update item. Please try again.");
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await inventoryAPI.deleteItem(itemId);
      setInventory(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      setError("Failed to delete item. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Inventory Management</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">👤 {auth.user?.profile?.email}</span>
          <button
            onClick={signOutRedirect}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => {
              setEditingItem(null);
              setShowForm(!showForm);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'View Inventory' : 'Add New Item'}
          </button>

          <button
            onClick={() => setShowMyItems(!showMyItems)}
            className={`${
              showMyItems ? 'bg-green-700' : 'bg-green-600'
            } text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors`}
          >
            {showMyItems ? 'Show All Items' : 'Show My Items'}
          </button>

          <button
            onClick={() => {
              setShowOrdersTab(!showOrdersTab);
              if (!showOrdersTab) fetchReceivedOrders();
            }}
            className={`${
              showOrdersTab ? 'bg-purple-700' : 'bg-purple-600'
            } text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors`}
          >
            {showOrdersTab ? 'Hide Orders Received' : 'Orders Received'}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center p-8 text-gray-600">Loading inventory...</div>
        ) : showForm ? (
          <AddItemForm 
            item={editingItem}
            onAdd={handleAddItem}
            onUpdate={handleUpdateItem}
            onCancel={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
          />
        ) : (
          <InventoryList 
            items={
              showMyItems
                ? inventory.filter(item => item.ownerEmail === auth.user?.profile?.email)
                : inventory
            }
            onEdit={(item) => {
              setEditingItem(item);
              setShowForm(true);
            }}
            onDelete={handleDeleteItem}
          />
        )}

        {showOrdersTab && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Orders Received</h2>
            {receivedOrders.length > 0 ? (
              receivedOrders.map(order => (
                <div key={order.orderId} className="bg-white p-4 rounded-lg shadow mb-4">
                  <p className="text-sm text-gray-600">📦 Order ID: {order.orderId}</p>
                  <p className="text-sm text-gray-600">👤 Buyer: {order.buyerEmail}</p>
                  <p className="text-sm text-gray-600">🕒 Date: {new Date(order.createdAt).toLocaleString()}</p>
                  <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity} — ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  <p className="font-semibold mt-2 text-gray-800">
                    Total (Your Items): ${order.totalPrice.toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No orders received yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
