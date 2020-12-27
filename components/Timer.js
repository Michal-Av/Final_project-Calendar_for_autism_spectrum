import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View, Animated,Modal,  TouchableHighlight,
    Image,
    Alert,} from 'react-native';  
import { Card } from "native-base";
import ImageTitle from "./ImageTitle";
export default class Timer extends Component { 
    
    constructor(props) {
        super(props);
      }
    
      // onClickListener = viewId => {
      //   Alert.alert("המשך ככה!", "יש לך עוד זמן לסיום :)");
      // };
    state={  
        progressStatus: 0, 
        modalVisible: false, 
    }  
    anim = new Animated.Value(this.props.head);  
    componentDidMount(){  
        this.onAnimate();  
    }  
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
      }
    
    onAnimate = () =>{  
        this.anim.addListener(({value})=> {  
            this.setState({progressStatus: parseInt(value,10)});  
        });  
        Animated.timing(this.anim,{  
             toValue: 100,  
             duration: this.props.back*1000,  
        }).start(() => {
            this.setModalVisible(true); 
           
    })  

    }  
  render() {  
    return ( 
      <View> 
     
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

      <View style={styles.contain}>
      <Modal
        visible={this.state.modalVisible}
        animationType={"slide"}
        onRequestClose={() => this.closeModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Card style={styles.card}>
              <View style={styles.innerContainer}>
                <Text style={styles.titleText}> זמן המשימה הסתיים.</Text>
                <Text style={styles.titleText}> האם סיימת?</Text>
                <Card style={styles.cardNow}>
                 <ImageTitle big={styles.imgModal} ima={this.props.sum}></ImageTitle>
                <Text style={styles.itemtitle}>{this.props.sum}</Text>
               
                </Card>

                <View style={styles.buttonContainer}>
                  <TouchableHighlight
                    style={[styles.button, styles.buttonMY]}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                      {this.props.func(true)}
                      {this.props.formatMessage()}
                     
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
                      this.setModalVisible(!this.state.modalVisible);
                      {this.props.func(false)}
                      {this.props.formatMessage()}
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
    container: {  
    width: 140,  
    height: 40,  
    padding: 3,  
    borderColor: "#FAA",  
     borderWidth: 3,  
     borderRadius: 30,  
     marginTop: 50,  
    justifyContent: "center",  
  //   width: 100,
  //   height: 100,
  //   marginTop: 18,
  //   marginRight: 20,
  //   marginLeft: 20
  // },
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
  },
  views: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  scrollContainer: {
    flex: 1
  },
  contain: {
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
    height: '47%',
    marginBottom: 2,
    borderRadius: 15,
    alignItems: "center"
  },
  titleText: {
    fontSize: 20,
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