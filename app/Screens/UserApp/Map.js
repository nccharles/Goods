import React, { Component } from 'react';
import {
  ActivityIndicator, View, Dimensions
} from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import { Colors } from '../../Assets/Themes'
import styles from './Style/MapStyle';
import Geocoder from 'react-native-geocoding';
import haversine from 'haversine'
import * as firebase from 'firebase'
import _ from 'lodash'
import NetInfo from "@react-native-community/netinfo";
import MapCard from '../../Components/Card/mapCard';
import { hasLocationPermission } from '../../Config/constants';
import ShopsCard from '../../Components/Card/Shops/shopsCard';
Geocoder.init("AIzaSyAN6UG11K2foH4nOXtdr4KMmKnCGi8UQB0")
let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 1.0007383728
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyCoords: [],
      loading: true,
      spinner: false,
      coords: {},
      primaryAddress: '',
      secondAddress: '',
      selectedMarker: ''
    };
  }


  componentDidMount = () => {
    this._NetworkStatus();
  };
  _NetworkStatus = async () => {
    NetInfo.fetch().then(async (state) => {
      state.isConnected ? this._reLocate() : this.setState({ spinner: false });
      !state.isConnected && this.refs.toast.show('No Internet Connection');
    });

  }

  _reLocate = async () => {
    this.setState({ spinner: true })
    const that = this
    await firebase.database().ref('/infos/').once('value').then(snapshot => {
      const coordinates = _.map(snapshot.val(), (val, uid) => {
        if (!val || !val.companyInfo || (!val.companyInfo.latitude && !val.companyInfo.latitude)) {
          return
        }
        return { ...val.companyInfo, uid }
      })
      coordinates.forEach(val => {
        if (val) {
          val['Distance'] = 0
        }
      })
      if (coordinates) {
        that.setState({
          companyCoords: [...coordinates]
        })
      }
    })
    this.getLocation()
  }

  getLocation = async () => {
    const { companyCoords } = this.state
    const isLocationPermetted = await hasLocationPermission()

    if (!isLocationPermetted) return;

    this.setState({ spinner: true })
    Geolocation.getCurrentPosition(
      (position) => {
        const { coords } = position
        companyCoords.forEach(val => {
          if (val) {
            val['Distance'] = (Math.round((haversine({ latitude: coords.latitude, longitude: coords.longitude }, { latitude: val.latitude, longitude: val.longitude }, { unit: 'meter' })) * 100) / 100).toFixed(0)
          }
        })
        this.setState({ companyCoords, coords });
        this._getRealLocation(coords.latitude, coords.longitude)
      },
      (error) => {
        this.setState({ location: error, spinner: false });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
    );
  }
  _getRealLocation = (lat, long) => {
    Geocoder.from(lat, long)
      .then(json => {
        const primaryAddress = json.results[2].formatted_address;
        const secondAddress = json.results[0].formatted_address;
        this.setState({
          primaryAddress,
          secondAddress,
          spinner: false
        })
      })
      .catch(error =>
        this.refs.toast.show('Error: faild to peform action'));
    this.setState({ spinner: false })
  }
  randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }

  render() {
    const { coords: { longitude, latitude, speed }, primaryAddress, secondAddress, companyCoords } = this.state
    return (
      <View style={styles.container}>
        {
          latitude && <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            {companyCoords.map((marker, key) => {
              if (marker && marker.longitude && marker.latitude) {
                return <Marker
                  onPress={() => this.props.navigation.navigate('Details', { userPhone: marker.companyPhone, Distance: marker.Distance })}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude
                  }}
                  key={key}
                  pinColor={this.randomColor()}
                  title={marker.company} description={marker.address} style={{ flex: 1 }} />
              }
            })}
            <Marker style={{ flex: 1 }} coordinate={{ latitude, longitude }}
              title={primaryAddress} description={secondAddress} pinColor={Colors.primary} />
          </MapView>
        }
        <ShopsCard data={companyCoords} longitude={longitude} latitude={latitude} isLoading={this.state.spinner} {...this.props} />
        <MapCard loading={this.state.spinner} location={primaryAddress} onPress={this._NetworkStatus} road={secondAddress} />
        {this.state.spinner &&
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        }
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
export default MapScreen