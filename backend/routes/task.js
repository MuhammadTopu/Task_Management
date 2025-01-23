const router = require("express").Router();
const User = require("../models/user.js");
const Task = require("../models/Task.js");
const verifyToken = require("./auth.js");

//create task
router.post("/create", verifyToken ,async (req, res) => {
    try {
        const { title, disc } = req.body;
        const userId = req.headers.id; // Get the user ID from headers

        if (!userId || !title || !disc) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Create and save the new task
        const newTask = new Task({ title: title, disc: disc });
        const saveTask = await newTask.save();

        // Update the user's tasks list
        await User.findByIdAndUpdate(userId, { $push: { tasks: saveTask._id } });

        // Respond with success
        res.status(200).json({ message: "Task is created" });
    } catch (error) {
        console.error("Error during task creation:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// get tasks
router.get("/gettask", verifyToken, async (req, res) => {
  try {
    const { id } = req.headers; // Get the user ID from headers

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user by ID and populate their tasks
    const userData = await User.findById(id).populate({
      path: "tasks", // Correct field name based on schema
      options: { sort: { createdAt: -1 } }, // Sort tasks by creation date (descending)
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: userData });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete task
router.delete("/deletetask/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params; // Task ID from the route params
    const userId = req.headers.id; // User ID from headers

    // Validate task ID and user ID
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    if (!userId) {
      return res.status(400).json({ message: "User ID is required in headers" });
    }

    // Delete the task
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Remove the task reference from the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { tasks: id } },
      { new: true } // Return the updated user document
    );
    if (!updatedUser) {
     
      
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// update task
router.put("/updatetask/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params; // Task ID from URL params
    const { title, disc } = req.body; // Fields to update

    // Validate task ID and request body
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    if (!title || !disc) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Find and update the task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title: title, disc: disc },
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// update important
router.put("/updateImp-task/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the task exists
    const taskData = await Task.findById(id);
    if (!taskData) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Toggle the 'important' field
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { important: !taskData.important },
      { new: true } // Return the updated document
    );

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating the important field:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// update compeleted task
router.put("/updateComp-task/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the task exists
    const taskData = await Task.findById(id);
    if (!taskData) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Toggle the 'complete' field
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { complete: !taskData.complete },
      { new: true } // Return the updated document
    );

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating the completed field:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get important task
router.get("/geteImp-task", verifyToken, async (req, res) => {
  try {
    const { id } = req.headers; // Get the user ID from headers

    // Validate if the user ID is provided
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch user and populate important tasks
    const userData = await User.findById(id).populate({
      path: "tasks", // Reference to tasks field
      match: { important: true }, // Filter tasks where 'important' is true
      options: { sort: { createdAt: -1 } }, // Sort tasks by 'createdAt' descending
    });

    // Handle case where user or tasks are not found
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!userData.tasks || userData.tasks.length === 0) {
      return res.status(404).json({ message: "No important tasks found" });
    }

    res.status(200).json({ data: userData.tasks });
  } catch (error) {
    console.error("Error fetching important tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get completed task
router.get("/geteCom", verifyToken, async (req, res) => {
  try {
    const { id } = req.headers; // Get the user ID from headers

    // Validate if the user ID is provided
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch user and populate important tasks
    const userData = await User.findById(id).populate({
      path: "tasks", // Reference to tasks field
      match: { complete: true }, // Filter tasks where 'important' is true
      options: { sort: { createdAt: -1 } }, // Sort tasks by 'createdAt' descending
    });

    // Handle case where user or tasks are not found
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!userData.tasks || userData.tasks.length === 0) {
      return res.status(404).json({ message: "No important tasks found" });
    }

    res.status(200).json({ data: userData.tasks });
  } catch (error) {
    console.error("Error fetching important tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get inCompleted task
router.get("/geteInCom", verifyToken, async (req, res) => {
  try {
    const { id } = req.headers; // Get the user ID from headers

    // Validate if the user ID is provided
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch user and populate important tasks
    const userData = await User.findById(id).populate({
      path: "tasks", // Reference to tasks field
      match: { complete: false }, // Filter tasks where 'important' is true
      options: { sort: { createdAt: -1 } }, // Sort tasks by 'createdAt' descending
    });

    // Handle case where user or tasks are not found
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!userData.tasks || userData.tasks.length === 0) {
      return res.status(404).json({ message: "No important tasks found" });
    }

    res.status(200).json({ data: userData.tasks });
  } catch (error) {
    console.error("Error fetching important tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
