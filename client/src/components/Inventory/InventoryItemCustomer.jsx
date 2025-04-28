import { useState } from 'react';

export default function InventoryItemCustomer({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-1">{item.name}</h3>
      <p className="text-gray-700 mb-1">Price: ${item.price.toFixed(2)}</p>

      {/* ✅ Show Owner */}
      <p className="text-sm text-gray-500 mb-2">
        <span className="font-medium text-gray-600">Owner:</span> {item.ownerEmail || 'N/A'}
      </p>

      <div className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value))}
          className="w-16 border px-2 py-1 rounded"
        />
        <button
          onClick={() => onAddToCart(item, quantity)}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
