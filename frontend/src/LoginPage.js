import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
//import validation from './Validationsignup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function LoginPage() {

    const [User_Name, set_User_Name] = useState('');
    const [Pass, set_Pass] = useState('');

        axios.defaults.withCredentials = true;
        const navigate = useNavigate()
        axios.defaults.withCredentials = true;
        const [error, setError] = useState('')
    
        const handleSubmit = (event) => {
            event.preventDefault();
            axios.post('http://localhost:8081/login', {User_Name, Pass})
            .then(Response => {
                if(Response.data.Status === 'Success') {
                    console.log("sucess")
                    navigate('/GetAddress');
                } else {
                    console.log("error");
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
        }



  return (
    <div className= 'd-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='signup_container w-100 d-flex justify-content-center mt-5'>
            <div className='signup_form mt-5 w-50'>
                <h4>Login</h4>
                <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                        <label htmlFor="">User_Name</label>
                        <input type='text' placeholder='Enter Username' className='form-control' 
                        onChange={e => set_User_Name(e.target.value)}/>
                    </div> 
                    <div className='mb-2'>
                        <label htmlFor="">Pass</label>
                        <input type='text' placeholder='Enter Password' className='form-control' 
                        onChange={e => set_Pass(e.target.value)}/>
                    </div> 

                        <button className='btn btn-success w-50'>Login</button>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginPage