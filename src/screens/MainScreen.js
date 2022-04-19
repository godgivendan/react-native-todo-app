import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, View, FlatList, Image, Dimensions} from "react-native";
import {AddTodo} from "../components/AddTodo";
import {EditModal} from "../components/EditModal";
import {Todo} from "../components/Todo";
import {AppText} from "../components/ui/AppText";
import {THEME} from "../theme";
import {TodoContext} from "../context/todo/todoContext";
import {ScreenContext} from "../context/screen/screenContext";

export const MainScreen = () => {
    const {todos, addTodo, removeTodo} = useContext(TodoContext)
    const {changeScreen} = useContext(ScreenContext)

    const [tempTitle, setTempTitle] = useState('');
    const [tempDesc, setTempDesc] = useState('');
    const [modal, setModal] = useState(false);
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
            setDeviceWidth(width);
        }
        Dimensions.addEventListener('change', update);
        return () => {
            Dimensions.removeEventListener('change', update);
        }
    });


    let content = (
        <View style={{ width: deviceWidth }}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/>}
                style={styles.todoList}
            />
        </View>

    )
    if (todos.length === 0) {
        content = (
            <View style={styles.nodata}>
                <AppText>Задач пока нет...</AppText>
                <Image source={require('../../assets/empty_list.png')} style={styles.img}/>
                <AppText>Добавьте новую задачу...</AppText>
            </View>
        )
    }

    //Modal AddTodo
    const onOpenNewTodo = (title, description) => {
        setTempTitle(title);
        setTempDesc(description);
        console.log(`tempTitle: ${tempTitle}; tempDesc: ${tempDesc};`);
        setModal(true);
    }
    const onSaveNewTodo = (title, description) => {
        addTodo(title, description);
        setModal(false);
    }
    const modalWnd = (
        <EditModal value={tempTitle}
                   description={tempDesc}
                   wndTitle={'Создание новой задачи'}
                   visible={modal}
                   onCancel={setModal}
                   onSave={onSaveNewTodo}/>
    );

    return (
        <View>
            {modal?modalWnd:null}
            <AddTodo onSubmit={addTodo}
                     onOpenForm={onOpenNewTodo}
                     btnTitle="Добавить"
                     inputPlaceholder="Введите наименование задачи..."/>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    todoList: {},
    nodata: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        resizeMode: 'contain',
        height: 300,
        opacity: 0.3,
        marginVertical: 10
    }
})