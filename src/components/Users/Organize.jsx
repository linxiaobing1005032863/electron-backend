import React from 'react';
import PropTypes from 'prop-types';
import {Form, notification, Tabs} from 'antd';
import BasicInformation from '../../containers/Users/BasicInformation';
//import ContactInformation from '../containers/ContactInformation';
import FilingInformation from '../../containers/Users/FilingInformation';
import Invite from '../../containers/Users/Invite';
const TabPane = Tabs.TabPane;

class OrganizeForm extends React.Component {
    static propTypes = {}

    static contextTypes = {
        router: PropTypes.object
    }

    state = {
        isDisabled: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(11)
        });
    };

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description
        });
    };


    render() {
        const InviteTab = (
            <TabPane tab="邀请用户加入组织" key="4"><Invite/></TabPane>
        );

        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="组织基本信息" key="1"><BasicInformation/></TabPane>
                {/*<TabPane tab="组织联系信息" key="2"><ContactInformation/></TabPane>*/}
                <TabPane tab="组织工商信息" key="3"><FilingInformation/></TabPane>
                {false ? null : InviteTab}
            </Tabs>
        );
    }
}
const Organize = Form.create()(OrganizeForm);
export default Organize;