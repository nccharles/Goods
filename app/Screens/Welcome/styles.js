import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../Assets/Themes'
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    //Swiper
    slide: {
        flex: 1,                    // Take up all screen
        justifyContent: 'center',   // Center vertically
        alignItems: 'center',       // Center horizontally
    },
    // Header styles
    header: {
        color: Colors.mainTxt,
        fontSize: width / 15,
        marginVertical: 15,
        fontFamily: 'Roboto',
    },
    // Text below header
    text: {
        color: Colors.mainTxt,
        fontSize: width / 25,
        opacity:.9,
        marginHorizontal: 40,
        fontFamily: 'Roboto',
    },
});

export default styles