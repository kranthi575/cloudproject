import InventoryItemCustomer from './InventoryItemCustomer';

export default function InventoryListCustomer({ items, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.length === 0 ? (
        <p className="text-gray-500 col-span-full text-center">No inventory items available.</p>
      ) : (
        items.map(item => (
          <InventoryItemCustomer key={item.id} item={item} onAddToCart={onAddToCart} />
        ))
      )}
    </div>
  );
}
