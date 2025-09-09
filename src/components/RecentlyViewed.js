import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import './ProductGrid.css';

const GET_PRODUCTS_BY_HANDLE = gql`
  query getProductsByHandle($query: String!) {
    products(first: 5, query: $query) {
      edges {
        node {
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
    }
  }
`;

const RecentlyViewed = ({ currentProductHandle }) => {
  const [viewedHandles, setViewedHandles] = useState([]);

  useEffect(() => {
    const storedHandles = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const filteredHandles = storedHandles.filter(h => h !== currentProductHandle);
    setViewedHandles(filteredHandles);
  }, [currentProductHandle]);

  const searchQuery = viewedHandles.map(handle => `handle:${handle}`).join(' OR ');

  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_HANDLE, {
    variables: { query: searchQuery },
    skip: viewedHandles.length === 0,
  });

  console.log('[RecentlyViewed] Component rendering. This is the latest version of the code.');
  console.log('[RecentlyViewed] Data from API:', data);

  if (loading || error || viewedHandles.length === 0 || !data || !data.products || !Array.isArray(data.products.edges)) {
    return null;
  }

  const validProducts = data.products.edges.filter(edge => {
    const isValid = edge && edge.node;
    if (!isValid) {
      console.warn('[RecentlyViewed] Filtering out an invalid item from product edges:', edge);
    }
    return isValid;
  });

  if (validProducts.length === 0) {
    return null; // Don't render if no valid products
  }

  return (
    <div className="related-products-section">
      <h2 className="section-title">Recently Viewed</h2>
      <div className="product-grid recently-viewed-grid">
        {validProducts.slice(0, 4).map(({ node: product }) => (
          <Link to={`/products/${product.handle}`} key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.images?.edges?.[0]?.node?.url || ''}
                alt={product.images?.edges?.[0]?.node?.altText || product.title}
              />
            </div>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">
              {product.priceRange?.minVariantPrice?.amount}{' '}
              {product.priceRange?.minVariantPrice?.currencyCode}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
