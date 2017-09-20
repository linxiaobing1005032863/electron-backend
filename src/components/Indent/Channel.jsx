import {Select, Button, Input} from 'antd';
import React from 'react';
const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class Channel extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: '',
            sale: '',
            channel: ''
        };
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    };

    saleChange = (e) => {
        this.setState({
            sale: e
        })
    };

    channelChange = (e) => {
        this.setState({
            channel: e
        })
    };

    OnClick = () => {
        const {handleChannel, customerInfo, productInfo} = this.props;
        const {value, sale, channel} = this.state;
        console.log(customerInfo);
        console.log(productInfo);
        console.log(value);
        console.log(sale);
        console.log(channel);
        handleChannel(3);
    };

    render() {
        return (
            <div>
                <div className="channel">
                    <span>销售代表：</span><Select
                    onSelect={this.saleChange}
                    style={{width: 200}}
                >
                    {children}
                </Select>
                    <span>渠道服务商：</span> <Select
                    onSelect={this.channelChange}
                    style={{width: 200}}
                >
                    {children}
                </Select>
                    <div className="channelWrap">
                        <span>采购合同编号：</span>
                        <Input className="channelBox" placeholder="合同编号" value={this.state.value}
                               onChange={this.handleChange}/>
                    </div>
                </div>
                <Button type="primary" htmlType="submit" size="large" onClick={this.OnClick}
                        className='channelBtn'>确定</Button>
            </div>
        );
    }
}
export default Channel;