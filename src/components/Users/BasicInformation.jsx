import React from 'react';
import moment from 'moment';
import {Form, Input, DatePicker, Button, notification,Spin} from 'antd';
import {Organize_controller, editOrganize_controller} from '../../controllers/Users/Organize';

const FormItem = Form.Item;

class BasicForm extends React.Component {

    static propTypes = {
    };


    state = {
        isDisabled: false,
        loading:false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            const _id = this.props.form.getFieldValue('id');
            if (_id !== '') {
                values.id = this.props.form.getFieldValue('id'); //更新
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
    showBasicInfo = () => {
        const {handleOrganInfo} = this.props;
        Organize_controller((err, values) => {
            if (err) {
                handleOrganInfo(values);
                this.setState({
                    loading:true,
                });
                if(values !== null&&values[0].organizeInfo!==null){
                    if ( values[0].accountId !== values[0].organizeInfo.creator)
                        this.setState({isDisabled: true});
                }

            }
        });
    };

    componentWillMount() {
        this.showBasicInfo();
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const {isDisabled,loading} = this.state;

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

        if(true){
            return (
                <Form onSubmit={this.handleSubmit} className="organize-form">
                    <FormItem {...formItemLayout} label="组织名称" hasFeedback>
                        {getFieldDecorator('organizeName', {
                            rules: [{required: true, message: '请输入组织名称!'}],
                        })(
                            <Input disabled={isDisabled}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="组织英文名称" hasFeedback>
                        {getFieldDecorator('enName', {
                            rules: [{required: true, message: '请输入组织英文名称!'}],
                        })(
                            <Input disabled={isDisabled}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="简体名称" hasFeedback>
                        {getFieldDecorator('abbName', {
                            rules: [{required: true, message: '请输入简体名称!'}],
                        })(
                            <Input disabled={isDisabled}/>
                        )}
                    </FormItem>
                    <FormItem{...formItemLayout} label="官网地址">
                        {getFieldDecorator('url', {
                            rules: [{required: true, message: '请输入官网地址！'}],
                        })(
                            <Input disabled={isDisabled}/>
                        )}
                    </FormItem>
                    <FormItem{...formItemLayout} label="组织所在地址">
                        {getFieldDecorator('address', {
                            rules: [{required: true, message: '请输入组织所在地址！'}],
                        })(
                            <Input disabled={isDisabled}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="认证方式" hasFeedback>
                        {getFieldDecorator('authenMethod', {
                            rules: [{required: true, message: '请输入认证方式!'}],
                        })(
                            <Input disabled={isDisabled}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="认证时间" hasFeedback>
                        {getFieldDecorator('authenTime', {
                            rules: [{type: 'object', required: true, message: '请选择认证时间!'}],
                        })(
                            <DatePicker disabled={isDisabled}/>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large" disabled={isDisabled}>更新信息</Button>
                    </FormItem>
                </Form>
            );
        }else{
            return <Spin size="large" />
        }

    }
}

const BasicInformation = Form.create({
    mapPropsToFields(props) {
        const {account} = props;
        const _bool = account && account.length !== 0 && account[0].organizeInfo;
        let form = {
            organizeName: _bool ? {value: account[0].organizeInfo.organizeName} : {value: ''},
            enName: _bool ? {value: account[0].organizeInfo.enName} : {value: ''},
            abbName: _bool ? {value: account[0].organizeInfo.abbName} : {value: ''},
            url: _bool ? {value: account[0].organizeInfo.url} : {value: ''},
            address: _bool ? {value: account[0].organizeInfo.address} : {value: ''},
            authenMethod: _bool ? {value: account[0].organizeInfo.authenMethod} : {value: ''},
            id: _bool ? {value: account[0].organizeInfo.id} : {value: ''},
            creator: _bool ? {value: account[0].organizeInfo.creator} : {value: ''},
            authenTime: _bool && account[0] && account[0].organizeInfo.authenTime ? {value: moment(account[0].organizeInfo.authenTime)} : null,
        };
        for (let it in form) {
            if (form[it] === null)
                delete form[it];
        }
        return form;
    }
})(BasicForm);

export default BasicInformation;