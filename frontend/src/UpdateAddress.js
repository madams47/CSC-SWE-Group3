import axios from "axios";
import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateAddress(){
    const [Address_ID, set_Address_ID] = useState('');
    const [Street, set_Street] = useState('');
    const [City, set_City] = useState('');
    const [State, set_State] = useState('');
    const [ZIP, set_ZIP] = useState('');
    //const {id} = useParams;
    const navigate=useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:8081/UpdateAddress/', {Address_ID, Street, City, State, ZIP, Address_ID})
        .then(result => {
            console.log(result);
            navigate('/GetAddress')
        }).catch(error => console.log(error));
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Address</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Address_ID</label>
                        <input type='number' placeholder='Enter Address_ID' className='form-control'
                        onChange={e => set_Address_ID(e.target.value)}/>
                    </div> 
                    <div className='mb-2'>
                        <label htmlFor="">Street</label>
                        <input type="text" placeholder='Enter Street' className='form-control' 
                        onChange={e => set_Street(e.target.value)}/>
                    </div> 
                    <div className='mb-2'>
                        <label htmlFor="">City</label>
                        <input type="text" placeholder='Enter City' className='form-control'
                        onChange={e => set_City(e.target.value)} />
                    </div> 
                    <div className='mb-2'>
                        <label htmlFor="">State</label>
                        <input type="text" placeholder='Enter State' className='form-control' 
                        onChange={e => set_State(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">ZIP</label>
                        <input type="number" placeholder='Enter ZIP' className='form-control' 
                        onChange={e => set_ZIP(e.target.value)}/>
                    </div>  
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
    }

export default UpdateAddress