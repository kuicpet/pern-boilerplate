import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GuestHome from '../components/GuestHome';
import Signin from '../containers/SigninForm';
import Signup from '../containers/SignupForm';
import UserHome from '../containers/UserHome';
import Group from '../containers/Group';
import NewGroup from '../containers/NewGroup'
import ForgotPassword from '../components/ForgotPassword';
import NotFound from '../components/NotFound';

const routeHandler = (props, component) => {
  return (
    <BrowserRouter>
      <div className='main'>
        <Route component={props.nav} />
        <div className='main-container'>
          { component }
        </div>
      </div>
  </BrowserRouter> 
  )
};

export function GuestRoutes(props) {
  const unauthRoutes = (
    <Switch>
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <Route path="/*" component={GuestHome} />
    </Switch>
  );
  return routeHandler(props, unauthRoutes);
}

export function UserRoutes(props) {
  const authRoutes = (
    <Switch>
      <Route exact path="/" component={UserHome} />
      <Route exact path="/groups/new" component={NewGroup} />
      <Route path='/groups/:groupid/messages' 
      component={Group} />
      <Route path="/*" component={NotFound} />
    </Switch>
  );
  return routeHandler(props, authRoutes);
}
