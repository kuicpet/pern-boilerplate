import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

/**
 * @class SideNav
 */
export class SideNav extends Component {
  /**
   * @function componentDidMount
   * @description: Component life-cycle method that
   * is called before the component mounts
   * @returns {undefined}
   */
  componentDidMount() {
    this.initMaterial();
    $('.side-nav .my-list-item a').click(() => {
      const windowSize = $(window).width();
      if (windowSize < 993) {
        $('.button-colllapse').sideNav('hide');
      }
    });
  }

  /**
   * @function componentDidUpdate
   * @description: Component life-cycle method that
   * is called when the component updates
   * @returns {undefined}
   */
  componentDidUpdate() {
    this.initMaterial();
  }

  /**
   * @function initMaterial
   * @description initializes material components
   * @returns {undefined}
   */
  initMaterial() {
    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();
  }

  /**
   * @function render
   * @description component method that defines what would
   * be rendered by returning it
   * @returns {undefined}
   */
  render() {
    const navList = (
      <ul className='right hide-on-small-only' id=''>
        <li className='my-list-item'><a target='_blank'
        href='https://github.com/oahray/pren-boilerplate'>
          View On Github
        </a></li>
      </ul>
    );

    return (
      <div className="navbar-div">
        <div className='navbar-fixed'>
          <nav>
            <div className='nav-wrapper lighten-1'>
              <NavLink to='/' className='brand-logo'>Oahray</NavLink>
              {navList}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
