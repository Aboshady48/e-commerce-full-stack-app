import React from 'react'
import { Routes, Route ,Link } from 'react-router-dom';
import { Register } from '../Auth/Register';
import { Login } from '../Auth/Login';
import { LogoutButton } from '../Auth/LogoutButton';
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
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>

    
  );
}
