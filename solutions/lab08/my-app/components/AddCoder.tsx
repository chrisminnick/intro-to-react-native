import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'expo-router';

const ADD_CODER = gql`
  mutation AddCoderMutation($coderName: String!, $coderDesc: String!) {
    addCoder(name: $coderName, description: $coderDesc) {
      code
      success
      message
      coder {
        name
        description
      }
    }
  }
`;

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
    addCoder({ variables: data });
  };

  const [addCoder] = useMutation(ADD_CODER, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

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
      <Link href="/" asChild>
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Add Coder</Text>
        </Pressable>
      </Link>
      <Link href="/" asChild>
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
