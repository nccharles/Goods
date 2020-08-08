import React, { Component } from 'react';
import {
  Animated,
  ScrollView,
  Text,
  View,
  AsyncStorage,
  Platform, Alert,
  TouchableOpacity, ImageBackground, KeyboardAvoidingView
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Colors from '../../Assets/Themes/Colors';
import * as firebase from 'firebase'
import _ from 'lodash'
import { styles, width, height, HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE } from './Style/ItemInfoStyle';
import { cartData, contains, userPhone } from '../../Config/constants';
import ShopItems from '../../Components/Card/shopItems';
import ItemHeader from '../../Components/Header/ItemHeader';
const AnimatedImage = Animated.createAnimatedComponent(ImageBackground)
const initialState = {
  cartLength: 0,
  isLoading: false,
}
export default class ItemInfo extends Component {
  static navigationOptions = {
    headerShown: false
  };
  state = {
    ...initialState,
    Product: this.props.route.params.data,
    scrollY: new Animated.Value(0),
    addtoCart: false,
    data: [],
    isLoading: false
  }
  componentDidMount = async () => {
    this.setState({ isLoading: true, cartLength: 0 })
    const phone = await AsyncStorage.getItem(userPhone)
    const currentData = await AsyncStorage.getItem(cartData)
    let curProduct = JSON.parse(currentData);
    this.setState({ cartLength: curProduct ? curProduct.length : 0, phone })
    this.NetworkStatus()
  }
  NetworkStatus = async () => {
    NetInfo.fetch().then(async (state) => {
      if (state.isConnected) {
        this._getProducts()
      } else {
        Alert.alert('Sorry', 'Check your internet')
      }
    });
  }

  _retry = () => {

    return <TouchableOpacity onPress={() => this.NetworkStatus()} style={styles.retryButton}>
      <Entypo name="cw" color={Colors.secondary} style={{ opacity: Platform.OS === 'ios' ? 1 : 0.6 }} size={20} />
      <Text style={styles.retryText}>Retry</Text>
    </TouchableOpacity>
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
          Alert.alert('Error', `There was an error saving the product`)
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
    const phone = await AsyncStorage.getItem(userPhone)
    const currentData = await AsyncStorage.getItem(cartData)
    let curProduct = JSON.parse(currentData);
    if (curProduct.length >= 1) {
      this.props.navigation.navigate(phone === null ? 'Login' : "CartScreen")
    } else {
      Alert.alert('Empty', 'Nothing added to Cart')
      this.setState({ ...initialState })
    }
  }

  _getProducts = async () => {
    const that = this
    this.setState({ isLoading: true })
    firebase.database().ref(`/products`)
      .orderByChild('type')
      .equalTo(this.props.route.params.data.type)
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
  render() {
    const { Product, isLoading, cartLength, data } = this.state
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
      useNativeDriver: true
    });
    const iconOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: ['rgba(0,0,0,0.9)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
      extrapolate: 'clamp',
      useNativeDriver: true
    });
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, .4, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
      useNativeDriver: true
    });
    return (
      <View style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
          )}

        >
          <View style={[styles.scrollViewContent]}>
            <View style={[styles.content]}>
              <View style={styles.itemContainer}>
                <Entypo name="shopping-bag" color={Colors.secondary} style={{ opacity: Platform.OS === 'ios' ? 1 : 0.7 }} size={23} />
                <View style={styles.infocontent}>
                  <Text style={styles.infoTitle}>Name</Text>
                  <Text style={styles.info}>{Product.name}</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <Entypo name="credit-card" color={Colors.secondary} style={{ opacity: Platform.OS === 'ios' ? 1 : 0.7 }} size={23} />
                <View style={styles.infocontent}>
                  <Text style={styles.infoTitle}>Price </Text>
                  <Text style={styles.info}>{`RWF ${Product.price}/${Product.measure}`}</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <Entypo name="shop" color={Colors.secondary} style={{ opacity: Platform.OS === 'ios' ? 1 : 0.7 }} size={23} />
                <View style={styles.infocontent}>
                  <Text style={styles.infoTitle}>Company</Text>
                  <Text style={styles.info}>{Product.CompanyName}</Text>
                </View>
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.itemContainer}>
                <AntDesign name="filter" color={Colors.secondary} style={{ opacity: Platform.OS === 'ios' ? 1 : 0.7 }} size={23} />
                <View style={styles.infocontent}>
                  <Text style={styles.infoTitle}>Category  </Text>
                  <Text style={styles.info}>{Product.type}</Text>
                </View>
              </View>
            </View>

            {data.length != 0 && <View style={styles.infocontent}>
              <Text style={styles.infoTitle}>Items relate to {Product.type} Category </Text>
              <ScrollView horizontal={true} style={[styles.infocontent]}>
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
                        <ShopItems
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
            </View>}
          </View>
        </ScrollView>
        <AnimatedImage
          source={{
            uri: Product.image_url
          }}
          blurRadius={500}
          style={[styles.header, { height: headerHeight }]}>
          <View style={styles.bar}>
            <Text style={styles.title}>{Product.name.length <= 24 ? Product.name : Product.name.substring(0, 24) + "..."}</Text>
          </View>
          <Animated.Image
            style={[
              styles.backgroundImage,
              { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] },
            ]}
            source={{ uri: Product.image_url }}
          />
        </AnimatedImage>
        <ItemHeader opa={iconOpacity} onPress2={() => this.props.navigation.goBack()} onPress1={() => this.CheckCart()} value={cartLength} />
        <KeyboardAvoidingView
          behavior={(Platform.OS === 'ios') ? "padding" : null}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 30 })} />

      </View>
    );
  }

}

