import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Link, router } from 'expo-router';
import StatusModal from './StatusModal';
import { useStatusModal } from '../context/statusModalContext';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

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
  const [isCoderPickerVisible, setIsCoderPickerVisible] = useState(false);
  const [isActivityPickerVisible, setIsActivityPickerVisible] = useState(false);

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
      <Text style={styles.label}>Coder</Text>
      <View>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setIsCoderPickerVisible(true)}
              >
                <Text style={styles.pickerButtonText}>
                  {value
                    ? coders.coders.find((coder: any) => coder.id === value)
                        ?.name
                    : 'Select a Coder'}
                </Text>
              </TouchableOpacity>

              <Modal
                visible={isCoderPickerVisible}
                transparent={true}
                animationType="slide"
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                      <TouchableOpacity
                        onPress={() => setIsCoderPickerVisible(false)}
                      >
                        <Text style={styles.modalButton}>Cancel</Text>
                      </TouchableOpacity>
                      <Text style={styles.modalTitle}>Select Coder</Text>
                      <TouchableOpacity
                        onPress={() => setIsCoderPickerVisible(false)}
                      >
                        <Text style={styles.modalButton}>Done</Text>
                      </TouchableOpacity>
                    </View>
                    <Picker
                      selectedValue={value}
                      onValueChange={(itemValue) => onChange(itemValue)}
                      style={styles.modalPicker}
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
                  </View>
                </View>
              </Modal>
            </>
          )}
          name="coderId"
        />
        {errors.coderId && (
          <Text style={styles.errorText}>This is required.</Text>
        )}
      </View>

      <Text style={styles.label}>Activity</Text>
      <View>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setIsActivityPickerVisible(true)}
              >
                <Text style={styles.pickerButtonText}>
                  {value
                    ? activities.activities.find(
                        (activity: any) => activity.id === value
                      )?.name
                    : 'Select an Activity'}
                </Text>
              </TouchableOpacity>

              <Modal
                visible={isActivityPickerVisible}
                transparent={true}
                animationType="slide"
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                      <TouchableOpacity
                        onPress={() => setIsActivityPickerVisible(false)}
                      >
                        <Text style={styles.modalButton}>Cancel</Text>
                      </TouchableOpacity>
                      <Text style={styles.modalTitle}>Select Activity</Text>
                      <TouchableOpacity
                        onPress={() => setIsActivityPickerVisible(false)}
                      >
                        <Text style={styles.modalButton}>Done</Text>
                      </TouchableOpacity>
                    </View>
                    <Picker
                      selectedValue={value}
                      onValueChange={(itemValue) => onChange(itemValue)}
                      style={styles.modalPicker}
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
                  </View>
                </View>
              </Modal>
            </>
          )}
          name="activityId"
        />
        {errors.activityId && (
          <Text style={styles.errorText}>This is required.</Text>
        )}
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
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
  picker: {
    height: 50,
    width: '80%',
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f9f9f9',
    width: '80%',
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  modalPicker: {
    width: '100%',
  },
});
