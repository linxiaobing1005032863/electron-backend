import {Select, Button, Input, Table, notification, InputNumber} from 'antd';
import React from 'react';
import {
    fieldType_controller,
    typeAdd_controller,
    fieldAdd_controller,
    fieldInfo_controller
} from '../../controllers/Code/CreateField';
const Option = Select.Option;

class CreateField extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {title: '类型', dataIndex: 'type', key: 'type'},
            {title: '字典值', dataIndex: 'decs', key: 'decs'},
            {title: '字典键', dataIndex: 'code', key: 'code'},
        ];
        this.state = {
            fieldType: [],
            selectValue: '',
            typeValue: '',
            lengthValue: '',
            typeIndex: '',
            fieldIndex: 0,
            decsValue: '',
            codeValue: '',
            typeData: [],
        }
    }

    SelectChange = (value, option) => {
        const {typeId, handleFieldInfo} = this.props;
        let e = option.props.children;
        let type = typeId[value];
        let index = value;
        fieldInfo_controller(type, (err, value) => {
            if (err) {
                let data = [];
                for (let i = 0; i < value.length; i++) {
                    let dataValue = {};
                    dataValue.key = i;
                    dataValue.type = e;
                    dataValue.decs = value[i].value;
                    dataValue.code = value[i].key;
                    dataValue.id = value[i].type;
                    data.push(dataValue);
                }
                handleFieldInfo(data);
                this.setState({
                    selectValue: e,
                    typeIndex: index,
                    fieldIndex: value.length
                })
            }
        });

    };

    TypeChange = (e) => {
        this.setState({typeValue: e.target.value});
    };

    lengthChange = (value) => {
        this.setState({
            lengthValue: value
        })
    };

    DecsChange = (e) => {
        this.setState({
            decsValue: e.target.value
        })
    };

    CodeChange = (e) => {
        const {typeLength} = this.props;
        const {typeIndex} = this.state;
        let value = e.target.value;
        let codeValue = value.substring(0, typeLength[typeIndex]);
        this.setState({
            codeValue: codeValue
        })
    };

    TypeClick = () => {
        const {typeValue, lengthValue} = this.state;
        const {handleFieldType, fieldType} = this.props;
        let _fieldType = fieldType ? [...fieldType] : [];
        _fieldType.push(typeValue);
        typeAdd_controller({value: typeValue, placeholder: lengthValue}, (err, result) => {
            if (err) {
                handleFieldType(_fieldType);
                this.showMyInfo();
                this.openNotificationWithIcon('success', '添加成功', '系统成功');
            } else {
                this.openNotificationWithIcon('error', '添加失败', '系统错误');
            }
        });
    };

    OnClick = () => {
        const {decsValue, codeValue, selectValue, typeIndex, fieldIndex} = this.state;
        const {handleFieldData, typeData, typeId, typeInfo} = this.props;
        let data = [];
        let dataValue = {};
        let _fieldIndex = fieldIndex + 1;
        dataValue.key = _fieldIndex;
        dataValue.type = selectValue;
        dataValue.decs = decsValue;
        dataValue.code = codeValue;
        dataValue.id = typeId[typeIndex];
        data.push(dataValue);
        data = typeData.concat(data);
        handleFieldData(data);
        this.setState({
            fieldIndex: _fieldIndex
        })
    };

    TableClick = () => {
        const {typeData} = this.props;
        let data = [];
        for (let i = 0; i < typeData.length; i++) {
            let dataValue = {};
            dataValue.value = typeData[i].decs;
            dataValue.key = typeData[i].code;
            dataValue.type = typeData[i].id;
            data.push(dataValue);
        }
        fieldAdd_controller(data, (err, result) => {
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
        let typeLength = [];
        const {handleFieldType, handleFieldId, handleFieldLength} = this.props;
        fieldType_controller((err, values) => {
            if (err) {
                for (let key in values) {
                    type.push(values[key].value);
                    typeId.push(values[key].id);
                    typeLength.push(values[key].placeholder)
                }
                handleFieldType(type);
                handleFieldId(typeId);
                handleFieldLength(typeLength);
            }
        });
    };

    componentWillMount() {
        this.showMyInfo();
    }

    componentWillUnmount() {
        const {handleFieldInfo, handleFieldData} = this.props;
        handleFieldData([]);
        handleFieldInfo([]);
    }

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description
        });
    };

    render() {
        const {typeData, fieldType, typeInfo} = this.props;
        const children = [];
        let data = [...typeInfo, ...typeData];
        if (fieldType !== null && fieldType.length !== 0) {
            for (let i = 0; i < fieldType.length; i++) {
                children.push(<Option key={i}>{fieldType[i]}</Option>);
            }
        }
        const columns = this.columns;

        return (
            <div className="fieldWrap">
                <div className="field">
                    <span>类型：</span><Select
                    onSelect={this.SelectChange}
                    style={{width: 200}}
                    className="select"
                >
                    {children}
                </Select>
                    <div>
                        <p><span>增加类型</span></p>
                        <span>类型值</span>
                        <Input placeholder="新增类型" value={this.state.typeValue} className="fieldBox"
                               onChange={this.TypeChange}/>
                        <span>类型长度</span>
                        <InputNumber onChange={this.lengthChange}/>
                        <Button type="primary" size="large" onClick={this.TypeClick} className="typeBtn">确定</Button>
                    </div>
                </div>
                <div className="field">
                    <span>字典值：</span>
                    <Input placeholder="字典值" value={this.state.decsValue} className="fieldBox"
                           onChange={this.DecsChange}/>
                    <span>字典键：</span>
                    <Input placeholder="字典键" value={this.state.codeValue} className="fieldBox"
                           onChange={this.CodeChange}/>
                </div>
                <Button type="primary" size="large" onClick={this.OnClick} className="codeBtn">确定</Button>
                <div className="tableWrap">
                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </div>

                <Button type="primary" size="large" onClick={this.TableClick}
                        className='fieldBtn'>确定</Button>
            </div>
        );
    }
}
export default CreateField;