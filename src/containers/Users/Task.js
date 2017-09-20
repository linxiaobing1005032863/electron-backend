import {connect} from 'react-redux';
import Task from '../../components/Users/Task';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps() {
    return {};
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);