import React from "react";
import {StyleSheet, View} from "react-native";
import {THEME} from "../../theme";

export const AppCard = props => (
    <View style={{...styles.default, ...props.style}}>{props.children}</View>
)

const styles = StyleSheet.create({
    default: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: THEME.TODO_BGCOLOR,
        shadowColor: THEME.TODO_SHADOW_COLOR,
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {width: 2, height: 2},
        elevation: 8,
        borderRadius: 10

    }
})