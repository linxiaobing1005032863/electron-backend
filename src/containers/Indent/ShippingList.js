import {connect} from 'react-redux';
import ShippingList from '../../components/Indent/ShippingList';
import {shipping_list,shipping_draft} from '../../action/index';
import {bindActionCreators} from 'redux';
// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        shippingList:state.ShippingList.shippingList,
        shippingDraft:state.ShippingDraft.shippingDraft
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleShipList:bindActionCreators(shipping_list,dispatch),
        handleShipDraft:bindActionCreators(shipping_draft,dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingList);