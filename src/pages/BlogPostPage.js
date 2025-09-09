import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import './BlogPostPage.css';

const GET_SINGLE_ARTICLE = gql`
  query GetSingleArticle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        authorV2 {
          name
        }
        image {
          url(transform: {maxWidth: 1200})
          altText
        }
      }
    }
  }
`;

const BlogPostPage = () => {
  const { blogHandle, articleHandle } = useParams();
  const { loading, error, data } = useQuery(GET_SINGLE_ARTICLE, {
    variables: { blogHandle, articleHandle },
  });

  if (loading) return <p style={{ textAlign: 'center', padding: '50px' }}>Loading article...</p>;
  if (error) return <p style={{ textAlign: 'center', padding: '50px' }}>Error: {error.message}</p>;
  if (!data.blog || !data.blog.articleByHandle) return <p>Article not found.</p>;

  const article = data.blog.articleByHandle;

  return (
    <div className="blog-post-container">
      <div className="blog-post-header">
        <h1 className="blog-post-title">{article.title}</h1>
        <div className="blog-post-meta">
          <span>By {article.authorV2.name}</span> | 
          <span>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {article.image && (
        <div className="blog-post-image">
          <img src={article.image.url} alt={article.image.altText || article.title} />
        </div>
      )}

      {/* Shopify provides content as HTML, so we must render it this way */}
      <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />

      <div className="back-to-blog-link">
        <Link to={`/blogs/${blogHandle}`}>← Back to Blog</Link>
      </div>
    </div>
  );
};

export default BlogPostPage;