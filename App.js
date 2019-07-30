import React, { Component } from 'react' ;
import {
  Text,
  Alert,
  View,
  ActivityIndicator,
  FlatList 
  } from 'react-native';

export default class FlatListFromAPI extends Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true
    }
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json()).then((responseJson)=> {
      this.setState({
        isLoading: false,
        dataSource: responseJson.movies
      }, function(){

      });
    }).catch((error)=>{
      Alert.alert('Error:',error);
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex:1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'orangered'}}>
          <Text style={{top: 200,
                fontSize: 30, 
                color: 'yellow', 
                fontWeight: 'bold'}}>
                  This is Splash Screen
                  <ActivityIndicator style={{color: 'black'}}/>
                </Text>
        </View>
      )
    }
    return (
      <View
        style={{backgroundColor: 'yellow', flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
        <FlatList style={{top: 200}} 
        data={this.state.dataSource} 
        renderItem={({item})=> <Text>
        {item.title}, {item.releaseYear}
        </Text>}
        keyExtractor={({id}, index) =>id} 
        />
      </View>
    );
  } 
}