
import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../Assets/Themes'

const screenWidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({

    container: {
        position:'relative',
        top:0,
        left:0,
        right:0,
        width:'100%',
        backgroundColor: Colors.pureBG,
        height: screenheight / 10,
        elevation: 3,
        zIndex: 99
    },
    company: {
        backgroundColor: Colors.pureBG,
        height: screenheight / 8,
        width: screenWidth,
        elevation: 0,
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        marginVertical: screenheight / 25,
    },
    staticHeader: {
        backgroundColor: Colors.pureBG,
        elevation: 1,
        height: screenheight / 8,
        width: screenWidth,
    },
    input: {
        width: screenWidth / 1.4,
        borderRadius:20,
        paddingVertical: 0,
    },
    inputStyle: {
        borderBottomWidth: 0
    },
    iContainer: {
        backgroundColor: 'transparent',
        height: 60,
        width: screenWidth,
        position: 'absolute',
        marginTop: 18
    },
    iWrapper: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    title: {
        color: Colors.pureTxt,
        fontSize: screenWidth / 20,
        fontFamily: 'Roboto',
        marginLeft: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 25
    },
    ChatStatus: {
        flexDirection: 'column',
        color: Colors.green,
        marginLeft: 15,
        top: -2,
        fontFamily: 'Roboto',
        marginBottom: 6,
    },
    companyInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 50,
        paddingRight: 10
    },
    chattitle: {
        color: Colors.pureTxt,
        fontSize: screenWidth / 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    companyTitle: {
        color: Colors.pureTxt,
        fontSize: screenWidth / 20,
        marginRight: 20,
        fontFamily: 'Roboto',
    },
    bgIcon: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 100,
    },
    companyOptions: {
        resizeMode: "contain",
        marginBottom: 30,
        width: screenWidth / 18,
        height: screenWidth / 18,
    },
    StatusText: {
        color: Colors.primary,
        fontFamily: 'Roboto',
    },
    button: {
        marginRight: 35
    },
    image1: {
        tintColor: Colors.pureTxt,
        width: screenWidth / 14,
        height: screenWidth / 14,
        marginVertical: 2.5
    },
    image2: {
        tintColor: Colors.pureTxt,
        width: screenWidth / 16,
        height: screenWidth / 16,
        marginVertical: 5
    },
})
