import React from 'react';

export default function ReviewCard({ review }) {
  const { rating = 5, text, authorFull, productTitle } = review;

  // Create star string like "★★★★★"
  const stars = '★★★★★'.slice(0, Math.max(0, Math.min(5, Math.round(rating))));

  return (
    <article className="review-card">
      <div className="stars" aria-label={`${rating} out of 5 stars`}>{stars}</div>

      <p className="review-content">“{text || 'Beautiful quality and super comfortable. Highly recommend!'}”</p>

      <div className="review-author">— <strong>{authorFull || 'Customer'}</strong></div>

      <div className="review-product">on {productTitle || 'Our Best-selling Set'}</div>
    </article>
  );
}
