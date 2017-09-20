import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Channel from '../../components/Indent/Channel';
import {indent_current_add,channel_info} from '../../action/index';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        channelInfo:state.ChannelInfo.channelInfo,
        customerInfo:state.CustomerInfo.customerInfo,
        productInfo:state.ProductInfo.productInfo
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleChannel: bindActionCreators(indent_current_add, dispatch),
        handleChanelInfo: bindActionCreators(channel_info, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);