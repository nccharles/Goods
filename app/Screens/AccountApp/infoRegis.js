import React, { Component } from "react";
import {
  View,
  ScrollView, Alert,
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import { Button, Input } from "react-native-elements";
import Toast, { DURATION } from 'react-native-easy-toast'
import { userPhone, cName, userCountry, chatName } from '../../Config/constants'
import styles from "./Style/SignupStyles";
import { CommonActions } from '@react-navigation/native';
import { Colors } from "../../Assets/Themes";
//backend things
import * as firebase from "firebase";
import BackHeader from "../../Components/Header/BackHeader";

class InfoRegis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      choise: false,
      credentails: {
        email: null,
        first_name: null,
        last_name: null
      },
      item: null,
      countries: null,
      isSubmitting: false,
      isLoading: false,
    };
  }
  isEmpty = (obj) => {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return true;
  }

  async componentDidMount() {
    if (this.props.route.params) {
      const { item } = this.props.route.params
      this.setState({
        item
      })
    }
    this.setState({
      userPhone: await AsyncStorage.getItem(userPhone),
      countryName: await AsyncStorage.getItem(userCountry)
    });
    this._queryExistingRegInfo();
  }
  _queryExistingRegInfo = () => {
    const { userPhone } = this.state;
    firebase
      .database()
      .ref(`/infos/${userPhone}/privateInfo`)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          this.setState({
            credentails: {
              ...this.state.credentails,
              ...snapshot.val()
            }
          });
        }
      })
      .catch(error => { });
  };

  _handleInput = (key, value) => {
    this.setState(state => ({
      credentails: {
        ...state.credentails,
        [key]: value
      }
    }));
  };

  _handleSignUp = async () => {
    const {
      credentails: { email, first_name, last_name },
      userPhone,
      item,
      isSubmitting,
      countryName,
    } = this.state;
    if (email && first_name && last_name) {
      this.setState({ spinner: true })
      await AsyncStorage.setItem(chatName, first_name)
    } else {
      this.refs.toast.show("Please fill all fields!");
      return;
    }

    if (isSubmitting) {
      return;
    }
    const that = this;
    this.setState({
      isSubmitting: true
    });
    firebase
      .database()
      .ref(`/infos/${userPhone}/privateInfo`)
      .set({
        first_name, last_name,
        userPhone,
        email,
        completed: true,
        isSubmitting: false,
        countryName,
      })
      .then(resp => {
        that.setState({
          errors: {
            tinNumber: null
          },
          isSubmitting: false
        });
        firebase
          .database()
          .ref(`/infos/${userPhone}/privateInfo`).update({
            displayName: first_name,
            email,
            userPhone,
            countryName,
          })
          .then(resp => {
            Alert.alert('Shop', "If you have a shop don't hestate to sale with us at any time", [
              {
                text: "Add Shop",
                onPress: () => this.props.navigation.navigate('CompanyInfo'),
                style: 'default'
              },
              {
                text: "Maybe later",
                onPress: () => this.props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'AccessStack' }]
                  })),
                style: 'default'
              }
            ],
              { cancelable: false })
            this.setState({ spinner: false })
          })
          .catch(error => {
            this.setState({ spinner: false })
            this.refs.toast.show(error.message);
          });
      })
      .catch(error => {
        this.setState({ spinner: false })
        this.refs.toast.show(error.message);
      });
  };
  _handleLogout = async () => {
    Alert.alert('Change phone number?', 'Do you want to login with different phone number?', [
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
      this.props.navigation.navigate('Login')
    })
  }
  render() {
    return (
      <View style={styles.container} >
        <BackHeader title="User Info" onPress={this._handleLogout} />
        <ScrollView>
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
            onChangeText={input => this._handleInput("first_name", input)}
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
            onChangeText={input => this._handleInput("last_name", input)}
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
            onChangeText={(input) => this._handleInput('email', input)}
            value={this.state.credentails.email}
            editable={true}
          />

          <Button
            onPress={this._handleSignUp.bind(this)}
            title="Save"
            titleStyle={{ color: Colors.secondary }}
            icon={{ type: "font-awesome", name: "save", color: Colors.secondary }}
            buttonStyle={styles.button}
            loading={this.state.spinner}
            activityIndicatorStyle={{ color: Colors.pureTxt }}
          />
        </ScrollView>
        <Toast ref="toast"
          style={{ backgroundColor: Colors.mainBG }}
          position='bottom'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={2000}
          opacity={0.9}
          textStyle={{ color: Colors.red }} />
      </View>
    );
  }
}
export default InfoRegis;
