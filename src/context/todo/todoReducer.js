import {
    ADD_TODO,
    FETCH_TODOS,
    CLEAR_ERROR,
    HIDE_LOADER,
    REMOVE_TODO,
    SHOW_ERROR,
    SHOW_LOADER,
    UPDATE_TODO
} from "../types";

const handlers = {
    [ADD_TODO]: (state, {id, title, description}) => ({
        ...state,
        todos: [
            { id, title, description },
            ...state.todos
        ]
    }),
    [UPDATE_TODO]: (state, {id, title, description}) => ({
        ...state,
        todos: state.todos.map(todo => {
            if (todo.id === id) {
                todo.title = title;
                todo.description = description;
            }
            return todo
        })
    }),
    [REMOVE_TODO]: (state, {id}) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id)
    }),
    [FETCH_TODOS]: (state, {todos}) => ({...state, todos}),
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [HIDE_LOADER]: state => ({...state, loading: false}),
    [SHOW_ERROR]: (state, {error}) => ({...state, error}),
    [CLEAR_ERROR]: state => ({...state, error: null}),
    DEFAULT: state => state
}

export const todoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}