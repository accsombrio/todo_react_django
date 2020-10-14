import { CREATE_MESSAGE, GET_ERRORS } from './types';


// creating a message

export const createMessage = msg => {
    return {
        type: CREATE_MESSAGE,
        payload: msg
    };
};

//return errors

export const returnErrors = (msg, status) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status }
    }
}