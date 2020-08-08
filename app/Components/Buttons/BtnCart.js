import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity,View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import styles from './styles'
import { Badge } from 'react-native-elements';

class CartButton extends Component {

    componentName = "GradientButton";
    typeMapping = {
        button: {},
        gradient: {},
        text: {}
    };
    render() {
        const { onPress, value, status } = this.props

        return (


            <View style={styles.cartbutton}
            ><TouchableOpacity
                onPress={onPress}>
                    <Entypo
                        name="shopping-cart"
                        size={30}
                        color={'white'} />
                    <Badge
                        status="error"
                        value={value}
                        containerStyle={{ position: 'absolute', top: -4, left: -4 }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}
CartButton.propTypes = {
    onPress: PropTypes.func,
    value: PropTypes.any,
    status: PropTypes.string
}
export default CartButton