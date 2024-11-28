import { View, StyleSheet } from "react-native";
import React from "react";

interface Props {
    children: React.ReactNode;
    style?: object;
}

export default function InputWrapper({children, style}: Props){
    return (
        <View style={{ ...styles.inputWrapper, ...style }}>
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    inputWrapper:{
        width: '100%',
    }
})