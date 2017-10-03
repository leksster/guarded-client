// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/session';
import RegisterForm from '../../components/RegisterForm';
import Navbar from '../../components/Navbar';

class Register extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    // router: PropTypes.object,
  }

  static defaultProps = {
    isAuthenticated: false,
  }

  // static contextType = {
  //   router: React.PropTypes.shape({
  //     history: React.PropTypes.object.isRequired,
  //   }),
  // }

  handleSignup = (data) => {
    this.props.register(data);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={'/'} />;
    }

    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <RegisterForm onSubmit={this.handleSignup} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
