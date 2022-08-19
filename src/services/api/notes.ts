import {useMutation, UseMutationResult, useQuery} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

// key
export const GET_NOTE_KEY = 'notes-list';
export const CREATE_NOTE_KEY = 'create-note';
export const REMOVE_NOTE_KEY = 'delete-note';

/* --------------------------------------- GET NOTE --------------------------------------- */
// React Query Hook to get notes
export const useGetNotes = () => {
  const queryResult = useQuery(GET_NOTE_KEY, async () => {
    const response = await AsyncStorage.getItem('user-logged');

    return JSON.parse(response).notes;
  });

  return queryResult;
};

/* --------------------------------------- CREATE NOTE --------------------------------------- */

type CreateNoteProps = {
  note: Note;
};
type Note = {
  id: number | undefined;
  tag: string;
  title: string;
  text: string;
  images: string[];
  date_of_creation: string;
};

// React Mutation Hook to create the Note
export const useCreateNote = (): UseMutationResult<
  Note[],
  unknown,
  CreateNoteProps
> => {
  const mutationResult = useMutation(
    async ({note}: CreateNoteProps) => {
      let response = JSON.parse(await AsyncStorage.getItem('user-logged'));
      response.notes = [note, ...response.notes];

      await AsyncStorage.setItem('user-logged', JSON.stringify(response));

      return response.notes;
    },
    {mutationKey: CREATE_NOTE_KEY},
  );

  return mutationResult;
};

/* --------------------------------------- REMOVE NOTE --------------------------------------- */

type RemoveNoteProps = {
  id: number;
};

// React Mutation Hook to Remove the Note
export const useRemoveNote = (): UseMutationResult<
  Note[],
  unknown,
  RemoveNoteProps
> => {
  const mutationResult = useMutation(
    async ({id}: RemoveNoteProps) => {
      let userParsed = JSON.parse(await AsyncStorage.getItem('user-logged'));
      const filteredNotes = userParsed.notes.filter(i => i.id !== id);
      userParsed.notes = filteredNotes;

      await AsyncStorage.setItem('user-logged', JSON.stringify(userParsed));

      return userParsed;
    },
    {mutationKey: REMOVE_NOTE_KEY},
  );

  return mutationResult;
};
