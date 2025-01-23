const express = require("express");
const app = express();
require('dotenv').config();
require("./databaseConn.js");
const cors = require("cors");
const userApi = require("./routes/user.js");
const taskApi = require("./routes/task.js");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1",userApi);
app.use("/api/v2",taskApi);

app.use("/", (req,res)=>{
    res.send("Hi, from backend");
})


;
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
}); 
