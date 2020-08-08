import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Colors } from '../../Assets/Themes'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Moment from 'moment'
import emptydata from '../../Assets/Icons/empty.png'
import "prop-types";
//backend firebase things
import * as firebase from 'firebase'
import _ from 'lodash'
import { GiftedChat, Send, Bubble, InputToolbar, SystemMessage } from 'react-native-gifted-chat';
import ChatsHeader from '../../Components/Header/ChatsHeader';
import { sendPushNotification } from '../../Config/notice';
class VendorChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            messages: [],
            lastseen: null,
            SendorPhone: null,
            ReceiverName: null,
            Chatchannel: null,
            ReceiverPhone: null,
            Userkey: null,
            unread: 0,
            // loadEarlier: true,
            // isLoadingEarlier: false,
        }
        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderSystemMessage = this.renderSystemMessage.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);

        this._isAlright = null;
    }
    onSend(messages = []) {
        const { Chatchannel, SendorName, SendorPhone, ReceiverName, ReceiverPhone } = this.state
        firebase
            .database()
            .ref(`/infos/${SendorPhone}/privateInfo`)
            .update({
                timestamp: this.timestamp
            })
        firebase
            .database()
            .ref(`/Chats/${Chatchannel}`)
            .update({
                messages: GiftedChat.append(this.state.messages, messages),
            })
            .then(() => {
                this.onCheckMessages(1, Chatchannel, SendorName, SendorPhone, ReceiverName, ReceiverPhone)
            })
        messages.forEach(child => {
            sendPushNotification(child.user.name, ReceiverPhone, child.text)
        })
    }
    onCheckMessages = async (newCount, Chatchannel, SendorName, SendorPhone, ReceiverName, ReceiverPhone) => {
        await firebase.database().ref(`/Chats/${Chatchannel}/Status`)
            .once('value').then(snapshot => {
                const updateAt = this.timestamp
                this.setState({
                    customerkey: Chatchannel
                })
                let sent = snapshot.val() ? (snapshot.val().ReceiverPhone === ReceiverPhone ? snapshot.val().unread : 0) : 1
                if (snapshot.val() === null) {
                    firebase
                        .database()
                        .ref(`/Chats/${Chatchannel}/Status`)
                        .set({
                            ReceiverPhone,
                            ReceiverName,
                            SendorPhone,
                            SendorName,
                            timestamp: updateAt,
                            unread: sent,
                        })
                        .then(resp => { })
                } else {
                    let newsent = sent + newCount
                    firebase
                        .database()
                        .ref(`/Chats/${Chatchannel}/Status`)
                        .update({
                            ReceiverPhone,
                            ReceiverName,
                            SendorPhone,
                            SendorName,
                            timestamp: updateAt,
                            unread: newsent,
                        })
                }
            })
    }
    renderSend(props) {
        return (
            <Send
                {...props}
            >

                <View style={{ marginRight: 10, marginBottom: 5 }}>
                    <Icon
                        name="send"
                        size={30}
                        color={Colors.primary} />
                </View>
            </Send>
        );
    }
    componentDidMount() {
        this._isMounted = true;
        const { SendorName, SendorPhone, ReceiverName, ReceiverPhone } = this.props.route.params
        const SlastNine = SendorPhone.substr(SendorPhone.length - 9);
        const RlastNine = ReceiverPhone.substr(ReceiverPhone.length - 9);
        const Chatchannel = parseInt(SlastNine) * parseInt(RlastNine)
        this.setState({
            SendorName,
            SendorPhone,
            Chatchannel,
            ReceiverName,
            ReceiverPhone
        })
        this._getAllmessages(SendorPhone, ReceiverPhone, Chatchannel)
        this._getUserLastseen(ReceiverPhone)
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.onCheckMessages(0, Chatchannel, SendorName, SendorPhone, ReceiverName, ReceiverPhone)
        });
    }

    _getUserLastseen = async (Receiver) => {
        firebase.database().ref(`/infos/${Receiver}/privateInfo`)
            .on('value', snapshot => {
                const lastseen = snapshot.val().timestamp;
                if (lastseen) {
                    this.setState({
                        lastseen: lastseen
                    })
                }
            })
    }
    getLastseen(lastseen) {
        const status = this.timestamp - lastseen
        return status <= 59000 ? 'online' : 'offline'
    }
    _getAllmessages = async (Sendor, Receiver, Cchannel) => {
        const that = this
        const { Chatchannel } = this.state
        let channel = Cchannel || Chatchannel
        firebase.database().ref(`/Chats/${channel}/messages`)
            .on('value', snapshot => {
                if (snapshot.val()) {
                    that.setState(() => ({
                        messages: snapshot.val(),
                        loading: false,
                    }))
                }
            })

    }

    get user() {
        return {
            name: this.state.SendorName,
            _id: this.state.SendorPhone,
            timestamp: this.timestamp
        };
    }
    get timestamp() {
        return new Date().valueOf();
    }
    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });

        setTimeout(() => {
            if (this._isMounted === true) {
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.prepend(previousState.messages, this.state.messages),
                        loadEarlier: false,
                        isLoadingEarlier: false,
                    };
                });
            }
        }, 1000); // simulating network
    }


    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: "#ffffff",
                    },
                    right: {
                        backgroundColor: 'gray'
                    }
                }}
            />
        );
    }

    renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    fontSize: 14,
                }}
            />
        );
    }

    renderInputToolbar(props) {
        //Add the extra styles via containerStyle
        return <InputToolbar {...props} containerStyle={{ borderTopColor: Colors.pureTxt, }} />
    }
    render() {
        const { loading, ReceiverName, lastseen } = this.state
        return (
            <>
                <ChatsHeader
                    onPress1={() => this.props.navigation.goBack()}
                    Receiver={ReceiverName || 'User  '}
                    status={!lastseen ? "---" : this.getLastseen(lastseen) === 'offline' ? "last seen " + Moment(this.state.lastseen).fromNow() + '   ' : "online   "} />
                {this.state.messages.length === 0 && (
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
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={this.user}
                    scrollToBottom={true}
                    isAnimated={true}
                    renderSend={this.renderSend}
                    loadEarlier={this.state.loadEarlier}
                    onLoadEarlier={this.onLoadEarlier}
                    isLoadingEarlier={this.state.isLoadingEarlier}
                    parsePatterns={linkStyle => [
                        {
                            pattern: /#(\w+)/,
                            style: { ...linkStyle, color: Colors.primary },
                            onPress: props => alert(props),
                        },
                    ]}
                    renderInputToolbar={this.renderInputToolbar}
                    renderBubble={this.renderBubble}
                    renderSystemMessage={this.renderSystemMessage}
                />
            </>
        );
    }
}

export default VendorChat;