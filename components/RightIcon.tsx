import React from "react";
import { View, StyleSheet } from "react-native";

interface Props {
    children: React.ReactNode;
    style?: object;
}

export default function RightIcon({ children, style }:Props) {

    return (
        <View style={{ ...styles.rightIcon, ...style }}>
            { children }
        </View>
    )

}

const styles = StyleSheet.create({
    rightIcon: {
        position: 'absolute',
        right: 10,
        top: 8,
        paddingLeft: 10,
        borderLeftWidth: 1,
        borderLeftColor: '#BDBDBD',
    }
});