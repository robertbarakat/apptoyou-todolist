import React, { Component } from 'react';
import Moment from 'react-moment';

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
    fetch('http://localhost:5000/api/tasks')
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
          <p>{item.todo}</p>
          <p>Priorità: {item.priority}</p>
          <p>Scadenza: <Moment format="DD/MM/YYYY">{item.date}</Moment></p>
        <hr />
        </div>
      ))}
    </div>
    );
  }
}

export default AllToDo;