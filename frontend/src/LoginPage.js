import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [errorMessageU, setErrorMessageU] = useState('');
    const [errorMessageA, setErrorMessageA] = useState('');
    const [userUser_Name, setUserUser_Name] = useState(''); // Separate state for regular user
    const [userPass, setUserPass] = useState(''); // Separate state for regular user
    const [adminUser_Name, setAdminUser_Name] = useState(''); // Separate state for admin
    const [adminPass, setAdminPass] = useState(''); // Separate state for admin

    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmitUser = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', { userUser_Name, userPass })
            .then((Response) => {
                if (Response.data.Status === 'Success') {
                    console.log('success');
                    navigate('/MainPage');
                } else {
                    console.log('error');
                    setErrorMessageU('Invalid regular user username or password. Please try again.');
                }
            })
            .catch((err) => console.log(err));
    };

    const handleSubmitAdmin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/adminlogin', { adminUser_Name, adminPass })
            .then((Response) => {
                if (Response.data.Status === 'Success') {
                    console.log('success');
                    navigate('/Admin');
                } else {
                    console.log('error');
                    setErrorMessageA('Invalid admin username or password. Please try again.');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='signup_container w-100 d-flex justify-content-center mt-5'>
                <div className='signup_form d-flex justify-content-between mt-5 w-100'>
                    <div className='login-form col-md-4' style={{ margin: '0 100px' }}>
                        <h4>User Login</h4>
                        <form onSubmit={handleSubmitUser}>
                            <div className='mb-2'>
                                <label htmlFor=''>User Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter Username'
                                    className='form-control'
                                    onChange={(e) => setUserUser_Name(e.target.value)}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor=''>Password</label>
                                <input
                                    type='password'
                                    placeholder='Enter Password'
                                    className='form-control'
                                    onChange={(e) => setUserPass(e.target.value)}
                                />
                            </div>
                            <button className='btn btn-success w-100'>Login</button>
                        </form>
                        {errorMessageU && <div className='error-message'>{errorMessageU}</div>}
                    </div>

                    <div className='login-form col-md-4' style={{ margin: '0 100px' }}>
                        <h4>Admin Login</h4>
                        <form onSubmit={handleSubmitAdmin}>
                            <div className='mb-2'>
                                <label htmlFor=''>User Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter Username'
                                    className='form-control'
                                    onChange={(e) => setAdminUser_Name(e.target.value)}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor=''>Password</label>
                                <input
                                    type='password'
                                    placeholder='Enter Password'
                                    className='form-control'
                                    onChange={(e) => setAdminPass(e.target.value)}
                                />
                            </div>
                            <button className='btn btn-success w-100'>Admin Login</button>
                        </form>
                        {errorMessageA && <div className='error-message'>{errorMessageA}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
