import {useMutation, UseMutationResult, useQuery} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

// key
export const GET_TAG_KEY = 'tags-list';
export const CREATE_TAG_KEY = 'create-tag';
export const REMOVE_TAG_KEY = 'delete-tag';

/* --------------------------------------- GET TAG --------------------------------------- */
// React Query Hook to get the item
export const useGetTags = () => {
  const queryResult = useQuery(GET_TAG_KEY, async () => {
    const response = await AsyncStorage.getItem('tags');

    return JSON.parse(response);
  });

  return queryResult;
};

/* --------------------------------------- CREATE TAG --------------------------------------- */

type CreateTagProps = {
  tag: string;
  options: string[];
};

// React Mjutation Hook to create the Tag
export const useCreateTag = (): UseMutationResult<
  string[],
  unknown,
  CreateTagProps
> => {
  const mutationResult = useMutation(
    async ({tag, options}: CreateTagProps) => {
      const response = tag !== '' ? [tag, ...options] : options;
      await AsyncStorage.setItem('tags', JSON.stringify(response));

      return response;
    },
    {mutationKey: CREATE_TAG_KEY},
  );

  return mutationResult;
};

/* --------------------------------------- REMOVE TAG --------------------------------------- */

type RemoveTagProps = {
  item: string;
  options: string[];
};

// React Mjutation Hook to Remove the Tag
export const useRemoveTag = (): UseMutationResult<
  string[],
  unknown,
  RemoveTagProps
> => {
  const mutationResult = useMutation(
    async ({item, options}: RemoveTagProps) => {
      const response = options.filter(i => i !== item);
      await AsyncStorage.setItem('tags', JSON.stringify(response));

      return response;
    },
    {mutationKey: REMOVE_TAG_KEY},
  );

  return mutationResult;
};
