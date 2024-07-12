import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import StatusModal from './StatusModal';
import { useStatusModal } from '../context/statusModalContext';

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
  const { statusModal, setStatusModal } = useStatusModal();
  const updateStatusModal = (status: string) => {
    setStatusModal({
      ...statusModal,
      status,
      isVisible: true,
    });
  };
  const onClose = () => {
    setStatusModal({
      ...statusModal,
      isVisible: false,
    });
  };
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
  const [addCoder] = useMutation(ADD_CODER, {
    // define a callback function that will be called when the mutation is completed
    onCompleted: (data) => {
      // log the data returned by the mutation to the console
      console.log(data);
      // update the status modal with the message returned by the mutation
      updateStatusModal(data.addCoder.message);
    },
    onError: (error) => {
      console.error(error);
      updateStatusModal(error.message);
    },
  });

  const onSubmit = (data: any) => {
    // call the addCoder function and pass the form data as the variables argument
    addCoder({ variables: data });
  };

  return (
    <View style={styles.container}>
      <StatusModal
        isVisible={statusModal.isVisible}
        onClose={onClose}
        status={statusModal.status}
      />
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
