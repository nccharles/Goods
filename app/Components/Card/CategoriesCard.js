import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics } from '../../Assets/Themes'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const CategoriesCard = (props) => {
    const { onPressWater, onPressGas,onPress } = props

    return (
        <ScrollView horizontal={true} style={styles.Cardcontainer}>
            <TouchableOpacity
                style={styles.Button}
                onPress={onPress}>
                <View style={styles.vendor}>

                    <Ionicons name='ios-basket' style={styles.icon} size={40} color={Colors.secondary} />
                    <View style={styles.Info}>
                        <View style={styles.ItemInfo}>

                            <Text style={styles.vendorTitle} >
                               all Items
                    </Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
            <TouchableOpacity
                style={styles.Button}
                onPress={onPressWater}>
                <View style={styles.vendor}>
                    <Image source={require('../../Assets/Icons/waterBottle.png')} style={styles.image} />
                    <View style={styles.Info}>
                        <View style={styles.ItemInfo}>
                            <Text style={styles.vendorTitle} >
                                ORDER WATER
                    </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.Button}
                onPress={onPressGas}>
                <View style={styles.vendor}>

                    <Image source={require('../../Assets/Icons/gas.png')} style={styles.image} />
                    <View style={styles.Info}>
                        <View style={styles.ItemInfo}>

                            <Text style={styles.vendorTitle} >
                                ORDER GAS
                    </Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>

        </ScrollView>
    )
}

CategoriesCard.propTypes = {
    onPressGas: PropTypes.func,
    onPressWater: PropTypes.func,
    onPress: PropTypes.func,
}
const styles = StyleSheet.create({
    Cardcontainer: {
        flex: 1,
        paddingVertical: 5,
        marginBottom: 10,
        flexDirection: 'row',
    },

    Button: {
        backgroundColor: Colors.pureBG,
        marginBottom: 2,
        width: width / 3,
        padding: 4,
        alignSelf: 'center',
        justifyContent: 'center',
        height: width / 4,
        borderRadius: width / 4,
    },
    image: {
        width: width / 12,
        alignSelf: 'center',
        height: width / 8
    },
    icon: {
        alignSelf: 'center',
    },
    vendorTitle: {
        fontFamily: 'Roboto_medium',
        fontSize: width / 35,
        alignSelf: 'center',
        textTransform: 'capitalize',
        color: Colors.pureTxt,
    },
    vendor: {
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        width: width / 1.2,
    },
    ItemInfo: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: width / 2,
        opacity: .8
    },

    details: {
        fontSize: width / 40,
        width: width / 2.5,
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.pureTxt,
        fontFamily: 'Roboto'
    }

})
export default CategoriesCard
