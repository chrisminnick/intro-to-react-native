import { View, Text, Pressable, StyleSheet } from 'react-native';
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {data.coders.map((coder) => (
        <View key={coder.id}>
          <Text>{coder.name}</Text>
          <Text>{coder.description}</Text>
        </View>
      ))}
      <Link href="/addcoder">
        <Pressable style={styles.button}>
          <Text>Add a Coder</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    color: 'white',
  },
});
