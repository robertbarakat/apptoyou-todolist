import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

class AllToDo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    this.fetchToDo();
  }

  fetchToDo() {
    fetch(`http://localhost:5000/api/tasks/${this.props.user.id_user}`)
      .then(res => res.json())
      .then(data => this.setState({ todos: data }));
  }

  render() {
    console.log(this.state);
    const { todos } = this.state;
    return (
    <div>
      <h2>Lista To Do in agenda</h2>
      
      { todos.map(item => (
        <div key={item.id}>
          <p><strong>Task:</strong> {item.todo}</p>
          <p><strong>Priorità:</strong> {item.priority}</p>
          <p><strong>Scadenza:</strong> <Moment format="DD/MM/YYYY">{item.date}</Moment></p>
        <hr />
        </div>
      ))}
    </div>
    );
  }
}

function mstp(state) {
  return {
    user: state.userReducer,
  }
}

export default connect(mstp)(AllToDo);