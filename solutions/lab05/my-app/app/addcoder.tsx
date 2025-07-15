import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';

export default function AddCoder() {
  return (
    <View style={styles.container}>
      <Text>Coder Name</Text>
      <View>
        <TextInput placeholder="Coder Name" />
        <TextInput placeholder="Coder Description" />
      </View>
      <Pressable>
        <Text>Add Coder</Text>
      </Pressable>
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
});
