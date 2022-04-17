import React, {useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, Alert} from 'react-native';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import {Navbar} from "./src/components/Navbar";
import {MainScreen} from "./src/screens/MainScreen";
import {TodoScreen} from "./src/screens/TodoScreen";
import {THEME} from "./src/theme";


async function loadApplication() {
    await Font.loadAsync({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    })
}

export default function App() {
    const [isReady, setIsReady] = useState(false);
    const [todoId, setTodoId] = useState(null);
    const [todos, setTodos] = useState([
        {id: '1', title: 'Work with React Native', description: ''},
        {id: '2', title: 'Make Todo App', description: ''},
    ]);
    if (!isReady) {
        return (
            <AppLoading startAsync={loadApplication}
                        onFinish={() => setIsReady(true)}
                        onError={err => console.log(err)}
            />
        )
    }
    const addTodo = (title, description) => {
        let id = Date.now().toString();
        setTodos(prev => [
            {
                id: id,
                title,
                description
            },
            ...prev
        ]);
        return id
    }
    const removeTodo = (id) => {
        const todo = todos.find(todo => todo.id === id)
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
                        setTodoId(null);
                        setTodos(todos.filter((todo) => todo.id !== id));
                    }
                }
            ],
            {cancelable: false}
        );
    }
    const updateTodo = (id, title, description) => {
        setTodos(old => old.map(todo => {
            if (todo.id === id) {
                todo.title = title;
                todo.description = description;
            }
            return todo
        }))
    }

    let content = (
        <MainScreen
            todos={todos}
            addTodo={addTodo}
            removeTodo={removeTodo}
            openTodo={setTodoId}
        />
    );
    if (todoId) {
        const selectedTodo = todos.find(todo => todo.id === todoId)
        content = (
            <TodoScreen
                todo={selectedTodo}
                onRemove={removeTodo}
                onSave={updateTodo}
                goBack={() => setTodoId(null)}
            />
        );
    }

    return (
        <View style={styles.container}>
            <Navbar title="Todo App!"/>
            <View style={styles.content}>
                {content}
            </View>
            <StatusBar style="auto"/>
        </View>
    );
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
