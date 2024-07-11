import { Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CodersList from '../components/CodersList';
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default function Index() {
  return (
    <ApolloProvider client={client}>
      <CodersList />
    </ApolloProvider>
  );
}
