import { Component } from 'react'
import { connect } from 'dva'
import { Button, Drawer, Row, Col, Form, Input, Select, Upload, Icon } from 'antd'
import './index.scss'

const { Option } = Select

interface TableListProps {
    title: string,
    isDrawerVisible: boolean,
    fileList: any[],
    toggleDrawer: () => void
}

class TableList extends Component<TableListProps> {
    private static defaultProps: TableListProps = {
        title: '新增流程',
        isDrawerVisible: false,
        fileList: [],
        toggleDrawer: () => ({}),
    }

    constructor (props: TableListProps) {
        super(props);
    }

    public toggleDrawer = () => {
        this.props.toggleDrawer()
    }

    get selectFormItem () {
        return (
            <Select >
                <Option value="1">应用1</Option>
                <Option value="2">应用2</Option>
                <Option value="3">应用3</Option>
            </Select>
        )
    }

    get uploadFormItem () {
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Upload
                action="/"
                listType="picture-card"
                fileList={this.props.fileList}>
                {this.props.fileList.length >= 8 ? null : uploadButton}
            </Upload>)
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
                        <Form>
                            <Row >
                                <Col span={8}>
                                    <label className="prefix">流程名称：</label>
                                </Col>
                                <Col span={16}>
                                    <Input placeholder="请输入0-50个字符"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <label className="prefix">应用：</label>
                                </Col>
                                <Col span={16}>
                                    { this.selectFormItem }
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <label className="prefix">流程负责人：</label>
                                </Col>
                                <Col span={16}>
                                    { this.selectFormItem }
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <label className="prefix">流程图标：</label>
                                </Col>
                                <Col span={16}>
                                    { this.uploadFormItem }                                    
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className="footer">
                        <Button className="btn cancel-btn" onClick={this.toggleDrawer}>取消</Button>
                        <Button className="btn save-btn">保存</Button>
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

const mapDispatchToProps = (dispath: any) => ({
    toggleDrawer: () => dispath({ type: 'tables/toggleDrawer'})
})
 
export default connect(mapStateToProps, mapDispatchToProps)(TableList)