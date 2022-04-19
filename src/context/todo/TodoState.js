import React, {useContext, useReducer} from "react";
import {TodoContext} from "./todoContext";
import {todoReducer} from "./todoReducer";
import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from "../types";
import {ScreenContext} from "../screen/screenContext";
import {Alert} from "react-native";

export const TodoState = ({children}) => {
    const initialState = {
        todos: [
            {id: '1', title: 'Work with React Native', description: ''},
            {id: '2', title: 'Make Todo App', description: ''},
        ]
    }
    const [state, dispatch] = useReducer(todoReducer, initialState)
    const {changeScreen} = useContext(ScreenContext)

    const addTodo = (title, description) => dispatch({
        type: ADD_TODO,
        title,
        description
    })
    const updateTodo = (id, title, description) => dispatch({
        type: UPDATE_TODO,
        id,
        title,
        description
    })
    const removeTodo = (id) => {
        const todo = state.todos.find(t => t.id === id)
        Alert.alert(
            "Удалнние задачи",
            `Вы уверены, что хотите удалить "${todo.title}"?`,
            [
                {
                    text: "Отмена",
                    style: "cancel"
                },
                {
                    text: "Удалить",
                    style: "destructive",
                    onPress: () => {
                        changeScreen(null)
                        dispatch({
                            type: REMOVE_TODO,
                            id
                        })
                    }
                }
            ],
            {cancelable: false}
        );
    }

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                addTodo,
                updateTodo,
                removeTodo
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}
