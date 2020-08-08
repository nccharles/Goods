import React from 'react';
import PropTypes from 'prop-types'
import {
  View, Text, Image, Platform, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Button, Input } from "react-native-elements";
import styles from './styles'
import Colors from '../../Assets/Themes/Colors';

const SearchHeader = ({ onPress, sorted, onSort, onChangeText, onValue }) => {
  return (
    <View style={styles.staticHeader}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            marginHorizontal: 20,
            marginLeft: 10
          }}>
          <Icon
            name={Platform.os === 'ios' ? 'ios-arrow-round-back' : 'md-arrow-round-back'}
            size={25}
            color={Colors.pureTxt} />
        </TouchableOpacity>
        <Input
          placeholder="search..."
          placeholderTextColor={Colors.mainTxt}
          containerStyle={styles.input}
          underlineColorAndroid={"transparent"}
          inputContainerStyle={styles.inputStyle}
          autoCorrect={true}
          returnKeyType={"go"}
          onChangeText={onChangeText}
          value={onValue}
        />
        <TouchableOpacity
          onPress={onSort}
          style={{
            padding: 10,
            marginRight: 10
          }}>
          <FontAwesome
            name={`sort-${sorted}`}
            size={20}
            color={Colors.mainTxt} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

SearchHeader.propTypes = {
  onPress: PropTypes.func,
  onSort: PropTypes.func,
  onChangeText: PropTypes.func,
  onValue: PropTypes.string,
  sorted: PropTypes.string,
}

export default SearchHeader;
