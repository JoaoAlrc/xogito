import React from 'react';
import {useForm} from 'react-hook-form';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import Input from './forms/Input';

type Props = {
  submit: (item: {search: string}) => Promise<void>;
};

export default function SearchBar({submit}: Props) {
  const {control, handleSubmit} = useForm<{search: string}>({
    defaultValues: {
      search: '',
    },
  });

  return (
    <View style={styles.container}>
      <Input
        name="search"
        width="75%"
        control={control}
        placeholder="What are you looking for?"
      />
      <Pressable style={styles.button} onPress={handleSubmit(submit)}>
        <Text style={styles.textButton}>Search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#0B1322',
    borderRadius: 24,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginLeft: 10,
    width: '20%',
  },
});
