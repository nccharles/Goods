import {
  PermissionsAndroid,
  Platform,
  ToastAndroid
} from 'react-native'
export const userChoice = '@isUser#Choose@Recognized?eees'
export const userPhone = '@isUser#Use@Phone??'
export const userCountry = '@iscompany#Country??'
export const cName = '@isUser#Company@Display???'
export const chatName = '@isUser#Chatname@Display???'
export const chatNum = '@isUser#Chatnum@Display???'
export const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';
export const ExpoPushToken = '@isUser#PushToken@Created?'
export const userChats = '@isUser#Chats@Loaded?'
export const LocalData = '@isLocal#Data@Loaded?'
export const cartData = '@isCart#Data@Loaded?'
export const chatsCount = '@isChats#Data@counted?'
export const setTheme = '@isTheme#dark?'
export const contains = ({ uid, name }, query) => {
  if (name && name.toLowerCase().includes(query)) {
    return true;
  }

  return false;
};
export const isEmpty = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return true;
}
export const hasLocationPermission = async () => {
  if (Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version < 23)) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (hasPermission) return true;

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
  }

  return false;
}