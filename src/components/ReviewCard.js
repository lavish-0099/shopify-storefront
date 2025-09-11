// src/components/ReviewCard.js
import React from "react";
import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-card-inner">
        {/* Front: Review content */}
        <div className="review-card-front">
          <p className="review-text">"{review.reviewText}"</p>
          <p className="review-author">- {review.author}</p>
          <p className="review-product">on {review.productTitle}</p>
          <p className="review-rating">⭐ {review.rating}/5</p>
        </div>

        {/* Back: Product image */}
        <div className="review-card-back">
          <img
            src={review.productImage}
            alt={review.productTitle}
            className="review-product-img"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
