import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function AddCoder({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Coder Name</Text>
      <View>
        <TextInput placeholder="Coder Name" />
        <TextInput placeholder="Coder Description" />
      </View>
      <View>
        <Button title="Add Coder" />
      </View>
      <View>
        <Button
          title="Back to Coders"
          onPress={() => navigation.navigate('All Coders')}
        />
      </View>
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
