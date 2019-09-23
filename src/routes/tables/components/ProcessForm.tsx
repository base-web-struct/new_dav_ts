import { Component } from 'react'
import { Button, Form, Input, Select, Upload, Icon } from 'antd'

const { Option } = Select

interface InputFormItem {
  label: string,
  id: string,
  placeholder: string,
  rules?: any
}

interface SelectFormItem {
  label: string,
  id: string,
  options: string[],
  rules?: any
}

interface UploadFormItem {
  label: string,
  action: string,
  listType?: 'picture-card' | 'picture' | 'text' | undefined
}

interface FormProps {
  form?: any,
  fileList: any[],
  onSubmit: () => void
  onClose: () => void
}

class ProcessForm extends Component<FormProps> {
    public static defaultProps: FormProps = {
      fileList: [],
      onClose: () => ({}),
      onSubmit: () => ({})
    }

    constructor (props: FormProps) {
        super(props);
    }

    public inputFormItem = (config: InputFormItem ) => {
      const { getFieldDecorator } = this.props.form
      const {id, label, placeholder, rules = {}} = config
      console.log(rules)
      return (
        <Form.Item label={ label }>
          {
            getFieldDecorator(id, { rules })( <Input placeholder={ placeholder }/> )
          }
        </Form.Item>
      )
    }

    public selectFormItem = (config: SelectFormItem) => {
      const { getFieldDecorator } = this.props.form
      const { label, id, rules = {}, options = [] } = config
      return (
        <Form.Item label={ label }>
          {
            getFieldDecorator(id, { rules })(
              <Select>
                {
                  options.map((item, index) => {
                    return (<Option key={index} value={item}>{item}</Option>)
                  })
                }
              </Select>)
          }
        </Form.Item>)
    }

    public uploadFormItem (config: UploadFormItem) {
      const { label, action, listType = 'picture-card' } = config
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      return (
        <Form.Item label={ label }>
          <Upload
              action={ action }
              listType = { listType }
              fileList={this.props.fileList}>
              {this.props.fileList.length >= 4 ? null : uploadButton}
          </Upload>)
        </Form.Item>
      )
    }

    public render () {
      return (
        <Form>
          {
            this.inputFormItem({
              label: '流程名称',
              id: 'process_name',
              placeholder: '请输入0-50个字符',
              rules: [{
                required: true,
                message: '流程名称不能为空'
              }]
            })
          }
          {/* {
            this.selectFormItem({
              label: '应用：',
              id: 'app',
              options: ['应用1', '应用2', '应用3'],
              rules: {
                require: true,
                message: '请选择应用'
              }
            })
          }
          {
            this.selectFormItem({
              label: '流程负责人：',
              id: 'director',
              options: ['第一负责人', '第二负责人', '第三负责人'],
              rules: {
                require: true,
                message: '请选择负责人'
              }
            })
          }
          {
            this.uploadFormItem({
              label: '流程图标',
              action: '/'
            })
          } */}
          <div className="footer">
            <Button className="btn cancel-btn" onClick={this.props.onClose}>取消</Button>
            <Button className="btn save-btn" onClick={this.props.onSubmit}>保存</Button>
          </div>
        </Form>
      );
    }
}

export default Form.create({ name: 'processForm' })(ProcessForm)
