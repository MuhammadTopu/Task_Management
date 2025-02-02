import Cards from "../components/Cards";
import { useState, useEffect } from "react";
import axios from "axios";

const Completedtsk = () => {
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
          "http://localhost:8080/api/v2/geteCom",
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
        <p className="text-center text-gray-500">There are no Completed tasks.</p>
      ) : (
        <Cards home={true} data={Data}/>
      )}
    </div>
  );
};

export default Completedtsk;




