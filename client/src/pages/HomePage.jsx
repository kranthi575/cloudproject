import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Cloud Inventory System</h1>
      <div className="space-y-4">
        <Link to="/owner/auth">
          <button className="w-64 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            I'm an Owner
          </button>
        </Link>
        <Link to="/customer/auth">
          <button className="w-64 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            I'm a Customer
          </button>
        </Link>
      </div>
    </div>
  );
}