/**
 * Created by Administrator on 2017/7/18 0018.
 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ConfirmOrder from '../../components/Indent/ConfirmOrder';
import { confirm_order,draft_index,order_draft} from '../../action/index';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        order:state.ConfirmOrder.order,
        orderDraft:state.OrderDraft.orderDraft,
        draftIndex:state.DraftIndex.draftIndex
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleDraftIndex:bindActionCreators(draft_index,dispatch),
        handleOrderList: bindActionCreators(confirm_order, dispatch),
        handleOrderDraft:bindActionCreators(order_draft,dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder);