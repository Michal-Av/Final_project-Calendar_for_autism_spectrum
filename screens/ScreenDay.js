import React, { Component } from 'react';

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
  FlatList,
  Dimensions,
  ActivityIndicator,
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Platform,
  Image,
  Alert,
  AsyncStorage
} from 'react-native';
import _ from 'lodash';

import ImageTitle from "../components/ImageTitle";
import TextDay from "../components/TitleDay";
import CardCheck from "../components/CardCheck";
import Timer from '../components/Timer';

const Moment = require('moment');
var moment = require('moment-timezone');
const MomentRange = require('moment-range');
const momento = MomentRange.extendMoment(Moment);
console.disableYellowBox = true;

export default class ScreenDay extends Component {
  constructor(props) {
    super(props)
    let date = moment().clone().tz("Asia/Jerusalem").format('MMMM');
    const windowSize = Dimensions.get('window');
    this.viewHeight = windowSize.height;
    this.state = {
        dataSource: [],
        pageToken: '',
        loading: false,
        scrollPosition: 0,
        selectedDay: moment().clone().tz("Asia/Jerusalem"),
        month: date = date[0].toUpperCase() + date.substr(1),
        error: null,
        refreshing: false,
        yesNo: true,
        calendar:null,
        key: null
    };
    this.newDate=[];
    this.heights=[];
    this.onLayout = this.onLayout.bind(this);

    };
async componentDidMount() {
    const Mycalendar = await AsyncStorage.getItem('account');
    const Mykey = await AsyncStorage.getItem('key')
    this.setState({calendar: Mycalendar, key:Mykey});
    this.getEvents();
    };
componentWillUnmount() {
    this.getEvents();
};

getEvents = () => {
    const CALENDAR_ID =this.state.calendar;
    const API_KEY =this.state.key;
    
    const beginDate = moment().clone().tz("Asia/Jerusalem");
    beginDate.set({hour:0,minute:0,second:0,millisecond:0});
    const finishDate= moment().clone().tz("Asia/Jerusalem").add(1, 'days');
    finishDate.set({hour:0,minute:0,second:0,millisecond:0});
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${beginDate.toISOString()}&timeMax=${finishDate.toISOString()}&maxResults=50&singleEvents=true&orderBy=startTime&pageToken=${this.state.pageToken}`;

    this.setState({ loading: true });
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
            this.setState({
                pageToken: responseJson.nextPageToken,
                dataSource: [...this.state.dataSource, ...responseJson.items],
                loading: false,
                refreshing: false,
                error: responseJson.error || null,
            });
        })
        .then(() => {
            this.getDates()
        }) 
        .catch(error => {
            this.setState({ error, loading: false, refreshing: false });

        });
};

handleLoadMore = () => {
    this.setState(
        {
            pageToken: this.state.pageToken,
            refreshing: true
        },
        () => {
            this.getEvents()
        }
    )
};
getDates() {
    let tempDate = '';
    tempDate = _.map(this.state.dataSource, 'start.dateTime');
    this.newDate.length = 0;
    for (let j in tempDate) {
    
        this.newDate.push(
            tempDate[j]   
        );
    }
    this.newDate = this.newDate.map((v, i, a) => (a[i - 1] || '').slice(0, 10) !== v.slice(0, 10) && v);
   
};
renderDate(item) {
    const date = item.start.dateTime;
    const eventdate = moment(item.start.dateTime).clone().tz("Asia/Jerusalem");
    const today = (moment().clone()
    .tz("Asia/Jerusalem") == eventdate) ? styles.today : undefined;
    const checkDate = moment(item.start.dateTime).clone()
    .tz("Asia/Jerusalem").format('YYYY-MM-DD');
};
finish = (flag=true) => {
    this.setState({ yesNo: flag });
}

renderRow({item, index}) { 
    const now = moment().clone().tz("Asia/Jerusalem");
    const start =  moment(item.start.dateTime).clone().tz("Asia/Jerusalem");
    const end = moment(item.end.dateTime).clone().tz("Asia/Jerusalem");
    const range= momento.range(start, end);

    const before= moment().clone().tz("Asia/Jerusalem").subtract(0.75,'hour');
    const range2= momento.range(before, now);

    const after=  moment().clone().tz("Asia/Jerusalem").add(1,'day');
    after.set({hour:0,minute:0,second:0,millisecond:0});
    const range3= momento.range(now, after);

     if (range2.contains(end)){
        return (
            <View style={{flex:1, flexDirection: 'column', alignItems: 'center',}} >
                <View  style={{flex:1, flexDirection: 'row', }}>
                <Card style={styles.card} onLayout={this.onRowLayoutChange.bind(this, index)}>
                    {this.renderDate(item)}
                    <View style={styles.item}>
                        <View style={{position: 'absolute',top: 3, bottom: 0, left: 0, right: 0,}}>
                        <ImageTitle resizeMode = 'cover'  big={styles.img} ima={item.summary}></ImageTitle>
                        </View>
                        <View  >
                        
                        <Image
                            style={styles.imgC}
                            source={this.state.yesNo ? require("../public/images/v.png") : require("../public/images/x.png")}
                        />
                        </View>
                        <Text style={styles.itemtitle}>{item.summary}</Text>
                        {/* 
                            <Image source={icon} /> */}

                    </View>
                    </Card>
                
                <Image
                style={styles.icon}
                source={require("../public/icons/double-arrow.png")}
                />
                <Card style={styles.card} />
                
                </View>
                </View>  
            );
                }
    if (range.contains(now)){
        var full=end.diff(start);
        var past= now.diff(start, 'seconds');
        var will=end.diff(now, 'seconds');
        var preFull=(past/(past+will))*100;
        var preEmpty=(will/(past+will))*100;

        return (
            <View style={{flex:1, flexDirection: 'column', alignItems: 'center',}} >
                
                <View  style={{flex:1, flexDirection: 'row', }}>
                    <Card style={styles.cardNow} >
                        <CardCheck onClick={this.press} style={styles.cardNow} item={item} nav={this.props.navigation} sum={item.summary} end={item.end}  func={this.renderRow} />
                    </Card>
                    <Timer head={preFull} back={will} full={full} formatMessage={this.handleLoadMore} nav={this.props.navigation} sum={item.summary} func={this.finish}></Timer>
        
                    <Card style={styles.cardNow} ima={item.summary} onLayout={this.onRowLayoutChange.bind(this, index)}>
                        {this.renderDate(item)}
                        <View style={styles.item}>
                            <ImageTitle big={styles.imgNow} ima={item.summary} ></ImageTitle>
                            <Text style={styles.itemtitleNow}>{item.summary}</Text>
                        </View>
                        </Card>
                </View>
                
            </View>
        )
    }

    if (range3.contains(start))
    return (
        <View style={{flex:1, flexDirection: 'column', alignItems: 'center',}} >
            <View  style={{flex:1, flexDirection: 'row', }}>
            <Card style={styles.card} />
            <Image
            style={styles.icon}
            source={require("../public/icons/double-arrow.png")}
            />
        
            <Card style={styles.card} onLayout={this.onRowLayoutChange.bind(this, index)}>
                {this.renderDate(item)}
                <View style={styles.item}>
                    <ImageTitle  big={styles.img} ima={item.summary}></ImageTitle>
                    <Text style={styles.itemtitle}>{item.summary}</Text>
                </View>
                </Card>
            </View>
            </View>  
        );
}  
   

onScroll(event) {
    const yOffset = event.nativeEvent.contentOffset.y;
    let topRowOffset = 0;
    let topRow;
    for (topRow = 0; topRow < this.heights.length; topRow++) {
        if (topRowOffset + this.heights[topRow] / 2 >= yOffset) {
          break;
        }
        topRowOffset += this.heights[topRow];
    }
    const row = this.state.dataSource[topRow];
    if (!row) return;
    const month = moment(row.start.dateTime).clone()
    .tz("Asia/Jerusalem").format('MMMM');
    this.setState({ month: month[0].toUpperCase() + month.substr(1) });
};
onLayout(event) {
    this.viewHeight = event.nativeEvent.layout.height;
};
onRowLayoutChange(ind, event) {
    this.heights[ind] = event.nativeEvent.layout.height;
};
renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
};
render() {
    var { navigate } = this.props.navigation;
    return (
        <Container>
            <Header iosBarStyle="dark-content" style={{backgroundColor:'#B9CDF0',height:64,color:'black'}}>
          
                <Left style={{flex:1}}>
                    <Button transparent onPress={() => {}} style={{paddingLeft:5,paddingBottom:3}}>
                    <Icon name="ios-arrow-dropleft" style={{fontSize:35,color: '#B9CDF0',paddingTop:2}}/>
                    </Button>
                </Left>
                <Body style={{flex:1, flexDirection: 'column'}}>
                    <View style={{flex:1, alignItems:'center'}}>
                        <Text style={{fontSize: 14}}>{"  "}</Text>
                        <View style={{flex:1,  flexDirection: 'row'}}>
                            <Text style={{fontSize: 25}}>{"            "}</Text>
                                <TextDay></TextDay> 
                        </View>
                    </View>
                </Body>
                <Right style={{flex:1}}>
                    <Button transparent onPress={() => navigate("Week", {})} style={{paddingBottom:3}}>
                        <Icon name="ios-arrow-dropright" style={{fontSize:35,color: 'black',paddingTop:2}}/>
                    </Button>
                </Right>
            </Header>
            <View style={styles.container}>
            <View style={{backgroundColor:"#B9CDF0",flexDirection: 'row', justifyContent: 'center',}}>
                <Text style={{fontSize: 20,fontWeight: "bold", color: "black"}}>סיימתי! </Text>
                <Text>{"                                                                               "}</Text>
                <Text style={{fontSize: 20,fontWeight: "bold", color: "black"}}>מה לעשות? </Text>
            </View>
           <Content style={{backgroundColor:"#B9CDF0"}} contentContainerStyle={{flex:1}} scrollsToTop={true}>
                <View style={{flex: 1, overflow: 'hidden',backgroundColor:"#B9CDF0",...Platform.select({ios: {marginTop: 0}})}}>
                    <View style={styles.reservations}>
                        <FlatList
                            ref={(c) => this.list = c}
                            data={this.state.dataSource}
                            renderItem={this.renderRow.bind(this)}
                            ListFooterComponent={this.renderFooter}
                            onScroll={this.onScroll.bind(this)}
                            keyExtractor={(item, index) => String(index)}
                            refreshing={this.state.refreshing}
                            onEndReached={this.handleLoadMore}
                            onEndReachedThreshold={100}
                        />
                    </View>
                </View>
            </Content>
            </View>
        </Container>
    )
}

};

const styles = StyleSheet.create({

  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent',
  },
  title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 20,
  },
  item: {
    paddingTop: 3,
    flex: 1,
    justifyContent: "center"     
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 18,
    marginRight: 20,
    marginLeft: 20
  },
  itemtitle: {
      fontSize: 14,
      color: 'white',
      flex: 1,  justifyContent: 'center', alignItems: 'center'
  },
  itemtitleNow: {
    fontSize: 16,
    color: 'white',
    fontWeight: "bold",
    flex: 1,  justifyContent: 'center', alignItems: 'center'
},
  reservations: {
      flex: 1,
      backgroundColor: "#B9CDF0"
  },
  today: {
      color: '#00adf5'
  },
  card: {
    backgroundColor: "#174CAD",
    width: 270,
    height: 120,
    marginBottom: 15,
    borderRadius: 15,
    alignItems: "center"
  },
  cardNow: {
    backgroundColor: "#ED5D1A",
    width: 270,
    height: 150,
    marginBottom: 15,
    borderRadius: 15,
    alignItems: "center"
  },
  img: {
    paddingTop:2,
    width: 98,
    height: 98,
    alignItems: "center"
  },
  imgC: {
    paddingTop:2,
    width: 94,
    height: 94,
    alignItems: "center"
  },
  imgNow: {
    marginTop: 1,
    width: 125,
    height: 125,
    alignItems: "center"
  }
})
