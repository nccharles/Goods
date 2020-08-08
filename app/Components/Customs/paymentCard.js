import PropTypes from 'prop-types';
import React from 'react';
import { Text, View,Dimensions,StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import BackHeader from '../Header/BackHeader';
import { Colors } from '../../Assets/Themes';
const { width, height } = Dimensions.get('window')
const Payment = ({ toggleCart, isVisible,children }) => (
    <Modal isVisible={isVisible}
        testID={'modal'}
        animationInTiming={1000}
        animationOutTiming={500}
        backdropTransitionInTiming={800}
        backdropTransitionOutTiming={400}
        backdropColor="rgba(0,0,0,.3)"
        style={{
            justifyContent: 'flex-end',
            margin: 0,
        }}
    >
        <View style={styles.wrapper}>
            <BackHeader
                onPress={toggleCart}
                title="Checkout"
            />
            <ScrollView style={styles.contentWrapper}>
                   {children}
            </ScrollView>
        </View>
    </Modal>
);

Payment.propTypes = {
    toggleCart: PropTypes.func,
    isVisible: PropTypes.bool,
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 0,
        backgroundColor: Colors.pureBG,
    },
    contentWrapper: {
        width: width,
        marginTop: 10,
        padding: 20,
        backgroundColor: Colors.pureBG,
    }
})
export default Payment;