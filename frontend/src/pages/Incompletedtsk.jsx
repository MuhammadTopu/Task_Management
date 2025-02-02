import Cards from "../components/Cards";
import { useState, useEffect } from "react";
import axios from "axios";

const Incompletedtsk = () => {
  const [Data, setData] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v2/geteInCom`,
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
        <p className="text-center text-gray-500">There are no incompleted tasks.</p>
      ) : (
        <Cards home={true} data={Data}/>
      )}
    </div>
  );
};

export default Incompletedtsk;
