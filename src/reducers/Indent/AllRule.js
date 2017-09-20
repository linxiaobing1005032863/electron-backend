const initState = {
    allRule: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'ALL_RULE':
            return {...state, allRule: action.allRule};
        default:
            return state;
    }
};

export default {initState, reducer};