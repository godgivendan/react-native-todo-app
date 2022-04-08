import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export const Todo = ({todo, onRemove}) => {
    // const longPressHandler = () => {
    //     onRemove( todo.id )
    // }
  return (
      <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log('Pressed ', todo.id)}
          onLongPress = {onRemove.bind(null, todo.id)}
      >
          <View style={styles.todo}>
            <Text style={styles.todoText}>{todo.title}</Text>
          </View>
      </TouchableOpacity>
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