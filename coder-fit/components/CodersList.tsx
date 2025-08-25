import { Text, View, StyleSheet, Pressable, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useQuery, gql } from '@apollo/client';

export const CODERS_QUERY = gql`
  query coders {
    coders {
      id
      name
      description
      activities {
        id
        name
        description
      }
    }
  }
`;
export default function CodersList() {
  const { loading, error, data } = useQuery(CODERS_QUERY);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <View style={styles.container}>
      <Link href="/addcoder" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Add a Coder</Text>
        </Pressable>
      </Link>
      <Link href="/addactivity" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Add an Activity to a Coder</Text>
        </Pressable>
      </Link>
      <FlatList
        data={data.coders}
        renderItem={({ item: coder }) => (
          <View key={coder.id} style={styles.coder}>
            <Text style={styles.coderName}>{coder.name}</Text>
            <Text style={styles.coderDesc}>{coder.description}</Text>

            {coder.activities && coder.activities.length > 0 && (
              <View style={styles.activitiesContainer}>
                <Text style={styles.activitiesTitle}>Activities:</Text>
                {coder.activities.map((activity: any) => (
                  <View key={activity.id} style={styles.activityItem}>
                    <Text style={styles.activityName}>• {activity.name}</Text>
                    <Text style={styles.activityDesc}>
                      {activity.description}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {(!coder.activities || coder.activities.length === 0) && (
              <Text style={styles.noActivities}>No activities yet</Text>
            )}
          </View>
        )}
      />
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
  activitiesContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  activitiesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  activityItem: {
    marginLeft: 8,
    marginBottom: 2,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '500',
  },
  activityDesc: {
    fontSize: 12,
    color: '#666',
    marginLeft: 12,
  },
  noActivities: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 4,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
  },
});
