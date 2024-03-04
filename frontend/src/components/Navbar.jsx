import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import UseAppContext from '../AppContext';

const Navbar = () => {

    const { loggedIn, logout } = UseAppContext();

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('user'))
    );

    const displayUserOption = () => {
        if (loggedIn) {
            return (
                <>
                    <li className='nav-item'><button className='btn btn-danger' onClick={logout}>Logout</button></li>
                </>
            )
        }
        else {
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">
                            Login
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">
                            Signup
                        </NavLink>
                    </li>
                </>
            )
        }
    }

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
                        <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                            {displayUserOption()}
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar;