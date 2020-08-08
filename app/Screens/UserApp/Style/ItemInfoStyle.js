import { StyleSheet, Platform, Dimensions } from 'react-native';
import Colors from '../../../Assets/Themes/Colors';
export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
export const HEADER_MAX_HEIGHT = 250;
export const HEADER_MIN_HEIGHT = 60;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.pureBG,
    },
    editContainer: {
        backgroundColor: Colors.pureBG,
        borderTopLeftRadius: 15,
        paddingTop: 20,
        borderTopRightRadius: 15
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    DetailAvatar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 6,
        height: width / 6,
        borderRadius: (width / 6) / 2,
    },
    avatarTxt: {
        fontSize: width / 20,
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
    detailHeader: {
        flexDirection: "row",
        marginLeft: 10,
        justifyContent: 'space-between'
    },
    DetailTitle: {
        color: Colors.pureTxt,
        fontSize: width / 18,
        fontFamily: 'Roboto_medium',
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
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        backgroundColor: Colors.mainBG,
        resizeMode: 'cover',
    },
    bar: {
        marginTop: 20,
        height: 25,
        alignItems: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: Colors.pureBG,
        paddingHorizontal: 2,
        fontWeight: '900',
        fontSize: width / 20,
        fontFamily: 'Roboto_medium',
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
        backgroundColor: 'transparent'
    },
    eMage: {
        width: width,
        opacity: 0.8,
        height: height / 2,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        elevation: 3,
        marginTop: height / 2.2,
        position: 'absolute',
    },
    content: {
        elevation: 0,
        backgroundColor: Colors.pureBG,
        margin: 10,
        marginVertical: 14,
        borderRadius: 2,
        elevation: 1,
    },
    itemContainer: {
        flexDirection: "row",
        margin: 0,
        width: width,
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 14,
    },
    actionIcon: {
        position: 'absolute',
        top: '40%',
        right: 30
    },
    infoTitle: {
        fontSize: width / 23,
        color: Colors.pureTxt,
        paddingHorizontal: 10,
        fontFamily: 'Roboto_medium',
    },
    info: {
        fontSize: width / 25,
        opacity: Platform.OS === 'ios' ? 1 : 0.7,
        paddingLeft: 12,
        paddingRight: 10,
        color: Colors.pureTxt,
        fontFamily: 'Roboto',
    },
    phone: {
        fontSize: width / 25,
        opacity: Platform.OS === 'ios' ? 1 : 0.7,
        color: Colors.pureTxt,
        fontFamily: 'Roboto_medium',
    },
    buttonContainer: {
        height: height / 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: width,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: Colors.pureBG,
    },
    button: {
        height: height / 14,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: 3,
        width: width
    },
    retryButton: {
        height: height / 14,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: 0,
        borderRadius: 50,
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: Colors.pureBG,
        fontFamily: 'Roboto_medium',
    },
    retryText: {
        color: Colors.primary,
        fontFamily: 'Roboto',
        opacity: 0.6
    },
    linearseparator: {
        flex: 1,
        height: 2,
        width: width,
        margin: 0
    },
    recent: {
        alignItems: 'baseline',
        justifyContent: 'space-evenly',
        alignContent: 'space-between',
        flexDirection: "row",
        elevation: 1,
        paddingBottom: 0,
        backgroundColor: Colors.pureBG
    },
    category: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: 'flex-start',
        elevation: 0,
        padding: 5,
        borderRadius: 100
    },
    recenTitle: {
        fontSize: width / 30,
        color: Colors.primary,
        fontFamily: 'Roboto'
    }
});