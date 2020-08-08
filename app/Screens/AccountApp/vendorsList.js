import React, { Component } from 'react';
import {
    View, ActivityIndicator, AsyncStorage, FlatList
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-easy-toast'
import { Colors } from '../../Assets/Themes'
import * as firebase from 'firebase'
import _ from 'lodash'
import ContentLoader, { Bullets } from "react-native-easy-content-loader";
import styles from './../UserApp/Style/ListStyle'
import ItemsCard from '../../Components/Card/ItemsCard';
import DetailsHeader from '../../Components/Header/DetailsHeader';
import { userPhone } from '../../Config/constants';
class VendorsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
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
    _getProducts = async () => {
        const that = this

        firebase.database().ref(`/products`)
            .orderByChild('name')
            .equalTo(this.props.route.params.product)
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
    keyExtractor = (item, index) => index.toString()

    oneScreensWorth = 30


    render() {
        const { phone, data, isLoading } = this.state
        return (
            <View style={styles.container}>
                <ContentLoader active avatar
                    aShape="square"
                    containerStyles={styles.list}
                    pRows={2}
                    listSize={5}
                    primaryColor={Colors.pureBG}
                    secondaryColor={Colors.mainBG}
                    sHeight={[500, 100, 100]}
                    pWidth={[300, 500, 300]}
                    loading={isLoading}>
                    <FlatList
                        style={styles.list}
                        data={data}
                        renderItem={({ item }) => (
                            <ItemsCard
                                onPress={() => this.props.navigation.navigate('Checkout', { data: item })}
                                vendor={item.name}
                                type={item.name.toLowerCase()}
                                stock={`${item.Quantity} ${item.measure} | ${item.price} RWF `}
                            />
                        )}
                        keyExtractor={this.keyExtractor}
                        initialNumToRender={this.oneScreensWorth}
                    />
                </ContentLoader>
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



export default VendorsList
