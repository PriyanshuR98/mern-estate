import User from "../models/user.model.js"
import bcyrptjs from 'bcryptjs';

export const signup = async (req,res)=>{

    // console.log(req.body);
    //saving user inside the db.
    const {username,email,password}=req.body;
    const hashedpassword=bcyrptjs.hashSync(password,10);

    const newUser= new User({username,email,password:hashedpassword});

    try {
        await newUser.save();
        res.status(201).json("user created successfully.")
        
    } catch (error) {

        res.status(500).json(error.message);
        
    }




};