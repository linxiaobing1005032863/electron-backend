import React from 'react';
import moment from 'moment'
import {Table, Modal, notification, Spin} from 'antd';
import {taskList_controller, receive_controller} from '../../controllers/Users/Task';

class Task extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [{
            title: '日期',
            dataIndex: 'time',
        }, {
            title: '内容',
            dataIndex: 'content',
        }];

        this.state = {
            count: 0,
            dataSource: [],
            selectedRows: [],
            loading: false,
            visible: false
        };
    }


    loadList() {
        const {count} = this.state;
        taskList_controller((bool, result) => {
            if (bool) {
                let _count = count;
                let _dataSource = [];
                result.forEach((it) => {
                    const _itData = {
                        key: _count,
                        content: it.description,
                        time: moment(it.createdAt).format('YYYY-MM-DD'),
                        id: it.id,
                        taskData: it.taskData
                    };
                    _count++;
                    _dataSource.push(_itData);
                });
                this.setState({
                    dataSource: [..._dataSource],
                    loading: true,
                });
            }
            else
                console.log('服务器地址加载错误');
        });
    }

    componentWillMount() {
        this.loadList();
    }

    handleOk = () => {
        const {dataSource} = this.state;
        const body = {
            id: dataSource[0].id,
            taskData: dataSource[0].taskData,
            accept: true
        };
        receive_controller(body, (bool, result) => {
            if (bool) {
                this.openNotificationWithIcon('success', '接受成功', '系统成功');
            }
            else {
                this.openNotificationWithIcon('error', '提交失败', '系统错误');
            }
        });
        this.setState({
            visible: false,
        });

    };

    handleCancel = () => {
        const {dataSource} = this.state;
        const body = {
            id: dataSource[0].id,
            taskData: dataSource[0].taskData,
            accept: false
        };

        taskList_controller(body, (bool, result) => {
            if (bool) {
                this.openNotificationWithIcon('success', '不接受', '系统成功');
            }
            else {
                this.openNotificationWithIcon('error', '提交失败', '系统错误');
            }
        });
        this.setState({
            visible: false,
        });

    };

    onRowclick = () => {
        this.setState({
            visible: true,
        });
    };

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description
        });
    };

    render() {
        const {dataSource, loading} = this.state;
        const columns = this.columns;

        if (loading) {
            return (
                <div>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        bordered
                        onRowClick={this.onRowclick}
                    />
                    <div>
                        <Modal
                            title="任务接受框"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            okText="接受"
                            cancelText="不接受"
                        >
                            <p>您好！请问要接受吗？</p>
                        </Modal>
                    </div>
                </div>
            );
        } else {
            return <Spin size="large"/>
        }

    }
}

export default Task;