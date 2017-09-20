const initState = {
    current: null
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'VERIFY_PHONE_CURRENT_ADD':
            return {...state, current: action.current};
        default:
            return state;
    }
};

export default {initState, reducer};