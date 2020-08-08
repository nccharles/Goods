import AsyncStorage from '@react-native-community/async-storage'
import { setTheme } from '../../Config/constants';
const primary="#4d7701"
const secondary="#f46500"
const colorSchemes = {
  light: {
    primary,
    secondary,
    white:"#ffffff",
    black:"#000000",
    pureBG: '#ffffff',
    status:'dark-content',
    mainBG: '#f1f2f6',
    mainTxt: '#57606f',
    pureTxt: '#2f3542',
    gradientColors: ["#ffffff", "#f1f2f6"],
    gradientBtn: ["#f46500", "#f46500"],
    red:'#d63031',
    blue:'#45aaf2',
    green:'#3ae374'
  },
  dark: {
    primary,
    secondary,
    mainBG: '#57606f',
    white:"#ffffff",
    black:"#000000",
    pureBG: '#2f3542',
    status:'light-content',
    pureTxt: '#ffffff',
    mainTxt: '#f1f2f6',
    gradientColors: ["#57606f", "#2f3542"],
    gradientBtn: ["#f46500", "#f46500"],
    red:'#d63031',
    blue:'#45aaf2',
    green:'#3ae374'
  },
};
const colorScheme = async () => {
  const theme = await AsyncStorage.getItem(setTheme);
  if(theme==='dark'){
    return true
  }
  return false
}
const colors = !colorScheme() ? colorSchemes.dark : colorSchemes.light

export default colors
