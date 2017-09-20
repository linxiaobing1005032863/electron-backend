import React from 'react';
import {Form, Input, Select, Button, Row, Col, notification} from 'antd';
import {myInfo_controller} from '../../controllers/Users/Person';
const FormItem = Form.Item;
const Option = Select.Option;

class VerifyEmailForm extends React.Component {

    static propTypes = {};

    state = {
        phone: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {handleAdd} = this.props;
        handleAdd(1);
    };

    showMyInfo = () => {
        myInfo_controller((err, values) => {
            if (err) {
                this.setState({
                    phone: values.phone
                })
            }
        });
    };

    componentWillMount() {
        this.showMyInfo();
    }

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {phone} = this.state;
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
                    <FormItem{...formItemLayout} label="手机号码">
                        <Input style={{width: '100%'}} value={phone} disabled/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="验证码"
                    >
                        <Row gutter={8}>
                            <Col span={12}>
                                {getFieldDecorator('captcha', {
                                    rules: [{required: true, message: '请输入您的验证码！'}],
                                })(
                                    <Input size="large"/>
                                )}
                            </Col>
                            <Col span={12}>
                                <Button size="large">获取验证码</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large" className='changebtn'>验证</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const VerifyEmail = Form.create()(VerifyEmailForm);


export default VerifyEmail;