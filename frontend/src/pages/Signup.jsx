import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux';

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn == true) {
    navigate('/');
  }
  const history = useNavigate()
  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const [alert, setAlert] = useState(""); // State to manage alert message

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
try {
  if (Data.username === "" || Data.email === "" || Data.password === "") {
    setAlert("All fields are required!"); // Show alert message
    setTimeout(() => setAlert(""), 3000); // Hide alert after 3 seconds
    return;
  }else{
   const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/signin`, Data); 
  setData({ username: "", email: "", password: "" });
  setAlert(response.data.message); // Show alert message
  setTimeout(() => setAlert(""), 3000); // Hide alert after 3 seconds
  history("/login");
}
} catch (error) {
  setAlert(error.response.data.message); // Show alert message
  setTimeout(() => setAlert(""), 3000); // Hide alert after 3 seconds 
}
  };


  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="w-2/6 bg-gray-700 rounded p-4">
        {/* Alert Box */}
        {alert && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636a9 9 0 11-12.728 12.728 9 9 0 0112.728-12.728zM12 8v4m0 4h.01"
              />
            </svg>
            <span className="text-sm font-medium">{alert}</span>
          </div>
        )}

        <div className="text-2xl font-semibold text-white mb-4">Sign Up</div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="bg-gray-800 p-3 my-3 w-full rounded text-white"
          required
          value={Data.username}
          onChange={change}
        />
        <input
          type="email"
          name="email"
          placeholder="xyz@example.com"
          className="bg-gray-800 p-3 my-3 w-full rounded text-white"
          required
          value={Data.email}
          onChange={change}
        />
        <input
          type="password"
          name="password"
          placeholder="Use strong password"
          className="bg-gray-800 p-3 my-3 w-full rounded text-white"
          required
          value={Data.password}
          onChange={change}
        />
        <div className="flex items-center justify-between">
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={submit}
          >
            Sign Up
          </button>
          <Link to={"/login"} className="text-blue-400 hover:text-blue-600">
            Or, Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
