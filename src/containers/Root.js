import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';
import Landing from '../components/Landing';

let pathPrefix = '';
if (process.env.REACT_APP_PUBLIC_URL) {
    const publicUrl = new URL(process.env.REACT_APP_PUBLIC_URL);
    pathPrefix = publicUrl.pathname;
}

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
