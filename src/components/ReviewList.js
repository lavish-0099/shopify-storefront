// src/components/ReviewList.js
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom"; // to get product handle from URL

const GET_PRODUCT_REVIEWS = gql`
  query getProductReviews($handle: String!) {
    product(handle: $handle) {
      id
      title
      metafields(
        identifiers: [{ namespace: "air_reviews_product", key: "data" }]
      ) {
        key
        namespace
        value
      }
    }
  }
`;

const ReviewList = () => {
  const { handle } = useParams(); // e.g. /products/:handle
  const { loading, error, data } = useQuery(GET_PRODUCT_REVIEWS, {
    variables: { handle },
  });

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  const product = data?.product;
  if (!product) return <p>No product found.</p>;

  const reviewMetafield = product.metafields?.[0];
  let reviews = [];

  if (reviewMetafield && reviewMetafield.value) {
    try {
      const reviewPayload = JSON.parse(reviewMetafield.value);
      reviews = (reviewPayload.reviews || []).filter(
        (review) => review.status === "approved"
      );
    } catch (e) {
      console.error("Error parsing review JSON:", e);
    }
  }

  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet. Be the first to review!</p>;
  }

  return (
    <div className="review-list">
      <h2>Customer Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="review-item">
          <p className="review-rating">⭐ {review.rate}/5</p>
          <p className="review-text">“{review.text}”</p>
          <p className="review-author">— {review.author || "Valued Customer"}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
