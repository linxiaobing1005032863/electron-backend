const initState = {
    account: null
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SHOW_ORGANIZE_INFO':
            return {...state, account: action.account};
        default:
            return state;
    }
};

export default {initState, reducer};