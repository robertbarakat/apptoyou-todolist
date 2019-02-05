import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';

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

  updateFields(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

      fetch('http://localhost:5000/api/signin', {
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
            if(res !== []) {
              alert('Login effettuato con successo!');
              this.props.history.push('/');
            } else {
              alert('Credenziali errate, riprova!');
            }
          }
        });
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
 
export default withRouter(SignIn);