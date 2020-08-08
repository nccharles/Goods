import React from 'react';
import PropTypes from 'prop-types'
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import styles from './styles'
import { Colors } from '../../Assets/Themes';

const BackHeader = (props) => {
  const { onPress, title } = props

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            paddingHorizontal: 15,
            paddingTop: 2
          }}>
          <MaterialIcons
            name='arrow-back'
            size={25}
            color={Colors.pureTxt} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        
      </View>
    </View>
  );
}

BackHeader.propTypes = {
  onPress: PropTypes.func,
  title:PropTypes.string
}

export default BackHeader;
