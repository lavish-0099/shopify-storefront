import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Icon for the author
import './BlogPage.css';

const GET_BLOG_ARTICLES = gql`
  query GetBlogArticles($blogHandle: String!) {
    blog(handle: $blogHandle) {
      title
      articles(first: 10, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            excerptHtml
            publishedAt
            authorV2 {
              name
            }
            image {
              url(transform: {maxWidth: 800, maxHeight: 500, crop: CENTER})
              altText
            }
          }
        }
      }
    }
  }
`;

const BlogPage = () => {
  const { handle } = useParams();
  const { loading, error, data } = useQuery(GET_BLOG_ARTICLES, {
    variables: { blogHandle: handle },
  });

  if (loading) return <p style={{ textAlign: 'center', padding: '50px' }}>Loading articles...</p>;
  if (error) return <p style={{ textAlign: 'center', padding: '50px' }}>Error loading blog: {error.message}</p>;
  if (!data.blog) return <p style={{ textAlign: 'center', padding: '50px' }}>Blog not found.</p>;

  const articles = data.blog.articles.edges;

  return (
    <div className="blog-page-container">
      <h1 className="blog-page-title">{data.blog.title}</h1>
      <div className="article-list">
        {articles.map(({ node: article }) => (
          <Link to={`/blogs/${handle}/${article.handle}`} key={article.id} className="article-card">
            {article.image && (
              <div className="article-card-image">
                <img src={article.image.url} alt={article.image.altText || article.title} />
              </div>
            )}
            <div className="article-card-content">
              <div className="article-author">
                <FaUserCircle className="article-author-icon" />
              </div>
              <h2 className="article-card-title">{article.title}</h2>
              <div className="article-card-excerpt" dangerouslySetInnerHTML={{ __html: article.excerptHtml }} />
              <p className="article-read-more">READ MORE »</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;