const React = require("react-native");

const { StyleSheet } = React;

export default {

containerView: {
  flex: 1,
  backgroundColor:'#B9CDF0'
},
loginScreenContainer: {
  flex: 1,
},
logoText: {
  fontSize: 40,
  fontWeight: "800",
  marginTop: 20,
  marginBottom: 30,
  textAlign: 'center',
},
loginFormView: {
  flex: 1,
  marginTop:15
},
loginFormTextInput: {
  height: 43,
  fontSize: 14,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  paddingLeft: 10,
  marginLeft: 35,
  marginRight: 35,
  marginTop: 5,
  marginBottom: 5,

},
loginFormText: {
  fontSize: 14,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#fff',
  width:"92%",
  height: 40,
},
loginButton: {
  backgroundColor: "#174CAD",
  borderRadius: 5,
  height: 45,
  width: "50%",
  marginTop: 10,
  justifyContent: 'center',
  alignItems:"center"
},
button:{
  backgroundColor: "#174CAD",
  borderRadius: 5,
  marginTop: 10

},
icon: {
  width: 150,
  height: 150,
 
},
contain: {
  flex: 1,
  justifyContent: "center",
  alignItems:"center"
},
views:{
  flexDirection: 'row',
}
};
