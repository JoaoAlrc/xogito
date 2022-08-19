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
});
