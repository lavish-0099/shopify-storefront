import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- NEW: Password confirmation check ---
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // The phone number must include the country code for Shopify's API
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      await signup(firstName, lastName, email, formattedPhone, password);
      navigate('/'); // Redirect to homepage on successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Create Account</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="name-fields">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>
          
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91XXXXXXXXXX" required />
          
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {/* --- NEW: Confirm Password Field --- */}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="auth-button">Create</button>
        </form>
        <p className="auth-switch-text">
          Already have an account? <Link to="/account/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
