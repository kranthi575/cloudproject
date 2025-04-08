import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function OwnerAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    businessName: ''
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add owner auth logic
    

    // Inside handleSubmit
    if (isLogin) {
        // Perform login logic here
        navigate('/owner/dashboard');
    } else {
        // Perform registration logic here
        navigate('/owner/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Owner {isLogin ? 'Login' : 'Registration'}
      </h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Business Name"
            className="w-full p-2 mb-4 border rounded"
            value={formData.businessName}
            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          className="text-blue-600 hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}