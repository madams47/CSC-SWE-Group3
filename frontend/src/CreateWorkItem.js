import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function CreateWorkItem()
{ 
    //const [Job_ID, set_Job_ID] = useState('');
    const [Address_ID, set_Address_ID] = useState('');
    const [Contractor_ID, set_Contractor_ID] = useState('');
    const [Job_Name, set_Job_Name] = useState('');
    const [Order_Date, set_Order_Date] = useState('');
    const [install_Date, set_install_Date] = useState('');
    const [Payment_Terms, set_Payment_Terms] = useState('');
    const [Salesman, set_Salesman] = useState('');
    const [Total_Material, set_Total_Material] = useState('');
    const [Total_Labor, set_Total_Labor] = useState('');
    const [Total, set_Total] = useState('');
    const [Complete, set_Complete] = useState('');

    const [Material_Name, set_Material_Name] = useState('');
    const [Size, set_Size] = useState('')
    const [Description, set_Description] = useState('')
    const [Location, set_Location] = useState('')

    const [MaterialsList, setMaterials] = useState ([]);
    const [MaterialMaxId, setMaterialMaxId] = useState (0);
    const [refreshKey, setRefreshKey] = useState(0);

    // selected items in materials list (that the user wants to add to this work item)
    const [selectedItems, setSelectedItems] = useState([]);

    // material (IDs) that the user added to this work item
    const [addedMaterials, setAddedMaterials] = useState([]);
    const [quantity, set_Quantity] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState ([]); //confusing name, but represents the selected items in the Added Materials grid


    const navigate=useNavigate();

    useEffect(()=> {    
        axios.get('http://localhost:8081/GetMaterials')
        .then(result => setMaterials(result.data))
        .catch(err => console.log(err));


    },[refreshKey])

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/CreateWorkItem', {Address_ID,Contractor_ID,Job_Name,Order_Date, install_Date,Payment_Terms,
    Salesman,Total_Material,Total_Labor, Total, Complete })
        .then(result => {
            console.log(result);
            navigate('/MainPage')
        }).catch(error => console.log(error));
    }

    function updateMaxMaterialId(){
        axios.get('http://localhost:8081/GetMaxMaterialId')
        .then(result => {
            console.log(result.data)
            setMaterialMaxId(result.data)
        })
        .catch(err => console.log(err));
    }

    function handleAddMaterial(event){
        event.preventDefault();

        updateMaxMaterialId()
        // still need to add 1 to the ID
        console.log(MaterialMaxId)
        console.log(parseInt(MaterialMaxId))
        console.log(parseInt(MaterialMaxId) + 1)
        const materialId = parseInt(MaterialMaxId) + 1

        const url = `http://localhost:8081/CreateMaterial`
        axios.post(url, {materialId, Material_Name, Size, Description, Location})
            .then(result => { 
                console.log(result)
                setRefreshKey(oldKey => oldKey +1)
            }).catch(error => console.log(error));
    }

    function addSelectedMaterialsToWorkItem(){
        const temp = addedMaterials
        Object.assign(temp, selectedItems)
        console.log(selectedItems)
        console.log(addedMaterials)
        console.log(temp)
        setAddedMaterials(temp)

        let tempMaterials = []
        for(let i = 0; i < temp.length; i++){ // for every material added to the work item

            // find the work item data in the database list by looping and matching ID
            for(let j = 0; j < MaterialsList.length; j++){
                if(MaterialsList[j].Inventory_ID == temp[i]){
                    console.log("Hello")
                    tempMaterials.push({
                        Inventory_ID : MaterialsList[j].Inventory_ID,
                        Material_Name : MaterialsList[j].Material_Name,
                        Size : MaterialsList[j].Size,
                    })

                }
            }

        }
        setSelectedMaterials(tempMaterials)
    }

    function removeSelectedMaterialsFromWorkItem(){

    }

    const handleCheckboxChange = (event, InventoryId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedItems([...selectedItems, InventoryId]);
        } else {
            setSelectedItems(selectedItems.filter(item => item !== InventoryId));
        }
    };

    const handleCheckboxChangeAddedMaterials = (event, InventoryId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedMaterials([...selectedMaterials, InventoryId]);
        } else {
            setSelectedMaterials(selectedMaterials.filter(item => item !== InventoryId));
        }
    };
    const tableCss = {
        borderRadius: '20px',
        height: '244px',
        padding: '0 10px 10px 10px',
        overflow: 'scroll',
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Work Item</h2>
                    <div className='d-flex flex-wrap'>

                        <div className='mb-2 w-50'>
                            <label htmlFor="">Address_ID</label>
                            <input type="text" placeholder='Enter Address_ID' className='form-control' 
                            onChange={e => set_Address_ID(e.target.value)}/>
                        </div> 
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Contractor_ID</label>
                            <input type="text" placeholder='Enter Contractor_ID' className='form-control'
                            onChange={e => set_Contractor_ID(e.target.value)} />
                        </div> 
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Job Name</label>
                            <input type="text" placeholder='Enter Job Name' className='form-control' 
                            onChange={e => set_Job_Name(e.target.value)}/>
                        </div>
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Order Date</label>
                            <input type="date" placeholder='Enter Order Date' className='form-control' 
                            onChange={e => set_Order_Date(e.target.value)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Install Date</label>
                            <input type="date" placeholder='Enter Install Date' className='form-control' 
                            onChange={e => set_install_Date(e.target.value)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Payment Terms</label>
                            <input type="number" placeholder='Enter Payment Terms' className='form-control' 
                            onChange={e => set_Payment_Terms(e.target.value)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Salesman</label>
                            <input type="text" placeholder='Enter Salesman name' className='form-control' 
                            onChange={e => set_Salesman(e.target.value)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Total Material</label>
                            <input type="number" placeholder='Enter Total Material' className='form-control' 
                            onChange={e => set_Total_Material(e.target.value)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Total Labor</label>
                            <input type="number" placeholder='Enter Total Labor' className='form-control' 
                            onChange={e => set_Total_Labor(e.target.value)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Total</label>
                            <input type="number" placeholder='Enter Total' className='form-control' 
                            onChange={e => set_Total(e.target.value)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Complete</label>
                            <input type="boolean" placeholder='Enter if Complete' className='form-control' 
                            onChange={e => set_Complete(e.target.value)}/>
                        </div>  
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>

                <div className='w-75 bg-white rounded p-3'>
                    <h2>Materials (Database)</h2>
                    <table style={tableCss} className='materialsTable'>
                        <thead>
                            <tr>
                            <th>Inventory ID</th>
                            <th>Material Name</th>
                            <th>Size</th>
                            <th>Description</th>
                            <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                MaterialsList.map((data, i) => (
                                        <tr key={i}>
                                        <td>
                                            <input
                                                type='checkbox'
                                                onChange={(e) => handleCheckboxChange(e, data.Inventory_ID)}
                                                checked={selectedItems.includes(data.Inventory_ID)}
                                            />
                                        </td>
                                        <td>{data.Inventory_ID}</td>
                                        <td>{data.Material_Name}</td>
                                        <td>{data.Size}</td>
                                        <td>{data.Description}</td>
                                        <td>{data.Location}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <button onClick={addSelectedMaterialsToWorkItem}>Add Selected</button>

                    <h2>Selected Materials</h2>
                    <table style={tableCss} className='selectedMaterialsTable'>
                        <thead>
                            <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Material Name</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedMaterials.map((data, i) => (
                                        <tr key={i}>
                                        <td>
                                            <input
                                                type='checkbox'
                                                onChange={(e) => handleCheckboxChangeAddedMaterials(e, data.Inventory_ID)}
                                            />
                                        </td>
                                        <td>{data.Inventory_ID}</td>
                                        <td>{data.Material_Name}</td>
                                        <td>{data.Size}</td>
                                        <td>
                                            <input type="number" placeholder='Enter Quantity'  
                                                onChange={e => set_Quantity(e.target.value)}/>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <button onClick={removeSelectedMaterialsFromWorkItem}>Remove Selected</button>
                </div>
                <form onSubmit={handleAddMaterial}>
                     <h2>Add Material to Database</h2>
                     <div className='d-flex flex-wrap'>
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Material Name</label>
                            <input type="text" placeholder='Enter Material Name' className='form-control'
                            onChange={e => set_Material_Name(e.target.value)} />
                        </div> 
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Size</label>
                            <input type="text" placeholder='Enter Size' className='form-control' 
                            onChange={e => set_Size(e.target.value)}/>
                        </div>
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Description</label>
                            <input type="text" placeholder='Enter Description' className='form-control' 
                            onChange={e => set_Description(e.target.value)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Location</label>
                            <input type="text" placeholder='Enter Location' className='form-control' 
                            onChange={e => set_Location(e.target.value)}/>
                        </div>  
                    </div>
                    <button className='btn btn-success'>Add</button>
                </form>
            </div>
        </div>
    )
    
}

export default CreateWorkItem