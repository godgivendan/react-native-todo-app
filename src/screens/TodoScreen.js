import React, {useContext, useState} from "react";
import {StyleSheet, View, Dimensions} from "react-native";
import {THEME} from "../theme"
import {AppCard} from "../components/ui/AppCard";
import {EditModal} from "../components/EditModal";
import {AppTextBold} from "../components/ui/AppTextBold";
import {AppText} from "../components/ui/AppText";
import {AppButton} from "../components/ui/AppButton";
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import {TodoContext} from "../context/todo/todoContext";
import {ScreenContext} from "../context/screen/screenContext";

export const TodoScreen = () => {
    const {todos, updateTodo, removeTodo} = useContext(TodoContext);
    const {todoId, changeScreen} = useContext(ScreenContext)
    const [modal, setModal] = useState(false);
    const todo = todos.find(t => t.id === todoId);

    const saveHandler = async (title, description) => {
        await updateTodo(todo.id, title, description);
        setModal(false);
    }
    return (
        <View>
            <EditModal value={todo.title} description={todo.description} visible={modal} onCancel={setModal}
                       onSave={saveHandler}/>
            <AppCard style={styles.card}>
                <View>
                    <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                    <AppText style={styles.desc}>{todo.description}</AppText>
                </View>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name="edit" size={20}/>
                </AppButton>
            </AppCard>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton bgColor={THEME.BUTTON_GRAY_BGCOLOR}
                               сolor={THEME.BUTTON_GRAY_COLOR}
                               onPress={() => changeScreen(null)}
                    >
                        <AntDesign name="back" size={16} />
                        {" "+"Назад"}
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton bgColor={THEME.BUTTON_DANGER_BGCOLOR}
                               color={THEME.BUTTON_DANGER_COLOR}
                               onPress={() => removeTodo(todo.id)}
                    >
                        <AntDesign name="delete" size={16} />
                        {" "+"Удалить"}
                    </AppButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        // width: '40%'
        // width: Dimensions.get('window').width / 3
        width: Dimensions.get('window').width > 400 ? 170 : 130
    },
    title: {
        fontSize: 18,
        color: THEME.TODO_COLOR,
        marginBottom: 10
    },
    desc: {
        fontSize: 13,
        color: THEME.TODO_DESC_COLOR
    },
    card: {
        marginBottom: 10,
        padding: 15
    }
})