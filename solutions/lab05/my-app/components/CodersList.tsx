import { Text, View, StyleSheet } from 'react-native';
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
    padding: 20,
    backgroundColor: '#fff',
  },
});
