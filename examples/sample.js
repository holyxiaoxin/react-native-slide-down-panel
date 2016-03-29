import React, { Component,
  Dimensions,
  Animated,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';
import SlideDownPanel from 'react-native-slide-down-panel';
const { width, height } = Dimensions.get('window');

var MAXIMUM_HEIGHT = height - 200;
var HANDLER_HEIGHT = 40;
var OFFSET_TOP = 100;

export default class SampleApp extends Component {
  constructor() {
    super();
    this.state = { containerHeight : 0 };
  }

  getContainerHeight(containerHeight) {
    this.setState({
      containerHeight : containerHeight
    });
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <View style={styles.backContainer}>
          <Text style={styles.logText}>Panel Height: {this.state.containerHeight}</Text>
        </View>
        <SlideDownPanel
            ref="panel"
            offsetTop={OFFSET_TOP}
            containerMaximumHeight={MAXIMUM_HEIGHT}
            containerBackgroundColor="green"
            handlerHeight={HANDLER_HEIGHT}
            handlerDefaultView={<HandlerOne/>}
            getContainerHeight={this.getContainerHeight.bind(this)}>
          <View style={styles.frontContainer}>
            <Text style={styles.panelText}>Hello guys!</Text>
          </View>
        </SlideDownPanel>
      </View>
    )
  }
}

var HandlerOne = React.createClass({
  render: function() {
    return (
      <Image style={styles.image} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Cloud_banner.jpg'}}>
        <View style={styles.textContainer}>
          <Text style={styles.handlerText}>Another Sample Text</Text>
        </View>
      </Image>
    );
  }
});

var HandlerTwo = React.createClass({
  render: function() {
    return (
      <TouchableHighlight style={styles.button} underlayColor='transparent' onPress={this.onPress}>
        <Text style={styles.handlerText}>Tap me!</Text>
      </TouchableHighlight>
    );
  },

  onPress: function() {
    AlertIOS.alert('Event Happened', 'You just tapped the button!', [{text: 'OK'}]);
  }
});

var styles = StyleSheet.create({
  parentContainer: {
    flex : 1,
    paddingTop: 60
  },

  backContainer: {
    flex : 1,
    backgroundColor : 'blue'
  },

  frontContainer: {
    flex : 1,
  },

  logText: {
    color : 'white',
    fontWeight: '700',
  },

  panelText: {
    color : 'white',
  },

  image: {
    height : HANDLER_HEIGHT,
    width: width,
    alignItems: 'center',
    backgroundColor : 'gray'
  },

  textContainer: {
    backgroundColor : 'transparent',
    height : HANDLER_HEIGHT,
    justifyContent : 'center'
  },

  handlerText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },

  button: {
    backgroundColor : 'black',
    justifyContent : 'center',
    alignSelf : 'center',
    padding: 5
  }

});
