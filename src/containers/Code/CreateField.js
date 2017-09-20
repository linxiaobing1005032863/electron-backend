import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CreateField from '../../components/Code/CreateField';
import {field_add_type,field_type_data,field_type_id,field_type_length,field_type_info} from '../../action/index';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        fieldType:state.FieldType.fieldType,
        typeData:state.FieldData.typeData,
        typeId:state.FieldId.typeId,
        typeLength:state.FieldLength.typeLength,
        typeInfo:state.FieldInfo.typeInfo
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        handleFieldType:bindActionCreators(field_add_type,dispatch),
        handleFieldData:bindActionCreators(field_type_data,dispatch),
        handleFieldId:  bindActionCreators(field_type_id,dispatch),
        handleFieldLength:bindActionCreators(field_type_length,dispatch),
        handleFieldInfo:bindActionCreators(field_type_info,dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateField);