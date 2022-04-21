import React, {useState, useEffect, useContext, useCallback} from "react";
import {StyleSheet, View, FlatList, Image, Dimensions} from "react-native";
import {AddTodo} from "../components/AddTodo";
import {EditModal} from "../components/EditModal";
import {Todo} from "../components/Todo";
import {AppText} from "../components/ui/AppText";
import {THEME} from "../theme";
import {TodoContext} from "../context/todo/todoContext";
import {ScreenContext} from "../context/screen/screenContext";
import {AppLoader} from "../components/ui/AppLoader";
import {AppButton} from "../components/ui/AppButton";
import {AppTextBold} from "../components/ui/AppTextBold";

export const MainScreen = () => {
    const {todos, addTodo, removeTodo, fetchTodos, loading, error, clearError} = useContext(TodoContext)
    const {changeScreen} = useContext(ScreenContext)

    const [tempTitle, setTempTitle] = useState('');
    const [tempDesc, setTempDesc] = useState('');
    const [modal, setModal] = useState(false);
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])
    useEffect(() => {
        loadTodos()
    }, [])

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

    if (loading) {
        return <AppLoader />
    }

    if (error) {
        return <View style={styles.center}>
            <AppText style={styles.errorTitle}>Что-то пошло не так...</AppText>
            <AppText style={styles.error}>{error}</AppText>
            <View>
                <AppButton onPress={clearError}>Закрыть</AppButton>
                <AppButton onPress={loadTodos}>Повторить</AppButton>
            </View>

        </View>
    }

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
                <AppTextBold>Задач пока нет...</AppTextBold>
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
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorTitle: {
        fontSize: 20,
        color: THEME.DARK_DANGER_COLOR,
        paddingBottom: 20,
        fontWeight: 'bold'
    },
    error: {
        fontSize: 18,
        color: THEME.DANGER_COLOR,
        paddingBottom: 20
    }
})