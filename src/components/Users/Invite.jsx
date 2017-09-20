import React from 'react';
import {Form, Input, Button, Modal, notification} from 'antd';
import {invite_controller, transfer_controller} from '../../controllers/Users/Invite';

class InviteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invite: "",
            transfer: "",
            visible: false,
        }
    }

    changeInvite = (e) => {
        this.setState({
            invite: e.target.value,
        })
    };

    changeTransfer = (e) => {
        this.setState({
            transfer: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let invite = this.state.invite;
        if (invite === '') {
            this.warning();
        } else {
            invite_controller({phone: invite}, (bool, result) => {
                if (bool) {
                    this.openNotificationWithIcon('success', '已提交', '系统成功');
                }
                else {
                    this.openNotificationWithIcon('error', '提交失败', '系统错误');
                }
            });
        }
    };

    OnClick = (e) => {
        e.preventDefault();
        let transfer = this.state.transfer;
        if (transfer === '') {
            this.warning();
        } else {
            transfer_controller({phone: transfer}, (bool, result) => {
                if (bool) {
                    this.openNotificationWithIcon('success', '已提交', '系统成功');
                }
                else {
                    this.openNotificationWithIcon('error', '提交失败', '系统错误');
                }
            });
        }
    };

    warning = () => {
        Modal.warning({
            title: '号码为空',
            content: '请您输入正确的号码！',
        });
    };
    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description
        });
    };

    render() {
        return (
            <div className="wrap">
                <div className="invite-wrap">
                    <p>邀请账号：</p><Input placeholder="请输入要邀请的账号" value={this.state.invite} onChange={this.changeInvite}
                                       className='invite-input'/>
                    <Button type="primary" onClick={this.handleSubmit} className='invite-btn' size="large">邀请</Button>
                </div>
                <div className="transfer-wrap">
                    <p>转移账号：</p><Input placeholder="请输入要转移的账号" value={this.state.transfer}
                                       onChange={this.changeTransfer} className='transfer-input'/>
                    <Button type="primary" onClick={this.OnClick} className='transfer-btn' size="large">转让</Button>
                </div>
            </div>
        );
    }
}

const Invite = Form.create()(InviteForm);

export default Invite;