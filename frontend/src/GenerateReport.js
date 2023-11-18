import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

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
      console.log("Handle Submit:")
      console.log(Work_Item_List)
      axios.post(`http://localhost:8081/generateReport/${Work_Item_List}`,)
          .then(result => {
              console.log(result);
              navigate('/MainPage')
          }).catch(error => console.log(error));
  }
      
  return (
    <div>
      <h2>Generate Reports</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Report type:
          <select value={selectedReportType} onChange={handleReportTypeChange}>
            <option value="">Select an option</option>
            <option value="CalculateRemainingBalanceOfSelectedWorkItems">Calculate Remaining Balance of Selected Work Items</option>
            <option value="GenerateWarehouseReceipt">Generate Warehouse Receipt</option>
          </select>
        </label>
        <br />
        <label>
          File type:
          <select value={selectedFileType} onChange={handleFileTypeChange}>
            <option value="">Select an option</option>
            <option value="txt">Text file</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GenerateReport;
