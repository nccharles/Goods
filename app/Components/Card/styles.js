import { Dimensions, StyleSheet } from 'react-native'
import { Colors } from '../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
  row: {
    flex: 1,
    alignSelf: 'center',
    width: screenwidth - 5,
    height: screenheight / 8,
    backgroundColor: Colors.pureBG,
    marginVertical: 5
  },
  left: {
    width: 20,
    backgroundColor: Colors.pureBG,
    borderRadius: 30,
    marginLeft: -12
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  leftContainer: {
    flex: 4,
  },
  leftCategory: {
    position: 'absolute',
    left: 15,
    bottom: 1
  },
  boldLabel: {
    position: 'absolute',
    left: 15,
    top: 8,
    fontSize: screenwidth / 25,
    fontFamily: 'Roboto',
    color: Colors.mainTxt,

  },
  label: {
    color: Colors.mainTxt,
    fontSize: screenwidth / 30,
    position: 'absolute',
    left: 15,
    bottom: 15,
    fontFamily: 'Roboto',
  },
  label2: {
    color: Colors.mainTxt,
    fontSize: screenwidth / 30,
    position: 'absolute',
    left: 15,
    bottom: 0,
    fontFamily: 'Roboto',
  },
  icon_btn: {
    position: "absolute",
    bottom: 0,
    left: 30
  },
  amount: {
    fontSize: screenwidth / 30,
    color: Colors.pureTxt,
    fontFamily: 'Roboto',
  },
  time: {
    fontSize: screenwidth / 30,
    color: Colors.mainTxt,
    top: 2,
    fontFamily: 'Roboto_medium',
  },
  currencyName: {
    fontSize: screenwidth / 30,
    color: Colors.pureTxt,
    fontFamily: 'Roboto',
    marginLeft: 5
  },
  rightContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rightCategory: {
    fontSize: screenwidth / 30,
    color: Colors.pureTxt,
    fontFamily: 'Roboto',
    position: 'absolute',
    right: 15,
    top: 10
  },
  flag_icon: {
    width: screenwidth / 12,
    height: screenheight / 20,
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 15
  },
  equivalentContainer: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    flexDirection: 'row'
  },
  updated: {
    position: 'absolute',
    right: 15,
    bottom: 0,
    color: Colors.mainTxt,
    fontSize: screenwidth / 35,
    fontFamily: 'Roboto',
  },
  parent: {
    flex: 1,
    width: screenwidth - 30,
    height: screenheight / 10,
    flexDirection: 'row',
    backgroundColor: Colors.pureBG,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: screenwidth - (screenwidth - 5),
  },
  mapCard:{
    flex: 1,
    width: screenwidth,
    height: screenheight / 10,
    backgroundColor: Colors.pureBG,
    alignSelf: 'center',
    justifyContent: 'space-between',
    position: "absolute",
    top:0,
    elevation: 0,
    padding: 10
  },
  imageContainer: {
    borderWidth: 0.5,
    width: screenwidth / 6,
    height: screenheight / 17,
    marginLeft: screenwidth - (screenwidth - 8),
    justifyContent: 'center',
    alignSelf: 'center'
    
  },
  leftRectangular: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  FlagContainer: {
    width: screenwidth / 8,
    height: screenheight / 19,
    marginLeft: 5,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  leftFlag: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageChatContainer: {
    borderWidth: 0,
    width: screenwidth / 8,
    height: screenwidth / 8,
    borderRadius: screenwidth / 8,
    marginLeft: 8,
    backgroundColor: Colors.pureBG,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  iconContainer:{
    borderWidth: 0,
    width: screenwidth / 8,
    height: screenwidth / 8,
    borderRadius: screenwidth / 8,
    marginRight: 8,
    backgroundColor: Colors.mainBG,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  leftCircle: {
    fontSize: screenwidth / 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  center: {
    height: '100%',
    flex: 0.90,
    flexDirection: 'column',
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  titleContainer: {
    justifyContent: 'center'
  },
  subTitleContainer: {
    justifyContent: 'center'
  },
  title: {
    color: Colors.pureTxt,
    fontSize: screenwidth / 25,
    fontFamily: 'Roboto_medium',
  },
  subTitle: {
    color: Colors.mainTxt,
    fontSize: screenwidth / 30,
    fontFamily: 'Roboto',
  },
  oDate: {
    color: Colors.mainTxt,
    opacity: 0.6,
    fontSize: screenwidth / 40,
    fontFamily: 'Roboto_medium',
  },
  right: {
    height: '100%',
    position: 'absolute',
    paddingRight: 0,
    right: 0,
    top: 0,
    justifyContent: 'space-evenly',
    backgroundColor: Colors.pureBG,
  },
  senttime: {
    paddingRight: 0,
    flexDirection: 'column',
    paddingVertical: 0,
    justifyContent: 'space-evenly',
    backgroundColor: Colors.pureBG,
  },
  message: {
    justifyContent: 'flex-end',
    marginRight: 0,
    marginBottom: 0,
  },
  separator: {
    flex: 1,
    height: 0.5,
    width: screenwidth,
    backgroundColor: Colors.pureBG,
    // margin: 8
  },
  Currenciesseparator: {
    flex: 1,
    height: 1,
    width: screenwidth - 5,
    backgroundColor: 'transparent',
    // margin: 8
  },
  Chatseparator: {
    flex: 1,
    height: 1,
    width: screenwidth - 10,
    backgroundColor: 'transparent',
    marginLeft: screenwidth / 5
  }

});
