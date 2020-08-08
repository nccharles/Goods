import React, { Component } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text, AsyncStorage,
    Platform,
} from "react-native";
import Toast, { DURATION } from 'react-native-easy-toast'
import LinearGradient from "react-native-linear-gradient";
import { Button, Card, Icon, Overlay, Input } from "react-native-elements";
import styles from "./Style/SignupStyles";
import { Colors } from "../../Assets/Themes";
//backend things
import Geocoder from 'react-native-geocoding';
import * as firebase from "firebase";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { userPhone, cName, chatName, hasLocationPermission } from '../../Config/constants'
import CartCard from "../../Components/Card/CartCard";
import TextWithLine from "../../Components/Text/TextWithLine";
import Geolocation from 'react-native-geolocation-service'
import haversine from 'haversine'
import _ from 'lodash'
Geocoder.init('AIzaSyAN6UG11K2foH4nOXtdr4KMmKnCGi8UQB0')
const options = [
    {
        key: true,
        text: 'I have Bottle',
    },
    {
        key: false,
        text: 'No Bottle',
    }
];
const payments = [
    {
        key: 1,
        text: 'Pay on Derivery',
    },
    {
        key: 2,
        text: 'Mobile Money',
    },
    {
        key: 3,
        text: 'CARD',
    }
];
const getRand = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                name: "Gas",
                Quantity: "",
                measure: "L",
                CompanyName: '',
                companyPhone: '',
                BottleAmount: '',
            },
            Bottle: '0',
            payment: '1',
            BottleStatus: true,
            coords: {},
            CustomerName: '',
            Qty: '1',
            orderID: getRand(1313131313, 9999999999),
            transId: getRand(19100000011111111111111111, 90999099999999999999999999),
            TotAmount: '',
            userPhone: '',
            primaryAddress: '',
            secondAddress: '',
            Distance: '',
            Fee: 0,
            companyCoords: {},
            errorMessage: null,
            productId: null,
            loading: true,
            isVisible: false,
            isSubmitting: false
        };
    }

    componentDidMount = async () => {

        const Phone = await AsyncStorage.getItem(userPhone)
        const CustomerName = await AsyncStorage.getItem(chatName)
        if (this.props.route.params) {
            const { data: { name, Quantity, price, companyPhone, CompanyName, BottleAmount, uid } } = this.props.route.params
            this.setState(state => ({
                product: {
                    ...state.product, CompanyName, companyPhone,
                    name, Quantity, price, BottleAmount
                },
                TotAmount: price,
                productId: uid
            }));
        }
        this.setState({
            isSubmitting: true,
            CustomerName,
            userPhone: Phone
        });
        this._getCompanyInfo()

    }
    _getCompanyInfo = async () => {
        const { companyPhone } = this.state.product
        this.setState({ loading: true })
        const that = this
        await firebase.database()
            .ref(`/infos/${companyPhone}`)
            .once('value').then(snapshot => {
                const coordinates = snapshot.val().companyInfo
                this.getLocation(coordinates)
                if (coordinates) {
                    that.setState({
                        companyCoords: coordinates,
                        loading: false,
                    })
                }
            })
    }
    getLocation = async (coordinates) => {
        const isLocationPermetted = await hasLocationPermission()

        if (!isLocationPermetted) return;

        this.setState({ isSubmitting: true })
        Geolocation.getCurrentPosition(
            (position) => {
                const { coords } = position
                this.setState({ coords });
                this._getRealLocation(coords.latitude, coords.longitude, coordinates)
            },
            (error) => {
                this.setState({ location: error, isSubmitting: false });
                console.log(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 10, forceRequestLocation: true }
        );
    }
    _getRealLocation = (lat, long, companyCoords) => {
        const { latitude, longitude } = companyCoords
        let Distance = haversine({ latitude: lat, longitude: long }, { latitude, longitude }, { unit: 'km' });
        Distance = (Math.round(Distance * 100) / 100).toFixed(2)
        const Fee = 300 + (Number(Distance) * 100)
        Geocoder.from(lat, long)
            .then(json => {
                const primaryAddress = json.results[2].formatted_address;
                const secondAddress = json.results[0].formatted_address;
                this.setState(state => ({
                    TotAmount: parseInt(state.TotAmount) + parseInt(Fee),
                    primaryAddress,
                    secondAddress,
                    Distance,
                    Fee,
                    isSubmitting: false
                }))
            })
            .catch(error =>
                this.refs.toast.show('Error: faild to peform action'));
        this.setState({ isSubmitting: false })
    }
    _handleChangeValue = (key, value) => {
        this.setState({
            [key]: value
        });
        this.setState(state => ({
            TotAmount: ((parseInt(state.product.price) + parseInt(state.Bottle)) * parseInt(state.Qty)) + parseInt(state.Fee)
        }))
    }
    _handleTextInput = (key, value) => {
        this.setState({
            [key]: value
        });
    }
    _handleChangeOption = (key, value) => {

        this.setState({
            [key]: value
        });
        if (key === 'payment') {
            return false
        }

        if (value === false) {
            this.setState(state => ({
                Bottle: parseInt(state.product.BottleAmount),
                TotAmount: ((parseInt(state.product.price) + parseInt(state.product.BottleAmount)) * parseInt(state.Qty)) + parseInt(state.Fee)
            }))
        } else {
            this.setState(state => ({
                Bottle: 0,
                TotAmount: (parseInt(state.product.price) * parseInt(state.Qty)) + parseInt(state.Fee)
            }))
        }
    };
    _handlePayment = () => {
        const {
            isSubmitting
        } = this.state;
        if (isSubmitting) {
            return;
        }
        this.setState({ isVisible: true })
    }


    _handleProceedOrder = async () => {
        const {
            product: {
                name,
                Quantity,
                price,
                CompanyName,
                companyPhone
            },
            userPhone,
            Bottle,
            secondAddress,
            productId,
            TotAmount,
            Qty, orderID,
            CustomerName,
            payment,
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
            .ref(`/orders/`)
            .push({
                productId,
                CompanyName,
                companyPhone,
                CustomerPhone: userPhone,
                ProductName: name,
                BottleQty: name === 'Gas' ? `${Quantity} Kg` : `${Quantity} L`,
                unitPrice: price,
                orderID,
                CustomerName,
                status: 1,
                address: secondAddress,
                TotalPrice: TotAmount,
                BottleAmount: Bottle,
                BottleNumber: Qty,
                PaymentMethod: payment == 1 ? 'Cash' : payment == 2 ? 'MOMO' : 'CARD',
                payed: false,
                OrderAt: this.timestamp
            })
            .then(async (response) => {
                that.setState({
                    isSubmitting: false,
                    isVisible: false
                });
                that.props.navigation.navigate('AccessStack', { screen: 'Orders' });;
            })
            .catch(err => {
                that.setState({
                    isSubmitting: false
                });
            });
    };
    _handleMoMOpayment = async () => {
        this._handleProceedOrder()
                  
    }
    //backend end
    get timestamp() {
        return new Date().valueOf();
    }


    render() {
        const { primaryAddress, Distance, Fee, secondAddress, errorMessage, product: { name, CompanyName, measure, price, Quantity }, TotAmount, payment, Qty, BottleStatus } = this.state;
        return (
            <View style={[styles.container, { paddingTop: 0 }]}>
                <ScrollView>
                    <CartCard item={name} iQty={Number(Qty)} onChange={value => this._handleChangeValue("Qty", value)} type={name.toLowerCase()} price={`${price} RWF | `} Qty={`${Quantity} ${name === 'Gas' ? 'Kg' : 'L'}`} />
                    <TextWithLine CustomText="Delivery address & fee" />
                    <Card
                        containerStyle={{ elevation: 3, borderRadius: 0, borderWidth: 0, backgroundColor: Colors.pureBG }}
                        title={primaryAddress || 'Loading...'}
                        titleStyle={{ fontFamily: 'Roboto', textAlign: 'left', color: Colors.pureTxt }}
                    >
                        <Text style={{ marginBottom: 10, fontFamily: 'Roboto_medium', textAlign: 'left', color: Colors.pureTxt }}>
                            Distance: {Number(Distance)}Km from {CompanyName}
                        </Text>
                        <Text style={{ marginBottom: 10, fontFamily: 'Roboto_medium', textAlign: 'left', color: Colors.pureTxt }}>
                            Delivery Fee: RWF {Fee}
                        </Text>
                    </Card>
                </ScrollView>
                <View style={styles.bottomModal}>
                    {options.map(item =>
                        <View key={item.key} style={styles.buttonContainer}>
                            <Text style={styles.radioText}>{item.text}</Text>
                            <TouchableOpacity
                                style={styles.circle}
                                onPress={() => this._handleChangeOption("BottleStatus", item.key)}
                            >
                                {item.key === BottleStatus && (<View style={styles.checkedCircle}><MaterialCommunityIcons name="check" size={20} color={Colors.secondary} /></View>)}
                            </TouchableOpacity>
                        </View>
                    )
                    }
                    <TextWithLine CustomText="Payment Info" />
                    <View style={styles.checkoutSide}>
                        <View style={styles.amount}>
                            <Text style={styles.amountTitle}>Total Amount</Text>
                            <Text style={styles.Tamount}>RWF {TotAmount}</Text>
                        </View>
                        <Button
                            onPress={this._handlePayment.bind(this)}
                            title="PROCEED"
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: Colors.gradientBtn,
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 },
                            }}
                            type="clear"
                            titleStyle={{ color: 'white' }}
                            buttonStyle={styles.btnCheckout}
                            icon={{ type: "entypo", name: "shopping-cart", size: 15, color: 'white' }}
                            loading={this.state.isSubmitting}
                            activityIndicatorStyle={{ color: Colors.pureTxt }}
                        />
                    </View>
                </View>
                <Overlay
                    isVisible={this.state.isVisible}
                    windowBackgroundColor="rgba(0, 0, 0, .3)"
                    overlayBackgroundColor={Colors.pureBG}
                    width="auto"
                    height="auto"
                    onBackdropPress={() => this.setState({ isVisible: false, isSubmitting: false })}
                >
                    <TextWithLine CustomText="Select a Payment" />
                    {payments.map(item =>
                        <View key={item.key} style={styles.buttonContainer}>
                            <Text style={styles.radioText}>{item.text}</Text>
                            <TouchableOpacity
                                style={styles.circle}
                                onPress={() => this._handleChangeOption("payment", item.key)}
                            >
                                {item.key == payment && (<View style={styles.checkedCircle}><MaterialCommunityIcons name="check" size={20} color={Colors.secondary} /></View>)}
                            </TouchableOpacity>
                        </View>
                    )
                    }
                    {errorMessage === null ? null : <Text style={{ color: Colors.red, backgroundColor: Colors.mainBG }}>{errorMessage}</Text>}
                    {payment == 2 && <Input
                        label="Phone Number"
                        placeholder=""
                        leftIcon={{
                            type: "entypo",
                            name: "phone",
                            color: Colors.blue
                        }}
                        containerStyle={styles.input}
                        underlineColorAndroid={"transparent"}
                        inputStyle={styles.inputStyle}
                        returnKeyType={"next"}
                        editable={true}
                        value={this.state.userPhone}
                        keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                        onChangeText={value => this._handleTextInput("userPhone", value)}
                    />}
                    <Button
                        onPress={payment == 1 ? this._handleProceedOrder.bind(this) : this._handleMoMOpayment.bind(this)}
                        title={payment == 1 ? "ORDER" : "PAY NOW"}
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: Colors.gradientColors,
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}
                        type="clear"
                        buttonStyle={styles.button}
                        icon={{ type: "entypo", name: "check", color: Colors.blue }}
                        loading={this.state.isSubmitting}
                        activityIndicatorStyle={{ color: Colors.pureTxt }}
                    />
                </Overlay>

                <Toast ref="toast"
                    style={{ backgroundColor: Colors.pureBG }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: Colors.pureTxt }} />
            </View >
        );
    }
}
export default Checkout;
