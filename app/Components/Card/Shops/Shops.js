import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, ImageBackground, StyleSheet, Image, Dimensions } from "react-native";
import { Card, CardItem } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from "../../../Assets/Themes/Colors";
const { width, height } = Dimensions.get("window");
const ShopsList = ({ img, Address, Dist, Hours, name }) => {
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
                <Text style={styles.iAddress}>{Address}</Text>
                <View style={styles.Dist}>
                    <MaterialCommunityIcons name="map-marker-distance" size={14} color={Colors.primary} />
                    <Text style={styles.iDist}>{Dist === 'NaN' ? 0 : Dist.length <= 22 ? Dist : Dist.substring(0, 22) + "..." || 0} Meters</Text>
                </View>
                <Text style={styles.iHours}>{Hours}</Text>
            </CardItem>
        </View>
    );
};

ShopsList.propTypes = {
    img: PropTypes.string,
    Dist: PropTypes.string,
    name: PropTypes.string,
    Hours: PropTypes.string,
    Address: PropTypes.string
};

const styles = StyleSheet.create({
    cardStyle: {
        flex: 0,
        width: width / 1.8,
        alignContent: 'stretch',
        alignItems: 'stretch',
        backgroundColor: 'transparent',
        elevation: 3,
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8
    },
    infoStyle: {
        flexDirection: 'column',
        backgroundColor: Colors.pureBG,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 5,
    },
    itemTitle: {
        color: Colors.pureTxt,
        fontFamily: 'Roboto_medium',
        fontSize: width / 30,
        textTransform: 'uppercase',
        alignSelf: 'flex-start',
    },
    iAddress: {
        color: Colors.pureTxt,
        opacity: .6,
        fontFamily: 'Roboto-medium',
        fontSize: width / 40,
        alignSelf: 'flex-start',
    },
    iHours: {
        color: Colors.pureTxt,
        opacity: .6,
        textTransform: 'uppercase',
        fontFamily: 'Roboto-medium',
        fontSize: width / 45,
        alignSelf: 'flex-start',
    },
    Dist: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width / 1.8,
        padding: 0,
        alignSelf: 'flex-start'
    },
    iDist: {
        color: Colors.secondary,
        width: width / 2.6,
        fontFamily: 'Roboto',
        fontSize: width / 30,
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },
    img: {
        alignSelf: 'center',
        width: "100%",
        backgroundColor: Colors.primary,
        height: width / 3,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cartIcon: {
        width: width / 7,
        height: width / 15,
        margin: 10,
        elevation: 3,
        alignSelf: 'flex-start'
    }
});
export default ShopsList;
