const initState = {
    draftIndex: 0
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'DRAFT_INDEX':
            return {...state, draftIndex: action.draftIndex};
        default:
            return state;
    }
};

export default {initState, reducer};