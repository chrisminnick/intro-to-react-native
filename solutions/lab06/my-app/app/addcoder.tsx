import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Link } from 'expo-router';
export default function AddCoder() {
  return (
    <View style={styles.container}>
      <Text>Coder Name</Text>
      <View>
        <TextInput style={styles.textInput} placeholder="Coder Name" />
        <TextInput style={styles.textInput} placeholder="Coder Description" />
      </View>
      <Link href="/">
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Return to Coder List</Text>
        </Pressable>
      </Link>
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
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
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
