import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { requestReset, clearResetRequestMessage } from '../actions';

/**
 * @class
 */
class ForgotPassword extends Component {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.requestResetEmail = this.requestResetEmail.bind(this);
  }

  /**
   * @function componentWillUnmount
   * @returns {Object} action
   */
  componentWillUnmount() {
    this.props.clearResetRequestMessage();
  }

  /**
   * @function requestResetEmail
   * @param {Object} e
   * @returns {undefined}
   */
  requestResetEmail(e) {
    e.preventDefault();
    if (this.state.email && !this.props.requestResetLoading) {
      this.props.requestReset(this.state.email);
    }
  }

  /**
   * @function render
   * @returns {jsx} forgot password component
   */
  render() {
    let resetResponseMessage = (
      <div className={`reset-form-message white-text lighten-2 ${
        this.props.requestResetSuccess ?
      'teal' : 'red'}`}>
        <p className="center">{this.props.requestResetMessage}</p>
      </div>
    );
    if (this.props.requestResetSuccess !== true &&
      this.props.requestResetSuccess !== false) {
      resetResponseMessage = null;
    }
    return (
      <form className="center row" onSubmit={this.requestResetEmail}>
        <h5 className="page-header main-text-color">Forgot Password</h5>
        <h6>Please enter the email you signed up with</h6>
        <div className="col s12 m8 offset-m2 row forgot-password">
          <input
          className="forgot-password-input col s9"
          type="text" placeholder="Recovery Email"
          onChange={event => this.setState({ email: event.target.value })}
          />
          <button id="request-reset-btn"
          className={!this.props.requestResetLoading ?
          'request-reset-btn btn col s2 waves-effect waves-teal' :
          'btn col s2 disabled'}
          type="submit">{this.props.requestResetLoading ?
          'sending...' : 'send'}</button>
          {<div className="col s12">
            {resetResponseMessage}
          </div>}
          <div className='col s12 main-text-color'>
            <p className='center'> Remember your password? <Link
            to="/signin">Sign In </Link></p>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  requestResetLoading: state.requestResetLoading,
  requestResetSuccess: state.requestResetMessage.requestResetSuccess,
  requestResetMessage: state.requestResetMessage.requestResetMessage
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestReset,
  clearResetRequestMessage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
