import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {useQueryClient} from 'react-query';
import {useGetNotes, useRemoveNote} from '../../../../services/api/notes';
import Toast from 'react-native-toast-message';
import ListItemNote from './ListItemNote';
import GridItemNote from './GridItemNote';
import Switch from '../../../../components/Switch';
import SearchBar from '../../../../components/SearchBar';
import TagsList from '../../../../components/TagsList';
import colors from '../../../../styles/colors';

type Item = {
  id: number | undefined;
  tag: string;
  title: string;
  text: string;
  images: string[];
  date_of_creation: string;
};

type ItemProps = {
  tag: string;
  filter: string;
  submitNote: (item: {search: string}) => Promise<void>;
  onPressTag: (item: string) => Promise<void>;
};

const switchOptions = ['Grid', 'List'];

export default function NotesList({
  tag,
  filter,
  onPressTag,
  submitNote,
}: ItemProps) {
  const [switchValue, setSwitchValue] = useState<string>('Grid');
  const {data, isLoading} = useGetNotes();
  const [filteredData, setFilteredData] = useState<ItemProps>(data);
  const queryClient = useQueryClient();
  const removeNote = useRemoveNote();

  useEffect(() => {
    updateData();
  }, [tag, filter, data]);

  const updateData = () => {
    if (tag === 'All') {
      let updatedData = data;
      if (filter) {
        updatedData = updatedData?.filter(item => {
          if (item.title.toLowerCase().includes(filter.toLowerCase())) {
            return item;
          } else if (item.text.toLowerCase().includes(filter.toLowerCase())) {
            return item;
          }
        });
      }
      setFilteredData(updatedData);
    } else {
      let updatedData = data?.filter(item => item.tag === tag);
      if (filter) {
        updatedData = updatedData?.filter(item => {
          if (item.title.toLowerCase().includes(filter.toLowerCase())) {
            return item;
          } else if (item.text.toLowerCase().includes(filter.toLowerCase())) {
            return item;
          }
        });
      }
      setFilteredData(updatedData);
    }
  };

  const deleteItem = async (id: number) => {
    removeNote.mutate(
      {id},
      {
        onSuccess: response => {
          Toast.show({
            type: 'info',
            text1: 'The tag was deleted successfully',
            text2: 'Now you can see the tag list fitered below',
          });
          queryClient.cancelQueries('notes-list');
          queryClient.setQueryData('notes-list', response);
          queryClient.invalidateQueries('notes-list');
        },
        onError: () => {},
      },
    );
  };

  return (
    <View style={styles.container}>
      {!!data?.length && !filteredData?.length && (
        <View style={styles.ph16}>
          <Text style={[styles.textNoData]}>
            Hey, looks like you already have notes but can't see anything, try
            changing your filters!!!
          </Text>
        </View>
      )}
      {!!data?.length && (
        <>
          <SearchBar submit={submitNote} />
          <TagsList onPress={onPressTag} value={tag} />
          <Switch
            options={switchOptions}
            currentValue={switchValue}
            onPress={setSwitchValue}
          />
        </>
      )}
      {isLoading ? (
        <ActivityIndicator color={colors.PRIMARY} />
      ) : !data?.length ? (
        <View style={styles.ph16}>
          <Text style={styles.textNoData}>
            Oh no! It looks like you don't have any notes yet, click on bottom
            button "+" to create a brand new one!
          </Text>
        </View>
      ) : switchValue === 'Grid' ? (
        <GridItemNote
          data={filteredData}
          {...{deleteItem}}
          isLoading={removeNote.isLoading}
        />
      ) : (
        <ListItemNote
          data={filteredData}
          {...{deleteItem}}
          isLoading={removeNote.isLoading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ph16: {
    padding: 16,
  },
  mt24: {
    marginTop: 24,
  },
  textNoData: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  containerItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 24,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#F44336',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  ml16: {
    marginLeft: 16,
  },
  images: {
    width: 80,
    height: 80,
    marginHorizontal: 16,
    borderRadius: 4,
  },
  noImage: {
    width: 80,
    height: 80,
    marginHorizontal: 16,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#192D46',
  },
  textNoImage: {
    textAlign: 'center',
  },
  textDelete: {
    color: '#FFFFFF',
    fontSize: 10,
  },
});
