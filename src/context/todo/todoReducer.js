import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from "../types";

const handlers = {
    [ADD_TODO]: (state, {title, description}) => ({
        ...state,
        todos: [
            {
                id: Date.now().toString(),
                title,
                description
            },
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
    DEFAULT: state => state
}

export const todoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}