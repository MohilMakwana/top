import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ManageData() {
  // State to store data
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Fetch all tasks and display data
  useEffect(() => {
    axios.get(`http://localhost:8000/added-task`).then((response) => {
      setData(response.data);
    });
  }, [data]);

  return (
    <div className="container mt-5">
      <div className="row">
        {data && data.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.taskname}</h5>
                <p className="card-text"><strong>Details:</strong> {item.details}</p>
                <p className="card-text"><strong>Priority:</strong> {item.priority}</p>
                <p className="card-text"><strong>Status:</strong> {item.status}</p>
                <p className="card-text"><strong>Added Date:</strong> {item.added_date}</p>
                <div className="d-flex justify-content-between">
                  <button 
                    type="button" 
                    onClick={() => { navigate(`/delete-task/${item.id}`) }} 
                    className="btn btn-sm btn-danger"
                  >
                    <span className="bi bi-trash"></span> Delete
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { navigate(`/edit-task/${item.id}`) }} 
                    className="btn btn-sm btn-primary"
                  >
                    <span className="bi bi-pencil"></span> Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
