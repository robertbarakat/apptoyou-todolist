import React, { Component } from 'react';
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="info" light expand="md">
          <NavbarBrand tag={Link} to='/'>
            AppToYou
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to='/signin'>Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/signup'>
                  Registrarsi
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/all-todo'>Lista To Do</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/create-todo'>
                  Crea un To Do
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;