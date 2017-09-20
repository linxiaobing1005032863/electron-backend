import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Select, Button, notification} from 'antd';
import {changEmailAndPhone_controller} from '../../controllers/Users/Email';
const FormItem = Form.Item;
const Option = Select.Option;

class ChangePhoneForm extends React.Component {

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
        const {handleChangePhone} = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                changEmailAndPhone_controller('phone', values, (bool, result) => {
                    if (bool) {
                        this.openNotificationWithIcon('success', '保存成功', '系统成功');
                        handleChangePhone(2)
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 60}}>
                <Option value="86">+86</Option>
            </Select>
        );

        return (
            <div className="change">
                <Form onSubmit={this.handleSubmit} className="change-form">
                    <FormItem{...formItemLayout} label="手机号码">
                        {getFieldDecorator('phone', {
                            rules: [{required: true, message: '请输入手机号码！'}],
                        })(
                            <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
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
const ChangePhone = Form.create()(ChangePhoneForm);

export default ChangePhone;