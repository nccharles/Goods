import React from 'react';
import { Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient'
import { CommonActions } from '@react-navigation/native';
import styles from './styles'
import { Colors } from '../../Assets/Themes';
import { userChoice } from '../../Config/constants'
import Swiper from '../../Components/Swiper/Swiper';
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            signedIn: false,
            checkedSignIn: false,
            userSignedIn: false,
            userViewConformed: false,
            initialRouter: 'WelcomeStack'
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: true
        }
    };

    showAlert = () => {
        this.setState({ showAlert: true });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    _handleUser = async () => {

        try {
            await AsyncStorage.setItem(userChoice, 'true').then(() => {
                this.props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Login' }
                        ],
                    })
                );
            })
        } catch (error) {

            this.refs.toast.show("Error: faild to remember your choice");
        }
    }
    render() {
        return (
            <Swiper handleThis={this._handleUser.bind(this)}>
                {/* Second screen */}
                <LinearGradient
                    colors={Colors.gradientColors}
                    start={{ x: 0.5, y: 1.0 }}
                    end={{ x: 1.0, y: 0 }}
                    style={styles.slide}
                >
                    <Image source={require('../../Assets/Icons/icon.png')} style={{ width: 150, height: 150, marginBottom: -30 }} />
                    <Text style={styles.header}>Goods</Text>
                    <Text style={styles.text}>Fresh Organic and Green. Find produce from local farmers from a business nearest to your location at affordable prices.</Text>
                </LinearGradient>
                {/* Third screen */}
                <LinearGradient
                    colors={Colors.gradientColors}
                    start={{ x: 0.5, y: 1.0 }}
                    end={{ x: 1.0, y: 0 }}
                    style={styles.slide}
                >
                    <Entypo name="shop" size={100} color={Colors.secondary} />
                    <Text style={styles.header}>Sell with us</Text>
                    <Text style={styles.text}>Add your Online shop and start getting orders from customers</Text>
                </LinearGradient>
            </Swiper>
        )
    }
}
