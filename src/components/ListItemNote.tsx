import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import DeleteModal from './DeleteModal';

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

export default function ListItemNote({data, isLoading, deleteItem}: Props) {
  const [modalVisible, setModalVisible] = useState(0);

  return (
    <View style={styles.container}>
      <DeleteModal
        deleteItem={() => deleteItem(modalVisible)}
        cancel={() => setModalVisible(0)}
        visible={modalVisible}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        data?.map((item, idx) => (
          <View key={idx} style={styles.containerItem}>
            <View style={[styles.row, styles.spaceBetween]}>
              {item.images[0] ? (
                <Image source={{uri: item.images[0]}} style={styles.images} />
              ) : (
                <View style={styles.noImage}>
                  <Text style={styles.textNoImage}>No image available</Text>
                </View>
              )}
              <View style={styles.spaceBetween}>
                <Text>Title: {item.title}</Text>
                <Text>Tag: {item.tag}</Text>
                <Text>Text: {item.text}</Text>
              </View>
            </View>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(item.id)}>
              <Text style={styles.textDelete}>Delete</Text>
            </Pressable>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 24,
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
