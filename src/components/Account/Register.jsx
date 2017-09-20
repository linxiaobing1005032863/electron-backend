/**
 * Created by chenlizan on 2017/6/23.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Select, Checkbox, Button, notification} from 'antd';
import {register_controller} from '../../controllers/Account/Register';

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {

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
                register_controller({
                    name: values.userName,
                    password: values.passWord,
                    phone: values.phone,
                    email: values.email
                }, (bool, result) => {
                    if (bool) {
                        this.context.router.replace('/');
                    }
                    else {
                        this.openNotificationWithIcon('error', '注册失败', '系统错误');
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
        if (value && value !== form.getFieldValue('passWord')) {
            callback('两个密码输入不一致!');
        } else {
            callback();
        }
    };

    onChange = (e) => {
        this.setState({isDisabled: !e.target.checked});
    };

    onClick = () => {
        this.context.router.replace('/');
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
        const {isDisabled} = this.state;

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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 60}}>
                <Option value="86">+86</Option>
            </Select>
        );

        return (
            <Form onSubmit={this.handleSubmit} className="register-form">
                <FormItem {...formItemLayout} label="用户名" hasFeedback>
                    {getFieldDecorator('userName', {
                        rules: [{
                            required: true,
                            message: '账号名必须字母、数字、下划线组成，字母开头，4-16位!',
                            pattern: /^[a-zA-z]\w{5,15}$/
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
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
                <FormItem{...formItemLayout} label="密码" hasFeedback>
                    {getFieldDecorator('passWord', {
                        rules: [{
                            required: true, message: '请输入密码！', min: 6
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem{...formItemLayout} label="确认密码" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请再次输入密码！', min: 6
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem{...formItemLayout} label="手机号码">
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: '请输入正确格式的手机号码！', pattern: /^1[3|4|5|7|8][0-9]\d{4,8}$/}],
                    })(
                        <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout} style={{marginBottom: 8}}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox onChange={this.onChange}>我已经阅读过相关 <a href="">服务条款与协议</a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large" disabled={isDisabled}>提交注册资料</Button>
                    <Button type="primary" size="large" className='return-button'
                            onClick={this.onClick}>已有账号?去登录！</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;