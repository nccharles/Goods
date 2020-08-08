import React, { useState,useEffect} from 'react';
import PropTypes from 'prop-types'
import {
  View, Text, Image, Platform, TouchableOpacity, Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Badge } from 'react-native-elements';
import styles from './styles'
import Colors from '../../Assets/Themes/Colors';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
export default ItemHeader=( { onPress1, onPress2, Item, value,opa } )=> {
    return (
      <View style={styles.iContainer}>
        <View style={styles.iWrapper}>
          <TouchableOpacity
            onPress={onPress2}
            style={{
              marginLeft: 5,
              marginTop: 2
            }}>
            <AnimatedIcon
              name={Platform.os === 'ios' ? 'ios-arrow-round-back' : 'md-arrow-round-back'}
              size={25}
              style={[styles.bgIcon, { backgroundColor: opa }]}
              color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>{Item}</Text>
        </View>
      </View>
    );
  }
ItemHeader.propTypes = {
  onPress1: PropTypes.func,
  onPress2: PropTypes.func,
  Item: PropTypes.string,
  opa: PropTypes.any,
  value: PropTypes.any,
}

