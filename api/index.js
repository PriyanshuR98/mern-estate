import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// mongoose.connect("mongodb+srv://priyanshu:priyanshu@mern-estate.hy1bmxt.mongodb.net/?retryWrites=true&w=majority")

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connect to mongoDB!!!")
})
.catch((err)=>{
    console.log(err);
})




const app=express();

app.listen(3000,()=>{
    console.log("server is running on port 3000");
}
) 