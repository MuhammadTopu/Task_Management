/* eslint-disable react/prop-types */
import { IoMdStar } from "react-icons/io";
import { FiPlusCircle, FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const Cards = ({ home, setInputDiv, data = [], setData, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };


  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/all`, { headers });
      if (response.data?.tasks) {
        setData(response.data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
    }
  };


  const handleCompleteTask = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/updateComplete/${id}`, {}, { headers });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/delete/${id}`, { headers });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };


  const handleImpTask = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/updateImportant/${id}`, {}, { headers });
      fetchTasks();
    } catch (error) {
      console.error("Error updating importance:", error.response?.data || error.message);
    }
  };


  const handleUpTask = (id, title, description) => {
    setInputDiv("fixed");
    setUpdatedData({ id, title, disc: description });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 gap-4">

      {data.length === 0 && (
        <div className="text-center text-gray-400 w-full col-span-full">
          <p>No tasks available. Add a new one!</p>
        </div>
      )}

      {data.map((Task) => (
        <div
          key={Task.id || Task._id}
          className={`${
            Task.complete ? "border-green-900" : "border-red-900"
          } bg-gray-800 border rounded-md p-4 hover:bg-gray-700 flex flex-col justify-between`}
        >
          <div>
            <h3 className="text-xl font-semibold">{Task.title}</h3>
            <p className="text-gray-300 text-sm my-2">{Task.description}</p>
          </div>

          <div className="mt-2 w-full flex items-center justify-between">

            <button
              className={`${
                Task.complete ? "bg-green-600" : "bg-red-600"
              } p-2 rounded`}
              onClick={() => handleCompleteTask(Task.id || Task._id)}
            >
              {Task.complete ? "Completed" : "Incomplete"}
            </button>

    
            <div className="flex space-x-2 text-lg font-semibold">
              {!home && (
                <button
                  title="Update Task"
                  className="hover:text-green-600"
                  onClick={() => handleUpTask(Task.id || Task._id, Task.title, Task.description)}
                >
                  <FiEdit />
                </button>
              )}

              <button
                onClick={() => handleImpTask(Task.id || Task._id)}
                className={Task.important ? "text-red-600" : "hover:text-red-600"}
              >
                <IoMdStar />
              </button>

              <button
                className="hover:text-red-600"
                onClick={() => deleteTask(Task.id || Task._id)}
              >
                <MdDeleteOutline />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Always show the "Add Task" button */}
      <button
        className="bg-gray-800 rounded-md p-4 hover:bg-gray-700 flex flex-col justify-center items-center hover:scale-95 transition-all duration-300 hover:text-3xl hover:cursor-pointer"
        onClick={() => setInputDiv("fixed")}
      >
        <FiPlusCircle className="text-2xl" />
        <h2>Add task</h2>
      </button>
    </div>
  );
};

export default Cards;
