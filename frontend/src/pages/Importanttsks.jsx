import Cards from "../components/Cards";
import { useState, useEffect } from "react";
import axios from "axios";

const ImportantTasks = () => {
  const [data, setData] = useState([]); // ✅ Ensure it's an array

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // ✅ Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v2/geteImp-task",
          { headers }
        );

        // ✅ Ensure response is valid and always an array
        const tasks = response?.data?.data || [];
        setData(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setData([]); // Prevents undefined issues
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">There are no important tasks.</p>
      ) : (
        <Cards home={true} data={data} setData={setData} /> // ✅ Pass setData
      )}
    </div>
  );
};

export default ImportantTasks;
