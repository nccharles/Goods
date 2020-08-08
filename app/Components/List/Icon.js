import { StatusBar, StyleSheet } from 'react-native';
import { Colors } from '../../Assets/Themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    paddingVertical: StatusBar.currentHeight + 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pureBG,
  },
  inputContainer: {
    height: 48,
    flexDirection: 'row',
    width: '95%',
    paddingHorizontal: 8,
    backgroundColor: Colors.pureBG,
  },
  input: {
    height: 47,
    width: '95%',
    paddingHorizontal: 8,
    backgroundColor: Colors.pureBG,
    fontSize: 18,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    paddingHorizontal: 8,
    color: Colors.mainTxt,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: Colors.mainTxt
  }
});