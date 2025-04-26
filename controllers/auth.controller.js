import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

// What is req body : req.body is an object containing data from the client (Post Request)

export const signUp = async (req,res,next) => {
    //Implement sign Up logic here
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Create a new User
        const {name,email,password} = req.body;

        const existingUser = await User.findOne({email})

        if(existingUser){
            const error = new Error("User already Exist")
            error.statusCode = 409;
            throw error
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password,salt)

        const newUsers = await User.create([{name,email,password:hashPassword}],{session})

        const token = jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})

        
        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success:true,
            message: "User Created SucessFully",
            data:{
                token,
                user:newUsers[0]
            }
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
        
    }
    
}
export const signIn = async (req,res,next) => {
    try {
        const {email,password}= req.body;

        const user = await User.findOne({email})

        if(!user){
            const error = new Error("User Not found")
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            const error = new Error("Invalid Password")
            error.statusCode = 401
            throw error;
        }
        const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
        
        res.status(200).json({
            success:true,
            msg:"user Signed In successfully",
            data:{
                token,
                user,
            }
        })
        
    } catch (error) {
        next(error)
        
    }
}
export const signOut = async (req,res,next) => {
    //Implement sign Out logic here
    
}