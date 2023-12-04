import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function CreateUser()
{ 
    //const [Job_ID, set_Job_ID] = useState('');
    const [userUser_Name, setUserUser_Name] = useState('');
    const [userPass, setUserPass] = useState('');
    const navigate=useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://34.207.59.25:8081/CreateUser', {userUser_Name,userPass})
        .then(result => {
            console.log(result);
            navigate('/Admin')
        }).catch(error => console.log(error));
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>
                    <div className='d-flex flex-wrap'>

                        <div className='mb-2 w-50'>
                            <label htmlFor="">User Name</label>
                            <input type="text" placeholder='Enter User Name' className='form-control' 
                            onChange={e => setUserUser_Name(e.target.value)}/>
                        </div> 
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Password</label>
                            <input type="text" placeholder='Enter Password' className='form-control'
                            onChange={e => setUserPass(e.target.value)} />
                        </div> 
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
    
}

export default CreateUser