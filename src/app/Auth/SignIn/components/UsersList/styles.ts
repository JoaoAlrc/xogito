import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../styles/colors';
const {width} = Dimensions.get('screen');

export default StyleSheet.create({
  button: {
    width: width / 4,
    height: width / 4,
    borderRadius: 100,
    paddingBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: colors.BUTTON,
    overflow: 'hidden',
  },
  name: {
    color: colors.PRIMARY,
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  notes: {
    color: colors.WHITE,
    fontSize: 10,
  },
  textUSer: {
    color: colors.WHITE,
    fontSize: 10,
    textAlign: 'center',
    alignSelf: 'center',
    width: '60%',
  },
  avatar: {
    width: width / 4,
    height: width / 4 - 40,
    backgroundColor: colors.GRAY_DARK,
    resizeMode: 'cover',
  },
  mh16: {
    marginHorizontal: 16,
  },
  mr16: {
    marginRight: 16,
  },
  listView: {
    backgroundColor: colors.DARK,
    paddingVertical: 16,
    margin: 16,
    borderRadius: 50,
    overflow: 'hidden',
  },
});
