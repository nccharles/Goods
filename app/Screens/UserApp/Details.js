import React, { Component } from 'react';
import {
  ScrollView, Share, Animated, Linking, View, Text, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Platform, ActivityIndicator
} from 'react-native';
import { styles, width, height, HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE } from './Style/ItemInfoStyle';
import AsyncStorage from '@react-native-community/async-storage'
import { Colors } from '../../Assets/Themes'
import Toast, { DURATION } from 'react-native-easy-toast'
import ContentLoader, { Bullets } from "react-native-easy-content-loader";
//backend firebase things
import * as firebase from 'firebase'
import _ from 'lodash'
import { chatName, chatNum } from '../../Config/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import ShopHeader from '../../Components/Header/shopHeader';
import ShopItems from '../../Components/Card/shopItems';
const AnimatedImage = Animated.createAnimatedComponent(ImageBackground)

export default class Details extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      InputDialogVisible: false,
      userPhone: null,
      Distance: null,
      chatname: null,
      inputedValue: '',
      userInfo: {
        phone: '',
        address: '',
        openAt: '',
        closeAt: '',
        image_url: 'https://firebasestorage.googleapis.com/v0/b/waga-99a35.appspot.com/o/icon.png?alt=media&token=d045f559-c316-4ec2-8df3-d87f20e1a0d6',
        workingDays: '',
        latitude: '',
        longitude: '',
        company: '',
        email: '',
        countryName: 'Rwanda',
      },
      image_url: '',
      products: [],
      locate: true,
      loading: true,
      error: false,
    }
  }
 
  componentDidMount() {
    this.setState({ loading: true })
    const { userPhone, Distance } = this.props.route.params
    this.setState({
      userPhone,
      Distance: (Math.round(Distance* 100) / 100).toFixed(0)
    })
    this._getCompanyProfile(userPhone)
    this._getProducts(userPhone)
  }
  
  handleCustomer = async () => {
    const chats = await AsyncStorage.getItem(chatNum)
    if (chats) {
      this.props.navigation.navigate("Chat", { company: this.state.userInfo.company, companyPhone: this.state.userPhone })
    } else {
      this.setState({ InputDialogVisible: true })
    }
  }
  

  _getCompanyProfile = async (userPhone) => {
    const that = this
    await firebase.database().ref(`/infos/${userPhone}/companyInfo`)
      .once('value').then(snapshot => {
        if (snapshot != null) {
          that.setState(state => ({
            userInfo: {
              ...state.userInfo,
              ...snapshot.val()
            },
            loading: false,
          }))
        }
      })
      .catch(err => {
        that.setState({
          error: true,
        })
      });
  }
  randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
  _handleCall = (CompanyPhone) => {
    Linking.openURL(`tel:${CompanyPhone}`)
  }
  _getProducts = async (Phone) => {
    const that = this

    firebase.database().ref(`/products`)
      .orderByChild('companyPhone')
      .equalTo(Phone)
      .on('value', snapshot => {
        const products = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid }
        })
        that.setState({
          products,
          loading: false,
        })
      })
  }
  render() {
    const { loading, userInfo, userPhone, products } = this.state
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.2, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
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
            <View style={styles.content}>
              <ContentLoader active avatar
                pRows={2}
                secondaryColor={Colors.pureBG}
                containerStyles={styles.detailHeader}
                secondaryColor={Colors.mainBG}
                sHeight={[500, 100, 100]}
                pWidth={[300, 500, 300]}
                loading={loading}>
                <View style={styles.detailHeader}>
                  <View style={[styles.DetailAvatar, { backgroundColor: this.randomColor() }]}>
                    <Text style={styles.avatarTxt}>{userInfo.company.substring(0, 2).toUpperCase()}</Text>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text
                      style={styles.DetailTitle}>
                      {userInfo.company || 'loading...'}
                    </Text>
                    <Text style={styles.phone}>{userInfo.address} ~ {Number(this.state.Distance)} Meters</Text>
                  </View>
                </View>
              </ContentLoader>
            </View>
            {products.length != 0 &&
              <View style={styles.infocontent}>
                <Text style={[styles.infoTitle, { textTransform: 'uppercase', fontSize: 12 }]}>Available Items here</Text>
                <ScrollView horizontal={true}>
                  {products.map((item, key) => {
                    return (
                      <View
                        key={key}
                        style={{
                          flex: 1,
                          backgroundColor: 'transparent',
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate(item.name === 'Gas' || item.name === 'Water' ? "Checkout" : "ItemScreen", { data: item })}
                        >
                          <ShopItems
                            img={item.image_url}
                            name={item.name}
                            Price={`RWF ${item.price}/${item.measure} `}
                            Type={item.type} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>}
            <View style={styles.content}>
              <View style={styles.itemContainer}>
                <Entypo name="phone" color={Colors.secondary} size={23} />
                <View style={styles.infocontent}>
                  <Text style={styles.infoTitle}>Call us  </Text>
                  <Text style={styles.info}>{userInfo.companyPhone}  </Text>
                </View>
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.itemContainer}>
                <MaterialCommunityIcons name="calendar-clock" color={Colors.secondary} size={23} />
                <View style={styles.infocontent}>
                  <Text style={styles.infoTitle}>Opening hours  </Text>
                  <Text style={styles.info}>{`${userInfo.openAt} - ${userInfo.closeAt}`}</Text>
                </View>
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.itemContainer}>
                <MaterialCommunityIcons name="calendar-check" color={Colors.secondary} size={23} />
                <View style={styles.infocontent}>
                  <Text style={styles.infoTitle}>Working Days  </Text>
                  <Text style={styles.info}>{userInfo.workingDays}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <AnimatedImage
          source={{
            uri: userInfo.image_url
          }}
          blurRadius={500}
          style={[styles.header, { height: headerHeight }]}>
          <View style={styles.bar}>
            <Text style={styles.title}>{userInfo.company.length <= 24 ? userInfo.company : userInfo.company.substring(0, 24) + "..."}</Text>
          </View>
          <Animated.Image
            style={[
              styles.backgroundImage,
              { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] },
            ]}
            source={{ uri: userInfo.image_url }}
          />
        </AnimatedImage>
        <ShopHeader onPress2={() => this.props.navigation.goBack()} onPress1={() => this._handleCall(userPhone)} />
        <KeyboardAvoidingView
          behavior={(Platform.OS === 'ios') ? "padding" : null}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 30 })} />

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
