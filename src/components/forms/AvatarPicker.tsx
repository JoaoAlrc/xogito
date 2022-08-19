import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Control, RegisterOptions, useController} from 'react-hook-form';
const {width} = Dimensions.get('screen');
import colors from '../../styles/colors';

type Props = {
  name: string;
  control: Control<any, object>;
  rules?: Omit<
    RegisterOptions<any, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
};

export default function AvatarPicker({name, control, rules}: Props) {
  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({control, name, rules});

  const openImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('AvatarPicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        onChange(response.assets[0].uri);
      }
    });
  };

  const renderAvatar = () => (
    <Image source={{uri: value}} style={styles.avatar} />
  );

  const renderNoAvatar = () => (
    <TouchableOpacity
      onPress={openImageLibrary}
      style={[
        styles.noAvatar,
        {borderColor: error?.message ? colors.RED : colors.SECONDARY},
      ]}>
      <Text style={styles.btnText}>Tap here to select your best selfie!</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View style={styles.body}>
        {value.length ? renderAvatar() : renderNoAvatar()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFFFFF',
  },
  textImageChoose: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    width: width / 1.8,
    height: width / 1.8,
    borderRadius: 100,
    marginBottom: 24,
    borderColor: colors.SECONDARY,
    borderWidth: 8,
    resizeMode: 'cover',
  },
  noAvatar: {
    width: width / 1.8,
    height: width / 1.8,
    backgroundColor: colors.GRAY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 8,
    marginBottom: 24,
    padding: 4,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
