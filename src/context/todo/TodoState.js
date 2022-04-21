import React, {useContext, useReducer} from "react";
import {TodoContext} from "./todoContext";
import {todoReducer} from "./todoReducer";
import {
    ADD_TODO,
    CLEAR_ERROR,
    FETCH_TODOS,
    HIDE_LOADER,
    REMOVE_TODO,
    SHOW_ERROR,
    SHOW_LOADER,
    UPDATE_TODO
} from "../types";
import {ScreenContext} from "../screen/screenContext";
import {Alert} from "react-native";
import {Http} from "../../http";

export const TodoState = ({children}) => {
    const url = 'https://react-native-todo-app-d9c58-default-rtdb.asia-southeast1.firebasedatabase.app/todos'
    const initialState = {
        todos: [],
        loading: false,
        error: null
    }
    const [state, dispatch] = useReducer(todoReducer, initialState)
    const {changeScreen} = useContext(ScreenContext)

    const fetchTodos = async () => {
        showLoader()
        clearError()
        try {
            // const response = await fetch('https://react-native-todo-app-d9c58-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json', {
            //     method: 'GET',
            //     headers: {'Content-Type': 'application/json'}
            // })
            const data = await Http.get(url + '.json')
            // console.log(data)
            const todos = Object.keys(data).map(key => ({...data[key], id: key}))
            dispatch({type: FETCH_TODOS, todos})
        } catch (e) {
            showError(`${e.message}`)
            console.log(e)
        } finally {
            hideLoader()
        }
    }

    const addTodo = async (title, description) => {
        clearError()
        try {
            // const response = await fetch('https://react-native-todo-app-d9c58-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json', {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify({title, description})
            // })
            const data = await Http.post(url + '.json', {title, description})
            dispatch({type: ADD_TODO, id: data.name, title, description})
        } catch (e) {
            showError(`${e.message}`)
            console.log(e)
        }
    }
    const updateTodo = async (id, title, description) => {
        clearError()
        try {
            // const response = await fetch(`https://react-native-todo-app-d9c58-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`, {
            //     method: 'PATCH',
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify({title, description})
            // })
            // const data =
            await Http.patch(`${url}/${id}.json`, {title, description})
            dispatch({type: UPDATE_TODO, id, title, description})
        } catch (e) {
            showError(`${e.message}`)
            console.log(e)
        }
    }
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
                    onPress: async () => {
                        changeScreen(null)
                        clearError()
                        try {
                            // const response = await fetch(`https://react-native-todo-app-d9c58-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`, {
                            //     method: 'DELETE',
                            //     headers: {'Content-Type': 'application/json'}
                            // })
                            // const data =
                            await Http.delete(`${url}/${id}.json`)
                            dispatch({type: REMOVE_TODO, id})
                        } catch (e) {
                            showError(`${e.message}`)
                            console.log(e)
                        }

                    }
                }
            ],
            {cancelable: false}
        );
    }

    const showLoader = () => dispatch({type: SHOW_LOADER})
    const hideLoader = () => dispatch({type: HIDE_LOADER})

    const showError = error => dispatch({type: SHOW_ERROR, error})
    const clearError = () => dispatch({type: CLEAR_ERROR})


    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                loading: state.loading,
                error: state.error,
                addTodo,
                updateTodo,
                removeTodo,
                fetchTodos,
                clearError

            }}
        >
            {children}
        </TodoContext.Provider>
    )
}
