import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../styles/colors';
const {width} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
  },
  images: {
    width: width,
    height: width - 32,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  title: {
    color: colors.WHITE,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 8,
    color: colors.GRAY_DARK,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  viewText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    color: colors.WHITE,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.BUTTON,
    borderRadius: 50,
    padding: 15,
  },
  viewButtons: {
    paddingVertical: 50,
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
});
