import {connect} from 'react-redux';
import ChangePhone from '../../components/Users/ChangePhone';
import {bindActionCreators} from 'redux';
import {verify_phone_current_add} from '../../action/index';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        current:state.Phone.current
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleChangePhone:bindActionCreators(verify_phone_current_add,dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePhone);