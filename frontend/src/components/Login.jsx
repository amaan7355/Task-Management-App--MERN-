import { useFormik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import { motion } from 'framer-motion';
import UseAppContext from "../AppContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const { setLoggedIn } = UseAppContext();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      console.log(values);

      const res = await fetch('https://taskmanagementbackend-6llq.onrender.com/user/authenticate', {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          'Content-type': 'application/json'
        }
      });

      console.log(res.status);

      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successfull',
        })
          .then((result) => {
            navigate('/managetasks');

          }).catch((err) => {

          });

        const data = await res.json();
        console.log(data);
        sessionStorage.setItem('user', JSON.stringify(data));
        setLoggedIn(true);
      }
      else if (res.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Email or Password is incorrect'
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong'
        })
      }
    },
  });

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.5, stiffness: 100, type: 'spring', damping: 4 }}

      className="login-body">
      <div className="pt-5">
        <div className="card shadow w-50 d-flex m-auto">
          <div className="card-body">
            <form onSubmit={loginForm.handleSubmit}>
              <img className="logo" src="logo.png" alt="" />
              <h2 className="text-center my-3">Login Here</h2>

              <label>Email</label>
              <input
                id="email"
                onChange={loginForm.handleChange}
                value={loginForm.values.email}
                type="email"
                className="form-control mb-4"
              />
              <label>Password</label>
              <input
                id="password"
                onChange={loginForm.handleChange}
                value={loginForm.values.password}
                type="password"
                className="form-control mb-4"
              />

              <button type="submit" className="btn btn-primary w-100 mt-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;