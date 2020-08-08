import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors } from '../Assets/Themes';
import AsyncStorage from '@react-native-community/async-storage';
import { userChoice, cartData, chatsCount } from './constants';
import WelcomeScreen from "../Screens/Welcome/Welcome";
import VendorChats from '../Screens/AccountApp/Chatlist'
import Settingscreen from '../Screens/UserApp/Settings'
import Local from "../Screens/UserApp/Local";
import Details from "../Screens/UserApp/Details";
import MapView from "../Screens/UserApp/Map";
import Orders from "../Screens/UserApp/orders";
import Loged from "../Screens/AccountApp/Login";
import Info from "../Screens/AccountApp/Info";
import ManageShop from "../Screens/AccountApp/ManageShop";
import InfoReg from "../Screens/AccountApp/infoRegis";
import CompanyInfo from "../Screens/AccountApp/CompanyInfo";
import Chatlist from '../Screens/AccountApp/Chatlist'
import VendorChat from '../Screens/AccountApp/fchat';
import VendorsList from '../Screens/AccountApp/vendorsList';
import AddressScreen from '../Screens/AccountApp/addressScreen';
import AddProduct from '../Screens/AccountApp/addProduct';
import Checkout from '../Screens/AccountApp/checkout';
import ItemInfo from '../Screens/UserApp/ItemsInfo';
import Mycart from '../Screens/UserApp/cart';
import SearchScreen from '../Screens/UserApp/SearchScreen';
import MaterialAnimatedView from '../Components/MaterialAnimatedView';
import LocalScreen from './tabNav';
import { Text, View } from 'react-native';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const FrontStack = createStackNavigator();
const WelcomeStack = createStackNavigator();
const SignupStack = createStackNavigator();
const ShopStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const ChatStack = createStackNavigator();
const IntroStack = createStackNavigator();
const SignupStackScreen = () => {
    return (
        <SignupStack.Navigator>
            <SignupStack.Screen
                name="InfoRegis"
                component={InfoReg}
                options={{ header: () => null }}
            />
            <SignupStack.Screen name="CompanyInfo" component={CompanyInfo}
                options={{
                    headerTitle: 'Add Shop',
                    headerStyle: {
                        backgroundColor: Colors.pureBG,
                        elevation: 3
                    },
                    headerTintColor: Colors.mainTxt,
                    headerTitleStyle: {
                        fontFamily: 'Roboto',
                    },
                }
                }
            />
            <SignupStack.Screen
                name="Location"
                component={AddressScreen}
                options={{ header: () => null }}
            />
        </SignupStack.Navigator>
    )
}
const ShopStackScreen = () => {
    return (
        <ShopStack.Navigator>
            <ShopStack.Screen name="ManageShop" component={ManageShop}
                options={{ header: () => null }}
            />
            <ShopStack.Screen
                name="VendorChat"
                component={VendorChat}
                options={{ header: () => null }}
            />
            <ShopStack.Screen
                name="Info"
                component={Info}
                options={{
                    headerTitle: 'Update',
                    headerStyle: {
                        backgroundColor: Colors.pureBG,
                        elevation: 3
                    },

                    headerTintColor: Colors.mainTxt,
                    headerTitleStyle: {
                        fontFamily: 'Roboto',
                    },
                }}
            />
            <ShopStack.Screen
                name="Product"
                component={AddProduct}
                options={{
                    headerTitle: 'Product',
                    headerStyle: {
                        backgroundColor: Colors.pureBG,
                        elevation: 1
                    },

                    headerTintColor: Colors.mainTxt,
                    headerTitleStyle: {
                        fontFamily: 'Roboto',
                    },
                }}
            />
        </ShopStack.Navigator>
    )
}
const WelcomeStackScreen = () => {
    return (
        <WelcomeStack.Navigator>
            <WelcomeStack.Screen name="Register" component={SignupStackScreen}
                options={{ header: () => null }}
            />
            <IntroStack.Screen
                name="Login"
                component={Loged}
                options={{ header: () => null }}
            />
        </WelcomeStack.Navigator>
    )
}

const FrontStackScreen = () => {
    return (
        <FrontStack.Navigator>
            <FrontStack.Screen
                name="Store Front"
                component={LocalScreen}
                options={{ header: () => null }}
            />
            <FrontStack.Screen
                name="ItemScreen"
                component={ItemInfo}
                options={{ header: () => null }}
            />
            <FrontStack.Screen
                name="VendorsScreen"
                component={VendorsList}
                options={({ route }) => ({
                    title: route.params.product,
                    headerStyle: {
                        backgroundColor: Colors.pureBG,
                        elevation: 1
                    },

                    headerTintColor: Colors.mainTxt,
                    headerTitleStyle: {
                        fontFamily: 'Roboto',
                    },
                })}
            />
            <FrontStack.Screen
                name="Checkout"
                component={Checkout}
            />
            <FrontStack.Screen
                name="AllItems"
                component={SearchScreen}
                options={{ header: () => null }}
            />
            <FrontStack.Screen
                name="Details"
                component={Details}
                options={{ header: () => null }}
            />
        </FrontStack.Navigator>
    );
}
function BigIcon({ name, badgeCount, focused, color, size }) {
    return (
        <MaterialAnimatedView index={1} style={{
            shadowColor: '#000',
            shadowOpacity: 1,
            shadowRadius: 50,
            shadowOffset: { width: 0, height: 0 }, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 35, height: 70, backgroundColor: focused ? color : Colors.pureBG, marginBottom: 1, elevation: 30
        }}>
            <Ionicons name={name} size={50} color={focused ? Colors.white : color} />
            {badgeCount > 0 && (
                <View
                    style={{
                        position: 'absolute',
                        left: 9,
                        top: 15,
                        backgroundColor: 'red',
                        borderRadius: 6,
                        width: 12,
                        height: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                        {badgeCount}
                    </Text>
                </View>
            )}
        </MaterialAnimatedView>
    );
}
function IconWithBadge({ name, badgeCount, color, size }) {
    return (
        <View style={{ width: 24, height: 24, margin: 5 }}>
            <Ionicons name={name} size={size} color={color} />
            {badgeCount > 0 && (
                <View
                    style={{
                        position: 'absolute',
                        right: -6,
                        top: -3,
                        backgroundColor: 'red',
                        borderRadius: 6,
                        width: 12,
                        height: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                        {badgeCount}
                    </Text>
                </View>
            )}
        </View>
    );
}
const SettingsStackScreen = () => {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="Settings"
                component={Settingscreen}
                options={{
                    headerTitle: 'Profile',
                    headerStyle: {
                        backgroundColor: Colors.pureBG,
                        elevation: 3
                    },
                    headerTintColor: Colors.mainTxt,
                    headerTitleStyle: {
                        fontFamily: 'Roboto',
                    },
                }}
            />
            <SettingsStack.Screen name="CompanyInfo" component={CompanyInfo}
                options={{
                    headerTitle: 'Add Shop',
                    headerStyle: {
                        backgroundColor: Colors.pureBG,
                        elevation: 3
                    },
                    headerTintColor: Colors.mainTxt,
                    headerTitleStyle: {
                        fontFamily: 'Roboto',
                    },
                }
                }
            />
            <SettingsStack.Screen
                name="ManageShop"
                component={ShopStackScreen}
                options={{ header: () => null }}
            />

        </SettingsStack.Navigator>
    );
}
const ChatStackScreen = () => {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen
                name="Chats"
                component={Chatlist}
            />
            <ChatStack.Screen
                name="VendorChat"
                component={VendorChat}
                options={{ header: () => null }}
            />
        </ChatStack.Navigator>
    );
}
const TabNavigationScreen = () => {
    const [cartLength, setCart] = useState(0)
    const [chats, setChats] = useState(0)
    setInterval(() => {
        getCart();
    }, 1000)
    const getCart = async () => {
        const currentData = await AsyncStorage.getItem(cartData)
        const getChats = await AsyncStorage.getItem(chatsCount)
        let curProduct = JSON.parse(currentData);
        setCart(() => curProduct ? curProduct.length : 0)
        setChats(getChats)
    }
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: Colors.primary,
                inactiveTintColor: 'gray',
                style: {
                    borderTopWidth: 0,
                    paddingTop: 3,
                    paddingBottom: 4,
                    backgroundColor: Colors.pureBG,
                    height: 60,
                    shadowColor: '#000',
                    shadowOpacity: 0.6,
                    shadowRadius: 50,
                    shadowOffset: { width: 0, height: 0 }
                },
                labelStyle: { fontFamily: 'Roboto', fontSize: 12 }
            }} >

            <Tab.Screen name={"Store"} component={FrontStackScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={"ios-stats"} color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="Orders" component={Orders}

                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons focused={focused} name={"ios-apps"} size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name=" " component={Mycart}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <BigIcon focused={focused} name={"ios-cart"} badgeCount={cartLength} color={color} />
                    )
                }}
            />
            <Tab.Screen name="Chats" component={ChatStackScreen}

                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <IconWithBadge focused={focused} name={"ios-chatbubbles"} badgeCount={chats} size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={SettingsStackScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name="ios-contact" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
const IntroStackScreen = () => {
    return (
        <IntroStack.Navigator>
            <IntroStack.Screen
                name="welcomeScreen"
                component={WelcomeScreen}
                options={{ header: () => null }}
            />
            <IntroStack.Screen
                name="Login"
                component={Loged}
                options={{ header: () => null }}
            />
            <IntroStack.Screen
                name="WelcomeStack"
                component={WelcomeStackScreen}
                options={{ header: () => null }} />
            <IntroStack.Screen name="AccessStack" component={TabNavigationScreen}
                options={{ header: () => null }}
            />
        </IntroStack.Navigator>
    )
}


export const RouteScreens = ({ signinLevel }) => {
    return (<NavigationContainer>
        <Stack.Navigator>
            {signinLevel == 200 ? (
                // User isn't signed in
                <Stack.Screen
                    name="Intro"
                    component={IntroStackScreen}
                    options={{ header: () => null }}
                />
            ) : signinLevel == 120 ? (
                <>
                    <Stack.Screen
                        name="Login"
                        component={Loged}
                        options={{ header: () => null }}
                    />
                    <Stack.Screen name="AccessStack" component={TabNavigationScreen}
                        options={{ header: () => null }}
                    />
                    <Stack.Screen
                        name="WelcomeStack"
                        component={WelcomeStackScreen}
                        options={{ header: () => null }} />
                </>
            ) : signinLevel == 110 ? (
                <>
                    <Stack.Screen name="AccessStack" component={TabNavigationScreen}
                        options={{ header: () => null }}
                    />
                    <Stack.Screen
                        name="Intro"
                        component={IntroStackScreen}
                        options={{ header: () => null }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Loged}
                        options={{ header: () => null }}
                    />
                </>
            ) : (<>
                <Stack.Screen
                    name="WelcomeStack"
                    component={WelcomeStackScreen}
                    options={{ header: () => null }} />
                <Stack.Screen name="AccessStack" component={TabNavigationScreen}
                    options={{ header: () => null }}
                /></>
                        )}
        </Stack.Navigator>
    </NavigationContainer>);
}

