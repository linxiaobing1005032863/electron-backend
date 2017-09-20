import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Product from '../../components/Indent/ProductInfo';
import {indent_current_add, product_info, order_info, order_index} from '../../action/index';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        orderInfo: state.OrderInfo.orderInfo,
        productInfo: state.ProductInfo.productInfo,
        customerInfo: state.CustomerInfo.customerInfo,
        orderIndex: state.OrderIndex.orderIndex
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleProduct: bindActionCreators(indent_current_add, dispatch),
        handleProductInfo: bindActionCreators(product_info, dispatch),
        handleOrderInfo: bindActionCreators(order_info, dispatch),
        handleOrderIndex: bindActionCreators(order_index, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);