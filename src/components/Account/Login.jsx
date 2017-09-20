

import React from 'react';
import PropTypes from 'prop-types';
import {Form, Icon, Input, Button, Checkbox, Spin, notification} from 'antd';
import {login_controller} from '../../controllers/Account/Login';

class LoginForm extends React.Component {

    static propTypes = {
        /*        loading: PropTypes.bool.isRequired,
         error: PropTypes.bool.isRequired*/
    };

    static contextTypes = {
        router: PropTypes.object
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.context.router.push('/home');
/*        this.props.form.validateFields((err, values) => {
            if (!err) {
                login_controller({name: values.userName, password: values.passWord}, (bool, result) => {
                    if (bool) {
                        window.localStorage.token = result.token;
                        this.context.router.push('/home');
                    }
                    else {
                        this.openNotificationWithIcon('error', '登陆失败', result.message);
                    }
                });
            }
        });*/
    };

    onClick = (e) => {
        switch (e.currentTarget.id) {
            case 'register' :
                return this.context.router.push('/register');
            case 'forget' :
                return this.context.router.push('/forget');
            default:
                return this.context.router.push('/');
        }
    };

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description
        });
    };

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Spin size="large" tip="验证中..." spinning={false}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: '请输入用户名!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="用户名"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('passWord', {
                            rules: [{required: true, message: '请输入密码!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住帐号</Checkbox>
                        )}
                        <a className="login-form-forgot" id="forget" onClick={this.onClick}>忘记密码</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                        Or <a id="register" onClick={this.onClick}>注册帐号!</a>
                    </FormItem>
                </Spin>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create({
    mapPropsToFields(props) {
    }
})(LoginForm);

export default WrappedLoginForm;
