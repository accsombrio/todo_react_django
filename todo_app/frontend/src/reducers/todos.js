import { GET_TODOS, DELETE_TODO, ADD_TODO, CHECK_TODO } from '../actions/types.js';

const initialState = {
    todos:[]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TODOS:
            return {
                ...state,
                todos: action.payload
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case CHECK_TODO:
            return {
                ...state,
                todos: [...state.todos]
            };
        default:
            return state;
    }
}