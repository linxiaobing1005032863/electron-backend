import React from 'react';
import {Form, Input, Button, notification} from 'antd';
import {Organize_controller, editOrganize_controller} from '../../controllers/Users/Organize';

const FormItem = Form.Item;

class ContactForm extends React.Component {

    static propTypes = {};


    state = {
        isDisabled: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (this.props.form.getFieldValue('id') !== null) {
                values.id = this.props.form.getFieldValue('id')
            }
            if (!err) {
                editOrganize_controller(values, (bool, result) => {
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

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description
        });
    };
    showContactInfo = () => {
        const {handleContactInfo} = this.props;
        Organize_controller((err, values) => {
            if (err) {
                handleContactInfo(values);
            }
        });
    };

    componentWillMount() {
        this.showContactInfo()
    }

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

        return (
            <Form onSubmit={this.handleSubmit} className="organize-form">
                <FormItem {...formItemLayout} label="联系信息" hasFeedback>
                    {getFieldDecorator('contactInformation', {
                        rules: [{required: true, message: '请输入联系信息!'}],
                    })(
                        <Input disabled={isDisabled}/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="联系方式名称" hasFeedback>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: '请输入联系方式名称!'}],
                    })(
                        <Input disabled={isDisabled}/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">创建信息</Button>
                </FormItem>
            </Form>
        );
    }
}

const ContactInformation = Form.create({
    mapPropsToFields(props) {
        const {account} = props;
        let form = {
            contactInformation: account ? {value: account[0].organizeInfo.organizeRelation.contactInformation} : {value: ''},
            name: account ? {value: account[0].organizeInfo.organizeRelation.name} : {value: ''},
            id: account ? {value: account[0].organizeInfo.id} : {value: ''}
        };
        for (let it in form) {
            if (form[it] === null)
                delete form[it];
        }
        return form;
    }
})(ContactForm);

export default ContactInformation;