
const initState = {
    indexInfo: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'RULE_INDEX_INFO':
            return {...state, indexInfo: action.indexInfo};
        default:
            return state;
    }
};

export default {initState, reducer};