import React from "react";
import {StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform} from "react-native";
import {AppTextBold} from "./AppTextBold";
import {THEME} from "../../theme";


export const AppButton = ({
                              children, onPress, onLongPress, style,
                              bgColor = THEME.BUTTON_DEFAULT_BGCOLOR,
                              color = THEME.BUTTON_DEFAULT_COLOR,
                              opacity = THEME.BUTTON_OPACITY
                          }) => {
    const Wrapper = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <Wrapper onPress={onPress}
                          onLongPress={onLongPress}
                          activeOpacity={opacity}
            // underlayColor={underlayColor ?? THEME.BUTTON_DEFAULT_UNDERLAY_BGCOLOR}
        >
            <View style={{...styles.button, ...style, backgroundColor: bgColor}}>
                <AppTextBold style={{...styles.text, color: color}}>
                    {children}
                </AppTextBold>
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,

    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})