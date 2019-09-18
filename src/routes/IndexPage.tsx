import React from 'react'
import { connect } from 'dva'
import './IndexPage.scss'
import { Button } from 'antd'

function IndexPage() {
  return (
    <div className="normal">
      <Button>11</Button>
      <h1 className="title">Yay! Welcome to dva!</h1>
      <div className="welcome" />
      <ul className="list">
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  )
}

export default connect()(IndexPage)
