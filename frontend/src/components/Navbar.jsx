import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className=''>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <font className='fs-4 fw-bold me-5'>Task Management App</font>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    <font className='fs-5'>Home</font>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/managetasks">
                               <font className='fs-5'>ManageTasks</font> 
                            </NavLink>
                        </li>
                        </ul>
                        <a href="/signup" className="btn btn-outline-primary me-2">
                            <font className='fs-5 fw-bold'>Sign Up</font>
                        </a>
                        <a href="/login" className="btn btn-outline-primary">
                            <font className='fs-5 fw-bold'>Login</font>
                        </a>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar;