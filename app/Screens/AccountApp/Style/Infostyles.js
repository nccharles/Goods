import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../../Assets/Themes';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.pureBG,
    },
    logo: {
        color: Colors.pureTxt,
        opacity: 0.7,
        fontFamily: 'Roboto',
        fontSize: 40,
        marginTop: height * .2,
        marginLeft: width * .05,
    },
    input: {
        color: Colors.pureTxt,
        borderRadius: 5,
        marginTop: height * .05,
        alignSelf: 'center',
        height: height / 16,
        width: width - 50,
    },
    picker: {
        borderRadius: 5,
        // marginTop: height * .05,
        marginLeft: width / 5,
        marginRight: width / 5,
        height: 40,
        borderTopWidth: 1,
        borderTopColor: Colors.mainTxt,
        borderRightWidth: 1,
        borderRightColor: Colors.mainTxt,
        borderLeftWidth: 1,
        borderLeftColor: Colors.mainTxt,
        borderBottomWidth: 1,
        borderBottomColor: Colors.mainTxt,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        color: Colors.pureTxt,
    },
    button: {
        backgroundColor: Colors.mainBG,
        marginTop: height * .05,
        width: width - 50,
        height: height / 14,
        alignContent: 'center',
        justifyContent: 'center',
        elevation: 3,
        fontFamily: 'Roboto',
        color: Colors.pureTxt,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    inputStyle: {
        color: Colors.pureTxt,
        textDecorationLine: 'none',
    },
    placesContainer: {
        position: 'relative',
        width: width / 1.2,
        elevation: 1,
        alignSelf: 'center',
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
    },
    placeIcon: {
        alignSelf: 'flex-end',
    },
    placeList: {
        top: 10,
        width: width / 1.2,
        alignSelf: 'center',
        borderBottomColor: Colors.mainBG,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
    label: {
        marginLeft: height * .02,
        // marginTop: 10,
        fontSize: width / 20,
        color: Colors.pureTxt,
        fontFamily: 'Roboto',
    },
    ilabel: {
        marginLeft: height * .08,
        flex: 1,
        flexDirection: 'row',
        marginTop: height * .04,
        fontFamily: 'Roboto',
    },
});
export default styles;