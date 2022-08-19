import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Control, RegisterOptions, useController} from 'react-hook-form';
import colors from '../../../../styles/colors';

type Props = {
  name: string;
  control: Control<any, object>;
  rules?: Omit<
    RegisterOptions<any, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
};

export default function ImagePicker({name, control, rules}: Props) {
  const {
    field: {value, onChange},
  } = useController({control, name, rules});

  const openCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        if (response?.assets[0]) onChange([...value, response.assets[0].uri]);
      }
    });
  };

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
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        onChange([...value, response.assets[0].uri]);
      }
    });
  };

  function renderFileUri() {
    if (value.length) {
      return (
        <View style={styles.row}>
          {value.map(i => (
            <Image source={{uri: i}} key={i} style={styles.images} />
          ))}
        </View>
      );
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <View style={styles.ImageSections}>
          <View>
            {renderFileUri()}
            <Text style={styles.textImageChoose}>Choose the Note images</Text>
          </View>
        </View>

        <View style={styles.btnParentSection}>
          <TouchableOpacity onPress={openCamera} style={styles.btnSection}>
            <Text style={styles.btnText}>Launch Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openImageLibrary}
            style={styles.btnSection}>
            <Text style={styles.btnText}>Launch Image Library</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: colors.SECONDARY,
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 4,
    marginBottom: 8,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 80,
    height: 80,
    margin: 4,
    borderRadius: 4,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 30,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
