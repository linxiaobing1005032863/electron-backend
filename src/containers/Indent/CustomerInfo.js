import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CustomerInfo from '../../components/Indent/CustomerInfo';
import {indent_current_add,customer_info} from '../../action/index';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps() {
    return {
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleCustomer: bindActionCreators(indent_current_add, dispatch),
        handleCustomerInfo:bindActionCreators(customer_info, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);