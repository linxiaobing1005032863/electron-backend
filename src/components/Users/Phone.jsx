import {Steps} from 'antd';
import React from 'react';
import VerifyPhone from '../../containers/Users/VerifyPhone';
import ChangePhone from '../../containers/Users/ChangePhone';
import ChangSuccess from '../../containers/Users/ChangeSuccess';
const Step = Steps.Step;

const steps = [{
    title: '第一步：手机验证',
    content: <VerifyPhone/>,
}, {
    title: '第二步：更改手机',
    content: <ChangePhone/>,
}, {
    title: '第三步：更改完成',
    content: <ChangSuccess/>,
}];

class Phone extends React.Component {
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
export default Phone