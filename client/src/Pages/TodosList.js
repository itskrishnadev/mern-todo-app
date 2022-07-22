import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };

        this.getTodoList = this.getTodoList.bind(this);
    }
    getTodoList() {
        let self = this
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                self.setState({ todos: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getTodoList()
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <Todo todos={this.state.todos} getTodoList={this.getTodoList} />

                </table>
            </div>
        )
    }
}



function Todo({ todos, getTodoList }) {

    const deleteApit = (id) => {

        axios.delete('http://localhost:4000/todos/' + id)
            .then(() => {
                getTodoList()
                console.log("Todo is removed")
                alert("Todo is removed")
            })
            .catch(function (error) {
                console.log(error);
            });



    }

    return (
        <tbody>{
            todos.map((item, i) => (
                <tr key={i}>
                    <td className={item.todo_completed ? 'completed' : ''}>{item.todo_description}</td>
                    <td className={item.todo_completed ? 'completed' : ''}>{item.todo_responsible}</td>
                    <td className={item.todo_completed ? 'completed' : ''}>{item.todo_priority}</td>
                    <td>
                        <Link to={"/edit/" + item._id}>Edit</Link>
                        <button onClick={() => deleteApit(item._id)}>delete</button>
                    </td>
                </tr>
            ))
        }
        </tbody>
    )
}

