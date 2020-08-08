import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    Modal,
    FlatList,
    Alert,
    StyleSheet,
    SafeAreaView,
    Keyboard, Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
// native base imports
import {
    Item,
    Icon
} from 'native-base'
import * as firebase from 'firebase'
import data from '../../Assets/resources/countries'
import { Colors } from '../../Assets/Themes'
import _ from 'lodash'
import { CommonActions } from '@react-navigation/native';
import Form from 'react-native-form';
import { Button, CheckBox, Overlay } from "react-native-elements";
import Toast, { DURATION } from 'react-native-easy-toast'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { userPhone, userCountry, cName, chatName } from '../../Config/constants'
import AsyncStorage from '@react-native-community/async-storage'
import Agreement from '../../Components/Text/Agreement';
const getRand = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
// Default render of country flag
const defaultFlag = data.filter(
    obj => obj.name === 'Rwanda'
)[0].flag
const MAX_LENGTH_CODE = 6;
const MAX_LENGTH_NUMBER = 9;
const { width, height } = Dimensions.get('window');
export default class Login extends Component {
    state = {
        flag: defaultFlag,
        enterCode: false,
        spinner: false,
        isCodeSent: false,
        countryName: 'Rwanda',
        callingCode: '+250',
        modalVisible: false,
        agree: true,
        phoneNumber: '',
        checked: '',
        confirm: '',
        item: null,
        isVisible: false,
        Code: getRand(191000, 909990),
        credentails: {
            completed: false
        },
    }
    componentDidMount = async () => {
        if (this.props.route.params) {
            const { item } = this.props.route.params
            this.setState({
                item
            })
        }
    }
    isEmpty = (obj) => {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return true;
    }
    _getCode = () => {
        if (this.state.phoneNumber.length !== MAX_LENGTH_NUMBER) {
            this.refs.toast.show('Please add a valid number');

            return;
        }

        this.setState({ spinner: true });
            this.setState({
                spinner: false,
                enterCode: true,
                isCodeSent: true,
                confirm: this.state.Code,
                checked: this.state.Code
            });
            return

    }

    _verifyCode = () => {
        let { checked, confirm, item } = this.state
        this.setState({ spinner: true });
        setTimeout(async () => {

            try {

                if (checked != confirm) {
                    this.refs.form.refs.textInput.blur();
                    this.setState({ spinner: false });
                    setTimeout(() => {
                        Alert.alert('Warning!', 'You have entered invalid Code');
                    }, 100);
                } else {
                    await firebase
                        .database()
                        .ref(`/infos/${this.state.callingCode + this.state.phoneNumber}/companyInfo`)
                        .once("value")
                        .then(snapshot => {
                            this.setState({
                                credentails: {
                                    ...this.state.credentails,
                                    ...snapshot.val()
                                }
                            });
                        })
                    await firebase
                        .database()
                        .ref(`/infos/${this.state.callingCode + this.state.phoneNumber}/privateInfo`)
                        .once("value")
                        .then(snapshot => {
                            this.setState({
                                credentails: {
                                    ...this.state.credentails,
                                    ...snapshot.val()
                                }
                            });
                        })
                    this.refs.form.refs.textInput.blur();
                    if (this.state.credentails.completed) {
                        this.setState({ spinner: false });
                        try {
                            if (this.state.credentails.company) {
                                await AsyncStorage.setItem(cName, this.state.credentails.company)
                            }
                            await AsyncStorage.setItem(userPhone, this.state.callingCode + this.state.phoneNumber)
                            await AsyncStorage.setItem(userCountry, this.state.countryName)
                                .then(async () => {
                                    await AsyncStorage.setItem(chatName, this.state.credentails.displayName)
                                        .then(() =>
                                            this.props.navigation.dispatch(
                                                CommonActions.reset({
                                                    index: 0,
                                                    routes: [{ name: 'AccessStack' }]
                                                })))

                                })
                        } catch (error) {
                            this.refs.toast.show(error.message, () => {
                                this.setState({ spinner: false });
                            });
                        }
                        return
                    }
                    await AsyncStorage.setItem(userPhone, this.state.callingCode + this.state.phoneNumber)
                    await AsyncStorage.setItem(userCountry, this.state.countryName)
                        .then(() =>
                            this.props.navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: 'WelcomeStack' }]
                                })));

                }

            } catch (err) {
                this.setState({ spinner: false });
                setTimeout(() => {
                    this.refs.toast.show(err.message);
                }, 100);
            }

        }, 1000);

    }

    _onChangeText = (value) => {
        if (!this.state.enterCode) {
            this.setState({ phoneNumber: value });
        } else {
            this.setState({ checked: value });
        }
    }

    _tryAgain = () => {
        this.refs.form.refs.textInput.setNativeProps({ text: '' })
        this.refs.form.refs.textInput.focus();
        this.setState({ enterCode: false });
    }

    _getSubmitAction = () => {
        this.state.enterCode ? this._verifyCode() : this._getCode();
    }
    _renderFooter = () => {

        if (this.state.enterCode)
            return (
                <View>
                    <Text style={styles.wrongNumberText} onPress={this._tryAgain}>
                        Enter the wrong number? or need a new code?
      </Text>
                </View>
            );

        return (
            <View>
                <Text style={styles.disclaimerText}>By tapping "Continue" above, we will send you an SMS to confirm your phone number.</Text>
            </View>
        );

    }
    showModal() {
        this.setState({ modalVisible: true })
    }
    hideModal() {
        this.setState({ modalVisible: false })
        // Refocus on the Input field after selecting the country code
        this.refs.form.refs.textInput.focus();
    }

    async getCountry(country) {
        const countryData = await data
        try {
            const countryCode = await countryData.filter(
                obj => obj.name === country
            )[0].dial_code
            const countryFlag = await countryData.filter(
                obj => obj.name === country
            )[0].flag
            const countryName = await countryData.filter(
                obj => obj.name === country
            )[0].name
            // Set data from user choice of country
            this.setState({ callingCode: countryCode, flag: countryFlag, countryName })
            await this.hideModal()
        }
        catch (err) { }
    }

    render() {
        let { flag } = this.state
        const countryData = data

        let headerText = `${this.state.enterCode ? 'Verification Code?' : this.state.countryName}`
        let buttonText = this.state.enterCode ? 'Verify code  ' : 'Continue  ';
        let textStyle = this.state.enterCode ? {
            flex: 1,
            textAlign: 'center',
            fontSize: 40,
            fontWeight: 'bold',
        } : {};
        let enterCode = this.state.enterCode ? {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
        } : {};
        return (
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <Form ref={'form'} style={styles.infoContainer}>
                            {/* Phone input with native-base */}
                            {/* phone section  */}
                            <View style={styles.itemStyle}>
                                <Text style={[styles.countryTitle, enterCode]}>{headerText}</Text>
                            </View>
                            <Item style={styles.itemStyle}>
                                {!this.state.enterCode && <Icon
                                    active
                                    name='call'
                                    style={[styles.iconStyle, { color: Colors.green }]}
                                />}
                                {/* country flag */}
                                {!this.state.enterCode && <View><Text style={{ fontSize: 30 }}>{flag}</Text></View>}
                                {/* open modal */}
                                {!this.state.enterCode && <Icon
                                    active
                                    name='md-arrow-dropdown'
                                    style={[styles.iconStyle, { marginHorizontal: 5 }]}
                                    onPress={() => this.showModal()}
                                />}
                                {!this.state.enterCode && <View><Text style={styles.codeInput}>{this.state.callingCode}</Text></View>}
                                <TextInput
                                    ref={'textInput'}
                                    name={this.state.enterCode ? 'code' : 'phoneNumber'}
                                    type={'TextInput'}
                                    underlineColorAndroid={'transparent'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    placeholder={this.state.enterCode ? '_ _ _ _ _ _' : ''}
                                    keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                                    style={[styles.input, textStyle]}
                                    returnKeyType='go'
                                    placeholderTextColor={Colors.mainTxt}
                                    selectionColor={Colors.pureTxt}
                                    maxLength={this.state.enterCode ? MAX_LENGTH_CODE : MAX_LENGTH_NUMBER}
                                    onSubmitEditing={this._getSubmitAction}
                                    onChangeText={this._onChangeText}
                                />
                                {/* Modal for country code and flag */}
                                <Modal
                                    animationType="slide" // fade
                                    transparent={false}
                                    visible={this.state.modalVisible}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flex: 10, paddingHorizontal: 12, paddingTop: 10, backgroundColor: Colors.mainBG }}>
                                            <FlatList
                                                data={countryData}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={
                                                    ({ item }) =>
                                                        <TouchableOpacity
                                                            onPress={() => this.getCountry(item.name)}>
                                                            <View
                                                                style={
                                                                    [
                                                                        styles.countryStyle,
                                                                        {
                                                                            flexDirection: 'row',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'space-between'
                                                                        }
                                                                    ]
                                                                }>
                                                                <Text style={{ fontSize: 30 }}>
                                                                    {item.flag}
                                                                </Text>
                                                                <Text style={{ fontSize: 12, color: Colors.mainTxt }}>
                                                                    {item.name} ({item.dial_code})
                                    </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                }
                                            />
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => this.hideModal()}
                                            style={styles.closeButtonStyle}>
                                            <MaterialCommunityIcons
                                                name="close"
                                                size={30}
                                                color={Colors.mainBG} />
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </Item>
                            <CheckBox
                                title='I agree the Terms of Use'
                                checkedIcon='dot-circle-o'
                                onIconPress={() => this.setState({ agree: !this.state.agree })}
                                uncheckedIcon='circle-o'
                                onPress={() => this.setState({ isVisible: !this.state.isVisible })}
                                containerStyle={styles.CheckBoxStyle}
                                textStyle={styles.checkTitleStyle}
                                checkedColor={Colors.secondary}
                                checked={this.state.agree}
                            />
                            <Agreement isVisible={this.state.isVisible} toggleTerms={() => this.setState({ isVisible: !this.state.isVisible })} />
                            <Overlay
                                isVisible={this.state.isCodeSent}
                                windowBackgroundColor="rgba(0, 0, 0, .3)"
                                overlayBackgroundColor={Colors.pureBG}
                                width={200}
                                height="auto"
                                overlayStyle={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}
                                onBackdropPress={() => this.setState({ isCodeSent: false, isSubmitting: false })}
                            >
                                <MaterialCommunityIcons
                                    name="checkbox-marked-circle-outline"
                                    size={100}
                                    color={Colors.blue} />
                                <Text style={[{ color: Colors.mainTxt, fontFamily: 'Roboto' }]}>Your OTP has been sent. Please check on your mobile phone number.</Text>
                                <Button
                                    onPress={() => this.setState({ isCodeSent: false })}
                                    title={'Ok'}
                                    type="clear"
                                    titleStyle={[styles.buttonText, { color: Colors.mainTxt, fontFamily: 'Roboto_medium' }]}
                                    buttonStyle={[styles.button, { borderRadius: 0, width: 80, backgroundColor: Colors.mainBG }]}
                                    loading={this.state.spinner}
                                    activityIndicatorStyle={{ color: Colors.mainTxt }}
                                />
                            </Overlay>
                            <Button
                                onPress={this._getSubmitAction}
                                title={buttonText}
                                type="clear"
                                disabled={!this.state.agree}
                                titleStyle={[styles.buttonText, { color: 'white' }]}
                                buttonStyle={[styles.button, { borderRadius: 0 }]}
                                loading={this.state.spinner}
                                activityIndicatorStyle={{ color: 'white' }}
                            />
                            {this._renderFooter()}
                            <Toast ref="toast"
                                style={{ backgroundColor: Colors.mainTxt }}
                                position='bottom'
                                positionValue={200}
                                fadeInDuration={750}
                                fadeOutDuration={1000}
                                opacity={1}
                                textStyle={{ color: Colors.mainBG }} />
                        </Form>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.pureBG,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    countryTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: Colors.mainTxt,
        paddingHorizontal: 12
    },
    input: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: Colors.mainTxt,
    },
    codeInput: {
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: Colors.mainTxt,
    },
    infoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 12,
        backgroundColor: Colors.pureBG,
    },
    itemStyle: {
        marginBottom: 2,
    },
    iconStyle: {
        color: Colors.mainTxt,
        fontSize: 23,
        marginLeft: 15
    },
    CheckBoxStyle: {
        paddingVertical: 2,
        paddingHorizontal: 12,
        margin: 0,
        borderWidth: 0,
        alignSelf: 'center',
        width: width - 50,
        backgroundColor: Colors.pureBG,
    },
    checkTitleStyle: {
        color: Colors.mainTxt,
        textTransform: 'capitalize',
        fontSize: width / 30,
        textDecorationLine: 'underline'
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: Colors.pureBG,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        height: 40,
        width: width - 20,
        elevation: 0,
        backgroundColor: Colors.primary,
        // opacity:.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.pureTxt,
        fontSize: width / 25,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    textStyle: {
        padding: 5,
        fontSize: 20,
        color: Colors.mainBG,
        fontWeight: 'bold'
    },
    countryStyle: {
        flex: 1,
        backgroundColor: Colors.mainBG,
        borderTopColor: Colors.mainTxt,
        borderTopWidth: 1,
        padding: 5,
    },
    closeButtonStyle: {
        borderWidth: 0,
        position: "absolute",
        bottom: 12,
        right: 12,
        elevation: 3,
        width: width / 8,
        height: width / 8,
        borderRadius: width / 8,
        backgroundColor: Colors.mainTxt,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrongNumberText: {
        margin: 10,
        fontSize: width / 30,
        textAlign: 'center',
        color: Colors.mainTxt,
        fontFamily: 'Roboto_medium',
    },
    disclaimerText: {
        marginTop: 30,
        fontSize: width / 35,
        color: Colors.mainTxt,
        fontFamily: 'Roboto_medium',
    },
    callingCodeView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    callingCodeText: {
        fontSize: width / 18,
        color: Colors.mainTxt,
        fontFamily: 'Roboto',
        paddingRight: 10
    }
})
