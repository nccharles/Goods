import React from 'react';
import PropTypes from 'prop-types'
import {
    View, Text, Image, TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from './styles'
import { Colors } from '../../Assets/Themes';

const OrdersHeader = (props) => {
    const { onPress, title } = props

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>{title}</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={onPress}>
                        <Ionicons
                            name='ios-apps'
                            size={25}
                            color={Colors.mainTxt} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

OrdersHeader.propTypes = {
    onPress: PropTypes.func,
    onBack: PropTypes.func,
    source1: PropTypes.any,
    title: PropTypes.string
}

export default OrdersHeader;
