import { Component } from 'react'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { uniqueId } from 'lodash'
import Sortable from '../../components/Sortable'
import './index.scss'

interface StyleState {
  storages: string[]
  items: string[]
  rets: string[]
}

class StylesDesign extends Component<{}, StyleState> {
  public state: StyleState = {
    items: ['盒子'],
    rets: [],
    storages: ['资产名称', '资产类型', '申请单号', '申请人']
  }

  constructor (props: any) {
    super(props)
  }

  public tabChange = (key: string) => {
    console.log(key)
  }

  public removeItem = (key: string): void => {
    const results = [...this.state.rets ]
    results.splice(results.indexOf(key), 1)

    this.setState({
        rets: results
      }
    )
  }

  public render () {
    const { TabPane } = Tabs

    return (
      <div className="styles">
        <div className="left-side">
          <Tabs type="card"
            onChange={ this.tabChange }>
            <TabPane tab="存储" key="1">
              <Sortable
                options={{
                  animation: 150,
                  sort: false,
                  group: {
                      name: 'clone',
                      pull: 'clone',
                      put: false
                  }
                }}
                className="block-list"
                tag="ul">
                  {
                    this.state.storages.map(
                      item => (<li key={uniqueId()} data-id={item}>{item}</li>)
                    )
                  }
              </Sortable>
            </TabPane>
            <TabPane tab="表单" key="2">
              <Sortable
                options={{
                  animation: 150,
                  sort: false,
                  group: {
                    name: 'clone',
                    pull: 'clone',
                    put: false
                  }
                }} 
                className="block-list"
                tag="ul">
                {
                  this.state.items.map(
                    item => (<li key={ uniqueId() } data-id={item} >{item}</li>)
                  )
                }
              </Sortable>
            </TabPane>
          </Tabs>
        </div>
        <div className="right-side">
          <Sortable
            options={{
              animation: 150,
              group: {
                name: 'clone',
                pull: false,
                put: true
              },
              onAdd: () => {
                console.log(this.state)
              },
              onRemove: () => {
                console.log(this.state)
              }
            }}
            onChange = {
              (items) => { this.setState({rets: items}) }
            }
            className="block-list"
            tag="ul">
              {
                this.state.rets.map(
                  item => (<li key={uniqueId()} data-id={item} >{item}<a onClick={() => this.removeItem(item)}>{'delete'}</a></li>)
                )
              }
          </Sortable>
        </div>
      </div>
    )
  }
}

export default connect()(StylesDesign)