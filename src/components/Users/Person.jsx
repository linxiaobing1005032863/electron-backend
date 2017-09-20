import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Form, Input, DatePicker, Button, notification, Spin} from 'antd';
import {myInfo_controller, editMyInfo_controller} from '../../controllers/Users/Person';
const FormItem = Form.Item;


class PersonForm extends React.Component {

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
                editMyInfo_controller(values, (bool, result) => {
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

    showMyInfo = () => {
        const {handlePersonInfo} = this.props;
        myInfo_controller((err, values) => {
            if (err) {
                handlePersonInfo(values);
                this.setState({
                    loading: true,
                })
            }
        });
    };

    componentWillMount() {
        this.showMyInfo();
    }

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

        if (true) {
            return (
                <div className="slick">
                    <Form onSubmit={this.handleSubmit} className="person-form">
                        <FormItem {...formItemLayout} label="用户名" hasFeedback>
                            {getFieldDecorator('accountName')(
                                <Input disabled/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="真实姓名" hasFeedback>
                            {getFieldDecorator('realName', {
                                rules: [{required: true, message: '请输入真实姓名!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="姓名全拼" hasFeedback>
                            {getFieldDecorator('pinyinName', {
                                rules: [{required: true, message: '请输入姓名全拼!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="昵称" hasFeedback>
                            {getFieldDecorator('nickName', {
                                rules: [{required: true, message: '请输入昵称!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="英文名" hasFeedback>
                            {getFieldDecorator('enName', {
                                rules: [{required: true, message: '请输入英文名!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem{...formItemLayout} label="出生年月">
                            {getFieldDecorator('birthday', {
                                rules: [{type: 'object', required: false, message: '请选择时间！'}],
                            })(
                                <DatePicker disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem{...formItemLayout} label="参加工作年月">
                            {getFieldDecorator('workTime', {
                                rules: [{type: 'object', required: false, message: '请选择参加工作年月！'}],
                            })(
                                <DatePicker disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="联系地址" hasFeedback>
                            {getFieldDecorator('address', {
                                rules: [{required: false, message: '请输入联系地址!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">更新</Button>
                        </FormItem>
                    </Form>
                </div>
            );
        } else {
            return <Spin size="large"/>
        }

    }
}

const WrappedPersonForm = Form.create({
    mapPropsToFields(props) {
        const {account} = props;
        let form = {
            accountName: account ? {value: account.account} : {values: ''},
            realName: account ? {value: account.personInfo.realName} : {value: ''},
            pinyinName: account ? {value: account.personInfo.pinyinName} : {value: ''},
            nickName: account ? {value: account.personInfo.nickName} : {value: ''},
            enName: account ? {value: account.personInfo.enName} : {value: ''},
            address: account ? {value: account.personInfo.address} : {value: ''},
            birthday: account && account.personInfo && account.personInfo.birthday ? {value: moment(account.personInfo.birthday)} : null,
            workTime: account && account.personInfo && account.personInfo.workTime ? {value: moment(account.personInfo.workTime)} : null,
        };
        for (let it in form) {
            if (form[it] === null)
                delete form[it];
        }
        return form;
    }
})(PersonForm);

export default WrappedPersonForm;