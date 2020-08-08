import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Metrics } from '../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height


const styles = StyleSheet.create({

  actionButtonIcon: {
    color: Colors.pureTxt,
  },
  button: {
    backgroundColor: Colors.mainBG,
    marginVertical: 20,
    height: screenheight / 16,
    borderRadius: 5,
    width: screenwidth - 30,
    alignContent: 'center',
    justifyContent: 'center',
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.mainTxt,
    fontSize: screenwidth / 22,
    fontFamily: 'Roboto',
    paddingHorizontal: 5
  },
  cartbutton: {
    width: screenwidth / 6,
    height: screenwidth / 6,
    borderRadius: screenwidth / 6,
    backgroundColor:Colors.primary,
    opacity:.7,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 10,
    elevation: 3
  },
  roundButton: {
    position: 'absolute',
    right: 40,
    bottom: 30,
    backgroundColor: Colors.mainBG,
    width: screenwidth / 5,
    height: screenwidth / 5,
    borderRadius: screenwidth / 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1
  },
  image: {
    tintColor: Colors.mainTxt,
  },
  buttonContainer: {
    backgroundColor: Colors.mainBG,
    marginBottom: 10,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: Colors.mainBG,
    borderBottomRightRadius: Metrics.smallMargin,
    borderBottomLeftRadius: Metrics.smallMargin,
    height: screenheight / 25,
    width: screenwidth - 5,
    alignSelf: 'center',
    elevation: 1
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  headerBtn: {
    marginRight: 20
  },
  headerImg: {
    tintColor: Colors.mainTxt,
    width: screenwidth / 16,
    height: screenwidth / 16,
  }
});

export default styles;