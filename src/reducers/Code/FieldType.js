const initState = {
    fieldType: null
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'FIELD_ADD_TYPE':
            return {...state, fieldType: action.fieldType};
        default:
            return state;
    }
};

export default {initState, reducer};