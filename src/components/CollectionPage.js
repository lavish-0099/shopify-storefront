import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import './ProductGrid.css';
import './CollectionPage.css';

const GET_COLLECTION_PRODUCTS = gql`
  query getCollectionProducts($handle: String!) {
    collection(handle: $handle) {
      title
      products(first: 20) {
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
            # This now uses the correct namespace and key
            rating: metafield(namespace: "reviews", key: "rating") {
              value
            }
          }
        }
      }
    }
  }
`;

const CollectionPage = () => {
  const { handle } = useParams();

  const { loading, error, data } = useQuery(GET_COLLECTION_PRODUCTS, {
    variables: { handle },
  });

  if (loading) return <p style={{textAlign: 'center', padding: '50px'}}>Loading collection...</p>;
  if (error) return <p style={{textAlign: 'center', padding: '50px'}}>Error: {error.message}</p>;
  if (!data.collection) return <p style={{textAlign: 'center', padding: '50px'}}>Collection not found.</p>;

  const { title, products } = data.collection;

  return (
    <div className="collection-page">
      <h1 className="collection-title">{title}</h1>
      <div className="product-grid">
        {products.edges.map(({ node: product }) => {
            // Updated logic to parse the 'Rating' type metafield
            let ratingValue = 0;
            if (product.rating && product.rating.value) {
                const ratingObject = JSON.parse(product.rating.value);
                ratingValue = Math.round(parseFloat(ratingObject.value));
            }

            return (
                <Link to={`/products/${product.handle}`} key={product.id} className="product-card">
                    <div className="product-image-container">
                        <img src={product.images.edges[0].node.url} alt={product.images.edges[0].node.altText || product.title} />
                        <div className="quick-view">QUICK VIEW</div>
                    </div>
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">
                        {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                    </p>
                    {ratingValue > 0 && (
                        <div className="star-rating">
                        {'★'.repeat(ratingValue)}
                        {'☆'.repeat(5 - ratingValue)}
                        </div>
                    )}
                </Link>
            );
        })}
      </div>
    </div>
  );
};

export default CollectionPage;