import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native'
import  LinearGradient from "react-native-linear-gradient";
import Feather from 'react-native-vector-icons/Feather'
import styles from './styles'
import { Colors } from '../../Assets/Themes';

class AddButton extends Component {


    render() {

        const { onPress } = this.props

        return (

            <LinearGradient
                colors={Colors.gradientBtn}
                start={{ x: 1.0, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.cartbutton}
            >
                <TouchableOpacity
                    onPress={onPress}>
                    <Feather
                        name="plus-circle"
                        size={20}
                        color={'white'} />
                </TouchableOpacity>
            </LinearGradient>

        )
    }
}
AddButton.propTypes = {
    onPress: PropTypes.func,
}
export default AddButton