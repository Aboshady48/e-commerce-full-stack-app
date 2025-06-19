import React from 'react'
import { Routes, Route ,Link } from 'react-router-dom';
import { Register } from '../Auth/Register';
import { Login } from '../Auth/Login';
export const Navbar = () => {
  return (
    <div>

    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>

    <Routes>
        <Route path="/" element={<h1>Welcome to the App</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>

    
  );
}
