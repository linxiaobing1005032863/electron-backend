import {connect} from 'react-redux';
import InstallDetails from '../../components/Indent/InstallDetails';
import {install_list} from '../../action/index';
import {bindActionCreators} from 'redux';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        installList:state.InstallList.installList,
        installIndex:state.InstallIndex.installIndex,
        installDraft:state.InstallDraft.installDraft
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleInstallList:bindActionCreators(install_list,dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstallDetails);