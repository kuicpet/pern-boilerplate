import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { logout, getGroupList } from '../actions';
import Preloader from '../components/Preloader';

/**
 * @class
 */
class UserHome extends Component {
  componentWillMount() {
    if (this.props.user) {
      if (window.localStorage && typeof window.localStorage === 'object') {
        localStorage.setItem('x-auth', this.props.token);
      }
      this.props.getGroupList(this.props.token);
    }
  }

  render() {
    if (this.props.groupListLoading) {
      return (<Preloader message='Loading your groups'/>);
    }

    const showGroups = (
      this.props.groupList.length > 0 ? this.props.groupList.map(group => (
        <li className='col s12 m6 l4'
        key={group.id}>
          <div className="group-card z-depth-2">
            <span className='title'><Link to={`/groups/${group.id}/messages`}>
              {group.name} </Link></span>
              <br/>
             <span className="user-home-group-desc truncate"><small> Description: {group.description ?
              group.description : 'None' } </small></span>
            <br/>
            <span><small> Type: {group.type} </small></span>
            <span className='right'><small>Created by:
            {group.createdBy === this.props.user.username ?
              'You' : group.createdBy}</small></span> <br/>
          </div>
        </li>)
      ) : (<div className='center'><p>You do not belong to any groups.
        <br/> Create one to get started. </p></div>));

    const content = (
      < div className='user-home-content'>
        <div className='row'>
          <h5 className='col s12 main-text-color page-header'> Your Groups (
          {this.props.groupList.length}) </h5>
        </div>
        <ul className='group-cards-collection row'>
          {showGroups}
        </ul>
      </div>
    );

    return (
      <div className="user-home">
        {this.props.isLoggedIn ? content : <Redirect to="/" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isAuthenticated,
  user: state.user,
  groupList: state.groupList,
  groupListLoading: state.groupListLoading,
  token: state.token
});

const mapDispatchToProps = dispatch =>
bindActionCreators({ getGroupList, logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
