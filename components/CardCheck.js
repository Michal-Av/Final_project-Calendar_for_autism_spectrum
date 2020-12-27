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
import ScreenDay from "../screens/ScreenDay";


import ImageTitle from "./ImageTitle";

export default class CardCheck extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  constructor(props) {
    super(props);
  }

  onClickListener = viewId => {
    Alert.alert("המשך ככה!", "יש לך עוד זמן לסיום :)");
  };

  render() {

    // var item=this.props.item;
    // item.summary=this.props.sum;
    // item.start=this.props.now;
    // item.end=this.props.end;
    // const index=-1;
  //  const item= {"summary" : this.props.sum,
  //     "start" : this.props.now,
  //     "end" : this.props.end};
    const {navigate} = this.props.nav;
    return (
      <View>
        <View style={styles.box}>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={[styles.button, styles.buttonYes]}
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Image
                style={styles.icon}
                source={require("./../public/icons/v.png")}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.buttonNo]}
              // onPress={() => this.onClickListener("No")}
            >
              <Image
                style={styles.icon}
                disabled={true}
                source={require("./../public/icons/x.png")}
              />
            </TouchableHighlight>
          </View>
        </View>

        {/* /modal******************************* */}
        <View style={styles.container}>
          <Modal 
            visible={this.state.modalVisible}
            animationType={"slide"} 
            
            onRequestClose={() => navigate('Home', {})}
          >
            <View style={styles.modalContainer} >
              <View style={styles.innerContainer}>
                <Card style={styles.card}>
                  <View style={styles.innerContainer}>
                    <Text style={styles.titleText}> האם סיימת את המשימה? </Text>
                    <Card style={styles.cardNow}>
                     <ImageTitle big={styles.imgModal} ima={this.props.sum}></ImageTitle>
                    <Text style={styles.itemtitle}>{this.props.sum}</Text>
                   
                    </Card>

                    <View style={styles.buttonContainer}>
                      <TouchableHighlight
                        style={[styles.button, styles.buttonMY]}
                        onPress={() => { 
                          this.setModalVisible(!this.state.modalVisible);
                          {navigate("Rest", {time: this.props.end })}
                        }}
                      >
                        <Image
                          style={styles.iconM}
                          source={require("./../public/icons/v.png")}
                        />
                      </TouchableHighlight>

                      <Text style={{fontSize: 16}}>{"        "}</Text>  
                      <TouchableHighlight
                        style={[styles.button, styles.buttonMN]}
                        onPress={() => {
                         // Alert.alert("המשך ככה!", "יש לך עוד זמן לסיום :)");
                          this.setModalVisible(!this.state.modalVisible);
                        }}
                      >
                        <Image
                          style={styles.iconM}
                          source={require("./../public/icons/x.png")}
                        />
                      </TouchableHighlight>
                    </View>
                  </View>
                </Card>
              </View>
            </View>
          </Modal>
        </View>
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
