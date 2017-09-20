/**
 * Created by chenlizan on 2017/6/18.
 */

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {show_person_info_creator} from '../../action/index';
import Person from '../../components/Users/Person';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        account: state.Person.account
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handlePersonInfo: bindActionCreators(show_person_info_creator, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);