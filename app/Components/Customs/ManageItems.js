import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator, StyleSheet, Image, Alert
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import Moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import { Colors } from '../../Assets/Themes'
import AddBtn from '../Buttons/AddItemBtn'
import Card from '../Card/BureauCard/Card'
import ContentLoader, { Bullets } from "react-native-easy-content-loader";
import DialogComponent from '../Dialog/Dialog'
import emptydata from '../../Assets/Icons/empty.png'
import * as firebase from 'firebase'
import _ from 'lodash'
import { userPhone, cName, chatNum, chatName } from '../../Config/constants';
const initialState = {
    loading: true,
    DeleteDialogVisible: false,
    currentItem: {
        name: null,
        price: null,
        Quantity: null,
        measure: null,
        uid: null,
    },
    error: null,
    isSubmitting: false,
}

class ManageItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
            data: null,
            isLoading: true,
            userPhone: null,
            company: null,
        }
    };

    async componentDidMount() {
        const currentUser = await AsyncStorage.getItem(userPhone)
        this.setState({
            company: await AsyncStorage.getItem(cName),
            userPhone: currentUser
        })
        this._getCompanyProducts()
        // registerForPushNotificationsAsync()
        await AsyncStorage.setItem(chatName, this.state.company)
        await AsyncStorage.setItem(chatNum, currentUser)
    }

    _getCompanyProducts = async () => {
        const { userPhone } = this.state
        const that = this

        firebase.database().ref(`/products`)
            .orderByChild(`companyPhone`)
            .equalTo(userPhone)
            .on('value', snapshot => {
                const products = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid }
                })
                that.setState({
                    data: products,
                    isLoading: false,
                })
            })
    }

    Show_Custom_Alert = () => {
        this.setState({ AddModal: true });
    }

    showDeleteDialog = (item) => {
        this.setState({
            DeleteDialogVisible: true,
            currentItem: {
                name: item.name,
                price: item.price,
                uid: item.uid,
                Quantity: item.Quantity
            }
        });
    };

    handleDelete = () => {
        const { currentItem, isSubmitting } = this.state
        const that = this
        if (isSubmitting) {
            return
        }
        this.setState({
            isSubmitting: true
        })
        firebase.database().ref(`products/${currentItem.uid}`)
            .set(null)
            .then(response => {
                this.refs.toast.show(`${currentItem.name} deleted!`);
            })
            .catch(err => { })
        that.setState({ ...initialState })
    };

    keyExtractor = (item, index) => index.toString()

    oneScreensWorth = 30
    openModal = () => {
        alert('ok')
    }

    render() {
        const { inputedValue, isLoading, error } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: Colors.mainBG }}>
                <ContentLoader active avatar
                    aShape="square"
                    pRows={2}
                    listSize={5}
                    primaryColor={Colors.pureBG}
                    secondaryColor={Colors.mainBG}
                    sHeight={[500, 100, 100]}
                    pWidth={[300, 500, 300]}
                    loading={isLoading}>
                    < FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <Card
                                onPress={() => this.props.navigation.navigate('Product', { item })}
                                onPressDel={() => this.showDeleteDialog(item)}
                                name={item.name}
                                picture={item.image_url}
                                price={`${item.price} RWF`}
                                qty={item.Quantity + item.measure}
                                time={Moment(item.timestamp).fromNow()} />
                        )}
                        keyExtractor={this.keyExtractor}
                        initialNumToRender={this.oneScreensWorth}
                    />
                </ContentLoader>
                <DialogComponent
                    visible={this.state.DeleteDialogVisible}
                    title="Product delete"
                    description="Are you sure you want to delete this Product?"
                    onPress={this.handleDelete}
                    onPressCancel={() => this.setState({ DeleteDialogVisible: false })}
                    label2="Yes"
                />
                <AddBtn onPress={() => this.props.navigation.navigate('Product')} />
                <Toast ref="toast"
                    style={{ backgroundColor: Colors.pureTxt }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1500}
                    opacity={1}
                    textStyle={{ color: Colors.pureBG }} />
            </View>
        );
    }
}

export default ManageItems