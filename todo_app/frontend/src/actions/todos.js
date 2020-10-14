import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { GET_TODOS, DELETE_TODO, ADD_TODO, GET_ERRORS, CHECK_TODO, UPDATE_TODO } from './types';
import { tokenConfig } from './auth';

// Get todos

export const getTodos = () => (dispatch, getState) => {
    axios.get('/api/todo_list/', tokenConfig(getState))
        .then(
            res => {
                dispatch({
                    type: GET_TODOS,
                    payload: res.data
                });
            }
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    
}


//DELETE todos

export const deleteTodo = (id) => (dispatch, getState) => {
    axios.delete(`/api/todo_list/${id}/`, tokenConfig(getState))
        .then(
            res => {

                dispatch(createMessage({ deleteTodo: 'Task Deleted'}));
                dispatch({
                    type: DELETE_TODO,
                    payload: id
                });
            }
        ).catch(err => console.log(err));
    
}

//Add todo

export const addTodo = (todo) => (dispatch, getState) => {
    axios.post('/api/todo_list/', todo, tokenConfig(getState))
        .then(
            res => {
                dispatch(createMessage({ addTodo: 'Task Added'}));
                dispatch({
                    type: ADD_TODO,
                    payload: res.data
                });
            }
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    
}

//done undone todo

export const checkTodo = (todo) => (dispatch, getState) => {
    todo.complete = !todo.complete
    axios.put(`/api/todo_list/${todo.id}/`, todo, tokenConfig(getState))
        .then(
            res => {
                
                dispatch({
                    type: CHECK_TODO,
                    payload: res.data
                });
            }
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const updateTodo = (todo) => dispatch => {
    axios.put(`/api/todo_list/${todo.id}/`, todo)
        .then(
            res => {
                
                dispatch({
                    type: UPDATE_TODO,
                    payload: res.data
                });
            }
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}