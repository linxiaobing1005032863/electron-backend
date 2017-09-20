import React from 'react';
import {Table} from 'antd';
import {
    shipping_controller
} from '../../controllers/Indent/ShippingList'

class InstallDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {title: '产品编号', dataIndex: 'productId', key: 'productId'},
            {title: '产品名称', dataIndex: 'productName', key: 'productName'},
            {title: '规格', dataIndex: 'specs', key: 'specs'},
            {title: '产品价格', dataIndex: 'price', key: 'price'},
            {title: '产品数量', dataIndex: 'productNumber', key: 'productNumber'}
        ];
        this.state = {
            data: [],
            id: '',
            nameValue: '',
            phoneValue: ''
        };
    };

    showMyInfo = () => {
        const {installIndex, installDraft, handleInstallList} = this.props;
        let id = installDraft[installIndex].id;
        let orderNumber = installDraft[installIndex].orderNumber;
        shipping_controller(id, (err, values) => {
            if (err) {
                let dataInfo = values.productInfo;
                let _infoCount = 0;
                let _dataSource = [];
                dataInfo.forEach((it) => {
                    const _itData = {
                        key: _infoCount,
                        productId: it.id,
                        productName: it.productName,
                        specs: it.specs,
                        price: it.price,
                        productNumber: it.productNumber,
                        productCount: it.productCount,
                        exp: it.exp,
                        unit: it.unit,
                        productType: it.productType,
                        productModel: it.productModel,
                    };
                    _infoCount++;
                    _dataSource.push(_itData);
                });
                this.setState({
                    id: orderNumber,
                    data: _dataSource,
                    nameValue: installDraft[installIndex].consignee,
                    phoneValue: installDraft[installIndex].phone
                });
                handleInstallList(_dataSource);

            }
        })
    };

    componentWillMount() {
        this.showMyInfo();
    }

    /*    componentWillReceiveProps(nextProps) {
     // if (this.props.installList !== nextProps.installList) {
     this.showMyInfo();
     // }

     }*/

    render() {
        const columns = this.columns;
        const {nameValue, phoneValue, id, data} = this.state;
        const pagination = {
            defaultPageSize: 2
        };
        return (
            <div>
                <span>武汉市武昌区直营中心李亚丽：</span>
                <p><span>你区域所属订单编号{id}产品于2017年到货，产品服务信息如下:</span></p>
                <Table columns={columns} dataSource={data} pagination={pagination}/>
                <p><span>客户联系人：{nameValue}</span></p>
                <p><span>联系方式：{phoneValue}</span></p>
                {/*<p><span>安装需求：无</span></p>
                 <div>
                 <p><span>销售:张三</span><span>发货：李四</span><span>客服：王五</span></p>
                 </div>*/}
            </div>
        )

    }
}
export default InstallDetails;