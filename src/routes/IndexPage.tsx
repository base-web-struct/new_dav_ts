import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd'
import './IndexPage.scss';

class IndexPage extends React.Component {
  public render () {
    return (
      <div className="normal">
        <h1 className="title">Yay! Welcome to dva!</h1>
        <div className="welcome" />
        <ul className="list">
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>
            <Button type="danger">Click</Button>
          </li>
        </ul>
      </div>
    )
  }
}

export default connect()(IndexPage);
