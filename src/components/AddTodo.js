import React from "react";
import {View, Text, StyleSheet, TextInput, TouchableHighlight, Alert} from "react-native";

export const AddTodo = ({ btnTitle, inputPlaceholder, onSubmit, errMessage }) => {
    const [value, setValue] = React.useState('');
    const pressHandler = () => {
        if (value.trim()) {
            if (onSubmit) {
                onSubmit(value.trim());
            } else {
                console.log(value);
            }
            setValue('');
        } else {
            Alert.alert("Ошибка в Todo App!", errMessage??"Неверно заполнено наименование задачи!");
        }
    }
    return (
      <View style={styles.addBlock}>
          <TextInput
              style={styles.input}
              onChangeText={value => setValue(value)}
              value={value}
              placeholder={inputPlaceholder??'Введите задачу...'}
              AutoCorrect={false}
              autoCapitalize='sentences'
              autoFocus={true}
              blurOnSubmit={false}
              keyboardType='default'
              clearButtonMode='always'
              onSubmitEditing={(evt) => {
                  // console.log(evt.nativeEvent.text.trim());
                  setValue(evt.nativeEvent.text.trim());
                  pressHandler();
              }}
          />
          <TouchableHighlight
              style={styles.btn}
              onPress={pressHandler}
              activeOpacity={0.6}
              underlayColor="rgb(12, 43, 94)"
          >
              <Text style={styles.btnText}>{btnTitle??'Добавить'}</Text>
          </TouchableHighlight>
      </View>
  )
}

const styles = StyleSheet.create({
    addBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15
    },
    input: {
        height: 44,
        width: '70%',
        borderStyle: 'solid',
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 2,
        padding: 10
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgb(32, 63, 114)',
    },
    btnText: {
        color: 'white'
    }
})