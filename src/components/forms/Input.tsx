import React from 'react';
import {Control, RegisterOptions, useController} from 'react-hook-form';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import colors from '../../styles/colors';

type InputProps = {
  name: string;
  width?: string | number;
  placeholder: string;
  multiline?: boolean;
  control: Control<any, object>;
  rules?: Omit<
    RegisterOptions<any, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
};

const Input = ({
  name,
  control,
  rules,
  multiline,
  placeholder,
  width,
  ...props
}: InputProps) => {
  const {
    field: {value, onChange, onBlur},
    fieldState: {error},
  } = useController({control, name, rules});

  const renderError = () =>
    error && error.message ? (
      <Text
        style={{
          color: error?.message ? 'red' : colors.DARK,
          ...styles.helperText,
        }}>
        {error?.message}
      </Text>
    ) : null;

  return (
    <View style={{width: width || '100%'}}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        multiline={multiline}
        placeholderTextColor={colors.GRAY}
        style={[
          styles.inputStyles,
          {
            borderColor: error && error.message ? 'red' : colors.WHITE,
          },
        ]}
        {...props}
      />
      {renderError()}
    </View>
  );
};

const styles = StyleSheet.create({
  helperText: {
    marginLeft: 10,
    textAlign: 'left',
  },
  inputStyles: {
    borderWidth: 0.5,
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 16,
    marginBottom: 8,
    width: '100%',
    color: colors.WHITE,
  },
});

export default Input;
