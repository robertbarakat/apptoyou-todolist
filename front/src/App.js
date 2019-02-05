import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import HomeScreen from './components/HomeScreen';
import SignUp from './containers/SignUp';
import CreateToDo from './containers/CreateToDo';
import AllToDo from './components/AllToDo';
import SignIn from './containers/SignIn';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Container>
          <Row className="mt-3">
            <Col xs={12} sm={{size: 6, offset: 3}}>
            <Switch>
              <Route exact path='/' component = {HomeScreen} />
              <Route path='/signup' component = {SignUp} />
              <Route path='/signin' component = {SignIn} />
              <Route path='/create-todo' component = {CreateToDo} />
              <Route path='/all-todo' component = {AllToDo} /> 
            </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
