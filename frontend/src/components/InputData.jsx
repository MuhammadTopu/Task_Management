/* eslint-disable react/prop-types */
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from "react";
import axios from "axios";

const InputData = ({ setInputDiv, fetchData = () => {}, UpdatedData, setUpdatedData }) => {  
  const [formData, setFormData] = useState({ title: "", description: "" });


  useEffect(() => {
    if (UpdatedData?.id) {
      setFormData({ title: UpdatedData.title, description: UpdatedData.disc });
    } else {
      setFormData({ title: "", description: "" });
    }
  }, [UpdatedData]);

 
  const change = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };


  const submitData = async () => {
    if (!formData.title || !formData.description) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/tasks/create`, formData, { headers });
      setFormData({ title: "", description: "" });
      setInputDiv("hidden");
      fetchData();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };


  const UpdateTask = async () => {
    if (!formData.title || !formData.description) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/update/${UpdatedData.id}`, formData, { headers });
      setFormData({ title: "", description: "" });
      setInputDiv("hidden");
      setUpdatedData({ id: "", title: "", description: "" });
      fetchData();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <div className="fixed left-0 top-0 bg-slate-800 opacity-80 h-screen w-full"></div>
      <div className="fixed left-0 top-0 flex items-center justify-center h-screen w-full">
        <div className="w-2/6 bg-gray-900 p-4 rounded text-black">
          <div className="flex justify-end">
            <button
              className="text-[1.5xl] hover:border rounded-full p-1 hover:text-red-600 transition-all duration-300"
              onClick={() => {
                setInputDiv("hidden");
                setFormData({ title: "", description: "" });
                setUpdatedData({ id: "", title: "", description: "" });
              }}
            >
              <RxCross2 className="hover:cursor-pointer" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="p-2 rounded w-full my-3"
            value={formData.title}
            onChange={change}
          />
          <textarea
            name="description"
            cols={10}
            rows={5}
            placeholder="Enter the description"
            className="p-2 rounded w-full my-3 resize-none"
            value={formData.description}
            onChange={change}
          />
          {UpdatedData.id === "" ? (
            <button
              className="p-2 rounded bg-blue-400 hover:bg-blue-700 transition-all duration-300 hover:text-white"
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              className="p-2 rounded bg-blue-400 hover:bg-blue-700 transition-all duration-300 hover:text-white"
              onClick={UpdateTask}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
