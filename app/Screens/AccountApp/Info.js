import React, { Component } from 'react'
import {
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Text,
    ScrollView,
    Image,
    Picker,
} from 'react-native'
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePicker from "react-native-modal-datetime-picker";
import Toast, { DURATION } from 'react-native-easy-toast'
import {
    Input,
    Button,
    Icon
} from 'react-native-elements'
import PlacesInput from 'react-native-places-input';
import LinearGradient from 'react-native-linear-gradient'
import styles from './Style/Infostyles'
import open from '../../Assets/Icons/open-sign.png'
import close from '../../Assets/Icons/closed.png'
import { Colors } from '../../Assets/Themes'
import Entypo from 'react-native-vector-icons/Entypo'
//backend imports 
import * as firebase from 'firebase'
import _ from 'lodash'
import { userPhone, cName, hasLocationPermission } from '../../Config/constants';
import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding';
const GOOGLE_API_KEY="AIzaSyAN6UG11K2foH4nOXtdr4KMmKnCGi8UQB0"
Geocoder.init(GOOGLE_API_KEY)
class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // showAlert: false,
            isOpenTimePickerVisible: false,
            isCloseTimePickerVisible: false,
            info: {
                address: null,
                openAt: null,
                closeAt: null,
                workingDays: null,
                latitude: null,
                longitude: null,
                company: null,
            },
            phone: null,
            errorMessage: null,
            infoId: null,
            loading: true,
            isSubmitting: false,
        };
    };
    //backend codes
    async componentDidMount() {
        const Phone = await AsyncStorage.getItem(userPhone)
        this.setState({
            phone: Phone,
        })
        this.getLocation()
        this._getUserInfo()
    }

    _handleTextInput = (key, value) => {
        this.setState(state => ({
            info: {
                ...state.info,
                [key]: value
            }
        }))
    }
    _getUserInfo = async () => {
        await firebase.database().ref(`/infos/${this.state.phone}/companyInfo`)
            .once("value")
            .then(snapshot => {
                try {
                    this.setState({
                        info: {
                            ...this.state.info,
                            ...snapshot.val()
                        },
                    })
                } catch (error) { }

            });
    }
   
    getLocation = async () => {
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
            this.setState({ isSubmitting: false })
            this.refs.toast.show(`Network Error:${error.message}`);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 10, forceRequestLocation: true }
        );
      }
    showOpenTimePicker = () => this.setState({ isOpenTimePickerVisible: true });
    showCloseTimePicker = () => this.setState({ isCloseTimePickerVisible: true });
    hideTimePicker = () => this.setState({ isOpenTimePickerVisible: false, isCloseTimePickerVisible: false });
    handleOpenTimePicked = time => {
        this.setState(state => ({
            info: {
                ...state.info,
                openAt: moment(time).format("HH:mm")
            },
            isTimePickerVisible: false
        }));
    };
    handleCloseTimePicked = time => {
        this.setState(state => ({
            info: {
                ...state.info,
                closeAt: moment(time).format("HH:mm")
            },
            isTimePickerVisible: false
        }));
    };
    _handleInfoUpdate = async () => {
        const { info: { address, closeAt, openAt, workingDays, company, email, latitude, longitude }, infoId, isSubmitting } = this.state
        if (isSubmitting) {
            return
        }
        this.setState({
            isSubmitting: true
        })

        await firebase.database().ref(`/infos/${this.state.phone}/companyInfo`)
            .update({
                address,
                closeAt,
                openAt,
                workingDays,
                completed: true,
                company,
                latitude,
                longitude,
            })
            .then(async () => {
                await AsyncStorage.setItem(cName, company).then(() => {
                    this.setState({
                        isSubmitting: false,
                    })
                })

                this.refs.toast.show("Information saved!")
                const { navigation } = this.props
                navigation.goBack();
                const { setUpdate } = navigation.state.params
                setUpdate({ companyPhone: this.state.phone })

            })
            .catch(err => {
                this.setState({
                    isSubmitting: false,
                })
            })
    }
    _getRealLocation = (lat, long) => {
        Geocoder.from(lat, long)
            .then(json => {
                var addressComponent = json.results[2].formatted_address;
                this.setState(state => ({
                    info: {
                        ...state.info,
                        address: addressComponent,
                    },
                    isSubmitting: false
                }))
            })
            .catch(error =>
                this.refs.toast.show(`Error: ${error}`));
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
        // const { showAlert } = this.state;
        const { address, openAt, closeAt, company, workingDays } = this.state.info
        return (
            <View
                onResponderRelease={(event) => { Keyboard.dismiss(); }}
                style={styles.container}>

                {/* <Text style={styles.logo}>AccountApp</Text> */}
                    <ScrollView>
                        <Input
                            label='Shop name'
                            leftIcon={{ type: 'material-community', name: 'city', color: Colors.secondary }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            returnKeyType={"next"}
                            onChangeText={value => this._handleTextInput('company', value)}
                            editable={true}
                            value={company}
                        />
                        <Input
                            label='Location'
                            leftIcon={{ type: 'simple-line-icon', name: 'directions', color:Colors.secondary }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            returnKeyType={"next"}
                            editable={true}
                            onChangeText={value => this._handleTextInput('address', value)}
                            value={address}
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
                                name='calendar'
                                type='simple-line-icon'
                                color={Colors.secondary}
                            />
                            <Text style={styles.label}>
                                Working days
                            </Text>
                        </View>
                        <Picker
                            mode="dropdown"
                            selectedValue={workingDays}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => this._handleTextInput('workingDays', itemValue)}>
                            <Picker.Item label="Monday to Friday" value="Monday to Friday" />
                            <Picker.Item label="Sunday to Firday" value="Sunday to Friday" />
                            <Picker.Item label="Monday to Saturday" value="Monday to Saturday" />
                            <Picker.Item label="Whole week" value="Whole week" />
                        </Picker>
                        <Button
                            onPress={this._handleInfoUpdate.bind(this)}
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: Colors.gradientColors,
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 },
                            }}
                            type="clear"
                            buttonStyle={styles.button}
                            title='Update Info'
                            loading={this.state.isSubmitting}
                            icon={{ type: 'entypo', name: 'cw', color: Colors.secondary }}
                        />
                    </ScrollView>
                    <Toast ref="toast"
                        style={{ backgroundColor: Colors.mainTxt }}
                        position='bottom'
                        positionValue={140}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={1}
                        textStyle={{ color: Colors.mainBG }} />
            </View>
        )
    }
}

export default Info;