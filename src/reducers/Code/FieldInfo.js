const initState = {
    typeInfo: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'FIELD_TYPE_INFO':
            return {...state, typeInfo: action.typeInfo};
        default:
            return state;
    }
};

export default {initState, reducer};