import * as React from 'react'
import { Router, Route, Switch } from 'dva/router'
import { createBrowserHistory } from 'history'
import Home from './home'

export const RouterConfig = () => {
  return <Router history={createBrowserHistory()}>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </Router>
}
