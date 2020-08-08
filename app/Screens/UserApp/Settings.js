import React, { Component } from 'react';
import {
    ScrollView, Share, Alert, View, Platform, Text, TouchableOpacity, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import NetInfo from "@react-native-community/netinfo";
import { styles, width, height, HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE } from './Style/ItemInfoStyle';
import { Colors } from '../../Assets/Themes'
import Toast from 'react-native-easy-toast'
import * as firebase from 'firebase'
import { CommonActions } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Button, Input } from "react-native-elements";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { userPhone, cName, chatName } from '../../Config/constants';
import Agreement from '../../Components/Text/Agreement';
export default class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            InputDialogVisible: false,
            userPhone: null,
            isVisible: false,
            isEditVisible: false,
            chatname: null,
            inputedValue: '',
            spinner: false,
            credentails: {},
            loading: true
        }
    }
    async componentDidMount() {
        const chatname = await AsyncStorage.getItem(chatName)
        this.setState({
            chatname,
            loading: true
        })
        this._getAllInfos()
    }
    NetworkStatus = () => {
        NetInfo.fetch().then(async (state) => {
            !state.isConnected && this.refs.toast.show('No Internet')
        });
    }
    _handleLogout = async () => {
        Alert.alert('Logout', 'Do you really want to logout?', [
            {
                text: "Yes",
                onPress: () => this.logout(),
                style: 'default'
            },
            { text: "NO" }
        ],
            { cancelable: false })
    }
    logout = async () => {
        await AsyncStorage.setItem(userPhone, "");
        await AsyncStorage.setItem(chatName, "");
        await AsyncStorage.setItem(cName, "").then(() => {
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                }))
        })
    }
    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    `Goods | Order any Product at any amount from anywhere on https://play.google.com/store/apps/details?id=com.limitless.goods`,
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            this.refs.toast.show(error.message);
        }
    };
    _getAllInfos = async () => {
        const retrieveduserPhone = await AsyncStorage.getItem(userPhone);
        try {
            await firebase
                .database()
                .ref(`/infos/${retrieveduserPhone}/companyInfo`)
                .on("value", snapshot => {
                    this.setState({
                        credentails: {
                            ...this.state.credentails,
                            ...snapshot.val()
                        }
                    });
                })
            await firebase
                .database()
                .ref(`/infos/${retrieveduserPhone}/privateInfo`)
                .on("value", snapshot => {
                    this.setState({
                        credentails: {
                            ...this.state.credentails,
                            ...snapshot.val()
                        }
                    });
                })
        } catch (error) {
            this.refs.toast.show(error.message)
        }
    }
    _handleCompany = async () => {
        this.NetworkStatus()
        const retrieveduserPhone = await AsyncStorage.getItem(userPhone);
        if (retrieveduserPhone) {
            try {
                await firebase.database().ref(`infos/${retrieveduserPhone}/companyInfo`).once("value")
                    .then(async (snapshot) => {
                        const { completed } = snapshot.val()
                        const CompanyName = snapshot.val().company
                        if (completed) {
                            await AsyncStorage.setItem(cName, CompanyName)
                            this.setState({
                                signedIn: true,
                                checkedSignIn: true,
                                initialRouter: 'ManageShop'
                            })
                            this.props.navigation.navigate('ManageShop')
                        } else {
                            this.setState({
                                signedIn: true,
                                checkedSignIn: true,
                                initialRouter: 'CompanyInfo'
                            })
                            this.props.navigation.navigate('CompanyInfo')
                        }
                    }).catch(error => {
                        this.setState({
                            signedIn: true,
                            checkedSignIn: true,
                            initialRouter: 'CompanyInfo'
                        })
                        this.props.navigation.navigate('CompanyInfo')
                    })
            } catch (error) {
                this.refs.toast.show(error.message)
            }
        }

    }
    _handleTermsOfuse = () => {
        this.setState({ isVisible: !this.state.isVisible })
    };
    toggleEdit = () => {
        this.setState(state => ({ isEditVisible: !state.isEditVisible }))
    };
    _handleChangeText = (key, value) => {
        this.setState(state => ({
            credentails: {
                ...state.credentails,
                [key]: value
            }
        }));
    };

    _handleUpdate = async () => {
        const {
            credentails: { email, first_name, last_name, userPhone },
            spinner,
        } = this.state;
        if (email && first_name && last_name) {
            await AsyncStorage.setItem(chatName, first_name)
        } else {
            this.refs.toast.show("Please fill all fields!");
            return;
        }

        if (spinner) {
            return;
        }
        this.setState({
            spinner: true
        });
        firebase
            .database()
            .ref(`/infos/${userPhone}/privateInfo`)
            .update({
                displayName: first_name,
                first_name, last_name,
                email,
            })
            .then(resp => {
                this.setState({ spinner: false })
                this.toggleEdit()
            })
            .catch(error => {
                this.setState({ spinner: false })
                this.refs.toast.show(error.message);
            });
    };
    render() {
        const { loading, credentails, isEditVisible } = this.state
        let name = credentails.displayName || "..."
        return (

            <View style={styles.container}>
                <ScrollView style={styles.card}>
                    <View style={styles.content}>
                        <View style={[styles.itemContainer, { alignItems: 'center' }]}>
                            <View style={[styles.DetailAvatar, { backgroundColor: Colors.secondary }]}>
                                <Text style={styles.avatarTxt}>{name.substring(0, 2).toUpperCase()}</Text>
                            </View>
                            <View style={styles.infocontent}>
                                <Text style={styles.infoTitle}>Names</Text>
                                <Text style={styles.info}>{credentails.displayName} {credentails.last_name}</Text>
                            </View>
                            <TouchableOpacity style={styles.actionIcon} onPress={() => this.setState({ isEditVisible: !isEditVisible })}>
                                <MaterialIcons name={'edit'} color={Colors.mainTxt} size={23} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemContainer}>
                            <MaterialIcons name="phone-iphone" color={Colors.secondary} size={18} />
                            <View style={styles.infocontent}>
                                <Text style={styles.infoTitle}>Phone</Text>
                                <Text style={[styles.info, { fontSize: 12 }]}>{credentails.userPhone}</Text>
                            </View>
                            <MaterialIcons name="mail-outline" color={Colors.secondary} size={18} />
                            <View style={styles.infocontent}>
                                <Text style={styles.infoTitle}>Email</Text>
                                <Text style={[styles.info, { fontSize: 12 }]}>{credentails.email}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <TouchableOpacity onPress={this._handleCompany.bind(this)} style={styles.itemContainer}>
                            <Entypo name={Platform.OS === 'ios' ? 'shop' : 'shop'} color={Colors.secondary} size={23} />
                            <View style={styles.infocontent}>
                                <Text style={styles.infoTitle}>{credentails.company || "Manage Shop"}</Text>
                                <Text style={styles.info}>{credentails.address || "Manage your products,orders"}</Text>
                            </View>
                            <MaterialIcons name={credentails.company ? 'more-vert' : 'add'} style={styles.actionIcon} color={Colors.mainTxt} size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <TouchableOpacity onPress={this._handleTermsOfuse} style={styles.itemContainer}>
                            <MaterialIcons name="help-outline" color={Colors.secondary} size={23} />
                            <View style={styles.infocontent}>
                                <Text style={styles.infoTitle}>Terms of use</Text>
                                <Text style={styles.info}> Find our terms and use</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onShare} style={styles.itemContainer}>
                            <MaterialIcons name="share" color={Colors.secondary} size={23} />
                            <View style={styles.infocontent}>
                                <Text style={styles.infoTitle}>Share   </Text>
                                <Text style={styles.info}>Share with your friends  </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._handleLogout} style={styles.itemContainer}>
                            <MaterialIcons name="power-settings-new" color={Colors.red} size={23} />
                            <View style={styles.infocontent}>
                                <Text style={[styles.infoTitle, { color: Colors.red }]}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Modal isVisible={this.state.isEditVisible}
                        testID={'modal'}
                        animationInTiming={1000}
                        animationOutTiming={500}
                        backdropTransitionInTiming={800}
                        backdropTransitionOutTiming={400}
                        onSwipeComplete={this.toggleEdit}
                        swipeDirection={['down']}
                        backdropColor="rgba(0,0,0,.3)"
                        style={{
                            justifyContent: 'flex-end',
                            margin: 0,
                        }}
                    >
                        <View style={styles.editContainer}>
                            <TouchableOpacity style={[styles.actionIcon, { top: 5, right: 5 }]} onPress={() => this.setState({ isEditVisible: !isEditVisible })}>
                                <FontAwesome name={'close'} color={Colors.mainTxt} size={23} />
                            </TouchableOpacity>
                            <Input
                                label="First name"
                                leftIcon={{
                                    type: "entypo",
                                    name: "user",
                                    color: Colors.secondary
                                }}
                                containerStyle={styles.input}
                                underlineColorAndroid={"transparent"}
                                inputStyle={styles.inputStyle}
                                autoCorrect={false}
                                returnKeyType={"next"}
                                onChangeText={input => this._handleChangeText("first_name", input)}
                                value={this.state.credentails.first_name}
                            />

                            <Input
                                label="Last name"
                                leftIcon={{
                                    type: "entypo",
                                    name: "user",
                                    color: Colors.secondary
                                }}
                                containerStyle={styles.input}
                                underlineColorAndroid={"transparent"}
                                inputStyle={styles.inputStyle}
                                autoCorrect={false}
                                returnKeyType={"next"}
                                onChangeText={input => this._handleChangeText("last_name", input)}
                                value={this.state.credentails.last_name}
                            />
                            <Input
                                label="Email"
                                leftIcon={{ type: 'entypo', name: 'mail', color: Colors.secondary }}
                                containerStyle={styles.input}
                                underlineColorAndroid={'transparent'}
                                inputStyle={styles.inputStyle}
                                autoCapitalize='none'
                                keyboardType='email-address'
                                autoCorrect={false}
                                returnKeyType={"next"}
                                onChangeText={(input) => this._handleChangeText('email', input)}
                                value={this.state.credentails.email}
                                editable={true}
                            />
                        <Button
                            onPress={this._handleUpdate.bind(this)}
                            title="Save"
                            titleStyle={{ color: Colors.white }}
                            icon={{ type: "font-awesome", name: "save", color: Colors.white }}
                            buttonStyle={{ borderRadius:0,backgroundColor: Colors.secondary, margin: 10 }}
                            loading={this.state.spinner}
                            loadingStyle={{ color: Colors.secondary }}
                        />
                        </View>
                    </Modal>
                    <Agreement isVisible={this.state.isVisible} toggleTerms={this._handleTermsOfuse} />
                </ScrollView>
                <Toast ref="toast"
                    style={{ backgroundColor: Colors.mainTxt }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: Colors.mainBG }} />
            </View>
        );
    }
}
