import { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

export default function AddItemForm({ item, onAdd, onUpdate, onCancel }) {
  const { user } = useAuth(); // ✅ Access logged-in user
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name,
        price: item.price.toString(),
        quantity: item.quantity.toString()
      });
    } else {
      setFormData({
        id: `item-${Date.now()}`,
        name: '',
        price: '',
        quantity: ''
      });
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      ownerEmail: user?.profile?.email || 'unknown' // ✅ Add email here
    };

    if (item) {
      onUpdate(numericData);
    } else {
      onAdd(numericData); // ✅ ownerEmail now included in new item
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        {item ? 'Edit Item' : 'Add New Item'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Item Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Price ($)</label>
            <input
              type="number"
              step="0.01"
              className="w-full p-2 border rounded-lg"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {item ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </form>
    </div>
  );
}
