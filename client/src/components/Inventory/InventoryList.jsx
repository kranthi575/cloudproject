export default function InventoryList({ items, onEdit, onDelete }) {
  console.log("InventoryList received items:", items);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.isArray(items) && items.length > 0 ? (
        items.map(item => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-semibold">Price:</span> ${item.price?.toFixed(2)}</p>
              <p><span className="font-semibold">Quantity:</span> {item.quantity}</p>
              <p><span className="font-semibold">ID:</span> {item.id}</p>
              <p><span className="font-semibold">Owner:</span> {item.ownerEmail || 'N/A'}</p> {/* ✅ New line */}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => onEdit(item)}
                className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-gray-500 text-center">No inventory items available.</p>
      )}
    </div>
  );
}
