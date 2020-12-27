import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View, Animated,Modal,  TouchableHighlight,
    Image,
    Alert,} from 'react-native';  
import { Card } from "native-base";
import ImageTitle from "./ImageTitle";

var moment = require('moment-timezone');
export default class Timer extends Component { 
    
    constructor(props) {
        super(props);
    
      }
  
    state={  
        progressStatus: 0, 
      
        end:this.props.end,
        start: moment().clone().tz("Asia/Jerusalem"),
        will: this.props.end.diff(this.props.start, 'seconds')
     
    }  
    anim = new Animated.Value(1);  
    componentDidMount(){  
        this.onAnimate();  
    }  
 
    
    onAnimate = () =>{  
        this.anim.addListener(({value})=> {  
            this.setState({progressStatus: parseInt(value,10)});  
        });  
        console.log( this.state.will*1000);
        Animated.timing(this.anim,{  
             toValue: 100,  
            
             duration: this.state.will*1000,  
        }).start(() =>  {this.props.nav('Home', {})})  

    }  
  render() {  
   
    return ( 
   
      <View style={styles.container}>  
            <Animated.View  
                style={[  
                    styles.inner,{width: this.state.progressStatus +"%"},  
                ]}  
            />  
            <Animated.Text style={styles.label}>  
                    {this.state.progressStatus }%  
            </Animated.Text>  
      </View>  
);
  }  
}  
const styles = StyleSheet.create({  
    container: {  
    width: 240,  
    height: 40,  
    padding: 3,  
    borderColor: "#FAA",  
     borderWidth: 3,  
     borderRadius: 30,  
     marginTop: 50,  
    justifyContent: "center",  

  },  
  inner:{  
    width: "100%",  
    height: 30,  
    borderRadius: 15,  
    backgroundColor:"green",  
  },  
  label:{  
    fontSize:23,  
    color: "black",  
    position: "absolute",  
    zIndex: 1,  
    alignSelf: "center",  
  }
});