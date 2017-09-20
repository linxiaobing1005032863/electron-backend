import {Table, Modal} from 'antd';
import React from 'react';
import OrderInfo from '../../containers/Indent/OrderInfo';
import {orderList_controller} from '../../controllers/Indent/ConfirmOrder';

class ConfirmOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false,
            count: 0
        };
    }


    onClick = () => {
        this.setState({
            visible: true,
        });
        this.onRowclick();
    };

    handleOk = () => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    onRowclick = (record, index) => {
        const {handleDraftIndex} = this.props;
        handleDraftIndex(index);
    };

    showMyInfo = () => {
        orderList_controller((err, values) => {
            if (err) {
                const {handleOrderList, handleOrderDraft} = this.props;
                const {count} = this.state;
                handleOrderList(values);
                let _count = count;
                let _dataSource = [];
                values.forEach((it) => {
                    const _itData = {
                        key: _count,
                        id: it.number,
                    };
                    _count++;
                    _dataSource.push(_itData);
                });
                handleOrderDraft(_dataSource)
            }
        });
    };

    componentWillMount() {
        this.showMyInfo();
    }


    render() {
        const {orderDraft} = this.props;
        const columns = [{
            title: '订单编号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '详细',
            dataIndex: '',
            key: 'x',
            render: () => <a href="#" onClick={this.onClick}>订单详细</a>
        }];

        return (
            <div>
                <Table columns={columns} dataSource={orderDraft} onRowClick={this.onRowclick}/>
                <Modal
                    title="订单详细"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="完成"
                    cancelText="关闭"
                >
                    <OrderInfo/>
                </Modal>
            </div>
        );
    }
}


export default  ConfirmOrder;
