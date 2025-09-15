import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee'; // The library that handles the animation
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

  if (loading || error || !data?.collection?.products?.edges?.length) {
    return null;
  }

  const products = data.collection.products.edges;

  return (
    // The container style is now the only thing we need from our CSS
    <div className="marquee-container">
      <Marquee
        pauseOnHover={true}
        speed={40} // You can adjust this value for speed
        gradient={false} // Removes the fading edge effect
      >
        {/* We no longer need to duplicate the product list! The library handles it. */}
        {products.map(({ node: product }) => (
          <Link to={`/products/${product.handle}`} key={product.id} className="marquee-item">
            <img
              src={product.images.edges[0]?.node.url}
              alt={product.images.edges[0]?.node.altText || product.title}
              className="marquee-image"
            />
            <span className="marquee-title">{product.title}</span>
          </Link>
        ))}
      </Marquee>
    </div>
  );
};

export default TopProductsMarquee;
