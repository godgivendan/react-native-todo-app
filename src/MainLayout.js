import React, {useContext} from "react";
import {Navbar} from "./components/Navbar";
import {StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";

import {THEME} from "./theme";
import {MainScreen} from "./screens/MainScreen";
import {TodoScreen} from "./screens/TodoScreen";
import {ScreenContext} from "./context/screen/screenContext";

export const MainLayout = () => {
    const {todoId} = useContext(ScreenContext)

    return (
        <View style={styles.container}>
            <Navbar title="Todo App!"/>
            <View style={styles.content}>
                {todoId ? <TodoScreen/> : <MainScreen/>}
            </View>
            <StatusBar style="auto"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#000',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    content: {
        height: '80%',
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20
    }
});