import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Cards";

const ImportantTasks = () => {
  const [Data, setData] = useState([]); 

  const fetchTasks = async () => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks/important`,
        { headers }
      );

      // console.log("Fetched Important Tasks:", response.data); 
      setData(response.data || []); 

    } catch (error) {
      console.error("Error fetching important tasks:", error.response?.data || error.message);
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
        <p className="text-center text-gray-500">There are no important tasks.</p>
      ) : (
        <Cards home={true} data={Data} />
      )}
    </div>
  );
};

export default ImportantTasks;
