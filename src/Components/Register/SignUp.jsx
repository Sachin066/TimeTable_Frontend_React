import React from 'react'
import './signUp.css'
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom';
import Login from '../Login/Login.jsx';


const SignUp = () => {
  return (
    <>
    <div className='Login'>
       <div className='Container'>
      <form className='form'>

        <div className='Inputs'>

       <div className='Textfield'>
          <TextField id="standard-basic"  label="Name" variant="standard" sx={{bgcolor:'wite',width:'100%',margin:'10px',outline:'none',border:'none'}} required/>
       </div>

       <div className='Textfield'>
          <TextField id="standard-basic" type='number'autoComplete='off' label="Phone No." variant="standard"  sx={{bgcolor:'wite',width:'100%',margin:'10px',outline:'none',border:'none'}} required/>
       </div>

       <div className='Textfield'>
          <TextField id="standard-basic"  label="college ID" variant="standard"  sx={{bgcolor:'whte',width:'100%',margin:'10px',outline:'none',border:'none'}} required/>
       </div>

       <div className='Textfield'>
          <TextField id="standard-basic"  label="Batch" variant="standard"  sx={{bgcolor:'whte',width:'100%',margin:'10px',outline:'none',border:'none'}} required/>
       </div>

       <div className='Textfield'>
          <TextField id="standard-basic"  label="Email" variant="standard"  sx={{bgcolor:'whte',width:'100%',margin:'10px',outline:'none',border:'none'}} required/>
       </div>

       <div className='Textfield'>
          <TextField id="standard-basic"  type='password'  label="Password" variant="standard"  sx={{bgcolor:'whie',width:'100%',margin:'10px',outline:'none',border:'none'}} required/>
       </div>

        </div>

      <div>
        <button className='LoginButton'>Register</button>
      </div>
        
       <div >
       <p className='Noacc'>Already have an account? </p>
      <Link to='/Login' className='Click'>Login </Link>
       </div>


          </form>
       </div>
    </div>
    </>
  )
}

export default SignUp
{/* <div className='input-group'>
           <input type="text" placeholder='Name' required />
        </div>
          
        <div className='input-group'>
         <input type="text" placeholder='Phone' required/>
        </div>

        <div className='input-group'>
         <input type="text" placeholder='College ID' required />
        </div>

        <div className='input-group'>
         <input type="text" placeholder='Batch' required/>
        </div>

        <div className='input-group'>
         <input type="text" placeholder='Email' required />
        </div>
        
        <div className='input-group'>
         <input type="text" placeholder='Password' required />
        </div> */}