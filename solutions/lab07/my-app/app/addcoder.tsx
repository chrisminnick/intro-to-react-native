import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'expo-router';
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
  const onSubmit = (data: any) => {
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
              placeholder="Coder Name"
              onBlur={onBlur}
              style={styles.textInput}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="coderName"
        />
        {errors.coderName && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Coder Description"
              onBlur={onBlur}
              style={styles.textInput}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="coderDesc"
        />
      </View>
      <Link href="/">
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Add Coder</Text>
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
