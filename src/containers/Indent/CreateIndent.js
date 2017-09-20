import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CreateIndent from '../../components/Indent/CreateIndent';
import {indent_current_add,order_info} from '../../action/index';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        current:state.Indent.current
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleIndent: bindActionCreators(indent_current_add, dispatch),
        handleOrderInfo: bindActionCreators(order_info, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateIndent);