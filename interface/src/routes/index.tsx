import React from 'react';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';

import DefaultLayout from '../layouts/Default';

import routes from './routes-list';

import history from '../services/history';

const Routes: React.FC = () => {
  function getRoutes(route: any[]) {
    return route.map((prop, key: any) => (
      <Route
        path={prop.path}
        exact={prop.exact}
        render={(props) => {
          if (prop.layout === 'DefaultLayout') {
            return <DefaultLayout {...props} component={prop.component} name={prop.title} />;
          }
        }}
        key={key}
      />
    ));
  }
  return (
    <BrowserRouter basename={window.location.pathname || ''}>
      <Router history={history}>
        <Switch>{getRoutes(routes)}</Switch>
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
