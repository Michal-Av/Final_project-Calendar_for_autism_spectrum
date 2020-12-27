import React, { Component } from "react";

import {
  Container,
  Content,
  Left,
  Right,
  Header,
  Button,
  Icon,
  Text,
  Body,
  Card,
  Title,
} from 'native-base';

import { 
  StyleSheet,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import _ from 'lodash';

import ListSunday from "../components/ListDays/ListSunday";
import ListMonday from "../components/ListDays/ListMonday";
import ListTuesday from "../components/ListDays/ListTuesday";
import ListWednesday from "../components/ListDays/ListWednesday";
import ListThursday from "../components/ListDays/ListThursday";
import ListFriday from "../components/ListDays/ListFriday";
import ListSaturday from "../components/ListDays/ListSaturday";

var moment = require('moment-timezone');

export default class ScreenWeek extends Component {
  constructor(props) {
    super(props)
    };



render()     
    {
      var { navigate } = this.props.navigation;
    return (
        <Container>
            <Header iosBarStyle="dark-content" style={{backgroundColor:'#B9CDF0',height:64,color:'black'}}>
          
                <Left style={{flex:1}}>
                    <Button transparent onPress={() => navigate("Day", {})} style={{paddingLeft:5,paddingBottom:3}}>
                    <Icon name="ios-arrow-dropleft" style={{fontSize:35,color: 'black',paddingTop:2}}/>
                    </Button>
                </Left>
                <Body style={{flex:1, flexDirection: 'column'}}>

                </Body>
                <Right style={{flex:1}}>
                    <Button transparent onPress={() => navigate("Week", {})} style={{paddingBottom:3}}>
                        <Icon name="ios-arrow-dropright" style={{fontSize:35,color: '#B9CDF0',paddingTop:2}}/>
                    </Button>
                </Right>
            </Header>
            <View style={styles.container}>
     
            <View style={{backgroundColor:"#B9CDF0",flexDirection: 'row',justifyContent: "space-between",}}>
                  <Text style={styles.titleRow}>יום שבת {"   "}</Text>
                  <Text style={styles.titleRow}>יום שישי</Text>
                  <Text style={styles.titleRow}>יום חמישי</Text>
                  <Text style={styles.titleRow}>יום רביעי</Text>
                  <Text style={styles.titleRow}>יום שלישי</Text>
                  <Text style={styles.titleRow}> יום שני </Text>
                  <Text style={styles.titleRow}> {"  "}יום ראשון</Text>
              
              </View>
      
           <Content style={{backgroundColor:"#B9CDF0"}} contentContainerStyle={{flex:1, flexDirection:'row'}} scrollsToTop={true}>
                <View style={{flex: 1, overflow: 'hidden',backgroundColor:"#B9CDF0",...Platform.select({ios: {marginTop: 0}})}}>
                <ScrollView>  
                  <View style={styles.reservations}>
                     <ListSunday />
                     <ListMonday />
                     <ListTuesday />
                     <ListWednesday />
                     <ListThursday />
                     <ListFriday />
                     <ListSaturday />
                  </View>
                </ScrollView>
                   
                </View>
            </Content>
            </View>
        </Container>
    )

  }
}

const styles = StyleSheet.create({
  titleRow: {
    fontSize: 20,fontWeight: "bold", color: "black"
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent',
      paddingLeft:9,
      paddingRight:5,
      backgroundColor:"#B9CDF0"
  },
  
  
  item: {
    paddingTop: 3,
    flex: 1,
    justifyContent: "center"     
  },
  
  
  reservations: {
      flex: 1,
      flexDirection:'row-reverse',
      justifyContent: "space-between",
      backgroundColor: "#B9CDF0"
  },
})
