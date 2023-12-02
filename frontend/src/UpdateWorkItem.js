import axios from "axios";
import React, {useEffect, useState} from "react";
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
    const [addedMaterialIds, setAddedMaterialIds] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState ([]); //confusing name, but represents the selected items in the Added Materials grid


    const [filledMaterials, setFilledMaterials] = useState(false)

    const navigate=useNavigate();
    
    useEffect(()=> {    
        axios.get('http://localhost:8081/GetMaterials')
        .then(result => setMaterials(result.data))
        .catch(err => console.log(err));


    },[refreshKey])

    useEffect(() => {
        if(filledMaterials == true)
            return; // since this might get called multiple times, only run it once

        const Job_IDs = Job_ID
        axios.get(`http://localhost:8081/GetJobMaterialsMatchingIds/${Job_IDs}`).then(result => {
            const jobMaterials = result.data;

            const materials = []
            for(let i = 0; i < jobMaterials.length; i++){
                for(let j = 0; j < MaterialsList.length; j++){
                    if(MaterialsList[j].Inventory_ID == jobMaterials[i].Inventory_ID)
                        materials.push(MaterialsList[j])
                }
            }
            setAddedMaterialIds(materials)

            if(materials.length > 0)
                setFilledMaterials(true)

            for(let i = 0; i < jobMaterials.length; i++){
                setAddedMaterialIds((prevData) =>
                    prevData.map((row) => (row.Inventory_ID === jobMaterials[i].Inventory_ID ? { ...row, Quantity: parseInt(jobMaterials[i].Quantity, 10) || 0 } : row))
                );
            }

            axios.get(`http://localhost:8081/GetWorkItemByIds/${Job_IDs}`).then(workItemResult => {
                const workItem = workItemResult.data[0]; // we're only getting 1 work item. The "0th"

                console.log(workItem.Job_Name)
                // const [Address_ID, set_Address_ID] = useState(null);
                // const [Contractor_ID, set_Contractor_ID] = useState(null);
                // const [Job_Name, set_Job_Name] = useState(null);
                // const [Order_Date, set_Order_Date] = useState(null);
                // const [install_Date, set_install_Date] = useState(null);
                // const [Payment_Terms, set_Payment_Terms] = useState(null);
                // const [Salesman, set_Salesman] = useState(null);
                // const [Total_Material, set_Total_Material] = useState(null);
                // const [Total_Labor, set_Total_Labor] = useState(null);
                // const [Total, set_Total] = useState(null);
                // const [Complete, set_Complete] = useState(null);

                set_Address_ID(workItem.Address_ID)
                set_Contractor_ID(workItem.Contractor_ID)
                set_Job_Name(workItem.Job_Name)

                let orderDate = new Date(workItem.Order_Date).toISOString().split('T')[0]
                let installDate = new Date(workItem.Install_Date).toISOString().split('T')[0]
                set_Order_Date(orderDate)
                set_install_Date(installDate)
                set_Payment_Terms(workItem.Payment_Terms)
                set_Salesman(workItem.Salesman)
                set_Total_Material(workItem.Total_Material)
                set_Total_Labor(workItem.Total_Labor)
                set_Total(workItem.Total)
                set_Complete(workItem.Complete)
            })
        })
    },[MaterialsList])

    function handleSubmit(event) {
        event.preventDefault();
        const url = `http://localhost:8081/UpdateworkItem/${Job_ID}`;
        axios.put(url, {Address_ID, Contractor_ID, 
        Job_Name, Order_Date,install_Date,Payment_Terms,Salesman,Total_Material,Total_Labor,Total,Complete})
    .then(response => {
      if (response.status === 200) {
        console.log(response.data.message); // 'Values Updated' 

        // remove all JobMaterial entries in DB with matching Job ID
        // we will re-add all old (or new) JobMaterials immediately after
        axios.post(`http://localhost:8081/RemoveJobMaterialsMatchingId`, {Job_ID}).then(result => {
        for(let i = 0; i < addedMaterialIds.length; i++){
            const jobId = Job_ID
            const inventoryId = addedMaterialIds[i].Inventory_ID
            const quantity = addedMaterialIds[i].Quantity
            axios.post('http://localhost:8081/CreateJobMaterial', {jobId, inventoryId, quantity}).then(result =>{
                console.log(result);
            }).catch(error => console.log(error));
        }

        })
      } else {
        console.error(response.data.error); // Handle the error
      }

    navigate('/MainPage');
    })
    .catch(error => {
      console.error(error);
      // Handle network errors or other issues
    });
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
        const temp = addedMaterialIds
        Object.assign(temp, selectedItems)
        setAddedMaterialIds(temp)

        let tempMaterials = []
        for(let i = 0; i < temp.length; i++){ // for every material added to the work item

            // find the work item data in the database list by looping and matching ID
            for(let j = 0; j < MaterialsList.length; j++){
                if(MaterialsList[j].Inventory_ID == temp[i]){
                    tempMaterials.push({
                        Inventory_ID : MaterialsList[j].Inventory_ID,
                        Material_Name : MaterialsList[j].Material_Name,
                        Size : MaterialsList[j].Size,
                        Quantity : 0
                    })

                }
            }

        }
        setAddedMaterialIds(tempMaterials)
    }

    const removeSelectedMaterialsFromWorkItem = () => {
        const materialsToRemove = selectedMaterials

        let temp = addedMaterialIds 
        if(MaterialsList.length > 0){
            for(let i = 0; i < materialsToRemove.length; i++){
                for(let j = MaterialsList.length - 1; j >= 0; j--){
                    if(MaterialsList[j].Inventory_ID == materialsToRemove[i]){
                        console.log(MaterialsList[j])
                        const found = addedMaterialIds.find(item => item.Inventory_ID === materialsToRemove[i])
                        console.log("Removed")
                        temp = temp.filter(item => item !== found)
                        console.log(temp)
                    }
                }
            }
        }


        setSelectedMaterials([])

        setAddedMaterialIds(temp)
    }

    const handleCheckboxChange = (event, InventoryId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedItems([...selectedItems, InventoryId]);
        } else {
            setSelectedItems(selectedItems.filter(item => item !== InventoryId));
        }
    };

    const handleCheckboxChangeaddedMaterialIds = (event, InventoryId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedMaterials([...selectedMaterials, InventoryId]);
        } else {
            setSelectedMaterials(selectedMaterials.filter(item => item !== InventoryId));
        }
    };

    const handleQuantityChanged = (e, id) => {
        const { value } = e.target;
        setAddedMaterialIds((prevData) =>
          prevData.map((row) => (row.Inventory_ID === id ? { ...row, Quantity: parseInt(value, 10) || 0 } : row))
        );
      };

    const tableCss = {
        height: '80px',
        padding: '0 10px 10px 10px',
        overflow: 'auto',
        border: '1px solid #999',
        borderRadius: '4px',
        padding: '10px',
        margin: '5px',
    }

    const flexboxContainer = {
        display: 'flex',
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>{`Update Work Item ${Job_ID}`}</h2>
                    <div className='d-flex flex-wrap'>
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Address_ID</label>
                            <input type="text" value={Address_ID} placeholder='Enter Address_ID' className='form-control' 
                            onChange={e => set_Address_ID(e.target.value || null)}/>
                        </div> 
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Contractor_ID</label>
                            <input type="text" value={Contractor_ID} placeholder='Enter Contractor_ID' className='form-control'
                            onChange={e => set_Contractor_ID(e.target.value || null)} />
                        </div> 
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Job Name</label>
                            <input type="text" value={Job_Name} placeholder='Enter Job Name' className='form-control' 
                            onChange={e => set_Job_Name(e.target.value || null)}/>
                        </div>
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Order Date</label>
                            <input type="date" value={Order_Date} placeholder='Enter Order Date' className='form-control' 
                            onChange={e => set_Order_Date(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Install Date</label>
                            <input type="date" value={install_Date} placeholder='Enter Install Date' className='form-control' 
                            onChange={e => set_install_Date(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Payment Terms</label>
                            <input type="number" value={Payment_Terms} placeholder='Enter Payment Terms' className='form-control' 
                            onChange={e => set_Payment_Terms(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Salesman</label>
                            <input type="text" value={Salesman} placeholder='Enter Salesman name' className='form-control' 
                            onChange={e => set_Salesman(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Total Material</label>
                            <input type="number" value={Total_Material} placeholder='Enter Total Material' className='form-control' 
                            onChange={e => set_Total_Material(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Total Labor</label>
                            <input type="number" value={Total_Labor} placeholder='Enter Total Labor' className='form-control' 
                            onChange={e => set_Total_Labor(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Total</label>
                            <input type="number" value={Total} placeholder='Enter Total' className='form-control' 
                            onChange={e => set_Total(e.target.value || null)}/>
                        </div>  
                        <div className='mb-2 w-50'>
                            <label htmlFor="">Complete</label>
                            <input type="boolean" value={Complete} placeholder='Enter if Complete' className='form-control' 
                            onChange={e => set_Complete(e.target.value || null)}/>
                        </div>  
                        </div>
                    <button className='btn btn-success'>Update</button>
                </form>

                <div className='w-75 bg-white rounded p-3'>
                    <div className="flexbox-container" style={flexboxContainer}>
                        <div>
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
                                                        onChange={(e) => {
                                                            handleCheckboxChange(e, data.Inventory_ID, i)}}
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
                        </div>
                        <dir>
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
                                        addedMaterialIds.map((data, i) => (
                                                <tr key={i}>
                                                <td>
                                                    <input
                                                        type='checkbox'
                                                        onChange={(e) => {
                                                            console.log("i: %d     id: %d", i, data.Inventory_ID)
                                                            handleCheckboxChangeaddedMaterialIds(e, data.Inventory_ID)}}
                                                        checked={selectedMaterials.includes(data.Inventory_ID)}
                                                    />
                                                </td>
                                                <td>{data.Inventory_ID}</td>
                                                <td>{data.Material_Name}</td>
                                                <td>{data.Size}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={data.Quantity}
                                                        onChange={(e) => handleQuantityChanged(e, data.Inventory_ID)}
                                                        min={0}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <button onClick={removeSelectedMaterialsFromWorkItem}>Remove Selected</button>
                        </dir>
                    </div>
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

export default UpdateWorkItem