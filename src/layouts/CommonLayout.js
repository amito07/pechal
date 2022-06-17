import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TheNavbar from '../components/TheNavbar';
import Login from '../pages/Login';
import LoggedInRoute from '../routes/ProtectedRoutes/LoggedInRoute';
import AuthenticatedLayout from './AuthenticatedLayout';

const CommonLayout = () => {
  return (
    <>
      <TheNavbar />
      <Switch>
        <Route exact path='/login' component={Login} />
        <LoggedInRoute component={AuthenticatedLayout} />
      </Switch>
    </>
  );
};

export default CommonLayout;
