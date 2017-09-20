import React from 'react';
import {Input, Button, Select, notification, Spin, InputNumber} from 'antd';
import {
    productAdd_controller,
    code_controller,
    codeInfo_controller,
    codeDict_controller
} from '../../controllers/Indent/CreatProduct';
const Option = Select.Option;

class CreateProduct extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            ruleSep: [],
            sep: '',
            voltageValue: '',
            colorValue: '',
            shapeValue: '',
            voltageValueB: '',
            colorValueB: '',
            shapeValueB: '',
            inputValue: '',
            nameValue: '',
            id: '',
            sValue: [],
            cValue: [],
            vValue: []
        }
    }

    ruleChange = (value, option) => {
        const {ruleId, handleRuleInfo, handleIndexInfo} = this.props;
        const {ruleSep} = this.state;
        let id = ruleId[value]; //规则id
        let sep = ruleSep[value];
        codeInfo_controller(id, (err, value) => {
            if (err) {
                let codeRule = value.codeRule;
                handleRuleInfo(value.codeRule);
                for (let i = 0; i < codeRule.length; i++) {
                    if (codeRule[i].ruleType === false) {
                        codeDict_controller(codeRule[0].dictTypeId, (err, valueA) => {
                            if (err) {
                                codeDict_controller(codeRule[1].dictTypeId, (err, valueB) => {
                                    if (err) {
                                        codeDict_controller(codeRule[2].dictTypeId, (err, valueC) => {
                                            this.setState({
                                                vValue: valueA,
                                                cValue: valueB,
                                                sValue: valueC
                                            })
                                        });

                                    }
                                });
                            }
                        });
                    }
                }
                handleIndexInfo(value);
                this.setState({
                    sep: sep,
                    id: id
                })
            }

        });
    };

    voltageChange = (value, option) => {
        const {vValue} = this.state;
        let e = option.props.children;
        this.setState({
            voltageValue: vValue[value].key,
            voltageValueB: vValue[value].value
        })
    };

    colorChange = (value, option) => {
        const {cValue} = this.state;
        this.setState({
            colorValue: cValue[value].key,
            colorValueB: cValue[value].value
        })
    };

    shapeChange = (value, option) => {
        const {sValue} = this.state;
        this.setState({
            shapeValue: sValue[value].key,
            shapeValueB: sValue[value].value
        })
    };

    serialChange = (e) => {
        const {ruleInfo} = this.props;
        let n = ruleInfo[3].placeholder;
        let value = e.target.value;
        if (ruleInfo[3].contentType = 'number') {
            let reg = new RegExp("^\d{3}$");
            /*            if (!reg.test(value)) {
             alert("请输入数字");
             }*/
            let codeValue = value.substring(0, n);
            this.setState({
                inputValue: codeValue
            })
        }
    };

    nameChange = (e) => {
        this.setState({
            nameValue: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {nameValue, inputValue, colorValue, shapeValue, voltageValue, id, colorValueB, shapeValueB, voltageValueB} = this.state;
        const codeId = `${voltageValue}${colorValue}${shapeValue}${inputValue}`;
        let pullData = {};
        pullData.name = nameValue;
        pullData.voltage = voltageValueB;
        pullData.colour = colorValueB;
        pullData.shape = shapeValueB;
        pullData.codeRuleId = id;
        pullData.codeId = codeId;
        productAdd_controller(pullData, (err, value) => {
            if (err) {
                this.openNotificationWithIcon('success', '创建产品成功', '系统成功');
            }
            else {
                this.openNotificationWithIcon('error', '保存失败', '系统错误');
            }
        })
    };

    showMyInfo = () => {
        let rule = [];
        let ruleId = [];
        let ruleSep = [];
        const {handleAllRule, handleRuleId} = this.props;
        code_controller((err, values) => {
            if (err) {
                for (let key in values) {
                    rule.push(values[key].name);
                    ruleId.push(values[key].id);
                    ruleSep.push(values[key].separator)
                }
                this.setState({
                    ruleSep: ruleSep
                });
                handleAllRule(rule);
                handleRuleId(ruleId);
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
        const {sValue, cValue, vValue, sep, inputValue, colorValue, shapeValue, voltageValue} = this.state;
        const {allRule, ruleInfo, indexInfo} = this.props;
        const children = [], voltageChildren = [], colorChildren = [], shapeChildren = [];
        if (allRule !== null && allRule.length !== 0) {
            for (let i = 0; i < allRule.length; i++) {
                children.push(<Option key={i}>{allRule[i]}</Option>);
            }
        }
        if (sValue !== null && sValue.length !== 0) {
            for (let i = 0; i < sValue.length; i++) {
                shapeChildren.push(<Option key={i}>{sValue[i].value}</Option>);
            }
        }
        if (cValue !== null && cValue.length !== 0) {
            for (let i = 0; i < cValue.length; i++) {
                colorChildren.push(<Option key={i}>{cValue[i].value}</Option>);
            }
        }
        if (vValue !== null && vValue.length !== 0) {
            for (let i = 0; i < vValue.length; i++) {
                voltageChildren.push(<Option key={i}>{vValue[i].value}</Option>);
            }
        }


        const Value = `${voltageValue}${sep}${colorValue}${sep}${shapeValue}${sep}${inputValue}`;

        return (
            <div className="create">
                <div className="selectRule">
                    <span>选择规则：</span><Select
                    onSelect={this.ruleChange}
                    style={{width: 200}}
                    className="select"
                >
                    {children}
                </Select>
                </div>
                {ruleInfo.length !== 0 ? <div>
                    <div className="selectRule">
                        <span>产品电压：</span><Select
                        onSelect={this.voltageChange}
                        style={{width: 200}}
                        className="select"
                    >
                        {voltageChildren}
                    </Select>
                    </div>
                    <div className="selectRule">
                        <span>产品颜色：</span><Select
                        onSelect={this.colorChange}
                        style={{width: 200}}
                        className="select"
                    >
                        {colorChildren}
                    </Select>
                    </div>
                    <div className="selectRule">
                        <span>产品形状：</span><Select
                        onSelect={this.shapeChange}
                        style={{width: 200}}
                        className="select"
                    >
                        {shapeChildren}
                    </Select>
                    </div>
                    <div className="inputBox">
                        <span>产品序号：</span>
                        <Input placeholder="产品序号" value={this.state.inputValue} className="fieldBox"
                               onChange={this.serialChange}/>
                    </div>
                    <div className="inputBox">
                        <span>产品名称：</span>
                        <Input placeholder="产品名称" value={this.state.nameValue} className="fieldBox"
                               onChange={this.nameChange}/>
                    </div>
                    <div className="productCode">
                        <p><h2>{Value}</h2></p>
                    </div>
                </div> : null}
                <Button type="primary" size="large" onClick={this.handleSubmit} className="typeBtn">确定</Button>
            </div>
        );
    }
}

export default CreateProduct;