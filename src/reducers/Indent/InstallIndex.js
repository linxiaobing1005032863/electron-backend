const initState = {
    installIndex: 0
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'INSTALL_INDEX':
            return {...state, installIndex: action.installIndex};
        default:
            return state;
    }
};

export default {initState, reducer};