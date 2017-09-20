import {connect} from 'react-redux';
import CreateProduct from '../../components/Indent/CreateProduct';
import {all_rule,rule_id,rule_info,rule_index_info} from '../../action/index';
import {bindActionCreators} from 'redux';
// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        allRule:state.AllRule.allRule,
        ruleId:state.RuleId.ruleId,
        ruleInfo:state.RuleInfo.ruleInfo,
        indexInfo:state.IndexInfo.indexInfo
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleAllRule:bindActionCreators(all_rule,dispatch),
        handleRuleId:bindActionCreators(rule_id,dispatch),
        handleRuleInfo:bindActionCreators(rule_info,dispatch),
        handleIndexInfo:bindActionCreators(rule_index_info,dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);