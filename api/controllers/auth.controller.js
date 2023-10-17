import User from "../models/user.model.js"
// import errorHandler from '../utils/error.js';
import bcyrptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

import jwt from 'jsonwebtoken';

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


export const signin = async(req,res,next)=>{
    const {email,password}= req.body;

   
    
    try {
        const validUser= await User.findOne({email});
        if(!validUser)  return next(errorHandler(404,'User not found!!!'));

        const validPassword=bcyrptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,'Wrong credentials!!'));

        //creating token after right email and password.
        //created token by ._id which is unqiue for every user.
        const token= jwt.sign({id: validUser._id},process.env.JWT_SECRET);

        //doesnt want password as response so..
        const{ password:pass , ...rest}=validUser._doc;

        res.cookie('access_token',token,{httpOnly:true })
        .status(200)
        .json(rest);

        
    } catch (error) {
        next(error);
    }
    
}