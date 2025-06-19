import { useState , useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.
            post("http://localhost:3000/auth/register",

                {email,password,name,age,gender},{
                withCredentials: true,
                
            })
            console.log(response);
            if (response.status === 200) {
                console.log('Registration successful:', response.data);
            }
            
        } catch (error) {
            console.error('Registration failed:', error);
            setError(error.response.data.message);
            
        }
    }
    

  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            <div>
            <label>Gender:</label>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
        <p>Or go to <Link to="/">Home</Link></p>

    </div>
  )
}
