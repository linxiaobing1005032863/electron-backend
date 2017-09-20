import React from 'react';
import {Table, notification, Spin} from 'antd';

import {list_controller, total_controller} from '../../controllers/Users/Log';


class TableLog extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [{
            title: '日志编号',
            dataIndex: 'id',
        }, {
            title: '类型',
            dataIndex: 'type',
        }, {
            title: '操作者',
            dataIndex: 'operator',
        }, {
            title: '时间',
            dataIndex: 'time',
        }];

        this.state = { //列表数据加载
            count: 0,
            current: 0,
            total: 0,
            dataSource: [],
            selectedRowKeys: [],
            selectedRows: [],
            loading: false,
        };
    }

    loadList(page) {
        const {count} = this.state;
        list_controller(page, (bool, result) => {
            if (bool) {
                let _count = count;
                let _dataSource = [];
                result.forEach((it) => {
                    const _itData = {
                        key: _count,
                        id: it.id,
                        type: it.logType,
                        data: JSON.stringify(it.logReqData),
                        operator: it.operator,
                        time: it.logTime
                    };
                    _count++;
                    _dataSource.push(_itData);
                });
                this.setState({
                    dataSource: [..._dataSource],
                    count: _count,
                });
            }
            else
                console.log('服务器地址加载错误');
        });
    }

    setTotal() {
        total_controller((bool, result) => {
            if (bool) {
                this.setState({
                    total: result,
                    loading: true,
                });
            }
            else
                console.log('服务器地址加载错误');
        });
    }

    componentWillMount() {
        this.loadList(0);
        this.setTotal();
    }

    componentWillReceiveProps() {
        this.loadList(0);
        this.setTotal();
    }

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description
        });
    };

    onChange = (page) => {
        const {type} = this.props;
        this.loadList(page - 1, type);
        this.setState({
            current: page,
        });
    };

    render() {
        const {dataSource, loading} = this.state;
        const columns = this.columns;

        const pagination = {
            current: this.state.current,
            onChange: this.onChange,
            total: Math.ceil(this.state.total)
        };

        if (true) {
            return (
                <div>
                    <Table pagination={pagination} bordered expandedRowRender={record => <p>{record.data}</p>}
                           dataSource={dataSource} columns={columns}/>
                </div>
            );
        } else {
            return <Spin size="large"/>
        }

    }
}

export default TableLog;