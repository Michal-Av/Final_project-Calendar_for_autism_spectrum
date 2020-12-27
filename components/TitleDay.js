import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

export default class TextDay extends Component {
  render() {
    var day="";
    const currentDay = new Date().getDay();
    switch (currentDay) {
      case 0:
        day = "ראשון";
        break;
      case 1:
        day = "שני";
        break;
      case 2:
        day = "שלישי";
        break;
      case 3:
        day = "רביעי";
        break;
      case 4:
        day = "חמישי";
        break;
      case 5:
        day = "שישי";
        break;
      case 6:
        day = "שבת";
        break;
      default:
        break;
    }
  return <Text style={styles.titleText}>  היום יום {day}</Text>;
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize:25,
    fontWeight: "bold",
    color: "black",
    
  }
});
