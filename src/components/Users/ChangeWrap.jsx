import React from 'react';
import PropTypes from 'prop-types';
import {Form, Select, Button, Spin} from 'antd';
import {myInfo_controller} from '../../controllers/Users/Person';

const FormItem = Form.Item;
const Option = Select.Option;

class Email extends React.Component {

    static propTypes = {};

    static contextTypes = {
        router: PropTypes.object
    };
    state = {
        phone: '',
        email: '',
        loading: false
    };


    showMyInfo = () => {
        myInfo_controller((err, values) => {
            if (err) {
                this.setState({
                    phone: values.phone,
                    email: values.email,
                    loading: true,
                })
            }
        });
    };
    OnClick = () => {
        return this.context.router.push('/home/email')
    };

    Submit = () => {
        return this.context.router.push('/home/phone')
    };

    componentWillMount() {
        this.showMyInfo();
    }

    render() {
        const {phone, email, loading} = this.state;

        if (true) {
            return (
                <div className="changeWrap">
                    <div className="email">
                        <span>邮箱修改:</span>
                        <span className="box">{email}</span>
                        <Button type="primary" htmlType="submit" size="large" onClick={this.OnClick}
                                className='changeBtn'>修改</Button>
                    </div>
                    <div className="phone">
                        <span>手机修改:</span>
                        <span className="box">{phone}</span>
                        <Button type="primary" htmlType="submit" size="large" onClick={this.Submit}
                                className='changeBtn'>修改</Button>
                    </div>
                </div>
            );
        } else {
            return <Spin size="large"/>
        }

    }
}


export default Email;