import User from "../models/user.model.js"
// import errorHandler from '../utils/error.js';
import bcyrptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req,res,next)=>{

    // console.log(req.body);
    //saving user inside the db.
    const {username,email,password}=req.body;
    const hashedpassword=bcyrptjs.hashSync(password,10);

    const newUser= new User({username,email,password:hashedpassword});

    try {
        await newUser.save();
        res.status(201).json("user created successfully.")
        
    } catch (error) {

        //using middleware.
    //    next(errorHandler(550,'error created by function'));
       next(error);

    }


};
//