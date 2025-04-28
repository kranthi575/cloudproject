import { useAuth } from 'react-oidc-context';
import CartItem from './CartItem';
import { inventoryAPI } from '../Services/InventoryAPI';

export default function CartSummary({ cartItems, onClear }) {
  const auth = useAuth();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    const order = {
      email: auth.user?.profile?.email, // Buyer email
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        ownerEmail: item.ownerEmail // ✅ Include owner's email
      })),
      totalPrice: total
    };
  
    try {
      const result = await inventoryAPI.placeOrder(order);
      alert(`Order placed! Order ID: ${result.orderId}`);
      onClear(); // Clear cart after success
    } catch (err) {
      alert('Failed to place order. Please try again.');
      console.error(err);
    }
  };
  
  return (
    <div className="relative">
      <button className="relative">
        🛒 <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {cartItems.length}
        </span>
      </button>

      {cartItems.length > 0 && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-10 p-4">
          <h3 className="font-bold mb-2">Cart</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-4 font-semibold">Total: ${total.toFixed(2)}</div>
          <button
            className="w-full bg-green-600 text-white px-4 py-2 rounded mt-3 hover:bg-green-700"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
          <button
            className="w-full bg-gray-200 text-gray-800 px-4 py-1 rounded mt-2"
            onClick={onClear}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
