import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    View, Text, TouchableOpacity
} from 'react-native';
import ContentLoader, { Bullets } from "react-native-easy-content-loader";
import styles from './styles'
import { Colors } from '../../Assets/Themes';

class MapCard extends Component {

    static propTypes = {
        location: PropTypes.string,
        road: PropTypes.string,
        onPress: PropTypes.func,
        loading: PropTypes.bool,
    }

    render() {
        return (
            <ContentLoader active avatar
                pRows={1}
                reverse
                containerStyles={styles.mapCard}
                primaryColor={Colors.pureBG}
                secondaryColor={Colors.mainBG}
                loading={this.props.loading}>
                <TouchableOpacity onPress={this.props.onPress} style={[styles.mapCard,{flexDirection: 'row'}]} >

                    <View style={styles.center}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {this.props.location}
                            </Text>
                        </View>
                        <View style={styles.subTitleContainer} >
                            <Text style={styles.subTitle}>
                                {this.props.road}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                            name="map-marker-radius"
                            size={26}
                            color={Colors.primary} />
                    </View>
                </TouchableOpacity>
            </ContentLoader>
        );
    }
}

export default MapCard;