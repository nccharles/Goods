import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StatusBar, ImageBackground } from 'react-native'
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { Colors } from './app/Assets/Themes'
import { userChoice, userPhone, chatName } from './app/Config/constants'
import { RouteScreens } from './app/Config/NavScreens';
export default App = () => {
	const [checked, setCheck] = useState(false);
	const [level, setLevel] = useState(0);
	useEffect(() => {
		getStarted();
	})
	const getStarted = async () => {
		if (!firebase.apps.length) {
			firebase.initializeApp({
				apiKey: "AIzaSyAa4o3VFabglKU2DEZ_fNUfLFQDZ2ymwUY",
				authDomain: "waga-99a35.firebaseapp.com",
				databaseURL: "https://waga-99a35.firebaseio.com",
				projectId: "waga-99a35",
				storageBucket: "waga-99a35.appspot.com",
				messagingSenderId: "400110870769"
			});
		}
		const retrieveduserChoice = await AsyncStorage.getItem(userChoice);
		const Phone = await AsyncStorage.getItem(userPhone);
		const Name = await AsyncStorage.getItem(chatName);
		if (retrieveduserChoice === 'true') {

			if (Phone) {
				if (Name) {
					setLevel(110)
					setCheck(true)
				} else {
					setLevel(111)
					setCheck(true)
				}
			} else {
				setLevel(120)
				setCheck(true)
			}

		} else {
			setLevel(200)
			setCheck(true)
		}

	}

	if (!checked) {
		return (
			<ImageBackground source={require('./app/Assets/Icons/splash.png')} style={styles.viewStyles}>
				<StatusBar backgroundColor={Colors.pureBG} barStyle={Colors.status} />
				<View />
			</ImageBackground>
		)
	} else {

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: Colors.pureBG }}>
				<StatusBar backgroundColor={Colors.pureBG} barStyle={Colors.status} />
				<View style={{ flex: 1 }}>
					<RouteScreens signinLevel={level} />
				</View></SafeAreaView>
		);
	}
}
const styles = {
	viewStyles: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.pureBG
	}
}
