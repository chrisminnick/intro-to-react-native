import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';

import CodersList from './screens/CodersList';
import AddCoder from './screens/AddCoder';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const client = new ApolloClient({
  uri: 'http://192.168.1.107:4000',
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="All Coders">
          <Stack.Screen name="All Coders" component={CodersList} />
          <Stack.Screen name="Add a Coder" component={AddCoder} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </ApolloProvider>
  );
}
