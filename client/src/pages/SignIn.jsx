import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice.js';

const SignIn = () => {

  const[formData,setFormData]=useState({});
  // const[error,setError]=useState(null);
  // const[loading,setLoading]=useState(false);
  
  // importing from global state
  const{loading,error} = useSelector((state) => state.user);
  
  const navigate= useNavigate();

  const dispatch=useDispatch();

  const handleChange =(e)=>{

    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    // prevents refreshing the page after submit
    e.preventDefault();

    try {

          // setLoading(true);
          //using redux states now
          dispatch(signInStart());
      
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        //response from backend is stored in this.. ie user created successfully..
        const data = await res.json();

        if(data.success==false)
        {
          // setError(data.message);
          // setLoading(false);
          dispatch(signInFailure(data.message));
          return;
        }

        // setLoading(false);
        // setError(null);
        dispatch(signInSuccess(data));
      
        // console.log(data);

        // if no error and after user is created we navigate them to  homepasge after signed in  .
        navigate('/');


        

    } 
    
    catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
      
    }
    
  }
  

  
  

  // console.log(formData);
  
  return (
    <div className='max-w-lg mx-auto'>
         <h1 className='text-3xl font-semibold text-center my-7'> Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          

          <input type="email" placeholder='email'
          className='p-3 border rounded-lg' id='email' onChange={handleChange}/>
          
          <input type="password" placeholder='password'
          className='p-3 border rounded-lg' id='password' onChange={handleChange}/>

          <button disabled={loading}  className='p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80 '>
            {loading ? 'Loading...' :  'Sign In'}
            </button>
         </form>   
         <div className='flex gap-2 mt-5'>
            <p> Doesnt have an account?</p>
            <Link to={"/sign-up"}>
              <span className='text-blue-700'>Sign up</span>
            </Link>
         </div>
         {error && <p className='text-blue-700'>{error}</p>}
    </div>
   
  )
}

export default SignIn

