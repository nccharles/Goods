import React from 'react';
import PropTypes from 'prop-types'
import {
    View, Text, Image, TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons//MaterialIcons'

import styles from './styles'
import { Colors } from '../../Assets/Themes';

const ChatsHeader = (props) => {
    const { onPress1, status, Receiver } = props

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TouchableOpacity
                    onPress={onPress1}
                    style={{
                        marginHorizontal: 10,
                        marginTop: 2
                    }}>
                    <MaterialIcons
                        name='arrow-back'
                        size={25}
                        color={Colors.pureTxt} />
                </TouchableOpacity>
                <View style={styles.ChatStatus}>
                    <Text style={styles.chattitle}>{Receiver}   </Text>
                    <Text style={styles.StatusText}>{status}</Text>
                </View>
            </View>
        </View>
    );
}

ChatsHeader.propTypes = {
    onPress1: PropTypes.func,
    status: PropTypes.string,
    Receiver: PropTypes.string,
}

export default ChatsHeader;
