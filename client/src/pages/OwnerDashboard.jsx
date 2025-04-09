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

  // ✅ Safe hook usage
  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchInventory();
    }
  }, [auth.isAuthenticated]);

  // 🚫 Redirect unauthenticated users
  if (!auth.isAuthenticated && !auth.isLoading) {
    return <Navigate to="/" replace />;
  }

  // 🔐 Logout via Cognito Hosted UI
  const signOutRedirect = () => {
    auth.removeUser(); // Clear local user session
    const clientId = "iaa957ql9401546qvgv9hos4i";
    const logoutUri = "http://localhost:3000";
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
      {/* Header with user info and logout */}
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {showForm ? 'Add / Edit Item' : 'All Inventory Items'}
          </h2>
          <button
            onClick={() => {
              setEditingItem(null);
              setShowForm(!showForm);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'View Inventory' : 'Add New Item'}
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
            items={inventory}
            onEdit={(item) => {
              setEditingItem(item);
              setShowForm(true);
            }}
            onDelete={handleDeleteItem}
          />
        )}
      </div>
    </div>
  );
}
