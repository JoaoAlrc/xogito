import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Input from './forms/Input';
import Toast from 'react-native-toast-message';
import {useForm} from 'react-hook-form';
import TagSelectModal from './TagSelectModal';
import ImagePicker from './forms/ImagePicker';
import {useCreateNote} from '../services/notes';
import {useQueryClient} from 'react-query';
const {width} = Dimensions.get('screen');

type NoteForm = {
  id: number | undefined;
  tag: string;
  title: string;
  text: string;
  images: string[];
  date_of_creation: string;
};

const required = {
  required: {value: true, message: 'This value is required.'},
};

const max100 = {
  maxLength: {
    value: 100,
    message: 'Max length is 100.',
  },
};

const max500 = {
  maxLength: {
    value: 500,
    message: 'Max length is 500.',
  },
};

export default function Header({notesData, tagData}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {reset, control, handleSubmit} = useForm<NoteForm>({
    defaultValues: {
      id: undefined,
      tag: '',
      title: '',
      text: '',
      images: [],
      date_of_creation: '',
    },
  });
  const queryClient = useQueryClient();
  const createNote = useCreateNote();

  const submit = async (dataForm: NoteForm) => {
    const id = !notesData || notesData[0] === '' ? 1 : notesData.length + 1;

    const note = Object.assign(dataForm, {
      id,
      date_of_creation: new Date(),
    });

    createNote.mutate(
      {note, notes: notesData},
      {
        onSuccess: response => {
          Toast.show({
            type: 'success',
            text1: 'The new note was created successfully',
            text2: 'Now you can see it in the notes list below',
          });
          queryClient.cancelQueries('notes-list');
          queryClient.setQueryData('notes-list', response);
          queryClient.invalidateQueries('notes-list');
        },
        onError: () => {},
      },
    );
    reset();
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <Pressable
          onPress={() => setShowModal(false)}
          style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.lineHeader} />
              <ImagePicker name="images" control={control} />
              <TagSelectModal
                name="tag"
                data={tagData}
                control={control}
                placeholder="Tag"
                rules={{...required}}
              />
              <Input
                name="title"
                control={control}
                placeholder="Title"
                rules={{...required, ...max100}}
              />
              <Input
                name="text"
                control={control}
                placeholder="Text"
                rules={{...required, ...max500}}
              />
              <View style={styles.pb50}>
                <Pressable onPress={handleSubmit(submit)} style={styles.button}>
                  <Text style={styles.textButton} bold>
                    Save Note
                  </Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
      <Image source={require('../assets/hp-hero.png')} style={styles.images} />
      <Text style={styles.title}>Xogito Notes</Text>
      <Pressable style={styles.addButton} onPress={() => setShowModal(true)}>
        <Text style={styles.textButton}>Add note +</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingBottom: 25,
    backgroundColor: '#baddfb',
  },
  images: {
    width: width,
    height: width - 32,
    // height:  '100%',
    resizeMode: 'cover',
    margin: 4,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  modalView: {
    width: '100%',
    backgroundColor: '#0E5573',
    borderRadius: 6,
    paddingTop: 8,
    paddingBottom: 28,
    paddingHorizontal: 23,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 50,
    elevation: 5,
  },
  addButton: {
    backgroundColor: '#365C79',
    borderRadius: 16,
    paddingVertical: 8,
    alignItems: 'center',
    paddingHorizontal: 24,
    marginHorizontal: 16,
  },
  textButton: {
    color: '#FFFFFF',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0B1322',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: 'center',
  },
  lineHeader: {
    backgroundColor: '#000000',
    height: 4,
    width: 48,
    marginHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 50,
  },
});
