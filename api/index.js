import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import { error } from "console";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MongoDB connected");
}).catch((error)=>{
    console.log(error);
});

const app=express();

app.use(express.json());  //allow us to send json format data in res
app.use(cookieParser());

app.listen(3000,()=>{
    console.log(`Listening to port ${3000}!`);
})

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||"Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    });
});