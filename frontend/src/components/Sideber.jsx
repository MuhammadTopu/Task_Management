import { BiTask } from "react-icons/bi";
import { IoMdStar } from "react-icons/io";
import { SiGoogletasks } from "react-icons/si";
import { BiTaskX } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useState } from "react";
import axios from "axios";


const Sideber = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Data, setData] = useState();

  const data = [
    {
      title: "All tasks",
      icon: <BiTask />,
      link: "/",
    },
    {
      title: "Important Tasks",
      icon: <IoMdStar />,
      link: "/important_tasks",
    },
    {
      title: "Completed Tasks",
      icon: <SiGoogletasks />,
      link: "/completed_tasks",
    },
    {
      title: "Incompleted Tasks",
      icon: <BiTaskX />,
      link: "/incompleted_tasks",
    },
  ];

  const logout = () => {
    // Clear auth data and redirect
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/login");
  };

 useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found. Redirecting to login...");
      navigate("/login");
      return;
    }

    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get("http://localhost:8080/api/v2/gettask", { headers });
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      navigate("/login");
    }
  };

  fetchData();
}, [navigate]);
  
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold">{Data.username}</h2>
        <h4 className="mb-1 text-gray-500">{Data.email}</h4>
        <hr />
      </div>
      <div>
        {data.map((item, key) => (
          <Link
            to={item.link}
            className="my-2 flex items-center gap-1 hover:bg-gray-500 rounded-sm 
            transition-all duration-300 p-4 text-lg"
            key={key}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
      <div
        className="w-full bg-gray-500 p-2 text-center
      rounded-sm hover:bg-red-500 transition-all duration-300"
      > 
        <button onClick={logout} className="w-full">Log out</button>
      </div>
    </>
  );
};

export default Sideber;
