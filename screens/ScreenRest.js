import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  Modal,
  Button
} from "react-native";
import { Card } from "native-base";
import ImageTitle from "../components/ImageTitle";
import TimerRest from "../components/TimerRest"

var moment = require('moment-timezone');

export default class ScreenRest extends Component {

    render() {
     const {navigate} = this.props.navigation;
     const { params } = this.props.navigation.state;
     
     const end= moment(params.time.dateTime).clone().tz("Asia/Jerusalem");
     var start=moment().clone().tz("Asia/Jerusalem");
     var will=end.diff(start, 'seconds');

      return (
          
           <View style={styles.container}>
           <Modal 
             visible={true}
             animationType={"slide"}
             onRequestClose={() => navigate('Day', {})}
           >
             <View style={styles.modalContainer} >
               <View style={styles.innerContainer}>
                 <Card style={styles.card}>
                   <View style={styles.innerContainer}>
                     <Text style={styles.titleText}> יש לך זמן חופשי </Text>
                     <Card style={styles.cardNow}>
                     <ImageTitle big={styles.imgModal} ima={"זמן חופשי"}></ImageTitle>
                    <Text style={styles.itemtitle}>{"זמן חופשי"}</Text>
                   
                    </Card>
                     <TimerRest nav={navigate} end={end} back={will}></TimerRest>
                   </View>
                 </Card>
               </View>
             </View>
           </Modal>
         </View>
      );
    }
  }

  
const styles = StyleSheet.create({
  views: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  scrollContainer: {
    flex: 1
  },
  container: {
    paddingTop: 20,
    width: '60%',
    height: '80%'
  },
  box: {
    marginTop: 5,
    backgroundColor: "#ED5D1A",
    alignItems: "center"
  },
  name: {
    fontSize: 35,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#1E90FF"
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20
  },

  button: {
    width: 80,
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: -2
    },
    elevation: 4
  },
  buttonYes: {
    backgroundColor: "#228B22"
  },
  buttonNo: {
    backgroundColor: "#EF2323"
  },
  buttonMY: {
    backgroundColor: "#228B22",
    width:  '30%',
    height: '95%',
    borderRadius: 15
  },
  buttonMN: {
    backgroundColor: "#EF2323",
    width: '30%',
    height: '95%',
    borderRadius: 15
  },
  iconM: {
    width: 65,
    height: 65
  },
  icon: {
    width: 35,
    height: 35
  },
  contain: {
    flex: 1,
    justifyContent: "center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "grey"
  },
  innerContainer: {
    alignItems: "center",
    marginTop: 20
  },
  card: {
    backgroundColor: "#B9CDF0",
    width: '50%',
    height: '97%',
    marginBottom: 15,
    borderRadius: 20
  },
  cardNow: {
    backgroundColor: "#ED5D1A",
    width: '70%',
    height: '55%',
    marginBottom: 2,
    borderRadius: 15,
    alignItems: "center"
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    justifyContent: "center"
  },
  miniText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
    justifyContent: "center"
  },
  imgModal:  {
    marginTop: 10,
    width: '65%',
    height:'85%',
    alignItems: "center"
  },
  itemtitle: {
    fontSize: 18,
    color: 'white',
    flex: 1,  justifyContent: 'center', alignItems: 'center'
}
});