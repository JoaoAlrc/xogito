import React, {useState} from 'react';
import {
  ScrollView,
  Pressable,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {styles} from './styles';
import Header from './components/Header';
import NotesList from './components/NotesList';
import {useLogOut} from '../../../services/api/auth';
import {useQueryClient} from 'react-query';

export default function Home({navigation}) {
  const [tagOption, setTagOption] = useState<string>('All');
  const [filterOption, setFilterOption] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalOptions, setShowModalOptions] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const logOut = useLogOut();

  const onPressTag = async (item: string) => {
    setTagOption(item);
  };

  const searchNote = async (item: {search: string}) => {
    setFilterOption(item.search);
  };

  const logout = async () => {
    logOut.mutate(null, {
      onSuccess: response => {
        queryClient.cancelQueries('users');
        queryClient.setQueryData('users', response);
        queryClient.invalidateQueries('users');
        setShowModalOptions(false);
        return navigation.navigate('SignIn');
      },
      onError: () => {},
    });
  };

  const buttonsView = () => (
    <TouchableWithoutFeedback onPress={() => setShowModalOptions(false)}>
      <View style={styles.buttonsViewClosed}>
        <View style={styles.row}>
          <Pressable style={styles.leftButton} onPress={() => logout()}>
            <Text style={styles.textButtonLeft}>LogOut</Text>
          </Pressable>
          <View style={styles.insideButtonsView}>
            <Pressable
              style={styles.topButton}
              onPress={() => {
                setShowModalOptions(false);
                setShowModal(true);
              }}>
              <Text style={styles.textButtonTop}>Add item +</Text>
            </Pressable>
            <Pressable
              style={styles.addButton}
              onPress={() => setShowModalOptions(false)}>
              <Text style={styles.textButtonPlus}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  const buttonsViewClosed = () => (
    <View style={styles.buttonsView}>
      <Pressable
        style={styles.addButton}
        onPress={() => setShowModalOptions(true)}>
        <Text style={styles.textButtonPlus}>+</Text>
      </Pressable>
    </View>
  );

  return (
    <>
      <ScrollView style={styles.container}>
        <Header {...{showModal, setShowModal}} />
        <NotesList
          tag={tagOption}
          filter={filterOption}
          submitNote={searchNote}
          onPressTag={onPressTag}
        />
      </ScrollView>
      {showModalOptions ? buttonsView() : buttonsViewClosed()}
    </>
  );
}
