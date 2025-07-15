import { Stack } from 'expo-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export default function RootLayout() {
  const client = new ApolloClient({
    uri: process.env.EXPO_PUBLIC_API_URL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </ApolloProvider>
  );
}
