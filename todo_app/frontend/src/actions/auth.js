import axios from 'axios';
import { config } from 'react-transition-group';
import { returnErrors } from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

//CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    //loading user
    dispatch({ type: USER_LOADING});

    //get token from state
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.get('/api/auth/user', config)
    .then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    }).catch(err =>{
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: AUTH_ERROR });
    });
};

//LOGIN USER
export const login = (username, password) => (dispatch) => {


    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username, password});



    axios.post('/api/auth/login', body, config)
    .then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        console.log(err);
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: LOGIN_FAIL });
    });
};

//logout user
export const logout = () => (dispatch, getState) => {


    //get token from state
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.post('/api/auth/logout/', null, config)
    .then(res => {
        dispatch({
            type: LOGOUT_SUCCESS
        });
    }).catch(err =>{
        dispatch(returnErrors(err.response.data, err.response.status));
        
    });
};


//REGISTER USER
export const register = ({ username, password }) => (dispatch) => {


    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username, password});



    axios.post('/api/auth/register', body, config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        console.log(err);
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: REGISTER_FAIL });
    });
};

export const tokenConfig = getState => {
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
}