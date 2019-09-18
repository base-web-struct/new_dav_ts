import * as React from 'react'
import { Router, Route, Switch } from 'dva/router'
import { createBrowserHistory } from 'history'
import IndexPage from './routes/IndexPage'

function RouterConfig() {
  const history = createBrowserHistory()
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
      </Switch>
    </Router>
  )
}

export default RouterConfig
