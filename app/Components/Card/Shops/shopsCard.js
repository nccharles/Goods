import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import haversine from 'haversine'
import ShopsList from "./Shops";
class ShopsCard extends Component {
    render() {
        let { data, isLoading, latitude, longitude, navigation } = this.props
        data.sort((a, b) => (Number(a.Distance) > Number(b.Distance)) ? 1 : ((Number(b.Distance) > Number(a.Distance)) ? -1 : 0));
        return (<ScrollView horizontal={true} style={styles.currScroll}>
            {data.map((item, key) => {
                if (item && item.longitude && item.latitude) {
                    return (
                        <View
                            key={key}
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Details', { userPhone: item.companyPhone, Distance: haversine({ latitude, longitude }, { latitude: item.latitude, longitude: item.longitude }, { unit: 'meter' }) })}
                            >
                                <ShopsList
                                    img={item.image_url}
                                    name={item.company}
                                    Address={item.address}
                                    Hours={`From: ${item.openAt} To: ${item.closeAt} ${item.workingDays}`}
                                    Dist={`${Number(item.Distance)}`} />
                            </TouchableOpacity>
                        </View>
                    );
                }
            })}
        </ScrollView>
        );
    };
};

ShopsCard.propTypes = {
    isLoading: PropTypes.bool,
    latitude: PropTypes.any,
    longitude: PropTypes.any,
    data: PropTypes.array,
};

const styles = StyleSheet.create({
    currScroll: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: height / 3.2
    },
});
export default ShopsCard;
