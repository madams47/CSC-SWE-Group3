import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
//import e from 'cors';


  
  
  function MainPage() {
    const [GetWorkItem, setWorkItem] = useState ([]);
    const [selectedItems, setSelectedItems] = useState([]);
    //const [Address_ID, set_Address_ID] = useState([]);

   // const navigate=useNavigate();

    useEffect(()=> {    
        //console.log("useEffect is running"); 
        axios.get('http://localhost:8081/GetWorkItem')
        .then(result => setWorkItem(result.data))
        .catch(err => console.log(err));
    },[])

    function handleDelete (workItemId){
        axios.post(`http://localhost:8081/deleteWorkItem/${workItemId}`)
        .then(result => {
            console.log(result);
            window.location.reload();
        }).catch(error => console.log(error));
    }


    const handleCheckboxChange = (event, workItemId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedItems([...selectedItems, workItemId]);
        } else {
            setSelectedItems(selectedItems.filter(item => item !== workItemId));
        }
    };


    // const generateReport = () => {
    //     console.log('Generate Report button clicked');
    //     const selectedJobIds = selectedItems.join(',');
    //     console.log('Selected Job IDs:', selectedJobIds);
    //     axios.post(`http://localhost:8081/generateReport/${selectedJobIds}`)
    //         .then(response => {
    //             console.log(response.data); // Handle API response as needed
    //             // Optionally, perform additional actions based on the response
    //         })
    //         .catch(error => {
    //             console.error('Error generating report:', error);
    //             // Handle error scenarios
    //         });
    // };



    return (
        <div className= 'd-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className= 'w-50 bg-white rounded p-3'>
                <Link to="/CreateWorkItem" className='btn btn-success'>Add Work Item</Link>
                <Link to={{ pathname: `/GenerateReport/${selectedItems.join(',')}`}}>
                    Generate Report
                </Link>
                <table className='table'>
                    <thead>
                        <tr>
                        <th>Select</th>
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
                                     <td>
                                    <input
                                        type='checkbox'
                                        onChange={(e) => handleCheckboxChange(e, data.Job_ID)}
                                        checked={selectedItems.includes(data.Job_ID)}
                                    />
                                </td>
                                    <td>{data.Job_ID}</td>
                                    <td>{data.Contractor_ID}</td>
                                    <td>{data.Job_Name}</td>
                                    <td>{data.Order_Date}</td>
                                <td>
                                <Link to={`/UpdateWorkItem/${data.Job_ID}`} className='btn btn-primary'>Update</Link>
                                <button className='btn btn-danger ms-2'onClick={e => handleDelete(data.Job_ID)}>Delete</button>
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
export default MainPage