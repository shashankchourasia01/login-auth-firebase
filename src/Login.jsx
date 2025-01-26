import React, { useState } from 'react';
import './Style.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login Successfully');
      navigate('/student'); // Navigate to student page on successful login
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='signup-container'>
      <form className='signup-container' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">
          Email:
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type='submit'>Login</button> <br />
        <p>Dont have an account? <Link to="/signup">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
