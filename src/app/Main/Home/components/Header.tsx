import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useForm} from 'react-hook-form';
import {useQueryClient} from 'react-query';
import {useCreateNote, useGetNotes} from '../../../../services/api/notes';
import Input from '../../../../components/forms/Input';
import ImagePicker from './ImagePicker';
import moment from 'moment';
import TagSelectModal from '../../../../components/TagSelectModal';
import colors from '../../../../styles/colors';
import {useGetUserLogged} from '../../../../services/api/auth';
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

export default function Header({showModal, setShowModal}) {
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
  const {data} = useGetNotes();
  const userLogged = useGetUserLogged();
  const createNote = useCreateNote();

  const submit = async (dataForm: NoteForm) => {
    const id = !data || data[0] === '' ? 1 : data.length + 1;

    const note = Object.assign(dataForm, {
      id,
      date_of_creation: moment(),
    });

    createNote.mutate(
      {note},
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
      <View style={styles.avatarView}>
        <Image
          source={{uri: userLogged.data.user_avatar}}
          style={styles.avatar}
        />
        <View style={styles.tag}>
          <Text style={styles.title}>{userLogged.data.name}</Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <KeyboardAvoidingView behavior={'padding'} style={styles.safeAreaView}>
          <Pressable
            onPress={() => setShowModal(false)}
            style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <View style={styles.lineHeader} />
                <ImagePicker name="images" control={control} />
                <TagSelectModal
                  name="tag"
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
                  <Pressable
                    onPress={handleSubmit(submit)}
                    style={styles.button}>
                    <Text style={styles.textButton} bold>
                      Save Note
                    </Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
      <Image
        source={require('../../../../assets/hp-hero.png')}
        style={styles.images}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    backgroundColor: colors.PRIMARY,
  },
  tag: {
    borderRadius: 24,
    backgroundColor: colors.BUTTON,
    padding: 4,
  },
  safeAreaView: {
    flex: 1,
  },
  images: {
    width: width,
    height: width - 32,
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
    backgroundColor: colors.SECONDARY,
    borderRadius: 6,
    paddingTop: 8,
    paddingBottom: 28,
    paddingHorizontal: 23,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 50,
    elevation: 5,
  },
  title: {
    color: colors.WHITE,
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: colors.DARK,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: 'center',
  },
  lineHeader: {
    backgroundColor: colors.BLACK,
    height: 4,
    width: 48,
    marginHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 50,
  },
  textButton: {
    fontSize: 16,
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  avatarView: {
    position: 'absolute',
    alignSelf: 'center',
    top: '15%',
    zIndex: 1,
  },
  avatar: {
    width: width / 2,
    height: width / 2,
    borderRadius: 100,
    marginBottom: 24,
    borderColor: colors.SECONDARY,
    backgroundColor: colors.GRAY_LIGHT,
    borderWidth: 8,
    resizeMode: 'cover',
  },
});
