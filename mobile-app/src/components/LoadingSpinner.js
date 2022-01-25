import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const OverlaySpinner = () => {
    return (
        <View style={styles.spinnerView}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerView: {
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5FCFF88",
    },
})

export default OverlaySpinner;

