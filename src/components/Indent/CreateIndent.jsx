import {Steps} from 'antd';
import React from 'react';
import CustomerInfo from '../../containers/Indent/CustomerInfo';
import ProductInfo from '../../containers/Indent/ProductInfo';
//import Channel from '../../containers/Indent/Channel';
import ChangSuccess from '../../containers/Users/ChangeSuccess';
const Step = Steps.Step;

const steps = [{
    title: '第一步：客户信息',
    content: <CustomerInfo/>,
}, {
    title: '第二步：产品信息',
    content: <ProductInfo/>,
}, /*{
    title: '第三步：渠道商',
    content: <Channel/>,
},*/
    {
        title: '第三步：完成',
        content: <ChangSuccess/>,
    }];

class CreateIndent extends React.Component {
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
        const {handleIndent,handleOrderInfo} = this.props;
        handleIndent(0);
        handleOrderInfo([])
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
export default CreateIndent