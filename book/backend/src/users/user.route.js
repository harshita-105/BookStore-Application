const express= require('express');
const bcrypt= require('bcrypt');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const router= express.Router();
const JWT_SECRET= process.env.JWT_SECRET_KEY

router.post("/admin", async(req,res)=>{
  const {username,password}= req.body;
  try {

    const admin= await User.findOne({username});
    if(!admin){
      return res.status(404).send({message:"Admin not found!"})
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch){
      return res.status(401).send({message:"Wrong password."})
    }

    const token= jwt.sign({id:admin._id, username:admin.username, role:admin.role}, JWT_SECRET, {expiresIn:"3h"})

    return res.status(200).json({
      message:"Authentication successful",
      token: token,
      user: {
        username: admin.username,
        role:admin.role
      }
    })

  } catch (error) {
    console.error("Login failed",error)
    res.status(500).send({message:"Login failed."})
  }
})

module.exports= router;
