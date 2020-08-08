import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Colors } from '../Assets/Themes'
import MapView from '../Screens/UserApp/Map'
import Local from '../Screens/UserApp/Local'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-easy-toast'
import { userPhone } from './constants';
export default class LocalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPhone: ''
    };
  }
  Settings = () => {
    this.props.navigation.navigate('Settings')
  }

  componentDidMount = async () => {
    this.checkUser()
  }
  checkUser = async () => {
    const retrieveduserPhone = await AsyncStorage.getItem(userPhone);
    this.setState({
      userPhone: retrieveduserPhone
    })
  }
  render() {
    return <View style={{ flex: 1 }}>

      <View style={styles.topBit}>
        <Text style={styles.logo}>Goods</Text>
        <View style={styles.row}>
        </View>
      </View>
      <ScrollableTabView
        initialPage={0}
        tabBarBackgroundColor={Colors.pureBG}
        tabBarActiveTextColor={Colors.primary}
        onChangeTab={this.checkUser}
        tabBarTextStyle={styles.tabBar}
        tabBarUnderlineStyle={{ backgroundColor: Colors.primary }}
        tabBarInactiveTextColor={Colors.pureTxt}
      >
        <Local tabLabel='Items' {...this.props} />
        <MapView tabLabel='Store' {...this.props} />
      </ScrollableTabView>
      <Toast ref="toast"
        style={{ backgroundColor: Colors.mainTxt }}
        position='bottom'
        positionValue={120}
        fadeInDuration={750}
        fadeOutDuration={1500}
        opacity={0.8}
        textStyle={{ color: Colors.mainBG }} />
    </View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pureBG,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logo: {
    color: Colors.pureTxt,
    fontSize: 23,
    margin: 5,
    marginLeft: 20,
    opacity: .7,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tabBar: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
    opacity: .7,
    padding: 8,
    backgroundColor: Colors.mainBG,
    borderRadius: 50
  },
  topBit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: Colors.pureBG,
    justifyContent: 'space-between'
  },
});

