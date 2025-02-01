import Cards from '../components/Cards';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Completedtsk = () => {
  const [Data, setData] = useState([]); // Initialize as an empty array

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch tasks from API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v2/geteCom", { headers });

        // Ensure the data is an array before setting the state
        setData(response.data.data || []);
        
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setData([]); // Ensure the data is always an array
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      {/* Pass data and setData to Cards component */}
      <Cards home={true} data={Data}  />
    </div>
  );
};

export default Completedtsk;



