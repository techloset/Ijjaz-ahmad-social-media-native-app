import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

export const customStyles = StyleSheet.create({
  border: {
    borderWidth: 1.5,
    borderRadius: 100,
    borderColor: Colors.profileBorder,
    padding: 3,
  },
  profileImg: {
    width: 86,
    height: 86,
    borderRadius: 100,
  },
  bio: {
    width: '60%',
    marginTop: 10,
  },
  textCenter: {
    textAlign: 'center',
  },

  btn: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 5,
    paddingVertical: 6,
    marginVertical: 14,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCenter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContainer: {
    marginHorizontal: 10,
    minHeight: '35%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 5,
    padding: 6,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    zIndex: 9,
  },
  fullScreenProfileImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
