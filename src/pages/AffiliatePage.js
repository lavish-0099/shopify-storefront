import React, { useState } from 'react';
import AffiliateRegisterForm from '../components/AffiliateRegisterForm'; // We will create this next
import './AffiliatePage.css'; // We will create this next

const AffiliatePage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="affiliate-page-container">
      <div className="affiliate-hero">
        <h1>Join Our Affiliate Program</h1>
        <p>Partner with us and earn commissions by promoting our products to your audience.</p>
      </div>
      
      <div className="affiliate-info">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Sign Up</h3>
            <p>Fill out the application form to join. It's free and easy.</p>
          </div>
          <div className="step">
            <h3>2. Promote</h3>
            <p>Share your unique referral link on your blog, social media, or website.</p>
          </div>
          <div className="step">
            <h3>3. Earn</h3>
            <p>Get a commission for every sale made through your links.</p>
          </div>
        </div>
      </div>

      <div className="affiliate-cta">
        {!showForm ? (
          <button onClick={() => setShowForm(true)} className="journey-button">
            Start Your Journey
          </button>
        ) : (
          <AffiliateRegisterForm />
        )}
      </div>
    </div>
  );
};

export default AffiliatePage;