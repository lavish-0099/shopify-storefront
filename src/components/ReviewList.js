import React from "react";

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="no-reviews">No reviews yet. Be the first to review!</p>;
  }

  return (
    <div className="review-list">
      <h2>Customer Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="review-item">
          <p className="review-rating">⭐ {review.rate}/5</p>
          <p className="review-text">“{review.text}”</p>
          <p className="review-author">— {review.author}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;