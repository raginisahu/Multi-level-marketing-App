import React from 'react';
import { View, StatusBar, Platform, StyleSheet } from 'react-native';


const GeneralStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT
    }
});


export default GeneralStatusBar;