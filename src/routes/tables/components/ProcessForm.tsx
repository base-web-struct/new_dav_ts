import { Component } from 'react'
import { Button, Form, Input, Select, Upload, Icon } from 'antd'
import { RcFile } from 'antd/lib/upload'
import { file2Base64 } from '../../../utils'

const { Option } = Select
const { TextArea } = Input

interface InputFormItem {
  label: string,
  id: string,
  placeholder?: string,
  rules?: any
}

interface TextAreaFormItem extends InputFormItem {
  autosize?: any
  onPressEnter?: () => void
}

interface SelectFormItem {
  label: string,
  id: string,
  options: string[],
  rules?: any
}

interface UploadFormItem {
  label: string,
  id: string,
  listType?: 'picture-card' | 'picture' | 'text' | undefined,
  fileList: any[],
  rules?: any,
  onChange?: any,
  onRemove?: any,
  beforeUpload?: any
}

interface FormProps {
  form?: any,
  fileList: any[],
  onSubmit: () => void,
  onClose: () => void,
  onFileChange: (fileList: any[]) => void
}

class ProcessForm extends Component<FormProps> {
    public static defaultProps: FormProps = {
      fileList: [],
      onSubmit: () => ({}),
      onClose: () => ({}),
      onFileChange: (fileList: any) => ([]),
    }

    constructor (props: FormProps) {
        super(props);
    }

    public onClose = () => {
      this.props.onClose()
      this.props.form.resetFields()
    }

    public onSubmit = () => {
      this.props.form.validateFields((errs, values) => {
        console.log(errs)
        !errs && console.log(values)
      })
    }

    public hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field])

    public beforeUpload = (file: RcFile, fileList: RcFile[]) => {
      file2Base64(file).then((ret) => {
        const url = 'url'
        const status = 'status'
        file[url] = ret;
        file[status] = 'done'
        this.props.onFileChange([...this.props.fileList, file])
      })
      return false
    }

    public removeUpload = (file: RcFile) => {
      const fileList = [ ...this.props.fileList].filter(f => f.uid !== file.uid)
      this.props.onFileChange(fileList)
    }

    public inputFormItem = (config: InputFormItem ) => {
      const { getFieldDecorator } = this.props.form
      const { id, label, placeholder, rules  } = config

      return (
        <Form.Item label={ label } hasFeedback>
          {
            getFieldDecorator(id, { rules })( <Input placeholder={ placeholder }/> )
          }
        </Form.Item>
      )
    }

    public textAreaFormItem = (config: TextAreaFormItem ) => {
      const { getFieldDecorator } = this.props.form
      const { id, label, rules, placeholder, autosize = { minRows: 6, maxRows: 6 } } = config

      return (
        <Form.Item label={ label } wrapperCol={{ span: 16 }}>
          {
            getFieldDecorator(id, { rules, initialValue: '' })(
              <TextArea autosize = { autosize } style={{ resize: 'none' }} placeholder={ placeholder }/>
            )
          }
        </Form.Item>
      )
    }

    public selectFormItem = (config: SelectFormItem) => {
      const { getFieldDecorator } = this.props.form
      const { label, id, rules = {}, options = [] } = config
      return (
        <Form.Item label={ label } hasFeedback>
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
      const { getFieldDecorator } = this.props.form
      const { label, id, rules = {}, listType = 'picture-card', ...props } = config
      const uploadButton = (
        <div>
          <Icon type="plus" />
        </div>
      );
      return (
        <Form.Item label={ label } wrapperCol={{ span: 16 }}>
          {
            getFieldDecorator(id, {rules})(
              <Upload
                  accept="image/*"
                  listType = { listType }
                  { ...props }>
                  {this.props.fileList.length >= 4 ? null : uploadButton}
              </Upload>
            )
          }
        </Form.Item>
      )
    }

    public validatorUpload (rule: any, value: any, cb: any) {
      if (!value || !value.fileList.length) {
        cb('请上传图标');
      } else {
        cb();
      }
    }

    public render () {
      const { getFieldsError } = this.props.form
      return (
        <Form onSubmit={this.onSubmit}
          labelCol={{span: 5 }}
          wrapperCol={{span: 7}}>
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
          {
            this.selectFormItem({
              label: '应用',
              id: 'app',
              options: ['应用1', '应用2', '应用3'],
              rules: [{
                required: true,
                message: '请选择应用'
              }]
            })
          }
          {
            this.selectFormItem({
              label: '流程负责人',
              id: 'director',
              options: ['第一负责人', '第二负责人', '第三负责人'],
              rules: [{
                required: true,
                message: '请选择负责人'
              }]
            })
          }
          {
            this.uploadFormItem({
              id: 'upload',
              label: '流程图标',
              beforeUpload: this.beforeUpload,
              fileList: this.props.fileList,
              onRemove: this.removeUpload,
              rules: [{
                validator: this.validatorUpload
              }]
            })
          }
          {
            this.textAreaFormItem({
              label: '备注',
              id: 'remarks',
              placeholder: '请输入200字以内',
            })
          }
          <div className="footer">
            <Form.Item>
              <Button className="btn cancel-btn" onClick={this.onClose}>取消</Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit"
                className="btn save-btn"
                disabled={this.hasErrors(getFieldsError())}
              >
                保存
              </Button>
            </Form.Item>
          </div>
        </Form>
      );
    }
  
    // public async onSuccess(file: any) {
    //   console.log(file)
    // }

    // public async uploadImage (upload: any) {
    //   const { onSuccess, file, fileList = [] } = upload;

    //   const resp = await new Promise(async reslove => {
    //     file.url = await file2Base64(file);
    //     reslove({
    //       status: 0,
    //       file,
    //     })
    //   })
    //   onSuccess(resp, file);
    //   this.setState({
    //     fileList: [
    //       ...this.state.fileList,
    //       file
    //     ]
    //   })
    //   return {
    //     abort() {
    //       console.log('upload progress is aborted.');
    //     },
    //   };
    // }
}

export default Form.create({ name: 'processForm' })(ProcessForm)
