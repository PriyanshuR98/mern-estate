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


// chat
// export const signin = async (req, res, next) => {
//     const { email, password } = req.body;

//     try {
//         const validUser = await User.findOne({ email });
//         if (!validUser) return next(errorHandler(404, 'User not found!!!'));

//         const validPassword = bcyrptjs.compareSync(password, validUser.password);
//         if (!validPassword) return next(errorHandler(401, 'Wrong credentials!!'));

//         // Creating token after the right email and password.
//         // Created token by ._id which is unique for every user.
//         const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

//         // Doesn't want the password as a response so...
//         const { password: pass, ...rest } = validUser._doc;

//         // Set expiration date for the cookie (example: expires in 1 day)
//         const expirationDate = new Date();
//         expirationDate.setDate(expirationDate.getDate() + 1);

//         res.cookie('access_token', token, {
//             httpOnly: true,
//             expires: expirationDate,
//         }).status(200).json(rest);

//     } catch (error) {
//         next(error);
//     }
// }















export const google= async(req,res,next) =>{

    try {

        const user= await User.findOne({email: req.body.email})

        if(user)
        {
            const token=jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const{password : pass , ...rest}=user._doc;

            res.cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest);
        }
        else
        {
            // in this case if user doesnt exist we are trying to create the user but we set password==true so we need to generate the password..

            const generatedpassword= Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedpassword=bcyrptjs.hashSync(generatedpassword,10);
            const newUser= new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
            email:req.body.email,
            password:hashedpassword,
            avatar: req.body.photo
            })

            await newUser.save();

            const token=jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const{password : pass , ...rest}=newUser._doc;

            res.cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest);



      
        }
        
    } catch (error) {
        next(error);
        
    }


}


// import User from '../models/user.model.js';
// import bcryptjs from 'bcryptjs';
// import { errorHandler } from '../utils/error.js';
// import jwt from 'jsonwebtoken';

// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = bcryptjs.hashSync(password, 10);
//   const newUser = new User({ username, email, password: hashedPassword });
//   try {
//     await newUser.save();
//     res.status(201).json('User created successfully!');
//   } catch (error) {
//     next(error);
//   }
// };

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) return next(errorHandler(404, 'User not found!'));
//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
//     const { password: pass, ...rest } = validUser._doc;
//     res
//       .cookie('access_token', token, { httpOnly: true })
//       .status(200)
//       .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// export const google = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = user._doc;
//       res
//         .cookie('access_token', token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     } else {
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUser = new User({
//         username:
//           req.body.name.split(' ').join('').toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email: req.body.email,
//         password: hashedPassword,
//         avatar: req.body.photo,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = newUser._doc;
//       res
//         .cookie('access_token', token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };
