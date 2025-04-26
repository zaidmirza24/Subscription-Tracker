import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"User Name is Required!!!"],
        trim:true,
        minlength:2,
        maxLength:50,

    },
    email:{
        type:String,
        required:[true,"User Email is Required!!!"],
        unique:true,
        trim:true,
        minlength:5,
        maxLength:255,
        lowercase:true,
        match:[/\S+@\S+\.\S+/,"PLease fill a valid email address"],
        
    },
    password:{
        type:String,
        required:true,
        minlength:6,
         
    }
},{timestamps:true})



const User = mongoose.model("User",userSchema)

export default User;

