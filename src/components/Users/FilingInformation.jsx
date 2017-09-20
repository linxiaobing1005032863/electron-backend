import React from 'react';
import moment from 'moment';
import {Form, Input, DatePicker, Button, notification, Spin} from 'antd';
import {Organize_controller, editOrganize_controller} from '../../controllers/Users/Organize';
const FormItem = Form.Item;

class FilingForm extends React.Component {

    static propTypes = {};


    state = {
        isDisabled: false,
        loading: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (this.props.form.getFieldValue('id') !== null) {
                values.id = this.props.form.getFieldValue('id');
                values.creator = this.props.form.getFieldValue('creator');
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
    showFilingInfo = () => {
        const {handleFilingInfo} = this.props;
        Organize_controller((err, values) => {
            if (err) {
                handleFilingInfo(values);
                this.setState({
                    loading: true,
                })
            }
        });
    };

    componentWillMount() {
        this.showFilingInfo()
    }

    componentDidMount() {
        const {account} = this.props;
        if (account !== null && account[0].organizeInfo !== null) {
            if (account[0].accountId !== account[0].organizeInfo.creator)
                this.setState({isDisabled: true});
        }

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
        if (loading) {
            return (
                <div className="business-form">
                    <Form onSubmit={this.handleSubmit} className="organize-form">
                        <FormItem {...formItemLayout} label="组织工商登记名称" hasFeedback>
                            {getFieldDecorator('bussinessName', {
                                rules: [{required: true, message: '请输入组织工商登记名称!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="法人代表" hasFeedback>
                            {getFieldDecorator('representative', {
                                rules: [{required: true, message: '请输入法人代表!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="注册资金" hasFeedback>
                            {getFieldDecorator('registerCapital', {
                                rules: [{pattern: /^[0-9]*$/, required: true, message: '请输入注册资金!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem{...formItemLayout} label="注册号">
                            {getFieldDecorator('registerNum', {
                                rules: [{required: true, message: '请输入注册号'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem{...formItemLayout} label="组织机构代码">
                            {getFieldDecorator('organizeCode', {
                                rules: [{required: true, message: '请输入组织机构代码！'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="社会信用代码" hasFeedback>
                            {getFieldDecorator('creditCode', {
                                rules: [{required: true, message: '请输入社会信用代码!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="经营状态" hasFeedback>
                            {getFieldDecorator('bussinessState', {
                                rules: [{pattern: /^[0-9]*$/, required: true, message: '请输入经营状态!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="成立时间" hasFeedback>
                            {getFieldDecorator('establishTime', {
                                rules: [{type: 'object', required: true, message: '请选择成立时间!'}],
                            })(
                                <DatePicker disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="牌照时间" hasFeedback>
                            {getFieldDecorator('licenseTagTime', {
                                rules: [{type: 'object', required: true, message: '请选择牌照时间!'}],
                            })(
                                <DatePicker disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="登记机关" hasFeedback>
                            {getFieldDecorator('registerDepartment', {
                                rules: [{required: true, message: '请输入登记机关!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="营业时间" hasFeedback>
                            {getFieldDecorator('startTime', {
                                rules: [{type: 'object', required: true, message: '请选择营业时间!'}],
                            })(
                                <DatePicker disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="完成时间" hasFeedback>
                            {getFieldDecorator('endTime', {
                                rules: [{type: 'object', required: true, message: '请选择完成时间!'}],
                            })(
                                <DatePicker disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="经营范围" hasFeedback>
                            {getFieldDecorator('range', {
                                rules: [{required: true, message: '请输入经营范围!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="住所" hasFeedback>
                            {getFieldDecorator('residence', {
                                rules: [{required: true, message: '请输入住所!'}],
                            })(
                                <Input disabled={isDisabled}/>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large" disabled={isDisabled}>更新信息</Button>
                        </FormItem>
                    </Form>
                </div>
            );
        } else {
            return <Spin size="large"/>
        }


    }
}

const FilingInformation = Form.create({
    mapPropsToFields(props) {
        const {account} = props;
        const _bool = account && account.length !== 0 && account[0].organizeInfo;
        let form = {
            bussinessName: _bool ? {value: account[0].organizeInfo.bussinessName} : {value: ''},
            representative: _bool ? {value: account[0].organizeInfo.representative} : {value: ''},
            registerCapital: _bool ? {value: account[0].organizeInfo.registerCapital} : {value: ''},
            registerNum: _bool ? {value: account[0].organizeInfo.registerNum} : {value: ''},
            organizeCode: _bool ? {value: account[0].organizeInfo.organizeCode} : {value: ''},
            creditCode: _bool ? {value: account[0].organizeInfo.creditCode} : {value: ''},
            bussinessState: _bool ? {value: account[0].organizeInfo.bussinessState} : {value: ''},
            establishTime: _bool && account[0] && account[0].organizeInfo.establishTime ? {value: moment(account[0].organizeInfo.establishTime)} : null,
            licenseTagTime: _bool && account[0] && account[0].organizeInfo.licenseTagTime ? {value: moment(account[0].organizeInfo.licenseTagTime)} : null,
            registerDepartment: _bool ? {value: account[0].organizeInfo.registerDepartment} : {value: ''},
            startTime: _bool && account[0] && account[0].organizeInfo.startTime ? {value: moment(account[0].organizeInfo.startTime)} : null,
            endTime: _bool && account[0] && account[0].organizeInfo.endTime ? {value: moment(account[0].organizeInfo.endTime)} : null,
            range: _bool ? {value: account[0].organizeInfo.range} : {value: ''},
            residence: _bool ? {value: account[0].organizeInfo.residence} : {value: ''},
            id: _bool ? {value: account[0].organizeInfo.id} : {value: ''},
            creator: _bool ? {value: account[0].organizeInfo.creator} : {value: ''}
        };
        for (let it in form) {
            if (form[it] === null)
                delete form[it];
        }
        return form;
    }
})(FilingForm);

export default FilingInformation;