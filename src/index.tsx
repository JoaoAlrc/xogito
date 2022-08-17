import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {styles} from './styles';
import Header from './components/Header';
import {useGetNotes} from './services/notes';
import {useCreateTag, useGetTags} from './services/tags';
import {QueryClient} from 'react-query';
import NotesList from './components/NotesList';

const queryClient = new QueryClient();

export default function Note() {
  const [tagOption, setTagOption] = useState<string>('All');
  const [filterOption, setFilterOption] = useState<string>('');
  const getNotes = useGetNotes();
  const getTags = useGetTags();
  const createTag = useCreateTag();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (!getTags.data) {
      createTag.mutate(
        {tag: '', options: ['Work', 'Home', 'Recipes']},
        {
          onSuccess: response => {
            queryClient.cancelQueries('tags-list');
            queryClient.setQueryData('tags-list', response);
            queryClient.invalidateQueries('tags-list');
          },
          onError: () => {},
        },
      );
    }
  };

  const onPressTag = async (item: string) => {
    setTagOption(item);
  };

  const searchNote = async (item: {search: string}) => {
    setFilterOption(item.search);
  };

  return (
    <ScrollView style={styles.container}>
      <Header notesData={getNotes.data} tagData={getTags.data} />
      <NotesList
        dataNotes={getNotes.data}
        dataTags={getTags.data}
        tag={tagOption}
        filter={filterOption}
        submitNote={searchNote}
        onPressTag={onPressTag}
      />
    </ScrollView>
  );
}
