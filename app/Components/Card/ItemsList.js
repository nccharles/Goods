import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, ImageBackground, StyleSheet, Image, Dimensions } from "react-native";
import { Card, CardItem } from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from "../../Assets/Themes/Colors";
import { Button } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
const { width, height } = Dimensions.get("window");
const ItemsList = ({ img, Type, Price, bgImage,onPress, name }) => {
    return (
        <View style={styles.cardStyle}>
            <Image
                source={{
                    uri: img
                }}
                style={styles.img}
            />
            <CardItem style={styles.infoStyle} cardBody>
                <Text style={styles.itemTitle}>{name.length <= 24 ? name : name.substring(0, 23) + "..."}</Text>
                <Text style={styles.iType}>{Type}</Text>
                <Text style={styles.iPrice}>{Price.length <= 22 ? Price : Price.substring(0, 22) + "..."}</Text>
            </CardItem>
            <Button
                buttonStyle={styles.cartIcon}
                title="BUY"
                onPress={onPress}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                    colors: Colors.gradientBtn,
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                }}
                type="clear"
                titleStyle={{ color: 'white',fontSize:10 }}
                icon={{ type: "entypo", name: "shopping-cart", size: 10, color: 'white' }}
            />
        </View>
    );
};

ItemsList.propTypes = {
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
        alignContent: 'stretch',
        alignItems: 'stretch',
        backgroundColor: 'transparent',
        elevation: 1,
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8
    },
    infoStyle: {
        flexDirection: 'column',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    itemTitle: {
        color: Colors.pureTxt,
        fontFamily: 'Roboto',
        fontSize: width / 32,
        textTransform: 'uppercase',
        alignSelf: 'flex-start',
    },
    iType: {
        color: Colors.pureTxt,
        opacity: .6,
        fontFamily: 'Roboto-Italic',
        fontSize: width / 40,
        alignSelf: 'flex-start',
    },
    iPrice: {
        color: Colors.primary,
        width: width / 2.6,
        fontFamily: 'Roboto_medium',
        fontSize: width / 35,
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },
    img: {
        alignSelf: 'center',
        width: "100%",
        height: width / 3,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cartIcon: {
        width:width/7,
        height:width/15,
        margin: 10,
        elevation:3,
        alignSelf:'flex-end'
    }
});
export default ItemsList;
