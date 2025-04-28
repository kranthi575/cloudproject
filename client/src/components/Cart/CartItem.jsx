export default function CartItem({ item }) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-600">x{item.quantity}</p>
        {/* ✅ Show owner email */}
        {item.ownerEmail && (
          <p className="text-xs text-gray-400">
            <span className="font-medium">Owner:</span> {item.ownerEmail}
          </p>
        )}
      </div>
      <div>${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  );
}
