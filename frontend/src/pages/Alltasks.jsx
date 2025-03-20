import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import InputData from "../components/InputData";

const Alltasks = () => {
  const [Data, setData] = useState([]); 
  const [inputDivVisibility, setInputDivVisibility] = useState("hidden");
  const [UpdatedData, setUpdatedData] = useState({ id: "", title: "", disc: "" });

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/all`, { headers });

      // console.log("Fetched Tasks:", response.data); 

     
      if (JSON.stringify(response.data) !== JSON.stringify(Data)) {
        setData(response.data); 
      }

    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
      setData([]);
    }
  };

  
  useEffect(() => {
    
    fetchTasks();

   
    const intervalId = setInterval(fetchTasks, 5000);

    
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <>
      <div className="container mx-auto px-4 py-6">
       
        {Data.length > 0 ? (
          <Cards
            home={false}
            setInputDiv={setInputDivVisibility}
            data={Data} 
            setData={setData}
            setUpdatedData={setUpdatedData}
            UpdatedData={UpdatedData}
          />
        ) : (
          <p className="text-center text-gray-500">No tasks available. Add a new one!</p>
        )}

      
        {Data.length === 0 && (
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all flex items-center gap-2"
              onClick={() => setInputDivVisibility("fixed")}
            >
              ➕ Add Task
            </button>
          </div>
        )}
      </div>

     
      {inputDivVisibility !== "hidden" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <InputData
            setInputDiv={setInputDivVisibility}
            UpdatedData={UpdatedData}
            setUpdatedData={setUpdatedData}
          />
        </div>
      )}
    </>
  );
};

export default Alltasks;
