import React,{useState,useRef,useEffect} from 'react'
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom'
import {Container,Form} from 'react-bootstrap'
import Swal from 'sweetalert2';
import HeaderApp from './HeaderApp';

export default function EditTask() {
//for edit data destrucring and edit all data http://localhost:8000/added-task
const[data,setData]=useState([]);
const Navigate=useNavigate();
const {id}=useParams();

const taskname=useRef("");
const priority=useRef("");
const added_date=useRef("");
const details=useRef("")
const status=useRef("")
// edit data
useEffect(()=>{
 axios.get(`http://localhost:8000/added-task/${id}`).then((response)=>{
  
    taskname.current.value=response.data.taskname;
    details.current.value=response.data.details
    priority.current.value=response.data.priority;
    status.current.value=response.data.status
    added_date.current.value=response.data.added_date;
    
 });

},[]);

// update data create a FormHandeler
const updFormHandeler=()=>{
    var upd={
        taskname:taskname.current.value,
        details:details.current.value,
        priority:priority.current.value,
        status:status.current.value,
        added_date:added_date.current.value
    }

    // update data call api 
    axios.put(`http://localhost:8000/added-task/${id}`,upd).then(()=>{
        // pass a update message
        Swal.fire({
            title: "wow",
            text: "Your Task updated  successfully",
            icon: "success"
          });

          Navigate('/');
    })
}


  return (
    <div>
    <HeaderApp />
      <Container className="p-5 mt-5">
       <Form>
        <div className='form-group mt-3'>
            <label className='bi bi-pencil'>Todo</label>
            <input type='text' ref={taskname} placeholder='Write your task....' className='form-control' />
        </div> 
        <div className='form-group mt-3'>
            <label className='bi bi-pencil'>Details</label>
            <input type='text' ref={details} placeholder='enter task details....' className='form-control' />
        </div> 
        
        <div className='form-group mt-3'>
            <label className='bi bi-watch'>Priority</label>
            <select ref={priority}  placeholder='Write your task....' className='form-control'>
                <option value="">-select priority-</option>
                <option value="High">High</option>
                <option value="Low">Low</option>

            </select>
        </div> 
        <div className='form-group mt-3'>
            <label className='bi bi-watch'>Status</label>
            <select ref={status}  placeholder='enter task status' className='form-control'>
                <option value="">-select status-</option>
                <option value="High">Pending</option>
                <option value="Low">Completed</option>

            </select>
        </div> 

        <div className='form-group mt-3'>
            <label className='bi bi-pencil'>Added Date</label>
            <input type='date' ref={added_date} placeholder='Write your task....' className='form-control' />
        </div> 

        <div className='form-group mt-3'>
           
            <button type='button' onClick={updFormHandeler}  className='btn btn-sm btn-success' >Update Task</button>
        </div> 
       </Form>
          
      </Container>
      
    </div>
  )
}
