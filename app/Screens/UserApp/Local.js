import React, { Component } from 'react';
import {
  View, ScrollView, TouchableOpacity, Text, AsyncStorage, TouchableWithoutFeedback, FlatList, Alert
} from 'react-native';
import styles from './Style/ListStyle'
import CategoriesCard from '../../Components/Card/CategoriesCard';
import TopCard from '../../Components/Card/topCard';
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-easy-toast'
import { Colors } from '../../Assets/Themes'
import * as firebase from 'firebase'
import _ from 'lodash'
import ContentLoader, { Bullets } from "react-native-easy-content-loader";
import { userPhone, cartData, contains } from '../../Config/constants';
import ItemsList from '../../Components/Card/ItemsList';
import CartButton from '../../Components/Buttons/BtnCart';

const initialState = {
  cartLength: 0,
  isLoading: false,
}
class Local extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      data: [],
      phone: null,
      isLoading: false,
    }
  };


  // back-end code
  async componentDidMount() {
    this.setState({ isLoading: true })
    const phone = await AsyncStorage.getItem(userPhone)
    this.setState({ phone })
    this.NetworkStatus()
  }
  NetworkStatus = async () => {
    NetInfo.fetch().then(async (state) => {
      state.isConnected ? this._getProducts() : this.refs.toast.show("No Internet connection");
    });

  }
  _addtoCart = async (newData) => {
    const currentData = await AsyncStorage.getItem(cartData)
    let curProduct = JSON.parse(currentData);
    if (curProduct) {
      this.setState({ cartLength: curProduct.length })
    } else {
      curProduct = []
    }
    const { name } = newData
    let newDataName = name.toLowerCase()
    const data = _.filter(curProduct, category => {
      return contains(category, newDataName)
    })
    if (data.length == 0) {
      newData.Qty = 1
      curProduct.push(newData)
      await AsyncStorage.setItem(cartData, JSON.stringify(curProduct))
        .then(() => {
          this.setState({ cartLength: curProduct.length })
        })
        .catch(() => {
          Alert.alert(`Error`, ` There was an error saving the product`)
        })
    } else {
      Alert.alert('Added', 'Already added to Cart', [
        {
          text: "Remove",
          onPress: () => this.removeToCat(newData),
          style: "cancel"
        },
        { text: "OK" }
      ],
        { cancelable: false })
    }

  }
  removeToCat = async (newData) => {
    const currentData = await AsyncStorage.getItem(cartData)
    let curProduct = JSON.parse(currentData);
    curProduct = _.reject(curProduct, el => { return el.name === newData.name; });
    await AsyncStorage.setItem(cartData, JSON.stringify(curProduct))
      .then(() => {
        this.setState({ cartLength: curProduct.length })
      })
      .catch(() => {
      })
    this.setState({ cartLength: curProduct.length })
  }

  CheckCart = async () => {
    const currentData = await AsyncStorage.getItem(cartData)
    let curProduct = JSON.parse(currentData);
    if (curProduct.length != 0) {
      this.props.navigation.navigate("CartScreen")
    } else {
      Alert.alert('Empty', 'Nothing added to Cart')
      this.setState({ ...initialState })
    }
  }

  _getProducts = async () => {
    const that = this

    firebase.database().ref(`/products`)
      .limitToLast(10)
      .on('value', snapshot => {
        let products = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid }
        })
        products.sort((a, b) => (parseInt(a.price) > parseInt(b.price)) ? 1 : ((parseInt(b.price) > parseInt(a.price)) ? -1 : 0));
        that.setState({
          data: products,
          isLoading: false,
        })
      })
  }
  keyExtractor = (item, index) => index.toString()

  oneScreensWorth = 30

  render() {
    const { data, cartLength, isLoading } = this.state
    return (
      <View style={[styles.container, { alignItems: 'center' }]}>
        <ScrollView>
          <TopCard vendor='Simple | Quick | Affordable' hours='24/7' />
          <CategoriesCard
            onPress={() => this.props.navigation.navigate("AllItems")}
            onPressGas={() => this.props.navigation.navigate('VendorsScreen', { product: 'Gas' })}
            onPressWater={() => this.props.navigation.navigate('VendorsScreen', { product: 'Water' })} />

          <ContentLoader active avatar
            aShape="square"
            containerStyles={styles.currScroll}
            pRows={2}
            listSize={1}
            primaryColor={Colors.pureBG}
            secondaryColor={Colors.mainBG}
            sHeight={[500, 100, 100]}
            pWidth={[300, 500, 300]}
            loading={isLoading}>
            <View style={styles.titleRow}>
              <Text style={styles.itemTitle}>Available Product</Text>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("AllItems")}><Text style={styles.itemTitle}>See All</Text></TouchableWithoutFeedback>
            </View>
            <ScrollView horizontal={true} style={styles.currScroll}>
              {data.map((item, key) => {
                if (item.type === 'Water' || item.type === 'Gas') {
                  return false
                }
                return (
                  <View
                    key={key}
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("ItemScreen", { data: item })}
                    >
                      <ItemsList
                        img={item.image_url}
                        onPress={() => this._addtoCart(item)}
                        name={item.name}
                        Price={`RWF ${item.price}/${item.measure} `}
                        Type={item.type} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </ContentLoader>
        </ScrollView>
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

export default Local
