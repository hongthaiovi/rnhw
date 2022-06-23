import {ApolloClient, InMemoryCache} from '@apollo/client';
import {BASE_URL} from '../utils/constants';

export const apolloClient = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});
