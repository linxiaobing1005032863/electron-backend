import {connect} from 'react-redux';
import Distribution from '../../components/Indent/Distribution';
import {number_list,details_info} from '../../action/index';
import {bindActionCreators} from 'redux';
// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        numberList:state.Distribution.numberList,
        detailsInfo:state.Distribution.detailsInfo
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleNumberList:bindActionCreators(number_list,dispatch),
        handleDetailsInfo:bindActionCreators(details_info,dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Distribution);