import React from 'react';
import PropTypes from 'prop-types'
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import styles from './styles'
import { Colors } from '../../Assets/Themes';

const DetailsHeader = (props) => {
  const { onFilter, onBack, source,title } = props

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={onBack}
          style={{
            paddingHorizontal: 15,
            paddingTop: 2,
          }}>
          <MaterialIcons
            name='arrow-back'
            size={25}
            color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onFilter}>
             <MaterialIcons
            name='filter-list'
            size={25}
            color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

DetailsHeader.propTypes = {
  onFilter: PropTypes.func,
  onBack: PropTypes.func,
  source1: PropTypes.any,
  title:PropTypes.string
}

export default DetailsHeader;
