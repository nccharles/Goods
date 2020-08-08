import { Dimensions, StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../../Assets/Themes'

const {width,height}= Dimensions.get('window')
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pureBG
  },
  list: {
    paddingTop: 20,
  },
  row: {
    flex: 1,
    width: width - 20,
    height: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5.0,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: Colors.mainBG,
    marginVertical: 2,
    margin: 10,
    paddingVertical: 10,
    borderRadius: Metrics.smallMargin,
    flexDirection: 'row'
  },
  boldLabel: {
    paddingVertical: 2,
    fontFamily: 'Roboto',
    fontSize: width / 25,
    color: Colors.pureTxt,
  },
  label: {
    paddingVertical: 5,
    fontFamily: 'Roboto',
    color: Colors.pureTxt,
    fontSize: width / 30
  },

  image: {
    width: 80,
    height: 90,
    borderRadius: 5,
    marginLeft: 10
  },
  textHead: {
    marginLeft: 5,
    fontSize: width / 20,
    fontFamily: 'Roboto',
    textAlign: 'center'
  },
  cardContainer: {
    height: height - 5,
    width: width - 5,
    backgroundColor: Colors.pureBG
  },
  buttonContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: Colors.pureTxt,
    borderRadius: 20,
    height: 40,
    width: 200,
    alignSelf: 'center'
  },
  disclaimerText: {
    marginTop: 30,
    paddingHorizontal: 15,
    opacity: 0.7,
    fontSize: 12,
    color: Colors.mainTxt,
    fontFamily: 'Roboto_medium',
  },
  currScroll: {
    paddingVertical: 10,
    elevation:3,
    height: width / 1.3
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },
  itemTitle: {
    color: Colors.pureTxt,
    fontSize: width / 35,
    paddingHorizontal:5,
    textTransform:'uppercase',
    fontWeight: 'bold',
    fontFamily: 'Roboto_medium',
  },
})
