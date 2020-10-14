import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTodo } from '../../actions/todos';

export class Form extends Component {

    constructor(props){
        super(props);
          this.state = {
            title: ''
          }
           
    };
    // state = {
    //     title: ''
    // }

    static propTypes = {
        addTodo: PropTypes.func.isRequired
    };

    onChange = e => this.setState({[ e.target.name ]: e.target.value});

    onSubmit = e => {
        e.preventDefault();
        console.log("submit");
        const { title } = this.state;
        const todo = { title };
        this.props.addTodo(todo);
        this.setState({
            title: ""
        });
    }
    render() {
        const {title} = this.state;
        return (
            <div className="card-body mt-4 mb-4">
                <form onSubmit={this.onSubmit}>
                    <div className="input-group mb-3">
                        <input placeholder="Add task here..." type="text" className="form-control" name="title" onChange={this.onChange} value={title}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-success" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, { addTodo })(Form);