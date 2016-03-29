'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Dimensions$get = _reactNative.Dimensions.get('window');

var width = _Dimensions$get.width;
var height = _Dimensions$get.height;


var BASE_CONTAINER_HEIGHT = 40;

var AppRegistry = _reactNative2.default.AppRegistry;
var Text = _reactNative2.default.Text;
var View = _reactNative2.default.View;
var PanResponder = _reactNative2.default.PanResponder;
var Image = _reactNative2.default.Image;

var SlideDownPanel = function (_Component) {
  _inherits(SlideDownPanel, _Component);

  function SlideDownPanel(props) {
    _classCallCheck(this, SlideDownPanel);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SlideDownPanel).call(this, props));

    var offsetTop = props.offsetTop;
    var handlerHeight = props.handlerHeight;
    var containerMaximumHeight = props.containerMaximumHeight;
    var containerBackgroundColor = props.containerBackgroundColor;
    var containerOpacity = props.containerOpacity;
    var handlerDefaultView = props.handlerDefaultView;
    var handlerBackgroundColor = props.handlerBackgroundColor;
    var handlerOpacity = props.handlerOpacity;


    _this.state = {
      offsetTop: offsetTop != undefined ? offsetTop : BASE_CONTAINER_HEIGHT,
      handlerHeight: handlerHeight != undefined ? handlerHeight : BASE_CONTAINER_HEIGHT,
      containerHeight: handlerHeight != undefined ? handlerHeight : BASE_CONTAINER_HEIGHT,
      containerMinimumHeight: handlerHeight != undefined ? handlerHeight : BASE_CONTAINER_HEIGHT,
      containerMaximumHeight: containerMaximumHeight != undefined ? containerMaximumHeight : height,
      containerBackgroundColor: containerBackgroundColor != undefined ? containerBackgroundColor : 'white',
      containerOpacity: containerOpacity != undefined ? containerOpacity : 1,

      handlerView: handlerDefaultView,

      handlerBackgroundColor: handlerBackgroundColor != undefined ? handlerBackgroundColor : 'white',
      handlerOpacity: handlerOpacity != undefined ? handlerOpacity : 1
    };
    return _this;
  }

  _createClass(SlideDownPanel, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
          return true;
        },
        onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
          return true;
        },
        onPanResponderMove: this.handlePanResponderMove.bind(this),
        onPanResponderRelease: this.handlePanResponderEnd.bind(this),
        onPanResponderTerminate: this.handlePanResponderEnd.bind(this),
        onPanResponderStart: this.handlePanResponderStart.bind(this)
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Make sure that handlerView is set
      if (this.state.handlerView == undefined) {
        throw "Set a handler view. Hint: It is a React Class.";
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _reactNative2.default.createElement(
        View,
        {
          style: {
            position: 'absolute',
            top: this.state.offsetTop,
            opacity: this.state.containerOpacity,
            height: this.state.containerHeight,
            paddingBottom: this.state.leastContainerHeight,
            backgroundColor: this.state.containerBackgroundColor
          }
        },
        this.props.children,
        _reactNative2.default.createElement(
          View,
          _extends({
            style: {
              height: this.state.handlerHeight,
              width: width,
              justifyContent: 'center',
              opacity: this.state.handlerOpacity,
              backgroundColor: this.state.handlerBackgroundColor }
          }, this.panResponder.panHandlers),
          this.state.handlerView
        )
      );
    }
  }, {
    key: 'handlePanResponderMove',
    value: function handlePanResponderMove(e, gestureState) {
      var dy = gestureState.dy;
      var y0 = gestureState.y0;
      var negativeY = -dy;

      var positionY = negativeY + this.previousTop;

      // This check is to prevent the handler from moving out of it's boundry
      if (positionY <= -this.state.containerMinimumHeight && positionY >= -this.state.containerMaximumHeight) {
        this.setState({ containerHeight: -positionY });

        // This will call getContainerHeight of parent component.
        if (this.props.getContainerHeight != undefined) {
          this.props.getContainerHeight(this.state.containerHeight);
        }
      }
    }
  }, {
    key: 'handlePanResponderStart',
    value: function handlePanResponderStart(e, gestureState) {
      var dy = gestureState.dy;
      var negativeY = -dy;

      this.previousTop = negativeY - this.state.containerHeight;
    }
  }, {
    key: 'handlePanResponderEnd',
    value: function handlePanResponderEnd(e, gestureState) {

      var containerHeight = void 0;
      var dy = gestureState.dy;

      if (dy == 0) {
        // not up or down
        if (this.state.containerHeight == this.state.containerMaximumHeight) {
          containerHeight = this.state.containerMinimumHeight;
        } else {
          containerHeight = this.state.containerMaximumHeight;
        }
      } else if (dy > 0) {
        // move down
        containerHeight = this.state.containerMaximumHeight;
        this.previousTop += dy;
      } else {
        // move up
        containerHeight = this.state.containerMinimumHeight;
        this.previousTop = -this.state.containerMinimumHeight;
      }

      this.setState({ containerHeight: containerHeight });
      // This will call getContainerHeight of parent component.
      if (this.props.getContainerHeight != undefined) {
        this.props.getContainerHeight(containerHeight);
      }
    }
  }]);

  return SlideDownPanel;
}(_reactNative.Component);

exports.default = SlideDownPanel;