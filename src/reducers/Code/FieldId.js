const initState = {
    typeId: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'FIELD_TYPE_ID':
            return {...state, typeId: action.typeId};
        default:
            return state;
    }
};

export default {initState, reducer};