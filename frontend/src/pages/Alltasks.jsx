import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cards from '../components/Cards';
import InputData from '../components/InputData';


const Alltasks = () => {
  const navigate = useNavigate(); 
  const [Data, setData] = useState();
  const [inputDivVisibility, setInputDivVisibility] = useState("hidden");
  const [UpdatedData, setUpdatedData] = useState({ id: "", title: "", disc: "" });

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found. Redirecting to login...");
      navigate("/login", { replace: true });
      return;
    }

    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get("http://localhost:8080/api/v2/gettask", { headers });
      setData(response.data.data); // Ensure this is the correct data path
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData(); // Fetch tasks initially
  }, [fetchData]);

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        {Data && (
          <Cards 
            home={"false"} 
            setInputDiv={setInputDivVisibility} 
            data={Data.tasks} 
            setData={setData} 
            setUpdatedData={setUpdatedData} 
            UpdatedData={UpdatedData}
          />
        )}
      </div>

      {inputDivVisibility !== "hidden" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <InputData 
            setInputDiv={setInputDivVisibility} 
            fetchData={fetchData} 
            UpdatedData={UpdatedData} 
            setUpdatedData={setUpdatedData}
          />
        </div>
      )}
    </>
  );
};

export default Alltasks;
