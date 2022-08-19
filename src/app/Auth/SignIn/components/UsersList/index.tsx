import React from 'react';
import {View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import {User} from '../../../../../services/api/auth';
import styles from './styles';

type Props = {
  data: User[];
  login: (dataForm: User) => void;
};

const noUsers = 'Old users will appear here.';
const hasUsers =
  'Hey, if you already has an account just search for your avatar and get your notes back!';

export default function UsersList({login, data}: Props) {
  return (
    <>
      <View style={styles.listView}>
        <Text style={styles.textUSer}>
          {!!data?.length ? hasUsers : noUsers}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.map((item, idx) => (
            <TouchableOpacity
              onPress={() => login(item)}
              style={[styles.button, !idx ? styles.mh16 : styles.mr16]}>
              <Image source={{uri: item.user_avatar}} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.notes}>
                {item.notes.length} {item.notes.length === 1 ? 'note' : 'notes'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
