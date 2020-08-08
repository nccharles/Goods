import { Dimensions, StyleSheet } from 'react-native'
import { Colors } from '../../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.pureBG
    },
    card:{
      backgroundColor: Colors.pureBG  
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: screenwidth / 6,
        height: screenwidth / 6,
        borderRadius: (screenwidth / 6) / 2,
    },
    avatarTxt: {
        fontSize: screenwidth / 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Roboto',

    },
    titleContainer: {
        flex: 1,
        flexDirection: "column",
        alignSelf: 'center',
        marginVertical: 10,
        justifyContent: 'space-around',
        marginLeft: 10
    },
    header: {
        flexDirection: "row",
        marginLeft: 10,
        marginTop: 2,
        justifyContent: 'space-evenly'
    },
    title: {
        color: Colors.pureTxt,
        fontSize: screenwidth / 18,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        paddingTop: 5,
    },
    contactContainer: {
        flexDirection: "row",
        marginLeft: 10,
        justifyContent: 'space-between'
    },
    contacts: {
        fontFamily: 'Roboto',
        marginRight: 15,
    },
    separator: {
        flex: 1,
        height: 0.5,
        width: screenwidth,
        backgroundColor: Colors.pureBG,
        margin: 8
    },
    linearseparator: {
        flex: 1,
        height: 1,
        width: screenwidth,
        margin: 0
    },
    itemContainer: {
        flexDirection: "row",
        marginLeft: 10,
        paddingVertical: 20
    },
    infocontent: {
        marginLeft: 20,
        fontSize: screenwidth / 30,
        fontFamily: 'Roboto_medium',

    },
    itemTitle: {
        paddingVertical: 15,
        color: Colors.pureTxt,
        fontFamily: 'Roboto',
    },
    infoTitle: {
        fontSize: screenwidth / 25,
        color: Colors.pureTxt,
        fontFamily: 'Roboto',
    },
    info: {
        fontSize: screenwidth / 30,
        opacity: .7,
        color: Colors.pureTxt,
        fontFamily: 'Roboto_medium',
    }
})