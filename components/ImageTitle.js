import React, { Component } from "react";
import { StyleSheet, Text, Image} from "react-native";

export default class ImageTitle extends Component {
  render() {
    
    switch (this.props.ima) {
        case 'נגרות':
            return <Image
            style={this.props.big}
            source={require("./../public/images/carpentry.jpeg")}
        />;     
        case 'בריכה':
            return <Image
            style={this.props.big}
            source={require("./../public/images/pool.jpeg")}
        />;      
        case 'אופניים':
            return <Image
            style={this.props.big}
            source={require("./../public/images/bicycle.jpeg")}
        />; 
        case 'ארוחת בוקר':
            return <Image
            style={this.props.big}
            source={require("./../public/images/breakfast.jpeg")}
        />;     
        case 'בית קפה':
            return <Image
            style={this.props.big}
            source={require("./../public/images/coffee.jpeg")}
        />;      
        case 'בישול':
            return <Image
            style={this.props.big}
            source={require("./../public/images/cooking.jpeg")}
        />;  
        case 'תרבות':
            return <Image
            style={this.props.big}
            source={require("./../public/images/culture.jpeg")}
        />;     
        case 'גינון':
            return <Image
            style={this.props.big}
            source={require("./../public/images/gardening.jpeg")}
        />;      
        case 'הפסקה':
            return <Image
            style={this.props.big}
            source={require("./../public/images/break.jpeg")}
        />;
        case 'מוזיקה':
            return <Image
            style={this.props.big}
            source={require("./../public/images/music.jpeg")}
        />;
        case 'מוסיקה':
            return <Image
            style={this.props.big}
            source={require("./../public/images/music.jpeg")}
        />;
        case 'כושר':
            return <Image
            style={this.props.big}
            source={require("./../public/images/gym.jpeg")}
        />;
        case 'ארוחת צהריים':
            return <Image
            style={this.props.big}
            source={require("./../public/images/lunch.jpeg")}
        />;
        case 'סרט':
            return <Image
            style={this.props.big}
            source={require("./../public/images/movie.jpeg")}
        />;
        case 'בעלי חיים':
            return <Image
            style={this.props.big}
            source={require("./../public/images/pet.jpeg")}
        />; 
        case 'זמן מנוחה':
            return <Image
            style={this.props.big}
            source={require("./../public/images/sleep.jpeg")}
        />;
        case 'זמן חופשי':
            return <Image
            style={this.props.big}
            source={require("./../public/images/waiting.jpeg")}
        />;
        case 'זהירות בדרכים':
            return <Image
            style={this.props.big}
            source={require("./../public/images/roadSafty.jpeg")}
        />;
        case 'זה"ב':
            return <Image
            style={this.props.big}
            source={require("./../public/images/roadSafty.jpeg")}
        />;
        case 'אני והחווה':
            return <Image
            style={this.props.big}
            source={require("./../public/images/farm.jpeg")}
        />;
        case 'תאטרון':
            return <Image
            style={this.props.big}
            source={require("./../public/images/theater.jpeg")}
        />;
        case 'קניות':
            return <Image
            style={this.props.big}
            source={require("./../public/images/shopping.jpeg")}
        />;
        case 'מסיבה':
            return <Image
            style={this.props.big}
            source={require("./../public/images/party.jpeg")}
        />;
        case 'מלתחות':
            return <Image
            style={this.props.big}
            source={require("./../public/images/shower.jpeg")}
        />;
        case 'חינוך גופני':
            return <Image
            style={this.props.big}
            source={require("./../public/images/physicalEdu.jpeg")}
        />;
        case 'מגמות':
            return <Image
            style={this.props.big}
            source={require("./../public/images/literature.jpeg")}
        />;
        case 'בעלי חיים':
            return <Image
            style={this.props.big}
            source={require("./../public/images/pet.jpeg")}
        />;
        case 'מפגש':
            return <Image
            style={this.props.big}
            source={require("./../public/images/meeting.jpeg")}
        />;
        case 'תעסוקה':
            return <Image
            style={this.props.big}
            source={require("./../public/images/busy.jpeg")}
        />;
        case 'תכשיטנות':
            return <Image
            style={this.props.big}
            source={require("./../public/images/jewelry.jpeg")}
        />;
        case 'אומנות':
            return <Image
            style={this.props.big}
            source={require("./../public/images/painting.jpeg")}
        />;
        case 'תעסוקת בוקר':
            return <Image
            style={this.props.big}
            source={require("./../public/images/startDay.jpeg")}
        />;
        case 'ניהול זמן פנאי':
            return <Image
            style={this.props.big}
            source={require("./../public/images/pnai.jpeg")}
        />;
        case 'חברים':
            return <Image
            style={this.props.big}
            source={require("./../public/images/friends.jpeg")}
        />;
        case 'קרמיקה':
            return <Image
            style={this.props.big}
            source={require("./../public/images/ceramics.jpeg")}
        />;
        case 'תורנות חדר אוכל':
            return <Image
            style={this.props.big}
            source={require("./../public/images/clean.jpeg")}
        />;
        case 'חדר כושר':
            return <Image
            style={this.props.big}
            source={require("./../public/images/gymr.jpeg")}
        />;
        case 'הכנה לבישול':
            return <Image
            style={this.props.big}
            source={require("./../public/images/cooking.jpeg")}
        />;
        case 'הכנה לבריכה':
            return <Image
            style={this.props.big}
            source={require("./../public/images/shower2.jpeg")}
        />;
      
              
        case 'קבוצת משחק':
            return <Image
            style={this.props.big}
            source={require("./../public/images/play.jpeg")}
        />;
        case 'סיכום שבוע':
            return <Image
            style={this.props.big}
            source={require("./../public/images/summary.jpeg")}
        />;
        case 'בית':
            return <Image
            style={this.props.big}
            source={require("./../public/images/house.jpeg")}
        />;
        case 'חוזרים הביתה':
            return <Image
            style={this.props.big}
            source={require("./../public/images/finishDay.jpeg")}
        />;


      default:
        return <Image
        style={this.props.big}
        source={require("./../public/images/stam.jpeg")}
    />;
 
  }
}
}