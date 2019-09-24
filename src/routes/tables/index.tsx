import { Component } from 'react'
import { connect } from 'dva'
import { Button, Drawer } from 'antd'
import ProccessForm from './components/ProcessForm'
import './index.scss'

interface TableListProps {
  title: string,
  isDrawerVisible: boolean,
  fileList: any[],
  toggleDrawer: () => void,
  setFileList: () => void
}

class TableList extends Component<TableListProps> {
    private static defaultProps: TableListProps = {
        title: '新增流程',
        isDrawerVisible: false,
        fileList: [],
        toggleDrawer: () => ({}),
        setFileList: () => ({})
    }

    constructor (props: TableListProps) {
        super(props);
    }

    public toggleDrawer = () => {
        this.props.toggleDrawer()
    }

    public submit = () => {
      console.log('submit')
    }

    public render () {
      return (
          <div className="table-list">
              <Button type="danger" onClick={this.toggleDrawer}>Click</Button>
              <Drawer
                  className="table-drawer"
                  visible={this.props.isDrawerVisible}
                  onClose={this.toggleDrawer}
                  title={this.props.title}
                  closable={false}
                  width={685}>
                  <div className="body">
                    <ProccessForm
                      fileList={ this.props.fileList }
                      onFileChange={ this.props.setFileList }
                      onClose={ this.toggleDrawer }
                      onSubmit={ this.submit }/>
                  </div>
              </Drawer>
          </div>
      );
    }
}

const mapStateToProps = (state: any) => ({
    isDrawerVisible: state.tables.isDrawerVisible,
    fileList: state.tables.fileList
})

const mapDispatchToProps = (dispatch: any) => ({
    toggleDrawer: () => dispatch({ type: 'tables/toggleDrawer'}),
    setFileList: (fileList: any[]) => dispatch({ type: 'tables/setFileList', payload: { fileList }})
})

export default connect(mapStateToProps, mapDispatchToProps)(TableList)