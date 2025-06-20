import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LogoutButton } from './LogoutButton';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post("http://localhost:3000/auth/login",
                { email, password }, {
                    withCredentials: true,
                });
            if (response.status === 200) {
                console.log('Login successful:', response.data);
                setIsLoggedIn(true); 
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.response ? error.response.data.message : 'An error occurred');
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>

            {error && <p>{error}</p>}
            <p>Don't have an account? <Link to="/register">Register</Link></p>

            {isLoggedIn && <LogoutButton onLogout={() => setIsLoggedIn(false)} />}
        </div>
    );
};
