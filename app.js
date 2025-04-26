import express from "express"
import {PORT} from './config/env.js'

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import subscriptionRouter from "./routes/subscription.route.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.route.js";

const app = express();

app.use(express.json()) 
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(arcjetMiddleware)

// Routes:-
///api/v1/auth/sign-up
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/subscriptions',subscriptionRouter)
app.use('/api/v1/workflows',workflowRouter)

app.use(errorMiddleware)

app.get("/",(req,res)=>{
    res.send({body:"Welcome Buddy1"})
})

app.listen(PORT || 3000,async()=>{
    console.log("Your Server is Running on ",PORT||3000)
    //Connect to DataBase
     await connectToDatabase()
})

export default app;
