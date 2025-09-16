// src/components/CoOrds_Section.js
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // ✅ 1. Import the useNavigate hook
import './CoOrdsSection.css';

// ... (GraphQL query remains the same)
const GET_COLLECTION_PRODUCTS = gql`
  query getCollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first) {
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


const CoOrdsSection = () => {
  const collectionHandle = "co-ords";
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const navigate = useNavigate(); // ✅ 2. Initialize the hook

  // ... (useQuery hook and data mapping remain the same)
  const { loading, error, data } = useQuery(GET_COLLECTION_PRODUCTS, {
    variables: { 
      handle: collectionHandle,
      first: 10 
    },
  });

  const products = data?.collection?.products?.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    image: node.images.edges[0]?.node.url,
    altText: node.images.edges[0]?.node.altText,
  })) || [];

  // ... (Carousel navigation logic remains the same)
  const goToNextProduct = () => {
    if (products.length === 0) return;
    setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const goToPrevProduct = () => {
    if (products.length === 0) return;
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') goToNextProduct();
      if (event.key === 'ArrowLeft') goToPrevProduct();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [products, goToNextProduct, goToPrevProduct]);

  if (error) {
    console.error("GraphQL Error:", error);
    return null;
  }
  
  const carouselTransform = products.length > 0 ? `translateX(-${currentProductIndex * (100 / products.length)}%)` : 'translateX(0)';

  return (
    <section className="co-ords-section">
      <div className="co-ords-text-grid">
        <div className="co-ords-headline-left">
          <span>FIND</span>
          <span>YOUR</span>
          <span>VIBE,</span>
        </div>
        <div className="co-ords-headline-right">
          <span>Own</span>
          <span>Your</span>
          <span>Moment.</span>
        </div>
      </div>

      {loading ? (
        <div className="co-ords-loading-placeholder">Loading...</div>
      ) : products.length === 0 ? (
        <div className="co-ords-loading-placeholder">No products found.</div>
      ) : (
        <div className="co-ords-carousel-container">
          <button 
            className="co-ords-nav-arrow co-ords-nav-left" 
            onClick={goToPrevProduct}
            aria-label="Previous product"
          >
            &lt;
          </button>

          <div className="co-ords-products-wrapper">
            <div 
              className="co-ords-products-carousel"
              style={{ 
                  transform: carouselTransform,
                  width: `${products.length * 100}%`
              }}
            >
              {products.map((product) => (
                <div key={product.id} className="co-ords-product-card">
                  <img src={product.image} alt={product.altText || product.title} className="co-ords-product-image" />
                </div>
              ))}
            </div>
          </div>

          <button 
            className="co-ords-nav-arrow co-ords-nav-right" 
            onClick={goToNextProduct}
            aria-label="Next product"
          >
            &gt;
          </button>
        </div>
      )}

      <div className="co-ords-description-area">
        <h3 className="co-ords-subtitle">Find Your Vibe With Chic Co-ord Sets</h3>
        <p className="co-ords-tagline">
          Designed for confidence, comfort, and modern elegance
        </p>
        {/* ✅ 3. Update the onClick handler to use navigate */}
        <button className="co-ords-shop-button" onClick={() => navigate(`/collections/${collectionHandle}`)}>
          SHOP NOW
        </button>
      </div>
    </section>
  );
};

export default CoOrdsSection;