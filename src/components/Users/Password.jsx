import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, notification} from 'antd';
import {changePassword_controller} from '../../controllers/Users/Password';
const FormItem = Form.Item;

class PasswordForm extends React.Component {

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
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                changePassword_controller(values, (bool, result) => {
                    if (bool) {
                        this.openNotificationWithIcon('success', '保存成功', '系统成功');
                    }
                    else {
                        this.openNotificationWithIcon('error', '保存失败', '系统错误');
                    }
                });
            }
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassWord')) {
            callback('两个密码输入不一致!');
        } else {
            callback();
        }
    };

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
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
            <div>
                <div className="stip">
                    <Form onSubmit={this.handleSubmit} className="account-form">
                        <FormItem{...formItemLayout} label="初始密码" hasFeedback>
                            {getFieldDecorator('passWord', {
                                rules: [{
                                    required: true, message: '请输入初始密码！',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input type="password"/>
                            )}
                        </FormItem>
                        <FormItem{...formItemLayout} label="新密码" hasFeedback>
                            {getFieldDecorator('newPassWord', {
                                rules: [{
                                    required: true, message: '请输入新密码！',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input type="password"/>
                            )}
                        </FormItem>
                        <FormItem{...formItemLayout} label="确认新密码" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请再次输入新密码！',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur}/>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large" className='changebtn'>确认修改</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const Password = Form.create()(PasswordForm);


export default Password;