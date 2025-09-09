import React, { useState } from 'react';
import './AffiliateRegisterForm.css';

const AffiliateRegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    socialUrl: ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      // ✅ Save affiliate application in your own DB
      await fetch('/api/create-affiliate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // ✅ Redirect to GoAffPro signup page
      window.location.href = "https://delan1.goaffpro.com/create-account";

    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="affiliate-form-wrapper">
      <h2>Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a Password"
          required
        />
        <input
          type="url"
          name="socialUrl"
          value={formData.socialUrl}
          onChange={handleChange}
          placeholder="Blog or Social Media URL (e.g., https://instagram.com/yourprofile)"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Apply Now'}
        </button>
      </form>

      {message && (
        <p className={`form-message ${isError ? 'error' : 'success'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AffiliateRegisterForm;
