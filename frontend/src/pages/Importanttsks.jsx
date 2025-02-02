import Cards from "../components/Cards";
import { useState, useEffect } from "react";
import axios from "axios";

const ImportantTasks = () => {
  const [Data, setData] = useState([]); // ✅ Ensure it's an array

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // ✅ Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v2/geteImp-task`,
          { headers }
        );
        setData(response.data.data);
      } catch {
       throw new Error("");
       
        
      }
    };

    fetchTasks();
  });

  return (
    <div>
      {Data.length === 0 ? (
        <p className="text-center text-gray-500">There are no important tasks.</p>
      ) : (
        <Cards home={true} data={Data}/>
      )}
    </div>
  );
};

export default ImportantTasks;
