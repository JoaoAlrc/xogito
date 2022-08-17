import React, {useState, useEffect} from 'react';
import {useController, useForm} from 'react-hook-form';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Input from './forms/Input';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useCreateTag, useRemoveTag} from '../services/tags';
import {useQueryClient} from 'react-query';
import DeleteModal from './DeleteModal';

const required = {
  required: {value: true, message: 'This value is required.'},
};

const max100 = {
  maxLength: {
    value: 100,
    message: 'Max length is 100.',
  },
};

function TagSelectModal({placeholder, name, control, rules, data}) {
  const [modalVisible, setModalVisible] = useState(null);
  const [modal, setModal] = useState(false);
  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({control, name, rules});
  const tagForm = useForm<{tag: string}>({
    defaultValues: {
      tag: '',
    },
  });
  const queryClient = useQueryClient();
  const removeTag = useRemoveTag();
  const createTag = useCreateTag();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (!data) {
      createTag.mutate(
        {tag: '', options: ['Work', 'Home', 'Recipes']},
        {
          onSuccess: response => {
            queryClient.cancelQueries('tags-list');
            queryClient.setQueryData('tags-list', response);
            queryClient.invalidateQueries('tags-list');
          },
          onError: () => {},
        },
      );
    }
  };

  const submitForm = async (dataForm: {tag: string}) => {
    createTag.mutate(
      {tag: dataForm.tag, options: data},
      {
        onSuccess: response => {
          Toast.show({
            type: 'success',
            text1: 'The new tag was created successfully',
            text2: 'Now you can see it in the tag list below',
          });
          queryClient.cancelQueries('tags-list');
          queryClient.setQueryData('tags-list', response);
          queryClient.invalidateQueries('tags-list');
        },
        onError: () => {},
      },
    );
    tagForm.reset();
  };

  const deleteItem = async (item: string) => {
    removeTag.mutate(
      {item, options: data},
      {
        onSuccess: response => {
          Toast.show({
            type: 'info',
            text1: 'The tag was deleted successfully',
            text2: 'Now you can see the tag list fitered below',
          });
          queryClient.cancelQueries('tags-list');
          queryClient.setQueryData('tags-list', response);
          queryClient.invalidateQueries('tags-list');
        },
        onError: () => {},
      },
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.select]}
        onPress={() => {
          setModal(true);
        }}>
        {value ? (
          <Text numberOfLines={1} style={styles.textValue}>
            {value}
          </Text>
        ) : (
          <Text style={styles.placeholder} numberOfLines={1}>
            {placeholder}
          </Text>
        )}
        {/* how to not simulate an icon hahahah */}
        <Text style={{color: '#FFFFFF'}}>v</Text>
      </TouchableOpacity>
      {error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : null}
      <Modal
        animationType="slide"
        transparent
        statusBarTranslucent
        visible={modal}>
        <TouchableWithoutFeedback
          style={styles.offset}
          onPress={() => {
            setModal(false);
          }}>
          <View style={styles.offset}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.lineHeader} />
                <Text bold style={styles.title}>
                  Create a new tag +
                </Text>
              </View>
              <View style={styles.row}>
                <Input
                  name="tag"
                  width={'70%'}
                  control={tagForm.control}
                  placeholder="New tag"
                  rules={{...required, ...max100}}
                />
                <Pressable
                  style={styles.button}
                  onPress={tagForm.handleSubmit(submitForm)}>
                  <Text style={styles.buttonText}>Add tag +</Text>
                </Pressable>
              </View>
              <View style={styles.header}>
                <Text bold style={styles.title}>
                  Select or delete a tag
                </Text>
              </View>
              <View style={styles.viewList}>
                <FlatList
                  data={data}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          onChange(item);
                          setModal(false);
                        }}
                        style={[styles.item, styles.row]}>
                        <Text style={styles.text}>{item}</Text>
                        <TouchableOpacity
                          onPress={() => setModalVisible(item)}
                          style={styles.deleteButton}>
                          <Text style={styles.textDeleteButton}>x</Text>
                        </TouchableOpacity>
                        <DeleteModal
                          deleteItem={() => deleteItem(item)}
                          cancel={() => setModalVisible(null)}
                          visible={modalVisible}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default TagSelectModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000000',
    textAlign: 'center',
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    textAlign: 'center',
    height: 18,
    width: 18,
    borderRadius: 4,
    justifyContent: 'center',
  },
  textDeleteButton: {
    fontSize: 12,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  select: {
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 10,
    borderRadius: 4,
    paddingHorizontal: 16,
  },
  placeholder: {
    fontSize: 14,
    color: 'grey',
    flex: 1,
  },
  textValue: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  error: {
    color: '#F00',
    fontSize: 10,
  },
  offset: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  sizeViewOpaco: {
    width: '100%',
  },
  content: {
    backgroundColor: '#0E5573',
    flexDirection: 'column',
    borderRadius: 20,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingBottom: 16,
    paddingTop: 8,
    marginBottom: 8,
  },
  lineHeader: {
    backgroundColor: '#FFFFFF',
    height: 4,
    width: 48,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems: 'center',
    borderWidth: 0.5,
    marginVertical: 4,
    borderRadius: 4,
  },
  title: {
    marginTop: 16,
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 21,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 18,
  },
  viewList: {
    height: '40%',
    paddingHorizontal: 16,
  },
});
