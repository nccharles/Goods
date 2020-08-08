import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../Assets/Themes'
const {width,height} = Dimensions.get('window')
export default StyleSheet.create({
  wrapper: {
    flex:1,
    padding: 0,
    backgroundColor: Colors.pureBG,
  },
  contentWrapper:{
    width: width,
    marginTop:10,
    padding: 20,
    backgroundColor: Colors.pureBG,
  },
  Title:{
    color: Colors.pureTxt,
    fontSize: width / 25,
    textTransform:'uppercase',
    fontWeight: 'bold',
    fontFamily: 'Roboto_medium',
  },
  simpleTitle:{
    color: Colors.pureTxt,
    fontSize: width / 28,
    marginBottom:5,
    textTransform:'uppercase',
    fontFamily: 'Roboto_medium',
  },
  text: {
    color: Colors.mainTxt,
    fontSize: width / 30,
    fontFamily: 'Roboto',
    marginBottom:10,
  },

  sideLine:{
    backgroundColor: Colors.primary,
     height: 1, 
     flex: 1, 
     alignSelf: 'center'
  },
  centerText:{
    color: Colors.pureTxt,
    backgroundColor: Colors.mainBG,
    alignSelf: 'center',
    borderRadius: 12,
    paddingVertical: 5, 
    elevation:1,
    marginHorizontal: 2,
    paddingHorizontal: 5, 
    fontSize: width/30,
    textTransform:'uppercase'
  }
})