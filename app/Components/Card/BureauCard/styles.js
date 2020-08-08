import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, Colors } from '../../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.pureBG,
    flexDirection: 'column',
    marginVertical: 5,
    alignItems: 'center',
    width: screenwidth - 15,
    alignSelf: 'center',
    elevation: 0,
    justifyContent: 'flex-start',
    height: 'auto',
    borderRadius: 20,
    backgroundColor: Colors.pureBG

  },
  left: {
    width: 20,
    height: screenheight / 10,
    marginVertical: 8,
    backgroundColor: Colors.pureBG,
    borderRadius: 40,
    marginLeft: -12
  },
  image: {
    width: '20%',
    marginRight: 5,
    borderTopLeftRadius:20,
    height: screenwidth / 4.5,
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  details: {
    flexDirection: 'row',
    width: screenwidth - 15,
    justifyContent: 'flex-start'
  },
  leftContainer: {
    flex: 2.5,
    justifyContent: 'center'
  },
  category: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: Colors.mainTxt,
    fontSize: screenwidth / 15,
    marginLeft: 20
  },
  boldLabel: {
    fontFamily: 'Roboto',
    fontSize: screenwidth / 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  NormalLabel: {
    fontFamily: 'Roboto',
    fontSize: screenwidth / 28,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: Colors.pureTxt,
  },
  label: {
    color: Colors.mainTxt,
    fontFamily: 'Roboto_medium',
    textDecorationColor: Colors.green,
    fontSize: screenwidth / 30,
  },
  Label: {
    color: Colors.mainTxt,
    fontFamily: 'Roboto_medium',
    textTransform: 'uppercase',
    fontSize: screenwidth / 35,
  },
  mediumLabel: {
    color: Colors.primary,
    fontFamily: 'Roboto_medium',
    fontSize: screenwidth / 30,
  },
  smallLabel: {
    fontFamily: 'Roboto',
    fontSize: screenwidth / 32,
    fontWeight: '100',
    color: Colors.pureTxt,
  },
  addressLabel: {
    fontFamily: 'Roboto',
    fontSize: screenwidth / 32,
    fontWeight: '300',
    textTransform: 'uppercase',
    color: Colors.pureTxt,
  },
  iconBtn: {
    position: 'absolute',
    right: 15,
    top: 5
  },
  updated: {
    color: Colors.green,
    position: 'absolute',
    right: 10,
    bottom: 5,
    fontFamily: 'Roboto',
    fontSize: screenwidth / 30
  },
  contacts:{
    width: screenwidth - 15,
    borderTopWidth: 2,
    borderColor: Colors.mainBG,
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-evenly',
    opacity: .6,
  }
})
