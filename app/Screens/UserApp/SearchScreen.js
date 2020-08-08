import React, { Component } from 'react';
import {
    View, AsyncStorage, Alert, FlatList,
} from 'react-native';
import { styles } from './Style/ItemInfoStyle'
import Colors from '../../Assets/Themes/Colors';
import SearchHeader from '../../Components/Header/Searchheader';
import ContentLoader, { Bullets } from "react-native-easy-content-loader";
import { contains, cartData, userPhone } from '../../Config/constants';
import * as firebase from 'firebase'
import _ from 'lodash'
import ItemSearch from '../../Components/Card/ItemSearch';
import CartButton from '../../Components/Buttons/BtnCart';
import MaterialAnimatedView from '../../Components/MaterialAnimatedView';
const initialState = {
    cartLength: 0,
    isLoading: false,
}
export default class SearchScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...initialState,
            found: {
                searchValue: '',
            },
            allItems: [],
            data: [],
            sort: 'amount-asc',
            phone: '',
            loading: true
        }
    }
    static navigationOptions = {
        headerShown: false
    };
    async componentDidMount() {
        const phone = await AsyncStorage.getItem(userPhone)
        this.setState({ phone })
        this._getProducts()
    }
    _getProducts = async () => {
        const that = this

        firebase.database().ref(`/products`)
            .on('value', snapshot => {
                const products = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid }
                })
                products.sort((a, b) => (parseInt(a.price) > parseInt(b.price)) ? 1 : ((parseInt(b.price) > parseInt(a.price)) ? -1 : 0));
                that.setState({
                    allItems: products,
                    data: products,
                    loading: false,
                })
            })
    }
    _sortItems = () => {
        let { data, sort } = this.state
        if (sort === "amount-asc") {
            data.sort((a, b) => (parseInt(a.price) < parseInt(b.price)) ? 1 : ((parseInt(b.price) < parseInt(a.price)) ? -1 : 0));
            this.setState({ sort: 'amount-desc' })
        } else {
            data.sort((a, b) => (parseInt(a.price) > parseInt(b.price)) ? 1 : ((parseInt(b.price) > parseInt(a.price)) ? -1 : 0));
            this.setState({ sort: 'amount-asc' })
        }
        this.setState({
            data,
            loading: false,
        })
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
                    Alert.alert('Error',`There was an error saving the product`)
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
    _handleSearch = (value) => {
        const searchQuery = value.toLowerCase()
        const data = _.filter(this.state.allItems, category => {
            return contains(category, searchQuery)
        })
        this.setState(state => ({
            found: {
                ...state.searchValue,
                searchValue: value
            },
            data
        }));
    };
    keyExtractor = (item, index) => index.toString()

    oneScreensWorth = 30
    render() {
        const { loading, cartLength, data, sort, found: { searchValue } } = this.state

        return (

            <View style={styles.container}>
                <SearchHeader
                    onValue={searchValue}
                    sorted={sort}
                    onSort={this._sortItems}
                    onChangeText={input => this._handleSearch(input)} onPress={() => this.props.navigation.goBack()} />
                <ContentLoader active avatar
                    aShape="square"
                    containerStyles={styles.list}
                    pRows={2}
                    listSize={5}
                    primaryColor={Colors.pureBG}
                    secondaryColor={Colors.mainBG}
                    sHeight={[500, 100, 100]}
                    pWidth={[300, 500, 300]}
                    loading={loading}>
                    < FlatList
                        data={data}
                        renderItem={({ item, key }) => (
                            item.type === 'Water' || item.type === 'Gas' ? null :
                                <MaterialAnimatedView index={1}>
                                    <ItemSearch
                                        img={item.image_url}
                                        onPress={() => this._addtoCart(item)}
                                        name={item.name}
                                        Company={item.CompanyName}
                                        Price={`RWF ${item.price}/${item.measure} `}
                                        Type={item.type} />
                                </MaterialAnimatedView>
                        )}
                        keyExtractor={this.keyExtractor}
                        initialNumToRender={this.oneScreensWorth}
                    />
                </ContentLoader>
            </View>
        );
    }
}