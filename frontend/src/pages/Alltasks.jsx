import { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../components/Cards';
import InputData from '../components/InputData';


const Alltasks = () => {
  const [Data, setData] = useState();
  const [inputDivVisibility, setInputDivVisibility] = useState("hidden");
  const [UpdatedData, setUpdatedData] = useState({ id: "", title: "", disc: "" });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
 
  useEffect(()=>{
    const fetch = async () =>{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v2/gettask`, { headers });
      setData(response.data.data);
    };
    fetch();
  });

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
            UpdatedData={UpdatedData} 
            setUpdatedData={setUpdatedData}
          />
        </div>
      )}
    </>
  );
};

export default Alltasks;
