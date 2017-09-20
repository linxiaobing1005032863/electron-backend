import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Select, Button, notification} from 'antd';
import {changEmailAndPhone_controller} from '../../controllers/Users/Email';
const FormItem = Form.Item;
const Option = Select.Option;

class ChangeEmailForm extends React.Component {

    static propTypes = {};

    static contextTypes = {
        router: PropTypes.object
    };

    state = {
        confirmDirty: false,
        isDisabled: true,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {handleChange} = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                changEmailAndPhone_controller('email', values, (bool, result) => {
                    if (bool) {
                        this.openNotificationWithIcon('success', '保存成功', '系统成功');
                        handleChange(2)
                    }
                    else {
                        this.openNotificationWithIcon('error', '保存失败', '系统错误');
                    }
                });

            }
        });
    };

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        return (
            <div className="change">
                <Form onSubmit={this.handleSubmit} className="change-form">
                    <FormItem{...formItemLayout} label="邮箱" hasFeedback>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '输入的邮箱无效！',
                            }, {
                                required: true, message: '请输入邮箱！',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large" className='changebtn'>确认修改</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const ChangeEmail = Form.create()(ChangeEmailForm);

export default ChangeEmail;