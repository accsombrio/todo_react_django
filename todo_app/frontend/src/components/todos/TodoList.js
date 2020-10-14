import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTodos, deleteTodo, checkTodo} from '../../actions/todos';




export class TodoList extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        getTodos: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        checkTodo: PropTypes.func.isRequired,
    }
    
    componentDidMount() {
        this.props.getTodos();
    }

    render() {
        
        return (
            <Fragment><h2>To Do List</h2>
                <table className="table">
                    
                    <tbody>
                        { this.props.todos.map(todo => (
                            <tr key={todo.id}>
                                <td>
                                    {todo.complete ? (<strike>{todo.title}</strike>) : (<span>{todo.title}</span>)}
                                </td>
                                <td width="20%">
                                    
                                    {todo.complete ? 
                                        <button className="btn btn-success btn-sm" onClick={this.props.checkTodo.bind(this, todo)}>
                                            Undo
                                        </button>: 
                                        <button className="btn btn-primary btn-sm" onClick={this.props.checkTodo.bind(this, todo)}>Done</button>
                                    }
                                    
                                    <button className="btn btn-danger btn-sm" onClick={this.props.deleteTodo.bind(this, todo.id)}>
                                        Remove
                                    </button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todos.todos
});

export default connect(
    mapStateToProps, 
    { getTodos, deleteTodo, checkTodo}
    
    )(TodoList);