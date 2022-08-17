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
    const response = await AsyncStorage.getItem('notes');

    return JSON.parse(response);
  });

  return queryResult;
};

/* --------------------------------------- CREATE NOTE --------------------------------------- */

type CreateNoteProps = {
  note: Note;
  notes: Note[];
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
    async ({note, notes}: CreateNoteProps) => {
      const response = !!notes ? [note, ...notes] : [note];
      await AsyncStorage.setItem('notes', JSON.stringify(response));

      return response;
    },
    {mutationKey: CREATE_NOTE_KEY},
  );

  return mutationResult;
};

/* --------------------------------------- REMOVE NOTE --------------------------------------- */

type RemoveNoteProps = {
  id: number;
  notes: Note[];
};

// React Mutation Hook to Remove the Note
export const useRemoveNote = (): UseMutationResult<
  Note[],
  unknown,
  RemoveNoteProps
> => {
  const mutationResult = useMutation(
    async ({id, notes}: RemoveNoteProps) => {
      const response = notes.filter(i => i.id !== id);
      await AsyncStorage.setItem('notes', JSON.stringify(response));

      return response;
    },
    {mutationKey: REMOVE_NOTE_KEY},
  );

  return mutationResult;
};
