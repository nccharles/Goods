import React, { Component } from 'react';
import {
  View, FlatList, Linking, Text, ActivityIndicator
} from 'react-native';
import { Colors } from '../../Assets/Themes'
import Toast from 'react-native-easy-toast'
import styles from './Style/shared-styles';
import NetInfo from "@react-native-community/netinfo";
import * as firebase from 'firebase'
import _ from 'lodash'
import ContentLoader, { Bullets } from "react-native-easy-content-loader";
import { ButtonGroup } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage';
import { userPhone, isEmpty } from '../../Config/constants';
import ClientCard from '../../Components/Card/BureauCard/ClientCard';
import DialogComponent from '../../Components/Dialog/Dialog';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import OrdersHeader from '../../Components/Header/OrdersHeader';
class Orders extends Component {
  constructor() {
    super()
    this.state = {
      phone: '',
      selectedIndex: 0,
      DeleteDialogVisible: false,
      currentItem: {},
      isLoading: false
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }
  componentDidMount = async () => {
    const Phone = await AsyncStorage.getItem(userPhone)
    this.setState({
      phone: Phone,
      myOrders: [],
      selectedIndex: 0,
      isLoading: true
    })
    this.NetworkStatus()
  }
  NetworkStatus = async () => {
    NetInfo.fetch().then(async (state) => {
      state.isConnected ? this._getProducts() : this.refs.toast.show("No Internet Connection")
    });

  }
  _handleCall = (CompanyPhone) => {
    Linking.openURL(`tel:${CompanyPhone}`)
  }
  handleChat = (SendorName, SendorPhone, ReceiverName, ReceiverPhone) => {
    this.props.navigation.navigate("VendorChat", { SendorName, SendorPhone, ReceiverName, ReceiverPhone })
  }
  _getProducts = async () => {
    const that = this

    firebase.database().ref(`/orders`)
      .orderByChild('CustomerPhone')
      .equalTo(this.state.phone)
      .on('value', snapshot => {
        const myOrders = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid }
        })
        that.setState({
          myOrders,
          isLoading: false,
        })
      })
  }
  handleCancel = () => {
    this.setState({
      DeleteDialogVisible: false,
    })
  };
  showDeleteDialog = (item) => {
    this.setState({
      DeleteDialogVisible: true,
      currentItem: item
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
    firebase.database().ref(`orders/${currentItem.uid}`)
      .update({
        status: 3
      })
      .then(response => {
        this.setState({
          DeleteDialogVisible: false,
        })
        this.refs.toast.show(`${currentItem.ProductName} Canceled!`);
      })
      .catch(err => {
        this.setState({
          DeleteDialogVisible: false,
        })
        this.refs.toast.show(err.message)
      })
  };
  render() {
    const buttons = ['All', 'Pending', 'Completed', 'Canceled']
    const { selectedIndex, myOrders, isLoading } = this.state
    return (
      <View style={[styles.container, { backgroundColor: Colors.mainBG }]}>
        <OrdersHeader title={"Orders"} />
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          selectedButtonStyle={{ backgroundColor: Colors.primary, borderRadius: 50 }}
          innerBorderStyle={{ color: Colors.pureBG }}
          textStyle={styles.groupText}
          containerStyle={{ height: 30, backgroundColor: Colors.mainBG, borderWidth: 0, elevation: 0, marginTop: 10 }}
        />
        {!isLoading && isEmpty(myOrders) ? <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
          <MaterialCommunityIcons name="timer-sand-empty" color={Colors.pureBG} size={200} />
          <Text style={{ color: 'lightgray', fontFamily: 'Roboto_medium' }}>No Order Yet</Text>
        </View> :
          <ContentLoader active avatar
            aShape="square"
            containerStyles={{ marginTop: 20 }}
            pRows={2}
            listSize={5}
            primaryColor={Colors.pureBG}
            secondaryColor={Colors.mainBG}
            sHeight={[500, 100, 100]}
            pWidth={[300, 500, 300]}
            loading={isLoading}>
            <FlatList
              style={[styles.list, { backgroundColor: Colors.mainBG }]}
              data={myOrders}
              renderItem={({ item }) => (
                (item.status == selectedIndex || selectedIndex == 0) &&
                <ClientCard
                  name={item.ProductName}
                  Qty={`${item.ProductName === 'Gas' || item.ProductName === 'Water' ? `${item.BottleQty} ~` : ""}${item.BottleNumber} Item(s)`}
                  Company={item.CompanyName}
                  price={`${item.TotalPrice} RWF ~${item.PaymentMethod}`}
                  orderID={`${item.orderID} ~ ${buttons[item.status]}`}
                  picture={item.image_url}
                  address={item.address}
                  onPressCall={() => this._handleCall(item.companyPhone)}
                  onPressChat={() => this.handleChat(item.CustomerName, item.CustomerPhone, item.CompanyName, item.companyPhone)}
                  onPressDel={() => this.showDeleteDialog(item)}
                />
              )}
              keyExtractor={item => item.uid}
              keyboardShouldPersistTaps='never'
              extraData={this.state}
              initialNumToRender={50}
              onEndReachedThreshold={30}
            />
          </ContentLoader>}
        <DialogComponent
          visible={this.state.DeleteDialogVisible}
          title="Cancel Order"
          description="Are you sure you want to Cancel this Order?"
          onPress={this.handleDelete}
          onPressCancel={this.handleCancel}
          label2="Yes"
        />
        <Toast ref="toast"
          style={{ backgroundColor: Colors.mainTxt }}
          position='bottom'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: Colors.mainBG }} />
      </View>
    );
  }
}

export default Orders;
