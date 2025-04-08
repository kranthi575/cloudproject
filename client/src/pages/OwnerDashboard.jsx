import { useState, useEffect } from 'react';
import { inventoryAPI } from '../components/Services/InventoryAPI';
import InventoryList from '../components/Inventory/InventoryList';
import AddItemForm from '../components/Inventory/AddItemForm';

export default function OwnerDashboard() {
  const [inventory, setInventory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const data = await inventoryAPI.getAllItems();
      console.log("Fetched inventory:", data); // 👈 log this
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
      console.error(err);
      setError("Failed to add item. Please check your input.");
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      await inventoryAPI.updateItem(updatedItem);
      await fetchInventory();
      setEditingItem(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update item. Please try again.");
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await inventoryAPI.deleteItem(itemId);
      setInventory(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete item. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
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
