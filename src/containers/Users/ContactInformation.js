import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ContactInformation from '../../components/Users/ContactInformation';
import {show_organize_info_creator} from '../../action/index';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        account: state.Organize.account
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleContactInfo: bindActionCreators(show_organize_info_creator, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactInformation);