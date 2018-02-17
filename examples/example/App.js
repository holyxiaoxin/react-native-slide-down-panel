/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Header, FormLabel, FormInput, Icon } from "react-native-elements";

import SlideDownPanel from "react-native-slide-down-panel";

const { width } = Dimensions.get("window");

var MAXIMUM_HEIGHT = 250;
var HANDLER_HEIGHT = 30;
var OFFSET_TOP = 69;

export default class App extends Component {
  constructor() {
    super();
    this.state = { containerHeight: 100 };
  }

  getContainerHeight(containerHeight) {
    this.setState({
      containerHeight: containerHeight
    });
  }

  render() {
    return (
      <View style>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <SlideDownPanel
          ref="panel"
          offsetTop={OFFSET_TOP}
          initialHeight={0}
          containerMaximumHeight={MAXIMUM_HEIGHT}
          handlerHeight={HANDLER_HEIGHT}
          handlerDefaultView={<Handler />}
          getContainerHeight={this.getContainerHeight.bind(this)}
        >
          <FrontContainer />
        </SlideDownPanel>
      </View>
    );
  }
}

function FrontContainer() {
  return (
    <View style={styles.frontContainer}>
      <FormLabel>Name</FormLabel>
      <FormInput onChangeText={() => console.log("Working")} />
      <FormLabel>Password</FormLabel>
      <FormInput onChangeText={() => console.log("Working")} />
    </View>
  );
}

function Handler() {
  return (
    <View style={styles.handler}>
      <Icon style={styles.icon} name="expand-more" color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  backContainer: {
    marginTop: HANDLER_HEIGHT,
    backgroundColor: "green"
  },
  frontContainer: {
    flex: 1,
    width: width,
    backgroundColor: "papayawhip"
  },
  handler: {
    height: 100,
    marginTop: 100,
    width: width,
    alignItems: "center"
  }
});
