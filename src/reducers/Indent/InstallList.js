const initState = {
    installList: null
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'INSTALL_LIST':
            return {...state, installList: action.installList};
        default:
            return state;
    }
};

export default {initState, reducer};