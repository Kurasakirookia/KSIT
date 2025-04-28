// ForgotPassword.js
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase'; // adjust the path if needed
import { useNavigate } from 'react-router-dom';
import "../css/ForgotPassword.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Check your inbox.');
      navigate('/Login'); // Redirect back to login after sending
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>
        <form onSubmit={handleReset} className="forgot-password-form">
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
