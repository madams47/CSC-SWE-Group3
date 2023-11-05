import React, { useState } from 'react';

const Table = () => {
  const initialWorkItems = [
    {
      workItemId: 1,
      workItem: "Task 1",
      customerName: "Customer A",
      status: "Open",
      jobLocation: "Location X"
    },
    {
      workItemId: 2,
      workItem: "Task 2",
      customerName: "Customer B",
      status: "Closed",
      jobLocation: "Location Y"
    },
    {
      workItemId: 3,
      workItem: "Task 3",
      customerName: "Customer C",
      status: "Open",
      jobLocation: "Location Z"
    },
    // Add more work items as needed
  ];

  const [workItems, setWorkItems] = useState(initialWorkItems);
  const [isEditMode, setIsEditMode] = useState(Array(initialWorkItems.length).fill(false));

  const [newWorkItem, setNewWorkItem] = useState({
    workItemId: getUniqueWorkItemId(),
    workItem: '',
    customerName: '',
    status: 'Open', // Set the default to 'Open'
    jobLocation: '',
  });

  const handleEditWorkItem = (index, field, value) => {
    const updatedWorkItems = [...workItems];
    updatedWorkItems[index][field] = value;
    setWorkItems(updatedWorkItems);
  };

  const handleToggleEditMode = (index) => {
    const updatedIsEditMode = [...isEditMode];
    updatedIsEditMode[index] = !updatedIsEditMode[index];
    setIsEditMode(updatedIsEditMode);
  };

  const handleDeleteWorkItem = (index) => {
    const updatedWorkItems = [...workItems];
    updatedWorkItems.splice(index, 1);
    setWorkItems(updatedWorkItems);
    setIsEditMode(isEditMode.filter((_, i) => i !== index));
  };

  const handleAddWorkItem = () => {
    if (
      newWorkItem.workItem &&
      newWorkItem.customerName &&
      newWorkItem.status &&
      newWorkItem.jobLocation
    ) {
      setWorkItems([...workItems, newWorkItem]);
      setIsEditMode([...isEditMode, false]);
      setNewWorkItem({
        workItemId: getUniqueWorkItemId(),
        workItem: '',
        customerName: '',
        status: 'Open', // Set the default to 'Open'
        jobLocation: '',
      });
    } else {
      alert('Please fill in all fields');
    }
  };

  function getUniqueWorkItemId() {
    // Generate a unique work item ID
    const usedIds = workItems.map((item) => item.workItemId);
    let newId = 1;
    while (usedIds.includes(newId)) {
      newId++;
    }
    return newId;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Work Item ID</th>
            <th>Work Item</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Job Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {workItems.map((item, index) => (
            <tr key={index}>
              <td>
                {isEditMode[index] ? (
                  <input
                    type="text"
                    value={item.workItemId}
                    onChange={(e) => handleEditWorkItem(index, "workItemId", e.target.value)}
                    disabled={true} // Make it non-editable
                  />
                ) : (
                  item.workItemId
                )}
              </td>
              <td>
                {isEditMode[index] ? (
                  <input
                    type="text"
                    value={item.workItem}
                    onChange={(e) => handleEditWorkItem(index, "workItem", e.target.value)}
                    required
                  />
                ) : (
                  item.workItem
                )}
              </td>
              <td>
                {isEditMode[index] ? (
                  <input
                    type="text"
                    value={item.customerName}
                    onChange={(e) => handleEditWorkItem(index, "customerName", e.target.value)}
                    required
                  />
                ) : (
                  item.customerName
                )}
              </td>
              <td>
                {isEditMode[index] ? (
                  <select
                    value={item.status}
                    onChange={(e) => handleEditWorkItem(index, "status", e.target.value)}
                    required
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                ) : (
                  item.status
                )}
              </td>
              <td>
                {isEditMode[index] ? (
                  <input
                    type="text"
                    value={item.jobLocation}
                    onChange={(e) => handleEditWorkItem(index, "jobLocation", e.target.value)}
                    required
                  />
                ) : (
                  item.jobLocation
                )}
              </td>
              <td>
                {isEditMode[index] ? (
                  <button onClick={() => handleToggleEditMode(index)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleDeleteWorkItem(index)}>Delete</button>
                    <button onClick={() => handleToggleEditMode(index)}>Edit</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Add a Work Item</h2>
        <input
          type="text"
          placeholder="Work Item"
          value={newWorkItem.workItem}
          onChange={(e) => setNewWorkItem({ ...newWorkItem, workItem: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Customer Name"
          value={newWorkItem.customerName}
          onChange={(e) => setNewWorkItem({ ...newWorkItem, customerName: e.target.value })}
          required
        />
        <select
          value={newWorkItem.status}
          onChange={(e) => setNewWorkItem({ ...newWorkItem, status: e.target.value })}
          required
        >
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
        <input
          type="text"
          placeholder="Job Location"
          value={newWorkItem.jobLocation}
          onChange={(e) => setNewWorkItem({ ...newWorkItem, jobLocation: e.target.value })}
          required
        />
        <button onClick={handleAddWorkItem}>Add</button>
      </div>
    </div>
  );
};

export default Table;
//sdsdfsdf
