import React from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {THEME} from "../theme";
import {AppText} from "./ui/AppText";

export const Todo = ({todo, onRemove, onOpen}) => {
    const limit = 30;
    const cutDescription = (desc) => {
        let str = desc;
        let add = '';
        if (todo.description.split(/\r?\n/).length > 1) {
            str = todo.description.split(/\r?\n/)[0];
            add = '...';
        }
        if (str.length > limit) {
            str = str.substring(0, limit);
            add = '...'
        }
        return str+add;
    }

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onOpen(todo.id)}
            onLongPress={onRemove.bind(null, todo.id)}
        >
            <View style={styles.todo}>
                <AppText style={styles.todoText}>{todo.title}</AppText>
                {todo.description ?
                    <AppText style={styles.todoDesc}>
                        { cutDescription(todo.description) }
                    </AppText> :
                    null}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'column',
        alignItems: 'stretch',
        borderWidth: 2,
        borderColor: THEME.TODO_BCOLOR,
        borderRadius: 10,
        padding: 10,
        backgroundColor: THEME.TODO_BGCOLOR,
        marginBottom: 10
    },
    todoText: {
        color: THEME.TODO_COLOR
    },
    todoDesc: {
        fontSize: 13,
        color: THEME.TODO_DESC_COLOR
    }
})