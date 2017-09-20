const initState = {
    codeData: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'CODE_DATA':
            return {...state, codeData: action.codeData};
        default:
            return state;
    }
};

export default {initState, reducer};