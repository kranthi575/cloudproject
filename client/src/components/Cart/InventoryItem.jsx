import { useState } from 'react';

export default function InventoryItem({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-2">{item.name}</h3>
      <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
      <div className="flex items-center gap-2 mt-3">
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
