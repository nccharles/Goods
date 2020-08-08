import React, { Component } from 'react';
import {
  View, StyleSheet, Alert, AsyncStorage
} from 'react-native';
import { Colors } from '../../Assets/Themes'
import ScrollableTabView from 'react-native-scrollable-tab-view'
//backend imports 
import _ from 'lodash'
import ManageItems from '../../Components/Customs/ManageItems';
import * as firebase from 'firebase'
import CustomerOrders from './CustomerOrders';
import { userPhone, cName } from '../../Config/constants';
import ProfileHeader from '../../Components/Header/ProfileHeader';
import ImagePicker from 'react-native-image-crop-picker';
const initialState = {
  loading: true,
  error: null,
  info: {},
  isSubmitting: false,
}

class ManageShop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      data: null,
      userPhone: null,
      selectedImage: "",
      blobImage: "",
      Items: "",
      Orders: "",
      company: null,
      isLoading: true,
      userPhone: null,
      company: null,
      customerMessage: 0,
    }
  };
  async componentDidMount() {
    const currentUser = await AsyncStorage.getItem(userPhone)
    this.setState({
      company: await AsyncStorage.getItem(cName),
      userPhone: currentUser
    })
    this._getUserInfo(currentUser)
    this._countProducts()
    this._countOrders()
  }
  _getUserInfo = async (Phone) => {
    await firebase.database().ref(`/infos/${Phone}/companyInfo`)
      .on("value", snapshot => {
        try {
          this.setState({
            info: {
              ...this.state.info,
              ...snapshot.val()
            },
          })
        } catch (error) { }

      });
  }
  _countProducts = async () => {
    firebase.database().ref(`/products`)
      .orderByChild('companyPhone')
      .equalTo(this.state.userPhone)
      .on('value', snapshot => {
        const count = snapshot.numChildren();
        this.setState({ Items: count })
      })
  }
  _countOrders = async () => {
    firebase.database().ref(`/orders`)
      .orderByChild('companyPhone')
      .equalTo(this.state.userPhone)
      .on('value', snapshot => {
        const count = snapshot.numChildren();
        this.setState({ Orders: count })
      })
  }
  _handlepickerImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      this.setState({
        selectedImage: image
      })
      if (!image.cancelled) {
        // User picked an image
        const { path } = image;
        return this.uriToBlob(path);

      }

    }).then((blob) => {
      this.uploadToFirebase(blob)
      this.setState({ blobImage: blob });

    }).then((snapshot) => {

      // Alert.alert("uploaded","File uploaded");

    }).catch((error) => {

      throw error;

    });

  }
  uriToBlob = () => {
    const uri = this.state.selectedImage.path
    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };

      // this helps us get a blob
      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);

    });

  }

  uploadToFirebase = (blob) => {
    const {
      blobImage,
      userPhone,
      isSubmitting,
    } = this.state;
    if (isSubmitting) {
      return;
    }
    this.setState({ isSubmitting: true })
    const lastNine = userPhone.substr(userPhone.length - 9);
    const imagePath = `${lastNine}.jpg`
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref();

      storageRef.child(imagePath).put(blobImage || blob, {
        contentType: 'image/jpeg'
      }).then((snapshot) => {
        this.getImage(imagePath)
        blobImage.close();

        resolve(snapshot);

      }).catch((error) => {

        console.log(error.message)

      });

    });


  }
  getImage = (imagePath) => {

    const storage = firebase.storage().ref();
    storage.child(imagePath).getDownloadURL().then(async (image_url) => {
      this._handleImageSaveUrl(image_url)
    }).catch((error) => {
      console.log(error.message)
    })


  }
  _handleImageSaveUrl = async (image) => {
    const { userPhone } = this.state
    await firebase
      .database()
      .ref(`/infos/${userPhone}/companyInfo`)
      .update({
        image_url: image || '',
      })
      .then(async (response) => {
        this._getUserInfo(userPhone)
      })
      .catch(err => {
        that.setState({
          isSubmitting: false
        });
      });
  }
  render() {
    const { info: { address, workingDays, image_url }, Orders, Items, selectedImage, company, userPhone } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: Colors.pureBG }}>
        <ProfileHeader
          onPressBack={() => this.props.navigation.goBack()}
          onPressEdit={() => this._handlepickerImage()}
          Company={company}
          Phone={userPhone}
          Orders={Orders || ""}
          Items={Items || ""}
          Profile={image_url || selectedImage.path || ""}
          Address={address}
          Open={workingDays}
          Update={() => this.props.navigation.navigate('Info')}
        />
        <ScrollableTabView
          initialPage={0}
          tabBarBackgroundColor={Colors.pureBG}
          tabBarActiveTextColor={Colors.pureTxt}
          tabBarTextStyle={styles.tabBar}
          tabBarUnderlineStyle={{ backgroundColor: Colors.primary }}
          tabBarInactiveTextColor={Colors.mainTxt}
        >
          <ManageItems tabLabel="My Items" {...this.props} />
          <CustomerOrders tabLabel="Customer Orders" {...this.props} />
        </ScrollableTabView>

      </View>
    );
  }
}
const styles = StyleSheet.create({

  tabBar: {
    fontFamily: 'Roboto_medium',
    fontSize: 12,
    fontWeight: 'bold',
    // opacity: .7,
    textTransform: 'uppercase',
    padding: 8,
    backgroundColor: Colors.pureBG,
    borderRadius: 50
  },
});


export default ManageShop