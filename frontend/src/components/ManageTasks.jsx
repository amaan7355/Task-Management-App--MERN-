import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

const ManageTasks = () => {
  const [taskData, setTaskData] = useState([]);
  const fetchTaskData = async () => {
    const res = await fetch('https://taskmanagement-4rzy.onrender.com/task/getall');
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
      const res = await fetch ('https://taskmanagement-4rzy.onrender.com/delete/'+id, {method: 'DELETE'});
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

      <table className='table table-secondary mt-5'>
        <thead>
          <tr>
            <th>ID</th>
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
                <td>{task._id}</td>
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
      </table>
    </div>
  )
}

export default ManageTasks;