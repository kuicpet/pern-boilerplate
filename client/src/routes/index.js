import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GuestHome from '../components/GuestHome';
import SideNav from '../containers/SideNav';
import NotFound from '../components/NotFound';

/**
 * @function RouteHandler
 * @description: Higher order component that determines
 * what routes a user can access based on authentication status
 * @param {Object} props
 * @returns {Object} RouteHandler component
 */
const RouteHandler = () => {
  const unauthRoutes = (
    <div>
      <Switch>
        <Route exact path="/" component={GuestHome} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </div>
  );

  return (<BrowserRouter>
    <div className='main'>
      <Route component={SideNav} />
      {unauthRoutes}
    </div>
  </BrowserRouter>);
};

export default RouteHandler;
