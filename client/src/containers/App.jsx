import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';

import RouteHandler from '../routes';
import { verifyAuth } from '../actions';

/**
 * @class
 */
export class App extends Component {
  /**
   * @returns {undefined}
   */
  componentWillMount() {
    if (localStorage && localStorage.getItem('x-auth')) {
      const token = localStorage.getItem('x-auth');
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        this.props.verifyAuth(token);
      }
    }
  }

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    setTimeout(() => {
      $('.modal').modal();
    }, 800);
  }

  /**
   * @returns {undefined}
   */
  render() {
    if (this.props.verifyAuthLoading) {
      return (<Preloader message='Preparing your space...'/>);
    }

    const appRoutes = <RouteHandler isLoggedIn={this.props.isLoggedIn} />;

    return (
      <div class='main'>
        { appRoutes }
        <div className="footer center">
          <span className="left">
            <small> ©{(new Date()).getFullYear()} Oahray</small>
          </span>
          <span>
            <small> Bridging the communication gap...</small>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  verifyAuthLoading: state.verifyAuthLoading,
  isLoggedIn: state.isAuthenticated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ verifyAuth }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
