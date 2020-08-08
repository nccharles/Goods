import React, { Component } from 'react';
import {
  View, FlatList, Text, Linking, ActivityIndicator
} from 'react-native';
import { Colors } from '../../Assets/Themes'
import Toast from 'react-native-easy-toast'
import styles from '../UserApp/Style/shared-styles';
import NetInfo from "@react-native-community/netinfo";
import * as firebase from 'firebase'
import _ from 'lodash'
import ContentLoader, { Bullets } from "react-native-easy-content-loader";
import { ButtonGroup, Overlay, Card } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage';
import { userPhone } from '../../Config/constants';
import OrdersCard from '../../Components/Card/BureauCard/OrdersCard';
import TextWithLine from '../../Components/Text/TextWithLine';
class CustomerOrders extends Component {
  constructor() {
    super()
    this.state = {
      phone: '',
      selectedIndex: 0,
      selectedOption: 0,
      isVisible: false,
      currentItem: {},
    }
    this.updateIndex = this.updateIndex.bind(this)
    this.updateOption = this.updateOption.bind(this)
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }
  updateOption(selectedOption) {
    this.setState({ selectedOption })
    this.handleChangeStatus(selectedOption)
  }
  componentDidMount = async () => {
    const Phone = await AsyncStorage.getItem(userPhone)
    this.setState({
      phone: Phone,
      clientOrders: [],
      selectedIndex: 0
    })
    this.NetworkStatus()
  }
  NetworkStatus = async () => {
    NetInfo.fetch().then(async (state) => {
      state.isConnected ? this._getProducts() : ""
    });

  }
  _handleCall = (CompanyPhone) => {
    Linking.openURL(`tel:${CompanyPhone}`)
  }
  handleChat = (SendorName,SendorPhone,ReceiverName,ReceiverPhone) => {
    this.props.navigation.navigate("VendorChat", { SendorName,SendorPhone,ReceiverName,ReceiverPhone })
  }
  _getProducts = async () => {
    const that = this

    firebase.database().ref(`/orders`)
      .orderByChild('companyPhone')
      .equalTo(this.state.phone)
      .on('value', snapshot => {
        const clientOrders = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid }
        })
        that.setState({
          clientOrders,
          isLoading: false,
        })
      })
  }
  showStatusOptions = (item) => {
    this.setState({
      isVisible: true,
      currentItem: item
    });
  };
  handleChangeStatus = (option) => {
    const status = parseInt(option) + 2
    const { currentItem } = this.state
    this.setState({
      isVisible: false
    })
    firebase.database().ref(`orders/${currentItem.uid}`)
      .update({
        status
      })
      .then(response => {
        this.refs.toast.show(`${currentItem.ProductName} Status has been changed!`);
      })
      .catch(err => {
        this.refs.toast.show(err.message)
      })
  };
  render() {
    const buttons = ['All', 'Pending', 'Completed', 'Canceled']
    const option = ['Complete', 'Cancel']
    const { selectedIndex, selectedOption, currentItem, clientOrders, isLoading } = this.state
    return (
      <View style={[styles.container,{backgroundColor:Colors.mainBG}]}>
         <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          selectedButtonStyle={{ backgroundColor: Colors.primary,borderRadius:50 }}
          innerBorderStyle={{ color: Colors.pureBG }}
          textStyle={styles.groupText}
          containerStyle={{ height: 30, backgroundColor: Colors.purG, borderWidth: 0, elevation: 0, marginTop: 10 }}
        />
         <ContentLoader active avatar
                    aShape="square"
                    containerStyles={[styles.list,{backgroundColor:Colors.mainBG}]}
                    pRows={2}
                    listSize={5}
                    primaryColor={Colors.pureBG}
                    secondaryColor={Colors.mainBG}
                    sHeight={[500, 100, 100]}
                    pWidth={[300, 500, 300]}
                    loading={isLoading}>
          <FlatList
            style={[styles.list,{backgroundColor:Colors.mainBG}]}
            data={clientOrders}
            renderItem={({ item }) => (
              (item.status == selectedIndex || selectedIndex == 0) &&
              <OrdersCard
                name={item.ProductName}
                Qty={`${item.ProductName === 'Gas' || item.ProductName === 'Water' ? `${item.BottleQty} ~` : ""}${item.BottleNumber} Item(s)`}
                Customer={item.CustomerName}
                price={`${item.TotalPrice} RWF ~${item.PaymentMethod}`}
                address={item.address}
                picture={item.image_url}
                orderID={`${item.orderID} ~ ${buttons[item.status]}`}
                onPressCall={() => this._handleCall(item.CustomerPhone)}
                onPressChat={() => this.handleChat(item.CompanyName,item.companyPhone,item.CustomerName, item.CustomerPhone)}
                onOptions={() => this.showStatusOptions(item)}
              />
            )}
            keyExtractor={item => item.uid}
            keyboardShouldPersistTaps='never'
            extraData={this.state}
            initialNumToRender={50}
            onEndReachedThreshold={30}
          />
          </ContentLoader>
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(0, 0, 0, .8)"
          overlayBackgroundColor={Colors.pureBG}
          // width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <TextWithLine CustomText="Change Order Status" />
          <ButtonGroup
            onPress={this.updateOption}
            selectedIndex={selectedOption}
            buttons={option}
            selectedButtonStyle={{ backgroundColor: Colors.primary }}
            innerBorderStyle={{ color: Colors.pureBG }}
            textStyle={styles.groupText}
            containerStyle={{ height: 50, width: '100%', alignSelf: 'center', backgroundColor: Colors.mainBG, borderWidth: 0, elevation: 0, marginTop: 10 }}
          />
        </Overlay>
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

export default CustomerOrders;
