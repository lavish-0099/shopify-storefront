import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import './TopProductsMarquee.css';

const GET_TOP_PRODUCTS = gql`
  query getTopProducts($handle: String!) {
    collection(handle: $handle) {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
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
  }
`;

const TopProductsMarquee = () => {
  const { loading, error, data } = useQuery(GET_TOP_PRODUCTS, {
    variables: { handle: "top-products" },
  });

  // Return null or a placeholder if data is not ready
  if (loading || error || !data?.collection?.products?.edges?.length) {
    return null;
  }

  const products = data.collection.products.edges;
  const marqueeProducts = [...products, ...products]; // Duplicate for seamless loop

  // --- DYNAMIC ANIMATION LOGIC ---
  const numProducts = products.length;
  const itemWidth = 250; // Must match the width in your CSS
  const animationDuration = numProducts * 4; // Adjust '4' to make it faster/slower

  const trackStyle = {
    '--item-width': `${itemWidth}px`,
    '--num-products': numProducts,
    '--animation-duration': `${animationDuration}s`,
  };
  // --- END DYNAMIC LOGIC ---

  return (
    <div className="marquee-container">
      {/* Apply the dynamic styles to the track */}
      <div className="marquee-track" style={trackStyle}>
        {marqueeProducts.map(({ node: product }, index) => (
          <Link to={`/products/${product.handle}`} key={`${product.id}-${index}`} className="marquee-item">
            <img
              src={product.images.edges[0]?.node.url}
              alt={product.images.edges[0]?.node.altText || product.title}
              className="marquee-image"
            />
            <span className="marquee-title">{product.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopProductsMarquee;