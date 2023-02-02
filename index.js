const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const todoRoutes = require("./routes/todo");
const app = express();

mongoose.connect("mongodb+srv://root:10xacademy@instaclone.fhhz96q.mongodb.net/todo", ()=>{
    console.log("Database is up");
})
app.use(cors("*"))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/", registerRoutes);
app.use("/", loginRoutes);
app.use("/", todoRoutes);
app.listen(3000, ()=>{
    console.log("Server up and running");
})