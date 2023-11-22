import axios from "axios";
import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";


function UpdateWorkItem(){
    
    const {Job_ID} = useParams();
    const [Address_ID, set_Address_ID] = useState(null);
    const [Contractor_ID, set_Contractor_ID] = useState(null);
    const [Job_Name, set_Job_Name] = useState(null);
    const [Order_Date, set_Order_Date] = useState(null);
    const [install_Date, set_install_Date] = useState(null);
    const [Payment_Terms, set_Payment_Terms] = useState(null);
    const [Salesman, set_Salesman] = useState(null);
    const [Total_Material, set_Total_Material] = useState(null);
    const [Total_Labor, set_Total_Labor] = useState(null);
    const [Total, set_Total] = useState(null);
    const [Complete, set_Complete] = useState(null);
    const navigate=useNavigate();
    
    

    function handleSubmit(event) {
        event.preventDefault();
        const url = `http://34.207.59.25:8081/UpdateworkItem/${Job_ID}`;
        axios.put(url, {Address_ID, Contractor_ID, 
        Job_Name, Order_Date,install_Date,Payment_Terms,Salesman,Total_Material,Total_Labor,Total,Complete})
    .then(response => {
      if (response.status === 200) {
        console.log(response.data.message); // 'Values Updated'
        navigate('/MainPage');
      } else {
        console.error(response.data.error); // Handle the error
      }
    })
    .catch(error => {
      console.error(error);
      // Handle network errors or other issues
    });
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>{`Update Work Item ${Job_ID}`}</h2>
                    <div className='d-flex flex-wrap'>
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Address_ID</label>
                            <input type="text" placeholder='Enter Address_ID' className='form-control' 
                            onChange={e => set_Address_ID(e.target.value || null)}/>
                        </div> 
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Contractor_ID</label>
                            <input type="text" placeholder='Enter Contractor_ID' className='form-control'
                            onChange={e => set_Contractor_ID(e.target.value || null)} />
                        </div> 
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Job Name</label>
                            <input type="text" placeholder='Enter Job Name' className='form-control' 
                            onChange={e => set_Job_Name(e.target.value || null)}/>
                        </div>
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Order Date</label>
                            <input type="date" placeholder='Enter Order Date' className='form-control' 
                            onChange={e => set_Order_Date(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Install Date</label>
                            <input type="date" placeholder='Enter Install Date' className='form-control' 
                            onChange={e => set_install_Date(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Payment Terms</label>
                            <input type="number" placeholder='Enter Payment Terms' className='form-control' 
                            onChange={e => set_Payment_Terms(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Salesman</label>
                            <input type="text" placeholder='Enter Salesman name' className='form-control' 
                            onChange={e => set_Salesman(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Total Material</label>
                            <input type="number" placeholder='Enter Total Material' className='form-control' 
                            onChange={e => set_Total_Material(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Total Labor</label>
                            <input type="number" placeholder='Enter Total Labor' className='form-control' 
                            onChange={e => set_Total_Labor(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Total</label>
                            <input type="number" placeholder='Enter Total' className='form-control' 
                            onChange={e => set_Total(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Complete</label>
                            <input type="boolean" placeholder='Enter if Complete' className='form-control' 
                            onChange={e => set_Complete(e.target.value || null)}/>
                        </div>  
                        </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
    }

export default UpdateWorkItem