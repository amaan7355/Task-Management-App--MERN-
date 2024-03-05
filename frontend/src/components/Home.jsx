import { useFormik } from 'formik';
import React from 'react';
import Swal from "sweetalert2";

const Home = () => {
    const Task = useFormik({
        initialValues: {
            title: '',
            description: '',
            duedate: '',
        },
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            setTimeout(() => {
                console.log(values);
                setSubmitting(false);
            }, 3000);

            // send the data to the server
            const res = await fetch('https://taskmanagementbackend-6llq.onrender.com/task/add', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(res.status);
            if (res.status === 200) {
                Swal.fire({
                  icon: 'success',
                  title: 'Task Added Successfully',
                });
            }

        }
    });
  return (
    <div className='home-body'>
        <div className=''>
            <h1 className='text-center py-4 fw-bold'>
                Create your Task Here!
            </h1>
            <div className='card shadow w-50 d-flex m-auto'>
                <div className='card-body'>
                    <form onSubmit={Task.handleSubmit}>
                        <label className='fs-3 fw-bold'>Title</label>
                        <input type="text" className='form-control my-2' name='title' onChange={Task.handleChange} value={Task.values.title}/>
                        <label className='fs-3 fw-bold mt-3'>Description</label>
                        <textarea className='form-control my-2' name='description' onChange={Task.handleChange} value={Task.values.description}/>
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
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home;