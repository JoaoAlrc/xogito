import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import DeleteModal from './DeleteModal';

const {width} = Dimensions.get('screen');

type Item = {
  id: number | undefined;
  tag: string;
  title: string;
  text: string;
  images: string[];
  date_of_creation: string;
};

type Props = {
  data: Item[];
  isLoading: boolean;
  deleteItem: (id: number) => Promise<void>;
};

export default function GridItemNote({data, isLoading, deleteItem}: Props) {
  const [modalVisible, setModalVisible] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <DeleteModal
        deleteItem={() => deleteItem(modalVisible)}
        cancel={() => setModalVisible(0)}
        visible={modalVisible}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.viewItems}>
          {data.map((item, idx) => (
            <View key={idx} style={styles.containerItem}>
              <View style={styles.spaceBetween}>
                {item.images[0] ? (
                  <Image source={{uri: item.images[0]}} style={styles.images} />
                ) : (
                  <View style={styles.noImage}>
                    <Text style={styles.textNoImage}>No image available</Text>
                  </View>
                )}
              </View>
              <View style={styles.footer}>
                <View style={styles.spaceBetween}>
                  <Text style={styles.title}>Title: {item.title}</Text>
                  <Text>Tag: {item.tag}</Text>
                  <Text>Number of images: {item.images.length}</Text>
                  <Text>Text: {item.text}</Text>
                </View>
                <Pressable
                  style={styles.button}
                  onPress={() => setModalVisible(item.id)}>
                  <Text style={styles.textDelete}>Delete</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 24,
  },
  viewItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footer: {
    padding: 8,
    height: 150,
    justifyContent: 'space-between',
  },
  containerItem: {
    justifyContent: 'space-between',
    width: width / 2 - 32,
    backgroundColor: '#E7E7E7',
    borderRadius: 4,
    marginBottom: 24,
    marginHorizontal: 16,
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
    width: width / 2 - 32,
    resizeMode: 'cover',
    height: width / 2 - 32,
    borderRadius: 4,
  },
  noImage: {
    width: width / 2 - 32,
    height: width / 2 - 32,
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
