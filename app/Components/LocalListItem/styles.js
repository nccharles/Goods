import { StyleSheet } from 'react-native'
import { Colors } from '../../Assets/Themes';

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.pureBG,
    },
    wrapper: {
        backgroundColor: Colors.pureBG
    },
    text: {
        fontSize: screenwidth / 25,
        color: Colors.pureBG,
        fontFamily: 'Roboto',
    },
    separator: {
        marginLeft: 20,
        backgroundColor: Colors.mainBG,
        flex: 1,
        height: StyleSheet.hairlineWidth
    },
})

export default styles