import { IoMdStar } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

import axios from "axios";

const Cards = ({ home, setInputDiv, data, setData, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Function to toggle task completion
  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v2/updateComp-task/${id}`,
        {},
        { headers }
      );

      // Update state to reflect changes
      setData((prevData) => ({
        ...prevData,
        tasks: prevData.tasks.map((task) =>
          task._id === id ? { ...task, complete: !task.complete } : task
        ),
      }));
    } catch (error) {
      console.log(error);
      
    }
  };

  // Function to toggle task delete
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v2/deletetask/${id}`, { headers });
  
      // Remove the deleted task from state
      setData((prevData) => ({
        ...prevData,
        tasks: prevData.tasks.filter((task) => task._id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // Function to toggle task importance
  const handleImpTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v2/updateImp-task/${id}`,
        {},
        { headers }
      );

      // Update state to reflect importance change
      setData((prevData) => ({
        ...prevData,
        tasks: prevData.tasks.map((task) =>
          task._id === id ? { ...task, important: !task.important } : task
        ),
      }));
    } catch (error) {
      console.log(error);
     
    }
  };

  const handleUpTask = (id , title , disc) => {
    setInputDiv("fixed");
    setUpdatedData({id:id , title: title , disc:disc});
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 gap-4">
      {data.map((task) => (
        <div
          key={task._id}
          className={`${
            task.complete ? "border-green-900" : "border-red-900"
          } bg-gray-800 border rounded-md p-4 hover:bg-gray-700 flex flex-col justify-between`}
        >
          <div>
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-gray-300 text-sm my-2">{task.disc}</p>
          </div>

          <div className="mt-2 w-full flex items-center justify-between">
{/* completed button */}
            <button
              className={`${
                task.complete ? "bg-green-600" : "bg-red-400"
              } p-2 rounded`}
              onClick={() => handleCompleteTask(task._id)}
            >
              {task.complete ? "Completed" : "Incomplete"}
            </button>

{/* update button */}
            <div className="flex space-x-2 text-lg font-semibold">
              {home !== true && (
                <button
                  title="update?"
                  className="hover:text-green-600"
                  onClick={() => handleUpTask(task._id, task.title, task.disc)}
                >
                  <FiEdit />
                </button>
              )}

              {/*  important toggle button */}
             <button
                onClick={() => handleImpTask(task._id)}
                className="hover:text-red-600"
              >
                {task.important ? (
                  <IoMdStar className="text-red-600" />
                ) : (
                  <IoMdStar />
                )}
              </button>
{/* delete task */}
            <button
                className="hover:text-gray-900"
                onClick={() => deleteTask(task._id)}
              >
                <MdDeleteOutline />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Add task button (only shown when home === "false") */}
      {home === "false" && (
        <button
          className="bg-gray-800 rounded-md p-4 hover:bg-gray-700 flex flex-col justify-center items-center hover:scale-95 transition-all duration-300 hover:text-3xl hover:cursor-pointer"
          onClick={() => setInputDiv("fixed")}
        >
          <FiPlusCircle className="text-2xl" />
          <h2>Add task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
