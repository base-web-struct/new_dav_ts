import React from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'

class Home extends React.Component<any, any> {
  public render () {
    return (
      <div className="home-main">22</div>
    )
  }
}

export default withRouter(connect()(Home))
