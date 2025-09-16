// src/components/CoOrds_Section.js
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './CoOrdsSection.css';

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
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_COLLECTION_PRODUCTS, {
    variables: { handle: collectionHandle, first: 10 },
  });

  const products = data?.collection?.products?.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    image: node.images.edges[0]?.node.url,
    altText: node.images.edges[0]?.node.altText,
  })) || [];

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
  }, [products]);

  if (error) {
    console.error("GraphQL Error:", error);
    return null;
  }

  const carouselTransform = products.length > 0 
    ? `translateX(-${currentProductIndex * (100 / products.length)}%)`
    : 'translateX(0)';

  return (
    <section className="co-ords-section">
      <div className="co-ords-top-layout">
        
        {/* Left Text */}
        <div className="co-ords-text-block left-text">
          <span className="text-line line-1">FIND</span>
          <span className="text-line line-2">YOUR</span>
          <span className="text-line line-3">VIBE,</span>
        </div>

        {/* Center Carousel */}
        <div className="co-ords-carousel-center">
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
                      <img
                        src={product.image}
                        alt={product.altText || product.title}
                        className="co-ords-product-image"
                      />
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
        </div>

        {/* Right Text */}
        <div className="co-ords-text-block right-text">
          <span className="text-line line-1">OWN</span>
          <span className="text-line line-2">YOUR</span>
          <span className="text-line line-3">MOMENT.</span>
        </div>
      </div>

      {/* Description Section */}
      <div className="co-ords-description-area">
        <h3 className="co-ords-subtitle">Find Your Vibe With Chic Co-ord Sets</h3>
        <p className="co-ords-tagline">
          Designed for confidence, comfort, and modern elegance
        </p>
        <button
          className="co-ords-shop-button"
          onClick={() => navigate(`/collections/${collectionHandle}`)}
        >
          SHOP NOW
        </button>
      </div>
    </section>
  );
};

export default CoOrdsSection;
