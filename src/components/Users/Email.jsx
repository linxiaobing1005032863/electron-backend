import React from 'react';
import {Steps} from 'antd';
import VerifyEmail from '../../containers/Users/VerifyEmail';
import ChangeEmail from '../../containers/Users/ChangeEmail';
import ChangSuccess from '../../containers/Users/ChangeSuccess';
const Step = Steps.Step;

const steps = [{
    title: '第一步：手机验证',
    content: <VerifyEmail/>,
}, {
    title: '第二步：更改邮箱',
    content: <ChangeEmail/>,
}, {
    title: '第三步：完成更改',
    content: <ChangSuccess/>,
}];

class Email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.current !== nextProps.current) {
            this.setState({
                current: nextProps.current
            })
        }

    }

    componentWillUnmount() {
        const {handleAdd} = this.props;
        handleAdd(0);
    }

    render() {
        const {current} = this.state;
        return (
            <div>
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title}/>)}
                </Steps>
                <div className="steps-content">{steps[this.state.current].content}</div>
            </div>
        );
    }
}
export default Email