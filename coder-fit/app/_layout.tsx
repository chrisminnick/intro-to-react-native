import { Stack } from 'expo-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { StatusModalProvider } from '../context/statusModalContext';

export default function RootLayout() {
  const client = new ApolloClient({
    uri: 'http://127.0.0.1:4000',
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return (
    <ApolloProvider client={client}>
      <StatusModalProvider>
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
      </StatusModalProvider>
    </ApolloProvider>
  );
}
