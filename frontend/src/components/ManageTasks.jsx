import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const ManageTasks = () => {
  const [taskData, setTaskData] = useState([]);
  const fetchTaskData = async () => {
    const res = await fetch('https://taskmanagementbackend-6llq.onrender.com/task/getall');
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setTaskData(data);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  const deleteTask = async (id) => {
      const res = await fetch ('https://taskmanagementbackend-6llq.onrender.com/task/delete/'+id, {method: 'DELETE'});
      if (res.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Task deleted Successfully',
        });
        console.log('task deleted');
        fetchTaskData();
      }
    }


  return (
    <div className='container py-5'>
      <h1 className='text-center'>Manage Task</h1>

      <MDBTable className='mt-5'>
      <MDBTableHead dark>
        <tr>
          <th>Title</th>
          <th>Description</th>
          {/* <th>Due Date</th> */}
          <th colSpan={2} className='text-center'>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {
            taskData.map((task) => {
              return <tr>
                <td>{task.title}</td>
                <td>{task.description}</td>
                {/* <td>{task.date}</td> */}
                <td>
                  <button className='btn btn-danger' onClick={() => { deleteTask(task._id) }}>Delete</button>
                </td>
                <td>
                  <Link to={'/updatetask/'+task._id} className='btn btn-primary'>
                    Update Task
                  </Link>
                </td>
              </tr>
            })
          }
      </MDBTableBody>
      </MDBTable>
        {/* <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th colSpan={2} className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            taskData.map((task) => {
              return <tr>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.date}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => { deleteTask(task._id) }}>Delete</button>
                </td>
                <td>
                  <Link to={'/updatetask/'+task._id} className='btn btn-primary'>
                    Update Task
                  </Link>
                </td>
              </tr>
            })
          }
        </tbody>
      </table> */}
    </div>
  )
}

export default ManageTasks;