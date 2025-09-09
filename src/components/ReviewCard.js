// src/components/ReviewCard.js
import React from 'react';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-card-inner">
        <div className="review-card-front">
          <div className="star-rating">{ '★'.repeat(review.rating) }{ '☆'.repeat(5 - review.rating) }</div>
          <p className="review-text">"{review.reviewText}"</p>
          <div className="review-author">- {review.author}</div>
          <div className="review-product-title">on {review.productTitle}</div>
        </div>
        <div className="review-card-back">
          <img src={review.productImage} alt={review.productTitle} className="review-product-image" />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;