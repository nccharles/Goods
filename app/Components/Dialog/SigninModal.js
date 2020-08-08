import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, Metrics } from '../../Assets/Themes'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const SigninModal = (props) => {
    const {
        onPressLogin,
        onPressSignup } = props

    return (
        <View style={styles.Modalcontainer}>
            <LinearGradient
                colors={Colors.gradientColors}
                start={{ x: 1.0, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.Buttons}
            >
                <TouchableOpacity
                    style={styles.Buttons}
                    onPress={onPressLogin}>
                    <AntDesign
                        name="login"
                        size={23}
                        color={Colors.blue} />
                    <Text style={styles.buttonText} >
                        Login
                        </Text>
                </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.centerTxt}>Or</Text>
            <LinearGradient
                colors={Colors.gradientColors}
                start={{ x: 1.0, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.Buttons}

            >
                <TouchableOpacity
                    style={styles.Buttons}
                    onPress={onPressSignup}>
                    <MaterialCommunityIcons
                        name="account-plus-outline"
                        size={23}
                        color={Colors.red} />
                    <Text
                        style={styles.buttonText}
                    >
                        Create an account
                        </Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

SigninModal.propTypes = {
    onPressLogin: PropTypes.func,
    onPressSignup: PropTypes.func,
}
const styles = StyleSheet.create({
    Modalcontainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        padding: 10,
        alignSelf: 'center',
        height: height/5,
        justifyContent: 'space-between',
        marginBottom: 0,
        backgroundColor: Colors.mainBG,
        elevation: 3
    },

    Buttons: {
        backgroundColor: "transparent",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        elevation:1,
        justifyContent: 'space-around',
        width: width / 2.5,
        height: height/12,
        borderRadius: Metrics.baseMargin,
    },
    buttonText: {
        fontFamily: 'Roboto',
        fontSize: width / 30,
        paddingHorizontal: 2,
        color: Colors.mainTxt,
        fontWeight: 'bold',
        opacity: 0.8
    },
    buttonContainer: {
        height: height / 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.mainTxt,
    },

    centerTxt: {
        alignItems: 'center',
        color: Colors.pureTxt,
        justifyContent: 'center',
        fontFamily: 'Roboto',
        fontSize: width / 30,
        fontWeight:'bold',
        marginTop: 12
    }
})
export default SigninModal
