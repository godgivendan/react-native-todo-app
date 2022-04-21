import React from "react";
import {StyleSheet, View, ActivityIndicator} from "react-native";
import {THEME} from "../../theme";
import {Navbar} from "../Navbar";

export const AppLoader = () => (
    <View style={styles.center}>
        <Navbar />
        <ActivityIndicator size="large" color={THEME.MAIN_BGCOLOR}/>
    </View>
)

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})