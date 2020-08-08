import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import { Colors } from '../../../Assets/Themes';
import MaterialAnimatedView from '../../MaterialAnimatedView';


const ClientCard = ({ onPress, onPressChat, onPressCall, onPressDel, address, name, orderID, Company, picture, price, Qty }) => {
    return (
        <MaterialAnimatedView index={1} style={[styles.container, {}]}>
            <View style={styles.details}>
                <Image source={name === 'Gas' ? require('../../../Assets/Icons/gas.png') : name === 'Water' ? require('../../../Assets/Icons/waterBottle.png') : { uri: picture }} style={styles.image} />
                <TouchableOpacity
                    onPress={onPress}
                    style={styles.row}>
                    <Text style={styles.NormalLabel}>{name.toUpperCase()} | Qty:{Qty}</Text>
                    <View>
                        <Text style={styles.Label}>Vendor: {Company}</Text>
                        <Text style={styles.mediumLabel}>Amount: {price}</Text>
                        <Text style={styles.addressLabel}>Address: {address}</Text>
                        <Text style={styles.smallLabel}>OrderID #{orderID}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onPressDel}
                    style={styles.iconBtn}>
                    <Fontisto
                        name='shopping-basket-remove'
                        size={15}
                        color={Colors.red}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.contacts}>
                    <TouchableOpacity onPress={onPressCall}>
                        <MaterialIcons
                            name='phone'
                            size={23}
                            color={Colors.green}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPressChat}
                    >
                        <MaterialIcons
                            name='chat'
                            size={23}
                            color={Colors.blue}
                        />
                    </TouchableOpacity>
                </View>
        </MaterialAnimatedView>
    )
}
ClientCard.name = {
    onPress: PropTypes.func,
    onPressDel: PropTypes.func,
    onPressCall: PropTypes.func,
    onPressChat: PropTypes.func,
    name: PropTypes.string,
    address: PropTypes.string,
    Company: PropTypes.string,
    picture: PropTypes.any,
    orderID: PropTypes.number,
    price: PropTypes.string,
    Qty: PropTypes.string,
}
export default ClientCard