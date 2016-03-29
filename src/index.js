import React, { Component, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

var BASE_CONTAINER_HEIGHT = 40;

var {
  AppRegistry,
  Text,
  View,
  PanResponder,
  Image
} = React;

export default class SlideDownPanel extends Component {
  constructor(props) {
    super(props);

    const {
      offsetTop, handlerHeight, containerMaximumHeight, containerBackgroundColor,
      containerOpacity, handlerDefaultView, handlerBackgroundColor, handlerOpacity
    } = props;

    this.state = {
      offsetTop: offsetTop != undefined ? offsetTop : BASE_CONTAINER_HEIGHT,
      handlerHeight : handlerHeight != undefined ? handlerHeight: BASE_CONTAINER_HEIGHT,
      containerHeight : handlerHeight != undefined ? handlerHeight: BASE_CONTAINER_HEIGHT,
      containerMinimumHeight : handlerHeight != undefined ? handlerHeight: BASE_CONTAINER_HEIGHT,
      containerMaximumHeight : containerMaximumHeight != undefined ? containerMaximumHeight : height,
      containerBackgroundColor : containerBackgroundColor != undefined ? containerBackgroundColor : 'white',
      containerOpacity : containerOpacity != undefined ? containerOpacity : 1,

      handlerView : handlerDefaultView,

      handlerBackgroundColor : handlerBackgroundColor != undefined ? handlerBackgroundColor : 'white',
      handlerOpacity : handlerOpacity != undefined ? handlerOpacity : 1
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this),
      onPanResponderRelease: this.handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this.handlePanResponderEnd.bind(this),
      onPanResponderStart: this.handlePanResponderStart.bind(this)
    });
  }

  componentDidMount() {
    // Make sure that handlerView is set
    if (this.state.handlerView == undefined) {
      throw "Set a handler view. Hint: It is a React Class."
    }
  }

  render() {
    return (
      <View
        style = {{
          position: 'absolute',
          top: this.state.offsetTop,
          opacity: this.state.containerOpacity,
          height: this.state.containerHeight,
          paddingBottom: this.state.leastContainerHeight,
          backgroundColor : this.state.containerBackgroundColor
        }}
      >
        {this.props.children}
        <View
          style = {{
            height : this.state.handlerHeight,
            width : width,
            justifyContent : 'center',
            opacity : this.state.handlerOpacity,
            backgroundColor : this.state.handlerBackgroundColor}}
          {...this.panResponder.panHandlers}
        >
          {this.state.handlerView}
        </View>
      </View>
    )
  }

  handlePanResponderMove(e, gestureState) {
    const dy = gestureState.dy;
    const y0 = gestureState.y0;
    const negativeY = -dy;

    const positionY = negativeY + this.previousTop;

    // This check is to prevent the handler from moving out of it's boundry
    if (positionY <= -this.state.containerMinimumHeight && positionY >= -this.state.containerMaximumHeight) {
      this.setState({ containerHeight : -positionY });

      // This will call getContainerHeight of parent component.
      if (this.props.getContainerHeight != undefined) {
        this.props.getContainerHeight(this.state.containerHeight);
      }
    }
  }

  handlePanResponderStart(e, gestureState) {
    const dy = gestureState.dy;
    const negativeY = -dy;

    this.previousTop = negativeY - this.state.containerHeight;
  }

  handlePanResponderEnd(e, gestureState) {

    let containerHeight;
    const dy = gestureState.dy;

    if (dy == 0) { // not up or down
      if(this.state.containerHeight == this.state.containerMaximumHeight) {
        containerHeight = this.state.containerMinimumHeight;
      } else {
        containerHeight = this.state.containerMaximumHeight;
      }
    } else if (dy > 0) { // move down
      containerHeight = this.state.containerMaximumHeight;
      this.previousTop += dy;
    } else { // move up
      containerHeight = this.state.containerMinimumHeight;
      this.previousTop = -this.state.containerMinimumHeight;
    }

    this.setState({ containerHeight : containerHeight });
    // This will call getContainerHeight of parent component.
    if (this.props.getContainerHeight != undefined) {
      this.props.getContainerHeight(containerHeight);
    }

  }

}
