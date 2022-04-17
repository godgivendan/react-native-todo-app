import React from "react";
import {View, StyleSheet, Platform} from "react-native";
import {THEME} from "../theme";
import {AppTextBold} from "./ui/AppTextBold";

export const Navbar = (props) => {
    return (
        <View
            style={{
                ...styles.navbar,
                ...Platform.select({
                    ios: styles.navbarIOS,
                    android: styles.navbarAndroid
                })
            }}
        >
            <AppTextBold style={styles.navbarText}>{props.title}</AppTextBold>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: THEME.MAIN_BGCOLOR,
        shadowColor: THEME.TODO_SHADOW_COLOR,
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {width: 2, height: 2},
    },
    navbarAndroid: {
        height: 70,
        paddingBottom: 10,
        backgroundColor: THEME.MAIN_BGCOLOR
    },
    navbarIOS: {
        height: 70,
        paddingBottom: 5,
        backgroundColor: THEME.MAIN_COLOR,
        borderBottomWidth: 1,
        borderBottomColor: THEME.MAIN_BGCOLOR
    },
    navbarText: {
        fontSize: Platform.OS === "android" ? 20 : 18,
        color: Platform.OS === "android" ? THEME.MAIN_COLOR : THEME.MAIN_BGCOLOR

    }
})