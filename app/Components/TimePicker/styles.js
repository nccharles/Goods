import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../Assets/Themes';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: height * .05,
    },
    picker: {
        height: 50,
        width: 45,
        backgroundColor: Colors.pureBG
    },
    separator: {
        marginTop: 15,
        fontFamily: 'Roboto',
    }
});
export default styles;