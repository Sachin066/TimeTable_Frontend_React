import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
    const [values, SetValues] = useState({
        name: '',
        emailId: '',
        phoneNumber: '',
        designation: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

      
        axios.post('http://localhost:8000/api/v1/college/create-professor', values, {
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
                            onChange={e => SetValues({ ...values, name: e.target.value })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="emailId" className='font-bold'>Email:</label>
                        <input
                            type="email"
                            name='emailId'
                            className='form-control'
                            placeholder='Enter email'
                            onChange={e => SetValues({ ...values, emailId: e.target.value })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="phoneNumber" className='font-bold'>Phone no.:</label>
                        <input
                            type="number"
                            name='phoneNumber'
                            className='form-control'
                            placeholder='Enter Phone no.'
                            onChange={e => SetValues({ ...values, phoneNumber: e.target.value })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="designation" className='font-bold'>Designation:</label>
                        <input
                            type="text"
                            name='designation'
                            className='form-control'
                            placeholder='Enter Designation'
                            onChange={e => SetValues({ ...values, designation: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end space-x-4 w-full mt-10">
                        <button type="submit" className="btn btn-success">Submit</button>
                        <Link to="/Professor" className="btn btn-primary">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
