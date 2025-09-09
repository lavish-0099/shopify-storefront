// src/components/RelatedProducts.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import './ProductGrid.css'; // We'll reuse our existing product grid styles
import './RelatedProducts.css'; // New styles for the related products section


const GET_PRODUCT_RECOMMENDATIONS = gql`
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 1) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }
`;

const RelatedProducts = ({ productId }) => {
  const { loading, error, data } = useQuery(GET_PRODUCT_RECOMMENDATIONS, {
    variables: { productId },
  });

  if (loading || error || !data || data.productRecommendations.length === 0) {
    return null; // Don't render anything if loading, error, or no recommendations
  }
  
  const relatedProducts = data.productRecommendations.slice(0, 4); // Show a max of 4

  return (
    <div className="related-products-section">
      <h2 className="section-title">You Might Also Like</h2>
      <div className="product-grid">
        {relatedProducts.map((product) => (
          <Link to={`/products/${product.handle}`} key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.images.edges[0].node.url} alt={product.images.edges[0].node.altText || product.title} />
            </div>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">
              {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;