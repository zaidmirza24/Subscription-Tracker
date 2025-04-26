import mongoose from "mongoose";
import { DB_URI,NODE_ENV } from "../config/env.js";


if(!DB_URI){
    throw new Error('PLease define the MONGODB_URI environment variabe inside .env.<development/production>/local')
}
const connectToDatabase = async ()=>{
    try {
            await mongoose.connect(DB_URI);
            console.log("Connected to database in Mode",NODE_ENV)
    } catch (error) {
        console.log("Error Connecting to db ",error)
        process.exit(1)
        
    }
}

export default connectToDatabase