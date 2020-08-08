import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import Foundation from 'react-native-vector-icons/Foundation'
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, Metrics } from '../../Assets/Themes'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const OptionModal = (props) => {
    const {
        onPressVendor,
        onPressOrder } = props

    return (
        <View style={styles.Modalcontainer}>
        <View style={[styles.Modalcontainer,styles.buttonContainer]}>
            <LinearGradient
                colors={Colors.gradientColors}
                start={{ x: 1.0, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.Buttons}
            >
                <TouchableOpacity
                    style={[styles.Buttons, { backgroundColor: Colors.mainBG }]}
                    onPress={onPressVendor}>
                    <Foundation
                        name="burst-sale"
                        size={20}
                        color={Colors.primary} />
                    <Text style={[styles.buttonText,{color:Colors.primary}]} >
                        Sale Products
                        </Text>
                </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
                colors={Colors.gradientColors}
                start={{ x: 1.0, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.Buttons}

            >
                <TouchableOpacity
                    style={[styles.Buttons, { backgroundColor: Colors.primary }]}
                    onPress={onPressOrder}>
                    <MaterialCommunityIcons
                        name="cart-plus"
                        size={20}
                        color={'white'} />
                    <Text
                        style={styles.buttonText}
                    >
                        Order Products
                        </Text>
                </TouchableOpacity>
            </LinearGradient>
            </View>
        </View>
    )
}

OptionModal.propTypes = {
    onPressVendor: PropTypes.func,
    onPressOrder: PropTypes.func,
}
const styles = StyleSheet.create({
    Modalcontainer: {
        flexDirection: 'column',
        position: 'absolute',
        right: 2,
        bottom: 0,
        left: 2,
        padding: 20,
        alignSelf: 'center',
        height: height,
        marginBottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        elevation: 3,
        zIndex:99
    
    },

    Buttons: {
        backgroundColor: Colors.mainBG,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginVertical: 4,
        alignSelf: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.primary,
        elevation: 0,
        justifyContent: 'center',
        width: width-10,
        height: height / 14,
    },
    buttonText: {
        fontFamily: 'Roboto_medium',
        fontSize: width / 30,
        paddingHorizontal: 2,
        color: 'white',
        fontWeight: 'bold',
        opacity: 0.8
    },
    buttonContainer: {
        height: width/1.5,
        borderRadius: 10,
        alignItems:'baseline',
        justifyContent: 'center',
        borderTopLeftRadius: width/20,
        borderTopRightRadius: width/20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mainBG,
        borderRadius: 5,
    },
})
export default OptionModal
