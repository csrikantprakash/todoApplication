const express = require("express");
const router = express.Router();
const Register = require("../models/registerModel");

router.get("/", async (req, res)=>{
    const users = await Register.find();
    res.json({
        users
    })
})

router.post("/register", async (req, res)=>{
    try{
        const existingUser = await Register.find({username: req.body.username});
        console.log(existingUser);
        if(existingUser.length  != 0){
            return res.json({
                status : "failed",
                message : "Already registered, please login"
            })
        }else{
            const newUser = await Register.create(req.body);
            res.status(200).json({
                status : "success",
                message: newUser
            })
        }
    }catch(err){
        res.status(500).json({
            status : "failed",
            message : err.message
        })
    }
    
})
module.exports = router;