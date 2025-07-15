import { Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CodersList from '../components/CodersList';

export default function Index() {
  const client = new ApolloClient({
    uri: process.env.EXPO_PUBLIC_API_URL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return (
    <ApolloProvider client={client}>
      <CodersList />
    </ApolloProvider>
  );
}
