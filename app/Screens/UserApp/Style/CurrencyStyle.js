import { Dimensions, Platform, StyleSheet } from 'react-native'
import {  Metrics, Colors } from '../../../Assets/Themes'

const INPUT_HEIGHT = 48
const BORDER_RADIUS = 4
const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pureBG
  },
  row: {
    flex: 1,
    width: screenwidth - 20,
    height: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5.0,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: Colors.mainBG,
    marginVertical: 10,
    margin: 10,
    paddingVertical: 10,
    borderRadius: Metrics.smallMargin,
    flexDirection: 'row'
  },
  boldLabel: {
    flex: 1,
    fontSize: screenwidth / 25,
    fontFamily: 'Roboto',
    color: Colors.pureTxt,
  },
  label: {
    flex: 1,
    fontFamily: 'Roboto_medium',
    color: Colors.pureTxt
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  image: {
    width: 80,
    height: 90,
    borderRadius: 5,
    marginLeft: 10
  },
  textHead: {
    marginLeft: 5,
    fontSize: screenwidth / 20,
    textAlign: 'center',
    fontFamily: 'Roboto_medium',
  },
  cardContainer: {
    height: screenheight - 5,
    width: screenwidth - 5,
    backgroundColor: Colors.pureBG
  },
  searchBar: {
    backgroundColor: Colors.pureBG
  },
  input: {
    height: INPUT_HEIGHT,
    fontSize: screenwidth / 22,
    paddingHorizontal: 8,
    color: Colors.pureTxt,
    borderWidth: 1,
    borderColor: Colors.pureTxt,
    borderRadius: 10
  },
})
