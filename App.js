import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Navbar } from "./src/components/Navbar";
import { AddTodo } from "./src/components/AddTodo";
import  { Todo } from "./src/components/Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (title) => {
      // const newTodo = {
      //   id: Date.now().toString(),
      //   title: title
      // };
      // setTodos(todos.concat([newTodo]));
      // setTodos((prevTodos) => {
      //   return [
      //       ...prevTodos,
      //       newTodo
      //   ];
      // });
      setTodos(prev => [
          {
              id: Date.now().toString(),
              title
          },
          ...prev
      ]);
  }

  return (
    <View style={styles.container}>
        <Navbar title="Todo App!"/>
        <View style={styles.content}>
            <AddTodo onSubmit={addTodo} btnTitle="Добавить" inputPlaceholder="Введите наименование задачи..."/>
            <View style={styles.todoList}>
                <ScrollView
                    alwaysBounceVertical={true}
                    contentContainerStyle={styles.todoListContent}
                    >
                    {todos.map(todo => {
                        return <Todo todo={todo} key={todo.id} />
                    })}
                </ScrollView>
            </View>
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
        //justifyContent: 'center'
    },
    content: {
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    todoList: {
        height: '87%'
    },
    todoListContent: {
        paddingVertical: 5
    }
});
