import React from "react";
import {View, Text, StyleSheet} from "react-native";

export const Navbar = (props) => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.navbarText}>{ props.title }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 10,
        backgroundColor: 'rgb(49, 89, 150)'
    },
    navbarText: {
        fontSize: 20,
        color: 'white'

    }
})