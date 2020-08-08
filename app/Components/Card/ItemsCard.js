import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, Metrics } from '../../Assets/Themes'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const ItemsCard = (props) => {
    const {
        onPress, vendor, hours, type, stock } = props

    return (
        <View style={styles.Cardcontainer}>
            <TouchableOpacity
                style={styles.Button}
                onPress={onPress}>
                <Image source={type === 'gas' ? require('../../Assets/Icons/gas.png') : require('../../Assets/Icons/waterBottle.png')} style={styles.image} />
                <View style={styles.vendor}>
                    <Text style={styles.vendorTitle} >
                        {vendor.toUpperCase()}
                    </Text>

                    <View style={styles.ItemInfo}>
                        <Text style={styles.vendorHours} >
                            {hours}
                        </Text>
                        <Text style={styles.vendorStock} >
                            {stock}
                        </Text>

                    </View>
                </View>
                <MaterialCommunityIcons
                    name="chevron-right"
                    size={30}
                    style={styles.rightIcon}
                    color={Colors.mainTxt} />
            </TouchableOpacity>
        </View>
    )
}

ItemsCard.propTypes = {
    onPress: PropTypes.func,
    hours: PropTypes.string,
    vendor: PropTypes.string,
    type: PropTypes.string,
    stock: PropTypes.string,
}
const styles = StyleSheet.create({
    Cardcontainer: {
        flex: 1,
        alignSelf: 'center'
    },

    Button: {
        backgroundColor: Colors.pureBG,
        flexDirection: 'row',
        marginVertical: 5,
        width: width - 15,
        padding: 10,
        alignSelf: 'center',
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: width / 4,
    },
    image: {
        width: width / 15,
        height: height / 15,
        marginRight: width / 20
    },
    vendorTitle: {
        fontFamily: 'Roboto_medium',
        fontSize: width / 30,
        paddingHorizontal: 2,
        color: Colors.pureTxt,
        fontWeight: 'bold',
        opacity: 0.8
    },
    vendor: {
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        width: width / 1.4,
    },
    ItemInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    vendorHours: {
        fontSize: width / 35,
        color: Colors.mainTxt,
        backgroundColor: Colors.pureBG,
        borderRadius: 50,
        paddingVertical: 5,
        elevation: 1,
        fontFamily: 'Roboto'
    },
    vendorStock: {
        fontSize: width / 30,
        color: Colors.mainTxt,
        fontFamily: 'Roboto',
        opacity: .7
    },
    rightIcon: {
        alignSelf: 'center'
    }
})
export default ItemsCard
