import React from 'react';
import {Control} from 'react-hook-form';
import {View, TouchableOpacity, ActivityIndicator, Text} from 'react-native';
import AvatarPicker from '../../../../../components/forms/AvatarPicker';
import Input from '../../../../../components/forms/Input';
import colors from '../../../../../styles/colors';
import styles from './styles';

type Props = {
  loading?: boolean;
  control: Control<any, object>;
  createUser: (dataForm: {name: string; user_avatar: string}) => void;
};

const required = {
  required: {
    value: true,
    message: 'Your username and photo are required to save your notes.',
  },
};

export default function Form({createUser, control, loading}: Props) {
  return (
    <>
      <View style={styles.avatarView}>
        <AvatarPicker name="user_avatar" control={control} rules={required} />
      </View>
      <View style={[styles.ph16, styles.pt24]}>
        <Input
          name="name"
          control={control}
          placeholder="Username"
          rules={required}
        />
        <TouchableOpacity onPress={createUser} style={styles.button}>
          {loading ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            <Text style={styles.buttonText}>Create Notes!</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
