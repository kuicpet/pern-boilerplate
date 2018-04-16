import React, { Component } from 'react';

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
        <div id="guest-home-info">
          <h5 className="guest-home-header">
            Welcome to the PERN Boiler plate!
          </h5>
          <h6 className="guest-info-text">
            This boilerplate would help you get started quickly with React apps
          </h6>
        </div>
      </div>
    );
  }
}
