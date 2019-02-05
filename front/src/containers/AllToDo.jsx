import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

class AllToDo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      empty: '',
    }
  }

  componentDidMount() {
    const { todos } = this.state;
    this.fetchToDo();
    if (todos.length === 0) {
      this.setState({ empty: 'Non hai alcuna attività nella tua To Do List'})
    }
  }

  fetchToDo() {
    fetch(`http://localhost:5000/api/tasks/${this.props.user.id_user}`)
      .then(res => res.json())
      .then(data => this.setState({ todos: data }));
  }

  render() {
    const { todos, empty } = this.state;
    return (
    <div>
      <h3 className="mb-3">Lista To Do in agenda</h3>
      <p>{empty}</p>
      { todos.map(item => (
        <div key={item.id}>
          <p><strong>Task:</strong> {item.todo}</p>
          <p><strong>Priorità:</strong> {item.priority}</p>
          <p><strong>Scadenza:</strong> <Moment format="DD/MM/YYYY">{item.date}</Moment></p>
        <hr />
        </div>
      ))}
    </div>
    )}
  }

function mstp(state) {
  return {
    user: state.userReducer,
  }
}

export default connect(mstp)(AllToDo);