import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Cards";

const Incompletedtsk = () => {
  const [Data, setData] = useState([]);

 
  const fetchTasks = async () => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks/incompleted`,
        { headers }
      );

      // console.log("Fetched Incompleted Tasks:", response.data);
      setData(response.data || []); 
    } catch (error) {
      console.error("Error fetching incompleted tasks:", error.response?.data || error.message);
    }
  };

  
  useEffect(() => {
    fetchTasks();

  
    const intervalId = setInterval(fetchTasks, 5000);

   
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div>
      {Data.length === 0 ? (
        <p className="text-center text-gray-500">There are no incompleted tasks.</p>
      ) : (
        <Cards home={true} data={Data} />
      )}
    </div>
  );
};

export default Incompletedtsk;
