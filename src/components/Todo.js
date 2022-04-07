import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const Todo = ({todo}) => {
  return (
      <View style={styles.todo}>
        <Text style={styles.todoText}>{todo.title}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10
    },
    todoText: {
        color: 'rgb(12, 43, 94)'
    }
})