import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';
import Landing from '../components/Landing';
import pathPrefix from '../helpers/pathPrefix';

const Root = (props) => {
  return (
    <App>
      <Switch>
        <Route exact path={pathPrefix + '/'} component={Landing} />
      </Switch>
    </App>
  );
}

Root.displayName = 'Root';

export default Root;
