import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';
const {width} = Dimensions.get('screen');

type Props = {
  cancel: () => Promise<void>;
  deleteItem: () => Promise<void>;
  visible: number;
};

export default function DeleteModal({deleteItem, visible, cancel}: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    setShowDeleteModal(visible ? true : false);
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      presentationStyle="overFullScreen"
      visible={showDeleteModal}
      onRequestClose={() => {
        setShowDeleteModal(false);
        cancel();
      }}>
      <Pressable
        onPress={() => setShowDeleteModal(false)}
        style={styles.centeredView}>
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={[styles.whiteCircle]}>
              <View style={styles.blueCircle}>
                <Text style={styles.textIcon}>!</Text>
              </View>
            </View>
            <Text bold style={styles.deleteModalText}>
              Are you sure you want to detele this item?
            </Text>
            <View style={styles.row}>
              <Pressable
                onPress={() => {
                  setShowDeleteModal(false);
                  cancel();
                }}
                style={[styles.buttonModal, styles.bgGrey]}>
                <Text style={styles.textButtonModal}>NO</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowDeleteModal(false);
                  deleteItem();
                }}
                style={[styles.buttonModal, styles.bgRed]}>
                <Text style={styles.textButtonModal}>YES</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textButtonModal: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonModal: {
    width: width / 2 - 16 * 3,
    height: 43,
    margin: 0,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgGrey: {
    backgroundColor: 'grey',
  },
  bgRed: {
    backgroundColor: 'red',
  },
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
  deleteModalText: {
    width: '75%',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 70,
    // color: colors.COLORS?.MODAL_TEXT,
    alignSelf: 'center',
    textAlign: 'center',
    // fontFamily: Typography.OPEN_SANS_BOLD,
  },
  whiteCircle: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(54, 92, 121, 0.2)',
    alignSelf: 'center',
  },
  blueCircle: {
    backgroundColor: 'yellow',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 53,
    height: 53,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 22,
    // backgroundColor: colors.COLORS.MODAL_OVERLAY,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 6,
    paddingTop: 50,
    paddingBottom: 28,
    paddingHorizontal: 23,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 50,
    elevation: 5,
  },
});
