import React, { Component } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text, Alert, AsyncStorage,
    Platform,
} from "react-native";
import Toast, { DURATION } from 'react-native-easy-toast'
import LinearGradient from "react-native-linear-gradient";
import { Button, Card, Icon, Badge, Overlay, Input } from "react-native-elements";
import styles from "../AccountApp/Style/SignupStyles";
import { Colors } from "../../Assets/Themes";
//backend things
import Geocoder from 'react-native-geocoding';
import * as firebase from "firebase";
import _ from 'lodash'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { userPhone, cName, chatName, cartData, hasLocationPermission } from '../../Config/constants'
import CartCard from "../../Components/Card/CartCard";
import TextWithLine from "../../Components/Text/TextWithLine";
import Geolocation from 'react-native-geolocation-service'
import ContentLoader, { Bullets } from "react-native-easy-content-loader";
import Payment from "../../Components/Customs/paymentCard";
import CartHeader from "../../Components/Header/CartHeader";
Geocoder.init('AIzaSyAN6UG11K2foH4nOXtdr4KMmKnCGi8UQB0')
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
        text: 'Card',
    }
];
const getRand = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
export default class Mycart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curProducts: [],
            Bottle: '0',
            payment: '1',
            BottleStatus: true,
            coords: {},
            Qty: {},
            CustomerName: '',
            transId: getRand(19100000011111111111111111, 90999099999999999999999999),
            TotAmount: 0,
            userPhone: '',
            primaryAddress: '',
            secondAddress: '',
            errorMessage: null,
            productId: null,
            loading: true,
            isVisible: false,
            isSubmitting: true
        };
    }

    componentDidMount = async () => {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this._getData()
        });
        this._getMyLocation()
    }
    _getData = async () => {
        const Phone = await AsyncStorage.getItem(userPhone)
        const curCart = await AsyncStorage.getItem(cartData)
        let curProducts = JSON.parse(curCart);
        if (!curProducts) {
            this.setState({ isSubmitting: false })
            return
        }
        const CustomerName = await AsyncStorage.getItem(chatName)
        this.setState({
            curProducts,
            CustomerName,
            TotAmount: 0,
            userPhone: Phone
        });
        curProducts.map((val, uid) => {
            this.setState(state => ({
                TotAmount: Number(state.TotAmount) + (Number(val.price) * Number(val.Qty))
            }))
        })
    }
    _getMyLocation = async () => {
        const isLocationPermetted = await hasLocationPermission()

        if (!isLocationPermetted) return;

        Geolocation.getCurrentPosition(
            (position) => {
                const { coords } = position
                this.setState({ coords });
                this._getRealLocation(coords.latitude, coords.longitude)
            },
            (error) => {
                const { code, message } = error;
                this.setState({ isSubmitting: false })
                this.refs.toast.show(`Error:${message}`);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 10, forceRequestLocation: true }
        );

    }
    _getRealLocation = (lat, long) => {
        Geocoder.from(lat, long)
            .then(json => {
                const primaryAddress = json.results[2].formatted_address;
                const secondAddress = json.results[0].formatted_address;
                this.setState({
                    primaryAddress,
                    secondAddress,
                    isSubmitting: false
                })
            })
            .catch(error =>
                this.refs.toast.show('Error: faild to peform action'));
        this.setState({ isSubmitting: false })
    }
    _handleChangeValue = async (key, value, curData) => {
        let { curProducts } = this.state
        if (value == 0) {
            return this.removeToCat(curData)
        }
        curProducts.forEach((val) => {
            curData[key] = value
        })
        this.setState({
            curProducts,
            TotAmount: 0
        });
        curProducts.map((val, uid) => {
            this.setState(state => ({
                TotAmount: Number(state.TotAmount) + (Number(val.price) * Number(val.Qty))
            }))
        })
        await AsyncStorage.setItem(cartData, JSON.stringify(curProducts))
            .then(() => {

            })
            .catch(() => {
                Alert.alert('Error', `There was an error`)
            })
    }
    removeToCat = async (newData) => {
        const currentData = await AsyncStorage.getItem(cartData)
        let curProduct = JSON.parse(currentData);
        curProduct = _.reject(curProduct, el => { return el.name === newData.name; });
        await AsyncStorage.setItem(cartData, JSON.stringify(curProduct))
            .then(async () => {
                const curCart = await AsyncStorage.getItem(cartData)
                let curProducts = JSON.parse(curCart);
                if (!curProducts) return this.props.navigation.goBack()
                this.setState({
                    curProducts,
                    TotAmount: 0
                });
                curProducts.map((val, uid) => {
                    this.setState(state => ({
                        TotAmount: Number(state.TotAmount) + (Number(val.price) * Number(val.Qty))
                    }))
                })
            })
            .catch(() => {
            })

    }
    _emptyCart = () => {
        Alert.alert('Remove all Items', 'Do you want to empty cart?', [
            {
                text: "Yes",
                onPress: () => this.removeAllToCat(),
                style: "cancel"
            },
            { text: "NO" }
        ],
            { cancelable: false })
    }
    removeAllToCat = async () => {
        await AsyncStorage.removeItem(cartData).then(() =>
            this.setState({ curProducts: [], TotAmount: 0 }))
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
                Bottle: parseInt(this.state.product.BottleAmount),
                TotAmount: (parseInt(this.state.product.price) + parseInt(this.state.product.BottleAmount)) * parseInt(this.state.Qty)
            }))
        } else {
            this.setState(state => ({
                Bottle: 0,
                TotAmount: parseInt(this.state.product.price) * parseInt(this.state.Qty)
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
            curProducts,
            userPhone,
            secondAddress,
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
        curProducts.map(async (val) => {
            let orderID = getRand(1313131313, 9999999999)
            await firebase
                .database()
                .ref(`/orders/`)
                .push({
                    productId: val.uid,
                    CompanyName: val.CompanyName,
                    companyPhone: val.companyPhone,
                    CustomerPhone: userPhone,
                    ProductName: val.name,
                    BottleQty: 0,
                    unitPrice: val.price,
                    orderID,
                    CustomerName,
                    status: 1,
                    image_url: val.image_url,
                    address: secondAddress,
                    TotalPrice: Number(val.price) * Number(val.Qty),
                    BottleAmount: 0,
                    BottleNumber: val.Qty,
                    PaymentMethod: payment == 1 ? 'Cash' : payment == 2 ? 'MOMO' : 'CARD',
                    payed: false,
                    OrderedAt: this.timestamp
                })
                .then(async (response) => {
                    that.setState({
                        isSubmitting: false,
                        isVisible: false
                    });
                    await AsyncStorage.removeItem(cartData)
                    that.setState({ curProducts: [], TotAmount: 0 })
                    that.props.navigation.navigate('AccessStack', { screen: 'Orders' });
                })
                .catch(err => {
                    that.setState({
                        isSubmitting: false
                    });
                });
        })
    };
    _handleMoMOpayment = async () => {
        this._handleProceedOrder()

    }
    //backend end
    get timestamp() {
        return new Date().valueOf();
    }


    render() {
        const { primaryAddress, isSubmitting, errorMessage, curProducts, TotAmount, payment, BottleStatus } = this.state;
        return (
            <View style={[styles.container, { paddingTop: 0 }]}>
                <CartHeader title="Cart" onPress={this._emptyCart} />
                {!isSubmitting && TotAmount == 0 ? <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                    <MaterialCommunityIcons name="cart-off" color={Colors.mainBG} size={200} />
                    <Text style={{ color: 'lightgray', fontFamily: 'Roboto_medium' }}>your Cart is Empty</Text>
                </View> :
                    <ScrollView>
                        <ContentLoader active avatar
                            aShape="square"
                            containerStyles={styles.list}
                            pRows={2}
                            listSize={5}
                            primaryColor={Colors.pureBG}
                            secondaryColor={Colors.mainBG}
                            sHeight={[500, 100, 100]}
                            pWidth={[300, 500, 300]}
                            loading={isSubmitting}>
                            {curProducts.map(item => {
                                return (
                                    <CartCard key={item.uid} item={item.name}
                                        iQty={Number(item.Qty)}
                                        onChange={value => this._handleChangeValue("Qty", value, item)}
                                        type={item.name.toLowerCase()}
                                        picture={item.image_url}
                                        company={item.CompanyName}
                                        price={`RWF ${item.price}/${item.measure} `} />

                                )
                            })}
                        </ContentLoader>
                    </ScrollView>}
                {TotAmount != 0 &&
                    <View style={styles.bottomModal}>
                        <TextWithLine CustomText="Payment Info" />
                        <View style={styles.checkoutSide}>
                            <View style={styles.amount}>
                                <Text style={styles.amountTitle}>Total Amount</Text>
                                <Text style={styles.Tamount}>RWF {TotAmount}</Text>
                            </View>
                            <Button
                                onPress={this._handlePayment.bind(this)}
                                title="CHECKOUT"
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
                    </View>}
                <Payment isVisible={this.state.isVisible}
                    toggleCart={() => this.setState({ isVisible: false, isSubmitting: false })}
                >
                    <TextWithLine CustomText="Delivery address & Payment method" />
                    <Card
                        containerStyle={{ elevation: 1, borderRadius: 0, borderWidth: 0, backgroundColor: Colors.pureBG, marginBottom: 10 }}
                        title={primaryAddress || 'Loading...'}
                        titleStyle={{ fontFamily: 'Roboto', color: Colors.pureTxt, textAlign: 'left' }}
                    >
                        <View>
                            {payments.map(item =>
                                <View key={item.key} style={[styles.buttonContainer, { width: "100%" }]}>
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
                        </View>
                    </Card>

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
                        buttonStyle={[styles.button, { borderRadius: 0 }]}
                        titleStyle={{ color: Colors.secondary }}
                        icon={{ type: "entypo", name: "check", color: Colors.secondary }}
                        loading={this.state.isSubmitting}
                        activityIndicatorStyle={{ color: Colors.pureTxt }}
                    />
                </Payment>

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
