import React from 'react';
import PropTypes from 'prop-types'
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import styles from './styles'
import { Colors } from '../../Assets/Themes';

const CartHeader = (props) => {
  const { onPress, onBack, source,title } = props

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onPress}>
             <MaterialIcons
            name='remove-shopping-cart'
            size={25}
            color={Colors.pureTxt} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

CartHeader.propTypes = {
  onPress: PropTypes.func,
  onBack: PropTypes.func,
  source1: PropTypes.any,
  title:PropTypes.string
}

export default CartHeader;
