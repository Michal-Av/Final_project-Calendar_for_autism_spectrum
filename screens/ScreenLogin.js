import React, { Component } from "react";

import styles from "./style";
import {Icon} from 'native-base'
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView,TouchableHighlight, Linking, Image, AsyncStorage} from 'react-native';
import { Button } from 'react-native-elements';

var moment = require('moment-timezone');
export default class ScreenLogin extends Component {
    constructor(props){
        super(props);
        this.state= {
            userAccount: '',
            apikey: '',
            pageToken: '',
        }
    }

  render() {
    var { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>ברוך הבא!</Text>
         
          <View style={styles.contain}>
          <Image style={styles.icon}
                source={require("./../public/images/ic_launcher.png")}></Image>
                </View>
                       <View
                       style={[styles.loginFormTextInput, styles.views]}>
                           <TextInput placeholder="Please enter yours e-mail address"
                            placeholderColor="#c4c3cb"  
                            style={styles.loginFormText}
                            onChangeText= {(userAccount)=>this.setState({userAccount})}
                            value= {this.state.userAccount} />                               
                           
                         <TouchableHighlight
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                                width:42,
                                height:42,
                                marginTop: 1,
                                borderRadius:50,
                              }}
                            onPress={ ()=>{ Linking.openURL('https://support.google.com/calendar/answer/37083?hl=iw')}}
                          >
                            <Icon name={"ios-information-circle-outline"}   color="#01a699" />
                      </TouchableHighlight>  
                       </View>
                       <Text style={{textAlign: 'right', marginRight:50}}>כדי להיכנס עליך להפוך את האירועים בחשבון לשיתוף ציבורי. להסבר נוסף לחץ על כפתור המידע</Text>            
         <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center'}}>
       
         <Button
            title="        כניסה ליומן         "
            buttonStyle={styles.button}
            onPress={this._login}
          />
           
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  _login= async() =>{
    const CALENDAR_ID =this.state.userAccount;
    const API_KEY = 'AIzaSyCX6j6VXMRn2ciU2eaEyxBpN0ttNLI_P1A';

    const beginDate = moment().clone().tz("Asia/Jerusalem");
  
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${beginDate.toISOString()}&maxResults=50&singleEvents=true&orderBy=startTime&pageToken=${this.state.pageToken}`;
   
    fetch(url)
        .then(async(response) => {
            console.log(response.ok);
            if(response.ok){
            await AsyncStorage.setItem('isLoggedIn', '1');
            await AsyncStorage.setItem('account', CALENDAR_ID);
            await AsyncStorage.setItem('key', API_KEY);
             this.props.navigation.navigate("Day", {})
             Alert.alert("Logged In");

            }
            else{
                AsyncStorage.clear();
                Alert.alert("כתובת מייל לא תקינה, או שהחשבון אינו משתף את האירועים באופן ציבורי. אנא תקן את הבעיה ונסה שוב");
            } 
           
        })
    
  }
};

