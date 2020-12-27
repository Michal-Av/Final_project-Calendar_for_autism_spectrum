import React, { Component } from "react";
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ScreenLogin from "./screens/ScreenLogin";
import ScreenDay from "./screens/ScreenDay";
import ScreenWeek from "./screens/ScreenWeek";
import ScreenRest from "./screens/ScreenRest";

import { View, ActivityIndicator, StatusBar,StyleSheet, AsyncStorage } from "react-native";

const RootStack = createStackNavigator(
  {
    Day: {screen: ScreenDay},
    Week: { screen: ScreenWeek },
    Rest: { screen: ScreenRest },
    Enter: {screen: ScreenLogin}
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AuthStack= createStackNavigator({Home: ScreenLogin});

class AuthLoadingScreen extends Component{
  constructor(props){
    super(props);
    this._loadData();
  }
    render(){
      return(
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />

         
        </View>

      );
    }

    _loadData= async()=>{
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      this.props.navigation.navigate(isLoggedIn !== '1'? 'Auth' : 'App')
    }
  
  }

const styles = StyleSheet.create({

  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: RootStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
      defaultNavigationOptions: {
      headerVisible: false
      }
    }
  )
);