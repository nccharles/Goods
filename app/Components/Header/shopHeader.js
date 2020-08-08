import React from 'react';
import PropTypes from 'prop-types'
import {
  View, Text, Image,Platform, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Badge } from 'react-native-elements';
import styles from './styles'
import Colors from '../../Assets/Themes/Colors';

const ShopHeader = (props) => {
  const { onPress1, onPress2,Item,value } = props

  return (
    <View style={styles.iContainer}>
      <View style={styles.iWrapper}>
        <TouchableOpacity
          onPress={onPress2}
          style={{
            marginLeft: 5,
            marginTop: 2
          }}>
          <Icon
            name={Platform.os==='ios'?'ios-arrow-round-back':'md-arrow-round-back'}
            size={25}
            style={styles.bgIcon}
            color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>{Item}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onPress1}>
            <Icon
            style={styles.bgIcon}
            name={Platform.os==='ios'?'ios-call':'md-call'}
            size={25}
            color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

ShopHeader.propTypes = {
  onPress1: PropTypes.func,
  onPress2: PropTypes.func,
  Item: PropTypes.string,
  value: PropTypes.any,
}

export default ShopHeader;
