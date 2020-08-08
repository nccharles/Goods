import React, { Component } from 'react'
import { FlatList, View, StatusBar } from 'react-native'
import _ from 'lodash'

import ListItem from '../../Components/List/ListItem'

import { Colors } from '../../Assets/Themes'

class CurrencyList extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Select a country   ',
      headerStyle: {
        backgroundColor: Colors.pureBG,
      },

      headerTintColor: Colors.pureTxt,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
      },
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      // showModal: false,
      refreshing: false,
      dataloaded: false,
      data: [],
      text: '',
      countries: []

    };
    this.onRefresh = this.onRefresh.bind(this);
    this.onEnd = this.onEnd.bind(this);

  }
  onEnd() {
    if (this.state.dataloaded) {
      this.setState({ dataloaded: false });
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          data: responseData,
          dataSource: responseData,
          loaded: true,
          refreshing: false,
          countries: responseData

        });
      })
      .done();
  }

  onRefresh() {
    this.setState({
      refreshing: true,
    });


    setTimeout(() => {

      this.setState({
        refreshing: false,
        dataloaded: true,
      });

    }, 200);
    this.fetchData();

  }

  renderSeparator = () =>
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE",
      }}
    />
  keyExtractor = (item, index) => index.toString()

  goBack = (countryName, countryFlag) => {
    const { navigation } = this.props
    navigation.goBack();
    navigation.state.params.setCountry({ countryName: countryName, countryFlag: countryFlag })
  }

  oneScreensWorth = 30
  render() {
    return (
      <View style={{ flex: 1, marginTop: 5 }}>
        <StatusBar translucent={false} barStyle="default" />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subtitle={item.capital}
              svgFiles={true}
              avatar={item.flag}
              onPress={() => this.goBack(item.name, item.flag)}
            />
          )}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default CurrencyList;