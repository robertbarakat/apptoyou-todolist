import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      const { authenticated, history } = this.props;
      if (!authenticated)
        history.push('/');
    }
    
    componentWillUpdate() {
      const { authenticated, history } = this.props;
      if (!authenticated)
        history.push('/');
    }

    render() {
      return <ComposedComponent  {...this.props} />
    }
  }

  function mstp(state) {
    return { authenticated: state.authReducer };
  }

  return withRouter(connect(mstp)(Authentication));
}