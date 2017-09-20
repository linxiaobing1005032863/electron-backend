import {Table, Modal, Input, notification} from 'antd';
import React from 'react';
import {
    shippingList_controller,
    shippingInfo_controller,
    shipping_controller
} from '../../controllers/Indent/ShippingList'

class ShippingList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.columnsInfo = [{
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
        this.columns = [{
            title: '订单编号',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        }, {
            title: '详细',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return (
                    <a href="#" onClick={() => this.onClick(index)}>订单详细</a>
                )
            }
        }];
        this.state = {
            filterDropdownVisible: false,
            filtered: false,
            visible: false,
            index: '',
            count: 0,
            infoCount: 0,
            nameValue: '',
            phoneValue: '',
            addValue: '',
            dataInfo: [],
            logisticsValue: '',
            deliveryValue: ''
        };
    }

    onClick = (index) => {
        const {shippingList} = this.props;
        const {infoCount} = this.state;
        let id = shippingList[index].id;
        shipping_controller(id, (err, values) => {
            if (err) {
                let dataInfo = values.productList;
                let orderInfo = values.order;
                let _infoCount = infoCount;
                let _dataSource = [];
                dataInfo.forEach((it) => {
                    const _itData = {
                        key: _infoCount,
                        productId: it.id,
                        productName: it.name,
                        productShape: it.shape,
                        price: it.price,
                        productVoltage: it.voltage,
                    };
                    _infoCount++;
                    _dataSource.push(_itData);
                });
                this.setState({
                    visible: true,
                    index: index,
                    dataInfo: _dataSource,
                    nameValue: orderInfo.consignee,
                    phoneValue: orderInfo.phone,
                    addValue: orderInfo.address,
                });
            }
        });


    };

    logisticsChange = (e) => {
        this.setState({
            logisticsValue: e.target.value
        })
    };


    handleOk = () => {
        const {logisticsValue, index} = this.state;
        const {shippingDraft, handleShipDraft} = this.props;
        let pullData = {};
        pullData.id = shippingDraft[index].id;
        pullData.trackingNO = logisticsValue;
        shippingInfo_controller(pullData, (err, result) => {
            if (err) {
                let _shippingDraft = shippingDraft ? [...shippingDraft] : [];
                _shippingDraft.splice(index, 1);
                handleShipDraft(_shippingDraft);
                this.setState({
                    visible: false,

                });
                this.openNotificationWithIcon('success', '保存成功', '系统成功');
            }
            else {
                this.openNotificationWithIcon('error', '保存失败', '系统错误');
            }
        });

    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };


    showMyInfo = () => {
        const {count} = this.state;
        const {handleShipList, handleShipDraft} = this.props;
        shippingList_controller((err, values) => {
            if (err) {
                handleShipList(values);
                let _count = count;
                let _dataSource = [];
                values.forEach((it) => {
                    const _itData = {
                        key: _count,
                        id: it.id,
                        orderNumber: it.number,
                    };
                    _count++;
                    _dataSource.push(_itData);
                });
                handleShipDraft(_dataSource)
            }
        });
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
        const {nameValue, phoneValue, addValue, logisticsValue, dataInfo} = this.state;
        const {shippingDraft} = this.props;
        const columnsInfo = this.columnsInfo;
        const columns = this.columns;
        const pagination = {
            defaultPageSize: 2
        };
        return (
            <div>
                <Table columns={columns} dataSource={shippingDraft}
                />
                <Modal
                    title="订单详细"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认发货"
                    cancelText="关闭"
                >
                    <div>
                        <span>客户信息</span>
                        <p><span>客户名称：{nameValue}</span></p>
                        <p><span>联系方式：{phoneValue}</span></p>
                        <p><span>收货地址：{addValue}</span></p>
                        <div className="productTable">
                            <span>产品信息</span>
                            <Table columns={columnsInfo} dataSource={dataInfo} pagination={pagination}/>
                        </div>
                        <div>
                            <span>物流单号：</span>
                            <Input className="channelBox" placeholder="物流单号" value={logisticsValue}
                                   onChange={this.logisticsChange}/>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}


export default  ShippingList;