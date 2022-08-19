import React from 'react';
import {SafeAreaView, Image} from 'react-native';
import styles from './styles';
import Form from './components/Form';
import {useGetUsers, useLogIn, useManageUser} from '../../../services/api/auth';
import {useForm} from 'react-hook-form';
import {RoutesNavigation} from '../../../services/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQueryClient} from 'react-query';

type Props = NativeStackScreenProps<RoutesNavigation, 'SignIn'>;
type UserForm = {name: string; user_avatar: string};

export default function SignIn({navigation}: Props) {
  const {control, handleSubmit, reset} = useForm<UserForm>({
    defaultValues: {
      name: '',
      user_avatar: '',
    },
  });
  const queryClient = useQueryClient();
  const getUsers = useGetUsers();
  const manageUser = useManageUser();
  const logIn = useLogIn();

  const login = (dataForm: {name: string}) => {
    const id = !getUsers.data?.length ? 1 : getUsers.data.length + 1;
    const user = Object.assign(dataForm, {
      id,
      name: dataForm.name,
      notes: [],
      firstAccess: true,
    });

    manageUser.mutate(
      {user, users: getUsers.data},
      {
        onSuccess: response => {
          logIn.mutate(user, {
            onSuccess: () => {
              queryClient.cancelQueries('get-user-logged');
              queryClient.setQueryData('get-user-logged', user);
              queryClient.invalidateQueries('get-user-logged');
              return navigation.navigate('Home');
            },
            onError: () => {},
          });
          queryClient.cancelQueries('get-users');
          queryClient.setQueryData('get-users', response);
          queryClient.invalidateQueries('get-users');
        },
        onError: () => {},
      },
    );
    reset();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/hp-hero.png')}
        style={styles.images}
      />
      <Form
        {...{
          control,
        }}
        loading={manageUser.isLoading || logIn.isLoading}
        login={handleSubmit(login)}
      />
    </SafeAreaView>
  );
}
