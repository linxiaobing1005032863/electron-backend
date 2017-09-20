import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, Spin} from 'antd';
const FormItem = Form.Item;


class CustomerInfoForm extends React.Component {

    static propTypes = {};

    static contextTypes = {
        router: PropTypes.object
    };

    state = {
        isDisabled: false,
        loading: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {handleCustomer, handleCustomerInfo} = this.props;
                handleCustomerInfo(values);
                handleCustomer(1);
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {isDisabled, loading} = this.state;

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

        if (!loading) {
            return (
                <div className="customer">
                    <Form onSubmit={this.handleSubmit} className="customer-form">
                        <FormItem {...formItemLayout} label="收货人" hasFeedback>
                            {getFieldDecorator('contact', {
                                rules: [{required: true, message: '请输入联系人!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="联系方式" hasFeedback>
                            {getFieldDecorator('phone', {
                                rules: [{required: true, message: '请输入联系方式!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="收货地址" hasFeedback>
                            {getFieldDecorator('address', {
                                rules: [{required: true, message: '请输入收货地址!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large" className="customerbtn">确定</Button>
                        </FormItem>
                    </Form>
                </div>
            );
        } else {
            return <Spin size="large"/>
        }

    }
}

const CustomerInfo = Form.create({
    mapPropsToFields(props) {
    }
})(CustomerInfoForm);

export default CustomerInfo;