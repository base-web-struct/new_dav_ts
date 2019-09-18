import * as React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Styles from './routes/styles'

// tslint:disable-next-line:typedef
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/styles" component={Styles} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
