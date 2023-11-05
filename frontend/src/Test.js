import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function Test()
{
    const [User_Name, set_User_Name] = useState('');
    const [Pass, set_Pass] = useState('');
    const navigate=useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/Login/', {User_Name, Pass})
        .then(result => {
            //navigate('/')
        }).catch(error => console.log(error));
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div classname='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Address</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Username</label>
                        <input type='text' placeholder='Enter Address_ID' className='form-control' 
                        onChange={e => set_User_Name(e.target.value)}/>
                    </div> 
                    <div className='mb-2'>
                        <label htmlFor="">Password</label>
                        <input type="text" placeholder='Enter Street' className='form-control'
                        onChange={e => set_Pass(e.target.value)}/>
                    </div> 
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Test