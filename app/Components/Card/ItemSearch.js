import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Card, CardItem } from "native-base";
import Colors from "../../Assets/Themes/Colors";
import { Button } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
const { width, height } = Dimensions.get("window");
const ItemSearch = ({ img, Type, Price, Company, bgImage, onPress, name }) => {
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
                <Text style={styles.iCompany}>{Company.length <= 22 ? Company : Company.substring(0, 22) + "..."}</Text>
            </CardItem>
            <Button
                buttonStyle={styles.cartIcon}
                title="ADD"
                onPress={onPress}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                    colors: Colors.gradientBtn,
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                }}
                type="clear"
                titleStyle={{ color: 'white', fontSize: 10 }}
                icon={{ type: "entypo", name: "shopping-cart", size: 10, color: 'white' }}
            />
        </View>
    );
};

ItemSearch.propTypes = {
    img: PropTypes.string,
    onPress: PropTypes.func,
    bgImage: PropTypes.string,
    Price: PropTypes.string,
    Company: PropTypes.string,
    name: PropTypes.string,
    Type: PropTypes.string
};

const styles = StyleSheet.create({
    cardStyle: {
        flex: 0,
        width: width,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        paddingVertical: 10,
        marginHorizontal: 5
    },
    infoStyle: {
        flexDirection: 'column',
        width:width/2.2,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    itemTitle: {
        color: Colors.pureTxt,
        fontFamily: 'Roboto',
        fontSize: width / 30,
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
        fontSize: width / 30,
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },
    iCompany: {
        color: Colors.pureTxt,
        fontFamily: 'Roboto_medium',
        fontSize: width / 25,
        marginTop: 20,
        textTransform: 'capitalize',
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },
    img: {
        alignSelf: 'center',
        width: "30%",
        height: width / 4,
    },
    cartIcon: {
        width: width / 5,
        height: width / 12,
        alignSelf: 'flex-start'
    }
});
export default ItemSearch;
