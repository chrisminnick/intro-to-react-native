import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import { Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';

export default function AddCoder() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      coderName: '',
      coderDesc: '',
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text>Coder Name</Text>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Coder Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="coderName"
        />
        {errors.coderName && (
          <Text style={styles.errorText}>This is required.</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Coder Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="coderDesc"
        />
      </View>
      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Add Coder</Text>
      </Pressable>
      <Link href="/">
        <Pressable style={styles.button}>
          <Text>Return to Coder List</Text>
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
