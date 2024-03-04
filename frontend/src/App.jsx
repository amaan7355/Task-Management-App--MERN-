import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ManageTasks from './components/ManageTasks';
import UserAuth from './UserAuth';
import UpdateTask from './components/UpdateTask';
import { AppProvider } from './AppContext';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/updatetask/:id" element={<UpdateTask />} />
            <Route path="/managetasks" element={<UserAuth><ManageTasks /></UserAuth>} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;