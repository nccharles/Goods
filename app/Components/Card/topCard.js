import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, Metrics } from '../../Assets/Themes'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const TopCard = (props) => {
    const {
        onPressOrder, vendor, hours, type, stock } = props

    return (
        <View style={styles.Cardcontainer}>
                <FontAwesome5
                    name="shipping-fast"
                    size={50}
                    color={Colors.mainTxt} />
                <View style={styles.vendor}>
                    <Text style={styles.vendorTitle} >
                        {vendor}
                    </Text>

                    <View style={styles.ItemInfo}>
                        <Text style={styles.vendorHours} >
                            {hours}
                        </Text>

                        <MaterialCommunityIcons
                            name="cart-outline"
                            size={18}
                            color={Colors.mainTxt} />
                        <Text style={styles.vendorStock} >
                            Price
                        </Text>
                    </View>
                </View>
        </View>
    )
}

TopCard.propTypes = {
    onPressOrder: PropTypes.func,
    hours: PropTypes.string,
    vendor: PropTypes.string,
    type: PropTypes.string,
    stock: PropTypes.string,
}
const styles = StyleSheet.create({
    Cardcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.pureBG,
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        padding: 10,
        alignSelf: 'center',
        elevation: 1,
        justifyContent: 'flex-start',
        height: width / 5
    },
    image: {
        width: width / 5.5,
        height: width / 3.8
    },
    vendorTitle: {
        fontFamily: 'Roboto_medium',
        fontSize: width / 20,
        paddingHorizontal: 2,
        color: Colors.pureTxt,
        alignSelf: 'center',
        fontWeight: 'bold',
        opacity: 0.8
    },
    vendor: {
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        width: width / 1.5,
    },
    ItemInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    vendorHours: {
        fontSize: width / 30,
        color: Colors.primary,
        borderRadius: 50,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    vendorStock: {
        fontSize: width / 25,
        color: Colors.mainTxt,
        fontFamily: 'Roboto'
    }

})
export default TopCard
