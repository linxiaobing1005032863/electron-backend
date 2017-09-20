const initState = {
    allRule: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'RULE_ID':
            return {...state, ruleId: action.ruleId};
        default:
            return state;
    }
};

export default {initState, reducer};