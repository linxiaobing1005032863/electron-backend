const initState = {
    current: 0
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'VERIFY_EMAIL_CURRENT_ADD':
            return {...state, current: action.current};
        default:
            return state;
    }
};

export default {initState, reducer};