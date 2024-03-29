import React, { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";
import { Material, WorkItem, WorkItemInfo, Labor, Contractor, Purchaser, Address} from './WorkItemObject.ts';

import axios from 'axios'

function GenerateReport() {
  const { Work_Item_List } = useParams() 
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('');
  const navigate=useNavigate();

   const handleReportTypeChange = (e) => {
    setSelectedReportType(e.target.value);
  };

  const handleFileTypeChange = (e) => {
    setSelectedFileType(e.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    postData()
  }

  const postData = async () => {
    try {
      const Job_IDs = Work_Item_List.split(",")

      // Get Work Item Header information for each work item
      const workItemHeaderUrl = `http://34.207.59.25:8081/GetWorkItemByIds/${Job_IDs}`
      const WorkItemHeaderResponse = await axios.get(workItemHeaderUrl)
      const WorkItemHeaderDataList = WorkItemHeaderResponse.data

      // Get JobMaterial information 
      const jobMaterialUrl = `http://34.207.59.25:8081/GetJobMaterialsMatchingIds/${Job_IDs}`
      const jobMaterialResponse = await axios.get(jobMaterialUrl);
      const JobMaterialsList = jobMaterialResponse.data

      console.log(JobMaterialsList)

      // Get Materials for all each work item
      let Inventory_IDs = []
      for(let i = 0; i < JobMaterialsList.length; i++){
        if(!Inventory_IDs.includes(JobMaterialsList[i].Inventory_ID))
          Inventory_IDs.push(JobMaterialsList[i].Inventory_ID) // add distinct ID's (no repeats)
      }
      const materialsUrl = `http://34.207.59.25:8081/GetMaterialsMatchingInventoryIds/${Inventory_IDs}`
      // Use data from the first response in the second request
      const MaterialsListResponse = await axios.get(materialsUrl);
      const MaterialsList = MaterialsListResponse.data

      console.log(MaterialsList)

      let WorkItemList = []
      for(let i = 0; i < Job_IDs.length; i++){
        let h = Job_IDs[i]
        console.log("Job ID: %d", h)
        // get list of materials for work item
        let ProductList = []
        for(let j = 0; j < JobMaterialsList.length; j++){
          // if it's not assigned to this work item, ignore it
          if(JobMaterialsList[j].Job_ID == Job_IDs[i]){
            // find the matching material in MaterialsList
            for(let k = 0; k < MaterialsList.length; k++){
              if(MaterialsList[k].Inventory_ID == JobMaterialsList[j].Inventory_ID){
                const m = MaterialsList[k]
                ProductList.push(new Material(m.Inventory_ID, m.Material_Name, m.Size, m.Description, m.Inventory_Unit_Price, m.Location));
              }
            }
          }
        }
        console.log(ProductList)
        WorkItemList.push(new WorkItem(new WorkItemInfo(Job_IDs[i], h.Address_ID, h.Contractor_ID, h.Job_Name, h.Order_Date, h.Install_Date, h.PaymentTerms, h.Salesman, h.Total_Material, h.Total_Labor, h.Total, h.Complete),
        null, null, null, ProductList, null))
      }

      // We finally have our work item list to pass to the server
      console.log(WorkItemList)

      const url = `http://34.207.59.25:8081/GenerateReport`
      await axios.post(url, {WorkItemList, selectedReportType, selectedFileType}, { responseType: 'blob' })
        .then(result =>{
          console.log(result)
          // const disposition = result.headers.get('content-disposition');
          // let fileName = ''
          
          // if (disposition && disposition.indexOf('attachment') !== -1) {
          //   const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
          //   if (matches != null && matches[1]) {
          //     fileName = matches[1].replace(/['"]/g, '');
          //   }
          // }

          // console.log("Filename: ", fileName)
          const disposition = result.headers['content-disposition']
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

          console.log(disposition)
          const matches = filenameRegex.exec(disposition);
          let filename = 'Report'; // Default filename if not found in header
    
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
          const url = window.URL.createObjectURL(new Blob([result.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename + ".txt") 
          document.body.appendChild(link);
          link.click();
          link.remove();
          navigate('/MainPage');
        })
    } catch (error) {
      console.error('Error:', error);
    }
  };
      
  return (
    <div className= 'd-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <h2>Generate Reports</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label>
              Report type:
              <select value={selectedReportType} onChange={handleReportTypeChange}>
                <option value="">Select an option</option>
                <option value="CalculateRemainingBalanceOfSelectedWorkItems">Calculate Remaining Balance of Selected Work Items</option>
                <option value="GenerateWarehouseReceipt">Generate Warehouse Receipt</option>
              </select>
            </label>
          </div>
          <br />
          <div className='mb-2'>
            <label>
              File type:
              <select value={selectedFileType} onChange={handleFileTypeChange}>
                <option value="">Select an option</option>
                <option value="txt">Text file</option>
              </select>
            </label>
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default GenerateReport;
