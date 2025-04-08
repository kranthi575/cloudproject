export default function CartItem({ item }) {
    return (
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-gray-600">x{item.quantity}</p>
        </div>
        <div>${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    );
  }
  