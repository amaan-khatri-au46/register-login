import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

const Login = () => {
  
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {email, password});
      localStorage.setItem('authToken', response.data.token);
      if (response.status === 200) {
        navigate('/projects')
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name='email'
          value={email}
          className="loginInput"
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter your username..."
          required
        />
        <label>Password</label>
        <input
          type="text"
          name='password'
          value={password}
          className="loginInput"
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Enter your password..."
          required
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      {error &&  <p>{error}</p>}
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
