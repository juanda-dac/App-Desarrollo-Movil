import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors } from '@/core/constants/Colors';

interface Props {
    children: React.ReactNode;
    style?: object;
}

export default function LeftIcon({ children, style }:Props) {
    return (
        <View style={{ ...styles.leftIcon, ...style }}>
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    leftIcon: {
        position: 'absolute',
        left: 10,
        top: 8,
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: Colors.tertiary,
    }
});