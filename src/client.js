import { ApolloClient, InMemoryCache } from '@apollo/client';
const BASE_URL = 'http://10.0.2.2:8000/graphql/';

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

export default client;