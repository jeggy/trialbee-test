import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import AppContainer from '../components/App/AppContainer';
import UserContainer from '../components/User/containers/UserContainer';
import About from '../components/About/About';

export default (
  <Route path='/' component={AppContainer} queries={ViewerQuery}>
    <IndexRoute component={UserContainer} queries={ViewerQuery} />
    <Route path='/about' component={About} />
    {/*<Route path='/signup' component={SignupComponent} />*/}
    {/*<Route path='/login' component={LoginComponent} />*/}
    <Redirect from='*' to='/' />
  </Route>
);

