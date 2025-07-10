import mongoose from "mongoose";
import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET
const saltRounds = 12;

export const createUser = async(req, res) => {
    //res.send("Server is ready");
    const user = req.body; //given by user

    if (!user.name || !user.email || !user.password){
        return res.status(400).json({ success: false, message: "Please provide all the details"});
    }

        const salt = await bcrypt.genSalt(saltRounds);
        user.password = await bcrypt.hash(user.password, salt);

        if (User.findOne(user.email)){
            return res.status(500).json({success: false, message: "Email ID already exists"});
        }
        

    const newUser = new User(user); 

    try{
        await newUser.save();
        res.status(201).json({success: true, data: newUser});
    } catch(error){
        console.error("Error in Create User:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const checkCredentials = async(req, res) =>{
    const{email, password} = req.body;

    try{
        const user= await User.findOne({email});

        if(!user){
            return res.status(401).json({success: false, message: "Account doesn't exist"});
        }

        const boolPasswordMatch =  await bcrypt.compare(password, user.password)
        // console.log("stored password:", user.password);
        // console.log("input password:", password);
        // console.log(boolPasswordMatch);

        if(!boolPasswordMatch){
            return res.status(401).json({success: false, message: "Invalid credentials"});
        }

        const token= jwt.sign({id: user._id}, JWT_SECRET)
        res.json({success:true, token})

    } catch(error){
        console.error("Error Signing in:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}


