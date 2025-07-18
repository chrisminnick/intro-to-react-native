import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Link, router } from 'expo-router';
import StatusModal from './StatusModal';
import { useStatusModal } from '../context/statusModalContext';
import { Picker } from '@react-native-picker/picker';

/*
The Activities query returns a list of all the possible activities that the coders can do, each with a unique id. 

query activities {
  activities {
    id
    name
    description
  }
}

The Coders query returns a list of all the coders in your app, each with a name and an array of activity ids that indicate which activities they have done so far.
*/
const ACTIVITIES_QUERY = gql`
  query activities {
    activities {
      id
      name
      description
    }
  }
`;
const CODERS_QUERY = gql`
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

// The ADD_ACTIVITY mutation adds an activity to a coder, given the coder's id and the activity id.
const ADD_ACTIVITY = gql`
  mutation AddActivityMutation($coderId: ID!, $activityId: ID!) {
    addActivity(coderId: $coderId, activityId: $activityId) {
      code
      success
      message
      activity {
        id
        name
        description
      }
    }
  }
`;

export default function AddActivity() {
  // Fetch coders from the CODERS_QUERY
  const {
    data: coders,
    loading: codersLoading,
    error: codersError,
  } = useQuery(CODERS_QUERY);

  // Fetch activities from the ACTIVITIES_QUERY
  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useQuery(ACTIVITIES_QUERY);

  //the user can select a coder and an activity from the dropdowns and submit the form to add the activity to the coder.
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
      coderId: '',
      activityId: '',
    },
  });
  const [addActivity] = useMutation(ADD_ACTIVITY, {
    onCompleted: (data) => {
      console.log(data);
      updateStatusModal(data.addActivity.message);
      // Navigate to home screen after a short delay to show the success message
      setTimeout(() => {
        router.push('/');
      }, 2000);
    },
    onError: (error) => {
      console.error(error);
      updateStatusModal(error.message);
    },
  });
  const onSubmit = (data: any) => {
    addActivity({ variables: data });
  };

  // Handle loading and error states after all hooks are called
  if (codersLoading || activitiesLoading) return <Text>Loading...</Text>;
  if (codersError) return <Text>{codersError.message}</Text>;
  if (activitiesError) return <Text>{activitiesError.message}</Text>;

  return (
    <View style={styles.container}>
      <StatusModal
        isVisible={statusModal.isVisible}
        status={statusModal.status}
        onClose={onClose}
      />
      <Text>Coder</Text>
      <View>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a Coder" value="" />
              {coders.coders.map((coder: any) => (
                <Picker.Item
                  key={coder.id}
                  label={coder.name}
                  value={coder.id}
                />
              ))}
            </Picker>
          )}
          name="coderId"
        />
        {errors.coderId && <Text>This is required.</Text>}
      </View>

      <Text>Activity</Text>
      <View>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select an Activity" value="" />
              {activities.activities.map((activity: any) => (
                <Picker.Item
                  key={activity.id}
                  label={activity.name}
                  value={activity.id}
                />
              ))}
            </Picker>
          )}
          name="activityId"
        />
        {errors.activityId && <Text>This is required.</Text>}
      </View>

      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Add Activity</Text>
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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '80%',
  },
});
