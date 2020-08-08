import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pureBG,
  },
  MainStyle: {
    flex: 1,
    width: screenwidth,
    height: screenheight / 10,
    flexDirection: 'row',
    backgroundColor: Colors.pureBG,
    alignSelf: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
  leftRound: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    marginLeft: 5,
    marginVertical: 2.5,
    justifyContent: 'center',
  },
  leftHide: {
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    marginLeft: 5,
    justifyContent: 'center',
  },
  leftRectangular: {
    flex: 1,
    // alignSelf: 'stretch',
    height: null,
    width: null
  },
  center: {
    height: '100%',
    flex: 0.90,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 10,

  },
  right: {
    height: '100%',
    position: 'absolute',
    paddingRight: 8,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: Colors.pureBG,
  },
  titleContainer: {
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  subTitleContainer: {
    justifyContent: 'center',
    fontFamily: 'Roboto_medium',
  },
  title: {
    fontFamily: 'Roboto',
    color: Colors.pureTxt,
    fontSize: screenwidth / 30
  },
  subTitle: {
    fontFamily: 'Roboto',
    color: Colors.pureTxt,
    fontSize: screenwidth / 35
  },
  amount: {
    fontSize: screenwidth / 25,
    fontFamily: 'Roboto',
    color: Colors.mainTxt
  },
  imageContainer: {
    borderWidth: 0.5,
    width: screenwidth / 6,
    height: screenheight / 17,
    marginLeft: 5,
    marginVertical: 5,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  separator: {
    flex: 1,
    height: 0.2,
    width: screenwidth - 5,
    backgroundColor: Colors.mainBG,
  },

});

export default styles;