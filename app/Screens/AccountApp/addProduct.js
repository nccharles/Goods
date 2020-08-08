import React, { Component } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Image, AsyncStorage,
    Platform,
    Picker,
    Alert,
    TextInput,
} from "react-native";
import Toast, { DURATION } from 'react-native-easy-toast'
import { Icon, Button, Input } from "react-native-elements";
import styles from "./Style/SignupStyles";
import { Colors } from "../../Assets/Themes";
import _ from 'lodash'
//backend things
import * as firebase from "firebase";
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { userPhone, cName } from '../../Config/constants'
const options = [
    {
        key: 'Gas',
        text: 'Gas',
    },
    {
        key: 'Water',
        text: 'Water',
    },
    {
        key: 'New',
        text: 'New',
    }
];

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                name: "New",
                type: "...",
                price: '',
                Quantity: "",
                measure: "Kg",
                unit: "Kg",
                BottleAmount: '0'
            },
            pCategories: [],
            pUnits: [],
            userPhone: "",
            selectedImage: "",
            blobImage: "",
            CompanyName: "",
            errorMessage: "",
            productId: "",
            newUnit: "",
            newCat: "",
            productName: '',
            loading: true,
            spinner: false,
            hiddeArray: false,
            isUnitVisible: false,
            isCatVisible: false,
            isSubmitting: false
        };
    }
    componentDidMount = async () => {

        const Phone = await AsyncStorage.getItem(userPhone)
        const CompanyName = await AsyncStorage.getItem(cName)
        if (this.props.route.params) {
            const { item: { name, Quantity, price, type, measure, image_url, BottleAmount, uid } } = this.props.route.params
            let newName = name === 'Gas' || name === 'Water' ? name : 'New'
            let productName = newName === 'New' ? name : ''
            let unit = newName === 'New' ? measure : 'Bottle'
            this.setState(state => ({
                product: {
                    ...state.product,
                    name: newName, Quantity, price, measure, type, unit, BottleAmount
                },
                selectedImage: image_url,
                productName,
                productId: uid
            }));
        }

        this.setState({
            showAlert: true,
            CompanyName,
            userPhone: Phone
        });
        this.QueryData()
    }

    toggleUnit = () => {
        this.setState({ isUnitVisible: !this.state.isUnitVisible, hiddeArray: false });
    };
    toggleCat = () => {
        this.setState({ isCatVisible: !this.state.isCatVisible, hiddeArray: false });
    };
    QueryData = async () => {
        const that = this

        await firebase.database().ref(`/Categories`)
            .limitToLast(5)
            .on('value', snapshot => {
                const pCategories = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid }
                })
                that.setState({
                    pCategories: [...pCategories],
                })
            })
        await firebase.database().ref(`/Units`)
            .limitToLast(5)
            .on('value', snapshot => {
                const pUnits = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid }
                })
                that.setState({
                    pUnits: [...pUnits],
                })
            })
    }
    addNewUnit = async () => {
        if (!this.state.newUnit) {
            Alert.alert("Empty", "Please enter new Measure or select one!")
            return
        }
        this.setState(state => ({
            product: {
                ...state.product,
                unit: this.state.newUnit
            }
        }))
        this.toggleUnit()
        await firebase
            .database()
            .ref(`/Units`)
            .push({
                name: this.state.newUnit
            })
            .then(async (response) => {
                this.setState({ newUnit: "" })
            })
    }
    addNewCat = async () => {
        if (!this.state.newCat) {
            Alert.alert("Empty", "Please enter new Category or select one!")
            return
        }
        this.setState(state => ({
            product: {
                ...state.product,
                type: this.state.newCat
            }
        }))
        this.toggleCat()
        await firebase
            .database()
            .ref(`/Categories`)
            .push({
                name: this.state.newCat
            })
            .then(async (response) => {
                this.setState({ newCat: "" })
            })
    }

    _handleTextInput = (key, value) => {
        if (this.props.route.params && (value === 'Water' || value === 'Gas' || value === 'New')) {
            return
        }
        if (key === "productName") {
            this.setState({ productName: value })
        } else {
            this.setState(state => ({
                product: {
                    ...state.product,
                    [key]: value,
                }
            }));
        }
        if (value === 'Gas' || value === 'Water') {
            this.setState(state => ({
                product: {
                    ...state.product,
                    unit: "Bottle",
                    type: value,
                }
            }));
        }
        if (value === "New") {
            this.setState(state => ({
                product: {
                    ...state.product,
                    unit: "Kg",
                }
            }));
        }
    };

    _handleSelect = (key, value) => {
        if (key === "newUnit" || key === "newCat") {
            this.setState({ [key]: value })
        } else {
            this.setState(state => ({
                product: {
                    ...state.product,
                    [key]: value
                }
            }));
            (key === "newUnit" || key === "unit") && key !== "" ? this.toggleUnit() : this.toggleCat()
        }
    };

    _handlepickerImage = () => {
        const { product: { name }, selectedImage } = this.state
        if (name === 'Gas' || name === 'Water' || (!selectedImage.path && selectedImage)) {
            return
        }
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
            return this.setState({ blobImage: blob });

        }).then((snapshot) => {
            // response

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

    uploadToFirebase = () => {
        const {
            CompanyName,
            product: {
                name,
                price,
                type,
                Quantity
            },
            blobImage,
            productName,
            isSubmitting,
        } = this.state;
        if (isSubmitting) {
            return;
        }
        this.setState({ isSubmitting: true })
        if ((name === "" || (name === "New" && productName === "")) || !price || type === '' || type === '...' || Quantity === "") {
            Alert.alert('All required', "Please Fill all the required fields")
            this.setState({ isSubmitting: false })
            return
        }
        if (name === 'Gas' || name === 'Water') {
            let image = ""
            this._handleproductSave(image)
            return;
        }
        if (!blobImage) {
            Alert.alert('No Picture', "Please Upload a Picture")
            this.setState({ isSubmitting: false })
            return
        }
        const imagePath = `${CompanyName}/${this.timestamp}.jpg`
        return new Promise((resolve, reject) => {

            const storageRef = firebase.storage().ref();

            storageRef.child(imagePath).put(blobImage, {
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
            this._handleproductSave(image_url)
        }).catch((error) => {
            console.log(error.message)
        })


    }

    _handleproductSave = async (image) => {
        const {
            product: {
                name,
                Quantity,
                price,
                type,
                unit,
                BottleAmount
            },
            userPhone,
            productName,
            CompanyName,
        } = this.state;
        this.setState({
            isSubmitting: true
        });
        const that = this;
        let NewName = productName ? productName : name
        if ((NewName === "" || NewName === "New") || !price || type === '' || type === '...' || Quantity === "") {
            Alert.alert('All required', "Please Fill all the required fields")
            this.setState({ isSubmitting: false })
            return
        }
        if (productName && image === '') {
            Alert.alert('No Picture', "Please Upload a Picture")
            this.setState({ isSubmitting: false })
            return
        }
        await firebase
            .database()
            .ref(`/products`)
            .push({
                companyPhone: userPhone,
                name: NewName,
                type,
                CompanyName,
                image_url: image || '',
                Quantity,
                price,
                BottleAmount,
                measure: NewName === 'Gas' ? 'Kg' : NewName === 'Water' ? 'L' : unit,
                timestamp: this.timestamp
            })
            .then(async (response) => {
                this.refs.toast.show("product saved!")
                that.props.navigation.goBack();
                that.setState({
                    isSubmitting: false
                });
            })
            .catch(err => {
                that.setState({
                    isSubmitting: false
                });
            });

    };

    _handleUpdate = async () => {
        const {
            product: {
                name,
                Quantity,
                price,
                type,
                unit,
                BottleAmount
            },
            userPhone,
            productId,
            productName,
            CompanyName,
            isSubmitting
        } = this.state;
        if (isSubmitting) {
            return;
        }
        this.setState({
            isSubmitting: true
        });
        let NewName = productName ? productName : name
        if ((NewName === "" || NewName === "New") || !price || type === '' || type === '...' || Quantity === "") {
            Alert.alert('All required', "Please Fill all the required fields")
            this.setState({ isSubmitting: false })
            return
        }
        const that = this;
        await firebase
            .database()
            .ref(`/products/${productId}`)
            .update({
                companyPhone: userPhone,
                name: NewName,
                CompanyName,
                Quantity,
                price,
                BottleAmount,
                measure: NewName === 'Gas' ? 'Kg' : NewName === 'Water' ? 'L' : unit,
                timestamp: this.timestamp
            })
            .then(async (response) => {
                that.refs.toast.show("product updated!")
                that.props.navigation.goBack();
                that.setState({
                    isSubmitting: false
                });
            })
            .catch(err => {
                that.setState({
                    isSubmitting: false
                });
            });
    };
    //backend end
    get timestamp() {
        return new Date().valueOf();
    }


    render() {
        const { product: { name, price, Quantity, BottleAmount, unit, measure, type }, pUnits, pCategories, newUnit, newCat, hiddeArray, productName, selectedImage, productId } = this.state;
        const { params } = this.props.route
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly', }}>
                        <View>
                            <Text style={styles.topTitle}>{params ? "Image" : "Upload Image"}</Text>
                            <TouchableOpacity
                                onPress={this._handlepickerImage.bind(this)}
                                style={styles.proImage}>

                                {name === 'Water' ? <Image source={require('../../Assets/Icons/waterBottle.png')} style={{ width: 60, height: 80 }} /> :
                                    name === 'Gas' ? <Image source={require('../../Assets/Icons/gas.png')} style={{ width: 80, height: 100 }} /> :
                                        selectedImage ? <Image source={{ uri: selectedImage.path || selectedImage }} style={styles.Pimg} /> :
                                            <MaterialIcons name="add" size={30} color={Colors.secondary} />}
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.topTitle}>{params ? "" : "Select a"} Product</Text>
                            {options.map(item =>
                                <View key={item.key} style={styles.selectContainer}>
                                    <Text style={styles.selectText}>{params && name === "New" && name === item.key ? type : item.text}</Text>
                                    <TouchableOpacity
                                        style={styles.selectCircle}
                                        onPress={() => this._handleTextInput("name", item.key)}
                                    >
                                        {name === item.key && (<View style={styles.selectCheckedCircle}><MaterialCommunityIcons name="check" size={20} color={Colors.secondary} /></View>)}
                                    </TouchableOpacity>
                                </View>
                            )
                            }
                        </View>
                    </View>
                    {name === "New" && <Input
                        label="Product name"
                        labelStyle={styles.inputLabel}
                        placeholder="Name.."
                        placeholderTextColor={Colors.mainBG}
                        containerStyle={styles.input}
                        underlineColorAndroid={"transparent"}
                        inputStyle={styles.inputStyle}
                        returnKeyType={"next"}
                        editable={true}
                        value={productName}
                        onChangeText={value => this._handleTextInput("productName", value)}
                    />}
                    <View style={styles.CustomLabel}>
                        <Text style={styles.inputLabel}>Price(Rwf)</Text>
                        <View style={styles.inputPicker}>
                            <TextInput
                                editable={true}
                                returnKeyType={"next"}
                                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                                placeholder="0.00"
                                placeholderTextColor={Colors.mainBG}
                                onChangeText={value => this._handleTextInput("price", value)}
                                value={price}
                                style={styles.customInput} />
                            <Button
                                onPress={this.toggleUnit}
                                title={`/ ${unit}`}
                                titleStyle={styles.label}
                                type="clear"
                            />
                        </View>
                    </View>
                    <Input
                        label={name === "New" ? "Quantity in stock" : `Bottle Quantity(${type === 'Gas' ? 'Kg' : type === 'Water' ? 'Little' : unit})`}
                        placeholder="0"
                        placeholderTextColor={Colors.mainBG}
                        labelStyle={styles.inputLabel}
                        containerStyle={styles.input}
                        underlineColorAndroid={"transparent"}
                        inputStyle={styles.inputStyle}
                        returnKeyType={"next"}
                        editable={true}
                        value={Quantity}
                        keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                        onChangeText={value => this._handleTextInput("Quantity", value)}
                    />
                    {name !== "New" && <Input
                        label="Only Bottle Price (empty)"
                        labelStyle={styles.inputLabel}
                        placeholder="0"
                        placeholderTextColor={Colors.mainBG}
                        containerStyle={styles.input}
                        underlineColorAndroid={"transparent"}
                        inputStyle={styles.inputStyle}
                        returnKeyType={"next"}
                        editable={true}
                        value={BottleAmount}
                        keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                        onChangeText={value => this._handleTextInput("BottleAmount", value)}
                    />}
                    <TouchableOpacity
                        onPress={this.toggleCat} style={styles.CustomLabel}>
                        <Text style={styles.inputLabel}>Product Category</Text>
                        <View style={[{ paddingVertical: 10 }]}>
                            <Text style={[styles.inputStyle, { marginLeft: 5 }]}>{type}</Text>
                        </View>
                    </TouchableOpacity>


                    <Button
                        onPress={productId !== "" ? this._handleUpdate.bind(this) : this.uploadToFirebase.bind(this)}
                        title={productId !== "" ? "UPDATE" : "ADD"}
                        type="clear"
                        buttonStyle={styles.button}
                        titleStyle={{ color: Colors.secondary }}
                        icon={{ type: "entypo", name: productId !== "" ? "cw" : "add-to-list", color: Colors.secondary }}
                        loading={this.state.isSubmitting}
                        activityIndicatorStyle={{ color: Colors.pureTxt }}
                    />

                    <Modal isVisible={this.state.isUnitVisible}
                        testID={'modal'}
                        animationInTiming={1000}
                        animationOutTiming={500}
                        backdropTransitionInTiming={800}
                        backdropTransitionOutTiming={400}
                        onSwipeComplete={this.toggleUnit}
                        swipeDirection={['down']}
                        backdropColor="rgba(0,0,0,.3)"
                        style={{
                            justifyContent: 'flex-end',
                            margin: 0,
                        }}
                    >
                        <View style={{ backgroundColor: Colors.mainBG, elevation: 3, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <View style={[styles.CustomLabel, { margin: 0 }]}>
                                <Text style={styles.inputLabel}>+ NEW MEASURE</Text>
                                <View style={styles.inputPicker}>
                                    <TextInput
                                        editable={true}
                                        onFocus={() => this.setState({ hiddeArray: true })}
                                        returnKeyType={"next"}
                                        placeholder="Eg: Box,Pair..."
                                        placeholderTextColor={Colors.mainTxt}
                                        onChangeText={value => this._handleSelect("newUnit", value)}
                                        value={newUnit}
                                        style={styles.customInput} />
                                    <Button
                                        onPress={this.addNewUnit}
                                        buttonStyle={styles.smallBtn}
                                        iconRight={true}
                                        icon={{ type: "MaterialIcons", name: "add", size: 35, color: Colors.pureTxt }}
                                        type="clear"
                                    />
                                </View>
                            </View>
                            <ScrollView>
                                {!hiddeArray && pUnits && pUnits.map(item =>
                                    <View key={item.key} style={[styles.buttonContainer, { marginTop: 10 }]}>
                                        <Text style={styles.selectText}>{item.name}</Text>
                                        <TouchableOpacity
                                            style={styles.circle}
                                            onPress={() => this._handleSelect("unit", item.name)}
                                        >
                                            {unit === item.name && (<View style={styles.checkedCircle}><MaterialCommunityIcons name="check" size={20} color={Colors.secondary} /></View>)}
                                        </TouchableOpacity>
                                    </View>
                                )
                                }
                            </ScrollView>
                        </View>
                    </Modal>
                    <Modal isVisible={this.state.isCatVisible}
                        testID={'modal'}
                        animationInTiming={1000}
                        animationOutTiming={500}
                        backdropTransitionInTiming={800}
                        backdropTransitionOutTiming={400}
                        onSwipeComplete={this.toggleCat}
                        swipeDirection={['down']}
                        backdropColor="rgba(0,0,0,.3)"
                        style={{
                            justifyContent: 'flex-end',
                            margin: 0,
                        }}
                    >
                        <View style={{ backgroundColor: Colors.mainBG, elevation: 3, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <View style={[styles.CustomLabel, { margin: 0 }]}>
                                <Text style={styles.inputLabel}>+ new Category</Text>
                                <View style={styles.inputPicker}>
                                    <TextInput
                                        editable={true}
                                        onFocus={() => this.setState({ hiddeArray: true })}
                                        returnKeyType={"next"}
                                        placeholder="Eg: Milk,Food,Liquor..."
                                        placeholderTextColor={Colors.mainTxt}
                                        onChangeText={value => this._handleSelect("newCat", value)}
                                        value={newCat}
                                        style={styles.customInput} />
                                    <Button
                                        onPress={this.addNewCat}
                                        buttonStyle={styles.smallBtn}
                                        iconRight={true}
                                        icon={{ type: "MaterialIcons", name: "add", size: 35, color: Colors.pureTxt }}
                                        type="clear"
                                    />
                                </View>
                            </View>
                            <ScrollView>
                                {!hiddeArray && pCategories && pCategories.map(item =>
                                    <View key={item.key} style={[styles.buttonContainer, { marginTop: 10 }]}>
                                        <Text style={styles.selectText}>{item.name}</Text>
                                        <TouchableOpacity
                                            style={styles.circle}
                                            onPress={() => this._handleSelect("type", item.name)}
                                        >
                                            {type === item.name && (<View style={styles.checkedCircle}><MaterialCommunityIcons name="check" size={20} color={Colors.secondary} /></View>)}
                                        </TouchableOpacity>
                                    </View>
                                )
                                }
                            </ScrollView>
                        </View>
                    </Modal>
                    <Toast ref="toast"
                        style={{ backgroundColor: Colors.pureBG }}
                        position='bottom'
                        positionValue={200}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{ color: Colors.pureTxt }} />
                </ScrollView>
            </View >
        );
    }
}
export default AddProduct;
