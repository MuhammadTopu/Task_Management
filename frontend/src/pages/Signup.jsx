import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [alert, setAlert] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!data.name || !data.email || !data.password) {
        setAlert('All fields are required!');
        setTimeout(() => setAlert(''), 3000);
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, {
        name: data.name, 
        email: data.email,
        password: data.password,
      });

      setData({ name: '', email: '', password: '' });
      setAlert(response.data.message);
      setTimeout(() => {
        setAlert('');
        navigate('/login'); 
      }, 2000);
    } catch (error) {
      setAlert(error.response?.data?.message || 'Signup failed');
      setTimeout(() => setAlert(''), 3000);
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="w-2/6 bg-gray-700 rounded p-4">
     
        {alert && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 11-12.728 12.728 9 9 0 0112.728-12.728zM12 8v4m0 4h.01" />
            </svg>
            <span className="text-sm font-medium">{alert}</span>
          </div>
        )}

        <div className="text-2xl font-semibold text-white mb-4">Sign Up</div>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="bg-gray-800 p-3 my-3 w-full rounded text-white"
          value={data.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="xyz@example.com"
          className="bg-gray-800 p-3 my-3 w-full rounded text-white"
          value={data.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Use strong password"
          className="bg-gray-800 p-3 my-3 w-full rounded text-white"
          value={data.password}
          onChange={handleChange}
          required
        />
        <div className="flex items-center justify-between">
          <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSubmit}>
            Sign Up
          </button>
          <Link to="/login" className="text-blue-400 hover:text-blue-600">
            Or, Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
