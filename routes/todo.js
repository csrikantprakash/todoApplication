const express = require("express");
const router = express.Router();

const Todo = require("../models/todoModel");

router.get("/todos", async (req, res)=>{
    try{
        const todos = await Todo.find();
        res.json({
            todos
        })
    }catch(err){
        res.json({
            message: err.message
        })
    }
   
})

router.post("/todos", async (req, res)=>{
    try{
        const todos = await Todo.create(req.body);
        res.json({
            todos
        })
    }catch(err){
        res.json({
            message: err.message
        })
    }    
})

router.put("/todos", async (req, res)=>{
    try{
        const todos = await Todo.updateOne({task : req.body.task},req.body)
        res.json({
            todos
        })
    }catch(err){
        res.json({
            message: err.message
        })
    }    
})
module.exports = router;