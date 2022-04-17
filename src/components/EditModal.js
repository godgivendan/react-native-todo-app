import React, {useState} from "react";
import {View, TextInput, Modal, StyleSheet, Alert, KeyboardAvoidingView} from "react-native";
import {THEME} from "../theme";
import {AppTextBold} from "./ui/AppTextBold";
import {AppButton} from "./ui/AppButton";
import {AntDesign, FontAwesome} from "@expo/vector-icons";

export const EditModal = ({value, description, visible, onCancel, onSave, wndTitle}) => {
    const [title, setTitle] = useState(value)
    const [desc, setDesc] = useState(description)
    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Ошибка!',
                `Минимальная длина наименования задачи 3 символа. Сейчас ${title.trim().length} символов.`);
        } else if (desc.trim().length < 3) {
            Alert.alert('Ошибка!',
                `Минимальная длина описания задачи 3 символа. Сейчас ${desc.trim().length} символов.`);
        } else {
            onSave(title, desc);
        }
    }

    return (
        <Modal visible={visible}
               animationType='slide'
               transparent={false}
        >
            <KeyboardAvoidingView style={styles.wrap}>
                <AppTextBold style={styles.title}>{wndTitle ?? 'Редактирование задачи'}</AppTextBold>
                <TextInput style={styles.input}
                           placeholder={'Введите наименование задачи'}
                           value={title}
                           onChangeText={setTitle}
                           autoFocus={true}
                />
                <TextInput style={[styles.input, styles.ta]}
                           placeholder={'Введите описание задачи'}
                           multiline={true}
                           numberOfLines={4}
                           value={desc}
                           onChangeText={setDesc}
                />
                <View style={styles.btnBar}>
                    <AppButton bgColor={THEME.BUTTON_GRAY_BGCOLOR}
                               color={THEME.BUTTON_GRAY_COLOR}
                               onPress={() => onCancel(false)}
                    >
                        <FontAwesome name="remove" size={16}/>
                        {' ' + 'Отменить'}
                    </AppButton>
                    <AppButton onPress={saveHandler}>
                        <AntDesign name="save" size={16}/>
                        {' ' + 'Сохранить'}
                    </AppButton>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        paddingBottom: 20,
        fontSize: 18,
        fontWeight: '500'
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 2,
        borderColor: THEME.TODO_BCOLOR,
        borderRadius: 20,
        marginBottom: 20,
        fontSize: 18,
        color: THEME.TODO_COLOR
    },
    ta: {
        height: 100,
        fontSize: 13,
        color: THEME.TODO_DESC_COLOR
    },
    btnBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'

    }
})