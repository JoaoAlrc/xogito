import {StyleSheet} from 'react-native';
import colors from '../../../../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    backgroundColor: colors.WHITE,
  },
  containerInputUnderline: {
    flexDirection: 'row',
    borderWidth: 0,
    borderBottomWidth: 0.2,
    paddingBottom: 10,
  },
  containerInput: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    borderRadius: 50,
    justifyContent: 'center',
    height: 50,
    marginTop: 24,
    backgroundColor: colors.BUTTON,
  },
  title: {
    color: colors.WHITE,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  errorText: {
    color: colors.RED,
    textAlign: 'center',
  },
  ph16: {
    paddingHorizontal: 16,
  },
  pt24: {
    paddingTop: 24,
  },
  avatarView: {
    position: 'absolute',
    alignSelf: 'center',
    top: 150,
  },
});
