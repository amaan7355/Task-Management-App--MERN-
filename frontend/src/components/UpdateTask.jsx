import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';

const UpdateTask = () => {

    const { id } = useParams();

    const [taskData, setTaskData] = useState(null);

    const fetchTaskData = async () => {
        const res = await fetch(`http://localhost:5000/task/getbyid/${id}`);
        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            setTaskData(data);
        }
    };

    useEffect(() => {
        fetchTaskData();
    }, []);

    const submitForm = async (values, { setSubmitting }) => {
        console.log(values);


        const res = await fetch(`http://localhost:5000/task/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(res.status);

        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Task Updated Successfully',
              });
        }
        setSubmitting(false);
    }

    return (
        <div className='home-body'>
            <div className='py-5'>
                <h1 className='text-center'>Update Task Form</h1>

                <div className="card w-50 d-flex m-auto pt-4 mt-3">
                    <div className="card-body">
                        {
                            taskData !== null ? (
                                <Formik initialValues={taskData} onSubmit={submitForm}>
                                    {(Task) => (
                                        <form onSubmit={Task.handleSubmit}>
                                            <label className='fs-3 fw-bold'>Title</label>
                                            <input type="text" className='form-control my-2' name='title' onChange={Task.handleChange} value={Task.values.title} />
                                            <label className='fs-3 fw-bold mt-3'>Description</label>
                                            <textarea className='form-control my-2' name='description' onChange={Task.handleChange} value={Task.values.description} />
                                            <label className='fs-3 fw-bold mt-3'>Due Date</label><br />
                                            <input type="date" name='date' className='form-control my-2' onChange={Task.handleChange} value={Task.values.date} />
                                            <button disabled={Task.isSubmitting} className='btn btn-primary mt-5 w-100' type='submit'>
                                                {
                                                    Task.isSubmitting ? (
                                                        <>
                                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: '10px' }}></span>Loading...
                                                        </>
                                                    ) : 'Submit'
                                                }</button>
                                        </form>
                                    )}
                                </Formik>
                            ) : <h1>Loading...</h1>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateTask;