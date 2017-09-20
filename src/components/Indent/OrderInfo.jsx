import {Table, Button, Input, notification} from 'antd';
import React from 'react';
import {orderInfo_controller, draftInfo_controller} from '../../controllers/Indent/ConfirmOrder';

class OrderInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [{
            title: '产品编号',
            dataIndex: 'productId',
        }, {
            title: '产品名称',
            dataIndex: 'productName',
        }, {
            title: '产品形状',
            dataIndex: 'productShape',
        }, {
            title: '产品价格',
            dataIndex: 'price',
        }, {
            title: '产品电压',
            dataIndex: 'productVoltage',
        }];
        this.state = {
            nameValue: '',
            phoneValue: '',
            addValue: '',
            data: []
        };
    }

    nameChange = (e) => {
        this.setState({
            nameValue: e.target.value
        })
    };

    phoneChange = (e) => {
        this.setState({
            phoneValue: e.target.value
        })
    };

    addressChange = (e) => {
        this.setState({
            addValue: e.target.value
        })
    };

    draftClick = () => {
        const {nameValue, phoneValue, addValue, data} = this.state;
        const {draftIndex, order} = this.props;
        let id = order[draftIndex].id;
        let _data = [];
        let pullData = {};
        for (let i = 0; i < data.length; i++) {
            let dataValue = {};
            dataValue.productId = data[i].productId;
            dataValue.price = data[i].price;
            _data.push(dataValue);
        }
        pullData.consignee = nameValue;
        pullData.phone = phoneValue;
        pullData.address = addValue;
        pullData.product = data;
        pullData.state = false;
        pullData.id = id;
        orderInfo_controller(pullData, (err, result) => {
            if (err) {
                this.openNotificationWithIcon('success', '草稿保存成功', '系统成功');

            }
            else {
                this.openNotificationWithIcon('error', '保存失败', '系统错误');
            }
        });
    };

    orderClick = () => {
        const {nameValue, phoneValue, addValue, data} = this.state;
        const {orderDraft, draftIndex, handleOrderDraft, order} = this.props;
        let id = order[draftIndex].id;
        let _data = [];
        let pullData = {};
        for (let i = 0; i < data.length; i++) {
            let dataValue = {};
            dataValue.productId = data[i].productId;
            dataValue.price = data[i].price;
            _data.push(dataValue);
        }
        pullData.consignee = nameValue;
        pullData.phone = phoneValue;
        pullData.address = addValue;
        pullData.id = id;
        pullData.product = data;
        pullData.state = true;
        orderInfo_controller(pullData, (err, result) => {
            if (err) {
                let _orderDraft = orderDraft ? [...orderDraft] : [];
                _orderDraft.splice(draftIndex, 1);
                handleOrderDraft(_orderDraft);
                this.openNotificationWithIcon('success', '保存成功', '系统成功');
            }
            else {
                this.openNotificationWithIcon('error', '保存失败', '系统错误');
            }
        });
    };

    showMyInfo = () => {
        const {draftIndex, order} = this.props;
        let data = order[draftIndex];
        let id = data.id;
        draftInfo_controller(id, (err, values) => {
            if (err) {
                let _values = values.productList;
                let orderInfo = values.order;
                let _count = 0;
                let _dataSource = [];
                _values.forEach((it) => {
                    const _itData = {
                        key: _count,
                        productId: it.id,
                        productName: it.name,
                        productShape: it.shape,
                        price: it.price,
                        productVoltage: it.voltage,
                    };
                    _count++;
                    _dataSource.push(_itData);
                });
                this.setState({
                    nameValue: orderInfo.consignee,
                    phoneValue: orderInfo.phone,
                    addValue: orderInfo.address,
                    data: _dataSource
                })
            }
        })

    };

    componentWillMount() {
        this.showMyInfo();
    }

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description
        });
    };

    render() {
        const columns = this.columns;
        const {data} = this.state;
        const {nameValue, phoneValue, addValue} = this.state;
        const pagination = {
            defaultPageSize: 2
        };
        return (
            <div>
                <div>客户信息</div>
                <div>
                    <span>客户明显：</span>
                    <Input className="orderBox" placeholder="客户名称" value={nameValue}
                           onChange={this.nameChange}/>
                </div>
                <div>
                    <span>联系信息：</span>
                    <Input className="orderBox" placeholder="联系信息" value={phoneValue}
                           onChange={this.phoneChange}/>
                </div>
                <div>
                    <span>发货地址：</span>
                    <Input className="orderBox" placeholder="发货地址" value={addValue}
                           onChange={this.addressChange}/>
                </div>
                <div className="productTable">
                    <span>产品信息</span>
                    <Table columns={columns} dataSource={data} pagination={pagination}/>
                </div>
                <Button type="primary" size="large" onClick={this.draftClick}
                        className='productBtn'>草稿保存</Button>
                <Button type="primary" size="large" onClick={this.orderClick}
                        className='productBtn'>确认订单</Button>
            </div>
        );
    }
}
export default OrderInfo