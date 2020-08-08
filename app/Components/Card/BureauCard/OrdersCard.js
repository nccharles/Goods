import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import { Colors } from '../../../Assets/Themes';

const OrdersCard = ({ onPress, onOptions, onPressChat, onPressCall, address, name, orderID, picture, Customer, price, Qty }) => {
  return (
    <View style={[styles.container, {}]}>
      <View style={styles.details}>
        <Image source={name === 'Gas' ? require('../../../Assets/Icons/gas.png') : name === 'Water' ? require('../../../Assets/Icons/waterBottle.png') : { uri: picture }} style={styles.image} />
        <TouchableOpacity
          onPress={onPress}
          style={styles.row}>
          <Text style={styles.NormalLabel}>{name.toUpperCase()} | Qty:{Qty}</Text>
          <View>
            <Text style={styles.Label}>Customer: {Customer}</Text>
            <Text style={styles.mediumLabel}>Amount: {price}</Text>
            <Text style={styles.addressLabel}>Address: {address}</Text>
            <Text style={styles.smallLabel}>OrderID #{orderID}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onOptions}
          style={styles.iconBtn}>
          <MaterialIcons
            name='more-vert'
            size={25}
            color={Colors.mainTxt}
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
    </View>
  )
}
OrdersCard.propTypes = {
  onPress: PropTypes.func,
  onPressCall: PropTypes.func,
  onPressChat: PropTypes.func,
  onOptions: PropTypes.func,
  name: PropTypes.string,
  address: PropTypes.string,
  Customer: PropTypes.string,
  orderID: PropTypes.number,
  picture: PropTypes.any,
  price: PropTypes.string,
  Qty: PropTypes.string,
}
export default OrdersCard