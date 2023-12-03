import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom';
//import e from 'cors';


  
  function Admin() {
    const [GetUserCredentials, setUserCredentials] = useState ([]);
   

    useEffect(()=> {    
        //console.log("useEffect is running"); 
        axios.get('http://34.207.59.25:8081/GetUserCredentials')
        .then(result => setUserCredentials(result.data))
        .catch(err => console.log(err));
    },[])

    function handleDelete (User_Name){
        axios.post(`http://34.207.59.25:8081/deleteUser/${User_Name}`)
        .then(result => {
            console.log(result);
            window.location.reload();
        }).catch(error => console.log(error));
    }




    return (
        <div className= 'd-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className= 'w-50 bg-white rounded p-3'>
                <Link to="/CreateUser" className='btn btn-success'>Add User</Link>
                <table className='table'>
                    <thead>
                        <tr>
                        <th>User Name</th>
                        <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            GetUserCredentials.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.User_Name}</td>
                                    <td>{data.Pass}</td>
                                <td>
                                <Link to={`/updateUser/${data.User_Name}`} className='btn btn-primary'>Update</Link>
                                <button className='btn btn-danger ms-2'onClick={e => handleDelete(data.User_Name)}>Delete</button>
                                </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Link to="/" className='btn btn-success'>Sign Out</Link>
            </div>
        </div>
      )
     }
export default Admin;