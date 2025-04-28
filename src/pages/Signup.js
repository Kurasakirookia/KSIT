import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth }  from "../firebase"
import "../css/Login_Sign.css"
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
      navigate('/login');
      // navigate to home or login page after signup
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password (6+ characters)" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <br />
        <button type="submit">Sign Up</button>
        <br />
        <p>
                Already have an account?{" "}
                <span 
                    style={{ color: 'blue', cursor: 'pointer' }} 
                    onClick={() => navigate('/Login')}
                >
                    Login
                </span>
        </p>

      </form>
    </div>
  );
};

export default Signup;
