import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// 1. Create the standard link to your Shopify GraphQL endpoint.
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SHOPIFY_API_ENDPOINT || 'http://localhost:3000/'
});

// 2. Create a middleware that adds the authentication header to every request.
// This is the most important part for solving "Failed to fetch" errors.
const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN;
  return {
    headers: {
      ...headers,
      // The header name must be exactly this to authenticate with Shopify
      'X-Shopify-Storefront-Access-Token': token,
    }
  };
});

// 3. Create the final Apollo Client instance by chaining the auth link and http link.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

