const initState = {
    ruleInfo: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'RULE_INFO':
            return {...state, ruleInfo: action.ruleInfo};
        default:
            return state;
    }
};

export default {initState, reducer};