import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.redirect();
    }

    componentDidUpdate() {
      this.redirect();
    }

    redirect() {
      if (!this.props.auth) {
        this.props.history.push('/');
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateTopProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateTopProps)(ComposedComponent);
};
