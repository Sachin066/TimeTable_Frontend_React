import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const [values, SetValues] = useState({
        name: '',
        emailId: '',
        phoneNumber: '',
        designation: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

      
        axios.post('http://localhost:8000/api/v1/college/professor/66aceb842dcedbaae585282c', values, {
            withCredentials: true
        })
        .then(res => {
            console.log(res);
            navigate('/Professor'); 
        })
        .catch(err => console.log(err)); 
    };
  return (
    <div className='flex flex-col justify-start items-center bg-slate-200 min-h-screen p-4'>
    <div className='w-50 border bg-white shadow px-5 pt-5 pb-5 rounded'>
        <h1 className='text-3xl m-4'>Add Professor</h1>
        <form onSubmit={handleSubmit}>
            <div className='mb-2'>
                <label htmlFor="name" className='font-bold'>Name:</label>
                <input
                    type="text"
                    name='name'
                    className='form-control'
                    placeholder='Enter name'
                />
            </div>
            <div className='mb-2'>
                <label htmlFor="emailId" className='font-bold'>Email:</label>
                <input
                    type="email"
                    name='emailId'
                    className='form-control'
                    placeholder='Enter email'
                   
                />
            </div>
            <div className='mb-2'>
                <label htmlFor="phoneNumber" className='font-bold'>Phone no.:</label>
                <input
                    type="number"
                    name='phoneNumber'
                    className='form-control'
                    placeholder='Enter Phone no.'
                    
                />
            </div>
            <div className='mb-2'>
                <label htmlFor="designation" className='font-bold'>Designation:</label>
                <input
                    type="text"
                    name='designation'
                    className='form-control'
                    placeholder='Enter Designation'
                />
            </div>

            <div className="flex justify-end space-x-4 w-full mt-10">
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to="/Professor" className="btn btn-primary">Back</Link>
            </div>
        </form>
    </div>
</div>
  )
}

export default Update
