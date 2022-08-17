import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type Props = {
  item: string;
  currentValue: string;
  onPress: (item: string) => Promise<void>;
};

export default function Tag({item, currentValue, onPress}: Props) {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={item === currentValue ? styles.tag : styles.lightTag}>
      <Text style={item === currentValue ? styles.textLight : styles.text}>
        {item}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#192D46',
    borderColor: '#192D46',
    borderRadius: 8,
    borderWidth: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 16,
  },
  lightTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderColor: '#192D46',
    borderRadius: 8,
    borderWidth: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 16,
  },
  textLight: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  text: {
    color: '#192D46',
    fontSize: 12,
  },
});
