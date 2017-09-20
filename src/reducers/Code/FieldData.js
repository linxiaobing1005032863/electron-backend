const initState = {
    typeData: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'FIELD_TYPE_DATA':
            return {...state, typeData: action.typeData};
        default:
            return state;
    }
};

export default {initState, reducer};