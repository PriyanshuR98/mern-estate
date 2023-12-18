import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";

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

app.use(cookieParser());

app.listen(3000,()=>{
    console.log("server is running on port 3000");
}
) 

            //testapi
app.use("/api/user",userRouter)

app.use("/api/auth",authRouter);
app.use("/api/listing",listingRouter);


//middleware for error..
// this is called apne aap when we throw an error.
app.use((err,req,res,next)=>{

    const statusCode = err.statusCode ||500;
    const message = err.message ||'internal server error';
    return res.status(statusCode).json({
        success:false,
        message:message,
        statusCode:statusCode,
    });
});
//