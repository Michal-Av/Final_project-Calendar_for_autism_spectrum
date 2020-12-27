import React, { Component } from "react";

import {
  Text,
  Card,
 } from 'native-base';

import { 
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
 AsyncStorage
} from 'react-native';
import _ from 'lodash';
import ImageTitle from "./../ImageTitle";

const Moment = require('moment');
var moment = require('moment-timezone');
const MomentRange = require('moment-range');
const momento = MomentRange.extendMoment(Moment);

export default class ListWednesday extends Component {
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
    };
    this.newDate=[];
    this.heights=[];
    this.onLayout = this.onLayout.bind(this);

    };
componentDidMount() {
    this.getEvents();
    };
componentWillUnmount() {
    this.getEvents();
};

getEvents = async() => {
  const calendar = await AsyncStorage.getItem('account');
  const key = await AsyncStorage.getItem('key')
  const CALENDAR_ID =calendar;
  const API_KEY = key;
    const beginDate = moment().clone().tz("Asia/Jerusalem").startOf('week').add(3, 'days');
    beginDate.set({hour:0,minute:0,second:0,millisecond:0});
    const finishDate= moment().clone().tz("Asia/Jerusalem").startOf('week').add(4, 'days');
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
renderRow({item, index}) { 
  const now = moment().clone().tz("Asia/Jerusalem");
  const beginDate = moment().clone().tz("Asia/Jerusalem").startOf('week').add(3, 'days');
  beginDate.set({hour:0,minute:0,second:0,millisecond:0});
  const finishDate= moment().clone().tz("Asia/Jerusalem").startOf('week').add(4, 'days');
  finishDate.set({hour:0,minute:0,second:0,millisecond:0});
  const range= momento.range(beginDate, finishDate);

  const start =  moment(item.start.dateTime).clone().tz("Asia/Jerusalem");
  const end = moment(item.end.dateTime).clone().tz("Asia/Jerusalem");
  const range2= momento.range(start, end);

  if (range.contains(now)){
    if (range2.contains(now)){
      return (
        <View style={{flex:1, alignItems: 'flex-end', }} >
        <View style={styles.datesContainer} onLayout={this.onRowLayoutChange.bind(this, index)}>
            <Card style={styles.carditemNow} onLayout={this.onRowLayoutChange.bind(this, index)}>
                <View style={styles.item}>
                    <ImageTitle  big={styles.img} ima={item.summary}></ImageTitle>
                    <Text style={styles.itemtitle}>{item.summary}</Text>
                </View>
                </Card>
        </View>
        </View>
    )
    }
    else
     return (
      <View style={{flex:1, alignItems: 'flex-end', }} >
      <View style={styles.datesContainer} onLayout={this.onRowLayoutChange.bind(this, index)}>
          <Card style={styles.cardNow} onLayout={this.onRowLayoutChange.bind(this, index)}>
              <View style={styles.item}>
                  <ImageTitle  big={styles.img} ima={item.summary}></ImageTitle>
                  <Text style={styles.itemtitle}>{item.summary}</Text>
              </View>
              </Card>
      </View>
      </View>
  )
  }
  else
  return (
      <View style={{flex:1, alignItems: 'flex-end', }} >
      <View style={styles.datesContainer} onLayout={this.onRowLayoutChange.bind(this, index)}>
          <Card style={styles.card} onLayout={this.onRowLayoutChange.bind(this, index)}>
              <View style={styles.item}>
                  <ImageTitle  big={styles.img} ima={item.summary}></ImageTitle>
                  <Text style={styles.itemtitle}>{item.summary}</Text>
              </View>
              </Card>
      </View>
      </View>
  )
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

render()     
    {
    return (
  
    <View >
        <FlatList
        ref={(c) => this.list = c}
        data={this.state.dataSource}
        renderItem={this.renderRow.bind(this)}
        ListFooterComponent={this.renderFooter}
        onScroll={this.onScroll.bind(this)}
        keyExtractor={(item, index) => String(index)}
        scrollEnabled={false}
        />
        <View style={styles.cardE} />
    </View>
                
    )

  }
}

const styles = StyleSheet.create({

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
      fontSize: 10,
      color: 'white',
      flex: 1,  justifyContent: 'center', alignItems: 'center'
  },
  itemtitleNow: {
    fontSize: 16,
    color: 'white',
    fontWeight: "bold",
    flex: 1,  justifyContent: 'center', alignItems: 'center'
},
  card: {
    backgroundColor: "#174CAD",
    width: 120,
    height: 75,
    marginBottom: 15,
    borderRadius: 7,
    alignItems: "center"
  },
  cardE: {
    backgroundColor: "#B9CDF0",
    width: 120,
    height: 75,
    marginBottom: 15,
    alignItems: "center",
  },
  cardNow: {
    backgroundColor: "#ED5D1A",
    width: 120,
    height: 75,
    marginBottom: 15,
    borderRadius: 7,
    alignItems: "center"
  },
  carditemNow: {
    backgroundColor: "#FFCB5B",
    width: 120,
    height: 75,
    marginBottom: 15,
    borderRadius: 7,
    alignItems: "center"
  },
  img: {
    paddingTop:1,
    width: 55,
    height: 55,
    alignItems: "center"
  },
})
