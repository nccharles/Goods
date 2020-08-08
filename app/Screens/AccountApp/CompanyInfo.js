import React, { Component } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Image, AsyncStorage,
    Platform,
    Picker
} from "react-native";
import moment from 'moment'
import DateTimePicker from "react-native-modal-datetime-picker";
import Toast, { DURATION } from 'react-native-easy-toast'
import LinearGradient from "react-native-linear-gradient";
import { Icon, Button, Input } from "react-native-elements";
import styles from "./Style/SignupStyles";
import { Colors } from "../../Assets/Themes";
import open from "../../Assets/Icons/open-sign.png";
import close from "../../Assets/Icons/closed.png";
//backend things
import * as firebase from "firebase";
import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyAN6UG11K2foH4nOXtdr4KMmKnCGi8UQB0')
import { userPhone, cName, hasLocationPermission } from '../../Config/constants'
class CompanyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenTimePickerVisible: false,
            isCloseTimePickerVisible: false,
            info: {
                address: "",
                openAt: "",
                closeAt: "",
                workingDays: "Monday to Friday",
                latitude: "",
                longitude: "",
                company: "",
            },
            userPhone: null,
            errorMessage: null,
            infoId: null,
            loading: true,
            isSubmitting: false
        };
    }

    componentDidMount = async () => {
        const Phone = await AsyncStorage.getItem(userPhone)

        this.setState({
            showAlert: true,
            userPhone: Phone
        });
        this._getCurrentUserLocation();
    }

    _handleTextInput = (key, value) => {
        this.setState(state => ({
            info: {
                ...state.info,
                [key]: value
            }
        }));
    };

    _getCurrentUserLocation = async () => {
        const isLocationPermetted = await hasLocationPermission()

        if (!isLocationPermetted) return;

        this.setState({ isSubmitting: true })
        Geolocation.getCurrentPosition(
            (position) => {
                const { coords } = position
                this.setState(state => ({
                    info: {
                        ...state.info,
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    }
                }));
                this._getRealLocation(coords.latitude, coords.longitude)
            },
            (error) => {
                const { code, message } = error;
                this.setState({ isSubmitting: false })
                this.refs.toast.show(`Error:${message}`);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 10, forceRequestLocation: true }
        );
    };

    _handleInfoSave = async () => {
        const {
            info: {
                address,
                closeAt,
                openAt,
                workingDays,
                company,
                latitude,
                longitude,
            },
            userPhone,
            isSubmitting
        } = this.state;
        if (isSubmitting) {
            return;
        }
        this.setState({
            isSubmitting: true
        });
        const that = this;
        await firebase
            .database()
            .ref(`/infos/${userPhone}/companyInfo`)
            .set({
                address,
                companyPhone: userPhone,
                closeAt,
                openAt,
                workingDays,
                company,
                latitude,
                longitude,
                completed: true,
                timestamp: this.timestamp
            })
            .then(async (response) => {
                await AsyncStorage.setItem(cName, company)
                this.refs.toast.show("Information saved!")
                that.props.navigation.navigate("ManageShop");
                that.setState({
                    isSubmitting: false
                });
            })
            .catch(err => {
                that.setState({
                    isSubmitting: false
                });
            });
    };
    //backend end
    get timestamp() {
        return new Date().valueOf();
    }
    showOpenTimePicker = () => this.setState(state => ({ isOpenTimePickerVisible: !state.isOpenTimePickerVisible }));
    showCloseTimePicker = () => this.setState(state => ({ isCloseTimePickerVisible: !state.isCloseTimePickerVisible }));
    hideTimePicker = () => this.setState(state => ({
        isOpenTimePickerVisible: !state.isOpenTimePickerVisible,
        isCloseTimePickerVisible: !state.isCloseTimePickerVisible
    }));
    handleOpenTimePicked = time => {
        this.setState(state => ({
            info: {
                ...state.info,
                openAt: moment(time).format("HH:mm")
            },
            isTimePickerVisible: !state.isTimePickerVisible
        }));
    };
    handleCloseTimePicked = time => {
        this.setState(state => ({
            info: {
                ...state.info,
                closeAt: moment(time).format("HH:mm")
            },
            isTimePickerVisible: !state.isTimePickerVisible
        }));
    };
    _getRealLocation = (lat, long) => {
        Geocoder.from(lat, long)
            .then(json => {
                var addressComponent = json.results[0].formatted_address;
                this.setState(state => ({
                    info: {
                        ...state.info,
                        address: addressComponent,
                    },
                    isSubmitting: false
                }))
            })
            .catch(error =>
                this.refs.toast.show('Error: faild to peform action'));
        this.setState({ isSubmitting: false })
    }
    setLocation = async (loc) => {

        const { shopLocation } = loc
        this.setState(state => ({
            info: {
                ...state.info,
                address: shopLocation
            }
        }))
    }
    render() {
        const { address, company, openAt, closeAt, workingDays } = this.state.info;
        return (
            <View style={[styles.container, { marginTop: 0 }]}>
                <ScrollView>
                    <Input
                        label="Shop or Company name"
                        leftIcon={{
                            type: "entypo",
                            name: "shop",
                            color: Colors.secondary
                        }}
                        containerStyle={styles.input}
                        underlineColorAndroid={"transparent"}
                        inputStyle={styles.inputStyle}
                        returnKeyType={"next"}
                        editable={true}
                        value={company}
                        onChangeText={value => this._handleTextInput("company", value)}
                    />
                    <Input
                        label="Location"
                        leftIcon={{
                            type: "simple-line-icon",
                            name: "directions",
                            color: Colors.secondary
                        }}
                        containerStyle={styles.input}
                        underlineColorAndroid={"transparent"}
                        inputStyle={styles.inputStyle}
                        returnKeyType={"next"}
                        editable={true}
                        value={address}
                        onChangeText={value => this._handleTextInput("address", value)}
                    />
                    <TouchableOpacity onPress={this.showOpenTimePicker}>
                        <Input
                            label='Open at'
                            leftIcon={<Image source={open} style={{ width: 30, height: 30, tintColor: Colors.secondary }} />}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            returnKeyType={"next"}
                            editable={true}
                            // onChangeText={value => this._handleTextInput('address', value)}
                            editable={false}
                            value={openAt}
                        />
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isOpenTimePickerVisible}
                        onConfirm={this.handleOpenTimePicked}
                        onCancel={this.hideTimePicker}
                        mode="time"
                    />
                    <DateTimePicker
                        isVisible={this.state.isCloseTimePickerVisible}
                        onConfirm={this.handleCloseTimePicked}
                        onCancel={this.hideTimePicker}
                        mode="time"
                    />
                    <TouchableOpacity onPress={this.showCloseTimePicker}>
                        <Input
                            label='Closed at'
                            leftIcon={<Image source={close} style={{ width: 30, height: 30, tintColor: Colors.secondary }} />}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            returnKeyType={"next"}
                            editable={true}
                            // onChangeText={value => this._handleTextInput('address', value)}
                            editable={false}
                            value={closeAt}
                        />
                    </TouchableOpacity>
                    <View style={styles.ilabel}>
                        <Icon
                            name="calendar"
                            type="simple-line-icon"
                            color={Colors.secondary}
                        />
                        <Text style={styles.label}>Working days</Text>
                    </View>
                    {Platform.OS === "ios" ? (
                        <Text>IOS</Text>
                    ) : (
                            <Picker
                                mode="dropdown"
                                selectedValue={workingDays}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) =>
                                    this._handleTextInput("workingDays", itemValue)
                                }
                            >
                                <Picker.Item
                                    label="Monday to Friday"
                                    value="Monday to Friday"
                                />
                                <Picker.Item
                                    label="Sunday to Friday"
                                    value="Sunday to Friday"
                                />
                                <Picker.Item
                                    label="Monday to Saturday"
                                    value="Monday to Saturday"
                                />
                                <Picker.Item label="Whole week" value="Whole week" />
                            </Picker>
                        )}

                    <Button
                        onPress={this._handleInfoSave.bind(this)}
                        title="Save"
                        type="clear"
                        titleStyle={{color:Colors.secondary}}
                        buttonStyle={styles.button}
                        icon={{ type: "materialIcons", name: "add", color: Colors.secondary }}
                        loading={this.state.isSubmitting}
                        activityIndicatorStyle={{ color: Colors.secondary }}
                    />
                    <Toast ref="toast"
                        style={{ backgroundColor: Colors.pureBG }}
                        position='bottom'
                        positionValue={200}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{ color: Colors.secondary }} />
                </ScrollView>
            </View >
        );
    }
}
export default CompanyInfo;
