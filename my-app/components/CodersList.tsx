import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useQuery, gql } from '@apollo/client';

export const CODERS_QUERY = gql`
  query coders {
    coders {
      id
      name
      description
    }
  }
`;
export default function CodersList() {
  const { loading, error, data } = useQuery(CODERS_QUERY);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <View style={styles.container}>
      <Link href="/addcoder">
        <Pressable style={styles.button}>
          <Text>Add a Coder</Text>
        </Pressable>
      </Link>

      {data.coders.map(
        (coder: { id: string; name: string; description: string }) => (
          <View key={coder.id}>
            <Text>{coder.name}</Text>
            <Text>{coder.description}</Text>
          </View>
        )
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    color: 'white',
  },
  buttonText: {
    color: 'white',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  errorText: {
    color: 'red',
  },
});
