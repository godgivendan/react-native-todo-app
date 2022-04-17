import React from "react";
import {View, StyleSheet, TextInput, Alert, Keyboard, Platform} from "react-native";
import {AppButton} from "./ui/AppButton";
import {AntDesign} from "@expo/vector-icons";
import {THEME} from "../theme";

export const AddTodo = ({btnTitle = 'Добавить', onOpenForm, inputPlaceholder, onSubmit, errMessage}) => {
    const [value, setValue] = React.useState('');
    const pressHandler = (kbhide = true) => {
        if (value.trim()) {
            if (onSubmit) {
                onSubmit(value.trim(), '');
                if (kbhide) {
                    Keyboard.dismiss();
                }
            } else {
                console.log(value);
            }
            setValue('');
        } else {
            Alert.alert("Ошибка в Todo App!", errMessage ?? "Неверно заполнено наименование задачи!");
        }
    }
    return (
        <View style={styles.addBlock}>
            <TextInput
                style={styles.input}
                onChangeText={value => setValue(value)}
                value={value}
                placeholder={inputPlaceholder ?? 'Введите задачу...'}
                AutoCorrect={false}
                autoCapitalize='sentences'
                autoFocus={false}
                blurOnSubmit={false}
                keyboardType='default'
                clearButtonMode='always'
                onSubmitEditing={(evt) => {
                    // console.log(evt.nativeEvent.text.trim());
                    setValue(evt.nativeEvent.text.trim());
                    pressHandler(Platform.OS === "ios");
                }}
            />
            {/*<AntDesign.Button onPress={pressHandler}*/}
            {/*                  onLongPress={() => onOpenForm(value, '')}*/}
            {/*                  name="pluscircleo"*/}
            {/*                  color={THEME.BUTTON_DEFAULT_COLOR}*/}
            {/*                  style={styles.btn}*/}
            {/*>*/}
            {/*    {btnTitle??"Добавить"}*/}
            {/*</AntDesign.Button>*/}
            <AppButton onPress={() => pressHandler(true)}
                       onLongPress={() => onOpenForm(value, '')}
                       style={styles.btn}
            >
                <AntDesign name="pluscircleo" size={20} style={{paddingEnd: 5}}/>
                {/*{btnTitle}*/}
            </AppButton>
        </View>
    )
}

const styles = StyleSheet.create({
    addBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15
    },
    input: {
        height: 44,
        width: '80%',
        borderStyle: 'solid',
        borderColor: THEME.TODO_BCOLOR,
        borderRadius: 10,
        borderWidth: 2,
        padding: 10
    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10
    }
})