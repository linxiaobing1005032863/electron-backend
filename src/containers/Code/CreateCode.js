import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CreateCode from '../../components/Code/CreateCode';
import {code_data,code_index} from '../../action/index';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        codeData:state.CodeData.codeData,
        codeIndex:state.CodeIndex.codeIndex
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleCodeData:bindActionCreators(code_data,dispatch),
        handleCodeIndex:bindActionCreators(code_index,dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCode);