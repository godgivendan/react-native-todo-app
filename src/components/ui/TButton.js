import React from "react";
import {View, StyleSheet, TouchableHighlight} from "react-native";
import {THEME} from "../../theme";
import {AppText} from "./AppText";

export const TButton = ({btnTitle, onSubmit, onLongPress, bgColor, underlayColor, textColor, activeOpacity, btnStyles}) => {
    const pressHandler = () => {
        if (onSubmit) {
            onSubmit();
        } else {
            console.log('btn clicked');
        }
    }

    return (
        <View>
            <TouchableHighlight
                style={[styles.btn, btnStyles, {backgroundColor: bgColor ?? THEME.BUTTON_DEFAULT_BGCOLOR}]}
                onPress={pressHandler}
                onLongPress={onLongPress}
                activeOpacity={activeOpacity ?? THEME.BUTTON_OPACITY}
                underlayColor={underlayColor ?? THEME.BUTTON_DEFAULT_UNDERLAY_BGCOLOR}
            >
                <AppText
                    style={{...styles.btnText, ...{color: textColor ?? THEME.BUTTON_DEFAULT_COLOR}}}>{btnTitle ?? 'Добавить'}</AppText>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: THEME.BUTTON_DEFAULT_BGCOLOR,
    },
    btnText: {
        color: THEME.BUTTON_DEFAULT_COLOR
    }
})

