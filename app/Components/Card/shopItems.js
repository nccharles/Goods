import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { Card, CardItem } from "native-base";
import Colors from "../../Assets/Themes/Colors";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Button } from "react-native-elements";
const { width, height } = Dimensions.get("window");
const ShopItems = ({ img, Type, Price, bgImage, onPress, name }) => {
    return (
        <View style={styles.cardStyle}>
            <Image
                source={name === 'Gas' ? require('../../Assets/Icons/gas.png') : name === 'Water' ? require('../../Assets/Icons/waterBottle.png') : { uri: img }}
                style={styles.img}
            />
            <CardItem style={styles.infoStyle} cardBody>
                <Text style={styles.itemTitle}>{name.length <= 24 ? name : name.substring(0, 23) + "..."}</Text>
                <Text style={styles.iType}>{Type}</Text>
                <Text style={styles.iPrice}>{Price.length <= 22 ? Price : Price.substring(0, 22) + "..."}</Text>
            </CardItem>
            <TouchableOpacity style={styles.cartIcon}onPress={onPress}>
                <FontAwesome name="cart-plus" size={20} color={Colors.white} />
            </TouchableOpacity>
        </View>
    );
};

ShopItems.propTypes = {
    img: PropTypes.string,
    onPress: PropTypes.func,
    bgImage: PropTypes.string,
    Price: PropTypes.string,
    name: PropTypes.string,
    Type: PropTypes.string
};

const styles = StyleSheet.create({
    cardStyle: {
        flex: 0,
        width: width / 2.3,
        height:width / 2.3,
        alignContent: 'stretch',
        alignItems: 'stretch',
        backgroundColor: Colors.pureBG,
        elevation: 1,
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8
    },
    infoStyle: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius:8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 3,
        paddingBottom: 20,
    },
    itemTitle: {
        color: Colors.secondary,
        fontFamily: 'Roboto_medium',
        fontSize: width / 30,
        textTransform: 'uppercase',
        alignSelf: 'flex-start',
    },
    iType: {
        color: Colors.white,
        opacity: .6,
        fontFamily: 'Roboto_medium',
        fontSize: width / 40,
        alignSelf: 'flex-start',
    },
    iPrice: {
        color: Colors.white,
        width: width / 2.6,
        fontFamily: 'Roboto',
        fontSize: width / 30,
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },
    img: {
        alignSelf: 'center',
        width: "100%",
        height: width / 2.3,
        borderRadius: 8,
    },
    cartIcon: {
        width: width / 7,
        height: width / 15,
        position: 'absolute',
        bottom: 40,
        padding:0,
        right: 0,
        elevation: 3,
        alignSelf: 'flex-start'
    }
});
export default ShopItems;
