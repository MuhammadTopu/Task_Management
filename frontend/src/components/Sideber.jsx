import { useState, useEffect } from "react";
import axios from "axios";
import { BiTask } from "react-icons/bi";
import { IoMdStar } from "react-icons/io";
import { SiGoogletasks } from "react-icons/si";
import { BiTaskX } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Sideber = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null); 

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
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

 
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found. Redirecting to login...");
        navigate("/login", { replace: true });
        return;
      }

      const headers = {
        authorization: `Bearer ${token}`,
      };

      try {
        
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/profile`,
          { headers }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (localStorage.getItem("token")) {
      fetchUserData();
    }
  }, [navigate]);

  return (
    <>
      {user ? (
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <h4 className="mb-1 text-gray-500">{user.email}</h4>
          <hr />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <div>
        {data.map((item, key) => (
          <Link
            to={item.link}
            className="my-2 flex items-center gap-1 hover:bg-gray-500 rounded-sm 
            transition-all duration-300 p-3 ml-0 text-[15px] hover:text-[16px]"
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
