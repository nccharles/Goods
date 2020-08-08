import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import NumericInput from '../NumericInput'
import { Colors, Metrics } from '../../Assets/Themes'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const CartCard = ({ item, iQty, onChange, price, picture, company, type, Qty }) => {
    return (
        <View style={styles.Cardcontainer}>
            <Image source={type === 'gas' ? require('../../Assets/Icons/gas.png') : !picture ? require('../../Assets/Icons/waterBottle.png') : { uri: picture }} style={styles.image} />
            <View style={styles.item}>
                <Text style={styles.itemTitle} >
                    {item.toUpperCase()}
                </Text>
                <View style={styles.ItemInfo}>
                    <Text style={styles.itemprice} >
                        {company}
                    </Text>
                </View>
                <View style={styles.ItemInfo}>
                    <Text style={styles.itemprice} >
                        {price}
                    </Text>
                    <Text style={styles.itemQty} >
                        {Qty}
                    </Text>

                </View>
            </View>
            <NumericInput
                onChange={onChange}
                totalWidth={width / 3.5}
                totalHeight={width / 10}
                iconSize={20}
                value={iQty}
                step={1}
                minValue={0}
                maxValue={1000}
                editable={false}
                valueType='real'
                separatorWidth={0}
                borderColor={'transparent'}
                textColor={Colors.pureTxt}
                iconStyle={{ color: Colors.white }}
                rightButtonBackgroundColor={Colors.secondary}
                leftButtonBackgroundColor={Colors.secondary} />
        </View>
    )
}

CartCard.propTypes = {
    onPress: PropTypes.func,
    onChange: PropTypes.func,
    price: PropTypes.any,
    value: PropTypes.any,
    item: PropTypes.any,
    type: PropTypes.any,
    company: PropTypes.any,
    Qty: PropTypes.any,
    picture: PropTypes.any,
    iQty: PropTypes.any
}
const styles = StyleSheet.create({
    Cardcontainer: {
        flex: 1,
        backgroundColor: Colors.pureBG,
        flexDirection: 'row',
        marginVertical: 5,
        paddingHorizontal: 5,
        width: width - 15,
        alignSelf: 'center',
        elevation: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: "20%",
        marginLeft: -5,
        height: height / 10,
    },
    itemTitle: {
        fontFamily: 'Roboto_medium',
        fontSize: width / 30,
        paddingHorizontal: 2,
        color: Colors.pureTxt,
        fontWeight: 'bold',
        opacity: 0.8
    },
    item: {
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        width: width / 4,
    },
    ItemInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    itemprice: {
        fontSize: width / 30,
        color: Colors.mainTxt,
        fontFamily: 'Roboto',
        opacity: .7
    },
    itemQty: {
        fontSize: width / 30,
        color: Colors.mainTxt,
        fontFamily: 'Roboto',
        opacity: .7
    },
    rightIcon: {
        alignSelf: 'center'
    }
})
export default CartCard
