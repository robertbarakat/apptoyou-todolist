import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { connect } from 'react-redux';

class CreateToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      todo: '',
      priority: '1',
      user_id: '',
    }
    this.updateFields = this.updateFields.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({ user_id: user.id_user})
  }

  updateFields(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { history } = this.props;

    fetch('http://localhost:5000/api/todo/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then(res => res.text())
      .then(res => {
        if (res.error) {
          alert(res.error)
        } else {
          alert('To Do Creato!');
          history.push('/all-todo');
        }
      });
  }

  render() {
    const { todo, date, priority } = this.state;
    return (
      <div>
        <h3 className="text-center mb-3">Inserisci una nuova attività</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="date">Data (formato AAAA-MM-GG)</Label>
            <Input type="text" name="date" value={date} onChange={this.updateFields} />
          </FormGroup>
          <FormGroup>
            <Label for="todo">Attività</Label>
            <Input type="text" name="todo" value={todo} onChange={this.updateFields} />
          </FormGroup>
          <FormGroup>
            <Label for="priority">Priorità (1 = bassa; 2 = media; 3 = alta)</Label>
            <Input type="select" name="priority" value={priority} onChange={this.updateFields}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Input>
          </FormGroup>
          <FormGroup className="text-center">
            <Button color="primary">Invia</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

function mstp(state) {
  return {
    user: state.userReducer,
  }
}

export default connect(mstp)(CreateToDo);