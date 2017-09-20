const initState = {
    codeIndex: 0
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'CODE_INDEX':
            return {...state, codeIndex: action.codeIndex};
        default:
            return state;
    }
};

export default {initState, reducer};