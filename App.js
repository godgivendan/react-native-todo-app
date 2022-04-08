import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import { Navbar } from "./src/components/Navbar";
import { AddTodo } from "./src/components/AddTodo";
import  { Todo } from "./src/components/Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (title) => {
      setTodos(prev => [
          {
              id: Date.now().toString(),
              title
          },
          ...prev
      ]);
  }
  const removeTodo = (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <View style={styles.container}>
        <Navbar title="Todo App!"/>
        <View style={styles.content}>
            <AddTodo onSubmit={addTodo} btnTitle="Добавить" inputPlaceholder="Введите наименование задачи..."/>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} /> }
                style={styles.todoList}
            />
            <StatusBar style="auto" />
        </View>
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
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    todoList: {
        height: '80%'
    }
});
