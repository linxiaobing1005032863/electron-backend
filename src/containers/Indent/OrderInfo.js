import {connect} from 'react-redux';
import OrderInfo from '../../components/Indent/OrderInfo';
import {order_draft} from '../../action/index';
import {bindActionCreators} from 'redux';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        order: state.ConfirmOrder.order,
        orderDraft: state.OrderDraft.orderDraft,
        draftIndex: state.DraftIndex.draftIndex
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleOrderDraft: bindActionCreators(order_draft, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);