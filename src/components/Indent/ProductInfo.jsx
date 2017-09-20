import {Select, InputNumber, Button, Table, notification, Popconfirm, Input} from 'antd';
import React from 'react';
import {productInfo_controller} from '../../controllers/Indent/Creatindent';
import {orderAdd_controller} from '../../controllers/Indent/Creatindent';
const Option = Select.Option;

class ProductInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectValue: '',
            selectIndex: '',
            voltage: '',
            colour: '',
            shape: '',
            productId: '',
            price: '',
            number: '',
            allPrice: '',
        }
    }

    selectChange = (value, option) => {
        const {productInfo} = this.props;
        let e = option.props.children;
        this.setState({
            selectValue: e,
            selectIndex: value,
            voltage: productInfo[value].voltage,
            colour: productInfo[value].colour,
            shape: productInfo[value].shape,
            productId: productInfo[value].id,
        })
    };
    priceChange = (e) => {
        this.setState({
            price: e.target.value
        })
    };

    onDelete = (index) => {
        const {orderInfo, handleOrderInfo} = this.props;
        let _orderInfo = orderInfo ? [...orderInfo] : [];
        _orderInfo.splice(index, 1);
        handleOrderInfo(_orderInfo);
    };

    onChange = (value) => {
        const {price} = this.state;
        let all = value * price;
        this.setState({
            number: value,
            allPrice: all
        })
    };
    draftClick = () => {
        this.pullData(false);
    };
    OnClick = () => {
        this.pullData(true);
    };
    pullData = (state) => {
        const {handleProduct, orderInfo, customerInfo} = this.props;
        let pullData = {};
        let data = [];
        for (let i = 0; i < orderInfo.length; i++) {
            let dataValue = {};
            dataValue.productId = orderInfo[i].productId;
            dataValue.price = orderInfo[i].price;
            data.push(dataValue);
        }
        pullData.consignee = customerInfo.contact;
        pullData.phone = customerInfo.phone;
        pullData.address = customerInfo.address;
        pullData.product = data;
        pullData.state = state;
        orderAdd_controller(pullData, (err, result) => {
            if (err) {
                handleProduct(2);
                this.openNotificationWithIcon('success', '保存成功', '系统成功');
            }
            else {
                this.openNotificationWithIcon('error', '保存失败', '系统错误');
            }
        });
    };

    Submit = () => {
        const {price, allPrice, selectValue, number, productId} = this.state;
        const {orderInfo, handleOrderInfo, handleOrderIndex, orderIndex} = this.props;
        let data = [];
        let dataValue = {};
        let _orderIndex = orderIndex + 1;
        dataValue.key = _orderIndex;
        dataValue.productId = productId;
        dataValue.productName = selectValue;
        dataValue.price = price;
        dataValue.productNumber = number;
        dataValue.productCount = allPrice;
        data.push(dataValue);
        data = orderInfo.concat(data);
        handleOrderInfo(data);
        handleOrderIndex(_orderIndex);
    };

    showMyInfo = () => {
        productInfo_controller((err, values) => {
            if (err) {
                const {handleProductInfo} = this.props;
                handleProductInfo(values);
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
        const {price, allPrice, shape, voltage, colour} = this.state;
        const {productInfo, orderInfo} = this.props;
        const columns = [
            {title: '产品名称', dataIndex: 'productName', key: 'productName'},
            {title: '产品价格', dataIndex: 'price', key: 'price'},
            {title: '产品数量', dataIndex: 'productNumber', key: 'productNumber'},
            {title: '产品总价格', dataIndex: 'productCount', key: 'productCount'},
            {
                title: 'Action', dataIndex: 'operation', key: 'x', render: (text, record, index) => {
                return (
                    <Popconfirm title="确认删除?" onConfirm={() => this.onDelete(index)}>
                        <a href="#">Delete</a>
                    </Popconfirm>
                )

            }
            }
        ];
        const children = [];
        for (let i = 0; i < productInfo.length; i++) {
            children.push(<Option key={i}>{productInfo[i].name}</Option>);
        }
        return (
            <div >
                <div className="productInfo">
                    <div className="select">
                        <span>产品名称：</span><Select
                        style={{width: 200}}
                        onSelect={this.selectChange}
                    >
                        {children}
                    </Select>
                    </div>
                    <div className="product">
                        <div className="productWrap"><span>产品电压：</span><span className="productBox">{voltage}</span>
                        </div>
                        <div className="productWrap"><span>产品颜色：</span><span
                            className="productBox">{colour}</span></div>
                        <div className="productWrap"><span>产品形状：</span><span className="productBox">{shape}</span></div>
                        <div className="productWrap"><span>产品价格：</span><Input placeholder="产品价格"
                                                                              value={this.state.price}
                                                                              className="fieldBox"
                                                                              onChange={this.priceChange}/></div>
                        <div className="productWrap"><span>采购数量：</span><InputNumber min={1} max={100000}
                                                                                    onChange={this.onChange}
                                                                                    value={this.state.number}/></div>
                        <div className="productWrap"><span>总采购价格：</span><span className="productPrice">{allPrice}</span>
                        </div>
                    </div>
                    <Button type="primary" size="large" onClick={this.Submit}
                            className='productBtn'>确定</Button>
                    <Table
                        columns={columns}
                        expandedRowRender={record => <p>{record.description}</p>}
                        dataSource={orderInfo}
                    />
                </div>
                <Button type="primary" size="large" onClick={this.draftClick}
                        className='productBtn'>保存草稿</Button>
                <Button type="primary" size="large" onClick={this.OnClick}
                        className='productBtn'>确定订单</Button>
            </div>
        );
    }
}
export default ProductInfo;