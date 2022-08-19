import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import DeleteModal from '../../../../components/DeleteModal';
import colors from '../../../../styles/colors';

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
              <View style={styles.tag}>
                <Text numberOfLines={1} style={styles.tagText}>
                  {item.tag}
                </Text>
              </View>
              <View style={styles.spaceBetween}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>

                <Text numberOfLines={1} style={styles.textImages}>
                  {moment(item.date_of_creation).format('MM/DD/YYYY')}
                </Text>
                <Text numberOfLines={1} style={styles.textImages}>
                  {item.images.length}{' '}
                  {item.images.length === 1 ? 'image' : 'images'}
                </Text>
                <Text numberOfLines={2} style={styles.text}>
                  {item.text}
                </Text>
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
  tag: {
    position: 'absolute',
    top: 4,
    left: 20,
    borderRadius: 24,
    backgroundColor: colors.BUTTON,
    padding: 8,
  },
  title: {
    fontSize: 16,
    color: colors.PRIMARY,
  },
  tagText: {
    fontSize: 12,
    color: colors.WHITE,
  },
  textImages: {
    fontSize: 12,
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
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
