import React, { useState } from 'react'
import './Style.css'
import { Link } from 'react-router-dom'
import {auth} from './Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Signup = () => {

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth,email,password)
            console.log("Account create");
            
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div className='signup-container'>
        <form className='signup-container' onSubmit={handleSubmit}> 
            <h1>
                Sign Up
            </h1>
            <label htmlFor="email">
                Email:
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label htmlFor="password">
                Password:
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type='submit'>Sign Up</button> <br />
            <p>Already Registerd? <Link to="/login">Login</Link></p>
        </form>
      
    </div>
  )
}

export default Signup
