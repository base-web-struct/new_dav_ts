import * as React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { DvaInstance } from 'dva';
import * as H from 'history';
import dynamic from 'dva/dynamic'
import Index from './routes/Index';
import Styles from './routes/styles'
import Drags from './routes/drags'

// tslint:disable-next-line:typedef
function RouterConfig({ history, app }: { history: H.History, app: DvaInstance }) {
  const DynamicTables = dynamic({
    app,
    models: () => [ import('./models/tables') ],
    component: () => import('./routes/tables')
  })

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/styles" component={Styles} />
        <Route path="/drags" component={Drags} />
        <Route path="/tables" component={DynamicTables} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
