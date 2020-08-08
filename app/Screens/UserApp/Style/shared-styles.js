import { StatusBar, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../Assets/Themes';

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pureBG
  },
  inputContainer: {
    height: screenheight / 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    width: screenwidth - 1,
    paddingHorizontal: 8,
    backgroundColor: Colors.mainBG,
  },
  input: {
    height: 47,
    width: '99%',
    paddingHorizontal: 8,
    backgroundColor: Colors.pureBG,
    fontSize: 18,
  },
  buttonContainer: {
    height: (screenheight / 11) - 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.mainTxt,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 20,
    paddingHorizontal: 16,
    color: Colors.mainTxt,
    fontFamily: 'Roboto',
  },
  groupText: {
    fontSize: screenwidth/45,
    paddingHorizontal: 16,
    fontWeight: 'bold',
    textTransform:'uppercase',
    color: Colors.pureTxt,
    fontFamily: 'Roboto',
  },
  separator: {
    height: '100%',
    width: StyleSheet.hairlineWidth,
    backgroundColor: Colors.pureBG,
  },
  list: {
    width: '99%',
    paddingTop: 10,
    backgroundColor: Colors.pureBG
  }
});

export default styles