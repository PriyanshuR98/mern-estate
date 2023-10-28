import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import{app} from '../firebase.js';
import{ useDispatch } from 'react-redux';
import{ signInSuccess } from '../redux/user/userSlice.js';
import {useNavigate} from 'react-router-dom'



const OAuth = () => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleGoogleClick = async ()=>{
        try {
            const provider = new GoogleAuthProvider();
            const auth=getAuth(app);

            const result= await signInWithPopup(auth,provider);
            // console.log(result);
            
            const res= await fetch('/api/auth/google',{
              method:'POST',
              headers:{
                'Content-Type':'application/json',
                
              },
              body: JSON.stringify({ 
              name: result.user.displayName,
              email : result.user.email,
              photo : result.user.photoURL
            }),
           
            })

            const data= await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
            
            

     
        } catch (error) {
            console.log("couldnt connect to google ",error);
        }
        
    }

    
  return (
    <button onClick= {handleGoogleClick} type='button' className='p-3 text-white uppercase bg-red-700 rounded-lg hover:opacity-95'>Continue with google</button>
  )
}

export default OAuth