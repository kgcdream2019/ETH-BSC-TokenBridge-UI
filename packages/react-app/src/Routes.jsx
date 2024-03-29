import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { History } from './pages/History';
import { Home } from './pages/Home';
import { Maintenance } from './pages/Maintenance';

export const Routes = () => (
  <Switch>
    {/* <Route exact path="/" component={Maintenance} /> */}
    <Route exact path="/" component={Home} />
    <Route path="/history" component={History} />
    <Redirect to="/" />
  </Switch>
);
