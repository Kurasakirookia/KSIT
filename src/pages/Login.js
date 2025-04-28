import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import "../css/Login_Sign.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
      navigate('/');
      // navigate to home page after login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className='form_content'>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        /> <br />
        <button type="submit">Login</button>
        <br />
        <p className="forgot-password-link">
            <Link to="/ForgotPassword">Forgot Password?</Link>
        </p>
        <br />
        <p>
            Don't have an account?{" "}
            <span 
                style={{ color: 'blue', cursor: 'pointer' }} 
                onClick={() => navigate('/Signup')}
            >
                Sign up
            </span>
        </p>

      </form>
    </div>
  );
};

export default Login;
