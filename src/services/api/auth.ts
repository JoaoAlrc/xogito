import {useMutation, UseMutationResult, useQuery} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

// key
export const GET_USER_LOGGED_KEY = 'get-user-logged';
export const GET_USERS_KEY = 'get-users';
export const MANAGE_USER_KEY = 'manage-user';
export const LOG_IN_KEY = 'log-in-user';
export const LOG_OUT_KEY = 'log-out-user';

/* --------------------------------------- GET USER LOGGED --------------------------------------- */
// React Query Hook to get user data
export const useGetUserLogged = () => {
  const queryResult = useQuery(GET_USER_LOGGED_KEY, async () => {
    const response = await AsyncStorage.getItem('user-logged');

    return JSON.parse(response);
  });

  return queryResult;
};

/* --------------------------------------- GET ALL USERS --------------------------------------- */
// React Query Hook to get all users
export const useGetUsers = () => {
  const queryResult = useQuery(GET_USERS_KEY, async () => {
    const response = await AsyncStorage.getItem('users');

    return JSON.parse(response);
  });

  return queryResult;
};

/* --------------------------------------- MANAGE USER --------------------------------------- */

type ManageUserProps = {
  user: User;
  users: User[];
};

export type User = {
  id: number | undefined;
  name: string;
  user_avatar: string;
  notes: Note[];
  firstAccess: boolean;
};

export type Note = {
  id: number | undefined;
  tag: string;
  title: string;
  text: string;
  images: string[];
  date_of_creation: string;
};

// React Mutation Hook to create/update the User
export const useManageUser = (): UseMutationResult<
  User[],
  unknown,
  ManageUserProps
> => {
  const mutationResult = useMutation(
    async ({user, users}: ManageUserProps) => {
      const hasUser = users?.findIndex(item => item.id === user.id);
      const response = users || [];
      if (hasUser > -1) {
        response[hasUser] = user;
      } else {
        response.push(user);
      }

      await AsyncStorage.setItem('users', JSON.stringify(response));

      return response;
    },
    {mutationKey: MANAGE_USER_KEY},
  );

  return mutationResult;
};

/* --------------------------------------- LOG IN --------------------------------------- */

// React Mutation Hook to log in
export const useLogIn = (): UseMutationResult<void, unknown, User> => {
  const mutationResult = useMutation(
    async (user: User) =>
      await AsyncStorage.setItem('user-logged', JSON.stringify(user)),
    {mutationKey: LOG_IN_KEY},
  );

  return mutationResult;
};

/* --------------------------------------- LOG OUT --------------------------------------- */

// React Mutation Hook to log out
export const useLogOut = (): UseMutationResult<User[], unknown, void> => {
  const mutationResult = useMutation(
    async () => {
      const user = JSON.parse(await AsyncStorage.getItem('user-logged'));
      const users = JSON.parse(await AsyncStorage.getItem('users'));
      const userIndex = users?.findIndex(item => item.id === user.id);

      users[userIndex] = user;
      users.firstAccess = false;

      await AsyncStorage.setItem('users', JSON.stringify(users));
      await AsyncStorage.removeItem('user-logged');

      return users;
    },
    {mutationKey: LOG_OUT_KEY},
  );

  return mutationResult;
};
