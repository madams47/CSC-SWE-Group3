import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const { User_Name: userNameParam } = useParams(); // Get User_Name from URL params
  const [newUserName, setNewUserName] = useState(null);
  const [userPass, setUserPass] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const url = `http://localhost:8081/updateUser/${userNameParam}`;
    axios
      .put(url, { NewUser_Name: newUserName, Pass: userPass }) // Adjust parameter names
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.message); // 'Values Updated'
          navigate('/Admin');
        } else {
          console.error(response.data.error); // Handle the error
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle network errors or other issues
      });
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>{`Update User ${userNameParam}'s credentials`}</h2>
          <div className='d-flex flex-wrap'>
            <div className='mb-2 w-50'>
              <label htmlFor=''>User Name</label>
              <input
                type='text'
                placeholder='Enter new User Name'
                className='form-control'
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)} // Fix state updater function name
              />
            </div>
            <div className='mb-2 w-50'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                placeholder='Enter Password'
                className='form-control'
                value={userPass}
                onChange={(e) => setUserPass(e.target.value)}
              />
            </div>
          </div>
          <button className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;

