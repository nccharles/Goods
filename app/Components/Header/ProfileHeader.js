import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, Dimensions,
    TouchableOpacity, ImageBackground, Platform
} from 'react-native';
import PropTypes from 'prop-types'
import { Colors } from '../../Assets/Themes';
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const { width, height } = Dimensions.get('window');
export default ProfileHeader = ({ Items, Orders, onPressEdit, onPressBack, Open, Profile, Address, Phone, Update, Company }) => {
    return (
        <ImageBackground blurRadius={100} style={styles.header_gradient} source={Profile ? { uri: Profile } : require("../../Assets/Icons/deShop.png")} >
            <TouchableOpacity onPress={onPressBack}>
                <Entypo name="arrow-long-left" color={Colors.white} size={25} />
            </TouchableOpacity>
            <View style={styles.profile}>
                <TouchableOpacity onPress={onPressEdit}>
                    <Image style={styles.avatar} source={Profile ? { uri: Profile } : require("../../Assets/Icons/blackIcon.png")} />
                    <MaterialIcons name="add-a-photo" color={Colors.white} style={styles.ImageIcon} size={25} />
                </TouchableOpacity>
                <View style={styles.status}>
                    <View style={styles.StoreStatus}>
                        <View style={styles.post}>
                            <Text style={styles.postText}>Store Items</Text>
                            <Text style={styles.postNumber}>{Items || "0"}</Text>
                        </View>
                        <View style={styles.post}>
                            <Text style={styles.postText}>Orders</Text>
                            <Text style={styles.postNumber}>{Orders || "0"}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={Update} style={styles.buttonContainer}>
                        <Entypo name="edit" color={Colors.white} size={15} />
                        <Text style={styles.buttonText}>Update Shop</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bio}>
                <Text style={styles.name}>{Company}</Text>

                <Text style={styles.description}>{Address}</Text>
                <View style={styles.contact}>
                    <View style={styles.workDays}>
                        <Ionicons
                            name={Platform.os === 'ios' ? 'ios-today' : 'md-today'}
                            color={Colors.white} size={10} />
                        <Text style={styles.daysText}>{Open} </Text>
                    </View>
                    <View style={styles.phone}>
                        <Entypo name="phone" color={Colors.white} size={10} />
                        <Text style={styles.phoneText}> {Phone}</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}
ProfileHeader.propTypes = {
    onPressBack: PropTypes.func,
    onPressEdit: PropTypes.func,
    Profile: PropTypes.any,
    Phone: PropTypes.string,
    Address: PropTypes.string,
    Items: PropTypes.any,
    Orders: PropTypes.any,
    Update: PropTypes.func,
    Open: PropTypes.string,
    Company: PropTypes.string,
}
const styles = StyleSheet.create({
    header_gradient: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        padding: 20,
        paddingBottom: -1,
        height: 'auto',
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: width - 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.secondary,
        backgroundColor: Colors.white,
    },
    ImageIcon: {
        position: 'absolute',
        top: 5,
        elevation: 3,
        right: -1,
    },
    status: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: "rgba(0,0,0,.1)",
        borderRadius:10,
        padding: 10,
    },
    StoreStatus: {
        width: width / 2.5,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around'
    },
    post: {
        flexDirection: 'column',
        justifyContent: "center",
    },
    postText: {
        color: Colors.white,
        textTransform: "uppercase",
        fontSize: width / 40,
        fontFamily: 'Roboto_medium',
        alignSelf: 'center',
    },
    postNumber: {
        color: Colors.white,
        fontSize: width / 23,
        fontWeight: "bold",
        fontFamily: 'Roboto_medium',
        alignSelf: 'center',
    },
    bio: {
        flexDirection: 'column',
        marginVertical: 5,
        marginHorizontal: -20,
        paddingHorizontal:20,
        width:width,
        backgroundColor: "rgba(0,0,0,0.1)",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    contact: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    workDays: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    phone: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    daysText: {
        color: Colors.white,
        fontSize: width / 35,
        fontWeight: 'bold',
    },
    phoneText: {
        color: Colors.white,
        fontFamily: 'Roboto_medium',
        fontSize: width / 35,
        fontWeight: 'bold',
        color: Colors.white,
    },

    body: {
        margin: 0,
    },
    name: {
        fontSize: width / 30,
        fontWeight: 'bold',
        color: Colors.white,
        fontFamily: 'Roboto_medium',
    },
    info: {
        fontSize: 14,
        color: Colors.primary,
        marginTop: 10,
        fontFamily: 'Roboto_medium',
    },
    description: {
        color: Colors.white,
        fontFamily: 'Roboto',
        marginTop: 2,
        fontSize: width / 30,
        opacity: .9
    },
    buttonContainer: {
        height: height / 25,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: width / 2.5,
        elevation: 90,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.white,
        backgroundColor: "transparent",
    },
    buttonText: {
        color: Colors.white,
        fontFamily: 'Roboto_medium',
    }
});