import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import createSession from '../actions/createSession';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.updateFields = this.updateFields.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if(this.props.auth) {
      this.props.history.push('/all-todo');
    }
  }

  updateFields(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const { createSession } = this.props;

    fetch('http://localhost:5000/api/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      else
        throw new Error(res.statusText);
    })
      .then(res => createSession(res));
      alert('Loggato con successo!');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h3 className="text-center">Compilare i campi e premere Entra!</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" value={email} onChange={this.updateFields} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" value={password} onChange={this.updateFields} />
          </FormGroup>
          <FormGroup className="text-center">
            <Button color="primary">Entra</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

function mstp(state) {
  return {
    auth: state.authReducer,
  }
}

function mdtp(dispatch) {
  return bindActionCreators({ createSession }, dispatch)
}

export default withRouter(connect(mstp, mdtp)(SignIn));