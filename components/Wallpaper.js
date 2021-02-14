import React, {Component} from 'react';

import {StyleSheet, Image} from 'react-native';

var bgSrc = require('../images/wallpaper.png');

export default class Wallpaper extends Component {
  render() {
    return (
      <Image style={styles.picture} source={bgSrc}>
        {this.props.children}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});