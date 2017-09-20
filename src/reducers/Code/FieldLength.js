const initState = {
    typeLength: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'FIELD_TYPE_LENGTH':
            return {...state, typeLength: action.typeLength};
        default:
            return state;
    }
};

export default {initState, reducer};