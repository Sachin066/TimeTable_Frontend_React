
import React from 'react'
import '../Login/Login.css'
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from 'react-router-dom';
import SignUp from '../Register/SignUp.jsx';
import { useState,useRef,useEffect, useContext} from 'react';
import AuthContext from '../../Context/AuthProvider.jsx';
import axios from 'axios';


const Login = () => {
  
  const {setAuth} =useContext(AuthContext);
  const UserRef = useRef();
  const errRef = useRef();

  const [email,setEmail] =useState('');
  const[pwd,setpwd]=useState('');
  const[errMess,setErrMess]=useState('');
  const[success,setSuccess]=useState(false);

  const navigate = useNavigate();
  
  
  useEffect( ()=>{
    UserRef.current.focus();
  },[])
  
 useEffect(()=>{
   setErrMess('');
 },[email,pwd])

 const handleSubmit = async (e)=>{
  e.preventDefault();
  
  const data = {
    email: email,
    password: pwd
  }

  try{
    const response =await axios.post(` ${import.meta.env.VITE_BASE_URL}/user/login `, data,
    {
      withCredentials: true 
    });
      
    if(response.status === 200)  {
      const data = response.data;
      setAuth(data.user)
      localStorage.setItem('token', data.token)
      navigate('/DashboardLayoutBasic')
    }
    setEmail('');
    setpwd('');
    setSuccess(true);
  }catch(err){
     
  }}

  return (
    <>
    {success? 
    <div>

      you are logged in
    </div> : 
      <div className='Login'>

        <p ref={errRef} aria-live='assertive'>{errMess}</p>
        <div className='Container'>
          <form className='form' onSubmit={handleSubmit}>

            
             <div className='Textfield'>
                 <TextField id="username"  label="Email" variant="filled"  ref={UserRef} onChange={(e)=>setEmail(e.target.value)}
                 value={email}
                 sx={{bgcolor:'white',width:'100%',margin:'10px',outline:'none',border:'none',textDecoration:'none', borderRadius:'5px'}} required/>
             </div>

             <div className='Textfield'>
                   <TextField id="password"  type='password' label="Password" variant="filled" 
                     onChange={(e)=>setpwd(e.target.value)} value={pwd}
                   sx={{bgcolor:'white',width:'100%',margin:'10px', borderRadius:'5px'}} required/>
             </div>

            <div>
              <button className='LoginButton'>Login</button>
            </div>

            <div className='Forgot'>
              <p className='ForgotPass' >Forgot Password?</p>
            </div>

            <div className='account'>
              <p className='Noacc'>Don't have an account?</p>
              <Link className='Click' to='/SignUp' >Register</Link>
            </div>

          </form> 
        </div>
      </div>
}
</>

  )
}

export default Login





{/* <div className='input-group'>
              <input type="text" required />
              <label>Email</label>
            </div> */} 

            {/* <div className='input-group'>
              <input type="password" required />
              <label>Password</label>
            </div> */}
             