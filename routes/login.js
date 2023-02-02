const express = require("express");
const router = express.Router();
const Login = require("../models/loginModel");
const Register = require("../models/registerModel");
const jwt = require("jsonwebtoken");
const secret = "jwtsecret";
router.post("/login", async(req, res)=>{
    try{
        const user = await Register.find({username: req.body.username});
        console.log(user[0]);
        if(user.length == 0){
            return res.json({
                status: "failed",
                message: "please register/invalid username"
            })
        }
        if(user[0].password != parseInt(req.body.password)){
            console.log("test");
            return res.json({
                status: "failed",
                message: "password invalid"
            })
        }
        const token = jwt.sign({
            exp: Math.floor(Date.now()/1000)+60*60,
            data: req.body.username
        },secret)

        res.status(200).json({
            status: "success",
            message: "welcome",
            token: token,
            user: req.body.username
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }   
})
router.post("/verify",(req, res)=>{
   
    if(req.body.headers.authorization){
        const token = req.body.headers.authorization;
        jwt.verify(token, secret, function(err, decoded){
            if(err){
                return res.json({
                    status: "expired",
                    message: "login again"
                })
            }else{
                return res.json({
                    status: "verified",
                })
            }
        })
    }else{
        return res.json({
            status: "expired",
            message: "login again"
        })
    }
})
module.exports = router;