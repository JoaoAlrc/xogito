import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

type Props = {
  options: string[];
  currentValue: string;
  onPress: (item: string) => Promise<void>;
};

export default function Switch({options, currentValue, onPress}: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => onPress(options[0])}
        style={[
          options[0] === currentValue ? styles.switch : styles.lightSwitch,
          styles.leftButton,
        ]}>
        <Text
          style={options[0] === currentValue ? styles.textLight : styles.text}>
          {options[0]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress(options[1])}
        style={[
          options[1] === currentValue ? styles.switch : styles.lightSwitch,
          styles.rightButton,
        ]}>
        <Text
          style={options[1] === currentValue ? styles.textLight : styles.text}>
          {options[1]}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftButton: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  switch: {
    backgroundColor: '#192D46',
    borderColor: '#192D46',
    borderWidth: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  lightSwitch: {
    backgroundColor: '#FFFFFF',
    borderColor: '#192D46',
    borderWidth: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
