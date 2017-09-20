import {Table, Modal, notification, Input} from 'antd';
import React from 'react';
//import InstallDetails from '../../containers/Indent/InstallDetails';
import {
    installList_controller,
    installInfo_controller,
    accept_controller,
    install_controller
} from '../../controllers/Indent/InstallList';

class InstallList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.columnsA = [{
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
            visibleA: false,
            visibleB: false,
            data: [],
            dataA: [],
            id: '',
            orderNumber: '',
            nameValue: '',
            phoneValue: '',
            nameValueA: '',
        };
    }

    ShippingInfo = (index, stateA, statB) => {
        const {installDraft, handleInstallList} = this.props;
        let id = installDraft[index].id;
        let orderNumber = installDraft[index].orderNumber;
        install_controller(id, (err, values) => {
            if (err) {
                let dataInfo = values.productList;
                let orderInfo = values.order;
                let _infoCount = 0;
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
                    visibleA: stateA,
                    visibleB: statB,
                    id: id,
                    dataA: _dataSource,
                    data: _dataSource,
                    orderNumber: orderNumber,
                    nameValue: orderInfo.consignee,
                    phoneValue: orderInfo.phone,
                });
                handleInstallList(_dataSource);
            }
        });
    };

    onClick = (index) => {
        const {handleInstallIndex} = this.props;
        handleInstallIndex(index);
        this.ShippingInfo(index, true, false);
    };

    handleSubmit = (index) => {
        this.ShippingInfo(index, false, true);
    };

    nameChangeA = (e) => {
        this.setState({
            nameValueA: e.target.value
        })
    };


    handleOkA = () => {
        this.setState({
            visibleA: false,
        });
    };

    handleCancelA = () => {
        this.setState({
            visibleA: false,
        });
    };
    handleOkB = () => {
        const {nameValueA, id} = this.state;
        let pullData = {};
        pullData.id = id;
        pullData.Installer = nameValueA;
        accept_controller(pullData, (err, values) => {
            if (err) {
                this.setState({
                    visibleB: false,
                    nameValueA: '',
                });
                this.openNotificationWithIcon('success', '确认成功', '系统成功');
            }
            else {
                this.openNotificationWithIcon('error', '保存失败', '系统错误');
            }
        });
    };

    handleCancelB = () => {
        this.setState({
            visibleB: false,
        });
    };


    showMyInfo = () => {
        const {handleInstallDraft} = this.props;
        installList_controller((err, values) => {
            if (err) {
                let _count = 0;
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
                handleInstallDraft(_dataSource)
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
        const {installDraft} = this.props;
        const {nameValue, phoneValue, nameValueA, data, id, orderNumber, dataA} = this.state;
        const columnsA = this.columnsA;
        const columns = [{
            title: '订单编号',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        }, {
            title: '详细',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return (
                    <a href="#" onClick={() => this.onClick(index)}>安装详细</a>
                )
            }
        }, {
            title: '确认',
            dataIndex: '',
            key: '',
            render: (text, record, index) => {
                return (
                    <a href="#" onClick={() => this.handleSubmit(index)}>安装完成回执</a>
                )
            }
        }];
        const pagination = {
            defaultPageSize: 2
        };
        return (
            <div>
                <Table columns={columns} dataSource={installDraft}/>
                <Modal
                    title="安装详细"
                    visible={this.state.visibleA}
                    onOk={this.handleOkA}
                    onCancel={this.handleCancelA}
                    okText="确认"
                    cancelText="关闭"
                >
                    <div>
                        <span>武汉市武昌区直营中心李亚丽：</span>
                        <p><span>你区域所属订单编号{orderNumber}产品于2017年到货，产品服务信息如下:</span></p>
                        <Table columns={columnsA} dataSource={dataA} pagination={pagination}/>
                        <p><span>客户联系人：{nameValue}</span></p>
                        <p><span>联系方式：{phoneValue}</span></p>
                    </div>
                </Modal>
                <Modal
                    title="安装确认"
                    visible={this.state.visibleB}
                    onOk={this.handleOkB}
                    onCancel={this.handleCancelB}
                    okText="安装完成"
                    cancelText="关闭"
                >
                    <div>
                        <p><span>你区域所属订单编号{orderNumber}产品于2017年安装完成，产品服务信息如下:</span></p>
                        <Table columns={columnsA} dataSource={data} pagination={pagination}/>
                        <div>
                            <span>安装人：</span>
                            <Input className="channelBox" placeholder="产品安装人" value={nameValueA}
                                   onChange={this.nameChangeA}/>
                        </div>
                    </div>
                </Modal>
            </div>


        );
    }
}

export default  InstallList;