import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../styles/colors';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SECONDARY,
  },
  row: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  addButton: {
    backgroundColor: colors.BUTTON,
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButtonPlus: {
    color: colors.WHITE,
    fontSize: 24,
  },
  textButtonLeft: {
    color: colors.WHITE,
    fontSize: 12,
    bottom: 16,
    right: 24,
    position: 'absolute',
  },
  textButtonTop: {
    color: colors.WHITE,
    fontSize: 24,
    marginBottom: 32,
  },
  insideButtonsView: {
    alignItems: 'flex-end',
  },
  buttonsView: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  buttonsViewClosed: {
    flex: 1,
    width,
    height,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
});
