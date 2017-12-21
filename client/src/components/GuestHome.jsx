import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GuestCarousel from './GuestCarousel';

/**
 * @class
 */
export default class GuestHome extends Component {
  /**
   * @function render
   * @returns {Object} jsx component for landing page
   */
  render() {
    return (
      <div className='guest-home center'>
        <div>
          <h5 className="guest-home-header">Welcome to Postit!</h5>
          <p className="guest-home-info">
            Postit is a communication-driven community
            that provides a platform with which you can:
          </p>
        </div>
         <GuestCarousel />
        <div className="guest-home-text">
          <p> To dive right into the experience,</p>
          <Link id="landing-signup" to='/signup'> Signup </Link>
          or
          <Link id="landing-signin" to='/signin'> Signin </Link>
        </div>
      </div>
    );
  }
}
