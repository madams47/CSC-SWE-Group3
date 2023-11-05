import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom';
//import e from 'cors';


  
  
  function MainPage() {
    const [Getaddress, setAddress] = useState ([]);
    //const [Address_ID, set_Address_ID] = useState([]);

   // const navigate=useNavigate();

    useEffect(()=> {        
        axios.get('http://localhost:8081')
        .then(result => setAddress(result.data))
        .catch(err => console.log(err));
    },[])

    function handleDelete (Address_ID){
        axios.post('http://localhost:8081/Delete', {Address_ID})
        .then(result => {
            console.log(result);
            window.location.reload();
        }).catch(error => console.log(error));
    }




    return (
        <div className= 'd-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className= 'w-50 bg-white rounded p-3'>
                <Link to="/CreateAddress" className='btn btn-success'>Add Work Item</Link>
                <Link to="/GenerateReport" className='btn btn-success'>Generate Report</Link>
                <table className='table'>
                    <thead>
                        <tr>
                        <th>Address_ID</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>ZIP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Getaddress.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.Address_ID}</td>
                                    <td>{data.Street}</td>
                                    <td>{data.City}</td>
                                    <td>{data.State}</td>
                                    <td>{data.ZIP}</td>
                                <td>
                                <Link to={'/UpdateAddress'} className='btn btn-primary'>Update</Link>
                                <button className='btn btn-danger ms-2'onClick={e => handleDelete(data.Address_ID)}>Delete</button>
                                </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
            )
                    }
export default MainPage