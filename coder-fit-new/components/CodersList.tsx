import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
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
    <>
      <FlatList
        data={data.coders}
        renderItem={({ item }) => (
          <View style={styles.coder} key={item.id}>
            <Text style={styles.coderName}>{item.name}</Text>
            <Text style={styles.coderDesc}>{item.description}</Text>
          </View>
        )}
      />

      <Link href="/addcoder">
        <Pressable style={styles.button}>
          <Text>Add a Coder</Text>
        </Pressable>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    color: 'white',
  },
  coder: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'lightblue',
    width: '100%',
  },
  coderName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  coderDesc: {
    fontSize: 16,
  },
});
