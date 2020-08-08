import { PERMISSIONS } from 'react-native-permissions';
import GetNotications from 'react-native-notifications'
import { PUSH_ENDPOINT, ExpoPushToken, chatNum, userPhone } from './constants';
import AsyncStorage from '@react-native-community/async-storage'
import * as firebase from 'firebase';
const messages = []
export const registerForPushNotificationsAsync = async () => {
    const CurrentuserPhone = await AsyncStorage.getItem(userPhone)
    const CurrentuserChatNum = await AsyncStorage.getItem(chatNum)
    const { status: existingStatus } = await PERMISSIONS.getAsync(
        PERMISSIONS.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if PERMISSIONS have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification PERMISSIONS are granted during the app
        // install, so this will only ask on iOS
        const { status } = await PERMISSIONS.askAsync(PERMISSIONS.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant PERMISSIONS
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await GetNotications.getExpoPushTokenAsync();
    await AsyncStorage.setItem(ExpoPushToken, token)
    if (CurrentuserChatNum || CurrentuserPhone) {
        let CurrentuserToken = token
        firebase
            .database()
            .ref(`/pushToken/${CurrentuserChatNum ? CurrentuserChatNum : CurrentuserPhone}`)
            .update({
                token: CurrentuserToken,
            })
            .then(resp => {})
    }

}
export const sendPushNotification = async (sender, phone, body) => {
    if (phone) {
        firebase.database().ref(`/pushToken/${phone}`)
            .once('value').then(snapshot => {
                if (snapshot.val()) {
                    messages.push({
                        "to": snapshot.val().token,
                        "title": sender,
                        "priority": 'high',
                        "sound": "default",
                        "ttl": 0,
                        "badge": 0,
                        "body": body
                    })
                    return Promise.all(messages)
                }


            }).then(messages => {
                fetch(PUSH_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(messages),
                });
            })
    }
}
