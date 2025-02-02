import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const InputData = ({ setInputDiv, fetchData , UpdatedData , setUpdatedData}) => {  
  const [formData, setFormData] = useState({ title: "", disc: "" });
  useEffect(() => {
   setFormData({title:UpdatedData.title , disc:UpdatedData.disc})
  }, [UpdatedData])
  const change = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const submitData = async () => {
    if (formData.title === "" || formData.disc === "") {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v2/create", formData, { headers });
      setFormData({ title: "", disc: "" });
      setInputDiv("hidden");
      
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
const UpdateTask = async () => {
  if (formData.title === "" || formData.disc === "") {
    alert("All fields are required");
    return;
  }

  try {
    await axios.put(`http://localhost:8080/api/v2/updatetask/${UpdatedData.id}`, formData, { headers });

    setFormData({ title: "", disc: "" });
    setInputDiv("hidden");
    setUpdatedData({id:"" , title:"", disc:""});
    // Ensure fetchData is correctly passed from parent
    if (fetchData) {
      fetchData(); // Fetch the latest tasks after updating one
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

  return (
    <>
      <div className="fixed left-0 top-0 bg-slate-800 opacity-80 h-screen w-full"></div>
      <div className="fixed left-0 top-0 flex items-center justify-center h-screen w-full">
        <div className='w-2/6 bg-gray-900 p-4 rounded text-black'>
        <div className="flex justify-end">
  <button
    className="text-[1.5xl] hover:border rounded-full p-1  hover:text-red-600 hover:transition-all hover:transition-duration-{3000ms}"
    onClick={() => {
      setInputDiv("hidden");
      setFormData({ title: "", disc: "" });
      setUpdatedData({ id: "", title: "", disc: "" });
    }}
  >
    <RxCross2 className="hover:cursor-pointer" />
  </button>
  </div>
          <input
            type="text" 
            placeholder='Title' 
            name='title' 
            className='p-2 rounded w-full my-3'
            value={formData.title}
            onChange={change}
          />
          <textarea 
            name="disc"  
            cols={10} rows={5}  
            placeholder='Enter the description'
            className='p-2 rounded w-full my-3 resize-none'
            value={formData.disc}
            onChange={change} 
          />
          {UpdatedData.id === "" ? <button 
            className='p-2 rounded bg-blue-400 hover:bg-blue-700 transition-all duration-300 hover:text-white'
            onClick={submitData}
          >
            Submit
          </button> :  <button 
            className='p-2 rounded bg-blue-400 hover:bg-blue-700 transition-all duration-300 hover:text-white'
            onClick={UpdateTask}
          >
            Update
          </button> }
           
         
        </div>
      </div>
    </>
  );
};


export default InputData;
