import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();



mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connect to mongoDB!!!")
})
.catch((err)=>{
    console.log(err);
})




const app=express();


app.use(express.json());
// allows user to send json to server..

app.listen(3000,()=>{
    console.log("server is running on port 3000");
}
) 

            //testapi
app.use("/api/user",userRouter)

app.use("/api/auth",authRouter);