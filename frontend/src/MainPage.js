import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom';
//import e from 'cors';


  
  
  function MainPage() {
    const [GetWorkItem, setWorkItem] = useState ([]);
    //const [Address_ID, set_Address_ID] = useState([]);

   // const navigate=useNavigate();

    useEffect(()=> {    
        //console.log("useEffect is running"); 
        axios.get('http://localhost:8081/GetWorkItem')
        .then(result => setWorkItem(result.data))
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
                <Link to="/CreateWorkItem" className='btn btn-success'>Add Work Item</Link>
                <Link to="/GenerateReport" className='btn btn-success'>Generate Report</Link>
                <table className='table'>
                    <thead>
                        <tr>
                        <th>Job ID</th>
                        <th>Contractor ID</th>
                        <th>Job Name</th>
                        <th>Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            GetWorkItem.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.Job_ID}</td>
                                    <td>{data.Contractor_ID}</td>
                                    <td>{data.Job_Name}</td>
                                    <td>{data.Order_Date}</td>
                                <td>
                                <Link to={`/UpdateWorkItem/${data.Job_ID}`} className='btn btn-primary'>Update</Link>
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