// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { logout } from '../../actions/session';
import Navbar from '../../components/Navbar';

// type Props = {
//   logout: () => void,
//   currentUser: Object,
//   isAuthenticated: boolean,
// }

class Home extends Component {
  // static contextTypes = {
  //   router: PropTypes.object,
  // }

  // props: Props

  static propTypes = {
    logout: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
      id: PropTypes.number,
    }),
    isAuthenticated: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    currentUser: {},
  }

  handleLogout = () => this.props.logout(this.context.router);

  render() {
    const { currentUser, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
        {isAuthenticated &&
          <div>
            <span>{currentUser.email}</span>
            <button type="button" onClick={this.handleLogout}>Logout</button>
          </div>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { logout },
)(Home);
