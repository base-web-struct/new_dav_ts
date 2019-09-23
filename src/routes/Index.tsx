import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd'
import { withRouter } from 'dva/router'
import './Index.scss';

interface IndexProps {
  match: any,
  location: any,
  history: any
}

class IndexPage extends React.Component<IndexProps> {
  constructor (props: IndexProps) {
    super(props)
  }

  public router = (index: number) => {
    const { history } = this.props
    switch (index) {
      case 1:
        history.push('/styles')    
        break;
    
      case 2:
        history.push('/drags')
        break;

      case 3:
        history.push('/tables')
        break

      default:
        history.push('/')
        break
    }
  }

  public render () {
    return (
      <div className="normal">
        <h1 className="title">Yay! Welcome to dva!</h1>
        <div className="welcome" />
        <ul className="list">
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>
            <Button type="link" onClick={() => this.router(0)}>{'Home'}</Button>
          </li>
          <li>
            <Button type="link" onClick={() => this.router(1)}>{'Styles'}</Button>
          </li>
          <li>
            <Button type="link" onClick={() => this.router(2)}>{'Drags'}</Button>
          </li>
          <li>
            <Button type="link" onClick={() => this.router(3)}>{'Tables'}</Button>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(connect()(IndexPage));
