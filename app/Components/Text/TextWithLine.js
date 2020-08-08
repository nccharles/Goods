import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles';
import { Colors } from '../../Assets/Themes';

const TextWithLine = ({ CustomText }) => (
    <View style={{ flexDirection: 'row' }}>
        <LinearGradient
            colors={Colors.gradientBtn}
            start={{ x: 1.0, y: 0.5 }}
            end={{ x: 0, y: 0.5 }}
            style={styles.sideLine}
        />
        <Text style={styles.centerText}>{CustomText}</Text>
        <LinearGradient
            colors={Colors.gradientBtn}
            start={{ x: 1.0, y: 0.5 }}
            end={{ x: 0, y: 0.5 }}
            style={styles.sideLine}
        />
    </View>
);

TextWithLine.propTypes = {

    CustomText: PropTypes.string,
};
export default TextWithLine;