import {Select, Button, InputNumber, Table, Tabs, Input, notification} from 'antd';
import React from 'react';
import {fieldType_controller} from '../../controllers/Code/CreateField';
import {codeType_controller, codeRule_controller} from '../../controllers/Code/CreateCode';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

const typeChildren = [];
const sepChildren = [];
typeChildren.push(<Option key={1}>string</Option>);
typeChildren.push(<Option key={2}>number</Option>);
sepChildren.push(<Option key={1}>-</Option>);
sepChildren.push(<Option key={2}>~</Option>);

class CreateCode extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {title: '序号', dataIndex: 'index', key: 'index'},
            {title: '规则', dataIndex: 'rule', key: 'rule'},
        ];
        this.state = {
            fieldType: [],
            fieldId: [],
            fieldLength:[],
            selectValue: '',
            ruleName: '',
            sepValue: '',
            codeDesc: '',
            typeValue: '',
            typeIndex: '',
            lengthValue: '',
        }
    }

    RuleChange = (e) => {
        this.setState({
            ruleName: e.target.value
        })
    };

    sepChange = (value, option) => {
        let e = option.props.children;
        this.setState({
            sepValue: e,
        })
    };

    decsChange = (e) => {
        this.setState({
            codeDesc: e.target.value
        })
    };

    FieldChange = (value, option) => {
        let e = option.props.children;
        this.setState({
            selectValue: e,
            typeIndex: value,
        })
    };

    typeChange = (value, option) => {
        let e = option.props.children;
        this.setState({
            typeValue: e,
        })
    };

    lengthChange = (value) => {
        this.setState({
            lengthValue: value
        })
    };

    TypeClick = () => {
        const {handleCodeData, handleCodeIndex, codeData, codeIndex} = this.props;
        const {selectValue, fieldId, typeIndex,fieldLength} = this.state;
        let data = [];
        let dataValue = {};
        let _codeIndex = codeIndex + 1;
        dataValue.key = _codeIndex;
        dataValue.ruleType = 'false';
        dataValue.placeholder=fieldLength[typeIndex];
        dataValue.contentType=null;
        dataValue.dictTypeId = fieldId[typeIndex];
        dataValue.index = _codeIndex;
        dataValue.rule=selectValue;
        data.push(dataValue);
        data = codeData.concat(data);
        handleCodeData(data);
        handleCodeIndex(_codeIndex);
    };
    ruleClick = () => {
        const {lengthValue, typeValue} = this.state;
        const {handleCodeData, handleCodeIndex, codeData, codeIndex} = this.props;
        let data = [];
        let dataValue = {};
        let _codeIndex = codeIndex + 1;
        let ruleValue = `长度${lengthValue}-类型${typeValue}`;
        dataValue.rule = ruleValue;
        dataValue.index = _codeIndex;
        dataValue.key = _codeIndex;
        dataValue.dictTypeId = null;
        dataValue.placeholder = lengthValue;
        dataValue.contentType = typeValue;
        dataValue.ruleType = 'true';
        data.push(dataValue);
        data = codeData.concat(data);
        handleCodeData(data);
        handleCodeIndex(_codeIndex);
    };

    TableClick = () => {
        const {codeData} = this.props;
        const {ruleName, sepValue, codeDesc} = this.state;
        let pullData = {};
        let data = [];
        for (let i = 0; i < codeData.length; i++) {
            let dataValue = {};
            dataValue.dictTypeId = codeData[i].dictTypeId;
            dataValue.ruleType = codeData[i].ruleType;
            dataValue.placeholder = codeData[i].placeholder;
            dataValue.contentType = codeData[i].contentType;
            dataValue.index = codeData[i].index;
            data.push(dataValue);
        }
        pullData.name = ruleName;
        pullData.separator = sepValue;
        pullData.describe = codeDesc;
        pullData.rules = data;
        codeRule_controller(pullData, (err, result) => {
            if (err) {
                this.openNotificationWithIcon('success', '保存成功', '系统成功');
            }
            else {
                this.openNotificationWithIcon('error', '保存失败', '系统错误');
            }
        })

    };

    showMyInfo = () => {
        let type = [];
        let typeId = [];
        let typeLength=[];
        fieldType_controller((err, values) => {
            if (err) {
                for (let key in values) {
                    type.push(values[key].value);
                    typeId.push(values[key].id);
                    typeLength.push(values[key].placeholder)
                }
                this.setState({
                    fieldType: type,
                    fieldId: typeId,
                    fieldLength:typeLength
                })
            }
        });
    };

    componentWillMount() {
        this.showMyInfo();
    }

    componentWillUnmount() {
        const {handleCodeData} = this.props;
        handleCodeData([]);
    }

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description
        });
    };

    render() {
        const {fieldType} = this.state;
        const {codeData} = this.props;
        const columns = this.columns;
        const children = [];
        if (fieldType !== null && fieldType.length !== 0) {
            for (let i = 0; i < fieldType.length; i++) {
                children.push(<Option key={i}>{fieldType[i]}</Option>);
            }
        }

        return (
            <div>
                <div className="decs">
                    <span>增加类型：</span>
                    <Input placeholder="规则名称" value={this.state.ruleName} className="fieldBox"
                           onChange={this.RuleChange}/>
                    <span>分隔符：</span><Select
                    onSelect={this.sepChange}
                    style={{width: 200}}
                    className="select"
                >
                    {sepChildren}
                </Select>
                    <div className="codeDecs">
                        <span>编码说明：</span>
                        <Input placeholder="编码说明" value={this.state.codeDesc} className="fieldBox"
                               onChange={this.decsChange}/>
                    </div>
                </div>
                <div className="tab">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="选取字典类型" key="1">
                            <div className="fieldType">
                                <span>字典类型：</span><Select
                                onSelect={this.FieldChange}
                                style={{width: 200}}
                                className="select"
                            >
                                {children}
                            </Select>
                                <Button type="primary" size="large" onClick={this.TypeClick}
                                        className="codeBtn">确定</Button>
                            </div>
                        </TabPane>
                        <TabPane tab="设置规则" key="2">
                            <div className="custom">
                                <span>长度：</span>
                                <InputNumber onChange={this.lengthChange}/>
                                <span>类型：</span><Select
                                onSelect={this.typeChange}
                                style={{width: 200}}
                                className="select"
                            >
                                {typeChildren}
                            </Select>
                            </div>
                            <Button type="primary" size="large" onClick={this.ruleClick}
                                    className="codeBtn">确定</Button></TabPane>
                    </Tabs>
                </div>
                <div className="codeForm">
                    <Table
                        columns={columns}
                        dataSource={codeData}
                    />
                </div>
                <Button type="primary" size="large" onClick={this.TableClick}
                        className='fieldBtn'>确定</Button>

            </div>
        );
    }
}
export default CreateCode;