import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator, StyleSheet, Image
} from 'react-native';
import Moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import { Colors } from '../../Assets/Themes'
import Card from '../../Components/Card/ChatCard'
import emptydata from '../../Assets/Icons/empty.png'
import ContentLoader, { Bullets } from "react-native-easy-content-loader";
//backend imports 
import * as firebase from 'firebase'
import _ from 'lodash'
import { userPhone, cName, chatName, chatsCount } from '../../Config/constants';
//back end done

const initialState = {
    loading: true,
    error: null,
    isSubmitting: false,
    data: [],
    myPhone: null,
    company: null,
    customerMessage: 0
}

class Chatlist extends Component {

    constructor(props) {
        super(props);
        this.state = initialState

    };

    static navigationOptions = () => {
        let Title = 'Chats'
        return {
            headerTitle: Title,
            headerStyle: {
                backgroundColor: Colors.pureBG,
            },

            headerTintColor: Colors.pureTxt,
            headerTitleStyle: {
                fontFamily: 'Roboto',
            },
        }
    };

    async componentDidMount() {

        const myPhone = await AsyncStorage.getItem(userPhone)
        const company = await AsyncStorage.getItem(cName)

        this.setState({
            company: company || await AsyncStorage.getItem(chatName),
            myPhone: myPhone
        })
        if (myPhone) {
            this._getAllmessages(myPhone)
            this._countCustomerMessages(myPhone)
        } else {
            this.setState({ loading: false })
        }
    }

    _countCustomerMessages = async (myPhone) => {
        firebase.database().ref(`/Chats/${myPhone}/Customer`)
            .on('value', snapshot => {
                const customerMessage = _.map(snapshot.val(), (val, uid) => {
                    return { ...val.countsent, uid }
                })
                if (customerMessage) {
                    this.setState({

                        customerMessage: customerMessage
                    })
                }
            })

    }

    _getAllmessages = async (myPhone) => {
        firebase.database().ref(`/Chats/`)
            .on('value', snapshot => {
                let listData = []
                let tabCount = 0

                snapshot.forEach((child) => {
                    const Phone = child.val().Status.ReceiverPhone === myPhone ? child.val().Status.SendorPhone : child.val().Status.ReceiverPhone
                    const msg = child.val().Status.ReceiverPhone !== myPhone ? 0 : child.val().Status.unread
                    const name = child.val().Status.ReceiverPhone === myPhone ? child.val().Status.SendorName : child.val().Status.ReceiverName
                    const lastseen = child.val().Status.timestamp
                    const SlastNine = myPhone.substr(myPhone.length - 9);
                    const RlastNine = Phone.substr(Phone.length - 9);
                    const Chatchannel = parseInt(SlastNine) * parseInt(RlastNine)
                    if (child.key == Chatchannel) {
                        firebase.database().ref(`/Chats/${Chatchannel}/messages`)
                            .limitToLast(1)
                            .orderByChild("createdAt")
                            .once('value').then(async snapshot => {
                                if (snapshot.val()) {
                                    snapshot.forEach((child) => {
                                        listData = [...listData, {
                                            _id: child.val()._d,
                                            count: msg,
                                            createdAt: child.val().createdAt,
                                            text: child.val().text,
                                            user: {
                                                _id: Phone,
                                                name: name,
                                                lastseen: lastseen,
                                                timestamp: child.val().user.timestamp
                                            }
                                        }]

                                        tabCount += msg

                                    })
                                    await AsyncStorage.setItem(chatsCount, JSON.stringify(tabCount))
                                    // sorting listData by People
                                    listData.sort((a, b) => (a.user.timestamp < b.user.timestamp) ? 1 : ((b.user.timestamp < a.user.timestamp) ? -1 : 0));
                                    this.setState(() => ({
                                        data: listData,
                                        loading: false,
                                    }))
                                }

                            })
                    }

                })

            }
            )
    }

    //backend ends

    keyExtractor = (item, index) => index.toString()

    oneScreensWorth = 30
    openModal = () => {
        alert('ok')
    }
    getStatus(lastseen) {
        const status = new Date().valueOf() - lastseen
        return status <= 60000 ? 'success' : 'error'
    }
    render() {
        const { loading } = this.state
        return (

            <View style={{ flex: 1, backgroundColor: Colors.pureBG }}>
                {this.state.data.length === 0 && !loading && (
                    <View style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: Colors.pureBG,
                            justifyContent: 'center',
                            alignItems: 'center',
                            bottom: 50
                        }]}>
                        <Image
                            source={emptydata}
                            style={{
                                ...StyleSheet.absoluteFillObject,
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                )}
                <ContentLoader active avatar
                    pRows={1}
                    listSize={6}
                    containerStyles={{ marginTop: 20 }}
                    primaryColor={Colors.pureBG}
                    secondaryColor={Colors.mainBG}
                    sHeight={[500, 100, 100]}
                    pWidth={[300, 500, 300]}
                    loading={loading}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <Card
                                title={item.user.name.length >= 12 ? item.user.name.substring(0, 12) + '...' : item.user.name}
                                subtitle={item.text === undefined ? 'location' : (item.text.length >= 20 ? item.text.substring(0, 20) + '...' : item.text)}
                                hideAvatar={false}
                                roundAvatar={true}
                                avatar={item.user.name.substring(0, 1).toUpperCase()}
                                onPress={() => this.props.navigation.navigate('VendorChat', { ReceiverName: item.user.name, ReceiverPhone: item.user._id, SendorName: this.state.company, SendorPhone: this.state.myPhone })}
                                rightComponentText={Moment(item.user.timestamp).fromNow() + '   '}
                                value={item.count}
                                status="success"
                                status1={this.getStatus(item.user.lastseen)}
                            />
                        )}
                        keyExtractor={this.keyExtractor}
                        initialNumToRender={this.oneScreensWorth}
                    />
                </ContentLoader>
            </View>
        );
    }
}

export default Chatlist