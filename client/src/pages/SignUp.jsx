import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';

const SignUp = () => {

  const[formData,setFormData]=useState({});
  const[error,setError]=useState(null);
  const[loading,setLoading]=useState(false);
  
  const navigate= useNavigate();

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

          setLoading(true);
      
        const res = await fetch('/api/auth/signup', {
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
          setError(data.message);
          setLoading(false);
          return;
        }

        setLoading(false);
        setError(null);
      
        // console.log(data);

        // if no error and after user is created we navigate them to sign-in using this .
        navigate('/sign-in');


        

    } 
    
    catch (error) {
      setLoading(false);
      setError(error.message);
      
    }
    
  }
  

  
  

  // console.log(formData);
  
  return (
    <div className='max-w-lg mx-auto'>
         <h1 className='text-3xl font-semibold text-center my-7'> SignUp</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type="text" placeholder='username'
          className='p-3 border rounded-lg' id='username' onChange={handleChange} />

          <input type="email" placeholder='email'
          className='p-3 border rounded-lg' id='email' onChange={handleChange}/>
          
          <input type="password" placeholder='password'
          className='p-3 border rounded-lg' id='password' onChange={handleChange}/>

          <button disabled={loading}  className='p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80 '>
            {loading ? 'Loading...' :  'Sign Up'}
            </button>
            <OAuth/>
         </form>   
         <div className='flex gap-2 mt-5'>
            <p>Have an account?</p>
            <Link to={"/sign-in"}>
              <span className='text-blue-700'>Sign in</span>
            </Link>
         </div>
         {error && <p className='text-blue-700'>{error}</p>}
    </div>
   
  )
}

export default SignUp

