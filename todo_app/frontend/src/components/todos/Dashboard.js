import React, { Component, Fragment } from 'react';
import Form from './Form';
import TodoList from './TodoList';

export default function Dashboard() {

    return (
        <div>
            <Fragment>
                <Form />
                <TodoList />
            </Fragment>
        </div>
    )
}