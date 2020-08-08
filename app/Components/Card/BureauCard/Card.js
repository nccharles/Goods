import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from './styles'
import { Colors } from '../../../Assets/Themes';


const Card = ({ onPress, onPressDel, name, price, qty, time, picture }) => {
    return (
        <View style={[styles.container,{flexDirection: 'row',borderRadius:0}]}>

            <Image source={name === 'Gas' ? require('../../../Assets/Icons/gas.png') : name === 'Water' ? require('../../../Assets/Icons/waterBottle.png') : { uri: picture }} style={[styles.image,{borderTopLeftRadius:0}]} />

            <TouchableOpacity
                onPress={onPress}
                style={styles.row}>
                <Text style={styles.boldLabel}>{name.toUpperCase()}</Text>
                <View>
                    <Text style={styles.label}>Price: {price}</Text>
                    <Text style={styles.label}>{(name === 'Gas' || name === 'Water') ? "Bottle" : "In Stock"}: {qty}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onPressDel}
                style={styles.iconBtn}>
                <Ionicons
                    name='ios-trash'
                    size={20}
                    color={Colors.red}
                />
            </TouchableOpacity>
            <Text style={styles.updated}>{time}</Text>
        </View>
    )
}
Card.propTypes = {
    onPress: PropTypes.func,
    onPressDel: PropTypes.func,
    name: PropTypes.string,
    picture: PropTypes.any,
    price: PropTypes.string,
    qty: PropTypes.string,
    time: PropTypes.string,
}
export default Card