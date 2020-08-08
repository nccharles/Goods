import { Dimensions, Platform, StyleSheet } from 'react-native'
import { Colors } from '../../Assets/Themes'

const screenwidth = Dimensions.get('window').width

export default StyleSheet.create({

    input: {
        height: 40,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 2,
        borderBottomColor: Colors.primary,
        width: screenwidth - 70,
        paddingHorizontal: 10,
        fontSize: screenwidth / 25,
        fontFamily: 'Roboto_medium',
    },
    button: {
        fontFamily: 'Roboto_medium',
        color: Colors.blue
    },
    title: {
        fontFamily: 'Roboto',
        color: Colors.blue
    },
    details: {
        fontFamily: 'Roboto_medium',
        color: Colors.primary
    }
})
